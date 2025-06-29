import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navigation from './Navigation';

const Layout: React.FC = () => {
  const location = useLocation();
  
  // Check if we're on dashboard page and should potentially hide nav
  const isDashboard = location.pathname === '/dashboard';

  return (
    <div className="min-h-screen bg-gradient-to-br from-lavender-50 via-offwhite-100 to-softblue-50">
      <div className="relative">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 20% 80%, rgba(167, 139, 250, 0.1) 0%, transparent 50%),
                             radial-gradient(circle at 80% 20%, rgba(56, 189, 248, 0.1) 0%, transparent 50%)`
          }} />
        </div>
        
        <div className="relative z-10">
          <main className="pb-20">
            <Outlet />
          </main>
          <Navigation />
        </div>
      </div>
    </div>
  );
};

export default Layout;