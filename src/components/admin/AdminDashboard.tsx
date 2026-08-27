import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Inbox,
  Briefcase,
  BookOpen,
  MessageSquareQuote,
  Settings,
  User,
  LogOut,
  Sparkles,
  Bell,
  Search,
  Filter,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  Clock,
  Send,
  Phone,
  Mail,
  ExternalLink,
  MessageSquare,
  AlertCircle,
  Save,
  Check,
  ChevronRight,
  RefreshCw,
  Eye,
  X,
  TrendingUp,
  Award,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie,
} from 'recharts';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import {
  Enquiry,
  LeadStatus,
  PortfolioItem,
  BlogPost,
  Testimonial,
  WebsiteSettings,
  AdminNotification,
  DashboardStats,
} from '../../types';

interface AdminDashboardProps {
  onReturnToWebsite: () => void;
}

type TabType =
  | 'overview'
  | 'enquiries'
  | 'portfolio'
  | 'blogs'
  | 'testimonials'
  | 'settings'
  | 'profile';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onReturnToWebsite }) => {
  const { admin, logout, refreshAdmin } = useAuth();
  const [currentTab, setCurrentTab] = useState<TabType>('overview');

  // Core Data States
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [settings, setSettings] = useState<WebsiteSettings | null>(null);
  const [notifications, setNotifications] = useState<AdminNotification[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);

  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Filter and Search for Enquiries
  const [enquirySearch, setEnquirySearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [newNoteText, setNewNoteText] = useState('');

  // Portfolio Modal/Form
  const [editingPortfolio, setEditingPortfolio] = useState<Partial<PortfolioItem> | null>(null);
  const [isPortfolioModalOpen, setIsPortfolioModalOpen] = useState(false);

  // Blog Modal/Form
  const [editingBlog, setEditingBlog] = useState<Partial<BlogPost> | null>(null);
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);

  // Testimonial Modal/Form
  const [editingTestimonial, setEditingTestimonial] = useState<Partial<Testimonial> | null>(null);
  const [isTestimonialModalOpen, setIsTestimonialModalOpen] = useState(false);

  // Admin Profile Form
  const [profileForm, setProfileForm] = useState({
    name: admin?.name || '',
    email: admin?.email || '',
    username: admin?.username || '',
  });

  // Password Change Form
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [passwordStatus, setPasswordStatus] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);

  // Fetch all data
  const loadAllData = async () => {
    setLoading(true);
    try {
      const [
        statsData,
        enquiriesData,
        portfolioData,
        blogsData,
        testimonialsData,
        settingsData,
        notificationsData,
      ] = await Promise.all([
        api.getDashboardStats(),
        api.getEnquiries(),
        api.getPortfolio(),
        api.getBlogs(),
        api.getTestimonials(),
        api.getSettings(),
        api.getNotifications(),
      ]);

      setStats(statsData);
      setEnquiries(enquiriesData);
      setPortfolio(portfolioData);
      setBlogs(blogsData);
      setTestimonials(testimonialsData);
      setSettings(settingsData);
      setNotifications(notificationsData);

      if (admin) {
        setProfileForm({
          name: admin.name,
          email: admin.email,
          username: admin.username,
        });
      }
    } catch (err) {
      console.error('Error fetching admin data:', err);
      showToast('Error loading dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Lead Status Change
  const handleStatusChange = async (enquiryId: string, newStatus: LeadStatus) => {
    try {
      const updated = await api.updateEnquiryStatus(enquiryId, newStatus);
      setEnquiries((prev) => prev.map((e) => (e.id === enquiryId ? updated : e)));
      if (selectedEnquiry?.id === enquiryId) {
        setSelectedEnquiry(updated);
      }
      showToast(`Status updated to ${newStatus}`);
      // Refresh stats
      api.getDashboardStats().then(setStats);
    } catch (err: any) {
      showToast(err.message || 'Failed to update status');
    }
  };

  // Add Internal Note
  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEnquiry || !newNoteText.trim()) return;
    try {
      const updated = await api.addEnquiryNote(selectedEnquiry.id, newNoteText.trim());
      setEnquiries((prev) => prev.map((item) => (item.id === selectedEnquiry.id ? updated : item)));
      setSelectedEnquiry(updated);
      setNewNoteText('');
      showToast('Internal note recorded');
    } catch (err: any) {
      showToast(err.message || 'Failed to add note');
    }
  };

  // Delete Enquiry
  const handleDeleteEnquiry = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this enquiry record?')) return;
    try {
      await api.deleteEnquiry(id);
      setEnquiries((prev) => prev.filter((e) => e.id !== id));
      if (selectedEnquiry?.id === id) setSelectedEnquiry(null);
      showToast('Enquiry removed');
      api.getDashboardStats().then(setStats);
    } catch (err: any) {
      showToast(err.message || 'Failed to delete enquiry');
    }
  };

  // Portfolio Handlers
  const handleSavePortfolio = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPortfolio?.title || !editingPortfolio?.category || !editingPortfolio?.description) {
      showToast('Please fill all required portfolio fields.');
      return;
    }
    try {
      if (editingPortfolio.id) {
        const updated = await api.updatePortfolio(editingPortfolio.id, editingPortfolio);
        setPortfolio((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
        showToast('Portfolio project updated');
      } else {
        const created = await api.createPortfolio(editingPortfolio);
        setPortfolio((prev) => [...prev, created]);
        showToast('New project created');
      }
      setIsPortfolioModalOpen(false);
      setEditingPortfolio(null);
    } catch (err: any) {
      showToast(err.message || 'Failed to save portfolio item');
    }
  };

  const handleDeletePortfolio = async (id: string) => {
    if (!window.confirm('Delete this project from portfolio?')) return;
    try {
      await api.deletePortfolio(id);
      setPortfolio((prev) => prev.filter((p) => p.id !== id));
      showToast('Project deleted');
    } catch (err: any) {
      showToast(err.message || 'Failed to delete project');
    }
  };

  // Blog Handlers
  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBlog?.title || !editingBlog?.excerpt || !editingBlog?.content) {
      showToast('Please fill in blog title, excerpt, and content.');
      return;
    }
    try {
      if (editingBlog.id) {
        const updated = await api.updateBlog(editingBlog.id, editingBlog);
        setBlogs((prev) => prev.map((b) => (b.id === updated.id ? updated : b)));
        showToast('Blog article updated');
      } else {
        const created = await api.createBlog(editingBlog);
        setBlogs((prev) => [created, ...prev]);
        showToast('New blog article published');
      }
      setIsBlogModalOpen(false);
      setEditingBlog(null);
    } catch (err: any) {
      showToast(err.message || 'Failed to save blog post');
    }
  };

  const handleDeleteBlog = async (id: string) => {
    if (!window.confirm('Delete this blog post?')) return;
    try {
      await api.deleteBlog(id);
      setBlogs((prev) => prev.filter((b) => b.id !== id));
      showToast('Blog post deleted');
    } catch (err: any) {
      showToast(err.message || 'Failed to delete blog post');
    }
  };

  // Testimonial Handlers
  const handleSaveTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTestimonial?.clientName || !editingTestimonial?.quote) {
      showToast('Please fill in client name and testimonial quote.');
      return;
    }
    try {
      if (editingTestimonial.id) {
        const updated = await api.updateTestimonial(editingTestimonial.id, editingTestimonial);
        setTestimonials((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
        showToast('Testimonial updated');
      } else {
        const created = await api.createTestimonial(editingTestimonial);
        setTestimonials((prev) => [...prev, created]);
        showToast('New testimonial added');
      }
      setIsTestimonialModalOpen(false);
      setEditingTestimonial(null);
    } catch (err: any) {
      showToast(err.message || 'Failed to save testimonial');
    }
  };

  const handleDeleteTestimonial = async (id: string) => {
    if (!window.confirm('Delete this testimonial?')) return;
    try {
      await api.deleteTestimonial(id);
      setTestimonials((prev) => prev.filter((t) => t.id !== id));
      showToast('Testimonial deleted');
    } catch (err: any) {
      showToast(err.message || 'Failed to delete testimonial');
    }
  };

  // Settings Handler
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    try {
      const updated = await api.updateSettings(settings);
      setSettings(updated);
      showToast('Website settings saved successfully');
    } catch (err: any) {
      showToast(err.message || 'Failed to update settings');
    }
  };

  // Profile Update
  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.updateProfile(profileForm);
      await refreshAdmin();
      showToast('Admin profile updated');
    } catch (err: any) {
      showToast(err.message || 'Failed to update profile');
    }
  };

  // Password Change
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordStatus(null);
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordStatus({ type: 'error', msg: 'New password and confirmation do not match.' });
      return;
    }
    if (passwordForm.newPassword.length < 8) {
      setPasswordStatus({ type: 'error', msg: 'Password must be at least 8 characters long.' });
      return;
    }
    try {
      const res = await api.changePassword({
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });
      setPasswordStatus({ type: 'success', msg: res.message });
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      showToast('Password changed successfully');
    } catch (err: any) {
      setPasswordStatus({ type: 'error', msg: err.message || 'Failed to change password' });
    }
  };

  // Notification mark as read
  const handleMarkAllNotificationsRead = async () => {
    try {
      await api.markAllNotificationsRead();
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    } catch (err) {
      console.error(err);
    }
  };

  const unreadNotificationCount = notifications.filter((n) => !n.read).length;

  // Filtered Enquiries
  const filteredEnquiries = enquiries.filter((e) => {
    const matchesSearch =
      e.name.toLowerCase().includes(enquirySearch.toLowerCase()) ||
      e.company.toLowerCase().includes(enquirySearch.toLowerCase()) ||
      e.email.toLowerCase().includes(enquirySearch.toLowerCase()) ||
      e.service.toLowerCase().includes(enquirySearch.toLowerCase()) ||
      e.message.toLowerCase().includes(enquirySearch.toLowerCase());

    const matchesStatus = statusFilter === 'All' || e.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusColors: Record<LeadStatus, { bg: string; text: string; border: string }> = {
    New: { bg: 'bg-cyan-500/10', text: 'text-cyan-400', border: 'border-cyan-500/30' },
    Contacted: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/30' },
    'In Progress': { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/30' },
    'Proposal Sent': { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/30' },
    Won: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/30' },
    Lost: { bg: 'bg-rose-500/10', text: 'text-rose-400', border: 'border-rose-500/30' },
  };

  const serviceChartData = stats?.serviceDistribution
    ? Object.entries(stats.serviceDistribution).map(([name, value]) => ({ name, value }))
    : [];

  const CHART_COLORS = ['#38bdf8', '#818cf8', '#34d399', '#f59e0b', '#ec4899', '#a855f7'];

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 p-4 rounded-sm bg-[#0A0A0A] border border-purple-500 text-white text-xs font-bold uppercase tracking-wider shadow-2xl animate-in fade-in slide-in-from-top-3 duration-200 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header */}
      <header className="bg-[#0A0A0A] border-b border-white/10 sticky top-0 z-40 backdrop-blur-md px-4 sm:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div>
            <h1 className="text-lg font-black uppercase tracking-tighter text-white flex items-center gap-2">
              UNICORN<span className="text-purple-400">.</span>ADMIN
              <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-sm bg-purple-500/20 text-purple-300 border border-purple-500/30">
                Enterprise
              </span>
            </h1>
            <p className="text-[11px] text-white/50">Logged in as {admin?.name || 'Administrator'}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Notifications Bell */}
          <div className="relative">
            <button
              id="admin-notifications-toggle"
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2.5 rounded-sm bg-white/5 hover:bg-white/10 text-white/70 relative transition-colors cursor-pointer"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadNotificationCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-purple-500 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                  {unreadNotificationCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-sm bg-[#0A0A0A] border border-white/15 shadow-2xl p-4 z-50 text-white animate-in fade-in duration-150">
                <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
                  <span className="text-xs font-black uppercase tracking-wider text-white">
                    Admin Notifications
                  </span>
                  <button
                    onClick={handleMarkAllNotificationsRead}
                    className="text-[11px] text-purple-400 hover:underline cursor-pointer"
                  >
                    Mark all read
                  </button>
                </div>
                <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                  {notifications.length === 0 ? (
                    <div className="text-xs text-white/40 text-center py-6">No notifications</div>
                  ) : (
                    notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className={`p-2.5 rounded-sm border text-xs transition-colors ${
                          notif.read
                            ? 'bg-black border-white/10 text-white/50'
                            : 'bg-black border-purple-500/40 text-white'
                        }`}
                      >
                        <div className="font-bold text-white mb-0.5">{notif.title}</div>
                        <p className="text-[11px] leading-relaxed mb-1 text-white/70">{notif.message}</p>
                        <span className="text-[10px] text-white/40 font-mono">
                          {new Date(notif.createdAt).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Return to Public Website */}
          <button
            id="admin-view-website-btn"
            onClick={onReturnToWebsite}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-sm bg-white/5 hover:bg-white/10 text-white/80 hover:text-white text-xs font-bold uppercase tracking-wider border border-white/10 transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-purple-400" />
            <span>Public Site</span>
          </button>

          {/* Logout */}
          <button
            id="admin-logout-btn"
            onClick={logout}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-sm bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 text-xs font-bold uppercase tracking-wider border border-rose-500/30 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Main Admin Workspace */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Navigation Sidebar */}
        <aside className="w-full md:w-64 bg-[#0A0A0A] border-r border-white/10 p-4 shrink-0 flex md:flex-col gap-1.5 overflow-x-auto md:overflow-x-visible">
          <button
            id="tab-overview"
            onClick={() => setCurrentTab('overview')}
            className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-sm text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
              currentTab === 'overview'
                ? 'bg-purple-500/20 text-white border border-purple-500'
                : 'text-white/60 hover:bg-white/5 hover:text-white'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard</span>
          </button>

          <button
            id="tab-enquiries"
            onClick={() => setCurrentTab('enquiries')}
            className={`w-full flex items-center justify-between px-3.5 py-3 rounded-sm text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
              currentTab === 'enquiries'
                ? 'bg-purple-500/20 text-white border border-purple-500'
                : 'text-white/60 hover:bg-white/5 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <Inbox className="w-4 h-4" />
              <span>Leads</span>
            </div>
            {stats && stats.newCount > 0 && (
              <span className="px-1.5 py-0.5 rounded-sm bg-purple-500 text-white text-[10px] font-bold">
                {stats.newCount}
              </span>
            )}
          </button>

          <button
            id="tab-portfolio"
            onClick={() => setCurrentTab('portfolio')}
            className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-sm text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
              currentTab === 'portfolio'
                ? 'bg-purple-500/20 text-white border border-purple-500'
                : 'text-white/60 hover:bg-white/5 hover:text-white'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Portfolio</span>
          </button>

          <button
            id="tab-blogs"
            onClick={() => setCurrentTab('blogs')}
            className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-sm text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
              currentTab === 'blogs'
                ? 'bg-purple-500/20 text-white border border-purple-500'
                : 'text-white/60 hover:bg-white/5 hover:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Blog</span>
          </button>

          <button
            id="tab-testimonials"
            onClick={() => setCurrentTab('testimonials')}
            className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-sm text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
              currentTab === 'testimonials'
                ? 'bg-purple-500/20 text-white border border-purple-500'
                : 'text-white/60 hover:bg-white/5 hover:text-white'
            }`}
          >
            <MessageSquareQuote className="w-4 h-4" />
            <span>Reviews</span>
          </button>

          <button
            id="tab-settings"
            onClick={() => setCurrentTab('settings')}
            className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-sm text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
              currentTab === 'settings'
                ? 'bg-purple-500/20 text-white border border-purple-500'
                : 'text-white/60 hover:bg-white/5 hover:text-white'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </button>

          <button
            id="tab-profile"
            onClick={() => setCurrentTab('profile')}
            className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-sm text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
              currentTab === 'profile'
                ? 'bg-purple-500/20 text-white border border-purple-500'
                : 'text-white/60 hover:bg-white/5 hover:text-white'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Profile & Security</span>
          </button>
        </aside>

        {/* Tab Content Canvas */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl overflow-y-auto">
          {/* TAB 1: OVERVIEW */}
          {currentTab === 'overview' && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-black uppercase tracking-tighter text-white">Executive Dashboard</h2>
                  <p className="text-xs text-white/50">
                    Real-time pipeline analytics, conversion metrics, and inbound traffic performance.
                  </p>
                </div>

                <button
                  onClick={loadAllData}
                  className="px-3.5 py-2 rounded-sm bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-wider text-white/70 hover:text-purple-400 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Refresh Real-Time Data</span>
                </button>
              </div>

              {/* KPI Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="p-6 rounded-sm bg-[#0A0A0A] border border-white/10 shadow-xl">
                  <div className="text-[11px] font-mono text-white/50 uppercase tracking-wider font-bold">Total Enquiries</div>
                  <div className="text-3xl font-black text-white mt-1">
                    {stats?.total ?? enquiries.length}
                  </div>
                  <div className="text-xs text-purple-400 mt-2 flex items-center gap-1 font-bold">
                    <TrendingUp className="w-3.5 h-3.5" /> Inbound Lifetime
                  </div>
                </div>

                <div className="p-6 rounded-sm bg-[#0A0A0A] border border-purple-500/30 shadow-xl">
                  <div className="text-[11px] font-mono text-purple-400 uppercase tracking-wider font-bold">New Enquiries</div>
                  <div className="text-3xl font-black text-purple-300 mt-1">
                    {stats?.newCount ?? 0}
                  </div>
                  <div className="text-xs text-white/50 mt-2">Requires review / first touch</div>
                </div>

                <div className="p-6 rounded-sm bg-[#0A0A0A] border border-white/10 shadow-xl">
                  <div className="text-[11px] font-mono text-amber-400 uppercase tracking-wider font-bold">In-Progress Leads</div>
                  <div className="text-3xl font-black text-amber-300 mt-1">
                    {stats?.inProgressCount ?? 0}
                  </div>
                  <div className="text-xs text-white/50 mt-2">Discovery & Proposals</div>
                </div>

                <div className="p-6 rounded-sm bg-[#0A0A0A] border border-emerald-500/30 shadow-xl">
                  <div className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider font-bold">Converted Clients (Won)</div>
                  <div className="text-3xl font-black text-emerald-300 mt-1">
                    {stats?.wonCount ?? 0}
                  </div>
                  <div className="text-xs text-emerald-400 mt-2 flex items-center gap-1 font-bold">
                    <Award className="w-3.5 h-3.5" /> {stats?.conversionRate ?? 0}% Win Rate
                  </div>
                </div>
              </div>

              {/* Charts Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Monthly Trend Area Chart */}
                <div className="lg:col-span-8 p-6 rounded-sm bg-[#0A0A0A] border border-white/10 shadow-xl">
                  <h3 className="text-sm font-black uppercase tracking-wider text-white mb-1">Enquiries & Converted Pipeline</h3>
                  <p className="text-xs text-white/50 mb-6">
                    Monthly inbound submissions vs. signed contracts
                  </p>
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={stats?.monthlyTrend || []}>
                        <defs>
                          <linearGradient id="enquiryGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#c084fc" stopOpacity={0.4} />
                            <stop offset="95%" stopColor="#c084fc" stopOpacity={0} />
                          </linearGradient>
                          <linearGradient id="wonGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#34d399" stopOpacity={0.4} />
                            <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
                        <XAxis dataKey="month" stroke="#737373" fontSize={11} />
                        <YAxis stroke="#737373" fontSize={11} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#0A0A0A',
                            borderColor: '#404040',
                            borderRadius: '2px',
                            color: '#fff',
                            fontSize: '12px',
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="enquiries"
                          name="Total Leads"
                          stroke="#c084fc"
                          strokeWidth={2}
                          fillOpacity={1}
                          fill="url(#enquiryGrad)"
                        />
                        <Area
                          type="monotone"
                          dataKey="converted"
                          name="Won Deals"
                          stroke="#34d399"
                          strokeWidth={2}
                          fillOpacity={1}
                          fill="url(#wonGrad)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Service Breakdown */}
                <div className="lg:col-span-4 p-6 rounded-sm bg-[#0A0A0A] border border-white/10 shadow-xl flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-black uppercase tracking-wider text-white mb-1">Service Demand Mix</h3>
                    <p className="text-xs text-white/50 mb-4">Volume distribution by service</p>
                  </div>

                  <div className="h-52 w-full flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={serviceChartData}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          innerRadius={45}
                          outerRadius={75}
                          paddingAngle={3}
                        >
                          {serviceChartData.map((_, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={CHART_COLORS[index % CHART_COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#0A0A0A',
                            borderColor: '#404040',
                            borderRadius: '2px',
                            fontSize: '11px',
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="space-y-1.5 pt-2">
                    {serviceChartData.slice(0, 4).map((entry, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs text-white/70">
                        <div className="flex items-center gap-1.5 truncate pr-2">
                          <span
                            className="w-2.5 h-2.5 rounded-full shrink-0"
                            style={{ backgroundColor: CHART_COLORS[idx % CHART_COLORS.length] }}
                          />
                          <span className="truncate">{entry.name}</span>
                        </div>
                        <span className="font-mono font-bold text-white">{entry.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent Enquiries Quick Table */}
              <div className="p-6 rounded-sm bg-[#0A0A0A] border border-white/10 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-black uppercase tracking-wider text-white">Recent Inbound Submissions</h3>
                  <button
                    onClick={() => setCurrentTab('enquiries')}
                    className="text-xs text-purple-400 hover:underline flex items-center gap-1 cursor-pointer font-bold uppercase tracking-wider"
                  >
                    <span>View All Leads ({enquiries.length})</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-white/10 text-white/50 uppercase font-mono text-[10px]">
                        <th className="pb-3">Client</th>
                        <th className="pb-3">Service</th>
                        <th className="pb-3">Budget</th>
                        <th className="pb-3">Status</th>
                        <th className="pb-3">Submitted</th>
                        <th className="pb-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-white/70">
                      {enquiries.slice(0, 5).map((enq) => {
                        const style = statusColors[enq.status] || statusColors.New;
                        return (
                          <tr key={enq.id} className="hover:bg-white/5 transition-colors">
                            <td className="py-3 font-medium text-white">
                              <div>{enq.name}</div>
                              <div className="text-[11px] text-white/40">{enq.company || 'Individual'}</div>
                            </td>
                            <td className="py-3">{enq.service}</td>
                            <td className="py-3 font-mono">{enq.budget}</td>
                            <td className="py-3">
                              <span
                                className={`px-2 py-0.5 rounded-sm text-[10px] font-bold uppercase tracking-wider border ${style.bg} ${style.text} ${style.border}`}
                              >
                                {enq.status}
                              </span>
                            </td>
                            <td className="py-3 text-white/40 font-mono text-[11px]">
                              {new Date(enq.createdAt).toLocaleDateString()}
                            </td>
                            <td className="py-3 text-right">
                              <button
                                onClick={() => {
                                  setSelectedEnquiry(enq);
                                  setCurrentTab('enquiries');
                                }}
                                className="px-2.5 py-1 rounded-sm bg-white/5 hover:bg-white/10 text-purple-400 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                              >
                                Manage
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ENQUIRIES & LEADS MANAGEMENT */}
          {currentTab === 'enquiries' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-black uppercase tracking-tighter text-white">Leads & Enquiries</h2>
                  <p className="text-xs text-white/50">
                    Track client submissions, change pipeline status, and manage internal notes.
                  </p>
                </div>
              </div>

              {/* Filters and Search Bar */}
              <div className="p-4 rounded-sm bg-[#0A0A0A] border border-white/10 flex flex-col sm:flex-row items-center gap-3">
                <div className="relative flex-1 w-full">
                  <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search by client name, email, company, service..."
                    value={enquirySearch}
                    onChange={(e) => setEnquirySearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-black border border-white/10 rounded-sm text-xs text-white placeholder-white/40 focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <span className="text-xs font-mono text-white/50 shrink-0 uppercase">Status:</span>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-3 py-2.5 bg-black border border-white/10 rounded-sm text-xs text-white focus:outline-none focus:border-purple-500"
                  >
                    <option value="All">All Statuses</option>
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Proposal Sent">Proposal Sent</option>
                    <option value="Won">Won</option>
                    <option value="Lost">Lost</option>
                  </select>
                </div>
              </div>

              {/* Main Leads Table & Detail View */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Table Column */}
                <div className={`${selectedEnquiry ? 'lg:col-span-7' : 'lg:col-span-12'} p-6 rounded-sm bg-[#0A0A0A] border border-white/10 shadow-xl overflow-hidden`}>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-white/10 text-white/50 uppercase font-mono text-[10px]">
                          <th className="pb-3">Prospect</th>
                          <th className="pb-3">Service</th>
                          <th className="pb-3">Budget</th>
                          <th className="pb-3">Status</th>
                          <th className="pb-3 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 text-white/70">
                        {filteredEnquiries.length === 0 ? (
                          <tr>
                            <td colSpan={5} className="py-8 text-center text-white/40">
                              No matching enquiries found.
                            </td>
                          </tr>
                        ) : (
                          filteredEnquiries.map((enq) => {
                            const isSelected = selectedEnquiry?.id === enq.id;
                            const style = statusColors[enq.status] || statusColors.New;
                            return (
                              <tr
                                key={enq.id}
                                onClick={() => setSelectedEnquiry(enq)}
                                className={`cursor-pointer transition-colors ${
                                  isSelected ? 'bg-purple-500/15' : 'hover:bg-white/5'
                                }`}
                              >
                                <td className="py-3 font-medium text-white">
                                  <div>{enq.name}</div>
                                  <div className="text-[11px] text-white/40">{enq.company || 'Individual'}</div>
                                </td>
                                <td className="py-3 truncate max-w-[140px]">{enq.service}</td>
                                <td className="py-3 font-mono">{enq.budget}</td>
                                <td className="py-3">
                                  <span
                                    className={`px-2 py-0.5 rounded-sm text-[10px] font-bold uppercase tracking-wider border ${style.bg} ${style.text} ${style.border}`}
                                  >
                                    {enq.status}
                                  </span>
                                </td>
                                <td className="py-3 text-right">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleDeleteEnquiry(enq.id);
                                    }}
                                    className="p-1.5 text-white/40 hover:text-rose-400 hover:bg-white/5 rounded-sm transition-colors cursor-pointer"
                                    title="Delete enquiry"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </td>
                              </tr>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Detail & Notes Drawer Column */}
                {selectedEnquiry && (
                  <div className="lg:col-span-5 p-6 rounded-sm bg-[#0A0A0A] border border-white/10 shadow-2xl flex flex-col justify-between space-y-6">
                    <div>
                      {/* Top Action & Close */}
                      <div className="flex items-center justify-between pb-4 border-b border-white/10">
                        <div>
                          <span className="text-[10px] font-mono uppercase text-purple-400 font-bold">
                            Ref: {selectedEnquiry.id}
                          </span>
                          <h3 className="text-lg font-black uppercase tracking-tight text-white">{selectedEnquiry.name}</h3>
                          <div className="text-xs text-white/50">{selectedEnquiry.company || 'Individual Client'}</div>
                        </div>
                        <button
                          onClick={() => setSelectedEnquiry(null)}
                          className="p-1.5 rounded-sm bg-white/5 text-white/60 hover:text-white"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Status Dropdown */}
                      <div className="py-4 border-b border-white/10 flex items-center justify-between">
                        <span className="text-xs font-mono text-white/50 uppercase">Change Status:</span>
                        <select
                          value={selectedEnquiry.status}
                          onChange={(e) =>
                            handleStatusChange(selectedEnquiry.id, e.target.value as LeadStatus)
                          }
                          className="px-3 py-1.5 bg-black border border-purple-500/40 rounded-sm text-xs font-bold text-purple-300 focus:outline-none"
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Proposal Sent">Proposal Sent</option>
                          <option value="Won">Won (Deal Closed)</option>
                          <option value="Lost">Lost</option>
                        </select>
                      </div>

                      {/* Contact Actions */}
                      <div className="grid grid-cols-2 gap-2 py-4 border-b border-white/10">
                        <a
                          href={`mailto:${selectedEnquiry.email}`}
                          className="p-2.5 rounded-sm bg-black border border-white/10 hover:border-purple-500 text-xs font-bold uppercase tracking-wider text-white flex items-center justify-center gap-1.5 transition-colors"
                        >
                          <Mail className="w-3.5 h-3.5 text-purple-400" />
                          <span className="truncate">{selectedEnquiry.email}</span>
                        </a>

                        <a
                          href={`tel:${selectedEnquiry.phone.replace(/[^0-9+]/g, '')}`}
                          className="p-2.5 rounded-sm bg-black border border-white/10 hover:border-purple-500 text-xs font-bold uppercase tracking-wider text-white flex items-center justify-center gap-1.5 transition-colors"
                        >
                          <Phone className="w-3.5 h-3.5 text-purple-400" />
                          <span>{selectedEnquiry.phone}</span>
                        </a>
                      </div>

                      {/* Project Specs */}
                      <div className="py-4 border-b border-white/10 space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span className="text-white/50 font-mono">Service:</span>
                          <span className="font-bold text-white">{selectedEnquiry.service}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/50 font-mono">Budget:</span>
                          <span className="font-bold text-emerald-400 font-mono">
                            {selectedEnquiry.budget}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/50 font-mono">Received:</span>
                          <span className="text-white/70">
                            {new Date(selectedEnquiry.createdAt).toLocaleString()}
                          </span>
                        </div>
                        <div className="pt-2">
                          <span className="text-white/50 font-mono block mb-1">Message / Requirements:</span>
                          <p className="p-3 rounded-sm bg-black border border-white/10 text-white/80 leading-relaxed text-xs">
                            {selectedEnquiry.message}
                          </p>
                        </div>
                      </div>

                      {/* Internal Notes History */}
                      <div className="pt-4 space-y-3">
                        <h4 className="text-xs font-mono uppercase text-white/50 font-bold">Internal Audit & Progress Notes</h4>
                        <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                          {selectedEnquiry.notes.length === 0 ? (
                            <div className="text-xs text-white/40 italic">No notes recorded yet.</div>
                          ) : (
                            selectedEnquiry.notes.map((note) => (
                              <div key={note.id} className="p-2.5 rounded-sm bg-black border border-white/10 text-xs">
                                <div className="flex justify-between text-[10px] text-purple-400 mb-1 font-bold">
                                  <span>{note.author}</span>
                                  <span>{new Date(note.createdAt).toLocaleString()}</span>
                                </div>
                                <p className="text-white/70 leading-relaxed">{note.text}</p>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Add Note Form */}
                    <form onSubmit={handleAddNote} className="pt-3 border-t border-white/10 flex gap-2">
                      <input
                        type="text"
                        placeholder="Add internal note..."
                        value={newNoteText}
                        onChange={(e) => setNewNoteText(e.target.value)}
                        className="flex-1 px-3 py-2 bg-black border border-white/10 rounded-sm text-xs text-white placeholder-white/40 focus:outline-none focus:border-purple-500"
                      />
                      <button
                        type="submit"
                        className="px-3.5 py-2 bg-purple-500 hover:bg-purple-400 text-black font-black uppercase tracking-wider rounded-sm text-xs transition-colors cursor-pointer"
                      >
                        Add
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: PORTFOLIO MANAGEMENT */}
          {currentTab === 'portfolio' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-black uppercase tracking-tighter text-white">Portfolio Manager</h2>
                  <p className="text-xs text-white/50">
                    Add, edit, and feature case studies showcasing engineering work.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setEditingPortfolio({
                      title: '',
                      category: 'Website Development',
                      client: '',
                      timeline: '4 Weeks',
                      description: '',
                      longDescription: '',
                      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop',
                      results: ['99.9% Uptime', '3x Faster Speeds'],
                      techStack: ['Next.js', 'TypeScript', 'Tailwind CSS'],
                      liveUrl: '',
                      featured: false,
                      order: portfolio.length + 1,
                    });
                    setIsPortfolioModalOpen(true);
                  }}
                  className="px-4 py-2.5 rounded-sm bg-purple-500 hover:bg-purple-400 text-black text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-lg shadow-purple-500/20 cursor-pointer transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>New Case Study</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {portfolio.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-sm bg-[#0A0A0A] border border-white/10 p-5 flex flex-col justify-between space-y-4"
                  >
                    <div>
                      <div className="h-36 rounded-sm overflow-hidden bg-black mb-3 relative">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                        <span className="absolute top-2 left-2 text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-sm bg-black/90 text-purple-300 border border-purple-500/30">
                          {item.category}
                        </span>
                      </div>
                      <h3 className="font-black uppercase tracking-tight text-white text-sm mb-1">{item.title}</h3>
                      <p className="text-xs text-white/50 line-clamp-2">{item.description}</p>
                    </div>

                    <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                      <span className="text-xs text-white/40">Client: {item.client}</span>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => {
                            setEditingPortfolio(item);
                            setIsPortfolioModalOpen(true);
                          }}
                          className="p-2 rounded-sm bg-white/5 text-white/70 hover:text-purple-400 transition-colors cursor-pointer"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeletePortfolio(item.id)}
                          className="p-2 rounded-sm bg-white/5 text-white/70 hover:text-rose-400 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: BLOG MANAGEMENT */}
          {currentTab === 'blogs' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-black uppercase tracking-tighter text-white">Blog Manager</h2>
                  <p className="text-xs text-white/50">
                    Publish technical articles and thought leadership insights.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setEditingBlog({
                      title: '',
                      excerpt: '',
                      content: '',
                      coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop',
                      author: admin?.name || 'Unicorn Engineering Lead',
                      authorRole: 'Chief Architect',
                      category: 'Architecture',
                      readTime: '5 min read',
                      tags: ['Next.js', 'Software'],
                      featured: false,
                    });
                    setIsBlogModalOpen(true);
                  }}
                  className="px-4 py-2.5 rounded-sm bg-purple-500 hover:bg-purple-400 text-black text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-lg shadow-purple-500/20 cursor-pointer transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>New Blog Post</span>
                </button>
              </div>

              <div className="space-y-4">
                {blogs.map((blog) => (
                  <div
                    key={blog.id}
                    className="p-5 rounded-sm bg-[#0A0A0A] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-start gap-4">
                      <img
                        src={blog.coverImage}
                        alt={blog.title}
                        className="w-20 h-16 rounded-sm object-cover shrink-0 hidden sm:block"
                      />
                      <div>
                        <div className="flex items-center gap-2 text-[10px] font-mono text-purple-400 font-bold uppercase mb-1">
                          <span>{blog.category}</span>
                          <span>•</span>
                          <span>{blog.readTime}</span>
                          <span>•</span>
                          <span>{blog.publishedAt}</span>
                        </div>
                        <h3 className="font-black uppercase tracking-tight text-white text-sm sm:text-base">{blog.title}</h3>
                        <p className="text-xs text-white/50 line-clamp-1">{blog.excerpt}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => {
                          setEditingBlog(blog);
                          setIsBlogModalOpen(true);
                        }}
                        className="p-2 rounded-sm bg-white/5 text-white/70 hover:text-purple-400 transition-colors cursor-pointer"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteBlog(blog.id)}
                        className="p-2 rounded-sm bg-white/5 text-white/70 hover:text-rose-400 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: TESTIMONIALS MANAGEMENT */}
          {currentTab === 'testimonials' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-black uppercase tracking-tighter text-white">Testimonials Manager</h2>
                  <p className="text-xs text-white/50">
                    Manage client reviews, enterprise endorsements, and ratings.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setEditingTestimonial({
                      clientName: '',
                      clientRole: 'VP of Product',
                      clientCompany: 'Enterprise Partner',
                      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop',
                      quote: '',
                      rating: 5,
                      projectType: 'Custom Software Solutions',
                      featured: true,
                    });
                    setIsTestimonialModalOpen(true);
                  }}
                  className="px-4 py-2.5 rounded-sm bg-purple-500 hover:bg-purple-400 text-black text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-lg shadow-purple-500/20 cursor-pointer transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Testimonial</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {testimonials.map((test) => (
                  <div
                    key={test.id}
                    className="p-6 rounded-sm bg-[#0A0A0A] border border-white/10 flex flex-col justify-between space-y-4"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-mono text-purple-400 font-bold uppercase">{test.projectType}</span>
                        <div className="text-amber-400 text-xs">{'★'.repeat(test.rating)}</div>
                      </div>
                      <p className="text-xs sm:text-sm text-white/80 italic">"{test.quote}"</p>
                    </div>

                    <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={test.avatar}
                          alt={test.clientName}
                          className="w-10 h-10 rounded-full object-cover border border-purple-500/30"
                        />
                        <div>
                          <div className="text-xs font-bold text-white">{test.clientName}</div>
                          <div className="text-[10px] text-white/50">{test.clientRole}, {test.clientCompany}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => {
                            setEditingTestimonial(test);
                            setIsTestimonialModalOpen(true);
                          }}
                          className="p-2 rounded-sm bg-white/5 text-white/70 hover:text-purple-400 transition-colors cursor-pointer"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteTestimonial(test.id)}
                          className="p-2 rounded-sm bg-white/5 text-white/70 hover:text-rose-400 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: WEBSITE & CONTACT SETTINGS */}
          {currentTab === 'settings' && settings && (
            <div className="space-y-6 animate-in fade-in duration-200 max-w-4xl">
              <div>
                <h2 className="text-2xl font-black uppercase tracking-tighter text-white">Website & Contact Settings</h2>
                <p className="text-xs text-white/50">
                  Update public contact details, office hours, WhatsApp numbers, and SEO metadata.
                </p>
              </div>

              <form onSubmit={handleSaveSettings} className="p-8 rounded-sm bg-[#0A0A0A] border border-white/10 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-mono uppercase text-white/50 font-bold mb-2">Company Name</label>
                    <input
                      type="text"
                      value={settings.companyName}
                      onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
                      className="w-full px-4 py-3 bg-black border border-white/10 rounded-sm text-xs text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-white/50 font-bold mb-2">Tagline</label>
                    <input
                      type="text"
                      value={settings.tagline}
                      onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                      className="w-full px-4 py-3 bg-black border border-white/10 rounded-sm text-xs text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-white/50 font-bold mb-2">Company Description</label>
                  <textarea
                    rows={3}
                    value={settings.description}
                    onChange={(e) => setSettings({ ...settings, description: e.target.value })}
                    className="w-full px-4 py-3 bg-black border border-white/10 rounded-sm text-xs text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-xs font-mono uppercase text-white/50 font-bold mb-2">Phone</label>
                    <input
                      type="text"
                      value={settings.phone}
                      onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-black border border-white/10 rounded-sm text-xs text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-white/50 font-bold mb-2">Email</label>
                    <input
                      type="email"
                      value={settings.email}
                      onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                      className="w-full px-4 py-3 bg-black border border-white/10 rounded-sm text-xs text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-white/50 font-bold mb-2">WhatsApp Number</label>
                    <input
                      type="text"
                      value={settings.whatsappNumber}
                      onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                      className="w-full px-4 py-3 bg-black border border-white/10 rounded-sm text-xs text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-mono uppercase text-white/50 font-bold mb-2">Headquarters Address</label>
                    <input
                      type="text"
                      value={settings.address}
                      onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                      className="w-full px-4 py-3 bg-black border border-white/10 rounded-sm text-xs text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-white/50 font-bold mb-2">Office Hours</label>
                    <input
                      type="text"
                      value={settings.officeHours}
                      onChange={(e) => setSettings({ ...settings, officeHours: e.target.value })}
                      className="w-full px-4 py-3 bg-black border border-white/10 rounded-sm text-xs text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>

                {/* Social Links */}
                <div className="pt-4 border-t border-white/10">
                  <h4 className="text-xs font-mono uppercase text-purple-400 font-bold mb-3">Social Media URLs</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] text-white/50 block mb-1">LinkedIn</label>
                      <input
                        type="text"
                        value={settings.socialLinks.linkedin}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            socialLinks: { ...settings.socialLinks, linkedin: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 bg-black border border-white/10 rounded-sm text-xs text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-white/50 block mb-1">Twitter / X</label>
                      <input
                        type="text"
                        value={settings.socialLinks.twitter}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            socialLinks: { ...settings.socialLinks, twitter: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 bg-black border border-white/10 rounded-sm text-xs text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-sm bg-purple-500 hover:bg-purple-400 text-black font-black uppercase tracking-wider text-xs flex items-center gap-2 shadow-lg shadow-purple-500/25 cursor-pointer transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Website Settings</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 7: ADMIN PROFILE & SECURITY */}
          {currentTab === 'profile' && (
            <div className="space-y-8 animate-in fade-in duration-200 max-w-3xl">
              <div>
                <h2 className="text-2xl font-black uppercase tracking-tighter text-white">Admin Profile & Security</h2>
                <p className="text-xs text-white/50">
                  Manage your credentials, admin identity, and update password.
                </p>
              </div>

              {/* Profile Details */}
              <form onSubmit={handleUpdateProfile} className="p-8 rounded-sm bg-[#0A0A0A] border border-white/10 space-y-5">
                <h3 className="text-base font-black uppercase tracking-tight text-white">Administrator Identity</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-white/50 font-bold mb-2">Display Name</label>
                    <input
                      type="text"
                      required
                      value={profileForm.name}
                      onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                      className="w-full px-4 py-3 bg-black border border-white/10 rounded-sm text-xs text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-white/50 font-bold mb-2">Username</label>
                    <input
                      type="text"
                      required
                      value={profileForm.username}
                      onChange={(e) => setProfileForm({ ...profileForm, username: e.target.value })}
                      className="w-full px-4 py-3 bg-black border border-white/10 rounded-sm text-xs text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-white/50 font-bold mb-2">Admin Email</label>
                  <input
                    type="email"
                    required
                    value={profileForm.email}
                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                    className="w-full px-4 py-3 bg-black border border-white/10 rounded-sm text-xs text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-sm bg-white/5 hover:bg-white/10 text-purple-400 font-black uppercase tracking-wider text-xs border border-purple-500/30 transition-colors cursor-pointer"
                >
                  Update Profile Info
                </button>
              </form>

              {/* Change Password */}
              <form onSubmit={handleChangePassword} className="p-8 rounded-sm bg-[#0A0A0A] border border-white/10 space-y-5">
                <h3 className="text-base font-black uppercase tracking-tight text-white">Change Admin Password</h3>

                {passwordStatus && (
                  <div
                    className={`p-3.5 rounded-sm text-xs flex items-center gap-2 ${
                      passwordStatus.type === 'success'
                        ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
                        : 'bg-rose-500/10 border border-rose-500/30 text-rose-400'
                    }`}
                  >
                    {passwordStatus.type === 'success' ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      <AlertCircle className="w-4 h-4" />
                    )}
                    <span>{passwordStatus.msg}</span>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-mono uppercase text-white/50 font-bold mb-2">Current Password</label>
                  <input
                    type="password"
                    required
                    value={passwordForm.currentPassword}
                    onChange={(e) =>
                      setPasswordForm({ ...passwordForm, currentPassword: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-black border border-white/10 rounded-sm text-xs text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-white/50 font-bold mb-2">New Password (min 8 chars)</label>
                    <input
                      type="password"
                      required
                      value={passwordForm.newPassword}
                      onChange={(e) =>
                        setPasswordForm({ ...passwordForm, newPassword: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-black border border-white/10 rounded-sm text-xs text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-white/50 font-bold mb-2">Confirm New Password</label>
                    <input
                      type="password"
                      required
                      value={passwordForm.confirmPassword}
                      onChange={(e) =>
                        setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-black border border-white/10 rounded-sm text-xs text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 rounded-sm bg-purple-500 hover:bg-purple-400 text-black font-black uppercase tracking-wider text-xs shadow-lg shadow-purple-500/20 cursor-pointer transition-colors"
                >
                  Update & Encrypt Password
                </button>
              </form>
            </div>
          )}
        </main>
      </div>

      {/* PORTFOLIO MODAL */}
      {isPortfolioModalOpen && editingPortfolio && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-2xl bg-[#0A0A0A] border border-white/10 rounded-sm p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh] text-white">
            <button
              onClick={() => setIsPortfolioModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-sm bg-white/5 text-white/60 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-black uppercase tracking-tight text-white mb-4">
              {editingPortfolio.id ? 'Edit Project' : 'Create New Portfolio Project'}
            </h3>

            <form onSubmit={handleSavePortfolio} className="space-y-4 text-xs">
              <div>
                <label className="block text-white/50 mb-1 font-mono uppercase font-bold">Title *</label>
                <input
                  type="text"
                  required
                  value={editingPortfolio.title || ''}
                  onChange={(e) => setEditingPortfolio({ ...editingPortfolio, title: e.target.value })}
                  className="w-full px-3 py-2 bg-black border border-white/10 rounded-sm text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-white/50 mb-1 font-mono uppercase font-bold">Category *</label>
                  <select
                    value={editingPortfolio.category || 'Website Development'}
                    onChange={(e) => setEditingPortfolio({ ...editingPortfolio, category: e.target.value as any })}
                    className="w-full px-3 py-2 bg-black border border-white/10 rounded-sm text-white focus:outline-none focus:border-purple-500"
                  >
                    <option value="Website Development">Website Development</option>
                    <option value="Mobile App Development">Mobile App Development</option>
                    <option value="Custom Software">Custom Software</option>
                    <option value="Digital Marketing">Digital Marketing</option>
                    <option value="Maintenance & Support">Maintenance & Support</option>
                  </select>
                </div>
                <div>
                  <label className="block text-white/50 mb-1 font-mono uppercase font-bold">Client Name</label>
                  <input
                    type="text"
                    value={editingPortfolio.client || ''}
                    onChange={(e) => setEditingPortfolio({ ...editingPortfolio, client: e.target.value })}
                    className="w-full px-3 py-2 bg-black border border-white/10 rounded-sm text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/50 mb-1 font-mono uppercase font-bold">Image URL</label>
                <input
                  type="url"
                  value={editingPortfolio.image || ''}
                  onChange={(e) => setEditingPortfolio({ ...editingPortfolio, image: e.target.value })}
                  className="w-full px-3 py-2 bg-black border border-white/10 rounded-sm text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-white/50 mb-1 font-mono uppercase font-bold">Short Summary Description *</label>
                <textarea
                  rows={2}
                  required
                  value={editingPortfolio.description || ''}
                  onChange={(e) => setEditingPortfolio({ ...editingPortfolio, description: e.target.value })}
                  className="w-full px-3 py-2 bg-black border border-white/10 rounded-sm text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-white/50 mb-1 font-mono uppercase font-bold">Full Case Study Narrative</label>
                <textarea
                  rows={4}
                  value={editingPortfolio.longDescription || ''}
                  onChange={(e) => setEditingPortfolio({ ...editingPortfolio, longDescription: e.target.value })}
                  className="w-full px-3 py-2 bg-black border border-white/10 rounded-sm text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsPortfolioModalOpen(false)}
                  className="px-4 py-2 rounded-sm bg-white/5 text-white/70 font-bold uppercase tracking-wider text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-sm bg-purple-500 hover:bg-purple-400 text-black font-black uppercase tracking-wider text-xs transition-colors"
                >
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* BLOG MODAL */}
      {isBlogModalOpen && editingBlog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-2xl bg-[#0A0A0A] border border-white/10 rounded-sm p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh] text-white">
            <button
              onClick={() => setIsBlogModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-sm bg-white/5 text-white/60 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-black uppercase tracking-tight text-white mb-4">
              {editingBlog.id ? 'Edit Blog Post' : 'Write New Article'}
            </h3>

            <form onSubmit={handleSaveBlog} className="space-y-4 text-xs">
              <div>
                <label className="block text-white/50 mb-1 font-mono uppercase font-bold">Title *</label>
                <input
                  type="text"
                  required
                  value={editingBlog.title || ''}
                  onChange={(e) => setEditingBlog({ ...editingBlog, title: e.target.value })}
                  className="w-full px-3 py-2 bg-black border border-white/10 rounded-sm text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-white/50 mb-1 font-mono uppercase font-bold">Category</label>
                  <input
                    type="text"
                    value={editingBlog.category || ''}
                    onChange={(e) => setEditingBlog({ ...editingBlog, category: e.target.value })}
                    className="w-full px-3 py-2 bg-black border border-white/10 rounded-sm text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-white/50 mb-1 font-mono uppercase font-bold">Read Time</label>
                  <input
                    type="text"
                    value={editingBlog.readTime || '5 min read'}
                    onChange={(e) => setEditingBlog({ ...editingBlog, readTime: e.target.value })}
                    className="w-full px-3 py-2 bg-black border border-white/10 rounded-sm text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/50 mb-1 font-mono uppercase font-bold">Cover Image URL</label>
                <input
                  type="url"
                  value={editingBlog.coverImage || ''}
                  onChange={(e) => setEditingBlog({ ...editingBlog, coverImage: e.target.value })}
                  className="w-full px-3 py-2 bg-black border border-white/10 rounded-sm text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-white/50 mb-1 font-mono uppercase font-bold">Excerpt *</label>
                <textarea
                  rows={2}
                  required
                  value={editingBlog.excerpt || ''}
                  onChange={(e) => setEditingBlog({ ...editingBlog, excerpt: e.target.value })}
                  className="w-full px-3 py-2 bg-black border border-white/10 rounded-sm text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-white/50 mb-1 font-mono uppercase font-bold">Article Content (Markdown supported) *</label>
                <textarea
                  rows={6}
                  required
                  value={editingBlog.content || ''}
                  onChange={(e) => setEditingBlog({ ...editingBlog, content: e.target.value })}
                  className="w-full px-3 py-2 bg-black border border-white/10 rounded-sm text-white font-mono focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsBlogModalOpen(false)}
                  className="px-4 py-2 rounded-sm bg-white/5 text-white/70 font-bold uppercase tracking-wider text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-sm bg-purple-500 hover:bg-purple-400 text-black font-black uppercase tracking-wider text-xs transition-colors"
                >
                  Publish Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TESTIMONIAL MODAL */}
      {isTestimonialModalOpen && editingTestimonial && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-xl bg-[#0A0A0A] border border-white/10 rounded-sm p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh] text-white">
            <button
              onClick={() => setIsTestimonialModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-sm bg-white/5 text-white/60 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-black uppercase tracking-tight text-white mb-4">
              {editingTestimonial.id ? 'Edit Testimonial' : 'Add Client Endorsement'}
            </h3>

            <form onSubmit={handleSaveTestimonial} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-white/50 mb-1 font-mono uppercase font-bold">Client Name *</label>
                  <input
                    type="text"
                    required
                    value={editingTestimonial.clientName || ''}
                    onChange={(e) => setEditingTestimonial({ ...editingTestimonial, clientName: e.target.value })}
                    className="w-full px-3 py-2 bg-black border border-white/10 rounded-sm text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-white/50 mb-1 font-mono uppercase font-bold">Company</label>
                  <input
                    type="text"
                    value={editingTestimonial.clientCompany || ''}
                    onChange={(e) => setEditingTestimonial({ ...editingTestimonial, clientCompany: e.target.value })}
                    className="w-full px-3 py-2 bg-black border border-white/10 rounded-sm text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-white/50 mb-1 font-mono uppercase font-bold">Role / Title</label>
                  <input
                    type="text"
                    value={editingTestimonial.clientRole || ''}
                    onChange={(e) => setEditingTestimonial({ ...editingTestimonial, clientRole: e.target.value })}
                    className="w-full px-3 py-2 bg-black border border-white/10 rounded-sm text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-white/50 mb-1 font-mono uppercase font-bold">Rating (Stars 1-5)</label>
                  <select
                    value={editingTestimonial.rating || 5}
                    onChange={(e) => setEditingTestimonial({ ...editingTestimonial, rating: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-black border border-white/10 rounded-sm text-white focus:outline-none focus:border-purple-500"
                  >
                    <option value={5}>5 Stars (Exceptional)</option>
                    <option value={4}>4 Stars (Great)</option>
                    <option value={3}>3 Stars (Average)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-white/50 mb-1 font-mono uppercase font-bold">Client Avatar Image URL</label>
                <input
                  type="url"
                  value={editingTestimonial.avatar || ''}
                  onChange={(e) => setEditingTestimonial({ ...editingTestimonial, avatar: e.target.value })}
                  className="w-full px-3 py-2 bg-black border border-white/10 rounded-sm text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-white/50 mb-1 font-mono uppercase font-bold">Quote / Review *</label>
                <textarea
                  rows={3}
                  required
                  value={editingTestimonial.quote || ''}
                  onChange={(e) => setEditingTestimonial({ ...editingTestimonial, quote: e.target.value })}
                  className="w-full px-3 py-2 bg-black border border-white/10 rounded-sm text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsTestimonialModalOpen(false)}
                  className="px-4 py-2 rounded-sm bg-white/5 text-white/70 font-bold uppercase tracking-wider text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-sm bg-purple-500 hover:bg-purple-400 text-black font-black uppercase tracking-wider text-xs transition-colors"
                >
                  Save Testimonial
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
