import React, { useContext, useState } from 'react';
import { Outlet, Link, useLocation, Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { 
  Menu, 
  X, 
  Home, 
  User, 
  Calendar, 
  Plus, 
  Settings, 
  BarChart3, 
  Users, 
  Shield,
  LogOut,
  Bell,
  Search
} from 'lucide-react';
import { cn } from '../lib/utils';
import { Badge } from '../components/ui/badge';

const DashboardLayout = () => {
  const { user, userProfile, signOutUser, isAdmin, isProvider, loading } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const userMenuItems = [
    { to: '/dashboard', label: 'Overview', icon: BarChart3 },
    { to: '/dashboard/bookings', label: 'My Bookings', icon: Calendar },
    { to: '/dashboard/profile', label: 'Profile', icon: User },
  ];

  const providerMenuItems = [
    { to: '/dashboard', label: 'Overview', icon: BarChart3 },
    { to: '/dashboard/services', label: 'My Services', icon: Settings },
    { to: '/dashboard/add-service', label: 'Add Service', icon: Plus },
    { to: '/dashboard/bookings', label: 'Bookings', icon: Calendar },
    { to: '/dashboard/profile', label: 'Profile', icon: User },
  ];

  const adminMenuItems = [
    { to: '/dashboard', label: 'Overview', icon: BarChart3 },
    { to: '/dashboard/users', label: 'Users Management', icon: Users },
    { to: '/dashboard/admin-bookings', label: 'Bookings Management', icon: Calendar },
    { to: '/dashboard/profile', label: 'Profile', icon: User },
  ];

  const getMenuItems = () => {
    if (isAdmin()) return adminMenuItems;
    if (isProvider()) return providerMenuItems;
    return userMenuItems;
  };

  const handleSignOut = async () => {
    try {
      await signOutUser();
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const SidebarItem = ({ to, label, icon: Icon, mobile = false }) => {
    const isActive = location.pathname === to;
    
    return (
      <Link
        to={to}
        onClick={() => mobile && setSidebarOpen(false)}
        className={cn(
          "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
          isActive
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:text-foreground hover:bg-accent"
        )}
      >
        <Icon className="h-4 w-4" />
        {label}
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-8">
          <div className="flex items-center gap-6 space-x-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>
            
            <Link to="/" className="flex items-center">          
              <span className="font-bold text-xl">DailyFix</span>
            </Link>
          </div>
          <div className="flex items-center gap-3">
              {userProfile?.image ? (
                <img
                  src={userProfile.image}
                  alt={userProfile.name}
                  className="h-8 w-8 rounded-full"
                />
              ) : (
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                  <User className="h-4 w-4 text-primary-foreground" />
                </div>
              )}
              <div className="hidden sm:block">
                <p className="text-sm font-medium">{userProfile?.name || user.displayName}</p>
              </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-card border-r transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          <div className="flex flex-col h-full pt-16 lg:pt-0">
            <div className="flex-1 flex flex-col min-h-0 p-4">
              <nav className="flex-1 space-y-2">
                {getMenuItems().map((item) => (
                  <SidebarItem key={item.to} {...item} />
                ))}
              </nav>
              
              <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                <Button
                  variant="ghost"
                  onClick={handleSignOut}
                  className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <LogOut className="h-4 w-4 mr-3" />
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
        </aside>

        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main content */}
        <main className="flex-1 lg:ml-0">
          <div className="container mx-auto px-4 py-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;