import { useState, useEffect, useCallback } from 'react';
import { Presentation } from '../../components/Presentation';
import { Slide, SlideTitle, SlideContent, Step } from '../../components/Slide';
import { useSlideSteps, useCurrentStep } from '../../components/useSlideSteps';
import { QuickQuiz } from '../../components/QuickQuiz';
import { motion } from 'framer-motion';

const CoverSlide = ({ isActive }) => (
  <Slide isActive={isActive}>
    <SlideContent className="cover-content">
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8 }} style={{ width: '88%', maxWidth: '1080px', display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 'clamp(1.5rem, 4vw, 4rem)', alignItems: 'center' }}>
        <div>
          <h3 style={{ color: 'var(--accent-green)', fontSize: 'clamp(1.3rem, 2.2vw, 2rem)', margin: 0 }}>第 3 课时</h3>
          <h1 style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', margin: 'clamp(0.6rem, 1.5vh, 1rem) 0', fontWeight: 800 }} className="text-gradient">从反馈到策略</h1>
          <p style={{ fontSize: 'clamp(1.2rem, 2.3vw, 1.8rem)', color: 'var(--text-secondary)', margin: 0 }}>没有标准答案时，AI 如何在试错中变聪明？</p>
          <div style={{ marginTop: 'clamp(1rem, 2vh, 1.6rem)', color: 'var(--text-tertiary)', fontSize: 'clamp(0.85rem, 1.3vw, 1.05rem)' }}>状态 · 动作 · 奖励 · 策略</div>
        </div>
        <img src="/images/robot_bicycle.png" alt="机器人通过试错学习骑车" className="cover-visual" />
      </motion.div>
    </SlideContent>
  </Slide>
);

const LeadInSlide = ({ isActive }) => {
  useSlideSteps(2);

  return (
    <Slide isActive={isActive}>
      <SlideTitle>没有老师示范，AI 能不能靠试错学会？</SlideTitle>
      <SlideContent>
        <div style={{ width: '92%', maxWidth: '1160px' }}>
          <div className="responsive-flex-container" style={{ display: 'flex', gap: 'clamp(1.2rem, 3vw, 3rem)', alignItems: 'center' }}>
            <div className="glass-panel" style={{ padding: 'clamp(1.2rem, 2.5vw, 2.4rem)', flex: 1.2 }}>
              <h3 style={{ fontSize: 'clamp(1.3rem, 2vw, 1.8rem)', color: 'var(--accent-green)', marginTop: 0 }}>回想你第一次骑自行车</h3>
              <p style={{ fontSize: 'clamp(0.95rem, 1.5vw, 1.22rem)', lineHeight: 1.7, color: 'var(--text-secondary)', margin: 'clamp(0.7rem, 1.5vh, 1.2rem) 0' }}>
                怎么知道自己做得越来越好？<br />
                如果只告诉你 Yes 或 No，你能不能慢慢摸索出正确的任务？
              </p>
              <Step n={1}>
                <div style={{ background: 'var(--overlay-light)', padding: 'clamp(0.8rem, 1.4vw, 1.2rem)', borderRadius: '12px', lineHeight: 1.6 }}>
                  <strong style={{ fontSize: 'clamp(1rem, 1.5vw, 1.2rem)', color: 'var(--text-primary)' }}>强化学习不直接告诉每一步的标准答案，而是用奖励评价结果。</strong>
                  <div style={{ marginTop: '0.45rem', color: 'var(--text-secondary)' }}>智能体要在“尝试新动作”和“重复有效动作”之间选择，逐渐形成更高分的策略。</div>
                </div>
              </Step>
            </div>
            <div style={{ flex: 0.8, display: 'flex', justifyContent: 'center' }}>
              <img src="/images/robot_bicycle.png" alt="Robot Learning Bicycle" style={{ width: '100%', maxWidth: '350px', borderRadius: '16px', boxShadow: '0 0 30px rgba(0, 255, 102, 0.3)', border: '1px solid rgba(0, 255, 102, 0.2)' }} />
            </div>
          </div>
          <Step n={2}>
            <div className="glass-panel" style={{ marginTop: 'clamp(0.8rem, 1.8vh, 1.3rem)', padding: 'clamp(0.8rem, 1.4vw, 1.2rem)', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.6rem', textAlign: 'center' }}>
              {['Q1 五要素：角色和信号', 'Q2 反馈：怎样变聪明', 'Q3 策略：探索与利用', 'Q4 奖励：设计错了会怎样'].map((step, index) => (
                <div key={step} style={{ padding: '0.65rem', borderRadius: '8px', background: index % 2 ? 'rgba(139,63,217,0.08)' : 'rgba(10,148,100,0.08)', fontSize: 'clamp(0.78rem, 1.15vw, 0.98rem)', fontWeight: 700 }}>{step}</div>
              ))}
            </div>
          </Step>
        </div>
      </SlideContent>
    </Slide>
  );
};

const ElementsSlide = ({ isActive }) => {
  useSlideSteps(2);

  return (
    <Slide isActive={isActive}>
      <SlideTitle qtag="Q1 · 角色和信号">一次“试错学习”里，到底有哪些角色和信号？</SlideTitle>
      <SlideContent>
        <div className="responsive-flex-container" style={{ display: 'grid', gridTemplateColumns: '0.9fr 1.35fr', gap: 'clamp(0.7rem, 1.5vw, 1.3rem)', width: '94%', maxWidth: '1200px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.55rem, 1.1vh, 0.9rem)' }}>
            <Step n={1}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.55rem, 1.1vh, 0.9rem)' }}>
                <div className="glass-panel" style={{ padding: 'clamp(0.75rem, 1.3vw, 1.15rem)', borderLeft: '4px solid var(--accent-cyan)' }}>
                  <h3 style={{ color: 'var(--accent-cyan)', fontSize: 'clamp(1rem, 1.5vw, 1.25rem)', margin: 0 }}>🤖 智能体 Agent</h3>
                  <p style={{ fontSize: 'clamp(0.78rem, 1.15vw, 0.96rem)', color: 'var(--text-secondary)', margin: '0.35rem 0 0' }}>做决定、执行动作并学习的主体，例如游戏角色或机器人。</p>
                </div>
                <div className="glass-panel" style={{ padding: 'clamp(0.75rem, 1.3vw, 1.15rem)', borderLeft: '4px solid var(--accent-purple)' }}>
                  <h3 style={{ color: 'var(--accent-purple)', fontSize: 'clamp(1rem, 1.5vw, 1.25rem)', margin: 0 }}>🌍 环境 Environment</h3>
                  <p style={{ fontSize: 'clamp(0.78rem, 1.15vw, 0.96rem)', color: 'var(--text-secondary)', margin: '0.35rem 0 0' }}>智能体行动的世界；动作会改变环境，环境再返回新状态。</p>
                </div>
              </div>
            </Step>
            <Step n={2}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.55rem, 1.1vh, 0.9rem)' }}>
                <div className="glass-panel" style={{ padding: 'clamp(0.75rem, 1.3vw, 1.15rem)', background: 'var(--overlay-light)', borderLeft: '4px solid var(--accent-green)' }}>
                  <h3 style={{ fontSize: 'clamp(1rem, 1.5vw, 1.25rem)', margin: 0, color: 'var(--accent-green)' }}>🧭 策略 Policy</h3>
                  <p style={{ fontSize: 'clamp(0.78rem, 1.15vw, 0.96rem)', color: 'var(--text-secondary)', margin: '0.35rem 0 0' }}>“在某种状态下更倾向做什么”的选择规律，是学习最终要得到的结果。</p>
                </div>

                <div style={{ padding: 'clamp(0.65rem, 1.1vw, 0.95rem)', background: 'var(--overlay-light)', borderRadius: '8px', border: '1px dashed var(--text-tertiary)' }}>
                  <strong style={{ color: 'var(--accent-green)', fontSize: 'clamp(0.82rem, 1.2vw, 1rem)' }}>知识迁移：人类反馈强化学习（RLHF）</strong>
                  <p style={{ fontSize: 'clamp(0.72rem, 1.05vw, 0.9rem)', color: 'var(--text-secondary)', margin: '0.35rem 0 0', lineHeight: 1.45 }}>
                    只靠“接龙”算概率，AI 会乱骂人。科学家发明了<strong>基于人类反馈的强化学习 (RLHF)</strong>：让人类老师给 AI 的回答打分（点赞/踩）。AI 为了得到更高的“赞(Reward)”，就会调整策略，慢慢变成一个有礼貌、有教养的好帮手！
                  </p>
                </div>
              </div>
            </Step>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.6rem, 1.2vh, 1rem)' }}>
            <div style={{ position: 'relative', height: 'clamp(230px, 38vh, 300px)', background: 'var(--overlay-light)', borderRadius: '16px', border: '1px solid var(--border-glass)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
              {/* Cycle Diagram using absolute positioning */}
              <div style={{ position: 'absolute', top: '15%', left: '40%', background: 'var(--accent-cyan)', color: 'var(--on-accent)', padding: '0.8rem 1.5rem', borderRadius: '30px', fontWeight: 'bold', zIndex: 2 }}>智能体</div>
              <div style={{ position: 'absolute', bottom: '15%', left: '40%', background: 'var(--accent-purple)', color: 'var(--on-accent)', padding: '0.8rem 1.5rem', borderRadius: '30px', fontWeight: 'bold', zIndex: 2 }}>环境</div>

              <div style={{ position: 'absolute', top: '40%', right: '10%', background: 'var(--accent-green)', color: 'var(--on-accent)', padding: '0.8rem', borderRadius: '8px', zIndex: 2, textAlign: 'center' }}>
                <strong>动作 (Action)</strong><br /><span style={{ fontSize: '0.9rem' }}>打方向盘</span>
              </div>
              <div style={{ position: 'absolute', top: '35%', left: '5%', background: 'var(--accent-blue)', color: 'var(--on-accent)', padding: '0.8rem', borderRadius: '8px', zIndex: 2, textAlign: 'center' }}>
                <strong>状态 (State)</strong><br /><span style={{ fontSize: '0.9rem' }}>前面有红灯</span>
              </div>
              <div style={{ position: 'absolute', top: '55%', left: '5%', background: 'var(--accent-red)', color: 'var(--on-accent)', padding: '0.8rem', borderRadius: '8px', zIndex: 2, textAlign: 'center' }}>
                <strong>奖励 (Reward)</strong><br /><span style={{ fontSize: '0.9rem' }}>闯红灯扣分!</span>
              </div>

              {/* Arrows (SVG) */}
              <svg style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 1, top: 0, left: 0 }}>
                <defs>
                  <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="var(--overlay-heavy)" />
                  </marker>
                </defs>
                <path d="M 280 60 Q 450 150 280 240" fill="none" stroke="var(--overlay-heavy)" strokeWidth="3" strokeDasharray="5,5" markerEnd="url(#arrowhead)" />
                <path d="M 200 240 Q 50 150 200 60" fill="none" stroke="var(--overlay-heavy)" strokeWidth="3" strokeDasharray="5,5" markerEnd="url(#arrowhead)" />
              </svg>
            </div>

            <div className="glass-panel" style={{ padding: 'clamp(0.75rem, 1.3vw, 1.1rem)' }}>
              <h4 style={{ margin: '0 0 0.55rem', color: 'var(--text-primary)', fontSize: 'clamp(0.9rem, 1.3vw, 1.08rem)' }}>🎮 把五要素对应到真实任务</h4>
              <div style={{ display: 'flex', gap: '0.65rem', fontSize: 'clamp(0.72rem, 1.05vw, 0.9rem)', color: 'var(--text-secondary)' }}>
                <div style={{ flex: 1, background: 'var(--overlay-light)', padding: '0.7rem', borderRadius: '8px' }}>
                  🐶 <strong>机器狗空翻：</strong>波士顿动力的机器狗，在虚拟环境里摔倒了几百万次才学会平衡。
                </div>
                <div style={{ flex: 1, background: 'var(--overlay-light)', padding: '0.7rem', borderRadius: '8px' }}>
                  🕹️ <strong>马里奥通关：</strong>游戏 AI 刚开始只会原地跳，因为偶尔吃了一个金币(+1分)，最后进化成了速通大神。
                </div>
              </div>
            </div>
          </div>
        </div>
      </SlideContent>
    </Slide>
  );
};

