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
          
          {/* Built with Bolt.new Footer - More prominent positioning */}
          <div className="fixed bottom-20 left-0 right-0 z-40 px-6 pointer-events-none">
            <div className="max-w-sm mx-auto">
              <div className="text-center">
                <a
                  href="https://bolt.new"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-md rounded-full text-xs font-medium text-calm-700 hover:text-calm-900 hover:bg-white/90 transition-all duration-300 shadow-soft border border-white/60 hover:shadow-gentle pointer-events-auto"
                >
                  <span className="mr-1.5 text-sm">⚡</span>
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