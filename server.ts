import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';
import { db, LeadStatus } from './server/db.js';
import { requireAdmin, generateToken, AuthenticatedRequest } from './server/auth.js';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Simple in-memory Rate Limiter
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function rateLimiter(limit: number, windowMs: number) {
  return (req: Request, res: Response, next: () => void) => {
    const ip = req.ip || req.socket.remoteAddress || 'unknown';
    const now = Date.now();
    const key = `${req.path}_${ip}`;
    const record = rateLimitMap.get(key);

    if (!record || now > record.resetTime) {
      rateLimitMap.set(key, { count: 1, resetTime: now + windowMs });
      return next();
    }

    if (record.count >= limit) {
      return res.status(429).json({
        error: 'Too many requests. Please slow down and try again shortly.',
      });
    }

    record.count += 1;
    next();
  };
}

// -------------------------------------------------------------
// PUBLIC API ROUTES
// -------------------------------------------------------------

// 1. Website Settings
app.get('/api/settings', (req: Request, res: Response) => {
  const settings = db.getSettings();
  res.json(settings);
});

// 2. Portfolio Items
app.get('/api/portfolio', (req: Request, res: Response) => {
  const items = db.getPortfolio();
  res.json(items);
});

app.get('/api/portfolio/:id', (req: Request, res: Response) => {
  const item = db.getPortfolioItem(req.params.id);
  if (!item) return res.status(404).json({ error: 'Portfolio project not found' });
  res.json(item);
});

// 3. Blog Posts
app.get('/api/blogs', (req: Request, res: Response) => {
  const blogs = db.getBlogs();
  res.json(blogs);
});

app.get('/api/blogs/:slug', (req: Request, res: Response) => {
  const blog = db.getBlogBySlugOrId(req.params.slug);
  if (!blog) return res.status(404).json({ error: 'Blog post not found' });
  res.json(blog);
});

// 4. Testimonials
app.get('/api/testimonials', (req: Request, res: Response) => {
  const testimonials = db.getTestimonials();
  res.json(testimonials);
});

// 5. Submit Contact Enquiry (Rate limited: 10 per 10 mins)
app.post(
  '/api/enquiries',
  rateLimiter(10, 10 * 60 * 1000),
  (req: Request, res: Response) => {
    const { name, company, email, phone, service, budget, message } = req.body;

    // Form Validation
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return res.status(400).json({ error: 'Please provide a valid full name.' });
    }
    if (!email || typeof email !== 'string' || !/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ error: 'Please provide a valid business email address.' });
    }
    if (!phone || typeof phone !== 'string' || phone.trim().length < 6) {
      return res.status(400).json({ error: 'Please provide a valid contact phone number.' });
    }
    if (!service || typeof service !== 'string') {
      return res.status(400).json({ error: 'Please select a service required.' });
    }
    if (!message || typeof message !== 'string' || message.trim().length < 5) {
      return res.status(400).json({ error: 'Please provide a project description message (min 5 characters).' });
    }

    const ipAddress = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress;

    const newEnquiry = db.createEnquiry({
      name: name.trim(),
      company: (company || '').trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      service: service.trim(),
      budget: (budget || 'Flexible / Custom').trim(),
      message: message.trim(),
      status: 'New',
      ipAddress,
    });

    console.log(`[ADMIN NOTIFICATION] 🚀 New Lead Received: ${newEnquiry.name} (${newEnquiry.company}) - Service: ${newEnquiry.service} - Email: ${newEnquiry.email}`);

    res.status(201).json({
      success: true,
      message: 'Thank you for reaching out! Our solutions director will contact you within 2-4 business hours.',
      enquiryId: newEnquiry.id,
    });
  }
);

// -------------------------------------------------------------
// AUTHENTICATION ROUTES
// -------------------------------------------------------------

// Admin Login (Rate limited: 10 per 10 mins)
app.post(
  '/api/auth/login',
  rateLimiter(15, 10 * 60 * 1000),
  (req: Request, res: Response) => {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      return res.status(400).json({ error: 'Email/Username and password are required.' });
    }

    const admin = db.getAdminByEmailOrUsername(identifier);
    if (!admin) {
      return res.status(401).json({ error: 'Invalid credentials. Please verify your email/username and password.' });
    }

    const isValid = bcrypt.compareSync(password, admin.passwordHash);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials. Please verify your email/username and password.' });
    }

    // Update last login
    db.updateAdmin(admin.id, { lastLoginAt: new Date().toISOString() });

    const token = generateToken(admin);

    res.json({
      token,
      admin: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        username: admin.username,
        role: admin.role,
        lastLoginAt: admin.lastLoginAt,
      },
    });
  }
);

