/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  Dumbbell, 
  Code, 
  BookOpen, 
  Moon, 
  Sun, 
  Heart, 
  Trophy,
  Sparkles,
  User,
  Zap,
  Shield,
  Target,
  BarChart as BarChartIcon,
  PieChart as PieChartIcon,
  TrendingUp
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  Legend
} from 'recharts';
import { INITIAL_ROUTINE, INITIAL_CHALLENGES } from './constants';
import { RoutineItem, DailyChallenge, DailyProgress } from './types';

export default function App() {
  const [today] = useState(new Date().toISOString().split('T')[0]);
  const [progress, setProgress] = useState<DailyProgress>(() => {
    const saved = localStorage.getItem(`habitflow_${today}`);
    return saved ? JSON.parse(saved) : { date: today, completedActivities: [], completedChallenges: [] };
  });

  useEffect(() => {
    localStorage.setItem(`habitflow_${today}`, JSON.stringify(progress));
  }, [progress, today]);

  // Mock data for weekly trend
  const weeklyData = [
    { day: 'Mon', completion: 85 },
    { day: 'Tue', completion: 70 },
    { day: 'Wed', completion: 90 },
    { day: 'Thu', completion: 65 },
    { day: 'Fri', completion: 80 },
    { day: 'Sat', completion: 95 },
    { day: 'Today', completion: Math.round(((progress.completedActivities.length + progress.completedChallenges.length) / (INITIAL_ROUTINE.length + INITIAL_CHALLENGES.length)) * 100) }
  ];

  // Category breakdown for pie chart
  const categories = ['morning', 'fitness', 'college', 'study', 'coding', 'social', 'sleep'];
  const categoryData = categories.map(cat => {
    const total = INITIAL_ROUTINE.filter(i => i.category === cat).length;
    const completed = INITIAL_ROUTINE.filter(i => i.category === cat && progress.completedActivities.includes(i.id)).length;
    return { name: cat.charAt(0).toUpperCase() + cat.slice(1), value: completed, total: total };
  }).filter(c => c.total > 0);

  const COLORS = ['#E23636', '#005A9C', '#1A1A1A', '#FFB400', '#4CAF50', '#9C27B0', '#607D8B'];

  const toggleActivity = (id: string) => {
    setProgress(prev => {
      const isCompleted = prev.completedActivities.includes(id);
      return {
        ...prev,
        completedActivities: isCompleted 
          ? prev.completedActivities.filter(a => a !== id)
          : [...prev.completedActivities, id]
      };
    });
  };

  const toggleChallenge = (id: string) => {
    setProgress(prev => {
      const isCompleted = prev.completedChallenges.includes(id);
      return {
        ...prev,
        completedChallenges: isCompleted 
          ? prev.completedChallenges.filter(c => c !== id)
          : [...prev.completedChallenges, id]
      };
    });
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'morning': return <Sun className="w-4 h-4 text-spidey-red" />;
      case 'fitness': return <Dumbbell className="w-4 h-4 text-spidey-blue" />;
      case 'college': return <Shield className="w-4 h-4 text-spidey-red" />;
      case 'study': return <BookOpen className="w-4 h-4 text-spidey-blue" />;
      case 'coding': return <Code className="w-4 h-4 text-spidey-red" />;
      case 'social': return <Heart className="w-4 h-4 text-spidey-blue" />;
      case 'sleep': return <Moon className="w-4 h-4 text-slate-500" />;
      default: return <Zap className="w-4 h-4 text-amber-500" />;
    }
  };

  const completionRate = Math.round(
    ((progress.completedActivities.length + progress.completedChallenges.length) / 
    (INITIAL_ROUTINE.length + INITIAL_CHALLENGES.length)) * 100
  );

  return (
    <div className="min-h-screen text-slate-900 font-sans selection:bg-spidey-red/20">
      {/* Spider-Man Background */}
      <div className="spidey-bg" />
      
      {/* Header */}
      <header className="sticky top-0 z-20 bg-spidey-red border-b-4 border-spidey-black px-4 py-4 md:px-8 shadow-xl">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="flex items-center gap-3"
          >
            <div className="bg-white p-2 rounded-full shadow-lg border-2 border-spidey-black">
              <Target className="w-6 h-6 text-spidey-red" />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tighter text-white uppercase italic">Spidey-Flow</h1>
              <p className="text-[10px] text-white/80 font-bold uppercase tracking-[0.2em]">With Great Power...</p>
            </div>
          </motion.div>
          <div className="flex items-center gap-4">
            <div className="hidden md:block text-right text-white">
              <p className="text-sm font-black italic uppercase">{new Date().toLocaleDateString('en-US', { weekday: 'long' })}</p>
              <p className="text-[10px] font-bold opacity-80 uppercase tracking-widest">Daily Mission</p>
            </div>
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="w-10 h-10 rounded-full bg-spidey-blue border-2 border-white flex items-center justify-center shadow-lg"
            >
              <User className="w-5 h-5 text-white" />
            </motion.div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Stats & Challenges */}
        <div className="lg:col-span-4 space-y-8">
          {/* Progress Card */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border-2 border-spidey-black overflow-hidden relative"
          >
            <div className="relative z-10">
              <h2 className="text-sm font-black uppercase tracking-widest text-spidey-red mb-4 italic">Spider-Sense Level</h2>
              <div className="flex items-end gap-2 mb-4">
                <span className="text-5xl font-black text-spidey-blue italic">{completionRate}%</span>
                <span className="text-xs text-slate-500 mb-2 font-bold uppercase">Charged</span>
              </div>
              <div className="w-full bg-slate-100 h-4 rounded-sm border border-slate-200 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${completionRate}%` }}
                  className={`h-full bg-spidey-red ${completionRate > 80 ? 'spider-sense' : ''}`}
                />
              </div>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="bg-spidey-blue/5 rounded-xl p-3 border border-spidey-blue/10">
                  <p className="text-[9px] uppercase tracking-widest font-black text-spidey-blue mb-1">Missions</p>
                  <p className="text-xl font-black italic">{progress.completedActivities.length}/{INITIAL_ROUTINE.length}</p>
                </div>
                <div className="bg-spidey-red/5 rounded-xl p-3 border border-spidey-red/10">
                  <p className="text-[9px] uppercase tracking-widest font-black text-spidey-red mb-1">Feats</p>
                  <p className="text-xl font-black italic">{progress.completedChallenges.length}/{INITIAL_CHALLENGES.length}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Analytics Card */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border-2 border-spidey-black"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-black uppercase tracking-widest italic">Weekly Trend</h2>
              <TrendingUp className="w-4 h-4 text-spidey-blue" />
            </div>
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700 }} />
                  <YAxis hide domain={[0, 100]} />
                  <Tooltip 
                    cursor={{ fill: 'rgba(0, 90, 156, 0.05)' }}
                    contentStyle={{ borderRadius: '12px', border: '2px solid #1A1A1A', fontSize: '12px', fontWeight: 700 }}
                  />
                  <Bar dataKey="completion" fill="#E23636" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Daily Challenges */}
          <motion.div 
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border-2 border-spidey-black"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-sm font-black uppercase tracking-widest italic">Heroic Feats</h2>
              <Zap className="w-5 h-5 text-spidey-red" />
            </div>
            <div className="space-y-3">
              {INITIAL_CHALLENGES.map((challenge) => (
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  key={challenge.id}
                  onClick={() => toggleChallenge(challenge.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all duration-200 text-left ${
                    progress.completedChallenges.includes(challenge.id)
                      ? 'bg-spidey-blue border-spidey-black text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
                      : 'bg-white border-slate-200 hover:border-spidey-red text-slate-700'
                  }`}
                >
                  <div className={`shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    progress.completedChallenges.includes(challenge.id) ? 'bg-white border-spidey-black' : 'border-slate-300'
                  }`}>
                    {progress.completedChallenges.includes(challenge.id) && <CheckCircle2 className="w-4 h-4 text-spidey-blue" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-black uppercase tracking-tight leading-tight">{challenge.title}</p>
                    <p className={`text-[8px] uppercase tracking-widest font-bold mt-0.5 ${
                      progress.completedChallenges.includes(challenge.id) ? 'text-white/70' : 'text-slate-400'
                    }`}>{challenge.category}</p>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Column: Schedule & Category Graph */}
        <div className="lg:col-span-8 space-y-8">
          {/* Category Breakdown Graph */}
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border-2 border-spidey-black p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-black italic uppercase tracking-tighter">Category Mastery</h2>
              <PieChartIcon className="w-5 h-5 text-spidey-red" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ borderRadius: '12px', border: '2px solid #1A1A1A', fontSize: '12px', fontWeight: 700 }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-3">
                {categoryData.map((cat, index) => (
                  <div key={cat.name} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                      <span className="text-xs font-black uppercase italic">{cat.name}</span>
                    </div>
                    <span className="text-xs font-bold text-slate-500">{cat.value} / {cat.total}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Mission Log (Excel View) */}
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border-2 border-spidey-black overflow-hidden"
          >
            <div className="px-6 py-4 border-b-4 border-spidey-black bg-spidey-blue flex items-center justify-between">
              <h2 className="text-xl font-black text-white italic uppercase tracking-tighter">Mission Log (Excel View)</h2>
              <div className="bg-white/10 p-2 rounded-lg">
                <Shield className="w-5 h-5 text-white" />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="excel-grid">
                <thead>
                  <tr>
                    <th className="w-24">Time</th>
                    <th className="w-10">Icon</th>
                    <th>Activity</th>
                    <th>Description</th>
                    <th className="w-16 text-center">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {INITIAL_ROUTINE.map((item, index) => (
                    <tr 
                      key={item.id}
                      className={progress.completedActivities.includes(item.id) ? 'opacity-60' : ''}
                    >
                      <td className="text-[10px] font-black text-spidey-blue italic uppercase">{item.time}</td>
                      <td className="text-center">{getCategoryIcon(item.category)}</td>
                      <td className={`text-xs font-black uppercase italic ${
                        progress.completedActivities.includes(item.id) ? 'line-through text-slate-400' : 'text-slate-800'
                      }`}>
                        {item.activity}
                      </td>
                      <td className="text-[10px] font-bold text-slate-500 uppercase">{item.description || '-'}</td>
                      <td className="text-center">
                        <motion.button
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.8 }}
                          onClick={() => toggleActivity(item.id)}
                          className={`w-6 h-6 rounded border flex items-center justify-center transition-all ${
                            progress.completedActivities.includes(item.id)
                              ? 'bg-spidey-red border-spidey-black text-white'
                              : 'bg-white border-slate-300 text-slate-200'
                          }`}
                        >
                          {progress.completedActivities.includes(item.id) && <Zap className="w-3 h-3 fill-current" />}
                        </motion.button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
          
          {/* Footer Info */}
          <div className="mt-8 flex flex-wrap gap-6 justify-center">
            <div className="flex items-center gap-2 text-[10px] font-black text-spidey-blue uppercase tracking-[0.2em] italic">
              <Shield className="w-3 h-3" />
              <span>Responsibility</span>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-black text-spidey-red uppercase tracking-[0.2em] italic">
              <Zap className="w-3 h-3" />
              <span>Agility</span>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-black text-spidey-black uppercase tracking-[0.2em] italic">
              <Target className="w-3 h-3" />
              <span>Precision</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
