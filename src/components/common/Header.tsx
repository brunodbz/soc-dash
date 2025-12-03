import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import routes from '@/routes';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();
  const navigation = routes.filter((route) => route.visible !== false);

  return (
    <header className="border-b bg-card sticky top-0 z-50">
      <nav className="max-w-[1600px] mx-auto px-4 xl:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-primary/10">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <span className="text-xl font-bold">SOC Dashboard</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-2">
            {navigation.map((item) => (
              <Link key={item.path} to={item.path}>
                <Button
                  variant={location.pathname === item.path ? 'default' : 'ghost'}
                  className={cn(
                    'transition-colors',
                    location.pathname === item.path && 'bg-primary text-primary-foreground'
                  )}
                >
                  {item.name}
                </Button>
              </Link>
            ))}
            {user && (
              <div className="flex items-center gap-2 pl-4 border-l">
                <div className="text-sm text-muted-foreground">
                  <div className="font-semibold text-foreground">{user.username}</div>
                  <div className="text-xs">{user.role}</div>
                </div>
                <Button variant="outline" onClick={logout}>
                  Sair
                </Button>
              </div>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
              >
                <Button
                  variant={location.pathname === item.path ? 'default' : 'ghost'}
                  className="w-full justify-start"
                >
                  {item.name}
                </Button>
              </Link>
            ))}
            {user && (
              <div className="flex items-center justify-between pt-2">
                <div className="text-sm">
                  <div className="font-semibold">{user.username}</div>
                  <div className="text-muted-foreground text-xs">{user.role}</div>
                </div>
                <Button variant="outline" size="sm" onClick={logout}>
                  Sair
                </Button>
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}