const LearningLoopSlide = ({ isActive }) => {
  useSlideSteps(4);

  const cards = [
    { code: 'S', title: '观察状态', icon: '👀', text: '我现在在哪里？刚才得到了什么反馈？' },
    { code: 'A', title: '选择动作', icon: '🎮', text: '向前、转弯、拿起，还是尝试新的行为？' },
    { code: 'R', title: '获得奖励', icon: '⭐', text: '这个动作让结果变好还是变坏？得多少分？' },
    { code: "S'", title: '进入新状态', icon: '🔄', text: '环境发生变化，再从新的局面继续判断。' }
  ];

  return (
    <Slide isActive={isActive}>
      <SlideTitle qtag="Q1 · 角色和信号">强化学习的完整循环</SlideTitle>
      <SlideContent>
        <div style={{ width: '94%', maxWidth: '1200px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'clamp(0.55rem, 1.2vw, 1.1rem)' }}>
            {cards.map((item, index) => {
              const card = (
                <div className="glass-panel" style={{ padding: 'clamp(0.9rem, 1.8vw, 1.7rem)', textAlign: 'center', minHeight: 'clamp(200px, 35vh, 280px)', borderTop: `4px solid ${index % 2 === 0 ? 'var(--accent-cyan)' : 'var(--accent-purple)'}`, flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 'clamp(1.7rem, 2.8vw, 2.7rem)' }}>{item.icon}</span>
                    <span style={{ fontFamily: 'monospace', fontSize: 'clamp(1.3rem, 2.2vw, 2rem)', fontWeight: 900, color: 'var(--accent-cyan)' }}>{item.code}</span>
                  </div>
                  <h3 style={{ fontSize: 'clamp(1.05rem, 1.7vw, 1.4rem)', margin: 'clamp(0.6rem, 1.2vh, 1rem) 0', color: 'var(--text-primary)' }}>{item.title}</h3>
                  <p style={{ fontSize: 'clamp(0.8rem, 1.25vw, 1.02rem)', lineHeight: 1.55, color: 'var(--text-secondary)', margin: 0 }}>{item.text}</p>
                </div>
              );
              return index === 0
                ? <div key={item.code} style={{ display: 'flex' }}>{card}</div>
                : <Step key={item.code} n={index} style={{ display: 'flex' }}>{card}</Step>;
            })}
          </div>
          <Step n={4}>
            <div className="glass-panel" style={{ marginTop: 'clamp(0.9rem, 2.2vh, 1.7rem)', padding: 'clamp(0.8rem, 1.5vw, 1.25rem)', textAlign: 'center', border: '1px dashed var(--accent-green)' }}>
              <div style={{ fontSize: 'clamp(1rem, 1.7vw, 1.3rem)', fontWeight: 800, color: 'var(--accent-green)' }}>状态 S → 动作 A → 奖励 R → 新状态 S′ → 再来一次</div>
              <div style={{ marginTop: 'clamp(0.3rem, 0.7vh, 0.6rem)', fontSize: 'clamp(0.8rem, 1.25vw, 1rem)', color: 'var(--text-secondary)' }}>经历许多轮之后，智能体会更常选择累计得分较高的动作，这套选择倾向就是“策略”。</div>
            </div>
          </Step>
        </div>
      </SlideContent>
    </Slide>
  );
};

const SafetyRulesSlide = ({ isActive }) => {
  useSlideSteps(2);

  return (
    <Slide isActive={isActive}>
      <SlideTitle qtag="课堂实验 · 未知任务挑战">未知任务挑战：怎样把反馈变成学习信号？</SlideTitle>
      <SlideContent>
        <div style={{ width: '92%', maxWidth: '1120px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 'clamp(0.8rem, 1.7vw, 1.5rem)' }}>
            <div className="glass-panel" style={{ padding: 'clamp(1.1rem, 2vw, 1.9rem)', borderTop: '4px solid var(--accent-red)' }}>
              <h3 style={{ fontSize: 'clamp(1.25rem, 1.9vw, 1.65rem)', color: 'var(--accent-red)', marginTop: 0 }}>⚠️ 游戏边界</h3>
              <ol style={{ fontSize: 'clamp(0.88rem, 1.3vw, 1.08rem)', lineHeight: 1.7, color: 'var(--text-secondary)', margin: 0, paddingLeft: '1.4rem' }}>
                <li>执行者不知道最终任务，每次只能做一个动作。</li>
                <li>观察者只能反馈 <strong>Yes（+1）</strong> 或 <strong>No（−1）</strong>，不能说“向左走”。</li>
                <li>不能推、拉或触碰执行者；教师喊停，所有人立即停止。</li>
                <li>每轮结束后再复盘，不在行动过程中泄露目标。</li>
              </ol>
            </div>
            <Step n={1} style={{ display: 'flex' }}>
              <div className="glass-panel" style={{ padding: 'clamp(1.1rem, 2vw, 1.9rem)', borderTop: '4px solid var(--accent-green)', flex: 1 }}>
                <h3 style={{ fontSize: 'clamp(1.2rem, 1.8vw, 1.55rem)', color: 'var(--accent-green)', marginTop: 0 }}>📋 观察员要记录什么？</h3>
                <div style={{ display: 'grid', gap: '0.65rem', color: 'var(--text-secondary)', fontSize: 'clamp(0.85rem, 1.25vw, 1.03rem)' }}>
                  <div style={{ padding: '0.75rem', background: 'var(--overlay-light)', borderRadius: '8px' }}><strong>探索：</strong>他尝试了哪些新动作？</div>
                  <div style={{ padding: '0.75rem', background: 'var(--overlay-light)', borderRadius: '8px' }}><strong>利用：</strong>得到 Yes 后，是否重复相似动作？</div>
                  <div style={{ padding: '0.75rem', background: 'var(--overlay-light)', borderRadius: '8px' }}><strong>策略：</strong>第二轮是否比第一轮更快、更少犯错？</div>
                </div>
              </div>
            </Step>
          </div>
          <Step n={2}>
            <div className="glass-panel" style={{ marginTop: 'clamp(0.8rem, 1.8vh, 1.3rem)', padding: 'clamp(0.8rem, 1.4vw, 1.15rem)', textAlign: 'center', borderLeft: '4px solid var(--accent-cyan)' }}>
              <strong style={{ color: 'var(--accent-cyan)' }}>本页核心：</strong>
              <span style={{ color: 'var(--text-secondary)' }}> 奖励只告诉“结果变好还是变坏”，不会直接告诉正确动作；执行者必须从一连串反馈里自己发现规律。</span>
            </div>
          </Step>
        </div>
      </SlideContent>
    </Slide>
  );
};

const ClassroomRLDashboard = ({ isActive }) => {
  const [score, setScore] = useState(0);
  const [history, setHistory] = useState([]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isRunning, setIsRunning] = useState(false);
  const [flash, setFlash] = useState(null); // 'green' or 'red'

  // Classroom Mission presets
  const presetMissions = [
    "走向教师讲台，拿起老师的红色水杯，稳稳地放到第一排课桌的中央。",
    "走到教室的后门处，将门轻轻关上，然后立正站好。",
    "走到黑板正前方，拿起粉笔画一个大大的圆形，然后把粉笔放回槽内。",
    "走向倒数第二排最右侧的课桌，拿起桌面上的书包，放到讲台椅上。"
  ];
  const [missionIdx, setMissionIdx] = useState(0);
  const [showMission, setShowMission] = useState(false);

  // Timer logic
  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return;
    const timer = setTimeout(() => {
      setTimeLeft(prev => {
        const nextTime = Math.max(0, prev - 1);
        if (nextTime === 0) setIsRunning(false);
        return nextTime;
      });
    }, 1000);
    return () => clearTimeout(timer);
  }, [isRunning, timeLeft]);

  const handleFeedback = useCallback((type) => {
    if (!isRunning && timeLeft > 0) return; // Must start first
    if (timeLeft === 0) return;

    const reward = type === 'yes' ? 1 : -1;
    setScore(s => s + reward);
    setHistory(prev => [{ type, reward, time: timeLeft }, ...prev]);

    // Flash effect
    setFlash(type === 'yes' ? 'green' : 'red');
    setTimeout(() => setFlash(null), 300);
  }, [isRunning, timeLeft]);

  // Keyboard controls
  useEffect(() => {
    if (!isActive) return;
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowUp' || e.key.toLowerCase() === 'w') {
        handleFeedback('yes');
      } else if (e.key === 'ArrowDown' || e.key.toLowerCase() === 's') {
        handleFeedback('no');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isActive, handleFeedback]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetGame = () => {
    setIsRunning(false);
    setTimeLeft(60);
    setScore(0);
    setHistory([]);
    setShowMission(false);
  };

  // Calculate Exploration vs Exploitation
  // Rule: If a Yes follows a Yes, it's Exploitation. Otherwise it's Exploration.
  const calculateRLStats = () => {
    if (history.length === 0) return { exploration: 100, exploitation: 0 };

    let exploitationCount = 0;
    // History is descending (newest first). Let's scan from oldest to newest.
    const reversedHistory = [...history].reverse();
    for (let i = 1; i < reversedHistory.length; i++) {
      if (reversedHistory[i].type === 'yes' && reversedHistory[i - 1].type === 'yes') {
        exploitationCount++;
      }
    }

    const exploitationPercent = Math.round((exploitationCount / history.length) * 100);
    const explorationPercent = 100 - exploitationPercent;

    return {
      exploration: explorationPercent,
      exploitation: exploitationPercent
    };
  };

  const stats = calculateRLStats();

  return (
    <Slide isActive={isActive}>
      <SlideTitle qtag="课堂实验 · 未知任务挑战">强化学习控制台 (Mission Control)</SlideTitle>
      <SlideContent>
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0, pointerEvents: 'none',
          background: flash === 'green' ? 'radial-gradient(circle, rgba(0,255,102,0.2) 0%, transparent 70%)' : flash === 'red' ? 'radial-gradient(circle, rgba(255,51,102,0.2) 0%, transparent 70%)' : 'transparent',
          transition: 'background 0.2s ease-out'
        }} />

        <div data-no-advance className="responsive-flex-container" style={{ display: 'flex', gap: '2rem', width: '95%', maxWidth: '1300px', zIndex: 1, position: 'relative', height: '100%', cursor: 'default' }}>

          {/* Left Panel: Timer, Buttons, and Mission Configurator */}
          <div style={{ flex: 1.4, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

            {/* Mission Panel */}
            <div className="glass-panel" style={{ padding: '1.5rem', borderTop: '4px solid var(--accent-purple)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
                <span style={{ fontSize: '1.2rem', color: 'var(--accent-purple)', fontWeight: 'bold' }}>📡 隐藏任务发布板</span>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button onClick={() => { setMissionIdx((missionIdx + 1) % presetMissions.length); setShowMission(false); }} disabled={isRunning} style={{ padding: '0.4rem 0.8rem', fontSize: '0.9rem', borderRadius: '4px', border: '1px solid var(--border-glass)', background: 'var(--overlay-medium)', color: 'var(--text-primary)', cursor: isRunning ? 'not-allowed' : 'pointer' }}>
                    更换预设
                  </button>
                  <button onClick={() => setShowMission(!showMission)} style={{ padding: '0.4rem 0.8rem', fontSize: '0.9rem', borderRadius: '4px', border: 'none', background: showMission ? 'var(--accent-red)' : 'var(--accent-cyan)', color: 'var(--on-accent)', fontWeight: 'bold', cursor: 'pointer' }}>
                    {showMission ? '隐藏任务' : '揭示任务给全班'}
                  </button>
                </div>
              </div>
              <div style={{ padding: '1rem', background: 'var(--overlay-light)', borderRadius: '8px', minHeight: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border-glass)' }}>
                {showMission ? (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} style={{ fontSize: '1.2rem', color: 'var(--accent-cyan)', fontWeight: 'bold', textAlign: 'center' }}>
                    🎯 隐藏任务：{presetMissions[missionIdx]}
                  </motion.div>
                ) : (
                  <span style={{ color: 'var(--text-tertiary)', fontStyle: 'italic', fontSize: '1.1rem' }}>
                    任务已隐藏（请安排执行者闭眼，点击右侧按钮给全班看）
                  </span>
                )}
              </div>
            </div>

            <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: timeLeft === 0 ? '4px solid var(--accent-red)' : '4px solid var(--accent-cyan)' }}>
              <div>
                <div style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>倒计时</div>
                <div style={{ fontSize: '3.5rem', fontWeight: 800, color: timeLeft <= 10 ? 'var(--accent-red)' : 'var(--text-primary)', fontFamily: 'monospace', lineHeight: 1 }}>
                  00:{timeLeft.toString().padStart(2, '0')}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.8rem' }}>
                <button onClick={toggleTimer} disabled={timeLeft === 0} style={{ padding: '0.8rem 1.8rem', fontSize: '1.3rem', fontWeight: 'bold', background: isRunning ? 'var(--overlay-medium)' : 'var(--accent-cyan)', color: isRunning ? 'var(--text-primary)' : 'var(--on-accent)', border: 'none', borderRadius: '8px', cursor: timeLeft === 0 ? 'not-allowed' : 'pointer' }}>
                  {isRunning ? '暂停' : '开始任务'}
                </button>
                <button onClick={resetGame} style={{ padding: '0.8rem 1.2rem', fontSize: '1.1rem', background: 'transparent', border: '2px solid var(--border-glass)', color: 'var(--text-secondary)', borderRadius: '8px', cursor: 'pointer' }}>
                  重置
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1.5rem', flex: 1 }}>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => handleFeedback('yes')}
                disabled={!isRunning || timeLeft === 0}
                style={{ flex: 1, padding: '1.5rem', borderRadius: '16px', background: 'rgba(10, 148, 100, 0.06)', border: '2px solid var(--accent-green)', color: 'var(--accent-green)', cursor: isRunning && timeLeft > 0 ? 'pointer' : 'not-allowed', opacity: isRunning && timeLeft > 0 ? 1 : 0.5, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
              >
                <span style={{ fontSize: '4rem', marginBottom: '0.5rem' }}>👍</span>
                <strong style={{ fontSize: '2rem' }}>Yes (+1)</strong>
                <span style={{ fontSize: '1.1rem', marginTop: '0.5rem', color: 'var(--text-secondary)' }}>快捷键: ↑ 或 W</span>
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => handleFeedback('no')}
                disabled={!isRunning || timeLeft === 0}
                style={{ flex: 1, padding: '1.5rem', borderRadius: '16px', background: 'rgba(220, 47, 76, 0.06)', border: '2px solid var(--accent-red)', color: 'var(--accent-red)', cursor: isRunning && timeLeft > 0 ? 'pointer' : 'not-allowed', opacity: isRunning && timeLeft > 0 ? 1 : 0.5, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
              >
                <span style={{ fontSize: '4rem', marginBottom: '0.5rem' }}>👎</span>
                <strong style={{ fontSize: '2rem' }}>No (-1)</strong>
                <span style={{ fontSize: '1.1rem', marginTop: '0.5rem', color: 'var(--text-secondary)' }}>快捷键: ↓ 或 S</span>
              </motion.button>
            </div>
          </div>

          {/* Right Panel: Score, History, and RL stats */}
          <div className="glass-panel" style={{ flex: 1, padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

            {/* Score Display */}
            <div style={{ textAlign: 'center', background: 'var(--overlay-light)', padding: '1.5rem', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
              <div>
                <h3 style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '1.2rem' }}>累计得分 (Reward)</h3>
                <motion.div
                  key={score}
                  initial={{ scale: 1.3, color: 'var(--accent-cyan)' }}
                  animate={{ scale: 1, color: score >= 0 ? 'var(--accent-green)' : 'var(--accent-red)' }}
                  transition={{ duration: 0.3 }}
                  style={{ fontSize: '4.5rem', fontWeight: 800, lineHeight: 1 }}
                >
                  {score}
                </motion.div>
              </div>

              {/* Exploration vs Exploitation Stats */}
              <div style={{ width: '130px', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem', borderLeft: '1px solid var(--border-glass)', paddingLeft: '1.5rem' }}>
                <span style={{ fontWeight: 'bold', color: 'var(--text-secondary)' }}>🤖 行动倾向特征：</span>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--accent-cyan)' }}>
                    <span>探索</span><span>{stats.exploration}%</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', background: 'var(--overlay-medium)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${stats.exploration}%`, height: '100%', background: 'var(--accent-cyan)' }}></div>
                  </div>
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--accent-purple)' }}>
                    <span>利用</span><span>{stats.exploitation}%</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', background: 'var(--overlay-medium)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${stats.exploitation}%`, height: '100%', background: 'var(--accent-purple)' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Feedback History */}
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: '200px' }}>
              <h4 style={{ margin: '0 0 0.8rem 0', color: 'var(--text-secondary)', fontSize: '1.1rem' }}>实时反馈轨迹记录：</h4>
              <div style={{ flex: 1, background: 'var(--overlay-light)', border: '1px solid var(--border-glass)', borderRadius: '8px', padding: '1rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {history.map((h, i) => (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    key={i}
                    style={{ padding: '0.8rem', background: 'var(--bg-glass)', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderLeft: `4px solid ${h.reward > 0 ? 'var(--accent-green)' : 'var(--accent-red)'}` }}
                  >
                    <span style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>00:{h.time.toString().padStart(2, '0')}</span>
                    <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: h.reward > 0 ? 'var(--accent-green)' : 'var(--accent-red)' }}>
                      {h.reward > 0 ? '👍 YES' : '👎 NO'}
                    </span>
                  </motion.div>
                ))}
                {history.length === 0 && <div style={{ color: 'var(--text-tertiary)', textAlign: 'center', marginTop: '2.5rem', fontSize: '1.1rem', lineHeight: 1.6 }}>安排执行者入场，<br />全班喊出 Yes 或 No，并在此打分！</div>}
              </div>
            </div>
          </div>
        </div>
      </SlideContent>
    </Slide>
  );
};

const WhyRewardWorksSlide = ({ isActive }) => {
  useSlideSteps(2);
  const [phase, setPhase] = useState('early');
  const earlyData = [
    { action: '向前走', trials: 1, average: 1, note: '只试过一次，暂时看起来很好' },
    { action: '向左转', trials: 1, average: -1, note: '得到一次 No' },
    { action: '伸手触摸', trials: 0, average: null, note: '还没有探索过' }
  ];
  const laterData = [
    { action: '向前走', trials: 8, average: 0.5, note: '有时有效，有时无效' },
    { action: '向左转', trials: 5, average: -0.6, note: '大多数时候让结果变差' },
    { action: '伸手触摸', trials: 4, average: 0.75, note: '平均回报最高' }
  ];
  const rows = phase === 'early' ? earlyData : laterData;

  return (
    <Slide isActive={isActive}>
      <SlideTitle qtag="Q2 · 反馈怎样变聪明">为什么几次 Yes / No 会改变策略？</SlideTitle>
      <SlideContent>
        <div style={{ width: '94%', maxWidth: '1180px', display: 'grid', gridTemplateColumns: '0.82fr 1.18fr', gap: 'clamp(0.8rem, 1.7vw, 1.6rem)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.65rem, 1.3vh, 1rem)' }}>
            <div className="glass-panel" style={{ padding: 'clamp(0.8rem, 1.5vw, 1.25rem)', borderLeft: '4px solid var(--accent-cyan)' }}>
              <strong style={{ color: 'var(--accent-cyan)', fontSize: 'clamp(0.9rem, 1.4vw, 1.12rem)' }}>① 记录经验</strong>
              <p style={{ margin: 'clamp(0.3rem, 0.7vh, 0.55rem) 0 0', fontSize: 'clamp(0.76rem, 1.15vw, 0.95rem)', lineHeight: 1.5, color: 'var(--text-secondary)' }}>每次保存“当时状态、做了什么、得到多少奖励”。</p>
            </div>
            <Step n={1}>
              <div className="glass-panel" style={{ padding: 'clamp(0.8rem, 1.5vw, 1.25rem)', borderLeft: '4px solid var(--accent-purple)' }}>
                <strong style={{ color: 'var(--accent-purple)', fontSize: 'clamp(0.9rem, 1.4vw, 1.12rem)' }}>② 估计动作价值</strong>
                <p style={{ margin: 'clamp(0.3rem, 0.7vh, 0.55rem) 0 0', fontSize: 'clamp(0.76rem, 1.15vw, 0.95rem)', lineHeight: 1.5, color: 'var(--text-secondary)' }}>同一个动作试得越多，越能看出它通常带来好结果还是坏结果。</p>
              </div>
            </Step>
            <Step n={2}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.65rem, 1.3vh, 1rem)' }}>
                <div className="glass-panel" style={{ padding: 'clamp(0.8rem, 1.5vw, 1.25rem)', borderLeft: '4px solid var(--accent-green)' }}>
                  <strong style={{ color: 'var(--accent-green)', fontSize: 'clamp(0.9rem, 1.4vw, 1.12rem)' }}>③ 调整选择概率</strong>
                  <p style={{ margin: 'clamp(0.3rem, 0.7vh, 0.55rem) 0 0', fontSize: 'clamp(0.76rem, 1.15vw, 0.95rem)', lineHeight: 1.5, color: 'var(--text-secondary)' }}>平均回报高的动作以后更常被选择，回报低的动作逐渐减少。</p>
                </div>
                <div className="glass-panel" style={{ padding: 'clamp(0.75rem, 1.35vw, 1.05rem)', textAlign: 'center', border: '1px dashed var(--accent-green)' }}>
                  <code style={{ color: 'var(--accent-green)', fontSize: 'clamp(0.84rem, 1.3vw, 1.05rem)' }}>动作价值 ≈ 获得的总奖励 ÷ 尝试次数</code>
                  <div style={{ marginTop: 'clamp(0.25rem, 0.6vh, 0.45rem)', color: 'var(--text-tertiary)', fontSize: 'clamp(0.68rem, 1vw, 0.84rem)' }}>这是帮助学生理解的简化版本；真实算法还会考虑状态和未来奖励。</div>
                </div>
              </div>
            </Step>
          </div>

          <div className="glass-panel" style={{ padding: 'clamp(1rem, 1.9vw, 1.7rem)', borderTop: '4px solid var(--accent-purple)' }} data-no-advance>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', marginBottom: 'clamp(0.75rem, 1.4vh, 1.1rem)' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: 'clamp(1rem, 1.7vw, 1.35rem)' }}>同一个任务，不同时刻的“经验表”</h3>
                <div style={{ marginTop: 'clamp(0.25rem, 0.6vh, 0.45rem)', color: 'var(--text-tertiary)', fontSize: 'clamp(0.72rem, 1vw, 0.88rem)' }}>点击切换，观察智能体为什么会改变选择</div>
              </div>
              <div style={{ display: 'flex', gap: 'clamp(0.35rem, 0.7vw, 0.6rem)' }}>
                <button onClick={() => setPhase('early')} style={{ padding: 'clamp(0.45rem, 0.8vw, 0.7rem) clamp(0.7rem, 1.2vw, 1rem)', borderRadius: '8px', border: '1px solid var(--accent-cyan)', background: phase === 'early' ? 'var(--accent-cyan)' : 'transparent', color: phase === 'early' ? 'var(--on-accent)' : 'var(--text-primary)', cursor: 'pointer', fontWeight: 700 }}>刚开始</button>
                <button onClick={() => setPhase('later')} style={{ padding: 'clamp(0.45rem, 0.8vw, 0.7rem) clamp(0.7rem, 1.2vw, 1rem)', borderRadius: '8px', border: '1px solid var(--accent-purple)', background: phase === 'later' ? 'var(--accent-purple)' : 'transparent', color: phase === 'later' ? 'var(--on-accent)' : 'var(--text-primary)', cursor: 'pointer', fontWeight: 700 }}>多次尝试后</button>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.65fr 0.8fr 1.5fr', gap: 'clamp(0.4rem, 0.8vw, 0.7rem)', padding: '0 clamp(0.5rem, 1vw, 0.8rem)', color: 'var(--text-tertiary)', fontSize: 'clamp(0.68rem, 0.95vw, 0.82rem)', marginBottom: 'clamp(0.35rem, 0.8vh, 0.6rem)' }}>
              <span>动作</span><span>尝试</span><span>平均回报</span><span>模型目前的判断</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.55rem, 1vh, 0.8rem)' }}>
              {rows.map((row) => {
                const best = phase === 'later' && row.average === 0.75;
                return (
                  <motion.div layout key={`${phase}-${row.action}`} style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.65fr 0.8fr 1.5fr', gap: 'clamp(0.4rem, 0.8vw, 0.7rem)', alignItems: 'center', padding: 'clamp(0.65rem, 1.1vw, 0.95rem)', borderRadius: '10px', background: best ? 'rgba(52,211,153,0.12)' : 'var(--overlay-light)', borderLeft: `4px solid ${row.average === null ? 'var(--text-tertiary)' : row.average > 0 ? 'var(--accent-green)' : 'var(--accent-red)'}` }}>
                    <strong style={{ fontSize: 'clamp(0.78rem, 1.15vw, 0.96rem)' }}>{row.action}</strong>
                    <span style={{ fontSize: 'clamp(0.74rem, 1.08vw, 0.9rem)' }}>{row.trials} 次</span>
                    <strong style={{ color: row.average === null ? 'var(--text-tertiary)' : row.average > 0 ? 'var(--accent-green)' : 'var(--accent-red)', fontSize: 'clamp(0.78rem, 1.15vw, 0.96rem)' }}>{row.average === null ? '未知' : `${row.average > 0 ? '+' : ''}${row.average}`}</strong>
                    <span style={{ color: 'var(--text-secondary)', fontSize: 'clamp(0.7rem, 1vw, 0.86rem)', lineHeight: 1.4 }}>{row.note}</span>
                  </motion.div>
                );
              })}
            </div>

            <div style={{ marginTop: 'clamp(0.7rem, 1.4vh, 1rem)', padding: 'clamp(0.7rem, 1.2vw, 0.95rem)', borderRadius: '10px', background: 'var(--overlay-light)', fontSize: 'clamp(0.74rem, 1.1vw, 0.92rem)', lineHeight: 1.5, color: 'var(--text-secondary)' }}>
              {phase === 'early'
                ? <><strong style={{ color: 'var(--accent-cyan)' }}>经验太少：</strong>“向前走”看起来最好，但可能只是运气。此时仍要探索没试过的动作。</>
                : <><strong style={{ color: 'var(--accent-purple)' }}>经验变多：</strong>“伸手触摸”的平均回报最高，策略会提高选择它的概率，但不会保证永远只选它。</>}
            </div>
          </div>
        </div>
      </SlideContent>
    </Slide>
  );
};

const StrategySlide = ({ isActive }) => {
  useSlideSteps(3);

  return (
    <Slide isActive={isActive}>
      <SlideTitle qtag="Q3 · 探索与利用">探索与利用：为什么不能永远只走“最熟的路”？</SlideTitle>
      <SlideContent>
        <div className="responsive-flex-container" style={{ display: 'flex', gap: 'clamp(0.8rem, 1.5vw, 1.3rem)', width: '92%', maxWidth: '1160px' }}>
          <figure className="glass-panel" style={{ flex: 1.08, margin: 0, padding: 'clamp(0.65rem, 1.1vw, 0.9rem)', borderTop: '4px solid var(--accent-purple)', display: 'flex', flexDirection: 'column' }}>
            <img src="/images/explore_exploit.png" alt="机器人在已知小奖励路线和未知大宝藏路线之间权衡" className="teaching-visual" style={{ maxHeight: 'min(44vh, 335px)', height: '100%' }} />
            <figcaption style={{ marginTop: '0.55rem', color: 'var(--text-secondary)', fontSize: 'clamp(0.74rem, 1.05vw, 0.9rem)', lineHeight: 1.45 }}><strong style={{ color: 'var(--accent-purple)' }}>看图：</strong>左边路线熟悉、回报确定；右边路线未知、可能发现更高回报。策略要在“现在得分”和“学习新信息”之间权衡。</figcaption>
          </figure>
          <div style={{ flex: 0.92, display: 'grid', gap: '0.6rem' }}>
            <Step n={1} style={{ display: 'flex' }}>
              <div className="glass-panel" style={{ padding: 'clamp(0.8rem, 1.4vw, 1.15rem)', borderLeft: '4px solid var(--accent-purple)', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <h3 style={{ fontSize: 'clamp(1.05rem, 1.6vw, 1.35rem)', margin: '0 0 0.35rem', color: 'var(--accent-purple)' }}>探索 Exploration</h3>
                <p style={{ fontSize: 'clamp(0.78rem, 1.15vw, 0.96rem)', lineHeight: 1.5, color: 'var(--text-secondary)', margin: 0 }}>尝试还不了解的动作。短期可能得分低，但会获得新信息，避免错过更好的方法。</p>
              </div>
            </Step>
            <Step n={2} style={{ display: 'flex' }}>
              <div className="glass-panel" style={{ padding: 'clamp(0.8rem, 1.4vw, 1.15rem)', borderLeft: '4px solid var(--accent-cyan)', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <h3 style={{ fontSize: 'clamp(1.05rem, 1.6vw, 1.35rem)', margin: '0 0 0.35rem', color: 'var(--accent-cyan)' }}>利用 Exploitation</h3>
                <p style={{ fontSize: 'clamp(0.78rem, 1.15vw, 0.96rem)', lineHeight: 1.5, color: 'var(--text-secondary)', margin: 0 }}>选择已经证明有效的动作。能稳定获得回报，但如果过早只利用，可能被“局部最优”困住。</p>
              </div>
            </Step>
            <Step n={3} style={{ display: 'flex' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', flex: 1 }}>
                <div className="glass-panel" style={{ padding: 'clamp(0.8rem, 1.4vw, 1.15rem)', borderLeft: '4px solid var(--accent-green)' }}>
                  <strong style={{ color: 'var(--accent-green)', fontSize: 'clamp(0.88rem, 1.25vw, 1.05rem)' }}>常见做法 ε-greedy：</strong>
                  <p style={{ fontSize: 'clamp(0.74rem, 1.08vw, 0.92rem)', lineHeight: 1.48, color: 'var(--text-secondary)', margin: '0.3rem 0 0' }}>大多数时候选当前最优动作，少数时候随机探索；经验越多，探索比例通常可以逐渐降低。</p>
                </div>
                <div style={{ padding: '0.7rem', border: '1px dashed var(--accent-cyan)', borderRadius: '8px', color: 'var(--text-secondary)', fontSize: 'clamp(0.74rem, 1.05vw, 0.9rem)' }}><strong>课堂追问：</strong>第一轮应多探索还是多利用？第二轮已经知道哪些动作有效后，策略应怎样改变？</div>
              </div>
            </Step>
          </div>
        </div>
      </SlideContent>
    </Slide>
  );
};

const LongTermRewardSlide = ({ isActive }) => {
  useSlideSteps(3);

  return (
    <Slide isActive={isActive}>
      <SlideTitle qtag="Q3 · 探索与利用">不能只看眼前这一分</SlideTitle>
      <SlideContent>
        <div style={{ width: '92%', maxWidth: '1140px', display: 'grid', gridTemplateColumns: '1.12fr 0.88fr', gap: 'clamp(0.8rem, 1.7vw, 1.5rem)' }}>
          <figure className="glass-panel" style={{ margin: 0, padding: 'clamp(0.7rem, 1.2vw, 1rem)', borderTop: '4px solid var(--accent-green)' }}>
            <img src="/images/reward_maze.png" alt="机器人在眼前奖励与长期回报之间选择路线" className="teaching-visual" style={{ maxHeight: 'min(40vh, 300px)' }} />
            <figcaption style={{ color: 'var(--text-secondary)', fontSize: 'clamp(0.72rem, 1.05vw, 0.9rem)', lineHeight: 1.45, marginTop: '0.55rem' }}>左边很快得到糖果，但路线通向陷阱；右边暂时绕远，却能安全到达终点。智能体要比较整条路线的累计奖励。</figcaption>
          </figure>
          <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: 'clamp(0.6rem, 1.2vh, 1rem)' }}>
            <Step n={1} style={{ display: 'flex' }}>
              <div className="glass-panel" style={{ padding: 'clamp(0.85rem, 1.5vw, 1.3rem)', borderLeft: '4px solid var(--accent-red)', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <h3 style={{ fontSize: 'clamp(1.05rem, 1.6vw, 1.35rem)', color: 'var(--accent-red)', margin: '0 0 0.45rem' }}>🍬 眼前奖励</h3>
                <p style={{ fontSize: 'clamp(0.8rem, 1.2vw, 1rem)', lineHeight: 1.55, color: 'var(--text-secondary)', margin: 0 }}>某一步立刻得到 +1，不代表整条路线最好。为了眼前食物钻进死角，可能马上结束游戏。</p>
              </div>
            </Step>
            <Step n={2} style={{ display: 'flex' }}>
              <div className="glass-panel" style={{ padding: 'clamp(0.85rem, 1.5vw, 1.3rem)', borderLeft: '4px solid var(--accent-green)', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <h3 style={{ fontSize: 'clamp(1.05rem, 1.6vw, 1.35rem)', color: 'var(--accent-green)', margin: '0 0 0.45rem' }}>🏆 长期回报</h3>
                <p style={{ fontSize: 'clamp(0.8rem, 1.2vw, 1rem)', lineHeight: 1.55, color: 'var(--text-secondary)', margin: 0 }}>强化学习比较未来许多步奖励的总和。暂时绕远一点，如果更安全、更容易完成任务，反而更优。</p>
              </div>
            </Step>
          </div>
        </div>
        <Step n={3} style={{ width: '90%', maxWidth: '1100px' }}>
          <div className="glass-panel" style={{ marginTop: 'clamp(0.9rem, 2vh, 1.5rem)', padding: 'clamp(0.9rem, 1.5vw, 1.3rem)', display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 'clamp(0.8rem, 1.5vw, 1.3rem)', alignItems: 'center', borderLeft: '4px solid var(--accent-purple)' }}>
            <span style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)' }}>🤔</span>
            <div>
              <strong style={{ fontSize: 'clamp(1rem, 1.6vw, 1.25rem)', color: 'var(--accent-purple)' }}>课堂追问：如果“走一步扣 0.1 分”，智能体会不会为了少扣分而完全不动？</strong>
              <div style={{ marginTop: 'clamp(0.3rem, 0.7vh, 0.5rem)', fontSize: 'clamp(0.8rem, 1.25vw, 1rem)', color: 'var(--text-secondary)' }}>奖励必须同时鼓励完成目标、控制成本并遵守安全边界，不能只写一个分数。</div>
            </div>
          </div>
        </Step>
      </SlideContent>
    </Slide>
  );
};

const RewardHackerSlide = ({ isActive }) => {
  useSlideSteps(3);

  const quizOptions = [
    { text: '“每踩一次奖励点，就 +1 分”', correct: true, explain: '漏洞！机器人会发现：循环踩同一个点刷分，比去终点得分更快——它忠实优化了分数，却背离了真正目标。' },
    { text: '“到达终点 +10，每多走一步 −0.1”', correct: false, explain: '这个设计同时鼓励完成目标和控制成本，机器人没有理由原地刷分。' }
  ];

  return (
    <Slide isActive={isActive}>
      <SlideTitle qtag="Q4 · 奖励设计错了会怎样">奖励漏洞与“AI 对齐”</SlideTitle>
      <SlideContent>
        <div className="responsive-flex-container" style={{ display: 'flex', gap: 'clamp(0.8rem, 1.5vw, 1.3rem)', width: '92%', maxWidth: '1180px' }}>
          <div style={{ flex: 1.08, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            <figure className="glass-panel" style={{ margin: 0, padding: 'clamp(0.65rem, 1.1vw, 0.9rem)', borderTop: '4px solid var(--accent-red)', display: 'flex', flexDirection: 'column' }}>
              <img src="/images/reward_hacking.png" alt="机器人循环刷奖励而忽略终点，设计者随后修改奖励规则" className="teaching-visual" style={{ maxHeight: 'min(33vh, 245px)', height: '100%' }} />
              <figcaption style={{ marginTop: '0.55rem', color: 'var(--text-secondary)', fontSize: 'clamp(0.74rem, 1.05vw, 0.9rem)', lineHeight: 1.45 }}><strong style={{ color: 'var(--accent-red)' }}>图中发生了什么：</strong>机器人没有“故意作弊”，它只是忠实最大化分数；问题出在分数没有完整代表人的真正目标。</figcaption>
            </figure>
            <QuickQuiz
              question="下面哪条奖励规则，会让机器人学会“钻空子”？"
              options={quizOptions}
            />
          </div>
          <div style={{ flex: 0.92, display: 'grid', gap: '0.6rem' }}>
            <Step n={1} style={{ display: 'flex' }}>
              <div className="glass-panel" style={{ padding: 'clamp(0.8rem, 1.4vw, 1.15rem)', borderLeft: '4px solid var(--accent-green)', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <h3 style={{ fontSize: 'clamp(1rem, 1.55vw, 1.3rem)', color: 'var(--accent-green)', margin: '0 0 0.35rem' }}>怎样修正？</h3>
                <ul style={{ margin: 0, paddingLeft: '1.1rem', color: 'var(--text-secondary)', fontSize: 'clamp(0.74rem, 1.08vw, 0.92rem)', lineHeight: 1.52 }}><li>奖励“朝终点取得进展”，而不是重复动作。</li><li>给原地循环、超时和偏离路线设置惩罚。</li><li>在新场景反复测试，主动寻找意外策略。</li></ul>
              </div>
            </Step>
            <Step n={2} style={{ display: 'flex' }}>
              <div className="glass-panel" style={{ padding: 'clamp(0.8rem, 1.4vw, 1.15rem)', borderLeft: '4px solid var(--accent-purple)', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <h3 style={{ fontSize: 'clamp(1rem, 1.55vw, 1.3rem)', color: 'var(--accent-purple)', margin: '0 0 0.35rem' }}>从奖励设计到 AI 对齐</h3>
                <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: 'clamp(0.74rem, 1.08vw, 0.92rem)', lineHeight: 1.5 }}>现实目标往往包含安全、公平、诚实等多项要求，很难压缩成一个分数。让 AI 的行为持续符合人的真实意图，就是“对齐”问题。</p>
              </div>
            </Step>
            <Step n={3} style={{ display: 'flex' }}>
              <div style={{ padding: '0.7rem', border: '1px dashed var(--accent-cyan)', borderRadius: '8px', color: 'var(--text-secondary)', fontSize: 'clamp(0.74rem, 1.05vw, 0.9rem)', flex: 1, display: 'flex', alignItems: 'center' }}><strong style={{ color: 'var(--accent-cyan)' }}>一句话结论：</strong>奖励函数是“机器读得懂的目标”；写得不完整，机器就可能正确地完成错误的事。</div>
            </Step>
          </div>
        </div>
      </SlideContent>
    </Slide>
  );
};

const SummarySlide = ({ isActive }) => {
  useSlideSteps(4);
  const step = useCurrentStep();

  const cards = [
    { type: '大语言模型', game: '人类语言模型接龙', how: '上下文和概率', explain: '根据前文预测下一个 token', color: 'var(--accent-cyan)' },
    { type: '计算机视觉', game: '外星人的地球图鉴', how: '特征', explain: '从像素里找有区分度的线索', color: 'var(--accent-purple)' },
    { type: '机器学习', game: '黑箱预测机', how: '样本和规律', explain: '用旧样本学规则，预测新样本', color: 'var(--accent-blue)' },
    { type: '强化学习', game: '未知任务挑战', how: '奖励与试错', explain: '在反馈中优化行动策略', color: 'var(--accent-green)' }
  ];

  return (
    <Slide isActive={isActive}>
      <SlideTitle qtag="课程复盘 · 四类 AI 思维">四类 AI 思维总复盘</SlideTitle>
      <SlideContent>
        <div style={{ width: '92%', maxWidth: '1060px' }}>
          <p style={{ margin: '0 0 clamp(0.7rem, 1.5vh, 1.2rem)', fontSize: 'clamp(0.9rem, 1.4vw, 1.12rem)', color: 'var(--text-secondary)', textAlign: 'center' }}>
            🙋 每按一次翻页，揭示一类 AI 的答案。揭示前，先全班抢答：<strong style={{ color: 'var(--text-primary)' }}>它主要依靠什么变聪明？</strong>
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(0.7rem, 1.4vw, 1.2rem)' }}>
            {cards.map((ai, idx) => {
              const revealed = step >= idx + 1;
              return (
                <div key={idx} className="glass-panel" style={{ padding: 'clamp(0.9rem, 1.7vw, 1.5rem)', borderTop: `4px solid ${ai.color}` }}>
                  <h3 style={{ color: ai.color, fontSize: 'clamp(1.15rem, 1.8vw, 1.5rem)', margin: '0 0 0.5rem' }}>{ai.type}</h3>
                  <div style={{ fontSize: 'clamp(0.82rem, 1.25vw, 1rem)', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    <div><strong>课堂游戏：</strong>{ai.game}</div>
                    <div style={{ visibility: revealed ? 'visible' : 'hidden', opacity: revealed ? 1 : 0, transition: 'opacity 0.4s ease' }}>
                      <div style={{ marginTop: '0.3rem' }}><strong>靠什么变聪明：</strong><span style={{ color: ai.color, fontWeight: 800 }}>{ai.how}</span></div>
                      <div style={{ marginTop: '0.3rem', color: 'var(--text-primary)' }}>{ai.explain}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </SlideContent>
    </Slide>
  );
};

const OutroSlide = ({ isActive }) => {
  useSlideSteps(1);

  return (
    <Slide isActive={isActive}>
      <SlideTitle qtag="结业出口">结业出口</SlideTitle>
      <SlideContent>
        <div className="glass-panel" style={{ padding: 'clamp(2rem, 4vw, 3.5rem)', maxWidth: '820px', textAlign: 'center', borderTop: '4px solid var(--accent-purple)' }}>
          <h3 style={{ fontSize: 'clamp(1.7rem, 3vw, 2.5rem)', marginBottom: 'clamp(1rem, 2.5vh, 2rem)', color: 'var(--accent-purple)', marginTop: 0 }}>
            AI 不是魔法！
          </h3>
          <p style={{ fontSize: 'clamp(1.05rem, 1.8vw, 1.5rem)', lineHeight: 1.8, color: 'var(--text-secondary)', margin: 0 }}>
            不同 AI 的聪明方式不同，<br />
            它们都需要依据、数据、规则或反馈。
          </p>
          <Step n={1}>
            <p style={{ fontSize: 'clamp(1.05rem, 1.8vw, 1.5rem)', lineHeight: 1.8, color: 'var(--text-primary)', margin: '0.6rem 0 0' }}>
              <strong>它们也都可能出错——所以我们要学会看透它的思考。</strong>
            </p>
          </Step>
        </div>
      </SlideContent>
    </Slide>
  );
};

export const Lesson3 = ({ onGoHome }) => {
  const slides = [
    CoverSlide,
    LeadInSlide,
    ElementsSlide,
    LearningLoopSlide,
    SafetyRulesSlide,
    ClassroomRLDashboard, // Round 1
    WhyRewardWorksSlide,
    StrategySlide,
    LongTermRewardSlide,
    ClassroomRLDashboard, // Round 2
    RewardHackerSlide,
    SummarySlide,
    OutroSlide
  ];

  const stages = [
    { from: 0, label: '课程导入' },
    { from: 2, label: '原理建构' },
    { from: 4, label: '游戏准备' },
    { from: 5, label: '课堂实验' },
    { from: 6, label: '解释现象' },
    { from: 10, label: '安全与迁移' },
    { from: 11, label: '课程总结' }
  ];

  return <Presentation slides={slides} onGoHome={onGoHome} lessonLabel="第 3 课时 · 从反馈到策略" stages={stages} />;
};