// Admin Profile verification
app.get('/api/auth/me', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  if (!req.admin) return res.status(401).json({ error: 'Not authenticated' });
  res.json({
    id: req.admin.id,
    name: req.admin.name,
    email: req.admin.email,
    username: req.admin.username,
    role: req.admin.role,
    lastLoginAt: req.admin.lastLoginAt,
  });
});

// Admin Update Profile
app.post('/api/auth/update-profile', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  if (!req.admin) return res.status(401).json({ error: 'Not authenticated' });
  const { name, email, username } = req.body;

  if (!name || !email || !username) {
    return res.status(400).json({ error: 'Name, email and username are required.' });
  }

  // Check if username/email collision
  const existing = db.getAdminByEmailOrUsername(email);
  if (existing && existing.id !== req.admin.id) {
    return res.status(400).json({ error: 'Email is already in use by another admin.' });
  }

  const updated = db.updateAdmin(req.admin.id, {
    name: name.trim(),
    email: email.trim().toLowerCase(),
    username: username.trim().toLowerCase(),
  });

  if (!updated) return res.status(500).json({ error: 'Failed to update profile.' });

  res.json({
    success: true,
    admin: {
      id: updated.id,
      name: updated.name,
      email: updated.email,
      username: updated.username,
      role: updated.role,
    },
  });
});

// Admin Change Password
app.post('/api/auth/change-password', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  if (!req.admin) return res.status(401).json({ error: 'Not authenticated' });
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ error: 'Current password and new password are required.' });
  }

  if (newPassword.length < 8) {
    return res.status(400).json({ error: 'New password must be at least 8 characters long.' });
  }

  const isValid = bcrypt.compareSync(currentPassword, req.admin.passwordHash);
  if (!isValid) {
    return res.status(400).json({ error: 'Current password does not match.' });
  }

  const newHash = bcrypt.hashSync(newPassword, 10);
  db.updateAdmin(req.admin.id, { passwordHash: newHash });

  res.json({ success: true, message: 'Password updated successfully!' });
});

// -------------------------------------------------------------
// ADMIN DASHBOARD & SECURE CRUD ROUTES
// -------------------------------------------------------------

// Dashboard Stats & Charts
app.get('/api/admin/dashboard-stats', requireAdmin, (req: Request, res: Response) => {
  const stats = db.getDashboardStats();
  res.json(stats);
});

// Enquiries Management
app.get('/api/admin/enquiries', requireAdmin, (req: Request, res: Response) => {
  const enquiries = db.getEnquiries();
  res.json(enquiries);
});

app.get('/api/admin/enquiries/:id', requireAdmin, (req: Request, res: Response) => {
  const enquiry = db.getEnquiryById(req.params.id);
  if (!enquiry) return res.status(404).json({ error: 'Enquiry not found' });
  res.json(enquiry);
});

app.patch('/api/admin/enquiries/:id/status', requireAdmin, (req: Request, res: Response) => {
  const { status } = req.body;
  const validStatuses: LeadStatus[] = ['New', 'Contacted', 'In Progress', 'Proposal Sent', 'Won', 'Lost'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: 'Invalid lead status.' });
  }

  const updated = db.updateEnquiryStatus(req.params.id, status);
  if (!updated) return res.status(404).json({ error: 'Enquiry not found' });
  res.json(updated);
});

app.post('/api/admin/enquiries/:id/notes', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const { text } = req.body;
  if (!text || typeof text !== 'string' || text.trim().length === 0) {
    return res.status(400).json({ error: 'Note text cannot be empty.' });
  }

  const author = req.admin?.name || 'Admin';
  const updated = db.addEnquiryNote(req.params.id, author, text.trim());
  if (!updated) return res.status(404).json({ error: 'Enquiry not found' });
  res.json(updated);
});

app.delete('/api/admin/enquiries/:id', requireAdmin, (req: Request, res: Response) => {
  const deleted = db.deleteEnquiry(req.params.id);
  if (!deleted) return res.status(404).json({ error: 'Enquiry not found' });
  res.json({ success: true });
});

// Notifications
app.get('/api/admin/notifications', requireAdmin, (req: Request, res: Response) => {
  const notifications = db.getNotifications();
  res.json(notifications);
});

app.patch('/api/admin/notifications/:id/read', requireAdmin, (req: Request, res: Response) => {
  db.markNotificationAsRead(req.params.id);
  res.json({ success: true });
});

