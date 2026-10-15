import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Map, User } from 'lucide-react';
import { motion } from 'motion/react';

export const BottomNav: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();  

  const navItems = [
    { path: '/dashboard', label: 'Home', icon: Home },
    { path: '/roadmap', label: 'Roadmap', icon: Map },
    { path: '/profile', label: 'Profile', icon: User }
  ];   

  const isActive = (path: string) => location.pathname === path;

  // Don't show nav on auth or onboarding
  if (location.pathname === '/auth' || location.pathname === '/onboarding' || location.pathname.startsWith('/task/')) {
    return null;
  }

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 md:hidden z-50"
    >
      <div className="backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border-t border-gray-200 dark:border-gray-700 px-6 py-3 safe-bottom">
        <div className="flex justify-around items-center max-w-md mx-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="flex flex-col items-center gap-1 relative py-2 px-4"
              >
                {active && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 bg-blue-100 dark:bg-blue-900 rounded-full"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <Icon
                  className={`w-6 h-6 relative z-10 transition-colors ${
                    active
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-gray-500 dark:text-gray-400'
                  }`}
                />
                <span
                  className={`text-xs relative z-10 transition-colors ${
                    active
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-gray-500 dark:text-gray-400'
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};
