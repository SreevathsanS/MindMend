import { JournalEntry, MoodEntry } from '../types';

export const inspirationalQuotes = [
  "Every small step forward is progress worth celebrating.",
  "Your mental health is just as important as your physical health.",
  "It's okay to not be okay. Healing takes time.",
  "You are stronger than you think and braver than you feel.",
  "Self-care isn't selfish—it's essential.",
  "Progress, not perfection, is what matters most.",
  "Take time to breathe. You deserve peace and calm.",
  "Your feelings are valid, and you are not alone."
];

export const calmingSuggestions = [
  "Take 5 deep breaths and focus on the present moment",
  "Step outside for a few minutes of fresh air",
  "Listen to your favorite calming music",
  "Write down three things you're grateful for",
  "Do some gentle stretching or yoga",
  "Call a friend or loved one",
  "Take a warm shower or bath",
  "Practice the 5-4-3-2-1 grounding technique"
];

export const wellnessTips = [
  "Try journaling before bed tonight for better sleep",
  "Take a 10-minute walk to boost your mood naturally",
  "Practice gratitude by listing 3 good things from today",
  "Set boundaries with technology for mental clarity",
  "Stay hydrated—it affects your mood more than you think",
  "Connect with nature, even if it's just looking out a window",
  "Practice saying 'no' to protect your energy",
  "Remember: rest is productive too"
];

export const mockJournalEntries: JournalEntry[] = [
  {
    id: '1',
    date: '2024-01-20',
    content: 'Today was overwhelming with work deadlines, but I managed to complete most tasks. Feeling grateful for my supportive team, though the stress is getting to me.',
    analysis: {
      emotion: 'Stressed but Grateful',
      burnoutScore: 6,
      feedback: 'Your resilience shines through despite the challenges. Consider taking short breaks during demanding days to maintain your well-being.'
    }
  },
  {
    id: '2',
    date: '2024-01-19',
    content: 'Had a peaceful morning walk in the park. The fresh air and bird sounds helped clear my mind. I feel more centered and ready for whatever comes today.',
    analysis: {
      emotion: 'Peaceful and Centered',
      burnoutScore: 2,
      feedback: 'Nature connection is wonderful for mental health. Your mindful approach to starting the day is excellent—keep nurturing these peaceful moments.'
    }
  },
  {
    id: '3',
    date: '2024-01-18',
    content: 'Feeling anxious about the presentation tomorrow. My mind keeps racing with what-if scenarios. Trying to remind myself that I\'ve prepared well.',
    analysis: {
      emotion: 'Anxious',
      burnoutScore: 7,
      feedback: 'Pre-presentation nerves are completely normal. Your preparation will serve you well. Try some deep breathing exercises to calm your mind.'
    }
  }
];

export const mockMoodEntries: MoodEntry[] = [
  { id: '1', date: '2024-01-20', mood: 3, emoji: '😐', reason: 'Work stress' },
  { id: '2', date: '2024-01-19', mood: 4, emoji: '😊', reason: 'Good morning walk' },
  { id: '3', date: '2024-01-18', mood: 2, emoji: '😔', reason: 'Presentation anxiety' },
  { id: '4', date: '2024-01-17', mood: 4, emoji: '😊', reason: 'Productive day' },
  { id: '5', date: '2024-01-16', mood: 5, emoji: '😄', reason: 'Spent time with friends' },
  { id: '6', date: '2024-01-15', mood: 3, emoji: '😐', reason: 'Regular day' },
  { id: '7', date: '2024-01-14', mood: 4, emoji: '😊', reason: 'Good sleep' }
];

export const getBurnoutEmoji = (score: number): string => {
  if (score <= 3) return '😌'; // Calm
  if (score <= 5) return '😊'; // Okay
  if (score <= 7) return '😐'; // Neutral
  if (score <= 8) return '😟'; // Concerned
  return '😰'; // High stress
};

export const getBurnoutLabel = (score: number): string => {
  if (score <= 3) return 'Calm';
  if (score <= 5) return 'Balanced';
  if (score <= 7) return 'Moderate';
  if (score <= 8) return 'Elevated';
  return 'High';
};