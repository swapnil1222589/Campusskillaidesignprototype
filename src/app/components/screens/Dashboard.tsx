import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Sparkles, TrendingUp, Target, Clock, Award, RefreshCw } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, roadmap, generateRoadmap } = useApp();

  if (!user) {
    navigate('/auth');
    return null;
  }

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const totalTasks = roadmap.reduce((acc, week) => acc + week.tasks.length, 0);
  const completedTasks = roadmap.reduce(
    (acc, week) => acc + week.tasks.filter((t) => t.completed).length,
    0
  );
  const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  const todayTask = roadmap
    .flatMap((week) => week.tasks)
    .find((task) => !task.completed);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-950 dark:to-purple-950 p-6 pb-24 md:pb-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 rounded-3xl p-6 shadow-xl border border-white/20 dark:border-gray-700/20"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="mb-1">
                {getGreeting()}, {user.name} 👋
              </h1>
              <p className="text-muted-foreground">Ready to level up your skills?</p>
            </div>
            <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.5 }}
              className="hidden md:block"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 rounded-2xl p-5 shadow-lg border border-white/20 dark:border-gray-700/20"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900">
                <Target className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="text-2xl">{completedTasks}</div>
            </div>
            <div className="text-sm text-muted-foreground">Tasks Done</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 rounded-2xl p-5 shadow-lg border border-white/20 dark:border-gray-700/20"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900">
                <Award className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div className="text-2xl">{user.streak}</div>
            </div>
            <div className="text-sm text-muted-foreground">Day Streak</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 rounded-2xl p-5 shadow-lg border border-white/20 dark:border-gray-700/20"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900">
                <Clock className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="text-2xl">{user.dailyTime}</div>
            </div>
            <div className="text-sm text-muted-foreground">Min/Day</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 rounded-2xl p-5 shadow-lg border border-white/20 dark:border-gray-700/20"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900">
                <TrendingUp className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              </div>
              <div className="text-2xl">{Math.round(progressPercentage)}%</div>
            </div>
            <div className="text-sm text-muted-foreground">Progress</div>
          </motion.div>
        </div>

        {/* Today's Focus */}
        {todayTask && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="backdrop-blur-xl bg-gradient-to-br from-blue-500/20 to-purple-600/20 dark:from-blue-600/30 dark:to-purple-700/30 rounded-3xl p-6 shadow-xl border border-blue-200/50 dark:border-blue-700/50"
          >
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <h3>Today's Focus</h3>
            </div>
            <h2 className="mb-2">{todayTask.title}</h2>
            <p className="text-muted-foreground mb-4">{todayTask.description}</p>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                {todayTask.estimatedTime} min
              </div>
              <div className="text-sm text-muted-foreground">Week {todayTask.week}</div>
            </div>
            <Button
              onClick={() => navigate(`/task/${todayTask.id}`)}
              className="bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Start Learning
            </Button>
          </motion.div>
        )}

        {/* Skill Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 rounded-3xl p-6 shadow-xl border border-white/20 dark:border-gray-700/20"
        >
          <h3 className="mb-4">Overall Progress</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-muted-foreground">Completed Tasks</span>
              <span>{completedTasks} / {totalTasks}</span>
            </div>
            <Progress value={progressPercentage} className="h-3" />
          </div>
        </motion.div>

        {/* Actions */}
        <div className="grid md:grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Button
              onClick={() => navigate('/roadmap')}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 h-14"
            >
              View Full Roadmap
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Button
              onClick={generateRoadmap}
              variant="outline"
              className="w-full border-2 h-14"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Regenerate Roadmap
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
