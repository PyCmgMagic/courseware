import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Eye, Zap } from 'lucide-react';

export const Home = ({ onSelectLesson }) => {
  const lessons = [
    {
      id: 'lesson1',
      title: '人类 ChatGPT',
      subtitle: '第 1 课时',
      desc: '语言为什么能一词一词生成？体验预测下一个 Token 的魔力。',
      icon: <Brain size={48} color="var(--accent-cyan)" />,
      color: 'var(--accent-cyan)'
    },
    {
      id: 'lesson2',
      title: '从看图到预测',
      subtitle: '第 2 课时',
      desc: 'AI 如何用特征和样本学规律？训练你的专属猫识别机。',
      icon: <Eye size={48} color="var(--accent-purple)" />,
      color: 'var(--accent-purple)'
    },
    {
      id: 'lesson3',
      title: '从反馈到策略',
      subtitle: '第 3 课时',
      desc: 'AI 如何在试错中变聪明？未知任务反馈挑战。',
      icon: <Zap size={48} color="var(--accent-green)" />,
      color: 'var(--accent-green)'
    }
  ];

  return (
    <div style={{
      width: '100vw', minHeight: '100vh', display: 'flex', flexDirection: 'column', 
      alignItems: 'center', justifyContent: 'center', padding: '2rem'
    }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ textAlign: 'center', marginBottom: '4rem' }}
      >
        <h1 className="text-gradient" style={{ fontSize: '4rem', fontWeight: 800, margin: '0 0 1rem 0' }}>
          不插电的 AI 实验室
        </h1>
        <p style={{ fontSize: '1.5rem', color: 'var(--text-secondary)', margin: 0 }}>
          看透机器的“思考”
        </p>
      </motion.div>

      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        {lessons.map((lesson, idx) => (
          <motion.div
            key={lesson.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.2 }}
            onClick={() => onSelectLesson(lesson.id)}
            className="glass-panel"
            style={{
              width: '320px',
              padding: '2.5rem',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start'
            }}
          >
            <div style={{ 
              marginBottom: '1.5rem', 
              background: 'var(--border-glass)', 
              padding: '1rem', 
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'inset 0 1px 0 var(--border-glass-strong)'
            }}>
              {React.cloneElement(lesson.icon, { color: 'var(--text-primary)', size: 32 })}
            </div>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              {lesson.subtitle}
            </span>
            <h2 style={{ fontSize: '1.8rem', margin: '0 0 1rem 0', fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>{lesson.title}</h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0, fontSize: '0.95rem' }}>
              {lesson.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
