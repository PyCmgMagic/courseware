import { useState } from 'react';
import { Presentation } from '../../components/Presentation';
import { Slide, SlideTitle, SlideContent, Step } from '../../components/Slide';
import { useSlideSteps, useCurrentStep } from '../../components/useSlideSteps';
import { QuickQuiz, FlipCards } from '../../components/QuickQuiz';
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

const LeadInSlide = ({ isActive }) => {
  useSlideSteps(3);

  const tools = [
    { name: 'GPT', img: '/images/chatgpt_real.png', color: '#10a37f', imgStyle: { width: '124%', height: '124%', objectFit: 'contain', clipPath: 'inset(0 0 32% 0)', transform: 'translateY(10%) scale(1.2)' }, wrapStyle: {} },
    { name: '豆包', img: '/images/doubao_logo.png', color: '#1462ff', imgStyle: { width: '100%', height: '100%', objectFit: 'cover' }, wrapStyle: { borderRadius: '50%' } },
    { name: 'Qwen', img: '/images/qwen_real.png', color: '#6d4aff', imgStyle: { width: '100%', height: '100%', objectFit: 'contain' }, wrapStyle: {} }
  ];

  return (
    <Slide isActive={isActive}>
      <SlideTitle>聊天机器人是真的“理解”了，还是在预测？</SlideTitle>
      <SlideContent>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.45rem, 1.1vh, 0.9rem)', alignItems: 'center', width: '94%', maxWidth: '1150px' }}>
          {/* 入场：常见工具 + 核心疑问 */}
          <div className="responsive-flex-container" style={{ display: 'flex', gap: 'clamp(0.7rem, 1.5vw, 1.3rem)', width: '100%', justifyContent: 'center' }}>
            {tools.map((tool) => (
              <div key={tool.name} className="glass-panel" style={{ padding: 'clamp(0.6rem, 1.2vw, 1rem)', flex: 1, textAlign: 'center', borderTop: `4px solid ${tool.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'clamp(0.6rem, 1.2vw, 1rem)' }}>
                <div style={{ width: 'clamp(40px, 3.8vw, 54px)', height: 'clamp(40px, 3.8vw, 54px)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0, ...tool.wrapStyle }}>
                  <img src={tool.img} alt={`${tool.name} Logo`} style={tool.imgStyle} />
                </div>
                <h4 style={{ fontSize: 'clamp(0.95rem, 1.3vw, 1.15rem)', margin: 0, fontWeight: 700 }}>{tool.name}</h4>
              </div>
            ))}
          </div>

          <div style={{
            background: 'rgba(8, 136, 168, 0.05)',
            border: '1px dashed var(--accent-cyan)',
            borderRadius: '12px',
            padding: 'clamp(0.55rem, 1.2vh, 0.9rem) clamp(1rem, 2.2vw, 1.8rem)',
            textAlign: 'center',
            width: '100%'
          }}>
            <p style={{ fontSize: 'clamp(0.88rem, 1.35vw, 1.12rem)', lineHeight: 1.55, color: 'var(--text-primary)', margin: 0 }}>
              这些工具都能<strong>极其流畅地接话</strong>，但“说得像人”不等于“像人一样思考”——
              <span style={{ color: 'var(--accent-cyan)', fontWeight: 'bold' }}>它们是真的“理解”了语言，还是只在“预测”下一个词？</span>
            </p>
          </div>

          {/* 第 1 步：人类 vs 模型 */}
          <Step n={1} style={{ width: '100%' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(0.7rem, 1.5vw, 1.3rem)', width: '100%' }}>
              <div className="glass-panel" style={{ padding: 'clamp(0.7rem, 1.3vw, 1.1rem)', borderLeft: '4px solid var(--accent-cyan)', display: 'flex', flexDirection: 'column', gap: '0.35rem', justifyContent: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                  <span style={{ fontSize: '1.35rem' }}>🧠</span>
                  <h4 style={{ fontSize: 'clamp(0.95rem, 1.3vw, 1.15rem)', color: 'var(--accent-cyan)', margin: 0, fontWeight: 700 }}>人类接话：意思驱动</h4>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: 'clamp(0.78rem, 1.1vw, 0.95rem)', lineHeight: 1.5, margin: 0 }}>
                  人脑结合<strong>常识、经历、语气和对方意图</strong>，先形成想表达的“意思”，再组织语言。
                </p>
              </div>
              <div className="glass-panel" style={{ padding: 'clamp(0.7rem, 1.3vw, 1.1rem)', borderLeft: '4px solid var(--accent-purple)', display: 'flex', flexDirection: 'column', gap: '0.35rem', justifyContent: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                  <span style={{ fontSize: '1.35rem' }}>⚙️</span>
                  <h4 style={{ fontSize: 'clamp(0.95rem, 1.3vw, 1.15rem)', color: 'var(--accent-purple)', margin: 0, fontWeight: 700 }}>模型接话：概率预测</h4>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: 'clamp(0.78rem, 1.1vw, 0.95rem)', lineHeight: 1.5, margin: 0 }}>
                  模型把文字拆成<strong>拼图碎片（Token）</strong>，计算下一个最可能出现的碎片，不断接龙。
                </p>
              </div>
            </div>
          </Step>

          {/* 第 2 步：本课问题链 */}
          <Step n={2} style={{ width: '100%' }}>
            <div style={{ width: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.6rem', marginBottom: 'clamp(0.4rem, 0.9vh, 0.7rem)' }}>
                <strong style={{ color: 'var(--accent-green)', fontSize: 'clamp(0.9rem, 1.3vw, 1.1rem)' }}>🎯 本课问题链</strong>
                <span style={{ color: 'var(--text-tertiary)', fontSize: 'clamp(0.74rem, 1.05vw, 0.9rem)' }}>后面每一页右上角都会标注正在解决哪一问</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'clamp(0.55rem, 1.1vw, 0.9rem)', width: '100%' }}>
                {[
                  { q: 'Q1. 它从哪里学会语言？', a: '阅读海量文本，压缩语言规律', icon: '📚', color: 'var(--accent-cyan)' },
                  { q: 'Q2. 怎样预测下一个词？', a: 'Token 与上下文决定候选概率', icon: '🧩', color: 'var(--accent-purple)' },
                  { q: 'Q3. 为什么温度会改变回答？', a: '采样策略控制脑洞与创意', icon: '🧪', color: 'var(--accent-blue)' },
                  { q: 'Q4. 为什么流畅答案仍会错？', a: '幻觉现象与事实核验', icon: '⚠️', color: 'var(--accent-red)' }
                ].map((item) => (
                  <div key={item.q} className="glass-panel" style={{ padding: 'clamp(0.55rem, 1vw, 0.85rem)', borderTop: `3px solid ${item.color}`, display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                    <strong style={{ color: item.color, fontSize: 'clamp(0.78rem, 1.1vw, 0.95rem)' }}>{item.icon} {item.q}</strong>
                    <span style={{ color: 'var(--text-secondary)', fontSize: 'clamp(0.7rem, 0.98vw, 0.85rem)', lineHeight: 1.4 }}>{item.a}</span>
                  </div>
                ))}
              </div>
            </div>
          </Step>

          {/* 第 3 步：两条洞察 */}
          <Step n={3} style={{ width: '100%' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(0.7rem, 1.5vw, 1.3rem)', width: '100%' }}>
              <div style={{ padding: 'clamp(0.5rem, 1vw, 0.8rem) clamp(0.8rem, 1.5vw, 1.2rem)', borderRadius: '10px', background: 'rgba(8, 136, 168, 0.06)', borderLeft: '4px solid var(--accent-cyan)', display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                <strong style={{ color: 'var(--accent-cyan)', fontSize: 'clamp(0.8rem, 1.1vw, 0.98rem)', whiteSpace: 'nowrap' }}>它为什么显得聪明？</strong>
                <p style={{ color: 'var(--text-secondary)', fontSize: 'clamp(0.72rem, 1vw, 0.88rem)', margin: 0, lineHeight: 1.45 }}>大量语言规律让它学会词语搭配、句式和常见表达。</p>
              </div>
              <div style={{ padding: 'clamp(0.5rem, 1vw, 0.8rem) clamp(0.8rem, 1.5vw, 1.2rem)', borderRadius: '10px', background: 'rgba(220, 47, 76, 0.06)', borderLeft: '4px solid var(--accent-red)', display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                <strong style={{ color: 'var(--accent-red)', fontSize: 'clamp(0.8rem, 1.1vw, 0.98rem)', whiteSpace: 'nowrap' }}>它为什么仍会出错？</strong>
                <p style={{ color: 'var(--text-secondary)', fontSize: 'clamp(0.72rem, 1vw, 0.88rem)', margin: 0, lineHeight: 1.45 }}>“下一个词合理”只保证语言顺畅，不保证事实真实。</p>
              </div>
            </div>
          </Step>
        </div>
      </SlideContent>
    </Slide>
  );
};

const TaskBreakdownSlide = ({ isActive }) => {
  useSlideSteps(3);

  const items = [
    { n: '01', title: '读取前文', color: 'var(--accent-cyan)', text: '模型先读取已经出现的 Token，把它们当作判断后文的线索。', example: '“实验室的门突然……”' },
    { n: '02', title: '计算候选概率', color: 'var(--accent-purple)', text: '模型不只想到一个词，而是同时给许多候选词打分。', example: '打开 45%｜响了 30%｜消失 15%' },
    { n: '03', title: '选中并继续', color: 'var(--accent-green)', text: '按规则选出一个 Token 接回原句，成为下一轮的新前文。', example: '门突然打开 → 打开以后……' }
  ];

  const renderCard = (item) => (
    <div className="glass-panel" style={{ padding: 'clamp(1rem, 1.8vw, 1.7rem)', borderTop: `4px solid ${item.color}`, minHeight: 'clamp(210px, 36vh, 285px)', flex: 1, display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <h3 style={{ color: item.color, margin: 0, fontSize: 'clamp(1.15rem, 1.8vw, 1.5rem)' }}>{item.title}</h3>
        <span style={{ color: 'var(--text-tertiary)', fontWeight: 900 }}>{item.n}</span>
      </div>
      <p style={{ fontSize: 'clamp(0.85rem, 1.3vw, 1.06rem)', lineHeight: 1.65, color: 'var(--text-secondary)', margin: 'clamp(0.6rem, 1.2vh, 1rem) 0' }}>{item.text}</p>
      <div style={{ marginTop: 'auto', padding: 'clamp(0.6rem, 1vw, 0.9rem)', background: 'var(--overlay-light)', borderRadius: '10px', fontSize: 'clamp(0.78rem, 1.15vw, 0.96rem)', color: 'var(--text-primary)' }}>{item.example}</div>
    </div>
  );

  return (
    <Slide isActive={isActive}>
      <SlideTitle qtag="Q2 · 怎样预测下一个词">聊天机器人是怎样把一句话“接”出来的？</SlideTitle>
      <SlideContent>
        <div style={{ width: '92%', maxWidth: '1160px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'clamp(0.7rem, 1.5vw, 1.4rem)' }}>
            {items.map((item, i) => (
              i === 0
                ? <div key={item.n} style={{ display: 'flex' }}>{renderCard(item)}</div>
                : <Step key={item.n} n={i} style={{ display: 'flex' }}>{renderCard(item)}</Step>
            ))}
          </div>
          <Step n={3}>
            <div className="glass-panel" style={{ marginTop: 'clamp(0.8rem, 2vh, 1.4rem)', padding: 'clamp(0.8rem, 1.4vw, 1.2rem)', display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: '1rem', alignItems: 'center', borderLeft: '4px solid var(--accent-cyan)' }}>
              <strong style={{ color: 'var(--accent-cyan)' }}>课堂预测</strong>
              <span style={{ color: 'var(--text-secondary)' }}>“深夜，实验室的门突然……”你会接什么？为什么很少有人接“吃饭”？</span>
              <strong style={{ color: 'var(--text-primary)' }}>结论：前文限制了可能性，但通常不只有一个正确续写。</strong>
            </div>
          </Step>
        </div>
      </SlideContent>
    </Slide>
  );
};

const TrainingSourceSlide = ({ isActive }) => {
  useSlideSteps(4);

  const rows = [
    { step: '01', title: '阅读大量文本', icon: '📚', text: '书籍、网页、文章和对话提供语言例子，让模型看到哪些词常常一起出现。' },
    { step: '02', title: '反复做续写题', icon: '✍️', text: '给出前文并预测下一个 Token；猜错就调整参数，再继续练习。' },
    { step: '03', title: '压缩语言规律', icon: '🧠', text: '模型不是背下一篇文章，而是学到词语搭配、句式和表达模式。' }
  ];

  const renderRow = (item) => (
    <div className="glass-panel" style={{ padding: 'clamp(0.6rem, 1.2vw, 0.95rem)', display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: '0.7rem', alignItems: 'center', borderLeft: '4px solid var(--accent-purple)', flex: 1 }}>
      <span style={{ fontSize: 'clamp(1.2rem, 1.9vw, 1.7rem)' }}>{item.icon}</span>
      <div><h3 style={{ fontSize: 'clamp(0.9rem, 1.35vw, 1.1rem)', margin: 0 }}>{item.title}</h3><p style={{ fontSize: 'clamp(0.7rem, 1.02vw, 0.88rem)', lineHeight: 1.4, color: 'var(--text-secondary)', margin: '0.2rem 0 0' }}>{item.text}</p></div>
      <span style={{ color: 'var(--text-tertiary)', fontWeight: 900 }}>{item.step}</span>
    </div>
  );

  return (
    <Slide isActive={isActive}>
      <SlideTitle qtag="Q1 · 它从哪里学会语言">它从哪里学会“接话”？</SlideTitle>
      <SlideContent>
        <div style={{ width: '92%', maxWidth: '1140px', display: 'grid', gridTemplateColumns: '1.08fr 0.92fr', gap: 'clamp(0.8rem, 1.7vw, 1.5rem)', alignItems: 'stretch' }}>
          <figure className="glass-panel" style={{ margin: 0, padding: 'clamp(0.7rem, 1.2vw, 1rem)', position: 'relative', borderTop: '4px solid var(--accent-cyan)' }}>
            <img src="/images/token_machine.png" alt="语言进入模型后被处理成 Token 的示意图" className="teaching-visual" style={{ maxHeight: 'min(43vh, 325px)', height: '100%' }} />
            <figcaption style={{ position: 'absolute', left: 'clamp(1rem, 2vw, 1.5rem)', right: 'clamp(1rem, 2vw, 1.5rem)', bottom: 'clamp(1rem, 2vh, 1.4rem)', padding: '0.65rem 0.8rem', borderRadius: '9px', background: 'rgba(9,9,11,0.78)', backdropFilter: 'blur(10px)', color: '#d4d4d8', fontSize: 'clamp(0.74rem, 1.05vw, 0.9rem)' }}>训练把大量语言规律压进参数；生成时再用这些规律逐个预测 Token。</figcaption>
          </figure>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.5rem, 1vh, 0.85rem)' }}>
            {/* 先抛问题 */}
            <div style={{ padding: 'clamp(0.6rem, 1.2vw, 0.95rem)', borderRadius: '12px', border: '1px dashed var(--accent-cyan)', background: 'rgba(8, 136, 168, 0.05)' }}>
              <strong style={{ color: 'var(--accent-cyan)', fontSize: 'clamp(0.85rem, 1.25vw, 1.05rem)' }}>🤔 先猜一猜</strong>
              <p style={{ color: 'var(--text-secondary)', fontSize: 'clamp(0.76rem, 1.1vw, 0.94rem)', margin: '0.3rem 0 0', lineHeight: 1.5 }}>模型回答问题时，是临时上网搜出原文、再拼给你吗？先表态，再看下面三步。</p>
            </div>
            {rows.map((item, i) => (
              <Step key={item.step} n={i + 1} style={{ display: 'flex', flex: 1 }}>{renderRow(item)}</Step>
            ))}
          </div>
        </div>
        <Step n={4} style={{ width: '90%', maxWidth: '1100px' }}>
          <div className="glass-panel" style={{ marginTop: 'clamp(0.7rem, 1.8vh, 1.3rem)', padding: 'clamp(0.7rem, 1.3vw, 1.1rem)', textAlign: 'center', borderLeft: '4px solid var(--accent-purple)' }}>
            <span style={{ fontSize: 'clamp(0.92rem, 1.45vw, 1.15rem)' }}><strong>关键区别：</strong>训练时是在“学规律”，回答时是在“用规律预测”，不是临时把整张网页复制出来。</span>
          </div>
        </Step>
      </SlideContent>
    </Slide>
  );
};

const Concept1Slide = ({ isActive }) => {
  useSlideSteps(2);

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
      <SlideTitle qtag="Q2 · 怎样预测下一个词">文字进入模型后，为什么会变成 Token？</SlideTitle>
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
            <div data-no-advance style={{ padding: 'clamp(0.8rem, 1.3vw, 1.1rem)', background: 'var(--overlay-light)', borderRadius: '12px', marginTop: 'clamp(0.6rem, 1.2vh, 1rem)', border: '1px solid var(--border-glass)' }}>
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
                      color: hoveredToken === i ? 'var(--on-accent)' : 'var(--text-primary)',
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

          {/* 上下文：第 1 步先出问题，第 2 步揭示原理 */}
          <div style={{ flex: 1.18, display: 'flex', flexDirection: 'column', gap: 'clamp(0.55rem, 1.1vh, 0.9rem)' }}>
            <Step n={1} style={{ display: 'flex', flex: 1 }}>
              <div className="glass-panel" style={{ padding: 'clamp(0.8rem, 1.3vw, 1.1rem)', borderTop: '4px solid var(--accent-purple)', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <h3 style={{ color: 'var(--accent-purple)', fontSize: 'clamp(1.05rem, 1.65vw, 1.45rem)', margin: '0 0 0.55rem' }}>🖍️ 上下文：同一个人，为什么会预测不同动作？</h3>
                <img src="/images/attention_context.png" alt="医院和足球场两种上下文会改变模型对下一步动作的预测" className="teaching-visual" style={{ maxHeight: 'min(34vh, 255px)' }} />
                <div style={{ marginTop: '0.55rem', padding: 'clamp(0.6rem, 1.1vw, 0.9rem)', borderRadius: '10px', border: '1px dashed var(--accent-purple)', background: 'rgba(139, 63, 217, 0.05)' }}>
                  <strong style={{ color: 'var(--accent-purple)', fontSize: 'clamp(0.82rem, 1.2vw, 1rem)' }}>🤔 先想一想</strong>
                  <p style={{ color: 'var(--text-secondary)', fontSize: 'clamp(0.76rem, 1.1vw, 0.94rem)', margin: '0.3rem 0 0', lineHeight: 1.5 }}>同样是“医生”这个词：在<strong>医院场景</strong>和<strong>球场场景</strong>里，你猜它后面更可能接什么？为什么不一样？</p>
                </div>
              </div>
            </Step>
            <Step n={2} style={{ display: 'flex' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', flex: 1 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.55rem' }}>
                  <div style={{ padding: '0.65rem', background: 'rgba(34, 211, 238, 0.1)', borderRadius: '8px', fontSize: 'clamp(0.72rem, 1vw, 0.88rem)', lineHeight: 1.45 }}><strong style={{ color: 'var(--accent-cyan)' }}>① 先看场景：</strong><span style={{ color: 'var(--text-secondary)' }}>医院会让“医生、治疗”权重变大；球场会让“足球、队友”权重变大。</span></div>
                  <div style={{ padding: '0.65rem', background: 'rgba(176, 38, 255, 0.1)', borderRadius: '8px', fontSize: 'clamp(0.72rem, 1vw, 0.88rem)', lineHeight: 1.45 }}><strong style={{ color: 'var(--accent-purple)' }}>② 再看概率：</strong><span style={{ color: 'var(--text-secondary)' }}>模型像用“数学荧光笔”给线索分配权重，权重不同，下一词的概率也不同。</span></div>
                </div>
                <div style={{ padding: '0.65rem 0.8rem', borderRadius: '8px', border: '1px dashed var(--accent-green)', fontSize: 'clamp(0.74rem, 1.05vw, 0.9rem)', lineHeight: 1.45, color: 'var(--text-secondary)' }}><strong style={{ color: 'var(--accent-green)' }}>一句话结论：</strong>上下文一变，候选词的概率就跟着变——这就是“看前文猜后文”。</div>
              </div>
            </Step>
          </div>
        </div>
      </SlideContent>
    </Slide>
  );
};

const Concept2Slide = ({ isActive }) => {
  useSlideSteps(1);
  const [temp, setTemp] = useState('low');

  const quizOptions = [
    { text: '回家', correct: true, explain: '最日常、最顺的续写，概率约 85%。上下文越普通，第一名的优势越明显。' },
    { text: '去文具店', correct: false, explain: '合理但不那么高频，约 12%。有机会，只是比较小。' },
    { text: '去太空旅行', correct: false, explain: '几乎不接上下文，约 3%。但注意：它不是 0%！' }
  ];

  const probBars = (
    <div style={{ marginTop: 'clamp(0.7rem, 1.4vh, 1.2rem)', padding: 'clamp(0.7rem, 1.3vw, 1.1rem)', background: 'var(--overlay-light)', borderRadius: '12px', border: '1px solid var(--border-glass)' }}>
      {[
        { word: '回家', prob: 85, color: 'var(--accent-cyan)' },
        { word: '去文具店', prob: 12, color: 'var(--text-tertiary)' },
        { word: '去太空旅行', prob: 3, color: 'var(--text-tertiary)' }
      ].map((p) => (
        <div key={p.word} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.55rem' }}>
          <span style={{ width: 'clamp(84px, 8.5vw, 120px)', fontSize: 'clamp(0.8rem, 1.2vw, 1rem)', fontWeight: 600 }}>{p.word}</span>
          <div style={{ flex: 1, height: '18px', background: 'var(--overlay-medium)', borderRadius: '9px', overflow: 'hidden' }}>
            <motion.div initial={{ width: 0 }} animate={{ width: `${p.prob}%` }} transition={{ duration: 0.6 }} style={{ height: '100%', background: p.color, borderRadius: '9px' }} />
          </div>
          <span style={{ width: '48px', textAlign: 'right', fontWeight: 800, color: p.prob > 30 ? 'var(--text-primary)' : 'var(--text-tertiary)', fontSize: 'clamp(0.8rem, 1.2vw, 1rem)' }}>{p.prob}%</span>
        </div>
      ))}
      <div style={{ marginTop: '0.4rem', fontSize: 'clamp(0.76rem, 1.1vw, 0.94rem)', color: 'var(--text-secondary)' }}><strong>概率分布：</strong>不是只有一个答案，而是每个候选都有自己的可能性。</div>
    </div>
  );

  const tempBars = {
    low: [
      { word: '回家', prob: 85, color: 'var(--accent-cyan)' },
      { word: '去文具店', prob: 12, color: 'var(--text-tertiary)' },
      { word: '去太空旅行', prob: 3, color: 'var(--text-tertiary)' }
    ],
    high: [
      { word: '回家', prob: 40, color: 'var(--accent-cyan)' },
      { word: '去文具店', prob: 35, color: 'var(--accent-purple)' },
      { word: '去太空旅行', prob: 25, color: 'var(--accent-green)' }
    ]
  };

  return (
    <Slide isActive={isActive}>
      <SlideTitle qtag="Q2 · 怎样预测下一个词">模型为什么不是永远选择“第一名”？</SlideTitle>
      <SlideContent>
        <div className="responsive-flex-container" style={{ display: 'flex', gap: 'clamp(0.8rem, 1.5vw, 1.4rem)', width: '92%', maxWidth: '1200px' }}>
          {/* Probability Card：先竞猜，再揭示 */}
          <div className="glass-panel" style={{ padding: 'clamp(1rem, 1.8vw, 1.6rem)', flex: 1.1, borderTop: '4px solid var(--accent-cyan)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.8rem' }}>
              <span style={{ fontSize: '2rem' }}>📊</span>
              <h3 style={{ color: 'var(--accent-cyan)', fontSize: 'clamp(1.1rem, 1.7vw, 1.45rem)', margin: 0 }}>概率分布 — “词语的选拔赛”</h3>
            </div>
            <QuickQuiz
              question="上下文：放学后，我决定…… 哪个候选词最可能被选中？"
              options={quizOptions}
              solvedContent={probBars}
            />
          </div>

          {/* Temperature Card：第 1 步揭示 */}
          <Step n={1} style={{ flex: 1, display: 'flex' }}>
            <div className="glass-panel" style={{ padding: 'clamp(1rem, 1.8vw, 1.6rem)', display: 'flex', flexDirection: 'column', borderTop: '4px solid var(--accent-purple)', flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.8rem' }}>
                <span style={{ fontSize: '2rem' }}>🧪</span>
                <h3 style={{ color: 'var(--accent-purple)', fontSize: 'clamp(1.1rem, 1.7vw, 1.45rem)', margin: 0 }}>温度 — “脑洞调节器”</h3>
              </div>
              <p style={{ fontSize: 'clamp(0.82rem, 1.25vw, 1.02rem)', color: 'var(--text-secondary)', lineHeight: 1.5, margin: '0 0 0.8rem' }}>
                第一名概率虽高，但模型不必永远选它。点一点，看两种模式怎么改变选择：
              </p>

              <div style={{ display: 'flex', gap: '0.8rem', marginBottom: '0.8rem' }}>
                <button onClick={() => setTemp('low')} style={{ flex: 1, padding: 'clamp(0.6rem, 1.2vh, 0.85rem)', borderRadius: '8px', border: '2px solid var(--accent-cyan)', background: temp === 'low' ? 'rgba(34, 211, 238, 0.18)' : 'transparent', color: 'var(--text-primary)', cursor: 'pointer', transition: 'all 0.3s' }}>
                  <strong style={{ fontSize: 'clamp(0.88rem, 1.3vw, 1.1rem)' }}>❄️ 低温 (0.2)</strong><br />
                  <span style={{ fontSize: 'clamp(0.7rem, 1.02vw, 0.88rem)', color: 'var(--text-secondary)' }}>稳重、不胡说</span>
                </button>
                <button onClick={() => setTemp('high')} style={{ flex: 1, padding: 'clamp(0.6rem, 1.2vh, 0.85rem)', borderRadius: '8px', border: '2px solid var(--accent-purple)', background: temp === 'high' ? 'rgba(176, 38, 255, 0.18)' : 'transparent', color: 'var(--text-primary)', cursor: 'pointer', transition: 'all 0.3s' }}>
                  <strong style={{ fontSize: 'clamp(0.88rem, 1.3vw, 1.1rem)' }}>🔥 高温 (0.9)</strong><br />
                  <span style={{ fontSize: 'clamp(0.7rem, 1.02vw, 0.88rem)', color: 'var(--text-secondary)' }}>脑洞、有创意</span>
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '0.8rem' }}>
                {tempBars[temp].map((p) => (
                  <div key={p.word} style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                    <span style={{ width: 'clamp(84px, 8vw, 110px)', fontSize: 'clamp(0.78rem, 1.15vw, 0.95rem)', fontWeight: 600 }}>{p.word}</span>
                    <div style={{ flex: 1, height: '16px', background: 'var(--overlay-medium)', borderRadius: '8px', overflow: 'hidden' }}>
                      <motion.div animate={{ width: `${p.prob}%` }} transition={{ duration: 0.5 }} style={{ height: '100%', background: p.color, borderRadius: '8px' }} />
                    </div>
                    <span style={{ width: '44px', textAlign: 'right', fontWeight: 800, color: p.color, fontSize: 'clamp(0.78rem, 1.15vw, 0.95rem)' }}>{p.prob}%</span>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 'auto', padding: 'clamp(0.65rem, 1.2vw, 0.95rem)', background: 'var(--overlay-light)', borderRadius: '8px', fontSize: 'clamp(0.78rem, 1.15vw, 0.96rem)', color: 'var(--text-secondary)', borderLeft: '4px solid var(--accent-cyan)', lineHeight: 1.5 }}>
                {temp === 'low' ? (
                  <span><strong>学霸比喻：</strong>低温下的 AI 是严谨的考生，总挑最稳妥、最高分的词。故事很顺，但可能很无聊。</span>
                ) : (
                  <span><strong>科幻作家比喻：</strong>高温下的 AI 敢选低概率的词。故事天马行空，但也容易胡言乱语！</span>
                )}
              </div>
            </div>
          </Step>
        </div>
      </SlideContent>
    </Slide>
  );
};

const AutoregressiveSlide = ({ isActive }) => {
  useSlideSteps(5);

  const cards = [
    ['①', '读取上下文', '读目前已经生成的全部文字'],
    ['②', '计算概率', '给所有候选 token 打分'],
    ['③', '进行采样', '按规则选出一个 token'],
    ['④', '拼回句子', '输出变成下一轮的输入'],
    ['⑤', '继续循环', '一词一词，长成长文']
  ];

  return (
    <Slide isActive={isActive}>
      <SlideTitle qtag="Q2 · 怎样预测下一个词">一句话是怎样一步步长出来的？</SlideTitle>
      <SlideContent>
        <div style={{ width: '94%', maxWidth: '1200px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 'clamp(0.45rem, 1vw, 0.9rem)' }}>
            {cards.map(([num, title, text], index) => {
              const card = (
                <div className="glass-panel" style={{ position: 'relative', padding: 'clamp(0.9rem, 1.6vw, 1.5rem)', textAlign: 'center', minHeight: 'clamp(170px, 30vh, 240px)', borderTop: `4px solid ${index < 3 ? 'var(--accent-cyan)' : 'var(--accent-purple)'}`, flex: 1 }}>
                  <div style={{ fontSize: 'clamp(1.5rem, 2.6vw, 2.4rem)', color: 'var(--accent-cyan)', fontWeight: 900 }}>{num}</div>
                  <h3 style={{ fontSize: 'clamp(1rem, 1.65vw, 1.35rem)', margin: 'clamp(0.45rem, 1vh, 0.8rem) 0', color: 'var(--text-primary)' }}>{title}</h3>
                  <p style={{ fontSize: 'clamp(0.78rem, 1.2vw, 1rem)', lineHeight: 1.55, color: 'var(--text-secondary)', margin: 0 }}>{text}</p>
                </div>
              );
              return index === 0
                ? <div key={title} style={{ display: 'flex' }}>{card}</div>
                : <Step key={title} n={index} style={{ display: 'flex' }}>{card}</Step>;
            })}
          </div>
          <Step n={5}>
            <div style={{ marginTop: 'clamp(1rem, 2.5vh, 2rem)', display: 'flex', justifyContent: 'center' }}>
              <div className="glass-panel" style={{ padding: 'clamp(0.8rem, 1.5vw, 1.25rem) clamp(1rem, 3vw, 2.5rem)', textAlign: 'center', border: '1px dashed var(--accent-green)' }}>
                <strong style={{ color: 'var(--accent-green)', fontSize: 'clamp(1rem, 1.7vw, 1.3rem)' }}>这个“把自己的输出再喂给自己”的循环，叫作自回归生成。</strong>
                <div style={{ marginTop: 'clamp(0.3rem, 0.7vh, 0.6rem)', color: 'var(--text-secondary)', fontSize: 'clamp(0.78rem, 1.2vw, 1rem)' }}>前面一步选偏，后面的上下文跟着偏——所以错误可能越滚越大。</div>
              </div>
            </div>
          </Step>
        </div>
      </SlideContent>
    </Slide>
  );
};

const GameRulesSlide = ({ isActive }) => {
  useSlideSteps(3);

  const ruleStyle = {
    display: 'flex',
    gap: 'clamp(0.7rem, 1.3vw, 1.1rem)',
    alignItems: 'flex-start',
    fontSize: 'clamp(0.9rem, 1.4vw, 1.2rem)',
    lineHeight: 1.65,
    color: 'var(--text-secondary)',
    padding: 'clamp(0.45rem, 0.9vh, 0.75rem) 0'
  };
  const badgeStyle = (color) => ({
    flexShrink: 0,
    width: 'clamp(1.7rem, 2.6vw, 2.2rem)',
    height: 'clamp(1.7rem, 2.6vw, 2.2rem)',
    borderRadius: '50%',
    background: color,
    color: 'var(--on-accent)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 800,
    fontSize: 'clamp(0.85rem, 1.3vw, 1.05rem)',
    marginTop: '0.15rem'
  });

  const rules = [
    { n: 1, color: 'var(--accent-cyan)', text: <>教师给出故事的开头（比如：<strong>“有一天，一只小猫走进了...”</strong>）。</> },
    { n: 2, color: 'var(--accent-cyan)', text: <>每组根据这个前文（上下文），在 30 秒内讨论并提交一个你认为接下去最合适的词或短语。</> },
    { n: 3, color: 'var(--accent-purple)', text: <>所有提交的词会汇总，全班进行举手投票，形成<strong>“概率分布”</strong>。</> },
    { n: 4, color: 'var(--accent-purple)', text: <>我们会试验<strong>“低温模式”</strong>（直接选得票最高的）和<strong>“高温模式”</strong>（滚动的转盘抽奖，得票高的中奖机会大，但低票也有几率中奖）。</> },
    { n: 5, color: 'var(--accent-green)', text: <>中奖的词被缝合到前文，成为新的上下文，开始下一轮猜测！</> }
  ];

  const renderRule = (rule) => (
    <div style={ruleStyle}>
      <span style={badgeStyle(rule.color)}>{rule.n}</span>
      <span>{rule.text}</span>
    </div>
  );

  return (
    <Slide isActive={isActive}>
      <SlideTitle qtag="课堂实验 · 全班变身语言模型">人类语言模型接龙</SlideTitle>
      <SlideContent>
        <div className="glass-panel" style={{ padding: 'clamp(1.4rem, 2.6vw, 2.6rem)', width: '84%', maxWidth: '880px', borderTop: '4px solid var(--accent-cyan)' }}>
          <h3 style={{ fontSize: 'clamp(1.2rem, 2vw, 1.65rem)', color: 'var(--accent-cyan)', marginTop: 0, marginBottom: 'clamp(0.5rem, 1vh, 0.9rem)' }}>游戏怎么玩？</h3>
          {renderRule(rules[0])}
          <Step n={1}>
            {renderRule(rules[1])}
            {renderRule(rules[2])}
          </Step>
          <Step n={2}>
            {renderRule(rules[3])}
            {renderRule(rules[4])}
          </Step>
          <Step n={3}>
            <div style={{ marginTop: 'clamp(0.8rem, 1.6vh, 1.4rem)', padding: 'clamp(0.8rem, 1.4vw, 1.2rem)', background: 'rgba(8, 136, 168, 0.07)', borderLeft: '4px solid var(--accent-cyan)', fontSize: 'clamp(0.85rem, 1.3vw, 1.08rem)', borderRadius: '8px', color: 'var(--text-secondary)' }}>
              <strong style={{ color: 'var(--text-primary)' }}>💡 提示：</strong>候选词既要逻辑通顺，又可以适当加入一些脑洞，看看全班会把故事引向何方！
            </div>
          </Step>
        </div>
      </SlideContent>
    </Slide>
  );
};

const InteractiveGameSlide = ({ isActive }) => {
  const initialContext = '有一天，一只小猫走进了';
  const [context, setContext] = useState(initialContext);
  const [candidates, setCandidates] = useState([]);
  const [newWord, setNewWord] = useState('');
  const [temperature, setTemperature] = useState('low'); // 'low' or 'high'
  const [isPicking, setIsPicking] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [justPickedWord, setJustPickedWord] = useState('');
  const [roundCount, setRoundCount] = useState(0);

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
        if (c.votes > maxVotes) {
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
      if (!selectedWord) {
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
            setRoundCount(prev => prev + 1);
            setJustPickedWord('');
            setCandidates([]);
          }, 800); // Wait for flying animation
        }, 600);
      }
    }, 100);
  };

  return (
    <Slide isActive={isActive}>
      <SlideTitle qtag="课堂实验 · 全班变身语言模型">接龙互动面板</SlideTitle>
      <SlideContent>
        <div data-no-advance style={{ width: '90%', maxWidth: '1200px', display: 'flex', gap: '2rem', height: '100%', cursor: 'default' }}>
          {/* Left: Context and Settings */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="glass-panel" style={{ padding: '1.5rem', flex: 1, position: 'relative', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginBottom: '0.9rem' }}>
                <h3 style={{ margin: 0, color: 'var(--text-secondary)' }}>当前上下文 (Context)</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', flexShrink: 0 }}>
                  <span style={{ padding: '0.4rem 0.75rem', borderRadius: '999px', background: 'rgba(8, 136, 168, 0.1)', color: 'var(--accent-cyan)', fontSize: '0.88rem', fontWeight: 700, whiteSpace: 'nowrap' }}>
                    已采样 {roundCount} 轮
                  </span>
                  <button
                    disabled={isPicking}
                    onClick={() => {
                      setContext('');
                      setRoundCount(0);
                    }}
                    style={{ padding: '0.4rem 0.7rem', borderRadius: '7px', border: '1px solid var(--border-glass)', background: 'var(--overlay-light)', color: 'var(--text-secondary)', cursor: isPicking ? 'not-allowed' : 'pointer', opacity: isPicking ? 0.5 : 1 }}
                  >
                    清空
                  </button>
                  <button
                    disabled={isPicking}
                    onClick={() => {
                      setContext(initialContext);
                      setRoundCount(0);
                    }}
                    style={{ padding: '0.4rem 0.7rem', borderRadius: '7px', border: '1px solid var(--border-glass)', background: 'var(--overlay-light)', color: 'var(--text-secondary)', cursor: isPicking ? 'not-allowed' : 'pointer', opacity: isPicking ? 0.5 : 1, whiteSpace: 'nowrap' }}
                  >
                    恢复开场
                  </button>
                </div>
              </div>
              <div style={{ margin: '-0.45rem 0 0.85rem', color: 'var(--text-tertiary)', fontSize: '0.9rem' }}>可直接改写故事，再继续下一轮接龙</div>
              <div style={{ flex: 1, minHeight: 0, position: 'relative' }}>
                <textarea
                  aria-label="自定义当前上下文"
                  disabled={isPicking}
                  value={context}
                  onChange={(e) => setContext(e.target.value)}
                  placeholder="输入任意故事开头，例如：在未来的火星学校里……"
                  style={{ width: '100%', height: '100%', minHeight: '170px', resize: 'none', padding: '1rem 1.1rem 2.3rem', borderRadius: '12px', border: '1px solid var(--border-glass)', background: 'var(--overlay-light)', color: 'var(--text-primary)', fontFamily: 'var(--font-primary)', fontSize: '1.7rem', lineHeight: 1.6, fontWeight: 600, caretColor: 'var(--accent-cyan)', opacity: isPicking ? 0.62 : 1, transition: 'border-color 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease' }}
                />
                <span style={{ position: 'absolute', right: '0.9rem', bottom: '0.7rem', color: 'var(--text-tertiary)', fontSize: '0.82rem', pointerEvents: 'none' }}>
                  {context.length} 字 · 可编辑
                </span>
                {justPickedWord && (
                  <motion.span
                    initial={{ opacity: 0, scale: 1.8, y: 28 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.5, type: 'spring' }}
                    style={{ position: 'absolute', right: '1rem', bottom: '2.2rem', display: 'inline-block', padding: '0.45rem 0.8rem', borderRadius: '9px', background: 'var(--accent-cyan)', color: 'var(--on-accent)', fontSize: '1.25rem', fontWeight: 800, boxShadow: 'var(--glow-cyan)', pointerEvents: 'none' }}
                  >
                    + {justPickedWord}
                  </motion.span>
                )}
              </div>
            </div>

            <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '1.2rem', fontWeight: 600 }}>温度 (Temperature)</span>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button disabled={isPicking} onClick={() => setTemperature('low')} style={{ padding: '0.8rem 1.5rem', borderRadius: '8px', border: 'none', cursor: isPicking ? 'not-allowed' : 'pointer', fontWeight: 600, background: temperature === 'low' ? 'var(--accent-cyan)' : 'var(--overlay-medium)', color: temperature === 'low' ? 'var(--on-accent)' : 'var(--text-primary)', opacity: isPicking ? 0.5 : 1 }}>低温 (最稳妥)</button>
                <button disabled={isPicking} onClick={() => setTemperature('high')} style={{ padding: '0.8rem 1.5rem', borderRadius: '8px', border: 'none', cursor: isPicking ? 'not-allowed' : 'pointer', fontWeight: 600, background: temperature === 'high' ? 'var(--accent-purple)' : 'var(--overlay-medium)', color: temperature === 'high' ? 'var(--on-accent)' : 'var(--text-primary)', opacity: isPicking ? 0.5 : 1 }}>高温 (随机/创意)</button>
              </div>
            </div>
          </div>

          {/* Right: Candidates and Voting */}
          <div className="glass-panel" style={{ flex: 1, padding: '2rem', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ marginTop: 0, color: 'var(--text-secondary)' }}>候选词与概率分布</h3>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
              <input disabled={isPicking} value={newWord} onChange={(e) => setNewWord(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addCandidate()} placeholder="输入小组候选词..." style={{ flex: 1, padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-glass)', background: 'var(--overlay-light)', color: 'var(--text-primary)', fontSize: '1.2rem', opacity: isPicking ? 0.5 : 1 }} />
              <button disabled={isPicking} onClick={addCandidate} style={{ padding: '1rem 2rem', borderRadius: '8px', border: 'none', background: 'var(--accent-cyan)', color: 'var(--on-accent)', fontWeight: 600, cursor: isPicking ? 'not-allowed' : 'pointer', opacity: isPicking ? 0.5 : 1 }}>添加</button>
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
                    color: isHighlighted ? 'var(--on-accent)' : 'inherit'
                  }}>
                    {!isHighlighted && <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${percent}%`, background: 'var(--accent-cyan)', opacity: 0.2, transition: 'width 0.3s ease' }}></div>}
                    <span style={{ fontSize: '1.5rem', fontWeight: 600, width: '150px', zIndex: 1 }}>{c.word}</span>
                    <div style={{ display: 'flex', gap: '0.5rem', zIndex: 1 }}>
                      <button disabled={isPicking} onClick={() => vote(i, -1)} style={{ width: '36px', height: '36px', borderRadius: '50%', border: 'none', background: isHighlighted ? 'rgba(0,0,0,0.1)' : 'var(--overlay-heavy)', color: isHighlighted ? 'var(--on-accent)' : 'var(--text-primary)', cursor: isPicking ? 'default' : 'pointer' }}>-</button>
                      <span style={{ fontSize: '1.5rem', width: '40px', textAlign: 'center' }}>{c.votes}</span>
                      <button disabled={isPicking} onClick={() => vote(i, 1)} style={{ width: '36px', height: '36px', borderRadius: '50%', border: 'none', background: isHighlighted ? 'rgba(0,0,0,0.1)' : 'var(--overlay-heavy)', color: isHighlighted ? 'var(--on-accent)' : 'var(--text-primary)', cursor: isPicking ? 'default' : 'pointer' }}>+</button>
                    </div>
                    <span style={{ marginLeft: 'auto', fontSize: '1.2rem', fontWeight: 600, color: isHighlighted ? 'var(--on-accent)' : 'var(--accent-cyan)', zIndex: 1 }}>{percent}%</span>
                  </div>
                )
              })}
            </div>
            <button disabled={candidates.length === 0 || isPicking} onClick={pickNextToken} style={{ marginTop: '2rem', padding: '1.5rem', borderRadius: '12px', border: 'none', background: 'var(--accent-cyan)', color: 'var(--on-accent)', fontSize: '1.5rem', fontWeight: 700, cursor: (candidates.length === 0 || isPicking) ? 'not-allowed' : 'pointer', opacity: (candidates.length === 0 || isPicking) ? 0.5 : 1 }}>
              {isPicking ? '采样中...' : '选出一个词 (采样)'}
            </button>
          </div>
        </div>
      </SlideContent>
    </Slide>
  );
};

