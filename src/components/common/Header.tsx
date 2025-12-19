import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import routes from "../../routes";
import { Flame, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigation = routes.filter((route) => route.visible !== false);

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-card/95">
      <nav className="max-w-7xl mx-auto px-4 xl:px-8">
        <div className="flex justify-between items-center h-16 xl:h-20">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 xl:w-12 xl:h-12 bg-primary rounded-full flex items-center justify-center glow-effect">
              <Flame className="w-6 h-6 xl:w-7 xl:h-7 text-white" />
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
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;