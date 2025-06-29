import React, { useState } from 'react';
import { User, Settings, Bell, Shield, HelpCircle, LogOut, Edit3, Camera, ChevronRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Profile: React.FC = () => {
  const { user, logout, updateProfile } = useAuth();
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

  if (!user) return null;

  return (
    <div className="min-h-screen px-6 pt-16 pb-28">
      <div className="max-w-sm mx-auto animate-fade-in">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-lavender-500 to-softblue-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-gentle">
            <User className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-semibold text-calm-800 mb-2">Profile</h1>
          <p className="text-calm-600 text-sm">Manage your account and preferences</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 mb-6 shadow-soft border border-white/50">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-calm-800">Personal Information</h2>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="w-10 h-10 bg-lavender-100 rounded-full flex items-center justify-center hover:bg-lavender-200 transition-colors"
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
                {new Date(user.joinDate).toLocaleDateString('en-US', { 
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
                  className="w-full p-3 bg-offwhite-100/50 border border-offwhite-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-lavender-300 focus:border-transparent text-calm-800"
                />
              ) : (
                <div className="p-3 bg-offwhite-100/30 rounded-2xl text-calm-800">{user.name}</div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-calm-700 mb-2">Email</label>
              {isEditing ? (
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full p-3 bg-offwhite-100/50 border border-offwhite-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-lavender-300 focus:border-transparent text-calm-800"
                />
              ) : (
                <div className="p-3 bg-offwhite-100/30 rounded-2xl text-calm-800">{user.email}</div>
              )}
            </div>

            {isEditing && (
              <div className="flex space-x-3 pt-2">
                <button
                  onClick={handleSaveProfile}
                  className="flex-1 bg-gradient-to-r from-lavender-500 to-softblue-500 text-white py-3 px-4 rounded-2xl font-semibold shadow-gentle transition-all duration-300 hover:shadow-soft hover:scale-105 active:scale-95"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setEditForm({ name: user.name, email: user.email });
                  }}
                  className="flex-1 bg-offwhite-200 text-calm-700 py-3 px-4 rounded-2xl font-semibold transition-all duration-300 hover:bg-offwhite-300"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Notifications Settings */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 mb-6 shadow-soft border border-white/50">
          <h2 className="font-semibold text-calm-800 mb-4 flex items-center">
            <Bell className="w-5 h-5 mr-2 text-lavender-600" />
            Notification Preferences
          </h2>
          
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
                  <div className="text-xs text-calm-600">
                    {key === 'dailyReminders' && 'Get gentle reminders to check in with yourself'}
                    {key === 'moodTracking' && 'Reminders to log your daily mood'}
                    {key === 'journalPrompts' && 'Inspiring prompts for journal writing'}
                    {key === 'weeklyInsights' && 'Summary of your wellness journey'}
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
          <div key={groupIndex} className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 mb-6 shadow-soft border border-white/50">
            <h2 className="font-semibold text-calm-800 mb-4">{group.title}</h2>
            <div className="space-y-2">
              {group.items.map((item, itemIndex) => (
                <button
                  key={itemIndex}
                  className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-offwhite-100/50 transition-colors"
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
          onClick={logout}
          className="w-full bg-red-50 hover:bg-red-100 text-red-600 py-4 px-6 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center shadow-soft border border-red-200"
        >
          <LogOut className="w-5 h-5 mr-2" />
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Profile;