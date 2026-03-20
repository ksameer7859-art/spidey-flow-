export interface RoutineItem {
  id: string;
  time: string;
  activity: string;
  category: 'morning' | 'college' | 'study' | 'fitness' | 'coding' | 'social' | 'sleep';
  description?: string;
}

export interface DailyChallenge {
  id: string;
  title: string;
  category: 'exercise' | 'coding' | 'bonus';
  completed: boolean;
}

export interface DailyProgress {
  date: string;
  completedActivities: string[]; // IDs of RoutineItem
  completedChallenges: string[]; // IDs of DailyChallenge
}
