import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';

const Layout: React.FC = () => {
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
          <main className="pb-32">
            <Outlet />
          </main>
          
          {/* Built with Bolt.new Badge - Top Right Corner */}
          <div className="fixed top-4 right-4 z-50">
            <a
              href="https://bolt.new"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-3 py-2 bg-white/90 backdrop-blur-md rounded-full text-xs font-semibold text-calm-700 hover:text-calm-900 hover:bg-white transition-all duration-300 shadow-gentle border border-white/60 hover:shadow-soft hover:scale-105 active:scale-95"
            >
              <span className="mr-1.5 text-sm">⚡</span>
              Built with Bolt.new
            </a>
          </div>
          
          <Navigation />
        </div>
      </div>
    </div>
  );
};

export default Layout;