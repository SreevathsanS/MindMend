import React, { useState } from 'react';
import { Calendar, Brain, Sparkles, TrendingUp, ArrowLeft } from 'lucide-react';
import { mockJournalEntries, calmingSuggestions } from '../data/mockData';
import { JournalEntry } from '../types';

const Journal: React.FC = () => {
  const [entries, setEntries] = useState<JournalEntry[]>(mockJournalEntries);
  const [currentEntry, setCurrentEntry] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);
  const [showAnalysis, setShowAnalysis] = useState(false);

  const emotions = ['Anxious', 'Calm', 'Stressed', 'Happy', 'Sad', 'Peaceful', 'Overwhelmed', 'Content'];
  
  const handleAnalyze = async () => {
    if (!currentEntry.trim()) return;

    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
      const randomBurnoutScore = Math.floor(Math.random() * 10) + 1;
      const randomSuggestion = calmingSuggestions[Math.floor(Math.random() * calmingSuggestions.length)];
      
      const newEntry: JournalEntry = {
        id: Date.now().toString(),
        date: new Date().toISOString().split('T')[0],
        content: currentEntry,
        analysis: {
          emotion: randomEmotion,
          burnoutScore: randomBurnoutScore,
          feedback: randomSuggestion
        }
      };
      
      setEntries([newEntry, ...entries]);
      setSelectedEntry(newEntry);
      setCurrentEntry('');
      setIsAnalyzing(false);
      setShowAnalysis(true);
    }, 2000);
  };

  const getBurnoutColor = (score: number) => {
    if (score <= 3) return 'text-green-600 bg-green-50';
    if (score <= 6) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-500 bg-red-50';
  };

  if (showAnalysis && selectedEntry?.analysis) {
    return (
      <div className="min-h-screen px-6 pt-16 pb-28">
        <div className="max-w-sm mx-auto animate-fade-in">
          {/* Header */}
          <div className="flex items-center mb-8">
            <button 
              onClick={() => setShowAnalysis(false)}
              className="w-10 h-10 bg-white/70 backdrop-blur-sm rounded-full flex items-center justify-center shadow-soft border border-white/50 mr-4"
            >
              <ArrowLeft className="w-5 h-5 text-calm-600" />
            </button>
            <div>
              <h1 className="text-xl font-semibold text-calm-800">Analysis Results</h1>
              <p className="text-sm text-calm-600 leading-relaxed">AI insights from your entry</p>
            </div>
          </div>

          {/* Analysis Results */}
          <div className="space-y-6">
            {/* Emotion Detection */}
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-soft border border-white/50">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-lavender-400 to-lavender-500 rounded-full flex items-center justify-center mr-3">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-calm-800">Detected Emotion</h3>
                  <p className="text-xs text-calm-600 leading-relaxed">How you're feeling</p>
                </div>
              </div>
              <div className="bg-lavender-50 rounded-2xl p-4">
                <p className="text-lg font-semibold text-lavender-700">{selectedEntry.analysis.emotion}</p>
              </div>
            </div>

            {/* Burnout Score */}
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-soft border border-white/50">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-softblue-400 to-softblue-500 rounded-full flex items-center justify-center mr-3">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-calm-800">Burnout Score</h3>
                  <p className="text-xs text-calm-600 leading-relaxed">Stress level indicator</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex-1 bg-calm-200 rounded-full h-3 mr-4">
                  <div 
                    className="bg-gradient-to-r from-softblue-400 to-softblue-500 h-3 rounded-full transition-all duration-1000"
                    style={{ width: `${selectedEntry.analysis.burnoutScore * 10}%` }}
                  ></div>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-semibold ${getBurnoutColor(selectedEntry.analysis.burnoutScore)}`}>
                  {selectedEntry.analysis.burnoutScore}/10
                </div>
              </div>
            </div>

            {/* Calming Suggestion */}
            <div className="bg-gradient-to-br from-lavender-50 to-softblue-50 rounded-3xl p-6 shadow-soft border border-white/50">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-lavender-500 to-softblue-500 rounded-full flex items-center justify-center mr-3">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-calm-800">Calming Suggestion</h3>
                  <p className="text-xs text-calm-600 leading-relaxed">Try this to feel better</p>
                </div>
              </div>
              <p className="text-calm-700 leading-relaxed">{selectedEntry.analysis.feedback}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 pt-16 pb-28">
      <div className="max-w-sm mx-auto animate-fade-in">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-lavender-400 to-lavender-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-gentle">
            <Calendar className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-semibold text-calm-800 mb-2">Journal</h1>
          <p className="text-calm-600 text-sm leading-relaxed">Express your thoughts and feelings</p>
        </div>

        {/* New Entry */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 mb-8 shadow-soft border border-white/50">
          <h2 className="font-semibold text-calm-800 mb-4 flex items-center">
            <Sparkles className="w-5 h-5 mr-2 text-lavender-500" />
            How are you feeling today?
          </h2>
          
          <textarea
            value={currentEntry}
            onChange={(e) => setCurrentEntry(e.target.value)}
            placeholder="Share what's on your mind... Your thoughts are safe here."
            className="w-full h-40 p-4 bg-offwhite-100/50 border border-offwhite-300 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-lavender-300 focus:border-transparent text-calm-800 placeholder-calm-400 text-sm leading-relaxed"
          />
          
          <button
            onClick={handleAnalyze}
            disabled={!currentEntry.trim() || isAnalyzing}
            className="mt-4 w-full bg-gradient-to-r from-lavender-500 to-softblue-500 text-white py-4 px-6 rounded-2xl font-semibold shadow-gentle disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-soft hover:scale-105 active:scale-95 flex items-center justify-center"
          >
            {isAnalyzing ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                Analyzing your entry...
              </>
            ) : (
              <>
                <Brain className="w-5 h-5 mr-2" />
                Analyze Entry
              </>
            )}
          </button>
        </div>

        {/* Previous Entries */}
        <div className="space-y-4">
          <h2 className="font-semibold text-calm-800 text-lg">Previous Entries</h2>
          {entries.map((entry) => (
            <div
              key={entry.id}
              onClick={() => {
                setSelectedEntry(entry);
                if (entry.analysis) setShowAnalysis(true);
              }}
              className="bg-white/50 backdrop-blur-sm rounded-2xl p-4 shadow-soft border border-white/50 cursor-pointer transition-all duration-300 hover:shadow-gentle hover:bg-white/70"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-medium text-calm-600">
                  {new Date(entry.date).toLocaleDateString('en-US', { 
                    weekday: 'short', 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </span>
                {entry.analysis && (
                  <span className="text-xs bg-lavender-100 text-lavender-700 px-2 py-1 rounded-full font-medium">
                    Analyzed
                  </span>
                )}
              </div>
              <p className="text-calm-700 text-sm line-clamp-3 leading-relaxed">
                {entry.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Journal;