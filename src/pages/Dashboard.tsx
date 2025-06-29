import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Heart, Brain, Lightbulb, User, Settings, Bell, Shield, HelpCircle, LogOut, Edit3, Camera, ChevronRight, X } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';
import { mockMoodEntries, mockJournalEntries, wellnessTips, getBurnoutLabel } from '../data/mockData';
import { useAuth } from '../contexts/AuthContext';

const Dashboard: React.FC = () => {
  const { user, logout, updateProfile } = useAuth();
  const [showProfile, setShowProfile] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user?.name || '',
    email: user?.email || ''
  });
  const [notifications, setNotifications] = useState({
    dailyReminders: true,
    moodTracking: true,
    journalPrompts: false,
    weeklyInsights: true
  });

  // Hide/show navigation based on profile modal state
  useEffect(() => {
    const navElement = document.querySelector('nav.fixed.bottom-0');
    if (navElement) {
      if (showProfile) {
        navElement.style.display = 'none';
      } else {
        navElement.style.display = 'block';
      }
    }

    // Cleanup function to ensure nav is visible when component unmounts
    return () => {
      const navElement = document.querySelector('nav.fixed.bottom-0');
      if (navElement) {
        navElement.style.display = 'block';
      }
    };
  }, [showProfile]);

  // Calculate insights
  const averageMood = mockMoodEntries.length > 0 
    ? (mockMoodEntries.reduce((sum, entry) => sum + entry.mood, 0) / mockMoodEntries.length)
    : 0;

  const averageBurnout = mockJournalEntries
    .filter(entry => entry.analysis)
    .reduce((sum, entry) => sum + (entry.analysis?.burnoutScore || 0), 0) / 
    mockJournalEntries.filter(entry => entry.analysis).length || 0;

  const moodTrendData = mockMoodEntries
    .slice(0, 7)
    .reverse()
    .map(entry => ({
      date: new Date(entry.date).toLocaleDateString('en-US', { weekday: 'short' }),
      mood: entry.mood
    }));

  // Mood distribution for horizontal bar chart
  const moodDistribution = [
    { 
      name: 'Great', 
      value: mockMoodEntries.filter(e => e.mood === 5).length, 
      color: '#10b981',
      emoji: '😄'
    },
    { 
      name: 'Good', 
      value: mockMoodEntries.filter(e => e.mood === 4).length, 
      color: '#84cc16',
      emoji: '😊'
    },
    { 
      name: 'Okay', 
      value: mockMoodEntries.filter(e => e.mood === 3).length, 
      color: '#eab308',
      emoji: '😐'
    },
    { 
      name: 'Sad', 
      value: mockMoodEntries.filter(e => e.mood === 2).length, 
      color: '#f97316',
      emoji: '😔'
    },
    { 
      name: 'Very Sad', 
      value: mockMoodEntries.filter(e => e.mood === 1).length, 
      color: '#ef4444',
      emoji: '😢'
    },
  ].filter(item => item.value > 0);

  const todayTip = wellnessTips[Math.floor(Math.random() * wellnessTips.length)];

  // Key insight
  const mostFrequentMood = mockMoodEntries.reduce((acc, entry) => {
    acc[entry.mood] = (acc[entry.mood] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  const dominantMood = Object.entries(mostFrequentMood).reduce((a, b) => 
    mostFrequentMood[parseInt(a[0])] > mostFrequentMood[parseInt(b[0])] ? a : b
  )[0];

  const moodLabels = ['', 'very sad', 'sad', 'okay', 'good', 'great'];
  const keyInsight = `You felt ${moodLabels[parseInt(dominantMood)]} most often this week`;

  const handleSaveProfile = () => {
    updateProfile(editForm);
    setIsEditing(false);
  };

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const settingsGroups = [
    {
      title: 'Account',
      items: [
        {
          icon: Bell,
          label: 'Notifications',
          action: 'notifications'
        },
        {
          icon: Shield,
          label: 'Privacy & Security',
          action: 'privacy'
        }
      ]
    },
    {
      title: 'Support',
      items: [
        {
          icon: HelpCircle,
          label: 'Help & Support',
          action: 'help'
        }
      ]
    }
  ];

  // Get bar colors based on mood value
  const getBarColor = (mood: number) => {
    if (mood >= 4.5) return '#10b981'; // Green for great mood
    if (mood >= 3.5) return '#84cc16'; // Light green for good mood
    if (mood >= 2.5) return '#eab308'; // Yellow for okay mood
    if (mood >= 1.5) return '#f97316'; // Orange for sad mood
    return '#ef4444'; // Red for very sad mood
  };

  return (
    <div className="min-h-screen px-6 pt-16 pb-28">
      <div className="max-w-sm mx-auto animate-fade-in">
        {/* Header with Profile Button */}
        <div className="flex items-center justify-between mb-8">
          <div className="text-center flex-1">
            <div className="w-16 h-16 bg-gradient-to-br from-lavender-500 to-softblue-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-gentle">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-semibold text-calm-800 mb-2 leading-tight">Insights Dashboard</h1>
            <p className="text-calm-600 text-sm leading-relaxed">Your wellness journey at a glance</p>
          </div>
          
          {/* Profile Button */}
          <button
            onClick={() => setShowProfile(true)}
            className="absolute top-6 right-6 w-12 h-12 bg-white/70 backdrop-blur-sm rounded-full flex items-center justify-center shadow-soft border border-white/50 hover:bg-white/80 transition-all duration-300"
          >
            <User className="w-6 h-6 text-calm-600" />
          </button>
        </div>

        {/* Mood Trend Bar Chart - Left Aligned with Soft Background */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 mb-6 shadow-soft border border-white/50">
          <div className="text-left mb-4">
            <h3 className="font-semibold text-calm-800 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-lavender-600" />
              7-Day Mood Trend
            </h3>
          </div>
          
          {/* Left-aligned chart container with proper padding */}
          <div className="bg-gradient-to-br from-lavender-50/30 to-offwhite-50/30 rounded-2xl p-4 mb-4">
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={moodTrendData} 
                  margin={{ left: 10, right: 10, top: 10, bottom: 10 }}
                  barCategoryGap="20%"
                >
                  <XAxis 
                    dataKey="date" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 11, fill: '#64748b', textAnchor: 'middle' }}
                    interval={0}
                    height={30}
                  />
                  <YAxis 
                    domain={[0, 5]}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 11, fill: '#64748b' }}
                    orientation="left"
                    width={25}
                  />
                  <Bar 
                    dataKey="mood" 
                    radius={[6, 6, 0, 0]}
                    maxBarSize={28}
                  >
                    {moodTrendData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={getBarColor(entry.mood)} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Stats aligned to left with better spacing */}
          <div className="flex justify-start items-center space-x-8 pl-2">
            <div className="text-left">
              <div className="text-xl font-bold text-lavender-700">{averageMood.toFixed(1)}</div>
              <div className="text-xs text-calm-600 leading-relaxed">Average Mood</div>
            </div>
            <div className="text-left">
              <div className="text-xl font-bold text-softblue-700">{averageBurnout.toFixed(1)}</div>
              <div className="text-xs text-calm-600 leading-relaxed">Burnout Level</div>
            </div>
          </div>
        </div>

        {/* Mood Distribution - Horizontal Bar Chart with Left Alignment */}
        <div className="bg-gradient-to-br from-lavender-50 to-softblue-50 rounded-3xl p-6 mb-6 shadow-soft border border-white/50">
          <div className="text-left mb-4">
            <h3 className="font-semibold text-calm-800 flex items-center">
              <Heart className="w-5 h-5 mr-2 text-softblue-600" />
              Mood Distribution
            </h3>
          </div>
          
          <div className="space-y-4">
            {moodDistribution.map((item, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 w-20 flex-shrink-0">
                  <span className="text-lg">{item.emoji}</span>
                  <span className="text-sm font-medium text-calm-800">
                    {item.name}
                  </span>
                </div>
                <div className="flex items-center space-x-3 flex-1">
                  <div className="flex-1 bg-white/60 rounded-full h-3 relative overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-1000 ease-out"
                      style={{ 
                        backgroundColor: item.color,
                        width: `${(item.value / Math.max(...moodDistribution.map(d => d.value))) * 100}%`
                      }}
                    />
                  </div>
                  <span className="text-sm font-semibold text-calm-700 w-6 text-right flex-shrink-0">
                    {item.value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Insight - Left Aligned */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 mb-6 shadow-soft border border-white/50">
          <div className="text-left mb-4">
            <h3 className="font-semibold text-calm-800 flex items-center">
              <Brain className="w-5 h-5 mr-2 text-lavender-600" />
              Key Insight
            </h3>
          </div>
          
          <div className="bg-lavender-50 rounded-2xl p-4 mb-4">
            <p className="text-calm-800 font-medium text-sm leading-relaxed text-left">{keyInsight}</p>
          </div>

          <div className="text-xs text-calm-600 leading-relaxed text-left">
            {averageMood >= 4 ? 
              "Your mood has been consistently positive! Keep up the great work with your wellness practices." :
              averageMood >= 3 ?
              "Your mood is stable. Consider incorporating more self-care activities into your routine." :
              "Your mood could use some attention. Remember to be gentle with yourself and consider reaching out for support."
            }
          </div>
        </div>

        {/* Daily Wellness Tip - Left Aligned */}
        <div className="bg-gradient-to-r from-lavender-500 to-softblue-500 rounded-3xl p-6 text-white shadow-gentle">
          <div className="text-left mb-4">
            <h3 className="font-semibold flex items-center">
              <Lightbulb className="w-5 h-5 mr-2" />
              Daily Wellness Tip
            </h3>
          </div>
          
          <p className="text-lavender-50 leading-relaxed mb-4 text-sm text-left">
            {todayTip}
          </p>
          
          <div className="text-xs text-lavender-100 leading-relaxed text-left">
            💡 Small steps lead to big changes in your mental wellness journey.
          </div>
        </div>

        {/* Profile Modal */}
        {showProfile && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-6">
            <div className="bg-white rounded-3xl w-full max-w-sm max-h-[90vh] overflow-y-auto shadow-gentle animate-slide-up">
              {/* Profile Header */}
              <div className="sticky top-0 bg-white rounded-t-3xl p-6 border-b border-offwhite-200 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-calm-800">Profile</h2>
                <button
                  onClick={() => setShowProfile(false)}
                  className="w-10 h-10 bg-offwhite-100 rounded-full flex items-center justify-center hover:bg-offwhite-200 transition-colors"
                >
                  <X className="w-5 h-5 text-calm-600" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Profile Card */}
                <div className="bg-gradient-to-br from-lavender-50 to-softblue-50 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-calm-800">Personal Information</h3>
                    <button
                      onClick={() => setIsEditing(!isEditing)}
                      className="w-8 h-8 bg-lavender-100 rounded-full flex items-center justify-center hover:bg-lavender-200 transition-colors"
                    >
                      <Edit3 className="w-4 h-4 text-lavender-600" />
                    </button>
                  </div>

                  {/* Profile Picture */}
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="relative">
                      <div className="w-16 h-16 bg-gradient-to-br from-lavender-400 to-softblue-500 rounded-full flex items-center justify-center shadow-gentle">
                        <User className="w-8 h-8 text-white" />
                      </div>
                      {isEditing && (
                        <button className="absolute -bottom-1 -right-1 w-6 h-6 bg-lavender-500 rounded-full flex items-center justify-center shadow-soft">
                          <Camera className="w-3 h-3 text-white" />
                        </button>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-calm-600 mb-1">Member since</div>
                      <div className="text-calm-800 font-medium">
                        {user && new Date(user.joinDate).toLocaleDateString('en-US', { 
                          month: 'long', 
                          year: 'numeric' 
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Editable Fields */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-calm-700 mb-2">Name</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editForm.name}
                          onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                          className="w-full p-3 bg-white/50 border border-offwhite-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-lavender-300 focus:border-transparent text-calm-800"
                        />
                      ) : (
                        <div className="p-3 bg-white/30 rounded-xl text-calm-800">{user?.name}</div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-calm-700 mb-2">Email</label>
                      {isEditing ? (
                        <input
                          type="email"
                          value={editForm.email}
                          onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                          className="w-full p-3 bg-white/50 border border-offwhite-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-lavender-300 focus:border-transparent text-calm-800"
                        />
                      ) : (
                        <div className="p-3 bg-white/30 rounded-xl text-calm-800">{user?.email}</div>
                      )}
                    </div>

                    {isEditing && (
                      <div className="flex space-x-3 pt-2">
                        <button
                          onClick={handleSaveProfile}
                          className="flex-1 bg-gradient-to-r from-lavender-500 to-softblue-500 text-white py-3 px-4 rounded-xl font-semibold shadow-gentle transition-all duration-300 hover:shadow-soft"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => {
                            setIsEditing(false);
                            setEditForm({ name: user?.name || '', email: user?.email || '' });
                          }}
                          className="flex-1 bg-offwhite-200 text-calm-700 py-3 px-4 rounded-xl font-semibold transition-all duration-300 hover:bg-offwhite-300"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Notifications Settings */}
                <div className="bg-offwhite-50 rounded-2xl p-6">
                  <h3 className="font-semibold text-calm-800 mb-4 flex items-center">
                    <Bell className="w-5 h-5 mr-2 text-lavender-600" />
                    Notifications
                  </h3>
                  
                  <div className="space-y-4">
                    {Object.entries(notifications).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-calm-800 text-sm">
                            {key === 'dailyReminders' && 'Daily Wellness Reminders'}
                            {key === 'moodTracking' && 'Mood Tracking Prompts'}
                            {key === 'journalPrompts' && 'Journal Writing Prompts'}
                            {key === 'weeklyInsights' && 'Weekly Insights'}
                          </div>
                          <div className="text-xs text-calm-600 leading-relaxed">
                            {key === 'dailyReminders' && 'Get gentle reminders to check in'}
                            {key === 'moodTracking' && 'Reminders to log your mood'}
                            {key === 'journalPrompts' && 'Inspiring writing prompts'}
                            {key === 'weeklyInsights' && 'Weekly wellness summary'}
                          </div>
                        </div>
                        <button
                          onClick={() => handleNotificationChange(key as keyof typeof notifications)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            value ? 'bg-lavender-500' : 'bg-calm-300'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              value ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Settings Groups */}
                {settingsGroups.map((group, groupIndex) => (
                  <div key={groupIndex} className="bg-offwhite-50 rounded-2xl p-6">
                    <h3 className="font-semibold text-calm-800 mb-4">{group.title}</h3>
                    <div className="space-y-2">
                      {group.items.map((item, itemIndex) => (
                        <button
                          key={itemIndex}
                          className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/50 transition-colors"
                        >
                          <div className="flex items-center">
                            <item.icon className="w-5 h-5 text-calm-600 mr-3" />
                            <span className="text-calm-800 font-medium">{item.label}</span>
                          </div>
                          <ChevronRight className="w-4 h-4 text-calm-400" />
                        </button>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Logout Button */}
                <button
                  onClick={() => {
                    logout();
                    setShowProfile(false);
                  }}
                  className="w-full bg-red-50 hover:bg-red-100 text-red-600 py-4 px-6 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center border border-red-200"
                >
                  <LogOut className="w-5 h-5 mr-2" />
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;