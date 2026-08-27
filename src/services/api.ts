import {
  Enquiry,
  PortfolioItem,
  BlogPost,
  Testimonial,
  WebsiteSettings,
  AdminNotification,
  AdminUser,
  DashboardStats,
  LeadStatus,
} from '../types';

const TOKEN_KEY = 'unicorn_admin_token';

export const authStorage = {
  getToken: () => localStorage.getItem(TOKEN_KEY),
  setToken: (token: string) => localStorage.setItem(TOKEN_KEY, token),
  removeToken: () => localStorage.removeItem(TOKEN_KEY),
};

async function fetchJson<T>(url: string, options: RequestInit = {}): Promise<T> {
  const token = authStorage.getToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(url, { ...options, headers });
  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.error || `HTTP error ${res.status}: ${res.statusText}`);
  }

  return data as T;
}

export const api = {
  // Public
  getSettings: () => fetchJson<WebsiteSettings>('/api/settings'),
  getPortfolio: () => fetchJson<PortfolioItem[]>('/api/portfolio'),
  getPortfolioItem: (id: string) => fetchJson<PortfolioItem>(`/api/portfolio/${id}`),
  getBlogs: () => fetchJson<BlogPost[]>('/api/blogs'),
  getBlog: (slug: string) => fetchJson<BlogPost>(`/api/blogs/${slug}`),
  getTestimonials: () => fetchJson<Testimonial[]>('/api/testimonials'),
  
  submitEnquiry: (payload: {
    name: string;
    company?: string;
    email: string;
    phone: string;
    service: string;
    budget: string;
    message: string;
  }) =>
    fetchJson<{ success: boolean; message: string; enquiryId: string }>('/api/enquiries', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  // Auth
  login: (identifier: string, password: string) =>
    fetchJson<{ token: string; admin: AdminUser }>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ identifier, password }),
    }),

  getMe: () => fetchJson<AdminUser>('/api/auth/me'),

  updateProfile: (data: { name: string; email: string; username: string }) =>
    fetchJson<{ success: boolean; admin: AdminUser }>('/api/auth/update-profile', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  changePassword: (data: { currentPassword: string; newPassword: string }) =>
    fetchJson<{ success: boolean; message: string }>('/api/auth/change-password', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // Admin Dashboard
  getDashboardStats: () => fetchJson<DashboardStats>('/api/admin/dashboard-stats'),
  
  // Enquiries
  getEnquiries: () => fetchJson<Enquiry[]>('/api/admin/enquiries'),
  getEnquiry: (id: string) => fetchJson<Enquiry>(`/api/admin/enquiries/${id}`),
  updateEnquiryStatus: (id: string, status: LeadStatus) =>
    fetchJson<Enquiry>(`/api/admin/enquiries/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),
  addEnquiryNote: (id: string, text: string) =>
    fetchJson<Enquiry>(`/api/admin/enquiries/${id}/notes`, {
      method: 'POST',
      body: JSON.stringify({ text }),
    }),
  deleteEnquiry: (id: string) =>
    fetchJson<{ success: boolean }>(`/api/admin/enquiries/${id}`, {
      method: 'DELETE',
    }),

  // Notifications
  getNotifications: () => fetchJson<AdminNotification[]>('/api/admin/notifications'),
  markNotificationRead: (id: string) =>
    fetchJson<{ success: boolean }>(`/api/admin/notifications/${id}/read`, {
      method: 'PATCH',
    }),
  markAllNotificationsRead: () =>
    fetchJson<{ success: boolean }>('/api/admin/notifications/mark-all-read', {
      method: 'POST',
    }),

  // Settings
  updateSettings: (settings: Partial<WebsiteSettings>) =>
    fetchJson<WebsiteSettings>('/api/admin/settings', {
      method: 'PUT',
      body: JSON.stringify(settings),
    }),

  // Portfolio CRUD
  createPortfolio: (data: Partial<PortfolioItem>) =>
    fetchJson<PortfolioItem>('/api/admin/portfolio', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  updatePortfolio: (id: string, data: Partial<PortfolioItem>) =>
    fetchJson<PortfolioItem>(`/api/admin/portfolio/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  deletePortfolio: (id: string) =>
    fetchJson<{ success: boolean }>(`/api/admin/portfolio/${id}`, {
      method: 'DELETE',
    }),

  // Blog CRUD
  createBlog: (data: Partial<BlogPost>) =>
    fetchJson<BlogPost>('/api/admin/blogs', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  updateBlog: (id: string, data: Partial<BlogPost>) =>
    fetchJson<BlogPost>(`/api/admin/blogs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  deleteBlog: (id: string) =>
    fetchJson<{ success: boolean }>(`/api/admin/blogs/${id}`, {
      method: 'DELETE',
    }),

  // Testimonials CRUD
  createTestimonial: (data: Partial<Testimonial>) =>
    fetchJson<Testimonial>('/api/admin/testimonials', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  updateTestimonial: (id: string, data: Partial<Testimonial>) =>
    fetchJson<Testimonial>(`/api/admin/testimonials/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  deleteTestimonial: (id: string) =>
    fetchJson<{ success: boolean }>(`/api/admin/testimonials/${id}`, {
      method: 'DELETE',
    }),
};
