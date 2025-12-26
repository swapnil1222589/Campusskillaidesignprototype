import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Circle, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';

export const Roadmap: React.FC = () => {
  const { roadmap } = useApp();
  const navigate = useNavigate();
  const [expandedWeeks, setExpandedWeeks] = useState<number[]>([1]);

  const toggleWeek = (weekNumber: number) => {
    setExpandedWeeks((prev) =>
      prev.includes(weekNumber)
        ? prev.filter((w) => w !== weekNumber)
        : [...prev, weekNumber]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-950 dark:to-purple-950 p-6 pb-24 md:pb-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 rounded-3xl p-6 shadow-xl border border-white/20 dark:border-gray-700/20"
        >
          <h1 className="mb-2">Your Learning Roadmap</h1>
          <p className="text-muted-foreground">A personalized path to achieve your career goals</p>
        </motion.div>

        {/* Timeline */}
        <div className="space-y-4">
          {roadmap.map((week, index) => {
            const isExpanded = expandedWeeks.includes(week.weekNumber);
            const completedTasks = week.tasks.filter((t) => t.completed).length;
            const totalTasks = week.tasks.length;
            const progress = (completedTasks / totalTasks) * 100;

            return (
              <motion.div
                key={week.weekNumber}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                {/* Connector Line */}
                {index < roadmap.length - 1 && (
                  <div className="absolute left-6 top-16 w-0.5 h-full bg-gradient-to-b from-blue-300 to-purple-300 dark:from-blue-700 dark:to-purple-700 -z-10" />
                )}

                <div className="backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 rounded-2xl shadow-lg border border-white/20 dark:border-gray-700/20 overflow-hidden">
                  {/* Week Header */}
                  <button
                    onClick={() => toggleWeek(week.weekNumber)}
                    className="w-full p-5 flex items-center gap-4 hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white shadow-lg">
                      {completedTasks === totalTasks ? (
                        <CheckCircle2 className="w-6 h-6" />
                      ) : (
                        <span>{week.weekNumber}</span>
                      )}
                    </div>

                    <div className="flex-1 text-left">
                      <h3 className="mb-1">Week {week.weekNumber}: {week.title}</h3>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span>{completedTasks} / {totalTasks} tasks</span>
                        <span>•</span>
                        <span>{Math.round(progress)}% complete</span>
                      </div>
                    </div>

                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-muted-foreground" />
                    )}
                  </button>

                  {/* Tasks List */}
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="border-t border-gray-200 dark:border-gray-700"
                    >
                      <div className="p-5 space-y-3">
                        {week.tasks.map((task) => (
                          <motion.button
                            key={task.id}
                            onClick={() => navigate(`/task/${task.id}`)}
                            whileHover={{ scale: 1.02 }}
                            className="w-full p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 bg-white/50 dark:bg-gray-800/50 transition-all text-left"
                          >
                            <div className="flex items-start gap-3">
                              {task.completed ? (
                                <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                              ) : (
                                <Circle className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                              )}

                              <div className="flex-1">
                                <h4 className={`mb-1 ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                                  {task.title}
                                </h4>
                                <p className="text-sm text-muted-foreground mb-2">
                                  {task.description}
                                </p>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <Clock className="w-4 h-4" />
                                  {task.estimatedTime} minutes
                                </div>
                              </div>
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {roadmap.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 rounded-3xl p-12 shadow-xl border border-white/20 dark:border-gray-700/20 text-center"
          >
            <p className="text-muted-foreground">No roadmap generated yet. Go to dashboard to create one!</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};
