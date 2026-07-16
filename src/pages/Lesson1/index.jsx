import { useState } from 'react';
import { Presentation } from '../../components/Presentation';
import { Slide, SlideTitle, SlideContent } from '../../components/Slide';
import { motion } from 'framer-motion';

const CoverSlide = ({ isActive }) => (
  <Slide isActive={isActive}>
    <SlideContent className="cover-content">
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8 }} style={{ width: '88%', maxWidth: '1080px', display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 'clamp(1.5rem, 4vw, 4rem)', alignItems: 'center' }}>
        <div>
          <h3 style={{ color: 'var(--accent-cyan)', fontSize: 'clamp(1.3rem, 2.2vw, 2rem)', margin: 0 }}>第 1 课时</h3>
          <h1 style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', margin: 'clamp(0.6rem, 1.5vh, 1rem) 0', fontWeight: 800 }} className="text-gradient">人类 ChatGPT</h1>
          <p style={{ fontSize: 'clamp(1.2rem, 2.3vw, 1.8rem)', color: 'var(--text-secondary)', margin: 0 }}>语言为什么能一词一词生成？</p>
          <div style={{ marginTop: 'clamp(1rem, 2vh, 1.6rem)', color: 'var(--text-tertiary)', fontSize: 'clamp(0.85rem, 1.3vw, 1.05rem)' }}>Token · 概率预测 · 温度 · 幻觉</div>
        </div>
        <img src="/images/chatgpt_brain.png" alt="语言模型大脑示意图" className="cover-visual" />
      </motion.div>
    </SlideContent>
  </Slide>
);

