import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, BookOpen, Heart, MessageCircle, BarChart3, User } from 'lucide-react';

const Navigation: React.FC = () => {
  const navItems = [
    { to: '/', icon: Home, label: 'Home' },
    { to: '/journal', icon: BookOpen, label: 'Journal' },
    { to: '/mood', icon: Heart, label: 'Mood' },
    { to: '/chat', icon: MessageCircle, label: 'Chat' },
    { to: '/dashboard', icon: BarChart3, label: 'Dashboard' },
    { to: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4">
      <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-gentle border border-white/50 mx-auto max-w-md">
        <div className="flex justify-around items-center py-3 px-2">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex flex-col items-center py-2 px-3 rounded-2xl transition-all duration-300 ${
                  isActive
                    ? 'text-lavender-600 bg-lavender-50 shadow-calm'
                    : 'text-calm-500 hover:text-lavender-500 hover:bg-lavender-50/50'
                }`
              }
            >
              <Icon size={20} className="mb-1" />
              <span className="text-xs font-medium">{label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;