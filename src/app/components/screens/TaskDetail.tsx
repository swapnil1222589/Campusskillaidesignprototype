import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Clock, ExternalLink, CheckCircle2, Circle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Button } from '../ui/button';

export const TaskDetail: React.FC = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const { roadmap, toggleTaskCompletion } = useApp();

  const task = roadmap.flatMap((week) => week.tasks).find((t) => t.id === taskId);

  if (!task) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center">
          <h2 className="mb-4">Task not found</h2>
          <Button onClick={() => navigate('/dashboard')}>Go to Dashboard</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-950 dark:to-purple-950 p-6 pb-24 md:pb-6">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Back Button */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <Button
            onClick={() => navigate(-1)}
            variant="ghost"
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
        </motion.div>

        {/* Task Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 rounded-3xl p-8 shadow-xl border border-white/20 dark:border-gray-700/20"
        >
          {/* Header */}
          <div className="flex items-start gap-4 mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-sm">
                  Week {task.week}
                </span>
                {task.completed && (
                  <span className="px-3 py-1 rounded-full bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-sm flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Completed
                  </span>
                )}
              </div>
              <h1 className="mb-3">{task.title}</h1>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="w-5 h-5" />
                <span>Estimated time: {task.estimatedTime} minutes</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h3 className="mb-3">Description</h3>
            <p className="text-muted-foreground leading-relaxed">{task.description}</p>
          </div>

          {/* Resources */}
          <div className="mb-8">
            <h3 className="mb-4">Learning Resources</h3>
            <div className="space-y-3">
              {task.resources.map((resource, index) => (
                <motion.a
                  key={index}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  className="block p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 bg-white/50 dark:bg-gray-800/50 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900">
                        <ExternalLink className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h4 className="mb-1">{resource.title}</h4>
                        <p className="text-sm text-muted-foreground">Click to open resource</p>
                      </div>
                    </div>
                    <ExternalLink className="w-5 h-5 text-muted-foreground" />
                  </div>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Action Button */}
          <Button
            onClick={() => {
              toggleTaskCompletion(task.id);
              setTimeout(() => navigate('/dashboard'), 500);
            }}
            className={`w-full h-14 ${
              task.completed
                ? 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
                : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700'
            }`}
          >
            {task.completed ? (
              <>
                <Circle className="w-5 h-5 mr-2" />
                Mark as Incomplete
              </>
            ) : (
              <>
                <CheckCircle2 className="w-5 h-5 mr-2" />
                Mark as Completed
              </>
            )}
          </Button>
        </motion.div>
      </div>
    </div>
  );
};
