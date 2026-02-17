import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

// Routes that don't require authentication
const PUBLIC_ROUTES = [
  '/',
  '/about',
  '/service-times',
  '/ministries',
  '/events',
  '/sermons',
  '/contact',
  '/give',
  '/login',
];

// Routes that require admin access
const ADMIN_ROUTES = [
  '/upload-sermon',
  '/admin',
];

export function RouteGuard({ children }: { children: React.ReactNode }) {
  const { user, profile, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;

    const currentPath = location.pathname;

    // Check if route requires admin access
    const isAdminRoute = ADMIN_ROUTES.some(route => currentPath.startsWith(route));

    if (isAdminRoute) {
      if (!user) {
        // Not logged in, redirect to login
        navigate('/login', { state: { from: currentPath }, replace: true });
      } else if (profile?.role !== 'admin') {
        // Logged in but not admin, redirect to home
        navigate('/', { replace: true });
      }
    }
  }, [user, profile, loading, location, navigate]);

  // Show loading state while checking auth
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return <>{children}</>;
}