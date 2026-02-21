import React, { useState } from "react";
import { Link, useLocation,useNavigate } from "react-router-dom";
import routes from "../../routes";
import { Flame, Menu, X , LogIn, LogOut, User} from "lucide-react";
import { Button } from "@/components/ui/button";
import churchLogo from "@/assets/Church Logo.jpeg"
import { useAuth } from "@/context/AuthContext";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, profile, signOut, isAdmin } = useAuth();
  const navigation = routes.filter((route) => route.visible !== false);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-card/95">
      <nav className="max-w-7xl mx-auto px-4 xl:px-8">
        <div className="flex justify-between items-center h-16 xl:h-20">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 xl:w-12 xl:h-12 bg-primary rounded-full flex items-center justify-center glow-effect">
              <img
  src={churchLogo}
  alt="Holy Ghost Power Anointed Church International Logo"
  className="w-16 h-16 xl:w-20 xl:h-20 mx-auto animate-pulse object-contain"
/>
            </div>
            <div className="hidden xl:block">
              <div className="text-base xl:text-lg font-bold gradient-text">
                Holy Ghost Power
              </div>
              <div className="text-xs xl:text-sm text-muted-foreground">
                Anointed Church International
              </div>
            </div>
            <div className="xl:hidden">
              <div className="text-sm font-bold gradient-text">HGPACI</div>
            </div>
          </Link>

          <div className="hidden xl:flex items-center gap-1">
            {navigation.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-300 ${
                  location.pathname === item.path
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-muted hover:text-primary"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Button asChild size="sm" className="ml-4">
              <Link to="/give">Give</Link>
            </Button>

              {/* Admin Link */}
            {isAdmin && (
              <Button asChild size="sm" variant="outline" className="ml-2">
                <Link to="/admin">Admin</Link>
              </Button>
            )}
            
            {/* Auth Buttons */}
            {user ? (
              <div className="flex items-center gap-2 ml-4">
                {isAdmin && (
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-medium">
                    Admin
                  </span>
                )}
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {profile?.username}
                </span>
                <Button variant="outline" size="sm" onClick={handleSignOut}>
                  <LogOut className="w-4 h-4 mr-1" />
                  Logout
                </Button>
              </div>
            ) : (
              <Button variant="outline" size="sm" asChild className="ml-4">
                <Link to="/login">
                  <LogIn className="w-4 h-4 mr-1" />
                  Login
                </Link>
              </Button>
            )}

          </div>

          <button
            className="xl:hidden p-2 rounded-md hover:bg-muted"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>

        {isMenuOpen && (
          <div className="xl:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-2">
              {navigation.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-3 text-base font-medium rounded-md transition-all duration-300 ${
                    location.pathname === item.path
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-muted hover:text-primary"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <Button asChild className="mt-2">
                <Link to="/give" onClick={() => setIsMenuOpen(false)}>
                  Give
                </Link>
              </Button>

                {/* Admin Link for Mobile */}
              {isAdmin && (
                <Button asChild variant="outline" className="mt-2">
                  <Link to="/admin" onClick={() => setIsMenuOpen(false)}>
                    Admin Panel
                  </Link>
                </Button>
              )}
              
              {/* Mobile Auth Buttons */}
              {user ? (
                <div className="mt-4 pt-4 border-t border-border space-y-2">
                  <div className="px-4 py-2 text-sm text-muted-foreground flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{profile?.username}</span>
                    {isAdmin && (
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-medium">
                        Admin
                      </span>
                    )}
                  </div>
                  <Button variant="outline" className="w-full" onClick={() => {
                    handleSignOut();
                    setIsMenuOpen(false);
                  }}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </div>
              ) : (
                <Button variant="outline" asChild className="mt-4">
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                    <LogIn className="w-4 h-4 mr-2" />
                    Login
                  </Link>
                </Button>
              )}
              
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;