import { RoutineItem, DailyChallenge } from './types';

export const INITIAL_ROUTINE: RoutineItem[] = [
  { id: 'wake', time: '5:30 AM', activity: 'Wake up & hydrate', category: 'morning', description: 'Water + stretch' },
  { id: 'skincare-m', time: '5:45 AM', activity: 'Morning skincare', category: 'morning', description: 'Cleanse, serum, moisturizer' },
  { id: 'walk', time: '6:00 AM', activity: 'Light walk/exercise', category: 'fitness', description: '20 mins brisk walk' },
  { id: 'breakfast', time: '7:00 AM', activity: 'Breakfast & college prep', category: 'morning' },
  { id: 'college', time: '8:00 AM - 4:00 PM', activity: 'College', category: 'college', description: 'Focus on Maths, Physics, Mech, Elec notes' },
  { id: 'rest', time: '4:00 PM', activity: 'Return home, quick snack/rest', category: 'morning' },
  { id: 'study-1', time: '4:30 PM', activity: 'Study 1: Maths/Physics', category: 'study', description: '1 hour focused session' },
  { id: 'gym', time: '5:15 PM', activity: 'Gym workout', category: 'fitness', description: '45 mins full-body beginner routine' },
  { id: 'skincare-p', time: '6:00 PM', activity: 'Post-gym skincare & shower', category: 'fitness' },
  { id: 'dinner', time: '6:30 PM', activity: 'Dinner', category: 'morning' },
  { id: 'study-2', time: '7:00 PM', activity: 'Study 2: Mech/Elec', category: 'study', description: '1 hour focused session' },
  { id: 'coding', time: '8:00 PM', activity: 'Coding: LeetCode/Java practice', category: 'coding', description: '1 hour practice' },
  { id: 'review', time: '9:00 PM', activity: 'Daily challenges & progress review', category: 'coding', description: '30 mins review' },
  { id: 'wind-down', time: '10:00 PM', activity: 'Wind down', category: 'sleep', description: 'No screens' },
  { id: 'gf-time', time: '12:00 - 2:00 AM', activity: 'GF time', category: 'social', description: 'Calls/chats' },
  { id: 'sleep', time: '2:00 AM', activity: 'Sleep', category: 'sleep', description: '7.5 hours' },
];

export const INITIAL_CHALLENGES: DailyChallenge[] = [
  { id: 'pushups', title: '50 pushups/squats total', category: 'exercise', completed: false },
  { id: 'plank', title: '5-min plank hold', category: 'exercise', completed: false },
  { id: 'leetcode-easy', title: 'Solve 1 LeetCode easy (Java)', category: 'coding', completed: false },
  { id: 'debug', title: 'Debug 1 bug', category: 'coding', completed: false },
  { id: 'physics-quiz', title: '10-min physics formula quiz', category: 'bonus', completed: false },
  { id: 'mech-sketch', title: 'Mechanical diagram sketch', category: 'bonus', completed: false },
];
