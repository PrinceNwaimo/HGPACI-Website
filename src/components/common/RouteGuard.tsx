import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const PUBLIC_ROUTES = [
  "/",
  "/about",
  "/service-times",
  "/ministries",
  "/events",
  "/sermons",
  "/contact",
  "/give",
  "/login",
];

const ADMIN_ROUTES = ["/upload-sermon", "/admin"];

export function RouteGuard({ children }: { children: React.ReactNode }) {
  const { user, profile, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;

    const currentPath = location.pathname;

    const isPublic = PUBLIC_ROUTES.includes(currentPath);
    const isAdminRoute = ADMIN_ROUTES.some(route =>
      currentPath.startsWith(route)
    );

    // Allow public routes
    if (isPublic) return;

    // Require login for protected routes
    if (!user) {
      navigate("/login", { state: { from: currentPath }, replace: true });
      return;
    }

    // Require admin role
    if (isAdminRoute && profile?.role !== "admin") {
      navigate("/", { replace: true });
    }
  }, [user, profile, loading, location, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return <>{children}</>;
}