const LeadInSlide = ({ isActive }) => (
  <Slide isActive={isActive}>
    <SlideTitle>聊天机器人是真的“理解”了，还是在预测？</SlideTitle>
    <SlideContent>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.65rem, 1.4vh, 1.1rem)', alignItems: 'center', width: '92%', maxWidth: '1100px' }}>
        <h3 style={{ fontSize: 'clamp(1.2rem, 1.9vw, 1.6rem)', color: 'var(--accent-cyan)', margin: 0 }}>这些工具都能流畅接话，但“说得像人”不等于“像人一样思考”</h3>
        
        <div className="responsive-flex-container" style={{ display: 'flex', gap: 'clamp(0.7rem, 1.5vw, 1.3rem)', width: '100%', justifyContent: 'center' }}>
          {/* GPT */}
          <div className="glass-panel" style={{ padding: 'clamp(0.8rem, 1.5vw, 1.25rem)', flex: 1, textAlign: 'center', borderTop: '4px solid #10a37f', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: 'clamp(52px, 4.8vw, 68px)', height: 'clamp(52px, 4.8vw, 68px)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
              <img src="/images/chatgpt_real.png" alt="GPT Logo" style={{ width: '124%', height: '124%', objectFit: 'contain', clipPath: 'inset(0 0 32% 0)', transform: 'translateY(10%) scale(1.2)' }} />
            </div>
            <h4 style={{ fontSize: 'clamp(1rem, 1.35vw, 1.18rem)', margin: 0, fontWeight: 700 }}>GPT</h4>
          </div>

          {/* Doubao */}
          <div className="glass-panel" style={{ padding: 'clamp(0.8rem, 1.5vw, 1.25rem)', flex: 1, textAlign: 'center', borderTop: '4px solid #1462ff', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: 'clamp(52px, 4.8vw, 68px)', height: 'clamp(52px, 4.8vw, 68px)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', overflow: 'hidden' }}>
              <img src="/images/doubao_logo.png" alt="豆包 Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <h4 style={{ fontSize: 'clamp(1rem, 1.35vw, 1.18rem)', margin: 0, fontWeight: 700 }}>豆包</h4>
          </div>

          {/* Qwen */}
          <div className="glass-panel" style={{ padding: 'clamp(0.8rem, 1.5vw, 1.25rem)', flex: 1, textAlign: 'center', borderTop: '4px solid #6d4aff', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: 'clamp(52px, 4.8vw, 68px)', height: 'clamp(52px, 4.8vw, 68px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <img src="/images/qwen_real.png" alt="Qwen Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
            <h4 style={{ fontSize: 'clamp(1rem, 1.35vw, 1.18rem)', margin: 0, fontWeight: 700 }}>Qwen</h4>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(0.7rem, 1.4vw, 1.2rem)', width: '100%' }}>
          <div className="glass-panel" style={{ padding: 'clamp(0.8rem, 1.4vw, 1.2rem)', borderLeft: '4px solid var(--accent-cyan)' }}>
            <strong style={{ color: 'var(--accent-cyan)' }}>人类接话：</strong>
            <span style={{ color: 'var(--text-secondary)' }}> 会结合常识、经历、语气和对方意图，先形成想表达的意思。</span>
          </div>
          <div className="glass-panel" style={{ padding: 'clamp(0.8rem, 1.4vw, 1.2rem)', borderLeft: '4px solid var(--accent-purple)' }}>
            <strong style={{ color: 'var(--accent-purple)' }}>模型接话：</strong>
            <span style={{ color: 'var(--text-secondary)' }}> 把文字拆成 Token，根据前文计算下一个 Token 的概率，再逐步生成。</span>
          </div>
        </div>
        <div className="glass-panel" style={{ padding: 'clamp(0.7rem, 1.2vw, 1rem)', width: '100%', textAlign: 'center', border: '1px dashed var(--accent-green)' }}>
          <strong style={{ color: 'var(--accent-green)' }}>本课问题链：</strong>
          <span style={{ color: 'var(--text-secondary)' }}> 它从哪里学会语言？怎样预测下一个词？为什么温度会改变回答？为什么流畅答案仍可能是错的？</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(0.7rem, 1.4vw, 1.2rem)', width: '100%' }}>
          <div style={{ padding: 'clamp(0.65rem, 1.1vw, 0.9rem)', borderRadius: '10px', background: 'rgba(34,211,238,0.07)', color: 'var(--text-secondary)' }}>
            <strong style={{ color: 'var(--accent-cyan)' }}>它为什么显得聪明？</strong> 大量语言例子让它学会了词语搭配、句式结构和常见知识表达。
          </div>
          <div style={{ padding: 'clamp(0.65rem, 1.1vw, 0.9rem)', borderRadius: '10px', background: 'rgba(251,113,133,0.07)', color: 'var(--text-secondary)' }}>
            <strong style={{ color: 'var(--accent-red)' }}>它为什么仍会出错？</strong> “下一个词很合理”只能保证语言顺畅，不能自动保证事实真实。
          </div>
        </div>
      </div>
    </SlideContent>
  </Slide>
);

const TaskBreakdownSlide = ({ isActive }) => (
  <Slide isActive={isActive}>
    <SlideTitle>聊天机器人是怎样把一句话“接”出来的？</SlideTitle>
    <SlideContent>
      <div style={{ width: '92%', maxWidth: '1160px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'clamp(0.7rem, 1.5vw, 1.4rem)' }}>
          {[
            { n: '01', title: '读取前文', color: 'var(--accent-cyan)', text: '模型先读取已经出现的 Token，把它们当作判断后文的线索。前文不同，后面的候选词也会不同。', example: '“实验室的门突然……”' },
            { n: '02', title: '计算候选概率', color: 'var(--accent-purple)', text: '模型不会只想到一个词，而是同时给“打开、响了、消失”等许多候选词打分。', example: '打开 45%｜响了 30%｜消失 15%' },
            { n: '03', title: '选中并继续', color: 'var(--accent-green)', text: '按采样规则选出一个 Token，接回原句，成为下一轮的新前文；这个过程不断重复。', example: '门突然打开 → 打开以后……' }
          ].map((item) => (
            <div key={item.n} className="glass-panel" style={{ padding: 'clamp(1rem, 1.8vw, 1.7rem)', borderTop: `4px solid ${item.color}`, minHeight: 'clamp(210px, 36vh, 285px)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <h3 style={{ color: item.color, margin: 0, fontSize: 'clamp(1.15rem, 1.8vw, 1.5rem)' }}>{item.title}</h3>
                <span style={{ color: 'var(--text-tertiary)', fontWeight: 900 }}>{item.n}</span>
              </div>
              <p style={{ fontSize: 'clamp(0.85rem, 1.3vw, 1.06rem)', lineHeight: 1.65, color: 'var(--text-secondary)', margin: 'clamp(0.6rem, 1.2vh, 1rem) 0' }}>{item.text}</p>
              <div style={{ marginTop: 'auto', padding: 'clamp(0.6rem, 1vw, 0.9rem)', background: 'var(--overlay-light)', borderRadius: '10px', fontSize: 'clamp(0.78rem, 1.15vw, 0.96rem)', color: 'var(--text-primary)' }}>{item.example}</div>
            </div>
          ))}
        </div>
        <div className="glass-panel" style={{ marginTop: 'clamp(0.8rem, 2vh, 1.4rem)', padding: 'clamp(0.8rem, 1.4vw, 1.2rem)', display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: '1rem', alignItems: 'center', borderLeft: '4px solid var(--accent-cyan)' }}>
          <strong style={{ color: 'var(--accent-cyan)' }}>课堂预测</strong>
          <span style={{ color: 'var(--text-secondary)' }}>“深夜，实验室的门突然……”你会接什么？为什么很少有人接“吃饭”？</span>
          <strong style={{ color: 'var(--text-primary)' }}>结论：前文限制了可能性，但通常不只有一个正确续写。</strong>
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
      <SlideTitle>文字进入模型后，为什么会变成 Token？</SlideTitle>
      <SlideContent>
        <div className="responsive-flex-container" style={{ display: 'flex', gap: 'clamp(0.8rem, 1.5vw, 1.4rem)', width: '92%', maxWidth: '1200px' }}>
          {/* Token Card */}
          <div className="glass-panel" style={{ padding: 'clamp(1rem, 1.8vw, 1.6rem)', flex: 0.82, borderTop: '4px solid var(--accent-cyan)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <span style={{ fontSize: '2.5rem' }}>🧩</span>
              <h3 style={{ color: 'var(--accent-cyan)', fontSize: 'clamp(1.15rem, 1.8vw, 1.55rem)', margin: 0 }}>Token（词元）：语言的拼图碎块</h3>
            </div>
            <p style={{ fontSize: 'clamp(0.82rem, 1.2vw, 1rem)', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
              大模型并不是像人类一样一下子想好整句话，它看世界时，会把所有的文字、标点拆成一块块的<strong>“拼图碎片”</strong>。
            </p>
            <div style={{ padding: 'clamp(0.8rem, 1.3vw, 1.1rem)', background: 'var(--overlay-light)', borderRadius: '12px', marginTop: 'clamp(0.6rem, 1.2vh, 1rem)', border: '1px solid var(--border-glass)' }}>
              <h4 style={{ margin: '0 0 1rem 0', color: 'var(--text-tertiary)', fontSize: '1.1rem' }}>🖱️ 鼠标划过每个拼图，看看它是怎么被大模型拆分的：</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.55rem', fontSize: 'clamp(1.1rem, 1.8vw, 1.5rem)', fontWeight: 600 }}>
                {tokens.map((t, i) => (
                  <div 
                    key={i}
                    onMouseEnter={() => setHoveredToken(i)}
                    onMouseLeave={() => setHoveredToken(null)}
                    style={{ 
                      padding: '0.55rem 0.8rem', 
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
              <div style={{ minHeight: '24px', marginTop: '0.8rem', fontSize: 'clamp(0.8rem, 1.2vw, 1rem)', color: 'var(--accent-cyan)', fontWeight: 'bold', textAlign: 'center' }}>
                {hoveredToken !== null ? tokens[hoveredToken].desc : "（把鼠标放上去看看）"}
              </div>
            </div>
          </div>
          
          {/* Attention Card */}
          <div className="glass-panel" style={{ padding: 'clamp(0.8rem, 1.3vw, 1.1rem)', flex: 1.18, borderTop: '4px solid var(--accent-purple)', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ color: 'var(--accent-purple)', fontSize: 'clamp(1.15rem, 1.8vw, 1.55rem)', margin: '0 0 0.55rem' }}>🖍️ 上下文：同一个人，为什么会预测不同动作？</h3>
            <img src="/images/attention_context.png" alt="医院和足球场两种上下文会改变模型对下一步动作的预测" className="teaching-visual" style={{ maxHeight: 'min(34vh, 255px)' }} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.55rem', marginTop: '0.55rem' }}>
              <div style={{ padding: '0.65rem', background: 'rgba(34, 211, 238, 0.1)', borderRadius: '8px', fontSize: 'clamp(0.72rem, 1vw, 0.88rem)', lineHeight: 1.45 }}><strong style={{ color: 'var(--accent-cyan)' }}>① 先看场景：</strong><span style={{ color: 'var(--text-secondary)' }}>医院会让“医生、治疗”权重变大；球场会让“足球、队友”权重变大。</span></div>
              <div style={{ padding: '0.65rem', background: 'rgba(176, 38, 255, 0.1)', borderRadius: '8px', fontSize: 'clamp(0.72rem, 1vw, 0.88rem)', lineHeight: 1.45 }}><strong style={{ color: 'var(--accent-purple)' }}>② 再看概率：</strong><span style={{ color: 'var(--text-secondary)' }}>模型像用“数学荧光笔”给线索分配权重，权重不同，下一词的概率也不同。</span></div>
            </div>
            <div style={{ marginTop: '0.55rem', padding: '0.65rem 0.8rem', borderRadius: '8px', border: '1px dashed var(--accent-green)', fontSize: 'clamp(0.74rem, 1.05vw, 0.9rem)', lineHeight: 1.45, color: 'var(--text-secondary)' }}><strong style={{ color: 'var(--accent-green)' }}>一句话结论：</strong>注意力不是“像人一样专心”，而是计算<strong>当前哪些 Token 更值得参考</strong>；上下文一变，预测就会跟着变。</div>
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
      <SlideTitle>模型为什么不是永远选择“第一名”？</SlideTitle>
      <SlideContent>
        <div className="responsive-flex-container" style={{ display: 'flex', gap: '2rem', width: '90%', maxWidth: '1200px' }}>
          {/* Probability Card */}
          <div className="glass-panel" style={{ padding: '2.5rem', flex: 1.2, borderTop: '4px solid var(--accent-cyan)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <span style={{ fontSize: '2.5rem' }}>📊</span>
              <h3 style={{ color: 'var(--accent-cyan)', fontSize: '2rem', margin: 0 }}>概率分布 — “词语的选拔赛”</h3>
            </div>
            <p style={{ fontSize: '1.3rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              大模型在猜测下一个词时，会算出很多个候选词，并给它们打上<strong>概率分（得票率）</strong>。
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

const TempCompareSlide = ({ isActive }) => {
  const [temperature, setTemperature] = useState(1);
  const baseCandidates = [
    { word: '回家', probability: 0.6, color: 'var(--accent-cyan)' },
    { word: '去书店', probability: 0.3, color: 'var(--accent-purple)' },
    { word: '登上飞船', probability: 0.1, color: 'var(--accent-green)' }
  ];
  const powered = baseCandidates.map(item => Math.pow(item.probability, 1 / temperature));
  const total = powered.reduce((sum, value) => sum + value, 0);
  const adjusted = baseCandidates.map((item, index) => ({
    ...item,
    adjusted: Math.round((powered[index] / total) * 100)
  }));
  const mode = temperature < 0.8
    ? { icon: '❄️', name: '低温：拉大差距', text: '高概率词更突出，低概率词更难被选中。' }
    : temperature > 1.2
      ? { icon: '🔥', name: '高温：压平差距', text: '原本冷门的词也获得更多被选中的机会。' }
      : { icon: '🌤️', name: '中温：保留原差距', text: '候选词大致保持模型原来的概率关系。' };

  return (
    <Slide isActive={isActive}>
      <SlideTitle>为什么温度会改变回答风格？</SlideTitle>
      <SlideContent>
        <div style={{ width: '94%', maxWidth: '1180px', display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: 'clamp(0.8rem, 1.7vw, 1.6rem)', alignItems: 'stretch' }}>
          <div className="glass-panel" style={{ padding: 'clamp(1rem, 2vw, 1.8rem)', borderTop: '4px solid var(--accent-cyan)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', gap: '1rem', marginBottom: 'clamp(0.7rem, 1.4vh, 1.2rem)' }}>
              <div>
                <div style={{ color: 'var(--text-tertiary)', fontSize: 'clamp(0.75rem, 1.1vw, 0.95rem)' }}>上下文：放学后，我决定……</div>
                <strong style={{ display: 'block', marginTop: 'clamp(0.25rem, 0.6vh, 0.5rem)', fontSize: 'clamp(1rem, 1.65vw, 1.35rem)', color: 'var(--text-primary)' }}>{mode.icon} {mode.name}</strong>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ color: 'var(--text-tertiary)', fontSize: 'clamp(0.72rem, 1vw, 0.9rem)' }}>Temperature</div>
                <div style={{ fontSize: 'clamp(1.5rem, 2.7vw, 2.4rem)', fontWeight: 900, color: temperature < 0.8 ? 'var(--accent-cyan)' : temperature > 1.2 ? 'var(--accent-purple)' : 'var(--accent-green)' }}>{temperature.toFixed(1)}</div>
              </div>
            </div>

            <input
              type="range"
              min="0.4"
              max="1.8"
              step="0.1"
              value={temperature}
              onChange={(event) => setTemperature(Number(event.target.value))}
              aria-label="调节温度"
              style={{ width: '100%', accentColor: temperature < 0.8 ? 'var(--accent-cyan)' : 'var(--accent-purple)', marginBottom: 'clamp(0.8rem, 1.8vh, 1.4rem)' }}
            />

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.55rem, 1.1vh, 0.9rem)' }}>
              {adjusted.map(item => (
                <div key={item.word} style={{ display: 'grid', gridTemplateColumns: 'clamp(68px, 8vw, 100px) 1fr clamp(40px, 4vw, 58px)', gap: 'clamp(0.45rem, 0.9vw, 0.8rem)', alignItems: 'center' }}>
                  <strong style={{ fontSize: 'clamp(0.82rem, 1.3vw, 1.05rem)' }}>{item.word}</strong>
                  <div style={{ height: 'clamp(18px, 2.6vh, 26px)', borderRadius: '999px', background: 'var(--overlay-medium)', overflow: 'hidden' }}>
                    <motion.div animate={{ width: `${item.adjusted}%` }} transition={{ duration: 0.35 }} style={{ height: '100%', borderRadius: 'inherit', background: item.color }} />
                  </div>
                  <strong style={{ textAlign: 'right', color: item.color, fontSize: 'clamp(0.82rem, 1.3vw, 1.05rem)' }}>{item.adjusted}%</strong>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 'clamp(0.8rem, 1.8vh, 1.4rem)', padding: 'clamp(0.65rem, 1.2vw, 1rem)', borderRadius: '10px', background: 'var(--overlay-light)', color: 'var(--text-secondary)', fontSize: 'clamp(0.78rem, 1.2vw, 0.98rem)', lineHeight: 1.55 }}>{mode.text}</div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.7rem, 1.4vh, 1.2rem)' }}>
            <div className="glass-panel" style={{ padding: 'clamp(0.9rem, 1.7vw, 1.5rem)', borderLeft: '4px solid var(--accent-cyan)' }}>
              <h3 style={{ margin: 0, fontSize: 'clamp(1rem, 1.65vw, 1.35rem)', color: 'var(--accent-cyan)' }}>低温为什么更稳定？</h3>
              <p style={{ margin: 'clamp(0.4rem, 0.9vh, 0.7rem) 0 0', fontSize: 'clamp(0.78rem, 1.2vw, 1rem)', lineHeight: 1.55, color: 'var(--text-secondary)' }}>它把原来的概率差距<strong>拉大</strong>：第一名更像“压倒性胜出”，模型会反复选择常见、稳妥的词。</p>
            </div>
            <div className="glass-panel" style={{ padding: 'clamp(0.9rem, 1.7vw, 1.5rem)', borderLeft: '4px solid var(--accent-purple)' }}>
              <h3 style={{ margin: 0, fontSize: 'clamp(1rem, 1.65vw, 1.35rem)', color: 'var(--accent-purple)' }}>高温为什么更有创意？</h3>
              <p style={{ margin: 'clamp(0.4rem, 0.9vh, 0.7rem) 0 0', fontSize: 'clamp(0.78rem, 1.2vw, 1rem)', lineHeight: 1.55, color: 'var(--text-secondary)' }}>它把概率差距<strong>压平</strong>：第二名、第三名也可能被抽中，所以更意外，但也更容易偏题。</p>
            </div>
            <div className="glass-panel" style={{ padding: 'clamp(0.8rem, 1.5vw, 1.25rem)', border: '1px dashed var(--accent-green)', textAlign: 'center' }}>
              <div style={{ fontSize: 'clamp(0.72rem, 1.05vw, 0.9rem)', color: 'var(--text-tertiary)' }}>给好奇同学的数学表达</div>
              <code style={{ display: 'block', margin: 'clamp(0.3rem, 0.7vh, 0.55rem) 0', color: 'var(--accent-green)', fontSize: 'clamp(0.88rem, 1.35vw, 1.1rem)' }}>新概率 ∝ 原概率^(1 ÷ T)</code>
              <div style={{ fontSize: 'clamp(0.72rem, 1.05vw, 0.9rem)', color: 'var(--text-secondary)' }}>温度不改变“候选词是谁”，主要改变“它们之间差多少”。</div>
            </div>
          </div>
        </div>
      </SlideContent>
    </Slide>
  );
};

const TemperatureUseSlide = ({ isActive }) => (
  <Slide isActive={isActive}>
    <SlideTitle>温度没有好坏，只有是否适合任务</SlideTitle>
    <SlideContent>
      <div style={{ width: '92%', maxWidth: '1120px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(0.8rem, 1.8vw, 1.6rem)' }}>
        <div className="glass-panel" style={{ padding: 'clamp(1rem, 2vw, 2rem)', borderTop: '4px solid var(--accent-cyan)' }}>
          <h3 style={{ fontSize: 'clamp(1.2rem, 2vw, 1.65rem)', margin: 0, color: 'var(--accent-cyan)' }}>❄️ 更适合低温</h3>
          <ul style={{ fontSize: 'clamp(0.86rem, 1.35vw, 1.1rem)', lineHeight: 1.75, color: 'var(--text-secondary)', margin: 'clamp(0.7rem, 1.5vh, 1.2rem) 0 0', paddingLeft: '1.4em' }}>
            <li>数学计算、知识问答、信息提取</li>
            <li>格式必须统一的表格或步骤</li>
            <li>希望多次运行结果比较一致</li>
          </ul>
          <div style={{ marginTop: 'clamp(0.6rem, 1.3vh, 1rem)', color: 'var(--text-tertiary)', fontSize: 'clamp(0.76rem, 1.15vw, 0.95rem)' }}>目标：少冒险，优先选择最有把握的表达。</div>
        </div>
        <div className="glass-panel" style={{ padding: 'clamp(1rem, 2vw, 2rem)', borderTop: '4px solid var(--accent-purple)' }}>
          <h3 style={{ fontSize: 'clamp(1.2rem, 2vw, 1.65rem)', margin: 0, color: 'var(--accent-purple)' }}>🔥 更适合高温</h3>
          <ul style={{ fontSize: 'clamp(0.86rem, 1.35vw, 1.1rem)', lineHeight: 1.75, color: 'var(--text-secondary)', margin: 'clamp(0.7rem, 1.5vh, 1.2rem) 0 0', paddingLeft: '1.4em' }}>
            <li>故事续写、广告创意、头脑风暴</li>
            <li>希望一次得到多种不同想法</li>
            <li>允许出现需要人工筛选的结果</li>
          </ul>
          <div style={{ marginTop: 'clamp(0.6rem, 1.3vh, 1rem)', color: 'var(--text-tertiary)', fontSize: 'clamp(0.76rem, 1.15vw, 0.95rem)' }}>目标：增加探索，让冷门但有趣的表达被看见。</div>
        </div>
      </div>
      <div className="glass-panel" style={{ width: '92%', maxWidth: '1120px', marginTop: 'clamp(0.8rem, 2vh, 1.5rem)', padding: 'clamp(0.8rem, 1.5vw, 1.2rem)', textAlign: 'center', borderLeft: '4px solid var(--accent-green)' }}>
        <strong style={{ color: 'var(--accent-green)', fontSize: 'clamp(0.95rem, 1.5vw, 1.2rem)' }}>重要：低温不等于更正确，高温也不等于更聪明。</strong>
        <span style={{ color: 'var(--text-secondary)', fontSize: 'clamp(0.82rem, 1.25vw, 1rem)' }}> 温度只改变采样方式；如果模型原本不知道事实，调低温度也可能自信地答错。</span>
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
      <div style={{ width: '92%', maxWidth: '1200px' }}>
        <h3 style={{ fontSize: 'clamp(1.15rem, 2vw, 1.7rem)', color: 'var(--accent-red)', margin: '0 0 clamp(0.55rem, 1.2vh, 0.9rem)', textAlign: 'center' }}>
          💡 核心警示：大模型流畅的表达 ≠ 事实正确
        </h3>
        
        <div className="responsive-flex-container" style={{ display: 'flex', gap: 'clamp(0.8rem, 1.5vw, 1.3rem)' }}>
          <figure className="glass-panel" style={{ flex: 1.08, margin: 0, padding: 'clamp(0.65rem, 1.1vw, 0.9rem)', borderTop: '4px solid var(--accent-red)', display: 'flex', flexDirection: 'column' }}>
            <img src="/images/hallucination_factcheck.png" alt="AI 给出流畅答案后，学生用资料和来源逐条核验" className="teaching-visual" style={{ maxHeight: 'min(43vh, 325px)', height: '100%' }} />
            <figcaption style={{ marginTop: '0.55rem', color: 'var(--text-secondary)', fontSize: 'clamp(0.74rem, 1.05vw, 0.9rem)', lineHeight: 1.45 }}><strong style={{ color: 'var(--accent-red)' }}>看图顺序：</strong>AI 生成答案 → 找出其中的事实主张 → 查可靠资料 → 标记“已证实 / 存疑”。流畅只是表达质量，核验才决定事实质量。</figcaption>
          </figure>
          <div style={{ flex: 0.92, display: 'grid', gap: '0.6rem' }}>
            <div className="glass-panel" style={{ padding: 'clamp(0.75rem, 1.3vw, 1.05rem)', borderLeft: '4px solid var(--accent-red)' }}><h4 style={{ fontSize: 'clamp(0.95rem, 1.45vw, 1.2rem)', color: 'var(--accent-red)', margin: '0 0 0.35rem' }}>为什么会“看起来很真”？</h4><p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: 'clamp(0.75rem, 1.1vw, 0.92rem)', lineHeight: 1.5 }}>模型的训练目标是预测<strong>最可能出现的下一个 Token</strong>。它会优先保证语言连贯，却不会自动证明句子与现实一致；不知道时，也可能拼出很像真的答案。</p></div>
            <div className="glass-panel" style={{ padding: 'clamp(0.75rem, 1.3vw, 1.05rem)', borderLeft: '4px solid var(--accent-cyan)' }}><h4 style={{ fontSize: 'clamp(0.95rem, 1.45vw, 1.2rem)', color: 'var(--accent-cyan)', margin: '0 0 0.35rem' }}>课堂可用的“三步核验法”</h4><ol style={{ margin: 0, paddingLeft: '1.15rem', color: 'var(--text-secondary)', fontSize: 'clamp(0.75rem, 1.1vw, 0.92rem)', lineHeight: 1.55 }}><li>圈出日期、数字、人名和因果结论。</li><li>至少找一个可靠来源交叉核对。</li><li>找不到出处，就写“尚未核实”，不要当事实传播。</li></ol></div>
            <div className="glass-panel" style={{ padding: 'clamp(0.75rem, 1.3vw, 1.05rem)', borderLeft: '4px solid var(--accent-green)' }}><strong style={{ color: 'var(--accent-green)', fontSize: 'clamp(0.84rem, 1.2vw, 1rem)' }}>RAG 检索增强：</strong><span style={{ color: 'var(--text-secondary)', fontSize: 'clamp(0.74rem, 1.05vw, 0.9rem)', lineHeight: 1.45 }}>先从数据库或网页取回资料，再依据资料回答，像“开卷考试”。它能降低幻觉，但资料本身仍需判断可靠性。</span></div>
          </div>
        </div>
      </div>
    </SlideContent>
  </Slide>
);

const TrainingSourceSlide = ({ isActive }) => (
  <Slide isActive={isActive}>
    <SlideTitle>它从哪里学会“接话”？</SlideTitle>
    <SlideContent>
      <div style={{ width: '92%', maxWidth: '1140px', display: 'grid', gridTemplateColumns: '1.08fr 0.92fr', gap: 'clamp(0.8rem, 1.7vw, 1.5rem)', alignItems: 'stretch' }}>
        <figure className="glass-panel" style={{ margin: 0, padding: 'clamp(0.7rem, 1.2vw, 1rem)', position: 'relative', borderTop: '4px solid var(--accent-cyan)' }}>
          <img src="/images/token_machine.png" alt="语言进入模型后被处理成 Token 的示意图" className="teaching-visual" style={{ maxHeight: 'min(43vh, 325px)', height: '100%' }} />
          <figcaption style={{ position: 'absolute', left: 'clamp(1rem, 2vw, 1.5rem)', right: 'clamp(1rem, 2vw, 1.5rem)', bottom: 'clamp(1rem, 2vh, 1.4rem)', padding: '0.65rem 0.8rem', borderRadius: '9px', background: 'rgba(9,9,11,0.78)', backdropFilter: 'blur(10px)', color: 'var(--text-secondary)', fontSize: 'clamp(0.74rem, 1.05vw, 0.9rem)' }}>训练把大量语言规律压进参数；生成时再用这些规律逐个预测 Token。</figcaption>
        </figure>
        <div style={{ display: 'grid', gridTemplateRows: 'repeat(3, 1fr)', gap: 'clamp(0.55rem, 1.1vh, 0.9rem)' }}>
          {[
            { step: '01', title: '阅读大量文本', icon: '📚', text: '书籍、网页、文章和对话提供语言例子，让模型看到哪些词常常一起出现。' },
            { step: '02', title: '反复做续写题', icon: '✍️', text: '给出前文并预测下一个 Token；猜错就调整参数，再继续练习。' },
            { step: '03', title: '压缩语言规律', icon: '🧠', text: '模型不是背下一篇文章，而是学到词语搭配、句式和表达模式。' }
          ].map((item) => (
            <div key={item.step} className="glass-panel" style={{ padding: 'clamp(0.7rem, 1.3vw, 1.05rem)', display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: '0.7rem', alignItems: 'center', borderLeft: '4px solid var(--accent-purple)' }}>
              <span style={{ fontSize: 'clamp(1.3rem, 2.1vw, 1.9rem)' }}>{item.icon}</span>
              <div><h3 style={{ fontSize: 'clamp(0.95rem, 1.4vw, 1.16rem)', margin: 0 }}>{item.title}</h3><p style={{ fontSize: 'clamp(0.72rem, 1.05vw, 0.9rem)', lineHeight: 1.45, color: 'var(--text-secondary)', margin: '0.25rem 0 0' }}>{item.text}</p></div>
              <span style={{ color: 'var(--text-tertiary)', fontWeight: 900 }}>{item.step}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="glass-panel" style={{ marginTop: 'clamp(0.8rem, 2vh, 1.5rem)', padding: 'clamp(0.8rem, 1.4vw, 1.2rem)', width: '90%', maxWidth: '1100px', textAlign: 'center', borderLeft: '4px solid var(--accent-purple)' }}>
        <span style={{ fontSize: 'clamp(0.95rem, 1.5vw, 1.2rem)' }}><strong>关键区别：</strong>训练时是在“学规律”，回答时是在“用规律预测”，不是临时把整张网页复制出来。</span>
      </div>
    </SlideContent>
  </Slide>
);

const AutoregressiveSlide = ({ isActive }) => (
  <Slide isActive={isActive}>
    <SlideTitle>一句话是怎样一步步长出来的？</SlideTitle>
    <SlideContent>
      <div style={{ width: '94%', maxWidth: '1200px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 'clamp(0.45rem, 1vw, 0.9rem)' }}>
          {[
            ['①', '读取上下文', '先看已经出现的文字'],
            ['②', '计算概率', '给候选 token 打分'],
            ['③', '进行采样', '按规则选出一个 token'],
            ['④', '拼回句子', '新 token 成为新上下文'],
            ['⑤', '继续循环', '直到遇到停止条件']
          ].map(([num, title, text], index) => (
            <div key={title} className="glass-panel" style={{ position: 'relative', padding: 'clamp(0.9rem, 1.6vw, 1.5rem)', textAlign: 'center', minHeight: 'clamp(170px, 30vh, 240px)', borderTop: `4px solid ${index < 3 ? 'var(--accent-cyan)' : 'var(--accent-purple)'}` }}>
              <div style={{ fontSize: 'clamp(1.5rem, 2.6vw, 2.4rem)', color: 'var(--accent-cyan)', fontWeight: 900 }}>{num}</div>
              <h3 style={{ fontSize: 'clamp(1rem, 1.65vw, 1.35rem)', margin: 'clamp(0.45rem, 1vh, 0.8rem) 0', color: 'var(--text-primary)' }}>{title}</h3>
              <p style={{ fontSize: 'clamp(0.78rem, 1.2vw, 1rem)', lineHeight: 1.55, color: 'var(--text-secondary)', margin: 0 }}>{text}</p>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 'clamp(1rem, 2.5vh, 2rem)', display: 'flex', justifyContent: 'center' }}>
          <div className="glass-panel" style={{ padding: 'clamp(0.8rem, 1.5vw, 1.25rem) clamp(1rem, 3vw, 2.5rem)', textAlign: 'center', border: '1px dashed var(--accent-green)' }}>
            <strong style={{ color: 'var(--accent-green)', fontSize: 'clamp(1rem, 1.7vw, 1.3rem)' }}>这个“把自己的输出再喂给自己”的循环，叫作自回归生成。</strong>
            <div style={{ marginTop: 'clamp(0.3rem, 0.7vh, 0.6rem)', color: 'var(--text-secondary)', fontSize: 'clamp(0.78rem, 1.2vw, 1rem)' }}>前面一步选错，后面的上下文也会改变，所以错误可能越滚越大。</div>
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
    TrainingSourceSlide,
    Concept1Slide,
    Concept2Slide,
    AutoregressiveSlide,
    GameRulesSlide,
    InteractiveGameSlide,
    TempCompareSlide,
    TemperatureUseSlide,
    ReviewSlide,
    HallucinationSlide,
    OutroSlide
  ];

  const stages = [
    { from: 0, label: '课程导入' },
    { from: 3, label: '原理建构' },
    { from: 7, label: '课堂实验' },
    { from: 9, label: '解释现象' },
    { from: 11, label: '总结迁移' }
  ];

  return <Presentation slides={slides} onGoHome={onGoHome} lessonLabel="第 1 课时 · 人类 ChatGPT" stages={stages} />;
};
