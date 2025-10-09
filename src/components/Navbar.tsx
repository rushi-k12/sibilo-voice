import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mic, LogOut, Search, User, Radio } from 'lucide-react';

interface NavbarProps {
  showSearch?: boolean;
  searchQuery?: string;
  onSearchChange?: (value: string) => void;
  title?: string;
  subtitle?: string;
  backButton?: React.ReactNode;
}

export const Navbar = ({ 
  showSearch = false, 
  searchQuery = '', 
  onSearchChange,
  title,
  subtitle,
  backButton
}: NavbarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signOut, user } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  const isLanding = location.pathname === '/';

  return (
    <header className="border-b border-border/50 glass sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Left side - Logo or Back button */}
          <div className="flex items-center gap-4">
            {backButton ? (
              backButton
            ) : (
              <div 
                className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-smooth"
                onClick={() => navigate(user ? '/channels' : '/')}
              >
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full gradient-primary shadow-glow">
                  <Mic className="w-5 h-5 text-primary-foreground" />
                </div>
                <h1 className="text-2xl font-bold gradient-primary bg-clip-text text-transparent">
                  Sibilo
                </h1>
              </div>
            )}
            
            {/* Title and subtitle */}
            {(title || subtitle) && (
              <div className="ml-4">
                {title && (
                  <div className="flex items-center gap-2">
                    <Radio className="w-5 h-5 text-primary" />
                    <h2 className="text-xl font-bold">{title}</h2>
                  </div>
                )}
                {subtitle && (
                  <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
                )}
              </div>
            )}
          </div>

          {/* Center - Search (if enabled) */}
          {showSearch && (
            <div className="flex-1 max-w-md mx-8 hidden md:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search channels..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange?.(e.target.value)}
                  className="pl-10 glass"
                />
              </div>
            </div>
          )}

          {/* Right side - Actions */}
          <div className="flex items-center gap-2">
            {user ? (
              <>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => navigate('/profile')}
                  className="hover-glow"
                >
                  <User className="w-5 h-5" />
                </Button>
                <Button 
                  variant="outline" 
                  onClick={handleSignOut} 
                  className="gap-2 glass hover-glow"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Sign Out</span>
                </Button>
              </>
            ) : (
              <Button 
                variant="outline" 
                onClick={() => navigate('/auth')}
                className="glass hover-glow"
              >
                Sign In
              </Button>
            )}
          </div>
        </div>

        {/* Mobile search */}
        {showSearch && (
          <div className="mt-4 md:hidden">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search channels..."
                value={searchQuery}
                onChange={(e) => onSearchChange?.(e.target.value)}
                className="pl-10 glass"
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
