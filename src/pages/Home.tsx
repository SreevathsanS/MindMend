import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Heart, MessageCircle, BarChart3, Sparkles } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { inspirationalQuotes, mockJournalEntries, getBurnoutEmoji, getBurnoutLabel } from '../data/mockData';

const Home: React.FC = () => {
  const { user } = useAuth();
  const todayQuote = inspirationalQuotes[Math.floor(Math.random() * inspirationalQuotes.length)];
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? 'Good morning' : currentHour < 18 ? 'Good afternoon' : 'Good evening';

  // Calculate current burnout score from recent entries
  const recentEntries = mockJournalEntries.filter(entry => entry.analysis);
  const averageBurnout = recentEntries.length > 0 
    ? Math.round(recentEntries.reduce((sum, entry) => sum + (entry.analysis?.burnoutScore || 0), 0) / recentEntries.length)
    : 3;

  const quickActions = [
    {
      to: '/journal',
      icon: BookOpen,
      title: 'Journal',
      description: 'Reflect and analyze',
      gradient: 'from-lavender-400 to-lavender-500',
      bgGradient: 'from-lavender-50 to-lavender-100'
    },
    {
      to: '/mood',
      icon: Heart,
      title: 'Mood',
      description: 'Track how you feel',
      gradient: 'from-softblue-400 to-softblue-500',
      bgGradient: 'from-softblue-50 to-softblue-100'
    },
    {
      to: '/chat',
      icon: MessageCircle,
      title: 'Chat',
      description: 'Talk with AI support',
      gradient: 'from-lavender-500 to-softblue-500',
      bgGradient: 'from-lavender-50 to-softblue-50'
    },
    {
      to: '/dashboard',
      icon: BarChart3,
      title: 'Dashboard',
      description: 'View your insights',
      gradient: 'from-softblue-500 to-lavender-500',
      bgGradient: 'from-softblue-50 to-lavender-50'
    }
  ];

  return (
    <div className="min-h-screen px-6 pt-16 pb-28">
      <div className="max-w-sm mx-auto animate-fade-in">
        {/* Greeting Section */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-calm-800 mb-2">
            {greeting}, {user?.name} 👋
          </h1>
          <p className="text-calm-600 text-sm">How are you feeling today?</p>
        </div>

        {/* Daily Quote */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 mb-8 shadow-soft border border-white/50 animate-slide-up">
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-lavender-400 to-lavender-500 rounded-full flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-xs font-semibold text-calm-600 mb-2 uppercase tracking-wide">
                Daily Inspiration
              </h3>
              <p className="text-calm-800 text-sm leading-relaxed font-medium">
                {todayQuote}
              </p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {quickActions.map(({ to, icon: Icon, title, description, gradient, bgGradient }, index) => (
            <Link
              key={to}
              to={to}
              className="group block animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`bg-gradient-to-br ${bgGradient} rounded-3xl p-6 shadow-soft border border-white/50 transition-all duration-300 group-hover:shadow-gentle group-hover:scale-105 group-active:scale-95 h-32`}>
                <div className={`w-12 h-12 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center mb-3 shadow-calm`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-calm-800 text-sm mb-1">{title}</h3>
                <p className="text-xs text-calm-600 leading-relaxed">{description}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Burnout Score Preview */}
        <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-5 shadow-soft border border-white/50 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="text-2xl animate-pulse-gentle">
                {getBurnoutEmoji(averageBurnout)}
              </div>
              <div>
                <h3 className="font-semibold text-calm-800 text-sm">Current Wellness</h3>
                <p className="text-xs text-calm-600">{getBurnoutLabel(averageBurnout)} stress level</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-calm-700">{averageBurnout}/10</div>
              <div className="text-xs text-calm-500">Burnout score</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;