app.post('/api/admin/notifications/mark-all-read', requireAdmin, (req: Request, res: Response) => {
  db.markAllNotificationsAsRead();
  res.json({ success: true });
});

// Settings Management
app.put('/api/admin/settings', requireAdmin, (req: Request, res: Response) => {
  const updated = db.updateSettings(req.body);
  res.json(updated);
});

// Portfolio Management CRUD
app.post('/api/admin/portfolio', requireAdmin, (req: Request, res: Response) => {
  const { title, category, client, timeline, description, longDescription, image, results, techStack, liveUrl, featured, order } = req.body;
  if (!title || !category || !description) {
    return res.status(400).json({ error: 'Title, category, and description are required.' });
  }
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const item = db.createPortfolio({
    title,
    slug: slug || `project-${Date.now()}`,
    category,
    client: client || 'Private Client',
    timeline: timeline || '3 Months',
    description,
    longDescription: longDescription || description,
    image: image || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop',
    results: Array.isArray(results) ? results : [],
    techStack: Array.isArray(techStack) ? techStack : ['TypeScript', 'React'],
    liveUrl: liveUrl || '',
    featured: Boolean(featured),
    order: Number(order) || 10,
  });
  res.status(201).json(item);
});

app.put('/api/admin/portfolio/:id', requireAdmin, (req: Request, res: Response) => {
  const updated = db.updatePortfolio(req.params.id, req.body);
  if (!updated) return res.status(404).json({ error: 'Portfolio item not found' });
  res.json(updated);
});

app.delete('/api/admin/portfolio/:id', requireAdmin, (req: Request, res: Response) => {
  const deleted = db.deletePortfolio(req.params.id);
  if (!deleted) return res.status(404).json({ error: 'Portfolio item not found' });
  res.json({ success: true });
});

// Blog Management CRUD
app.post('/api/admin/blogs', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const { title, excerpt, content, coverImage, author, authorRole, category, readTime, tags, featured } = req.body;
  if (!title || !excerpt || !content) {
    return res.status(400).json({ error: 'Title, excerpt, and content are required.' });
  }
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const blog = db.createBlog({
    title,
    slug: slug || `post-${Date.now()}`,
    excerpt,
    content,
    coverImage: coverImage || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop',
    author: author || req.admin?.name || 'Unicorn Tech Team',
    authorRole: authorRole || 'Technical Lead',
    category: category || 'Technology',
    readTime: readTime || '5 min read',
    publishedAt: new Date().toISOString().split('T')[0],
    tags: Array.isArray(tags) ? tags : ['Software'],
    featured: Boolean(featured),
  });
  res.status(201).json(blog);
});

app.put('/api/admin/blogs/:id', requireAdmin, (req: Request, res: Response) => {
  const updated = db.updateBlog(req.params.id, req.body);
  if (!updated) return res.status(404).json({ error: 'Blog post not found' });
  res.json(updated);
});

app.delete('/api/admin/blogs/:id', requireAdmin, (req: Request, res: Response) => {
  const deleted = db.deleteBlog(req.params.id);
  if (!deleted) return res.status(404).json({ error: 'Blog post not found' });
  res.json({ success: true });
});

// Testimonials Management CRUD
app.post('/api/admin/testimonials', requireAdmin, (req: Request, res: Response) => {
  const { clientName, clientRole, clientCompany, avatar, quote, rating, projectType, featured } = req.body;
  if (!clientName || !quote) {
    return res.status(400).json({ error: 'Client name and quote are required.' });
  }
  const testimonial = db.createTestimonial({
    clientName,
    clientRole: clientRole || 'Founder',
    clientCompany: clientCompany || 'Enterprise Partner',
    avatar: avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop',
    quote,
    rating: Number(rating) || 5,
    projectType: projectType || 'Custom Software Solutions',
    featured: Boolean(featured),
  });
  res.status(201).json(testimonial);
});

app.put('/api/admin/testimonials/:id', requireAdmin, (req: Request, res: Response) => {
  const updated = db.updateTestimonial(req.params.id, req.body);
  if (!updated) return res.status(404).json({ error: 'Testimonial not found' });
  res.json(updated);
});

app.delete('/api/admin/testimonials/:id', requireAdmin, (req: Request, res: Response) => {
  const deleted = db.deleteTestimonial(req.params.id);
  if (!deleted) return res.status(404).json({ error: 'Testimonial not found' });
  res.json({ success: true });
});

// -------------------------------------------------------------
// VITE & STATIC FILE SERVING
// -------------------------------------------------------------

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🦄 Unicorn Technologies server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Fatal error starting server:', err);
});
