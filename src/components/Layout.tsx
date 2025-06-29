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
          
          {/* Built with Bolt.new Footer */}
          <div className="fixed bottom-20 left-0 right-0 z-40 px-6">
            <div className="max-w-sm mx-auto">
              <div className="text-center">
                <a
                  href="https://bolt.new"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-3 py-1.5 bg-white/60 backdrop-blur-sm rounded-full text-xs text-calm-600 hover:text-calm-800 hover:bg-white/80 transition-all duration-300 shadow-soft border border-white/50"
                >
                  <span className="mr-1">⚡</span>
                  Built with Bolt.new
                </a>
              </div>
            </div>
          </div>
          
          <Navigation />
        </div>
      </div>
    </div>
  );
};

export default Layout;