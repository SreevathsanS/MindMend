import React, { useState } from 'react';
import { Heart, Calendar, TrendingUp } from 'lucide-react';
import { mockMoodEntries } from '../data/mockData';
import { MoodEntry } from '../types';

const MoodTracker: React.FC = () => {
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>(mockMoodEntries);
  const [currentMood, setCurrentMood] = useState<number>(3);
  const [reason, setReason] = useState('');

  const moodOptions = [
    { value: 1, emoji: '😢', label: 'Very Sad', color: 'from-red-400 to-red-500' },
    { value: 2, emoji: '😔', label: 'Sad', color: 'from-orange-400 to-orange-500' },
    { value: 3, emoji: '😐', label: 'Okay', color: 'from-yellow-400 to-yellow-500' },
    { value: 4, emoji: '😊', label: 'Good', color: 'from-green-400 to-green-500' },
    { value: 5, emoji: '😄', label: 'Great', color: 'from-emerald-400 to-emerald-500' },
  ];

  const handleSaveMood = () => {
    const selectedMoodOption = moodOptions.find(option => option.value === currentMood);
    const newEntry: MoodEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      mood: currentMood,
      emoji: selectedMoodOption?.emoji || '😐',
      reason: reason.trim() || undefined
    };

    setMoodEntries([newEntry, ...moodEntries]);
    setReason('');
  };

  const currentMoodOption = moodOptions.find(option => option.value === currentMood);

  // Get last 7 days for emoji calendar
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return date.toISOString().split('T')[0];
  });

  const getMoodForDate = (date: string) => {
    const entry = moodEntries.find(entry => entry.date === date);
    return entry ? entry.emoji : '⚪';
  };

  return (
    <div className="min-h-screen px-6 pt-16 pb-28">
      <div className="max-w-sm mx-auto animate-fade-in">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-softblue-400 to-softblue-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-gentle">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-semibold text-calm-800 mb-2">Mood Tracker</h1>
          <p className="text-calm-600 text-sm leading-relaxed">How are you feeling right now?</p>
        </div>

        {/* Current Mood Selection */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 mb-8 shadow-soft border border-white/50">
          <h2 className="font-semibold text-calm-800 mb-6 text-center">Select Your Mood</h2>
          
          {/* Current Mood Display */}
          <div className="text-center mb-6">
            <div className="text-6xl mb-3 animate-pulse-gentle">{currentMoodOption?.emoji}</div>
            <div className={`inline-block px-4 py-2 rounded-full text-white font-semibold bg-gradient-to-r ${currentMoodOption?.color}`}>
              {currentMoodOption?.label}
            </div>
          </div>

          {/* Mood Options */}
          <div className="grid grid-cols-5 gap-3 mb-6">
            {moodOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setCurrentMood(option.value)}
                className={`aspect-square rounded-2xl flex flex-col items-center justify-center transition-all duration-300 ${
                  currentMood === option.value
                    ? 'bg-gradient-to-br from-lavender-100 to-softblue-100 shadow-calm scale-110'
                    : 'bg-offwhite-100/50 hover:bg-offwhite-200/50 hover:scale-105'
                }`}
              >
                <div className="text-2xl mb-1">{option.emoji}</div>
                <div className="text-xs text-calm-600 font-medium">{option.label}</div>
              </button>
            ))}
          </div>

          {/* Reason Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-calm-700 mb-2">
              Why do you feel this way? (Optional)
            </label>
            <input
              type="text"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Work, relationships, weather, etc."
              className="w-full p-4 bg-offwhite-100/50 border border-offwhite-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-softblue-300 focus:border-transparent text-calm-800 placeholder-calm-400 text-sm"
            />
          </div>

          <button
            onClick={handleSaveMood}
            className="w-full bg-gradient-to-r from-softblue-500 to-lavender-500 text-white py-4 px-6 rounded-2xl font-semibold shadow-gentle transition-all duration-300 hover:shadow-soft hover:scale-105 active:scale-95"
          >
            Save Mood Entry
          </button>
        </div>

        {/* Emoji Calendar Week View */}
        <div className="bg-gradient-to-br from-lavender-50 to-softblue-50 rounded-3xl p-6 mb-8 shadow-soft border border-white/50">
          <h3 className="font-semibold text-calm-800 mb-4 flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-lavender-600" />
            This Week
          </h3>
          
          <div className="grid grid-cols-7 gap-2">
            {last7Days.map((date, index) => (
              <div key={date} className="text-center">
                <div className="text-xs text-calm-600 mb-2 font-medium">
                  {new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}
                </div>
                <div className="w-10 h-10 bg-white/50 rounded-full flex items-center justify-center text-xl">
                  {getMoodForDate(date)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Entries */}
        <div className="space-y-4">
          <h2 className="font-semibold text-calm-800 text-lg flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-softblue-600" />
            Recent Entries
          </h2>
          {moodEntries.slice(0, 5).map((entry) => (
            <div key={entry.id} className="bg-white/50 backdrop-blur-sm rounded-2xl p-4 shadow-soft border border-white/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{entry.emoji}</span>
                  <div>
                    <div className="font-medium text-calm-800 text-sm">
                      {moodOptions.find(option => option.value === entry.mood)?.label}
                    </div>
                    <div className="text-xs text-calm-600 leading-relaxed">
                      {new Date(entry.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </div>
                  </div>
                </div>
                {entry.reason && (
                  <div className="text-xs text-calm-600 italic max-w-24 text-right leading-relaxed">
                    {entry.reason}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoodTracker;