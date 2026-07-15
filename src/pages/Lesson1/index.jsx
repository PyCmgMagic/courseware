import { useState } from 'react';
import { Presentation } from '../../components/Presentation';
import { Slide, SlideTitle, SlideContent } from '../../components/Slide';
import { motion } from 'framer-motion';

const CoverSlide = ({ isActive }) => (
  <Slide isActive={isActive}>
    <SlideContent>
      <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ duration: 0.8 }}>
        <h3 style={{ color: 'var(--accent-cyan)', fontSize: '2rem', margin: 0, textAlign: 'center' }}>第 1 课时</h3>
        <h1 style={{ fontSize: '5rem', margin: '1rem 0', fontWeight: 800 }} className="text-gradient">
          人类 ChatGPT
        </h1>
        <p style={{ fontSize: '1.8rem', color: 'var(--text-secondary)', textAlign: 'center' }}>
          语言为什么能一词一词生成？
        </p>
      </motion.div>
    </SlideContent>
  </Slide>
);

const LeadInSlide = ({ isActive }) => (
  <Slide isActive={isActive}>
    <SlideTitle>拆开聊天机器人的“脑子”</SlideTitle>
    <SlideContent>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center', width: '90%', maxWidth: '1000px' }}>
        <h3 style={{ fontSize: '2rem', color: 'var(--accent-cyan)' }}>你用过它们吗？</h3>
        
        <div className="responsive-flex-container" style={{ display: 'flex', gap: '2rem', width: '100%', justifyContent: 'center' }}>
          {/* ChatGPT */}
          <div className="glass-panel" style={{ padding: '2rem', flex: 1, textAlign: 'center', borderTop: '4px solid #10a37f', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src="/images/chatgpt_real.png" alt="ChatGPT Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
            <h4 style={{ fontSize: '1.5rem', margin: 0, fontWeight: 700 }}>ChatGPT</h4>
          </div>

          {/* Doubao */}
          <div className="glass-panel" style={{ padding: '2rem', flex: 1, textAlign: 'center', borderTop: '4px solid #1462ff', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '24px', overflow: 'hidden' }}>
              <img src="/images/doubao_real.png" alt="豆包 Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <h4 style={{ fontSize: '1.5rem', margin: 0, fontWeight: 700 }}>豆包</h4>
          </div>

          {/* Xiaoai */}
          <div className="glass-panel" style={{ padding: '2rem', flex: 1, textAlign: 'center', borderTop: '4px solid #ff6a00', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', overflow: 'hidden' }}>
               <img src="/images/xiaoai_real.png" alt="小爱同学 Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <h4 style={{ fontSize: '1.5rem', margin: 0, fontWeight: 700 }}>小爱同学</h4>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '1.5rem 3rem', background: 'var(--overlay-light)', marginTop: '1rem', width: '100%', textAlign: 'center' }}>
          <p style={{ fontSize: '1.5rem', lineHeight: 1.8, color: 'var(--text-primary)', margin: 0 }}>
            “它为什么会接话？”<br/>
            <span style={{ color: 'var(--text-secondary)' }}>“它真的理解你的意思吗，还是只在猜下一个词？”</span>
          </p>
        </div>
      </div>
    </SlideContent>
  </Slide>
);

const TaskBreakdownSlide = ({ isActive }) => (
  <Slide isActive={isActive}>
    <SlideTitle>接话的秘密</SlideTitle>
    <SlideContent>
      <div style={{ width: '80%', maxWidth: '900px' }}>
        <div className="responsive-flex-container" style={{ display: 'flex', gap: '2rem', justifyContent: 'space-between', marginBottom: '3rem' }}>
          <div className="glass-panel" style={{ padding: '1.5rem', textAlign: 'center', flex: 1, margin: '0 1rem' }}>
            <h4 style={{ color: 'var(--accent-cyan)', margin: 0, fontSize: '1.5rem' }}>1. 看前文</h4>
          </div>
          <div className="glass-panel" style={{ padding: '1.5rem', textAlign: 'center', flex: 1, margin: '0 1rem' }}>
            <h4 style={{ color: 'var(--accent-purple)', margin: 0, fontSize: '1.5rem' }}>2. 猜下词</h4>
          </div>
          <div className="glass-panel" style={{ padding: '1.5rem', textAlign: 'center', flex: 1, margin: '0 1rem' }}>
            <h4 style={{ color: 'var(--accent-green)', margin: 0, fontSize: '1.5rem' }}>3. 接回去</h4>
          </div>
        </div>
        <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>
          <h3 style={{ fontSize: '2rem', marginBottom: '1rem' }}>深夜，实验室的门突然...</h3>
          <p style={{ fontSize: '1.5rem', color: 'var(--text-secondary)' }}>
            你脑子里第一个冒出的词是什么？为什么不是“吃饭”？是不是只有一个正确答案？
          </p>
        </div>
      </div>
    </SlideContent>
  </Slide>
);

const Concept1Slide = ({ isActive }) => {
  const tokens = [
    { word: "人工", desc: "拼图块1: 词语" },
    { word: "智能", desc: "拼图块2: 词语" },
    { word: "真", desc: "拼图块3: 单字" },
    { word: "有趣", desc: "拼图块4: 词语" },
    { word: "！", desc: "拼图块5: 标点符号" }
  ];
  const [hoveredToken, setHoveredToken] = useState(null);
  
  return (
    <Slide isActive={isActive}>
      <SlideTitle>基础概念 (1)</SlideTitle>
      <SlideContent>
        <div className="responsive-flex-container" style={{ display: 'flex', gap: '2rem', width: '90%', maxWidth: '1200px' }}>
          {/* Token Card */}
          <div className="glass-panel" style={{ padding: '2.5rem', flex: 1, borderTop: '4px solid var(--accent-cyan)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <span style={{ fontSize: '2.5rem' }}>🧩</span>
              <h3 style={{ color: 'var(--accent-cyan)', fontSize: '2rem', margin: 0 }}>Token (词元) — “语言的拼图碎块”</h3>
            </div>
            <p style={{ fontSize: '1.3rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              大模型并不是像人类一样一下子想好整句话，它看世界时，会把所有的文字、标点拆成一块块的<strong>“拼图碎片”</strong>。
            </p>
            <div style={{ padding: '1.5rem', background: 'var(--overlay-light)', borderRadius: '12px', marginTop: '1.5rem', border: '1px solid var(--border-glass)' }}>
              <h4 style={{ margin: '0 0 1rem 0', color: 'var(--text-tertiary)', fontSize: '1.1rem' }}>🖱️ 鼠标划过每个拼图，看看它是怎么被大模型拆分的：</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem', fontSize: '1.8rem', fontWeight: 600 }}>
                {tokens.map((t, i) => (
                  <div 
                    key={i}
                    onMouseEnter={() => setHoveredToken(i)}
                    onMouseLeave={() => setHoveredToken(null)}
                    style={{ 
                      padding: '0.8rem 1.2rem', 
                      borderRadius: '8px',
                      background: hoveredToken === i ? 'var(--accent-cyan)' : 'var(--overlay-medium)',
                      color: hoveredToken === i ? '#000' : 'var(--text-primary)',
                      transition: 'all 0.2s',
                      cursor: 'default',
                      border: '2px dashed var(--border-glass)',
                      transform: hoveredToken === i ? 'scale(1.08) rotate(2deg)' : 'scale(1)',
                      boxShadow: hoveredToken === i ? '0 5px 15px rgba(34, 211, 238, 0.3)' : 'none'
                    }}
                  >
                    {t.word}
                  </div>
                ))}
              </div>
              <div style={{ minHeight: '30px', marginTop: '1.5rem', fontSize: '1.2rem', color: 'var(--accent-cyan)', fontWeight: 'bold', textAlign: 'center' }}>
                {hoveredToken !== null ? tokens[hoveredToken].desc : "（把鼠标放上去看看）"}
              </div>
            </div>
          </div>
          
          {/* Attention Card */}
          <div className="glass-panel" style={{ padding: '2.5rem', flex: 1.2, borderTop: '4px solid var(--accent-purple)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <span style={{ fontSize: '2.5rem' }}>🖍️</span>
              <h3 style={{ color: 'var(--accent-purple)', fontSize: '2rem', margin: 0 }}>上下文 (Context) 与“荧光笔注意力”</h3>
            </div>
            <p style={{ fontSize: '1.3rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              前面说过的字词，就是大模型猜测后续的<strong>“线索”</strong>。
            </p>
            <div style={{ padding: '1.5rem', background: 'var(--overlay-light)', borderRadius: '12px', marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem', border: '1px solid var(--border-glass)' }}>
              <div style={{ background: 'rgba(34, 211, 238, 0.1)', borderLeft: '4px solid var(--accent-cyan)', padding: '1rem', borderRadius: '4px' }}>
                <strong style={{ color: 'var(--accent-cyan)' }}>场景 A:</strong> <span style={{ textDecoration: 'underline yellow', textDecorationThickness: '4px' }}>医院</span>里，医生... 👉 <span style={{ color: 'var(--text-tertiary)' }}>注意力集中在“医院”，更可能接“拿起手术刀”</span>
              </div>
              <div style={{ background: 'rgba(176, 38, 255, 0.1)', borderLeft: '4px solid var(--accent-purple)', padding: '1rem', borderRadius: '4px' }}>
                <strong style={{ color: 'var(--accent-purple)' }}>场景 B:</strong> <span style={{ textDecoration: 'underline orange', textDecorationThickness: '4px' }}>足球场</span>上，医生... 👉 <span style={{ color: 'var(--text-tertiary)' }}>注意力集中在“足球场”，更可能接“抱着急救箱跑进场”</span>
              </div>
            </div>
            
            {/* Deep Dive Panel */}
            <div style={{ marginTop: '1.5rem', padding: '1.2rem', background: 'var(--overlay-light)', borderRadius: '8px', border: '1px dashed var(--accent-green)' }}>
              <strong style={{ color: 'var(--accent-green)', fontSize: '1.1rem' }}>🔬 硬核拆解：注意力机制 (Attention)</strong>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', margin: '0.5rem 0 0 0', lineHeight: 1.6 }}>
                AI 在预测时会用<strong>“数学荧光笔”</strong>给上下文里的词画重点。例如输入了“苹果发布了新款手机”，AI 的手电筒会狠狠照亮<strong>“苹果”</strong>和<strong>“手机”</strong>，从而精准猜到后面是“屏幕”、“续航”，而不会接“很好吃”。这就是 Transformer 模型的灵魂！
              </p>
            </div>
          </div>
        </div>
      </SlideContent>
    </Slide>
  );
};

const Concept2Slide = ({ isActive }) => {
  const [temp, setTemp] = useState('low');
  
  const probsLow = [
    { word: '回家', prob: 85, color: 'var(--accent-cyan)' },
    { word: '去文具店', prob: 12, color: 'var(--text-tertiary)' },
    { word: '去太空旅行', prob: 3, color: 'var(--text-tertiary)' }
  ];
  
  const probsHigh = [
    { word: '回家', prob: 40, color: 'var(--accent-cyan)' },
    { word: '去文具店', prob: 35, color: 'var(--accent-purple)' },
    { word: '去太空旅行', prob: 25, color: 'var(--accent-green)' }
  ];

  const currentProbs = temp === 'low' ? probsLow : probsHigh;

  return (
    <Slide isActive={isActive}>
      <SlideTitle>基础概念 (2)</SlideTitle>
      <SlideContent>
        <div className="responsive-flex-container" style={{ display: 'flex', gap: '2rem', width: '90%', maxWidth: '1200px' }}>
          {/* Probability Card */}
          <div className="glass-panel" style={{ padding: '2.5rem', flex: 1.2, borderTop: '4px solid var(--accent-cyan)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <span style={{ fontSize: '2.5rem' }}>📊</span>
              <h3 style={{ color: 'var(--accent-cyan)', fontSize: '2rem', margin: 0 }}>概率分布 — “词语的选拔赛”</h3>
            </div>
            <p style={{ fontSize: '1.3rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              大模型在猜测下一个词时，会算出很多个可能的候选词，并且给它们打上**概率分（得票率）**。
            </p>
            
            <div style={{ background: 'var(--overlay-light)', padding: '1.5rem', borderRadius: '12px', marginTop: '1.5rem', border: '1px solid var(--border-glass)' }}>
              <div style={{ fontSize: '1.3rem', marginBottom: '1.2rem', fontWeight: 600 }}>上下文：<span style={{ color: 'var(--accent-cyan)' }}>放学后，我决定...</span></div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {currentProbs.map((p, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ width: '90px', fontSize: '1.2rem', fontWeight: 600 }}>{p.word}</span>
                    <div style={{ flex: 1, height: '24px', background: 'var(--overlay-medium)', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border-glass)' }}>
                      <motion.div 
                        initial={{ width: 0 }} 
                        animate={{ width: `${p.prob}%` }} 
                        transition={{ duration: 0.5 }}
                        style={{ height: '100%', background: p.color, borderRadius: '12px' }}
                      />
                    </div>
                    <span style={{ width: '60px', textAlign: 'right', fontWeight: 800, color: p.prob > 30 ? 'var(--text-primary)' : 'var(--text-tertiary)' }}>{p.prob}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Temperature Card */}
          <div className="glass-panel" style={{ padding: '2.5rem', flex: 1, display: 'flex', flexDirection: 'column', borderTop: '4px solid var(--accent-purple)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <span style={{ fontSize: '2.5rem' }}>🧪</span>
              <h3 style={{ color: 'var(--accent-purple)', fontSize: '2rem', margin: 0 }}>温度 (Temperature) — “脑洞调节器”</h3>
            </div>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1.5rem' }}>
              调整“温度”，就像调整大模型的**想象力旋钮**！
            </p>
            
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
              <button onClick={() => setTemp('low')} style={{ flex: 1, padding: '1rem', borderRadius: '8px', border: '2px solid var(--accent-cyan)', background: temp === 'low' ? 'rgba(34, 211, 238, 0.2)' : 'transparent', color: 'var(--text-primary)', cursor: 'pointer', transition: 'all 0.3s' }}>
                <strong style={{ fontSize: '1.2rem' }}>❄️ 低温模式 (0.2)</strong><br/>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>稳重死板、不胡说</span>
              </button>
              <button onClick={() => setTemp('high')} style={{ flex: 1, padding: '1rem', borderRadius: '8px', border: '2px solid var(--accent-purple)', background: temp === 'high' ? 'rgba(176, 38, 255, 0.2)' : 'transparent', color: 'var(--text-primary)', cursor: 'pointer', transition: 'all 0.3s' }}>
                <strong style={{ fontSize: '1.2rem' }}>🔥 高温模式 (0.9)</strong><br/>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>脑洞大开、极富创意</span>
              </button>
            </div>

            <div style={{ padding: '1rem', background: 'var(--overlay-light)', borderRadius: '8px', fontSize: '1.1rem', color: 'var(--text-secondary)', borderLeft: '4px solid var(--accent-cyan)' }}>
              {temp === 'low' ? (
                <span><strong>学霸比喻：</strong>低温下的 AI 是个严谨的考生，每次都挑最稳妥、最高分的词（“回家”）。故事很顺，但很无聊。</span>
              ) : (
                <span><strong>科幻作家比喻：</strong>高温下的 AI 敢于尝试低概率的词（“去太空旅行”）。故事可能会天马行空，但也容易胡言乱语！</span>
              )}
            </div>
            
            {/* Deep Dive Panel */}
            <div style={{ marginTop: 'auto', padding: '1.2rem', background: 'var(--overlay-light)', borderRadius: '8px', border: '1px dashed var(--text-tertiary)' }}>
              <strong style={{ color: 'var(--accent-green)', fontSize: '1.1rem' }}>🔬 硬核拆解：大模型参数 (Top-k / Top-p)</strong>
              <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', margin: '0.5rem 0 0 0', lineHeight: 1.5 }}>
                除了温度，工程师还用两种“漏斗”过滤词库：<br/>
                • <strong>Top-k</strong>：只在概率前 K 名（比如前10名）的词中挑选。<br/>
                • <strong>Top-p</strong>：把候选词按概率从大到小累加，直到加起来满 90% 为止，只在这些词里挑。
              </p>
            </div>
          </div>
        </div>
      </SlideContent>
    </Slide>
  );
};

const GameRulesSlide = ({ isActive }) => (
  <Slide isActive={isActive}>
    <SlideTitle>人类语言模型接龙</SlideTitle>
    <SlideContent>
      <div className="glass-panel" style={{ padding: '3rem', width: '80%', maxWidth: '800px', borderTop: '4px solid var(--accent-cyan)' }}>
        <h3 style={{ fontSize: '2rem', color: 'var(--accent-cyan)', marginTop: 0 }}>游戏怎么玩？</h3>
        <ol style={{ fontSize: '1.4rem', lineHeight: 2.2, color: 'var(--text-secondary)' }}>
          <li>教师给出故事的开头（比如：<strong>“有一天，一只小猫走进了...”</strong>）。</li>
          <li>每组根据这个前文（上下文），在 30 秒内讨论并提交一个你认为接下去最合适的词或短语。</li>
          <li>所有提交的词会汇总，全班进行举手投票，形成<strong>“概率分布”</strong>。</li>
          <li>我们会试验**“低温模式”**（直接选得票最高的）和**“高温模式”**（利用滚动的转盘抽奖，得票高的中奖机会大，但低票也有几率中奖）。</li>
          <li>中奖的词被缝合到前文，成为新的上下文，开始下一轮猜测！</li>
        </ol>
        <div style={{ marginTop: '2rem', padding: '1.2rem', background: 'rgba(0,240,255,0.1)', borderLeft: '4px solid var(--accent-cyan)', fontSize: '1.2rem', borderRadius: '8px' }}>
          <strong>💡 提示：</strong>候选词既要有逻辑通顺，又可以适当加入一些脑洞，看看全班会把故事引向何方！
        </div>
      </div>
    </SlideContent>
  </Slide>
);

const InteractiveGameSlide = ({ isActive }) => {
  const [context, setContext] = useState("有一天，一只小猫走进了");
  const [candidates, setCandidates] = useState([]);
  const [newWord, setNewWord] = useState('');
  const [temperature, setTemperature] = useState('low'); // 'low' or 'high'
  const [isPicking, setIsPicking] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [justPickedWord, setJustPickedWord] = useState('');

  const addCandidate = () => {
    if (!newWord.trim()) return;
    setCandidates([...candidates, { word: newWord, votes: 0 }]);
    setNewWord('');
  };

  const vote = (index, delta) => {
    if (isPicking) return;
    const newC = [...candidates];
    newC[index].votes = Math.max(0, newC[index].votes + delta);
    setCandidates(newC);
  };

  const pickNextToken = () => {
    if (candidates.length === 0 || isPicking) return;
    
    let selectedWord = "";
    let selectedIndex = 0;
    
    if (temperature === 'low') {
      let maxVotes = -1;
      candidates.forEach((c, i) => {
        if(c.votes > maxVotes) {
          maxVotes = c.votes;
          selectedWord = c.word;
          selectedIndex = i;
        }
      });
    } else {
      const totalVotes = candidates.reduce((sum, c) => sum + c.votes, 0) || candidates.length;
      let rand = Math.random() * totalVotes;
      for (let i = 0; i < candidates.length; i++) {
        let weight = candidates[i].votes > 0 ? candidates[i].votes : 1;
        if (rand <= weight) {
          selectedWord = candidates[i].word;
          selectedIndex = i;
          break;
        }
        rand -= weight;
      }
      if(!selectedWord) {
        selectedWord = candidates[0].word;
        selectedIndex = 0;
      }
    }

    setIsPicking(true);
    
    // Roulette Animation
    const spins = 15 + Math.floor(Math.random() * 10);
    let currentSpin = 0;
    
    const spinInterval = setInterval(() => {
      setHighlightedIndex(Math.floor(Math.random() * candidates.length));
      currentSpin++;
      if (currentSpin >= spins) {
        clearInterval(spinInterval);
        setHighlightedIndex(selectedIndex);
        
        // Pause briefly on the selected item, then pop it into context
        setTimeout(() => {
          setJustPickedWord(selectedWord);
          setHighlightedIndex(-1);
          setIsPicking(false);
          
          setTimeout(() => {
            setContext(prev => prev + selectedWord);
            setJustPickedWord('');
            setCandidates([]);
          }, 800); // Wait for flying animation
        }, 600);
      }
    }, 100);
  };

  return (
    <Slide isActive={isActive}>
      <SlideTitle>接龙互动面板</SlideTitle>
      <SlideContent>
        <div style={{ width: '90%', maxWidth: '1200px', display: 'flex', gap: '2rem', height: '100%' }}>
          {/* Left: Context and Settings */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="glass-panel" style={{ padding: '2rem', flex: 1, position: 'relative' }}>
              <h3 style={{ marginTop: 0, color: 'var(--text-secondary)' }}>当前上下文 (Context)</h3>
              <div style={{ fontSize: '2rem', lineHeight: 1.6, fontWeight: 600 }}>
                {context}
                {justPickedWord && (
                  <motion.span
                    initial={{ opacity: 0, scale: 2, y: 50, color: 'var(--accent-cyan)' }}
                    animate={{ opacity: 1, scale: 1, y: 0, color: 'var(--text-primary)' }}
                    transition={{ duration: 0.5, type: 'spring' }}
                    style={{ display: 'inline-block' }}
                  >
                    {justPickedWord}
                  </motion.span>
                )}
                {!justPickedWord && <span style={{ borderRight: '4px solid var(--accent-cyan)', animation: 'blink 1s infinite' }}></span>}
              </div>
            </div>
            
            <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '1.2rem', fontWeight: 600 }}>温度 (Temperature)</span>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button disabled={isPicking} onClick={() => setTemperature('low')} style={{ padding: '0.8rem 1.5rem', borderRadius: '8px', border: 'none', cursor: isPicking ? 'not-allowed' : 'pointer', fontWeight: 600, background: temperature === 'low' ? 'var(--accent-cyan)' : 'var(--overlay-medium)', color: temperature === 'low' ? '#000' : 'var(--text-primary)', opacity: isPicking ? 0.5 : 1 }}>低温 (最稳妥)</button>
                <button disabled={isPicking} onClick={() => setTemperature('high')} style={{ padding: '0.8rem 1.5rem', borderRadius: '8px', border: 'none', cursor: isPicking ? 'not-allowed' : 'pointer', fontWeight: 600, background: temperature === 'high' ? 'var(--accent-purple)' : 'var(--overlay-medium)', color: temperature === 'high' ? '#fff' : 'var(--text-primary)', opacity: isPicking ? 0.5 : 1 }}>高温 (随机/创意)</button>
              </div>
            </div>
          </div>

          {/* Right: Candidates and Voting */}
          <div className="glass-panel" style={{ flex: 1, padding: '2rem', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ marginTop: 0, color: 'var(--text-secondary)' }}>候选词与概率分布</h3>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
              <input disabled={isPicking} value={newWord} onChange={(e) => setNewWord(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addCandidate()} placeholder="输入小组候选词..." style={{ flex: 1, padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-glass)', background: 'rgba(0,0,0,0.3)', color: 'var(--text-primary)', fontSize: '1.2rem', opacity: isPicking ? 0.5 : 1 }} />
              <button disabled={isPicking} onClick={addCandidate} style={{ padding: '1rem 2rem', borderRadius: '8px', border: 'none', background: 'var(--text-primary)', color: '#000', fontWeight: 600, cursor: isPicking ? 'not-allowed' : 'pointer', opacity: isPicking ? 0.5 : 1 }}>添加</button>
            </div>
            <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {candidates.map((c, i) => {
                const total = candidates.reduce((s, x) => s + x.votes, 0) || 1;
                const percent = Math.round((c.votes / total) * 100);
                const isHighlighted = highlightedIndex === i;
                
                return (
                  <div key={i} style={{ 
                    background: isHighlighted ? 'var(--accent-cyan)' : 'var(--overlay-light)', 
                    padding: '1rem', 
                    borderRadius: '8px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '1rem', 
                    position: 'relative', 
                    overflow: 'hidden',
                    transform: isHighlighted ? 'scale(1.02)' : 'scale(1)',
                    transition: 'all 0.1s ease',
                    boxShadow: isHighlighted ? '0 0 20px rgba(34, 211, 238, 0.4)' : 'none',
                    color: isHighlighted ? '#000' : 'inherit'
                  }}>
                    {!isHighlighted && <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${percent}%`, background: 'var(--accent-cyan)', opacity: 0.2, transition: 'width 0.3s ease' }}></div>}
                    <span style={{ fontSize: '1.5rem', fontWeight: 600, width: '150px', zIndex: 1 }}>{c.word}</span>
                    <div style={{ display: 'flex', gap: '0.5rem', zIndex: 1 }}>
                      <button disabled={isPicking} onClick={() => vote(i, -1)} style={{ width: '36px', height: '36px', borderRadius: '50%', border: 'none', background: isHighlighted ? 'rgba(0,0,0,0.1)' : 'var(--overlay-heavy)', color: isHighlighted ? '#000' : 'var(--text-primary)', cursor: isPicking ? 'default' : 'pointer' }}>-</button>
                      <span style={{ fontSize: '1.5rem', width: '40px', textAlign: 'center' }}>{c.votes}</span>
                      <button disabled={isPicking} onClick={() => vote(i, 1)} style={{ width: '36px', height: '36px', borderRadius: '50%', border: 'none', background: isHighlighted ? 'rgba(0,0,0,0.1)' : 'var(--overlay-heavy)', color: isHighlighted ? '#000' : 'var(--text-primary)', cursor: isPicking ? 'default' : 'pointer' }}>+</button>
                    </div>
                    <span style={{ marginLeft: 'auto', fontSize: '1.2rem', fontWeight: 600, color: isHighlighted ? '#000' : 'var(--accent-cyan)', zIndex: 1 }}>{percent}%</span>
                  </div>
                )
              })}
            </div>
            <button disabled={candidates.length === 0 || isPicking} onClick={pickNextToken} style={{ marginTop: '2rem', padding: '1.5rem', borderRadius: '12px', border: 'none', background: 'var(--gradient-primary)', color: 'var(--text-primary)', fontSize: '1.5rem', fontWeight: 700, cursor: (candidates.length === 0 || isPicking) ? 'not-allowed' : 'pointer', opacity: (candidates.length === 0 || isPicking) ? 0.5 : 1 }}>
              {isPicking ? '采样中...' : '选出一个词 (采样)'}
            </button>
          </div>
        </div>
      </SlideContent>
    </Slide>
  );
};

const TempCompareSlide = ({ isActive }) => (
  <Slide isActive={isActive}>
    <SlideTitle>模式对比观察</SlideTitle>
    <SlideContent>
      <div className="responsive-flex-container" style={{ display: 'flex', gap: '2rem', width: '80%', maxWidth: '1000px' }}>
        <div className="glass-panel" style={{ padding: '3rem', flex: 1, borderTop: '4px solid var(--accent-cyan)' }}>
          <h3 style={{ fontSize: '2rem', marginTop: 0 }}>❄️ 低温模式</h3>
          <ul style={{ fontSize: '1.4rem', lineHeight: 1.8, color: 'var(--text-secondary)' }}>
            <li>故事特点：稳健、顺畅、常见</li>
            <li>优点：不容易跑题</li>
            <li>风险：可能平淡无奇</li>
          </ul>
        </div>
        <div className="glass-panel" style={{ padding: '3rem', flex: 1, borderTop: '4px solid var(--accent-purple)' }}>
          <h3 style={{ fontSize: '2rem', marginTop: 0 }}>🔥 高温模式</h3>
          <ul style={{ fontSize: '1.4rem', lineHeight: 1.8, color: 'var(--text-secondary)' }}>
            <li>故事特点：新奇、跳跃、发散</li>
            <li>优点：充满创意</li>
            <li>风险：可能矛盾或离题</li>
          </ul>
        </div>
      </div>
    </SlideContent>
  </Slide>
);

const ReviewSlide = ({ isActive }) => (
  <Slide isActive={isActive}>
    <SlideTitle>游戏与大模型原理对照</SlideTitle>
    <SlideContent>
      <div className="glass-panel" style={{ padding: '2rem', width: '85%', maxWidth: '1000px', borderTop: '4px solid var(--accent-cyan)' }}>
        <table style={{ width: '100%', fontSize: '1.3rem', textAlign: 'left', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--overlay-heavy)' }}>
              <th style={{ padding: '1.2rem', color: 'var(--accent-cyan)' }}>🎮 刚才的课堂接龙游戏</th>
              <th style={{ padding: '1.2rem', color: 'var(--accent-purple)' }}>💻 对应大语言模型的原理</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid var(--overlay-medium)' }}>
              <td style={{ padding: '1.2rem' }}>故事的开头（例如：“小猫走进了...”）</td>
              <td style={{ padding: '1.2rem', color: 'var(--text-secondary)' }}><strong>Prompt (提示词) & 上下文 (Context)</strong></td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--overlay-medium)' }}>
              <td style={{ padding: '1.2rem' }}>各个小组讨论并提交的候选字词</td>
              <td style={{ padding: '1.2rem', color: 'var(--text-secondary)' }}><strong>候选 Token (词元)</strong></td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--overlay-medium)' }}>
              <td style={{ padding: '1.2rem' }}>大家举手投票决定的票数比例</td>
              <td style={{ padding: '1.2rem', color: 'var(--text-secondary)' }}><strong>概率分布 (Probability Distribution)</strong></td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--overlay-medium)' }}>
              <td style={{ padding: '1.2rem' }}>按下按钮，通过概率转盘选出下一个词</td>
              <td style={{ padding: '1.2rem', color: 'var(--text-secondary)' }}><strong>采样 (Sampling) 策略</strong></td>
            </tr>
            <tr>
              <td style={{ padding: '1.2rem' }}>选中词放回句尾，继续预测下一个词</td>
              <td style={{ padding: '1.2rem', color: 'var(--text-secondary)' }}><strong>自回归生成 (Autoregressive Generation)</strong></td>
            </tr>
          </tbody>
        </table>
      </div>
    </SlideContent>
  </Slide>
);

const HallucinationSlide = ({ isActive }) => (
  <Slide isActive={isActive}>
    <SlideTitle>幻觉与核验：一本正经地胡说八道</SlideTitle>
    <SlideContent>
      <div style={{ width: '90%', maxWidth: '1200px' }}>
        <h3 style={{ fontSize: '2.2rem', color: 'var(--accent-red)', margin: '0 0 1.5rem 0', textAlign: 'center' }}>
          💡 核心警示：大模型流畅的表达 ≠ 事实正确
        </h3>
        
        <div className="responsive-flex-container" style={{ display: 'flex', gap: '2rem' }}>
          <div className="glass-panel" style={{ flex: 1.1, padding: '2rem', borderTop: '4px solid var(--accent-red)' }}>
            <h4 style={{ fontSize: '1.4rem', color: 'var(--accent-red)', marginTop: 0 }}>🚨 真实案例：“无中生有”的判例</h4>
            <div style={{ background: 'rgba(255,51,102,0.05)', padding: '1.2rem', borderRadius: '8px', borderLeft: '4px solid var(--accent-red)', marginBottom: '1rem', fontSize: '1.05rem', lineHeight: 1.6 }}>
              2023年，一位美国律师用 ChatGPT 准备法庭辩护词。ChatGPT 极其流畅专业地写出了6个非常逼真的历史判例。<br/>
              <strong>结果：</strong>法官核对发现，这6个案例<strong>完全是 AI 凭空捏造出来的</strong>！律师面临被法院重罚。
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.6, margin: 0 }}>
              <strong>为什么会发生“幻觉”？</strong><br/>
              因为大模型的本质是<strong>“概率预测接龙机”</strong>。它的唯一目标是让句子读起来顺畅，而不是“背诵事实”。当它不知道真相时，就会根据词语搭配概率，拼凑出极为逼真的假答案！
            </p>
          </div>
          
          <div className="glass-panel" style={{ flex: 0.9, padding: '2rem', borderTop: '4px solid var(--accent-cyan)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h4 style={{ fontSize: '1.4rem', color: 'var(--accent-cyan)', marginTop: 0 }}>🛡️ 我们该如何与 AI 相处？</h4>
            <div style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              • <strong>创意写作/脑洞风暴：</strong>完全信任 AI（让它尽情发挥）。<br/>
              • <strong>科学、法律、历史、作业：</strong><span style={{ color: 'var(--accent-red)', fontWeight: 'bold' }}>绝不能直接用！</span> 必须通过搜索引擎核对具体事实与出处。
            </div>
            
            {/* Deep Dive Panel */}
            <div style={{ marginTop: 'auto', padding: '1.2rem', background: 'var(--overlay-light)', borderRadius: '8px', border: '1px dashed var(--accent-green)' }}>
              <strong style={{ color: 'var(--accent-green)', fontSize: '1.1rem' }}>🔬 科学家如何修补幻觉？RAG 检索增强</strong>
              <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', margin: '0.5rem 0 0 0', lineHeight: 1.5 }}>
                为了防止 AI 瞎编，工程师会给 AI 配上一个“联网搜索引擎”或“专属数据库”。AI 在回答前先去搜一下正确文献（相当于<strong>开卷考试</strong>），看着文献来回答，这样就大大降低了胡言乱语的几率！
              </p>
            </div>
          </div>
        </div>
      </div>
    </SlideContent>
  </Slide>
);

const OutroSlide = ({ isActive }) => (
  <Slide isActive={isActive}>
    <SlideTitle>第一课总结卡</SlideTitle>
    <SlideContent>
      <div className="glass-panel" style={{ padding: '3.5rem', width: '80%', maxWidth: '850px', textAlign: 'center', borderTop: '5px solid var(--accent-cyan)', boxShadow: '0 10px 40px rgba(0, 240, 255, 0.15)' }}>
        <h3 style={{ fontSize: '2rem', marginBottom: '2.5rem', color: 'var(--text-primary)' }}>📝 请在打印记录单上写下你本节课的感悟：</h3>
        <div style={{ fontSize: '1.8rem', lineHeight: 2.2, background: 'var(--overlay-light)', padding: '2.5rem', borderRadius: '16px', border: '2px dashed var(--border-glass)', textAlign: 'left' }}>
          我觉得 ChatGPT 更像一台 <strong style={{ color: 'var(--accent-cyan)', textDecoration: 'underline', padding: '0 10px' }}>词语预测接龙机</strong> ，<br/>
          因为 <strong style={{ color: 'var(--accent-cyan)', textDecoration: 'underline', padding: '0 10px' }}>它是根据我们给的前文，去猜接下来出现概率最高或者最有趣的“拼图碎片(Token)”，再不断拼接出来的</strong>。
        </div>
        <p style={{ marginTop: '2rem', color: 'var(--text-tertiary)', fontSize: '1.2rem' }}>
          （下一节课，我们将看透 AI 是如何用“特征”和“例子”来认图、做预测的！）
        </p>
      </div>
    </SlideContent>
  </Slide>
);

export const Lesson1 = ({ onGoHome }) => {
  const slides = [
    CoverSlide,
    LeadInSlide,
    TaskBreakdownSlide,
    Concept1Slide,
    Concept2Slide,
    GameRulesSlide,
    InteractiveGameSlide,
    TempCompareSlide,
    ReviewSlide,
    HallucinationSlide,
    OutroSlide
  ];

  return <Presentation slides={slides} onGoHome={onGoHome} />;
};
