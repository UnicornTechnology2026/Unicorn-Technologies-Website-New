import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { api } from './services/api';
import {
  WebsiteSettings,
  PortfolioItem,
  BlogPost,
  Testimonial,
} from './types';

// Public Components
import { Navbar } from './components/public/Navbar';
import { Hero } from './components/public/Hero';
import { AboutSection } from './components/public/AboutSection';
import { ServicesSection } from './components/public/ServicesSection';
import { PortfolioSection } from './components/public/PortfolioSection';
import { WhyChooseUs } from './components/public/WhyChooseUs';
import { ProcessSection } from './components/public/ProcessSection';
import { TestimonialsSection } from './components/public/TestimonialsSection';
import { FAQSection } from './components/public/FAQSection';
import { BlogSection } from './components/public/BlogSection';
import { ContactSection } from './components/public/ContactSection';
import { Footer } from './components/public/Footer';
import { FloatingWhatsApp } from './components/public/FloatingWhatsApp';
import { ProjectEstimatorModal } from './components/public/ProjectEstimatorModal';

// Admin Components
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminDashboard } from './components/admin/AdminDashboard';

function MainApp() {
  const { isAuthenticated } = useAuth();

  // Page View State: 'public' | 'admin-login' | 'admin-dashboard'
  const [currentView, setCurrentView] = useState<'public' | 'admin-login' | 'admin-dashboard'>(() => {
    // Check initial hash/path
    if (
      typeof window !== 'undefined' &&
      (window.location.pathname.startsWith('/admin') || window.location.hash.startsWith('#admin'))
    ) {
      return 'admin-login';
    }
    return 'public';
  });

  // Data states
  const [settings, setSettings] = useState<WebsiteSettings | null>(null);
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  // Estimator Modal
  const [isEstimatorOpen, setIsEstimatorOpen] = useState(false);

  // Prefilled contact form values from estimator or service cards
  const [contactPrefill, setContactPrefill] = useState<{
    service?: string;
    budget?: string;
    message?: string;
  }>({});

  // Fetch initial public website data
  useEffect(() => {
    const fetchPublicData = async () => {
      try {
        const [settingsData, portfolioData, blogsData, testimonialsData] = await Promise.all([
          api.getSettings().catch(() => null),
          api.getPortfolio().catch(() => []),
          api.getBlogs().catch(() => []),
          api.getTestimonials().catch(() => []),
        ]);

        if (settingsData) setSettings(settingsData);
        if (portfolioData) setPortfolio(portfolioData);
        if (blogsData) setBlogs(blogsData);
        if (testimonialsData) setTestimonials(testimonialsData);
      } catch (err) {
        console.error('Error fetching public website data:', err);
      }
    };

    fetchPublicData();
  }, []);

  // Update view if user is already authenticated
  useEffect(() => {
    if (isAuthenticated && currentView === 'admin-login') {
      setCurrentView('admin-dashboard');
    }
  }, [isAuthenticated, currentView]);

  // Handle URL hash changes
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#admin' || window.location.pathname === '/admin/login') {
        setCurrentView(isAuthenticated ? 'admin-dashboard' : 'admin-login');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [isAuthenticated]);

  const handleNavigateToSection = (sectionId: string) => {
    if (currentView !== 'public') {
      setCurrentView('public');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleSelectServiceForContact = (serviceTitle: string) => {
    setContactPrefill({
      service: serviceTitle,
      budget: '$10,000 - $25,000',
      message: `We would like to explore your ${serviceTitle} capabilities for an upcoming project.`,
    });
    handleNavigateToSection('contact');
  };

  const handleEstimatorSubmit = (estimateData: {
    service: string;
    budget: string;
    timeline: string;
    features: string[];
    summary: string;
  }) => {
    setContactPrefill({
      service: estimateData.service,
      budget: estimateData.budget,
      message: `Calculated Project Scope (${estimateData.service}):\n- Estimated Budget: ${estimateData.budget}\n- Estimated Delivery: ${estimateData.timeline}\n- Selected Modules: ${estimateData.features.join(', ')}`,
    });
    setIsEstimatorOpen(false);
    handleNavigateToSection('contact');
  };

  // Render Admin Login
  if (currentView === 'admin-login' && !isAuthenticated) {
    return (
      <AdminLogin
        onBackToWebsite={() => {
          window.location.hash = '';
          setCurrentView('public');
        }}
        onLoginSuccess={() => setCurrentView('admin-dashboard')}
      />
    );
  }

  // Render Admin Dashboard
  if (currentView === 'admin-dashboard' || (currentView === 'admin-login' && isAuthenticated)) {
    return (
      <AdminDashboard
        onReturnToWebsite={() => {
          window.location.hash = '';
          setCurrentView('public');
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col selection:bg-orange-500 selection:text-white">
      {/* Navigation Bar */}
      <Navbar
        settings={settings}
        onNavigateToSection={handleNavigateToSection}
        onOpenAdminLogin={() => {
          window.location.hash = 'admin';
          setCurrentView(isAuthenticated ? 'admin-dashboard' : 'admin-login');
        }}
        onOpenEstimator={() => setIsEstimatorOpen(true)}
      />

      {/* Main Public Content */}
      <main className="flex-grow">
        {/* 1. Hero Section */}
        <Hero
          onStartProject={() => handleNavigateToSection('contact')}
          onConsultation={() => setIsEstimatorOpen(true)}
        />

        {/* 2. Services Section */}
        <ServicesSection onSelectServiceForQuote={handleSelectServiceForContact} />

        {/* 3. About Section */}
        <AboutSection />

        {/* 4. Portfolio Section */}
        <PortfolioSection
          items={portfolio}
          onSelectProjectForQuote={(projectName) => {
            setContactPrefill({
              service: 'Custom Software Solutions',
              message: `We are interested in a solution similar to ${projectName}.`,
            });
            handleNavigateToSection('contact');
          }}
        />

        {/* 5. Why Choose Us Section */}
        <WhyChooseUs />

        {/* 6. Our 5-Step Process Section */}
        <ProcessSection />

        {/* 7. Testimonials Section */}
        <TestimonialsSection testimonials={testimonials} />

        {/* 8. FAQ Section */}
        <FAQSection />

        {/* 9. Blog Section */}
        <BlogSection blogs={blogs} />

        {/* 10. Contact Section */}
        <ContactSection
          settings={settings}
          initialService={contactPrefill.service}
          initialBudget={contactPrefill.budget}
          initialMessage={contactPrefill.message}
        />
      </main>

      {/* Footer */}
      <Footer
        settings={settings}
        onNavigateToSection={handleNavigateToSection}
        onOpenAdminLogin={() => {
          window.location.hash = 'admin';
          setCurrentView(isAuthenticated ? 'admin-dashboard' : 'admin-login');
        }}
        onOpenEstimator={() => setIsEstimatorOpen(true)}
      />

      {/* Floating WhatsApp Action Button */}
      <FloatingWhatsApp whatsappNumber={settings?.whatsappNumber} />

      {/* Interactive Project Estimator Modal */}
      <ProjectEstimatorModal
        isOpen={isEstimatorOpen}
        onClose={() => setIsEstimatorOpen(false)}
        onSubmitEstimate={handleEstimatorSubmit}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}

