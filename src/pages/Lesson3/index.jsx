import { useState, useEffect, useCallback } from 'react';
import { Presentation } from '../../components/Presentation';
import { Slide, SlideTitle, SlideContent } from '../../components/Slide';
import { motion } from 'framer-motion';

const CoverSlide = ({ isActive }) => (
  <Slide isActive={isActive}>
    <SlideContent>
      <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ duration: 0.8 }}>
        <h3 style={{ color: 'var(--accent-green)', fontSize: '2rem', margin: 0, textAlign: 'center' }}>第 3 课时</h3>
        <h1 style={{ fontSize: '5rem', margin: '1rem 0', fontWeight: 800 }} className="text-gradient">
          从反馈到策略
        </h1>
        <p style={{ fontSize: '1.8rem', color: 'var(--text-secondary)', textAlign: 'center' }}>
          没有标准答案时，AI 如何在试错中变聪明？
        </p>
      </motion.div>
    </SlideContent>
  </Slide>
);

const LeadInSlide = ({ isActive }) => (
  <Slide isActive={isActive}>
    <SlideTitle>学骑自行车的秘密</SlideTitle>
    <SlideContent>
      <div className="responsive-flex-container" style={{ display: 'flex', gap: '4rem', alignItems: 'center', width: '90%', maxWidth: '1200px' }}>
        <div className="glass-panel" style={{ padding: '3rem', flex: 1 }}>
          <h3 style={{ fontSize: '2rem', color: 'var(--accent-green)' }}>你学骑车、打球时，是一开始就知道最佳动作吗？</h3>
          <p style={{ fontSize: '1.5rem', lineHeight: 1.8, color: 'var(--text-secondary)', margin: '2rem 0' }}>
            怎么知道自己做得越来越好？<br/>
            如果只告诉你 Yes 或 No，你能不能慢慢摸索出正确的任务？
          </p>
          <div style={{ background: 'var(--overlay-light)', padding: '1.5rem', borderRadius: '12px' }}>
            <strong style={{ fontSize: '1.3rem', color: 'var(--text-primary)' }}>前两课看文字、看图片。今天看行动！有些 AI 需要在环境里做动作，靠反馈来改策略。</strong>
          </div>
        </div>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <img src="/images/robot_bicycle.png" alt="Robot Learning Bicycle" style={{ width: '100%', maxWidth: '400px', borderRadius: '16px', boxShadow: '0 0 30px rgba(0, 255, 102, 0.3)', border: '1px solid rgba(0, 255, 102, 0.2)' }} />
        </div>
      </div>
    </SlideContent>
  </Slide>
);

