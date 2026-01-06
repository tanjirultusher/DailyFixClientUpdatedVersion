import { useEffect, useState, useContext } from "react";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { Button } from "./ui/button";
import { 
  Menu, 
  X, 
  User, 
  Settings, 
  LogOut, 
  Sun, 
  Moon,
  Home,
  Search,
  Plus,
  BarChart3,
  Shield
} from "lucide-react";
import { cn } from "../lib/utils";

const Navbar = () => {
  const { user, userProfile, signOutUser, isAdmin } = useContext(AuthContext);
  const navigate = useNavigate();
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem("theme") || 
             (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    }
    return 'light';
  });
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    
    // Remove both classes first
    root.classList.remove('light', 'dark');
    
    // Add the current theme class
    root.classList.add(theme);
    
    // Set data attribute for compatibility
    root.setAttribute("data-theme", theme);
    
    // Store in localStorage
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  const handleSignOut = async () => {
    try {
      await signOutUser();
      navigate("/");
      setDropdownOpen(false);
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  const publicLinks = [
    { to: "/", label: "Home", icon: Home },
    { to: "/services", label: "Services", icon: Search },
    { to: "/about", label: "About", icon: null },
    { to: "/contact", label: "Contact", icon: null }
  ];

  const userLinks = [
    { to: "/dashboard", label: "Dashboard", icon: BarChart3 },
    { to: "/add-service", label: "Add Service", icon: Plus, roles: ['provider', 'admin'] }
  ];

  // Admin navbar should only show: Home, Services, Contact, Add Services, Dashboard
  const adminNavbarLinks = [
    { to: "/", label: "Home", icon: Home },
    { to: "/services", label: "Services", icon: Search },
    { to: "/contact", label: "Contact", icon: null },
    { to: "/add-service", label: "Add Services", icon: Plus },
    { to: "/dashboard", label: "Dashboard", icon: BarChart3 }
  ];

  const getVisibleLinks = (links) => {
    return links.filter(link => {
      if (!link.roles) return true;
      return link.roles.includes(userProfile?.role);
    });
  };

  const NavItem = ({ to, label, icon: Icon, mobile = false, onClick }) => (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
          mobile ? "w-full justify-start" : "",
          isActive
            ? "bg-primary text-primary-foreground"
            : "text-foreground hover:bg-accent hover:text-accent-foreground"
        )
      }
    >
      {Icon && <Icon className="h-4 w-4" />}
      {label}
    </NavLink>
  );

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            
            <span className="font-bold text-xl">DailyFix</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {/* Admin gets specific navbar items */}
            {isAdmin() ? (
              adminNavbarLinks.map((link) => (
                <NavItem key={link.to} {...link} />
              ))
            ) : (
              <>
                {/* Public Links */}
                {publicLinks.map((link) => (
                  <NavItem key={link.to} {...link} />
                ))}

                {/* User Links */}
                {user && getVisibleLinks(userLinks).map((link) => (
                  <NavItem key={link.to} {...link} />
                ))}
              </>
            )}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={handleTheme}
              className="h-9 w-9"
            >
              {theme === "light" ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
            </Button>

            {/* User Menu or Auth Buttons */}
            {user ? (
              <div className="relative">
                <Button
                  variant="ghost"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center space-x-2 h-9"
                >
                  {userProfile?.image ? (
                    <img
                      src={userProfile.image}
                      alt={userProfile.name}
                      className="h-6 w-6 rounded-full"
                    />
                  ) : (
                    <User className="h-4 w-4" />
                  )}
                  <span className="hidden sm:inline-block">
                    {userProfile?.name || user.displayName || "User"}
                  </span>
                </Button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-popover border border-gray-200 dark:border-gray-800">
                    <div className="py-1">
                      <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-800">
                        <p className="text-sm font-medium">{userProfile?.name || user.displayName}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                        {userProfile?.role && (
                          <div className="flex items-center gap-1 mt-1">
                            <Shield className="h-3 w-3" />
                            <span className="text-xs capitalize bg-primary/10 text-primary px-2 py-0.5 rounded">
                              {userProfile.role}
                            </span>
                          </div>
                        )}
                      </div>
                      
                      <Link
                        to="/profile"
                        className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-accent"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <User className="h-4 w-4" />
                        Profile
                      </Link>
                      
                      <Link
                        to="/dashboard"
                        className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-accent"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <BarChart3 className="h-4 w-4" />
                        Dashboard
                      </Link>
                      
                      <Link
                        to="/settings"
                        className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-accent"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <Settings className="h-4 w-4" />
                        Settings
                      </Link>
                      
                      <button
                        onClick={handleSignOut}
                        className="flex items-center gap-2 w-full px-4 py-2 text-sm text-destructive hover:bg-accent"
                      >
                        <LogOut className="h-4 w-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" asChild>
                  <Link to="/login">Sign In</Link>
                </Button>
                <Button asChild>
                  <Link to="/register">Sign Up</Link>
                </Button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden h-9 w-9"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-800 py-4">
            <div className="flex flex-col space-y-2">
              {/* Admin gets specific navbar items */}
              {isAdmin() ? (
                adminNavbarLinks.map((link) => (
                  <NavItem 
                    key={link.to} 
                    {...link} 
                    mobile 
                    onClick={() => setMobileMenuOpen(false)} 
                  />
                ))
              ) : (
                <>
                  {/* Public Links */}
                  {publicLinks.map((link) => (
                    <NavItem 
                      key={link.to} 
                      {...link} 
                      mobile 
                      onClick={() => setMobileMenuOpen(false)} 
                    />
                  ))}

                  {/* User Links */}
                  {user && getVisibleLinks(userLinks).map((link) => (
                    <NavItem 
                      key={link.to} 
                      {...link} 
                      mobile 
                      onClick={() => setMobileMenuOpen(false)} 
                    />
                  ))}
                </>
              )}

              {/* Mobile Auth Buttons */}
              {!user && (
                <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200 dark:border-gray-800">
                  <Button variant="ghost" asChild className="justify-start">
                    <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                      Sign In
                    </Link>
                  </Button>
                  <Button asChild className="justify-start">
                    <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                      Sign Up
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Click outside to close dropdowns */}
      {(dropdownOpen || mobileMenuOpen) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setDropdownOpen(false);
            setMobileMenuOpen(false);
          }}
        />
      )}
    </nav>
  );
};

export default Navbar;