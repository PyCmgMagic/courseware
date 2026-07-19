import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * 快问快答（单选题）：教师先让学生口头作答，再点击选项揭示对错。
 * 答错红色抖动、可再试；答对变绿并展开解析；答对后同时展示其余选项的说明。
 * 整块带 data-no-advance，点击不会触发翻页。
 */
export const QuickQuiz = ({
  question,
  options = [],
  columns = 1,
  solvedContent = null,
  style = {}
}) => {
  const [picked, setPicked] = useState([]); // indices that have been clicked
  const [wrongIdx, setWrongIdx] = useState(null);

  const correctIdx = options.findIndex((o) => o.correct);
  const solved = picked.includes(correctIdx);

  const pick = (i) => {
    if (solved) return;
    if (!picked.includes(i)) setPicked((prev) => [...prev, i]);
    if (!options[i].correct) {
      setWrongIdx(i);
      setTimeout(() => setWrongIdx((cur) => (cur === i ? null : cur)), 650);
    }
  };

  const reset = () => { setPicked([]); setWrongIdx(null); };

  return (
    <div data-no-advance style={{ width: '100%', ...style }}>
      {question && (
        <div style={{ fontSize: 'clamp(0.9rem, 1.4vw, 1.15rem)', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 'clamp(0.5rem, 1.1vh, 0.9rem)', lineHeight: 1.5 }}>
          🙋 {question}
        </div>
      )}
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: 'clamp(0.5rem, 1vw, 0.8rem)' }}>
        {options.map((opt, i) => {
          const isCorrect = opt.correct;
          const isPickedCorrect = isCorrect && picked.includes(i);
          const isWrongFlash = wrongIdx === i;
          const dimmed = solved && !isCorrect;

          let border = '1px solid var(--border-glass-strong)';
          let background = 'var(--bg-glass)';
          if (isPickedCorrect) { border = '2px solid var(--accent-green)'; background = 'rgba(10, 148, 100, 0.1)'; }
          else if (isWrongFlash) { border = '2px solid var(--accent-red)'; background = 'rgba(220, 47, 76, 0.1)'; }

          return (
            <div key={i}>
              <motion.button
                type="button"
                onClick={() => pick(i)}
                animate={isWrongFlash ? { x: [0, -9, 9, -6, 6, 0] } : { x: 0 }}
                transition={{ duration: 0.45 }}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '0.6rem',
                  padding: 'clamp(0.6rem, 1.2vh, 0.9rem) clamp(0.8rem, 1.4vw, 1.2rem)',
                  borderRadius: '12px',
                  border,
                  background,
                  color: dimmed ? 'var(--text-tertiary)' : 'var(--text-primary)',
                  fontSize: 'clamp(0.85rem, 1.3vw, 1.08rem)',
                  fontWeight: 600,
                  cursor: solved ? 'default' : 'pointer',
                  opacity: dimmed ? 0.75 : 1,
                  transition: 'border-color 0.25s, background 0.25s, opacity 0.25s',
                  textAlign: 'left'
                }}
              >
                <span>{opt.text}</span>
                {isPickedCorrect && <span style={{ color: 'var(--accent-green)', fontWeight: 900, flexShrink: 0 }}>✓ 答对了</span>}
                {isWrongFlash && <span style={{ color: 'var(--accent-red)', fontWeight: 900, flexShrink: 0 }}>✗ 再想想</span>}
              </motion.button>
              <AnimatePresence>
                {solved && opt.explain && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div style={{
                      margin: '0.4rem 0 0',
                      padding: 'clamp(0.45rem, 0.9vh, 0.7rem) clamp(0.7rem, 1.2vw, 1rem)',
                      borderRadius: '10px',
                      borderLeft: `3px solid ${isCorrect ? 'var(--accent-green)' : 'var(--border-glass-strong)'}`,
                      background: 'var(--overlay-light)',
                      color: 'var(--text-secondary)',
                      fontSize: 'clamp(0.76rem, 1.1vw, 0.94rem)',
                      lineHeight: 1.5
                    }}>
                      {opt.explain}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
      {solved && solvedContent && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.15 }}>
          {solvedContent}
        </motion.div>
      )}
      {solved && (
        <div style={{ marginTop: '0.5rem', textAlign: 'right' }}>
          <button type="button" onClick={reset} style={{ background: 'none', border: 'none', color: 'var(--text-tertiary)', fontSize: 'clamp(0.72rem, 1vw, 0.85rem)', cursor: 'pointer', textDecoration: 'underline' }}>
            重新提问
          </button>
        </div>
      )}
    </div>
  );
};

/**
 * 翻卡抢答：正面是任务/问题，学生先判断，教师点击翻面揭示答案。
 * 适合"分类判断"类活动（如：这个任务适合低温还是高温）。
 */
export const FlipCards = ({ cards = [], columns = 2, style = {} }) => {
  const [flipped, setFlipped] = useState(() => new Set());

  const toggle = (i) => {
    setFlipped((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i); else next.add(i);
      return next;
    });
  };

  return (
    <div data-no-advance style={{ display: 'grid', gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: 'clamp(0.6rem, 1.3vw, 1.1rem)', width: '100%', ...style }}>
      {cards.map((card, i) => {
        const isFlipped = flipped.has(i);
        return (
          <motion.button
            key={i}
            type="button"
            onClick={() => toggle(i)}
            whileTap={{ scale: 0.97 }}
            style={{
              position: 'relative',
              minHeight: 'clamp(96px, 17vh, 150px)',
              padding: 'clamp(0.8rem, 1.5vw, 1.3rem)',
              borderRadius: '14px',
              border: isFlipped ? `2px solid ${card.color || 'var(--accent-cyan)'}` : '1px solid var(--border-glass-strong)',
              background: isFlipped ? 'var(--overlay-light)' : 'var(--bg-glass)',
              boxShadow: 'var(--shadow-premium)',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.45rem',
              transition: 'border-color 0.25s, background 0.25s'
            }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {!isFlipped ? (
                <motion.div key="front" initial={{ opacity: 0, rotateY: 60 }} animate={{ opacity: 1, rotateY: 0 }} exit={{ opacity: 0, rotateY: -60 }} transition={{ duration: 0.25 }}>
                  <div style={{ fontSize: 'clamp(1.05rem, 1.7vw, 1.4rem)', fontWeight: 800, lineHeight: 1.4 }}>{card.front}</div>
                  <div style={{ marginTop: '0.5rem', color: 'var(--text-tertiary)', fontSize: 'clamp(0.72rem, 1vw, 0.85rem)' }}>{card.hint || '全班先判断，老师点击翻面'}</div>
                </motion.div>
              ) : (
                <motion.div key="back" initial={{ opacity: 0, rotateY: 60 }} animate={{ opacity: 1, rotateY: 0 }} exit={{ opacity: 0, rotateY: -60 }} transition={{ duration: 0.25 }}>
                  <div style={{ fontSize: 'clamp(1.15rem, 1.9vw, 1.55rem)', fontWeight: 900, color: card.color || 'var(--accent-cyan)' }}>{card.back}</div>
                  {card.explain && <div style={{ marginTop: '0.45rem', color: 'var(--text-secondary)', fontSize: 'clamp(0.78rem, 1.15vw, 0.95rem)', lineHeight: 1.5 }}>{card.explain}</div>}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        );
      })}
    </div>
  );
};