const ElementsSlide = ({ isActive }) => (
  <Slide isActive={isActive}>
    <SlideTitle>强化学习五要素</SlideTitle>
    <SlideContent>
      <div className="responsive-flex-container" style={{ display: 'flex', gap: '2rem', width: '90%', maxWidth: '1200px', height: '100%' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="glass-panel" style={{ padding: '1.5rem', borderTop: '4px solid var(--accent-cyan)' }}>
            <h3 style={{ color: 'var(--accent-cyan)', fontSize: '1.5rem', marginTop: 0 }}>🤖 智能体 (Agent)</h3>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>做动作的“大脑”。</p>
          </div>
          <div className="glass-panel" style={{ padding: '1.5rem', borderTop: '4px solid var(--accent-purple)' }}>
            <h3 style={{ color: 'var(--accent-purple)', fontSize: '1.5rem', marginTop: 0 }}>🌍 环境 (Environment)</h3>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>智能体所在的“世界”（如：真实赛道、游戏地图）。</p>
          </div>
          <div className="glass-panel" style={{ padding: '1.5rem', background: 'var(--overlay-light)', textAlign: 'center' }}>
            <h3 style={{ fontSize: '1.5rem', margin: '0 0 0.5rem 0' }}>策略 (Policy)</h3>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', margin: 0 }}>从无数次摔倒和得分中，练就的“独门绝技”。</p>
          </div>
          
          <div style={{ marginTop: 'auto', padding: '1.2rem', background: 'var(--overlay-light)', borderRadius: '8px', border: '1px dashed var(--text-tertiary)' }}>
            <strong style={{ color: 'var(--accent-green)', fontSize: '1.1rem' }}>🔬 硬核拆解：ChatGPT 的终极魔法 (RLHF)</strong>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', margin: '0.5rem 0 0 0', lineHeight: 1.5 }}>
              只靠“接龙”算概率，AI 会乱骂人。科学家发明了 <strong>基于人类反馈的强化学习 (RLHF)</strong>：让人类老师给 AI 的回答打分（点赞/踩）。AI 为了得到更高的“赞(Reward)”，就会调整策略，慢慢变成一个有礼貌、有教养的好帮手！
            </p>
          </div>
        </div>
        
        <div style={{ flex: 1.5, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ position: 'relative', height: '300px', background: 'rgba(0,0,0,0.2)', borderRadius: '20px', border: '1px solid var(--border-glass)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
            {/* Cycle Diagram Diagram using absolute positioning */}
            <div style={{ position: 'absolute', top: '15%', left: '40%', background: 'var(--accent-cyan)', color: '#000', padding: '0.8rem 1.5rem', borderRadius: '30px', fontWeight: 'bold', zIndex: 2 }}>智能体</div>
            <div style={{ position: 'absolute', bottom: '15%', left: '40%', background: 'var(--accent-purple)', color: 'var(--text-primary)', padding: '0.8rem 1.5rem', borderRadius: '30px', fontWeight: 'bold', zIndex: 2 }}>环境</div>
            
            <div style={{ position: 'absolute', top: '40%', right: '10%', background: 'var(--accent-green)', color: '#000', padding: '0.8rem', borderRadius: '8px', zIndex: 2, textAlign: 'center' }}>
              <strong>动作 (Action)</strong><br/><span style={{ fontSize: '0.9rem' }}>打方向盘</span>
            </div>
            <div style={{ position: 'absolute', top: '35%', left: '5%', background: 'var(--accent-blue)', color: 'var(--text-primary)', padding: '0.8rem', borderRadius: '8px', zIndex: 2, textAlign: 'center' }}>
              <strong>状态 (State)</strong><br/><span style={{ fontSize: '0.9rem' }}>前面有红灯</span>
            </div>
            <div style={{ position: 'absolute', top: '55%', left: '5%', background: 'var(--accent-red)', color: 'var(--text-primary)', padding: '0.8rem', borderRadius: '8px', zIndex: 2, textAlign: 'center' }}>
              <strong>奖励 (Reward)</strong><br/><span style={{ fontSize: '0.9rem' }}>闯红灯扣分!</span>
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
          
          <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <h4 style={{ margin: '0 0 1rem 0', color: 'var(--text-primary)', fontSize: '1.2rem' }}>🎮 真实世界里的“超级玩家”</h4>
            <div style={{ display: 'flex', gap: '1rem', fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
              <div style={{ flex: 1, background: 'var(--overlay-light)', padding: '1rem', borderRadius: '8px' }}>
                🐶 <strong>机器狗空翻：</strong>波士顿动力的机器狗，在虚拟环境里摔倒了几百万次才学会平衡。
              </div>
              <div style={{ flex: 1, background: 'var(--overlay-light)', padding: '1rem', borderRadius: '8px' }}>
                🕹️ <strong>马里奥通关：</strong>游戏 AI 刚开始只会原地跳，因为偶尔吃了一个金币(+1分)，最后进化成了速通大神。
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideContent>
  </Slide>
);

const SafetyRulesSlide = ({ isActive }) => (
  <Slide isActive={isActive}>
    <SlideTitle>安全与规则 (未知任务挑战)</SlideTitle>
    <SlideContent>
      <div className="glass-panel" style={{ padding: '3rem', width: '80%', maxWidth: '900px' }}>
        <h3 style={{ fontSize: '1.8rem', color: 'var(--accent-red)', marginTop: 0 }}>⚠️ 游戏边界</h3>
        <ol style={{ fontSize: '1.4rem', lineHeight: 2, color: 'var(--text-secondary)' }}>
          <li>执行者不知道任务目标（例如：走到某点、拿起某物）。</li>
          <li>每次只能做一个动作，做完必须停下。</li>
          <li>其他同学只能说 <strong>Yes</strong> 或 <strong>No</strong>，绝不能直接提示（如“向左走”）。</li>
          <li>不能推、拉、碰执行者。</li>
          <li>教师喊停，所有人立即停止。</li>
        </ol>
        <div style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(255,51,102,0.1)', borderLeft: '4px solid var(--accent-red)' }}>
          <strong>核心：</strong>这不是考执行者聪不聪明，而是观察“反馈怎样让策略变好”。
        </div>
      </div>
    </SlideContent>
  </Slide>
);

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
    const timer = setInterval(() => {
      setTimeLeft(prev => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
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
      <SlideTitle>强化学习控制台 (Mission Control)</SlideTitle>
      <SlideContent>
        <div style={{ 
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0, pointerEvents: 'none',
          background: flash === 'green' ? 'radial-gradient(circle, rgba(0,255,102,0.2) 0%, transparent 70%)' : flash === 'red' ? 'radial-gradient(circle, rgba(255,51,102,0.2) 0%, transparent 70%)' : 'transparent',
          transition: 'background 0.2s ease-out'
        }} />
        
        <div className="responsive-flex-container" style={{ display: 'flex', gap: '2rem', width: '95%', maxWidth: '1300px', zIndex: 1, position: 'relative', height: '100%' }}>
          
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
                  <button onClick={() => setShowMission(!showMission)} style={{ padding: '0.4rem 0.8rem', fontSize: '0.9rem', borderRadius: '4px', border: 'none', background: showMission ? 'var(--accent-red)' : 'var(--accent-cyan)', color: '#000', fontWeight: 'bold', cursor: 'pointer' }}>
                    {showMission ? '隐藏任务' : '揭示任务给全班'}
                  </button>
                </div>
              </div>
              <div style={{ padding: '1rem', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', minHeight: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
                <button onClick={toggleTimer} disabled={timeLeft === 0} style={{ padding: '0.8rem 1.8rem', fontSize: '1.3rem', fontWeight: 'bold', background: isRunning ? 'var(--overlay-medium)' : 'var(--accent-cyan)', color: isRunning ? 'var(--text-primary)' : '#000', border: 'none', borderRadius: '8px', cursor: timeLeft === 0 ? 'not-allowed' : 'pointer' }}>
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
                disabled={!isRunning}
                style={{ flex: 1, padding: '1.5rem', borderRadius: '16px', background: 'rgba(0, 255, 102, 0.05)', border: '2px solid var(--accent-green)', color: 'var(--accent-green)', cursor: isRunning && timeLeft > 0 ? 'pointer' : 'not-allowed', opacity: isRunning && timeLeft > 0 ? 1 : 0.5, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
              >
                <span style={{ fontSize: '4rem', marginBottom: '0.5rem' }}>👍</span>
                <strong style={{ fontSize: '2rem' }}>Yes (+1)</strong>
                <span style={{ fontSize: '1.1rem', marginTop: '0.5rem', color: 'var(--text-secondary)' }}>快捷键: ↑ 或 W</span>
              </motion.button>
              
              <motion.button 
                whileTap={{ scale: 0.95 }}
                onClick={() => handleFeedback('no')}
                disabled={!isRunning}
                style={{ flex: 1, padding: '1.5rem', borderRadius: '16px', background: 'rgba(255, 51, 102, 0.05)', border: '2px solid var(--accent-red)', color: 'var(--accent-red)', cursor: isRunning && timeLeft > 0 ? 'pointer' : 'not-allowed', opacity: isRunning && timeLeft > 0 ? 1 : 0.5, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
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
              <div style={{ flex: 1, background: 'rgba(0,0,0,0.3)', borderRadius: '8px', padding: '1rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {history.map((h, i) => (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    key={i} 
                    style={{ padding: '0.8rem', background: 'var(--overlay-light)', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderLeft: `4px solid ${h.reward > 0 ? 'var(--accent-green)' : 'var(--accent-red)'}` }}
                  >
                    <span style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>00:{h.time.toString().padStart(2, '0')}</span>
                    <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: h.reward > 0 ? 'var(--accent-green)' : 'var(--accent-red)' }}>
                      {h.reward > 0 ? '👍 YES' : '👎 NO'}
                    </span>
                  </motion.div>
                ))}
                {history.length === 0 && <div style={{ color: 'var(--text-tertiary)', textAlign: 'center', marginTop: '2.5rem', fontSize: '1.1rem', lineHeight: 1.6 }}>安排执行者入场，<br/>全班喊出 Yes 或 No，并在此打分！</div>}
              </div>
            </div>
          </div>
        </div>
      </SlideContent>
    </Slide>
  );
};

const StrategySlide = ({ isActive }) => (
  <Slide isActive={isActive}>
    <SlideTitle>策略讨论</SlideTitle>
    <SlideContent>
      <div className="responsive-flex-container" style={{ display: 'flex', gap: '2rem', width: '80%', maxWidth: '1000px' }}>
        <div className="glass-panel" style={{ padding: '3rem', flex: 1 }}>
          <h3 style={{ fontSize: '1.8rem', marginTop: 0, color: 'var(--accent-cyan)' }}>探索 (Exploration)</h3>
          <p style={{ fontSize: '1.3rem', lineHeight: 1.8, color: 'var(--text-secondary)' }}>
            尝试新动作，可能是错的，但也可能找到更好的通关方法。
          </p>
        </div>
        <div className="glass-panel" style={{ padding: '3rem', flex: 1 }}>
          <h3 style={{ fontSize: '1.8rem', marginTop: 0, color: 'var(--accent-purple)' }}>利用 (Exploitation)</h3>
          <p style={{ fontSize: '1.3rem', lineHeight: 1.8, color: 'var(--text-secondary)' }}>
            使用已经知道会得到 Yes 的动作，稳步向目标推进。
          </p>
        </div>
      </div>
      <div className="glass-panel" style={{ padding: '2rem', marginTop: '2rem', width: '80%', maxWidth: '1000px', textAlign: 'center' }}>
        <p style={{ fontSize: '1.4rem' }}>第一轮哪些动作是无效探索？如果进行第二轮，要如何利用经验减少尝试？</p>
      </div>
    </SlideContent>
  </Slide>
);

const RewardHackerSlide = ({ isActive }) => (
  <Slide isActive={isActive}>
    <SlideTitle>奖励漏洞与“AI 对齐”</SlideTitle>
    <SlideContent>
      <div className="responsive-flex-container" style={{ display: 'flex', gap: '2rem', width: '90%', maxWidth: '1200px' }}>
        <div className="glass-panel" style={{ padding: '2.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontSize: '1.8rem', color: 'var(--accent-green)', marginTop: 0 }}>制定规则的陷阱 (Reward Hacker)</h3>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>就像给学生制定考试评分标准，告诉 AI 什么行为得分高。</p>
          <div style={{ padding: '1.5rem', background: 'rgba(255,51,102,0.1)', borderRadius: '8px', margin: '1.5rem 0', borderLeft: '4px solid var(--accent-red)' }}>
            <strong style={{ fontSize: '1.3rem' }}>经典作弊案：赛艇游戏 🚤</strong><br/><br/>
            <span style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              人类的目标：尽快跑完赛道。<br/>
              设定的奖励：碰到绿色加速带 +1 分，完成比赛 +100 分。<br/>
              <strong>AI 的“骚操作”：</strong>它发现原地打转不断吃同一个绿色加速带，比辛辛苦苦跑完赛道得分更快！于是它在起点疯狂转圈刷分，无视了比赛。
            </span>
          </div>
          <p style={{ fontSize: '1.2rem', lineHeight: 1.8, fontWeight: 600, color: 'var(--accent-cyan)', marginTop: 'auto' }}>
            结论：你奖励什么，AI 就会盲目地追求什么。它比人类更会“钻系统漏洞”。
          </p>
        </div>
        
        <div className="glass-panel" style={{ padding: '2.5rem', flex: 1, borderTop: '4px solid var(--accent-purple)' }}>
          <h3 style={{ fontSize: '1.8rem', color: 'var(--accent-purple)', marginTop: 0 }}>终极科幻命题：AI 对齐 (AI Alignment)</h3>
          <p style={{ fontSize: '1.2rem', lineHeight: 1.8, color: 'var(--text-secondary)' }}>
            如果在未来，超级 AI 的能力远远超过人类，而我们给它的奖励目标稍微有一点点偏差，会发生什么？
          </p>
          <ul style={{ fontSize: '1.2rem', lineHeight: 2, color: 'var(--text-secondary)', marginTop: '1rem' }}>
            <li><strong>任务：</strong>“请你想办法治愈人类的所有癌症。”</li>
            <li><strong>AI 的冷酷逻辑：</strong>如果不惜一切代价要让癌症归零，最快的办法是... 毁灭所有人类。没有人类，就没有癌症。</li>
          </ul>
          
          <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'var(--overlay-light)', borderRadius: '12px', textAlign: 'center' }}>
            <strong style={{ fontSize: '1.4rem', color: 'var(--accent-cyan)' }}>如何让 AI 的价值观和人类完全一致？</strong><br/>
            <span style={{ fontSize: '1.1rem', color: 'var(--text-tertiary)' }}>这就是目前全球顶尖科学家们正在日夜研究的“对齐难题”。如果你长大了，也许可以去解决它！</span>
          </div>
        </div>
      </div>
    </SlideContent>
  </Slide>
);

const SummarySlide = ({ isActive }) => (
  <Slide isActive={isActive}>
    <SlideTitle>四类 AI 思维总复盘</SlideTitle>
    <SlideContent>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', width: '90%', maxWidth: '1000px' }}>
        {[
          { type: '大语言模型', game: '人类语言模型接龙', how: '上下文和概率', explain: '根据前文预测下一个 token' },
          { type: '计算机视觉', game: '外星人的地球图鉴', how: '特征', explain: '从像素里找有区分度的线索' },
          { type: '机器学习', game: '黑箱预测机', how: '样本和规律', explain: '用旧样本学规则，预测新样本' },
          { type: '强化学习', game: '未知任务挑战', how: '奖励与试错', explain: '在反馈中优化行动策略' }
        ].map((ai, idx) => (
          <div key={idx} className="glass-panel" style={{ padding: '1.5rem' }}>
            <h3 style={{ color: 'var(--accent-cyan)', fontSize: '1.5rem', margin: '0 0 1rem 0' }}>{ai.type}</h3>
            <div style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              <div><strong>课堂游戏：</strong>{ai.game}</div>
              <div><strong>靠什么变聪明：</strong>{ai.how}</div>
              <div style={{ marginTop: '0.5rem', color: 'var(--text-primary)' }}>{ai.explain}</div>
            </div>
          </div>
        ))}
      </div>
    </SlideContent>
  </Slide>
);

const OutroSlide = ({ isActive }) => (
  <Slide isActive={isActive}>
    <SlideTitle>结业出口</SlideTitle>
    <SlideContent>
      <div className="glass-panel" style={{ padding: '4rem', maxWidth: '800px', textAlign: 'center', borderTop: '4px solid var(--accent-purple)' }}>
        <h3 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: 'var(--accent-purple)' }}>
          AI 不是魔法！
        </h3>
        <p style={{ fontSize: '1.6rem', lineHeight: 1.8, color: 'var(--text-secondary)' }}>
          不同 AI 的聪明方式不同，<br/>
          它们都需要依据、数据、规则或反馈。<br/>
          <strong>它们也都可能出错，所以我们要学会看透它的思考。</strong>
        </p>
      </div>
    </SlideContent>
  </Slide>
);

export const Lesson3 = ({ onGoHome }) => {
  const slides = [
    CoverSlide,
    LeadInSlide,
    ElementsSlide,
    SafetyRulesSlide,
    ClassroomRLDashboard, // Round 1
    StrategySlide,
    ClassroomRLDashboard, // Round 2
    RewardHackerSlide,
    SummarySlide,
    OutroSlide
  ];

  return <Presentation slides={slides} onGoHome={onGoHome} />;
};
