import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from 'next-themes';
import { motion } from 'motion/react';
import { User, LogOut, RefreshCw, Moon, Sun, Mail, GraduationCap, Target, Clock } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Button } from '../ui/button';
import { Switch } from '../ui/switch';

export const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { user, setUser, setIsOnboarded, generateRoadmap } = useApp();
  const { theme, setTheme } = useTheme();

  if (!user) {
    navigate('/auth');
    return null;
  }

  const handleLogout = () => {
    setUser(null);
    setIsOnboarded(false);
    localStorage.clear();
    navigate('/auth');
  };

  const handleResetRoadmap = () => {
    if (confirm('Are you sure you want to reset your roadmap? This will create a new learning path.')) {
      generateRoadmap();
      navigate('/dashboard');
    }
  };

  const handleEditGoals = () => {
    setIsOnboarded(false);
    navigate('/onboarding');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-950 dark:to-purple-950 p-6 pb-24 md:pb-6">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 rounded-3xl p-6 shadow-xl border border-white/20 dark:border-gray-700/20"
        >
          <h1 className="mb-2">Profile & Settings</h1>
          <p className="text-muted-foreground">Manage your account and preferences</p>
        </motion.div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 rounded-3xl p-6 shadow-xl border border-white/20 dark:border-gray-700/20"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white shadow-lg">
              <User className="w-10 h-10" />
            </div>
            <div>
              <h2 className="mb-1">{user.name}</h2>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span className="text-sm">{user.email}</span>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800">
              <div className="flex items-center gap-2 mb-2">
                <GraduationCap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span className="text-sm text-muted-foreground">Branch</span>
              </div>
              <p>{user.branch || 'Not set'}</p>
            </div>

            <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-950 border border-purple-200 dark:border-purple-800">
              <div className="flex items-center gap-2 mb-2">
                <GraduationCap className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <span className="text-sm text-muted-foreground">Year</span>
              </div>
              <p>{user.year || 'Not set'}</p>
            </div>

            <div className="p-4 rounded-xl bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-5 h-5 text-green-600 dark:text-green-400" />
                <span className="text-sm text-muted-foreground">Career Goal</span>
              </div>
              <p className="capitalize">{user.careerGoal?.replace(/-/g, ' ') || 'Not set'}</p>
            </div>

            <div className="p-4 rounded-xl bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                <span className="text-sm text-muted-foreground">Daily Time</span>
              </div>
              <p>{user.dailyTime} minutes</p>
            </div>
          </div>
        </motion.div>

        {/* Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 rounded-3xl p-6 shadow-xl border border-white/20 dark:border-gray-700/20"
        >
          <h3 className="mb-4">Appearance</h3>
          <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-800">
            <div className="flex items-center gap-3">
              {theme === 'dark' ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
              <div>
                <p>Dark Mode</p>
                <p className="text-sm text-muted-foreground">Toggle theme</p>
              </div>
            </div>
            <Switch
              checked={theme === 'dark'}
              onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
            />
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 rounded-3xl p-6 shadow-xl border border-white/20 dark:border-gray-700/20 space-y-3"
        >
          <h3 className="mb-4">Actions</h3>

          <Button
            onClick={handleEditGoals}
            variant="outline"
            className="w-full justify-start h-14"
          >
            <Target className="w-5 h-5 mr-3" />
            Edit Goals & Preferences
          </Button>

          <Button
            onClick={handleResetRoadmap}
            variant="outline"
            className="w-full justify-start h-14"
          >
            <RefreshCw className="w-5 h-5 mr-3" />
            Reset Roadmap
          </Button>

          <Button
            onClick={handleLogout}
            variant="destructive"
            className="w-full justify-start h-14"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </Button>
        </motion.div>
      </div>
    </div>
  );
};
