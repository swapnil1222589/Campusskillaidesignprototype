import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  name: string;
  email: string;
  branch: string;
  year: string;
  careerGoal: string;
  dailyTime: number;
  completedTasks: string[];
  streak: number;
}

interface Task {
  id: string;
  title: string;
  description: string;
  estimatedTime: number;
  resources: { title: string; url: string }[];
  completed: boolean;
  week: number;
}

interface Week {
  weekNumber: number;
  title: string;
  tasks: Task[];
}

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  roadmap: Week[];
  generateRoadmap: () => void;
  toggleTaskCompletion: (taskId: string) => void;
  isOnboarded: boolean;
  setIsOnboarded: (value: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [roadmap, setRoadmap] = useState<Week[]>([]);

  useEffect(() => {
    // Check localStorage for existing user
    const savedUser = localStorage.getItem('campusskill-user');
    const savedOnboarded = localStorage.getItem('campusskill-onboarded');
    const savedRoadmap = localStorage.getItem('campusskill-roadmap');

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    if (savedOnboarded) {
      setIsOnboarded(JSON.parse(savedOnboarded));
    }
    if (savedRoadmap) {
      setRoadmap(JSON.parse(savedRoadmap));
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('campusskill-user', JSON.stringify(user));
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('campusskill-onboarded', JSON.stringify(isOnboarded));
  }, [isOnboarded]);

  useEffect(() => {
    if (roadmap.length > 0) {
      localStorage.setItem('campusskill-roadmap', JSON.stringify(roadmap));
    }
  }, [roadmap]);

  const generateRoadmap = () => {
    if (!user) return;

    const mockRoadmap: Week[] = [
      {
        weekNumber: 1,
        title: 'Foundations',
        tasks: [
          {
            id: '1',
            title: 'Introduction to Programming',
            description: 'Learn the basics of programming concepts and syntax',
            estimatedTime: 60,
            resources: [
              { title: 'Python Crash Course', url: 'https://youtube.com' },
              { title: 'Programming Basics', url: 'https://docs.python.org' }
            ],
            completed: false,
            week: 1
          },
          {
            id: '2',
            title: 'Data Types and Variables',
            description: 'Understanding different data types and how to work with variables',
            estimatedTime: 45,
            resources: [
              { title: 'Data Types Tutorial', url: 'https://youtube.com' }
            ],
            completed: false,
            week: 1
          }
        ]
      },
      {
        weekNumber: 2,
        title: 'Control Flow',
        tasks: [
          {
            id: '3',
            title: 'Conditional Statements',
            description: 'Master if-else statements and switch cases',
            estimatedTime: 50,
            resources: [
              { title: 'Control Flow Guide', url: 'https://youtube.com' }
            ],
            completed: false,
            week: 2
          },
          {
            id: '4',
            title: 'Loops and Iteration',
            description: 'Learn about for loops, while loops, and iteration',
            estimatedTime: 55,
            resources: [
              { title: 'Loops in Python', url: 'https://youtube.com' }
            ],
            completed: false,
            week: 2
          }
        ]
      },
      {
        weekNumber: 3,
        title: 'Functions & Modules',
        tasks: [
          {
            id: '5',
            title: 'Writing Functions',
            description: 'Create reusable code with functions',
            estimatedTime: 60,
            resources: [
              { title: 'Functions Tutorial', url: 'https://youtube.com' }
            ],
            completed: false,
            week: 3
          },
          {
            id: '6',
            title: 'Working with Modules',
            description: 'Import and use external modules in your code',
            estimatedTime: 45,
            resources: [
              { title: 'Python Modules', url: 'https://docs.python.org' }
            ],
            completed: false,
            week: 3
          }
        ]
      },
      {
        weekNumber: 4,
        title: 'Data Structures',
        tasks: [
          {
            id: '7',
            title: 'Arrays and Lists',
            description: 'Understanding arrays, lists, and their operations',
            estimatedTime: 50,
            resources: [
              { title: 'Data Structures', url: 'https://youtube.com' }
            ],
            completed: false,
            week: 4
          },
          {
            id: '8',
            title: 'Dictionaries and Sets',
            description: 'Working with key-value pairs and unique collections',
            estimatedTime: 55,
            resources: [
              { title: 'Python Collections', url: 'https://youtube.com' }
            ],
            completed: false,
            week: 4
          }
        ]
      }
    ];

    setRoadmap(mockRoadmap);
  };

  const toggleTaskCompletion = (taskId: string) => {
    setRoadmap((prev) =>
      prev.map((week) => ({
        ...week,
        tasks: week.tasks.map((task) =>
          task.id === taskId ? { ...task, completed: !task.completed } : task
        )
      }))
    );

    if (user) {
      const task = roadmap.flatMap((w) => w.tasks).find((t) => t.id === taskId);
      if (task && !task.completed) {
        setUser({
          ...user,
          completedTasks: [...user.completedTasks, taskId],
          streak: user.streak + 1
        });
      }
    }
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        roadmap,
        generateRoadmap,
        toggleTaskCompletion,
        isOnboarded,
        setIsOnboarded
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};
