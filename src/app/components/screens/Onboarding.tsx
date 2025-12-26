import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';

const branches = ['Computer Science', 'Information Technology', 'Mechanical', 'Electrical', 'Civil', 'Electronics'];
const years = ['1st Year', '2nd Year', '3rd Year', '4th Year'];
const careerGoals = [
  { value: 'sde', label: 'Software Developer', icon: '💻' },
  { value: 'ai', label: 'AI/ML Engineer', icon: '🤖' },
  { value: 'uiux', label: 'UI/UX Designer', icon: '🎨' },
  { value: 'data', label: 'Data Scientist', icon: '📊' },
  { value: 'devops', label: 'DevOps Engineer', icon: '⚙️' },
  { value: 'mobile', label: 'Mobile Developer', icon: '📱' }
];
const timeSlots = [30, 60, 90, 120];

export const Onboarding: React.FC = () => {
  const navigate = useNavigate();
  const { user, setUser, setIsOnboarded, generateRoadmap } = useApp();
  const [step, setStep] = useState(1);
  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedGoal, setSelectedGoal] = useState('');
  const [selectedTime, setSelectedTime] = useState(60);

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleComplete = () => {
    if (user) {
      setUser({
        ...user,
        branch: selectedBranch,
        year: selectedYear,
        careerGoal: selectedGoal,
        dailyTime: selectedTime
      });
      setIsOnboarded(true);
      generateRoadmap();
      navigate('/dashboard');
    }
  };

  const canProceed = () => {
    if (step === 1) return selectedBranch !== '';
    if (step === 2) return selectedYear !== '';
    if (step === 3) return selectedGoal !== '';
    if (step === 4) return selectedTime > 0;
    return false;
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-950 dark:to-purple-950">
      <div className="w-full max-w-2xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-muted-foreground">
              Step {step} of {totalSteps}
            </span>
            <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Content Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 rounded-3xl p-8 shadow-2xl border border-white/20 dark:border-gray-700/20 min-h-[400px]"
        >
          <AnimatePresence mode="wait">
            {/* Step 1: Branch */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="mb-2">Select Your Branch</h2>
                  <p className="text-muted-foreground">Choose your field of study</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {branches.map((branch) => (
                    <button
                      key={branch}
                      onClick={() => setSelectedBranch(branch)}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        selectedBranch === branch
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-950'
                          : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-800'
                      }`}
                    >
                      <div className="text-sm">{branch}</div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 2: Year */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="mb-2">Select Your Year</h2>
                  <p className="text-muted-foreground">Which year are you in?</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {years.map((year) => (
                    <button
                      key={year}
                      onClick={() => setSelectedYear(year)}
                      className={`p-6 rounded-xl border-2 transition-all ${
                        selectedYear === year
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-950'
                          : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-800'
                      }`}
                    >
                      <div>{year}</div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 3: Career Goal */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="mb-2">Choose Your Career Goal</h2>
                  <p className="text-muted-foreground">What do you want to become?</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {careerGoals.map((goal) => (
                    <button
                      key={goal.value}
                      onClick={() => setSelectedGoal(goal.value)}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        selectedGoal === goal.value
                          ? 'border-purple-500 bg-purple-50 dark:bg-purple-950'
                          : 'border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-800'
                      }`}
                    >
                      <div className="text-3xl mb-2">{goal.icon}</div>
                      <div className="text-sm">{goal.label}</div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 4: Daily Time */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="mb-2">Daily Learning Time</h2>
                  <p className="text-muted-foreground">How much time can you dedicate daily?</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`p-6 rounded-xl border-2 transition-all ${
                        selectedTime === time
                          ? 'border-green-500 bg-green-50 dark:bg-green-950'
                          : 'border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-800'
                      }`}
                    >
                      <div className="text-2xl mb-2">{time}</div>
                      <div className="text-sm text-muted-foreground">minutes</div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex gap-3 mt-8">
            {step > 1 && (
              <Button onClick={handleBack} variant="outline" className="flex-1">
                <ChevronLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            )}
            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              className={`${step === 1 ? 'w-full' : 'flex-1'} bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700`}
            >
              {step === totalSteps ? 'Get Started' : 'Next'}
              {step < totalSteps && <ChevronRight className="w-4 h-4 ml-2" />}
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