const TempCompareSlide = ({ isActive }) => {
  useSlideSteps(2);
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
      <SlideTitle qtag="Q3 · 为什么温度会改变回答">为什么温度会改变回答风格？</SlideTitle>
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
            <div className="glass-panel" style={{ padding: 'clamp(0.9rem, 1.7vw, 1.5rem)', borderLeft: '4px solid var(--accent-cyan)', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h3 style={{ margin: 0, fontSize: 'clamp(1rem, 1.65vw, 1.35rem)', color: 'var(--accent-cyan)' }}>低温为什么更稳定？</h3>
              <p style={{ margin: 'clamp(0.4rem, 0.9vh, 0.7rem) 0 0', fontSize: 'clamp(0.78rem, 1.2vw, 1rem)', lineHeight: 1.55, color: 'var(--text-secondary)' }}>它把原来的概率差距<strong>拉大</strong>：第一名更像“压倒性胜出”，模型会反复选择常见、稳妥的词。</p>
            </div>
            <Step n={1} style={{ flex: 1, display: 'flex' }}>
              <div className="glass-panel" style={{ padding: 'clamp(0.9rem, 1.7vw, 1.5rem)', borderLeft: '4px solid var(--accent-purple)', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <h3 style={{ margin: 0, fontSize: 'clamp(1rem, 1.65vw, 1.35rem)', color: 'var(--accent-purple)' }}>高温为什么更有创意？</h3>
                <p style={{ margin: 'clamp(0.4rem, 0.9vh, 0.7rem) 0 0', fontSize: 'clamp(0.78rem, 1.2vw, 1rem)', lineHeight: 1.55, color: 'var(--text-secondary)' }}>它把概率差距<strong>压平</strong>：第二名、第三名也可能被抽中，所以更意外，但也更容易偏题。</p>
              </div>
            </Step>
            <Step n={2} style={{ display: 'flex' }}>
              <div className="glass-panel" style={{ padding: 'clamp(0.8rem, 1.5vw, 1.25rem)', border: '1px dashed var(--accent-green)', flex: 1 }}>
                <strong style={{ color: 'var(--accent-green)', fontSize: 'clamp(0.85rem, 1.3vw, 1.05rem)' }}>🔬 进阶拆解（留给好奇的同学）</strong>
                <code style={{ display: 'block', margin: 'clamp(0.35rem, 0.8vh, 0.6rem) 0', color: 'var(--accent-green)', fontSize: 'clamp(0.85rem, 1.3vw, 1.08rem)' }}>新概率 ∝ 原概率^(1 ÷ T)</code>
                <div style={{ fontSize: 'clamp(0.74rem, 1.08vw, 0.92rem)', color: 'var(--text-secondary)', lineHeight: 1.55, textAlign: 'left' }}>
                  工程师还用两种“漏斗”过滤候选词：<br />
                  • <strong>Top-k</strong>：只在概率前 K 名的词里挑。<br />
                  • <strong>Top-p</strong>：按概率从大到小累加到 90%，只在这些词里挑。
                </div>
              </div>
            </Step>
          </div>
        </div>
      </SlideContent>
    </Slide>
  );
};

const TemperatureUseSlide = ({ isActive }) => {
  useSlideSteps(1);

  const cards = [
    { front: '🔢 写数学计算步骤', back: '❄️ 低温', explain: '要的是唯一、稳妥、不自由发挥的答案', color: 'var(--accent-cyan)' },
    { front: '📖 续写童话故事', back: '🔥 高温', explain: '要的是想象力和意想不到的情节', color: 'var(--accent-purple)' },
    { front: '📄 从文章提取关键信息', back: '❄️ 低温', explain: '格式统一、忠于原文，越少发挥越好', color: 'var(--accent-cyan)' },
    { front: '💡 头脑风暴广告创意', back: '🔥 高温', explain: '要多种多样、打破常规的点子', color: 'var(--accent-purple)' }
  ];

  return (
    <Slide isActive={isActive}>
      <SlideTitle qtag="Q3 · 为什么温度会改变回答">温度没有好坏，只有是否适合任务</SlideTitle>
      <SlideContent>
        <div style={{ width: '92%', maxWidth: '1120px' }}>
          <p style={{ margin: '0 0 clamp(0.7rem, 1.5vh, 1.2rem)', fontSize: 'clamp(0.95rem, 1.5vw, 1.2rem)', color: 'var(--text-secondary)', textAlign: 'center' }}>
            🙋 <strong style={{ color: 'var(--text-primary)' }}>快问快答：</strong>下面 4 个任务，分别适合低温还是高温？小组先判断，老师点击翻面核对。
          </p>
          <FlipCards cards={cards} columns={2} />
        </div>
        <Step n={1} style={{ width: '92%', maxWidth: '1120px' }}>
          <div className="glass-panel" style={{ marginTop: 'clamp(0.8rem, 2vh, 1.5rem)', padding: 'clamp(0.8rem, 1.5vw, 1.2rem)', textAlign: 'center', borderLeft: '4px solid var(--accent-green)' }}>
            <strong style={{ color: 'var(--accent-green)', fontSize: 'clamp(0.95rem, 1.5vw, 1.2rem)' }}>重要：低温不等于更正确，高温也不等于更聪明。</strong>
            <span style={{ color: 'var(--text-secondary)', fontSize: 'clamp(0.82rem, 1.25vw, 1rem)' }}> 温度只改变采样方式；如果模型原本不知道事实，调低温度也可能自信地答错。</span>
          </div>
        </Step>
      </SlideContent>
    </Slide>
  );
};

const ReviewSlide = ({ isActive }) => {
  useSlideSteps(4);
  const step = useCurrentStep();

  // 第一行作为示例直接给出；其余四行两两一组：先出“游戏动作”，再揭示“原理”
  const rows = [
    { game: '故事的开头（例如：“小猫走进了...”）', principle: 'Prompt (提示词) & 上下文 (Context)', leftAt: 0, rightAt: 0 },
    { game: '各个小组讨论并提交的候选字词', principle: '候选 Token (词元)', leftAt: 1, rightAt: 2 },
    { game: '大家举手投票决定的票数比例', principle: '概率分布 (Probability Distribution)', leftAt: 1, rightAt: 2 },
    { game: '按下按钮，通过概率转盘选出下一个词', principle: '采样 (Sampling) 策略', leftAt: 3, rightAt: 4 },
    { game: '选中词放回句尾，继续预测下一个词', principle: '自回归生成 (Autoregressive Generation)', leftAt: 3, rightAt: 4 }
  ];

  const cellStyle = (at, isAnswer) => ({
    padding: 'clamp(0.7rem, 1.2vw, 1.2rem)',
    visibility: step >= at ? 'visible' : 'hidden',
    opacity: step >= at ? 1 : 0,
    transition: 'opacity 0.4s ease',
    color: isAnswer ? 'var(--text-secondary)' : 'var(--text-primary)'
  });

  return (
    <Slide isActive={isActive}>
      <SlideTitle qtag="课程复盘 · 你能对应几个">游戏与大模型原理对照</SlideTitle>
      <SlideContent>
        <div className="glass-panel" style={{ padding: 'clamp(1.2rem, 2vw, 2rem)', width: '85%', maxWidth: '1000px', borderTop: '4px solid var(--accent-cyan)' }}>
          <p style={{ margin: '0 0 clamp(0.5rem, 1vh, 0.9rem)', fontSize: 'clamp(0.85rem, 1.3vw, 1.05rem)', color: 'var(--text-secondary)' }}>
            🙋 左边每出现一条游戏动作，先抢答：它对应大模型的哪个原理？
          </p>
          <table style={{ width: '100%', fontSize: 'clamp(0.9rem, 1.4vw, 1.25rem)', textAlign: 'left', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--overlay-heavy)' }}>
                <th style={{ padding: 'clamp(0.7rem, 1.2vw, 1.2rem)', color: 'var(--accent-cyan)' }}>🎮 刚才的课堂接龙游戏</th>
                <th style={{ padding: 'clamp(0.7rem, 1.2vw, 1.2rem)', color: 'var(--accent-purple)' }}>💻 对应大语言模型的原理</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={row.game} style={{ borderBottom: i < rows.length - 1 ? '1px solid var(--overlay-medium)' : 'none' }}>
                  <td style={cellStyle(row.leftAt, false)}>{row.game}</td>
                  <td style={cellStyle(row.rightAt, true)}><strong>{row.principle}</strong></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SlideContent>
    </Slide>
  );
};

const HallucinationSlide = ({ isActive }) => {
  useSlideSteps(3);

  const quizOptions = [
    { text: '“写一个童话故事。”', correct: false, explain: '创作类看效果——故事没有标准事实，谈不上“错”。' },
    { text: '“解释什么是 token。”', correct: false, explain: '概念类相对稳定，风险较低；但重要场合仍建议核对来源。' },
    { text: '“列出某历史人物在某年做过的三件事。”', correct: true, explain: '事实类！具体人名、年份、事件最容易被一本正经地编造，必须查可靠来源。' }
  ];

  return (
    <Slide isActive={isActive}>
      <SlideTitle qtag="Q4 · 为什么流畅答案仍会错">幻觉与核验：一本正经地胡说八道</SlideTitle>
      <SlideContent>
        <div style={{ width: '92%', maxWidth: '1200px' }}>
          <QuickQuiz
            question="下面三类 AI 回答，哪一类最需要核验？先表态，再看揭示。"
            options={quizOptions}
            columns={3}
            solvedContent={
              <div style={{ marginTop: 'clamp(0.5rem, 1.1vh, 0.85rem)', padding: 'clamp(0.55rem, 1.1vw, 0.9rem)', borderRadius: '10px', background: 'rgba(220, 47, 76, 0.07)', borderLeft: '4px solid var(--accent-red)', fontSize: 'clamp(0.85rem, 1.3vw, 1.08rem)', color: 'var(--text-primary)' }}>
                <strong style={{ color: 'var(--accent-red)' }}>💡 核心警示：流畅的表达 ≠ 事实正确。</strong> 创作类可以看效果，事实类必须看来源。
              </div>
            }
          />

          <div className="responsive-flex-container" style={{ display: 'flex', gap: 'clamp(0.8rem, 1.5vw, 1.3rem)', marginTop: 'clamp(0.6rem, 1.3vh, 1rem)' }}>
            <figure className="glass-panel" style={{ flex: 1.08, margin: 0, padding: 'clamp(0.65rem, 1.1vw, 0.9rem)', borderTop: '4px solid var(--accent-red)', display: 'flex', flexDirection: 'column' }}>
              <img src="/images/hallucination_factcheck.png" alt="AI 给出流畅答案后，学生用资料和来源逐条核验" className="teaching-visual" style={{ maxHeight: 'min(36vh, 280px)', height: '100%' }} />
              <figcaption style={{ marginTop: '0.55rem', color: 'var(--text-secondary)', fontSize: 'clamp(0.74rem, 1.05vw, 0.9rem)', lineHeight: 1.45 }}><strong style={{ color: 'var(--accent-red)' }}>看图顺序：</strong>AI 生成答案 → 找出其中的事实主张 → 查可靠资料 → 标记“已证实 / 存疑”。流畅只是表达质量，核验才决定事实质量。</figcaption>
            </figure>
            <div style={{ flex: 0.92, display: 'grid', gap: '0.6rem' }}>
              <Step n={1} style={{ display: 'flex' }}>
                <div className="glass-panel" style={{ padding: 'clamp(0.75rem, 1.3vw, 1.05rem)', borderLeft: '4px solid var(--accent-red)', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <h4 style={{ fontSize: 'clamp(0.95rem, 1.45vw, 1.2rem)', color: 'var(--accent-red)', margin: '0 0 0.35rem' }}>为什么会“看起来很真”？</h4>
                  <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: 'clamp(0.75rem, 1.1vw, 0.92rem)', lineHeight: 1.5 }}>模型的目标是预测<strong>最可能出现的下一个 Token</strong>。它优先保证语言连贯，却不会自动证明句子与现实一致。</p>
                </div>
              </Step>
              <Step n={2} style={{ display: 'flex' }}>
                <div className="glass-panel" style={{ padding: 'clamp(0.75rem, 1.3vw, 1.05rem)', borderLeft: '4px solid var(--accent-cyan)', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <h4 style={{ fontSize: 'clamp(0.95rem, 1.45vw, 1.2rem)', color: 'var(--accent-cyan)', margin: '0 0 0.35rem' }}>课堂可用的“三步核验法”</h4>
                  <ol style={{ margin: 0, paddingLeft: '1.15rem', color: 'var(--text-secondary)', fontSize: 'clamp(0.75rem, 1.1vw, 0.92rem)', lineHeight: 1.55 }}><li>圈出日期、数字、人名和因果结论。</li><li>至少找一个可靠来源交叉核对。</li><li>找不到出处，就写“尚未核实”，不要当事实传播。</li></ol>
                </div>
              </Step>
              <Step n={3} style={{ display: 'flex' }}>
                <div className="glass-panel" style={{ padding: 'clamp(0.75rem, 1.3vw, 1.05rem)', borderLeft: '4px solid var(--accent-green)', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <strong style={{ color: 'var(--accent-green)', fontSize: 'clamp(0.84rem, 1.2vw, 1rem)' }}>RAG 检索增强：</strong>
                  <span style={{ color: 'var(--text-secondary)', fontSize: 'clamp(0.74rem, 1.05vw, 0.9rem)', lineHeight: 1.45 }}>先从数据库或网页取回资料，再依据资料回答，像“开卷考试”。它能降低幻觉，但资料本身仍需判断可靠性。</span>
                </div>
              </Step>
            </div>
          </div>
        </div>
      </SlideContent>
    </Slide>
  );
};

const OutroSlide = ({ isActive }) => {
  useSlideSteps(2);
  const step = useCurrentStep();

  const answerStyle = {
    visibility: step >= 1 ? 'visible' : 'hidden',
    opacity: step >= 1 ? 1 : 0,
    transition: 'opacity 0.5s ease'
  };

  return (
    <Slide isActive={isActive}>
      <SlideTitle qtag="出口小结">第一课总结卡</SlideTitle>
      <SlideContent>
        <div className="glass-panel" style={{ padding: 'clamp(1.6rem, 3vw, 3rem)', width: '80%', maxWidth: '850px', textAlign: 'center', borderTop: '5px solid var(--accent-cyan)', boxShadow: '0 10px 40px rgba(0, 240, 255, 0.15)' }}>
          <h3 style={{ fontSize: 'clamp(1.2rem, 2vw, 1.65rem)', marginBottom: 'clamp(1rem, 2.5vh, 2rem)', color: 'var(--text-primary)' }}>📝 请在打印记录单上写下你本节课的感悟：</h3>
          <div style={{ fontSize: 'clamp(1.05rem, 1.8vw, 1.5rem)', lineHeight: 2.1, background: 'var(--overlay-light)', padding: 'clamp(1.2rem, 2.5vw, 2.2rem)', borderRadius: '16px', border: '2px dashed var(--border-glass)', textAlign: 'left' }}>
            我觉得 ChatGPT 更像一台
            <strong style={{ color: 'var(--accent-cyan)', textDecoration: 'underline', padding: '0 10px', ...answerStyle }}>词语预测接龙机</strong>
            ，<br />
            因为
            <strong style={{ color: 'var(--accent-cyan)', textDecoration: 'underline', padding: '0 10px', ...answerStyle }}>它是根据我们给的前文，去猜接下来出现概率最高或者最有趣的“拼图碎片(Token)”，再不断拼接出来的</strong>
            。
          </div>
          <Step n={2}>
            <p style={{ marginTop: 'clamp(0.9rem, 2vh, 1.6rem)', marginBottom: 0, color: 'var(--text-tertiary)', fontSize: 'clamp(0.85rem, 1.3vw, 1.1rem)' }}>
              （下一节课，我们将看透 AI 是如何用“特征”和“例子”来认图、做预测的！）
            </p>
          </Step>
        </div>
      </SlideContent>
    </Slide>
  );
};

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
