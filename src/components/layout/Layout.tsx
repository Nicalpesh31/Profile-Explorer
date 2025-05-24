import React, { ReactNode, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, MapPin, Users, Settings, Home } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2 text-indigo-600 font-bold text-xl">
            <MapPin size={24} />
            <span>Profile Explorer</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link 
              to="/profiles" 
              className={`flex items-center space-x-1 font-medium ${isActive('/profiles') ? 'text-indigo-600' : 'text-gray-600 hover:text-indigo-600'}`}>
              <Users size={18} />
              <span>Profiles</span>
            </Link>
            <Link 
              to="/admin" 
              className={`flex items-center space-x-1 font-medium ${isActive('/admin') ? 'text-indigo-600' : 'text-gray-600 hover:text-indigo-600'}`}>
              <Settings size={18} />
              <span>Admin</span>
            </Link>
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-600 hover:text-indigo-600 focus:outline-none"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu">
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-gray-200">
            <div className="container mx-auto px-4 py-3">
              <nav className="flex flex-col space-y-3">
                <Link 
                  to="/profiles" 
                  className={`flex items-center space-x-2 py-2 font-medium ${isActive('/profiles') ? 'text-indigo-600' : 'text-gray-600'}`}
                  onClick={closeMobileMenu}>
                  <Users size={18} />
                  <span>Profiles</span>
                </Link>
                <Link 
                  to="/admin" 
                  className={`flex items-center space-x-2 py-2 font-medium ${isActive('/admin') ? 'text-indigo-600' : 'text-gray-600'}`}
                  onClick={closeMobileMenu}>
                  <Settings size={18} />
                  <span>Admin</span>
                </Link>
              </nav>
            </div>
          </div>
        )}
      </header>
      
      <main className="flex-grow container mx-auto px-4 py-6">
        {children}
      </main>
      
      <footer className="bg-gray-50 border-t border-gray-200 py-4">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          <p>Profile Map Explorer © {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;