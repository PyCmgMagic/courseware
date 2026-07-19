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
          <h3 style={{ color: 'var(--accent-purple)', fontSize: 'clamp(1.3rem, 2.2vw, 2rem)', margin: 0 }}>第 2 课时</h3>
          <h1 style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', margin: 'clamp(0.6rem, 1.5vh, 1rem) 0', fontWeight: 800 }} className="text-gradient">从看图到预测</h1>
          <p style={{ fontSize: 'clamp(1.2rem, 2.3vw, 1.8rem)', color: 'var(--text-secondary)', margin: 0 }}>AI 如何用特征和样本学规律？</p>
          <div style={{ marginTop: 'clamp(1rem, 2vh, 1.6rem)', color: 'var(--text-tertiary)', fontSize: 'clamp(0.85rem, 1.3vw, 1.05rem)' }}>像素 · 特征 · 样本 · 泛化</div>
        </div>
        <img src="/images/digital_cat.png" alt="计算机视觉识别猫的示意图" className="cover-visual" />
      </motion.div>
    </SlideContent>
  </Slide>
);

const LeadInSlide = ({ isActive }) => {
  useSlideSteps(2);

  return (
    <Slide isActive={isActive}>
      <SlideTitle>手机相册为什么能搜出“猫”？</SlideTitle>
      <SlideContent>
        <div style={{ width: '92%', maxWidth: '1160px' }}>
          <div className="responsive-flex-container" style={{ display: 'flex', gap: 'clamp(1.2rem, 3vw, 3rem)', alignItems: 'center' }}>
            <div className="glass-panel" style={{ padding: 'clamp(1.2rem, 2.5vw, 2.4rem)', flex: 1.2 }}>
              <h3 style={{ fontSize: 'clamp(1.35rem, 2.1vw, 1.9rem)', color: 'var(--accent-purple)', marginTop: 0 }}>先做一个思想实验</h3>
              <p style={{ fontSize: 'clamp(0.95rem, 1.5vw, 1.25rem)', lineHeight: 1.7, color: 'var(--text-secondary)', margin: 'clamp(0.7rem, 1.5vh, 1.2rem) 0' }}>
                如果你没有给照片打标签，手机为什么知道照片里有猫？<br />
                AI 是不是像人一样“一眼认出来”？
              </p>
              <Step n={1}>
                <div style={{ background: 'var(--overlay-light)', padding: 'clamp(0.8rem, 1.4vw, 1.2rem)', borderRadius: '12px', lineHeight: 1.6 }}>
                  <strong style={{ fontSize: 'clamp(1rem, 1.5vw, 1.2rem)', color: 'var(--accent-cyan)' }}>机器看到的第一眼不是“猫”，而是一张由数字组成的像素表。</strong>
                  <div style={{ marginTop: '0.45rem', color: 'var(--text-secondary)' }}>它必须先把像素中的边缘、纹理、形状等线索提取出来，再用训练样本学到的规律做判断。</div>
                </div>
              </Step>
            </div>
            <div style={{ flex: 0.8, display: 'flex', justifyContent: 'center' }}>
              <img src="/images/digital_cat.png" alt="Digital Cat Vision" style={{ width: '100%', maxWidth: '350px', borderRadius: '16px', boxShadow: '0 0 30px rgba(176, 38, 255, 0.3)', border: '1px solid rgba(176, 38, 255, 0.2)' }} />
            </div>
          </div>
          <Step n={2}>
            <div className="glass-panel" style={{ marginTop: 'clamp(0.8rem, 1.8vh, 1.3rem)', padding: 'clamp(0.8rem, 1.4vw, 1.2rem)', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.6rem', textAlign: 'center' }}>
              {['Q1 像素：机器看见什么', 'Q2 特征：哪些线索有用', 'Q3 样本：怎样学出规则', 'Q4 泛化：新图片能否认对'].map((step, index) => (
                <div key={step} style={{ padding: '0.65rem', borderRadius: '8px', background: index % 2 ? 'rgba(139,63,217,0.08)' : 'rgba(8,136,168,0.08)', fontSize: 'clamp(0.78rem, 1.15vw, 0.98rem)', fontWeight: 700 }}>{step}</div>
              ))}
            </div>
          </Step>
        </div>
      </SlideContent>
    </Slide>
  );
};

const PixelFeatureSlide = ({ isActive }) => {
  useSlideSteps(3);
  const [hoveredPixel, setHoveredPixel] = useState(null);

  // Create an 8x8 grid that roughly looks like an eye center (dark middle, colored iris, white sclera)
  const generateEyeGrid = () => {
    const grid = [];
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        let color = [255, 255, 255]; // white sclera
        // Pupil
        if ((r === 3 || r === 4) && (c === 3 || c === 4)) color = [20, 20, 20];
        // Iris (blue/greenish)
        else if (r >= 2 && r <= 5 && c >= 2 && c <= 5) color = [40, 160, 180];
        // Eyelid/skin shadow
        else if (r === 0 || r === 7) color = [240, 200, 180];

        // Add some noise
        color = color.map(v => Math.min(255, Math.max(0, v + Math.floor(Math.random() * 20 - 10))));
        grid.push({ r, c, color });
      }
    }
    return grid;
  };

  const [pixels] = useState(generateEyeGrid());

  return (
    <Slide isActive={isActive}>
      <SlideTitle qtag="Q1 · 机器看见什么">从像素到特征</SlideTitle>
      <SlideContent>
        <div className="responsive-flex-container" style={{ display: 'flex', gap: '2rem', width: '90%', maxWidth: '1200px' }}>
          <div className="glass-panel" style={{ padding: '2rem', flex: 1, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h3 style={{ color: 'var(--accent-purple)', fontSize: 'clamp(1.2rem, 1.9vw, 1.6rem)', marginTop: 0 }}>图片 = 像素数字矩阵</h3>

            <div data-no-advance style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '1rem' }}>
              <div style={{ position: 'relative' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: '2px', width: '180px', background: 'var(--overlay-medium)', padding: '2px', borderRadius: '4px' }}>
                  {pixels.map((p, i) => (
                    <div
                      key={i}
                      onMouseEnter={() => setHoveredPixel(p)}
                      onMouseLeave={() => setHoveredPixel(null)}
                      style={{
                        aspectRatio: '1',
                        background: `rgb(${p.color[0]}, ${p.color[1]}, ${p.color[2]})`,
                        border: hoveredPixel === p ? '2px solid var(--accent-cyan)' : 'none',
                        cursor: 'crosshair'
                      }}
                    />
                  ))}
                </div>
              </div>

              <div style={{ width: '150px', height: '120px', background: 'rgba(9,9,11,0.85)', borderRadius: '12px', border: '1px solid var(--border-glass)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                {hoveredPixel ? (
                  <>
                    <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: `rgb(${hoveredPixel.color[0]}, ${hoveredPixel.color[1]}, ${hoveredPixel.color[2]})`, marginBottom: '0.5rem', border: '2px solid #fff' }} />
                    <div style={{ fontSize: '1.2rem', color: 'var(--accent-cyan)', fontFamily: 'monospace' }}>
                      R: {hoveredPixel.color[0]}<br />
                      G: {hoveredPixel.color[1]}<br />
                      B: {hoveredPixel.color[2]}
                    </div>
                  </>
                ) : (
                  <div style={{ color: '#a1a1aa', fontSize: '1.1rem' }}>悬停查看 RGB</div>
                )}
              </div>
            </div>

            <Step n={1} style={{ width: '100%' }}>
              <div style={{ marginTop: '1rem', padding: '1rem', background: 'var(--overlay-light)', borderRadius: '8px', border: '1px dashed var(--text-tertiary)', textAlign: 'left' }}>
                <strong style={{ color: 'var(--accent-cyan)', fontSize: 'clamp(0.9rem, 1.35vw, 1.1rem)' }}>📱 震撼的数据量</strong>
                <p style={{ fontSize: 'clamp(0.82rem, 1.25vw, 1rem)', color: 'var(--text-secondary)', margin: '0.5rem 0 0 0', lineHeight: 1.5 }}>
                  手机随便拍一张照片（比如 1080×1920 分辨率），等于 <strong>207 万</strong>个方块。每个方块有 RGB 三个数字，机器一瞬间要处理 <strong>600 多万个数字</strong>！
                </p>
              </div>
            </Step>
          </div>

          <Step n={2} style={{ flex: 1.2, display: 'flex' }}>
            <div className="glass-panel" style={{ padding: 'clamp(0.8rem, 1.5vw, 1.3rem)', flex: 1 }}>
              <h3 style={{ color: 'var(--accent-cyan)', fontSize: 'clamp(1.2rem, 1.9vw, 1.55rem)', margin: '0 0 0.55rem' }}>像素怎样一步步变成“猫”？</h3>
              <img src="/images/vision_pipeline.png" alt="猫照片从像素、边缘特征到识别结果的过程图" className="teaching-visual" style={{ maxHeight: 'min(27vh, 195px)' }} />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.45rem', marginTop: '0.6rem' }}>
                {[['低级', '边缘、线条'], ['中级', '圆形、尖角'], ['高级', '猫耳、猫眼']].map(([level, text], index) => (
                  <div key={level} style={{ padding: '0.55rem', borderRadius: '8px', background: 'var(--overlay-light)', textAlign: 'center', fontSize: 'clamp(0.7rem, 1vw, 0.86rem)', color: index === 0 ? 'var(--accent-purple)' : index === 1 ? 'var(--accent-cyan)' : 'var(--accent-green)' }}><strong>{level}特征</strong><br /><span style={{ color: 'var(--text-secondary)' }}>{text}</span></div>
                ))}
              </div>
              <Step n={3}>
                <div style={{ marginTop: '0.6rem', padding: '0.7rem', background: 'var(--overlay-light)', borderRadius: '8px', border: '1px dashed var(--text-tertiary)', fontSize: 'clamp(0.72rem, 1.05vw, 0.9rem)', lineHeight: 1.45, color: 'var(--text-secondary)' }}>
                  <strong style={{ color: 'var(--accent-green)' }}>CNN 像“会算数的放大镜”：</strong>从局部像素找线条，再把线条组合成形状和部位，最后形成整只猫的判断。
                </div>
              </Step>
            </div>
          </Step>
        </div>
      </SlideContent>
    </Slide>
  );
};

const GoodFeatureSlide = ({ isActive }) => {
  useSlideSteps(3);

  const cardsPair1 = [
    { front: '😍 “可爱”', back: '❌ 不算特征', explain: '每个人的“可爱”标准都不同，无法观察、无法测量。', color: 'var(--accent-red)' },
    { front: '🦵 “四条腿”', back: '⚠️ 太宽泛', explain: '狗、兔子、牛都有——没有区分度，容易把别的动物误判成猫。', color: 'var(--accent-purple)' }
  ];
  const cardsPair2 = [
    { front: '🎨 “黄棕毛色”', back: '⚠️ 太脆弱', explain: '换成黑白照片或昏暗光线，颜色线索就失效了。', color: 'var(--accent-blue)' },
    { front: '🐱 “胡须 + 尖耳朵”', back: '✅ 好特征', explain: '形状轮廓稳定、有区分度，即使轻微模糊也常能检测到。', color: 'var(--accent-green)' }
  ];

  return (
    <Slide isActive={isActive}>
      <SlideTitle qtag="Q2 · 哪些线索有用">什么是“好特征”？</SlideTitle>
      <SlideContent>
        <div style={{ width: '92%', maxWidth: '1160px' }}>
          <div className="responsive-flex-container" style={{ display: 'flex', gap: 'clamp(0.8rem, 1.5vw, 1.3rem)' }}>
            <figure className="glass-panel" style={{ flex: 1.05, margin: 0, padding: 'clamp(0.65rem, 1.1vw, 0.9rem)', borderTop: '4px solid var(--accent-cyan)', display: 'flex', flexDirection: 'column' }}>
              <img src="/images/feature_comparison.png" alt="猫狗兔的耳朵、胡须、口鼻和毛发等特征对比" className="teaching-visual" style={{ maxHeight: 'min(40vh, 300px)', height: '100%' }} />
              <figcaption style={{ marginTop: '0.55rem', color: 'var(--text-secondary)', fontSize: 'clamp(0.74rem, 1.05vw, 0.9rem)', lineHeight: 1.45 }}><strong style={{ color: 'var(--accent-cyan)' }}>看图：</strong>“都有毛、都有四条腿”只能说明它们相似；耳朵形状、胡须和口鼻轮廓更能把类别分开。</figcaption>
            </figure>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <p style={{ margin: 0, fontSize: 'clamp(0.9rem, 1.4vw, 1.15rem)', color: 'var(--text-secondary)', textAlign: 'center' }}>
                🙋 <strong style={{ color: 'var(--text-primary)' }}>快问快答：</strong>每次出现两张“特征卡”，先判断能不能帮机器认猫，再翻面核对。
              </p>
              <Step n={1}>
                <FlipCards cards={cardsPair1} columns={2} />
              </Step>
              <Step n={2}>
                <FlipCards cards={cardsPair2} columns={2} />
              </Step>
            </div>
          </div>
          <Step n={3}>
            <div className="glass-panel" style={{ marginTop: 'clamp(0.7rem, 1.6vh, 1.2rem)', padding: 'clamp(0.7rem, 1.3vw, 1.05rem)', textAlign: 'center', borderLeft: '4px solid var(--accent-green)' }}>
              <strong style={{ color: 'var(--accent-green)', fontSize: 'clamp(0.92rem, 1.4vw, 1.12rem)' }}>好特征的四个标准：可观察、可比较、有区分度、较稳定。</strong>
              <span style={{ color: 'var(--text-secondary)', fontSize: 'clamp(0.8rem, 1.2vw, 0.98rem)' }}> 模型通常不只靠一个特征，而会综合多条线索——强特征越稳定，泛化越好。</span>
            </div>
          </Step>
        </div>
      </SlideContent>
    </Slide>
  );
};

const TaskRuleSlide = ({ isActive }) => {
  useSlideSteps(3);

  return (
    <Slide isActive={isActive}>
      <SlideTitle qtag="课堂实验 · 外星人的地球图鉴">课堂实验：什么样的特征才真的有用？</SlideTitle>
      <SlideContent>
        <div style={{ width: '92%', maxWidth: '1120px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: 'clamp(0.8rem, 1.7vw, 1.5rem)' }}>
            <div className="glass-panel" style={{ padding: 'clamp(1.2rem, 2.2vw, 2rem)', borderTop: '4px solid var(--accent-cyan)' }}>
              <h3 style={{ fontSize: 'clamp(1.3rem, 2vw, 1.7rem)', color: 'var(--accent-cyan)', marginTop: 0 }}>👽 外星人的地球图鉴</h3>
              <ol style={{ fontSize: 'clamp(0.9rem, 1.35vw, 1.1rem)', lineHeight: 1.8, color: 'var(--text-secondary)', margin: 0, paddingLeft: '1.4rem' }}>
                <li>每组选 3 种动物，为每种动物写出 3 个特征。</li>
                <li>特征必须能让没看过图片的“外星人”作出判断。</li>
              </ol>
              <Step n={1}>
                <ol start={3} style={{ fontSize: 'clamp(0.9rem, 1.35vw, 1.1rem)', lineHeight: 1.8, color: 'var(--text-secondary)', margin: 0, paddingLeft: '1.4rem' }}>
                  <li><strong style={{ color: 'var(--accent-red)' }}>故意混入 1 个坏特征</strong>，如颜色、背景或“四条腿”。</li>
                  <li>与邻组交换图鉴，只看特征猜动物，并记录误判。</li>
                </ol>
              </Step>
            </div>
            <Step n={2} style={{ display: 'flex' }}>
              <div className="glass-panel" style={{ padding: 'clamp(1.2rem, 2.2vw, 2rem)', borderTop: '4px solid var(--accent-purple)', flex: 1 }}>
                <h3 style={{ fontSize: 'clamp(1.2rem, 1.8vw, 1.55rem)', color: 'var(--accent-purple)', marginTop: 0 }}>🔎 观察记录</h3>
                <div style={{ display: 'grid', gap: '0.65rem', fontSize: 'clamp(0.85rem, 1.25vw, 1.03rem)', color: 'var(--text-secondary)' }}>
                  <div style={{ padding: '0.75rem', background: 'var(--overlay-light)', borderRadius: '8px' }}><strong>区分度：</strong>别的动物也常有吗？</div>
                  <div style={{ padding: '0.75rem', background: 'var(--overlay-light)', borderRadius: '8px' }}><strong>稳定性：</strong>换角度、光线后还成立吗？</div>
                  <div style={{ padding: '0.75rem', background: 'var(--overlay-light)', borderRadius: '8px' }}><strong>误判类型：</strong>把不是猫判成猫，还是漏掉了真猫？</div>
                </div>
              </div>
            </Step>
          </div>
          <Step n={3}>
            <div className="glass-panel" style={{ marginTop: 'clamp(0.8rem, 1.8vh, 1.3rem)', padding: 'clamp(0.8rem, 1.4vw, 1.15rem)', textAlign: 'center', borderLeft: '4px solid var(--accent-green)' }}>
              <strong style={{ color: 'var(--accent-green)' }}>实验目的：</strong>
              <span style={{ color: 'var(--text-secondary)' }}> 不是比谁猜得快，而是找出“哪些线索能帮助判断、哪些线索会制造错误”。这正是机器学习选择特征时要解决的问题。</span>
            </div>
          </Step>
        </div>
      </SlideContent>
    </Slide>
  );
};

const FeatureStoreSlide = ({ isActive }) => {
  const FEATURES = [
    { id: 'whisker', name: '有胡须', cost: 4, tag: '稳健' },
    { id: 'ears', name: '尖耳朵', cost: 4, tag: '稳健' },
    { id: 'roundFace', name: '圆脸', cost: 3, tag: '中等' },
    { id: 'fur', name: '橘黄毛色', cost: 2, tag: '脆弱' },
    { id: 'eyeColor', name: '眼睛颜色', cost: 2, tag: '脆弱' },
    { id: 'claws', name: '有爪子', cost: 2, tag: '宽泛' },
    { id: 'legs', name: '四条腿', cost: 1, tag: '宽泛' },
    { id: 'hairy', name: '有毛', cost: 1, tag: '宽泛' }
  ];

  const SAMPLES = [
    { name: '橘猫', img: '/images/samples/orange-cat.jpg', isCat: true, feats: ['whisker', 'ears', 'roundFace', 'fur', 'eyeColor', 'claws', 'legs', 'hairy'] },
    { name: '黑白猫', img: '/images/samples/bw-cat.jpg', isCat: true, feats: ['whisker', 'ears', 'roundFace', 'claws', 'legs', 'hairy'] },
    { name: '模糊猫', img: '/images/samples/blurry-cat.jpg', blur: true, isCat: true, feats: ['whisker', 'ears', 'legs', 'hairy'] },
    { name: '柴犬', img: '/images/samples/shiba.jpg', isCat: false, feats: ['ears', 'roundFace', 'claws', 'legs', 'hairy'] },
    { name: '兔子', img: '/images/samples/rabbit.jpg', isCat: false, feats: ['legs', 'hairy'] },
    { name: '玩偶猫', img: '/images/samples/plush-cat.jpg', pos: 'center 18%', isCat: false, feats: ['roundFace', 'fur', 'legs', 'hairy'] }
  ];

  const GROUP_COLORS = ['var(--accent-cyan)', 'var(--accent-purple)', 'var(--accent-green)', 'var(--accent-red)'];
  const THRESHOLDS = [
    { hits: 1, label: '宽松', desc: '命中 1 个就判猫' },
    { hits: 2, label: '中等', desc: '命中 2 个才判猫' },
    { hits: 3, label: '严格', desc: '命中 3 个才判猫' }
  ];
  const BUDGET = 10;

  const [phase, setPhase] = useState('setup'); // 'setup' | 'test' | 'done'
  const [groupCount, setGroupCount] = useState(2);
  const [groups, setGroups] = useState([]); // { features: [ids], threshold: hits }
  const [draft, setDraft] = useState({ features: [], threshold: 2 });
  const [sampleIdx, setSampleIdx] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [rounds, setRounds] = useState([]); // 每个样本各组判定结果

  const featOf = (id) => FEATURES.find(f => f.id === id);
  const featName = (id) => featOf(id).name;
  const draftCost = draft.features.reduce((s, id) => s + featOf(id).cost, 0);

  const toggleFeature = (feat) => {
    if (draft.features.includes(feat.id)) {
      setDraft({ ...draft, features: draft.features.filter(x => x !== feat.id) });
    } else if (draftCost + feat.cost <= BUDGET) {
      setDraft({ ...draft, features: [...draft.features, feat.id] });
    }
  };

  const submitGroup = () => {
    if (draft.features.length === 0) return;
    setGroups([...groups, draft]);
    setDraft({ features: [], threshold: 2 });
  };

  const changeGroupCount = (n) => {
    setGroupCount(n);
    setGroups([]);
    setDraft({ features: [], threshold: 2 });
  };

  const startTest = () => {
    setPhase('test');
    setSampleIdx(0);
    setRevealed(false);
    setRounds([]);
  };

  const judgeSample = (group, sample) => {
    const hits = group.features.filter(id => sample.feats.includes(id)).length;
    const predictedCat = hits >= group.threshold;
    const correct = predictedCat === sample.isCat;
    const label = correct
      ? (sample.isCat ? '正确识别' : '正确排除')
      : (predictedCat ? '误判为猫' : '漏判没认出');
    return { hits, predictedCat, correct, label };
  };

  const revealCurrent = () => {
    const sample = SAMPLES[sampleIdx];
    setRounds([...rounds, groups.map(g => judgeSample(g, sample))]);
    setRevealed(true);
  };

  const nextSample = () => {
    if (sampleIdx >= SAMPLES.length - 1) {
      setPhase('done');
      return;
    }
    setSampleIdx(sampleIdx + 1);
    setRevealed(false);
  };

  const scores = groups.map((_, gi) => rounds.reduce((s, r) => s + (r[gi].correct ? 1 : 0), 0));
  const errorsOf = (gi) => ({
    mis: rounds.filter(r => !r[gi].correct && r[gi].predictedCat).length,
    miss: rounds.filter(r => !r[gi].correct && !r[gi].predictedCat).length
  });

  const resetAll = () => {
    setPhase('setup');
    setGroups([]);
    setDraft({ features: [], threshold: 2 });
    setSampleIdx(0);
    setRevealed(false);
    setRounds([]);
  };

  const groupChip = (g, gi, showScore = false) => (
    <div key={gi} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: 'clamp(0.35rem, 0.8vh, 0.55rem) clamp(0.6rem, 1.2vw, 0.9rem)', borderRadius: '999px', background: 'var(--overlay-light)', border: `2px solid ${GROUP_COLORS[gi]}`, fontSize: 'clamp(0.74rem, 1.05vw, 0.9rem)' }}>
      <strong style={{ color: GROUP_COLORS[gi] }}>第 {gi + 1} 组</strong>
      <span style={{ color: 'var(--text-secondary)' }}>{g.features.map(featName).join('·')} ｜ {THRESHOLDS.find(t => t.hits === g.threshold).label}</span>
      {showScore && <strong style={{ color: GROUP_COLORS[gi] }}>{scores[gi]} 分</strong>}
    </div>
  );

  return (
    <Slide isActive={isActive}>
      <SlideTitle qtag="课堂实验 · AI 鉴定所">AI 鉴定所：哪组的猫识别机最强？</SlideTitle>
      <SlideContent>
        <div data-no-advance style={{ width: '94%', maxWidth: '1240px', display: 'flex', flexDirection: 'column', gap: 'clamp(0.6rem, 1.3vh, 1.1rem)', cursor: 'default' }}>

          {phase === 'setup' && (
            <>
              {/* 顶部：任务 + 组数 */}
              <div className="glass-panel" style={{ padding: 'clamp(0.6rem, 1.2vw, 0.95rem) clamp(0.9rem, 1.6vw, 1.3rem)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <span style={{ fontSize: 'clamp(0.85rem, 1.3vw, 1.05rem)', color: 'var(--text-secondary)' }}>
                  🎯 每组 <strong style={{ color: 'var(--accent-cyan)' }}>{BUDGET} 枚算力币</strong>：购买特征 + 设定判定线，训练你们的猫识别机。待会儿用同一批盲测样本 PK！
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ color: 'var(--text-tertiary)', fontSize: 'clamp(0.74rem, 1.05vw, 0.88rem)' }}>参赛组数：</span>
                  {[2, 3, 4].map(n => (
                    <button key={n} onClick={() => changeGroupCount(n)} style={{ padding: '0.35rem 0.85rem', borderRadius: '8px', border: `2px solid ${groupCount === n ? 'var(--accent-cyan)' : 'var(--border-glass)'}`, background: groupCount === n ? 'rgba(8,136,168,0.12)' : 'transparent', color: 'var(--text-primary)', fontWeight: 700, cursor: 'pointer' }}>{n} 组</button>
                  ))}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 'clamp(0.6rem, 1.3vw, 1.1rem)' }}>
                {/* 特征商店 */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'clamp(0.45rem, 1vw, 0.8rem)' }}>
                  {FEATURES.map(f => {
                    const inDraft = draft.features.includes(f.id);
                    const afford = draftCost + f.cost <= BUDGET;
                    return (
                      <motion.button
                        key={f.id}
                        whileTap={{ scale: 0.96 }}
                        onClick={() => toggleFeature(f)}
                        className="glass-panel"
                        style={{
                          padding: 'clamp(0.55rem, 1.1vw, 0.9rem)',
                          cursor: inDraft || afford ? 'pointer' : 'not-allowed',
                          border: inDraft ? '2px solid var(--accent-cyan)' : '1px solid var(--border-glass)',
                          background: inDraft ? 'rgba(8,136,168,0.1)' : 'var(--bg-glass)',
                          opacity: !inDraft && !afford ? 0.45 : 1,
                          textAlign: 'left',
                          color: 'var(--text-primary)'
                        }}
                      >
                        <div style={{ fontWeight: 700, fontSize: 'clamp(0.82rem, 1.2vw, 1rem)' }}>{f.name}</div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.4rem', color: 'var(--text-secondary)', fontSize: 'clamp(0.7rem, 1vw, 0.85rem)' }}>
                          <span>🪙 {f.cost}</span>
                          <span style={{ padding: '0.1rem 0.45rem', borderRadius: '4px', background: 'var(--overlay-medium)' }}>{f.tag}</span>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>

                {/* 当前组配置面板 */}
                <div className="glass-panel" style={{ padding: 'clamp(0.7rem, 1.3vw, 1.1rem)', borderTop: `4px solid ${GROUP_COLORS[Math.min(groups.length, 3)]}`, display: 'flex', flexDirection: 'column', gap: 'clamp(0.45rem, 1vh, 0.8rem)' }}>
                  {groups.length < groupCount ? (
                    <>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <strong style={{ color: GROUP_COLORS[groups.length], fontSize: 'clamp(0.9rem, 1.35vw, 1.1rem)' }}>第 {groups.length + 1} 组配置中</strong>
                        <span style={{ fontWeight: 800, fontSize: 'clamp(0.95rem, 1.4vw, 1.2rem)', color: draftCost <= BUDGET ? 'var(--accent-green)' : 'var(--accent-red)' }}>🪙 {BUDGET - draftCost}</span>
                      </div>
                      <div style={{ minHeight: 'clamp(34px, 6vh, 52px)', padding: '0.45rem', background: 'var(--overlay-light)', borderRadius: '8px', display: 'flex', flexWrap: 'wrap', gap: '0.35rem', alignItems: 'center' }}>
                        {draft.features.length === 0
                          ? <span style={{ color: 'var(--text-tertiary)', fontSize: 'clamp(0.72rem, 1.05vw, 0.88rem)', fontStyle: 'italic' }}>点击左侧卡片购买特征…</span>
                          : draft.features.map(id => (
                            <span key={id} style={{ padding: '0.2rem 0.6rem', borderRadius: '999px', background: 'var(--accent-cyan)', color: 'var(--on-accent)', fontSize: 'clamp(0.7rem, 1vw, 0.85rem)', fontWeight: 700 }}>{featName(id)}</span>
                          ))}
                      </div>
                      <div>
                        <div style={{ color: 'var(--text-tertiary)', fontSize: 'clamp(0.72rem, 1vw, 0.85rem)', marginBottom: '0.3rem' }}>判定线（命中几个特征才判猫）：</div>
                        <div style={{ display: 'flex', gap: '0.4rem' }}>
                          {THRESHOLDS.map(t => (
                            <button key={t.hits} onClick={() => setDraft({ ...draft, threshold: t.hits })} style={{ flex: 1, padding: 'clamp(0.4rem, 0.9vh, 0.6rem) 0.3rem', borderRadius: '8px', border: `2px solid ${draft.threshold === t.hits ? 'var(--accent-purple)' : 'var(--border-glass)'}`, background: draft.threshold === t.hits ? 'rgba(139,63,217,0.12)' : 'transparent', color: 'var(--text-primary)', cursor: 'pointer' }}>
                              <strong style={{ fontSize: 'clamp(0.8rem, 1.15vw, 0.95rem)' }}>{t.label}</strong>
                              <div style={{ fontSize: 'clamp(0.64rem, 0.9vw, 0.76rem)', color: 'var(--text-tertiary)' }}>{t.desc}</div>
                            </button>
                          ))}
                        </div>
                      </div>
                      <button onClick={submitGroup} disabled={draft.features.length === 0} style={{ padding: 'clamp(0.55rem, 1.2vh, 0.85rem)', borderRadius: '10px', border: 'none', background: 'var(--accent-cyan)', color: 'var(--on-accent)', fontWeight: 800, fontSize: 'clamp(0.85rem, 1.3vw, 1.05rem)', cursor: draft.features.length === 0 ? 'not-allowed' : 'pointer', opacity: draft.features.length === 0 ? 0.5 : 1 }}>
                        提交本组模型 {groups.length < groupCount - 1 ? '→ 下一组' : ''}
                      </button>
                    </>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', justifyContent: 'center', flex: 1 }}>
                      <strong style={{ color: 'var(--accent-green)', fontSize: 'clamp(0.9rem, 1.35vw, 1.1rem)' }}>✅ {groupCount} 组模型全部就绪！</strong>
                      <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: 'clamp(0.76rem, 1.1vw, 0.92rem)', lineHeight: 1.5 }}>盲测规则：逐个揭示样本，看每组模型判“是猫 / 不是猫”——判对得 1 分。</p>
                      <button onClick={startTest} style={{ padding: 'clamp(0.7rem, 1.5vh, 1.05rem)', borderRadius: '10px', border: 'none', background: 'var(--accent-purple)', color: 'var(--on-accent)', fontWeight: 800, fontSize: 'clamp(0.95rem, 1.45vw, 1.2rem)', cursor: 'pointer' }}>
                        进入盲测挑战 →
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* 已提交组 */}
              {groups.length > 0 && (
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
                  <span style={{ color: 'var(--text-tertiary)', fontSize: 'clamp(0.72rem, 1vw, 0.85rem)' }}>已提交：</span>
                  {groups.map((g, gi) => groupChip(g, gi))}
                </div>
              )}
            </>
          )}

          {phase === 'test' && (
            <>
              {/* 计分板 */}
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
                {groups.map((g, gi) => groupChip(g, gi, true))}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.25fr', gap: 'clamp(0.6rem, 1.3vw, 1.1rem)', alignItems: 'stretch' }}>
                {/* 当前样本 */}
                <div className="glass-panel" style={{ padding: 'clamp(0.8rem, 1.5vw, 1.3rem)', textAlign: 'center', borderTop: '4px solid var(--accent-cyan)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div style={{ color: 'var(--text-tertiary)', fontSize: 'clamp(0.74rem, 1.05vw, 0.88rem)' }}>测试样本 {sampleIdx + 1} / {SAMPLES.length}</div>
                  <div style={{ margin: 'clamp(0.4rem, 0.9vh, 0.7rem) 0', borderRadius: '12px', background: 'var(--overlay-light)', border: '1px solid var(--border-glass)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img
                      src={SAMPLES[sampleIdx].img}
                      alt={SAMPLES[sampleIdx].name}
                      style={{
                        width: '100%',
                        height: 'clamp(170px, 30vh, 260px)',
                        objectFit: 'contain',
                        objectPosition: SAMPLES[sampleIdx].pos || 'center',
                        filter: SAMPLES[sampleIdx].blur ? 'blur(4px) brightness(0.96)' : 'none'
                      }}
                    />
                  </div>
                  <strong style={{ fontSize: 'clamp(1.1rem, 1.8vw, 1.5rem)' }}>{SAMPLES[sampleIdx].name}{SAMPLES[sampleIdx].blur ? '（照片拍糊了）' : ''}</strong>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', justifyContent: 'center', marginTop: 'clamp(0.4rem, 0.9vh, 0.7rem)' }}>
                    {SAMPLES[sampleIdx].feats.map(id => (
                      <span key={id} style={{ padding: '0.15rem 0.55rem', borderRadius: '4px', background: 'var(--overlay-medium)', fontSize: 'clamp(0.68rem, 0.98vw, 0.82rem)', color: 'var(--text-primary)' }}>{featName(id)}</span>
                    ))}
                  </div>
                  {!revealed && (
                    <p style={{ margin: 'clamp(0.5rem, 1vh, 0.8rem) 0 0', color: 'var(--accent-cyan)', fontWeight: 700, fontSize: 'clamp(0.8rem, 1.2vw, 0.98rem)' }}>
                      🙋 各组讨论：你们的模型会判它是猫吗？
                    </p>
                  )}
                </div>

                {/* 判定区 */}
                <div className="glass-panel" style={{ padding: 'clamp(0.8rem, 1.5vw, 1.3rem)', borderTop: '4px solid var(--accent-purple)', display: 'flex', flexDirection: 'column', gap: 'clamp(0.45rem, 1vh, 0.75rem)' }}>
                  {!revealed ? (
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.7rem' }}>
                      <span style={{ color: 'var(--text-secondary)', fontSize: 'clamp(0.85rem, 1.25vw, 1.05rem)' }}>全班预测完毕后——</span>
                      <button onClick={revealCurrent} style={{ padding: 'clamp(0.7rem, 1.5vh, 1rem) clamp(1.6rem, 3vw, 2.6rem)', borderRadius: '12px', border: 'none', background: 'var(--accent-purple)', color: 'var(--on-accent)', fontWeight: 800, fontSize: 'clamp(1rem, 1.6vw, 1.3rem)', cursor: 'pointer' }}>
                        ⚖️ 揭示各组判定
                      </button>
                    </div>
                  ) : (
                    <>
                      <div style={{ textAlign: 'center', color: 'var(--text-tertiary)', fontSize: 'clamp(0.74rem, 1.05vw, 0.88rem)' }}>
                        真实身份：{SAMPLES[sampleIdx].isCat ? <strong style={{ color: 'var(--accent-green)' }}>是猫 🐱</strong> : <strong style={{ color: 'var(--accent-red)' }}>不是猫 ❌</strong>}
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', flex: 1 }}>
                        {groups.map((g, gi) => {
                          const r = rounds[rounds.length - 1][gi];
                          return (
                            <motion.div key={gi} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: gi * 0.15 }} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: 'clamp(0.45rem, 0.9vh, 0.7rem) clamp(0.6rem, 1.1vw, 0.9rem)', borderRadius: '10px', background: 'var(--overlay-light)', borderLeft: `4px solid ${r.correct ? 'var(--accent-green)' : 'var(--accent-red)'}` }}>
                              <strong style={{ color: GROUP_COLORS[gi], whiteSpace: 'nowrap' }}>第 {gi + 1} 组</strong>
                              <span style={{ color: 'var(--text-secondary)', fontSize: 'clamp(0.74rem, 1.05vw, 0.9rem)' }}>命中 {r.hits} 个 {r.hits >= g.threshold ? '≥' : '<'} {g.threshold} → 判<strong>{r.predictedCat ? '是猫' : '不是猫'}</strong></span>
                              <strong style={{ marginLeft: 'auto', color: r.correct ? 'var(--accent-green)' : 'var(--accent-red)', whiteSpace: 'nowrap' }}>{r.correct ? '✓' : '✗'} {r.label}</strong>
                            </motion.div>
                          );
                        })}
                      </div>
                      <button onClick={nextSample} style={{ padding: 'clamp(0.6rem, 1.3vh, 0.9rem)', borderRadius: '10px', border: 'none', background: 'var(--accent-cyan)', color: 'var(--on-accent)', fontWeight: 800, fontSize: 'clamp(0.9rem, 1.35vw, 1.1rem)', cursor: 'pointer' }}>
                        {sampleIdx >= SAMPLES.length - 1 ? '查看最终复盘 →' : '下一个样本 →'}
                      </button>
                    </>
                  )}
                </div>
              </div>

              <div style={{ textAlign: 'center', color: 'var(--text-tertiary)', fontSize: 'clamp(0.64rem, 0.9vw, 0.76rem)' }}>
                样本图片来自 Wikimedia Commons（CC 协议），已下载到本地，离线可用
              </div>
            </>
          )}

          {phase === 'done' && (
            <>
              {/* 排行榜 */}
              <div className="glass-panel" style={{ padding: 'clamp(0.8rem, 1.5vw, 1.3rem)', borderTop: '4px solid var(--accent-green)' }}>
                <h3 style={{ margin: '0 0 clamp(0.5rem, 1vh, 0.8rem)', fontSize: 'clamp(1.05rem, 1.65vw, 1.35rem)', color: 'var(--accent-green)' }}>🏆 最终排行</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                  {groups
                    .map((g, gi) => ({ g, gi, score: scores[gi], ...errorsOf(gi) }))
                    .sort((a, b) => b.score - a.score)
                    .map((row, rank) => (
                      <div key={row.gi} style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', padding: 'clamp(0.45rem, 0.9vh, 0.7rem) clamp(0.7rem, 1.2vw, 1rem)', borderRadius: '10px', background: rank === 0 ? 'rgba(10,148,100,0.1)' : 'var(--overlay-light)', border: `1px solid ${rank === 0 ? 'var(--accent-green)' : 'var(--border-glass)'}` }}>
                        <span style={{ fontSize: 'clamp(1.1rem, 1.8vw, 1.5rem)' }}>{['🥇', '🥈', '🥉', '4️⃣'][rank]}</span>
                        <strong style={{ color: GROUP_COLORS[row.gi] }}>第 {row.gi + 1} 组</strong>
                        <span style={{ color: 'var(--text-secondary)', fontSize: 'clamp(0.74rem, 1.05vw, 0.9rem)' }}>{row.g.features.map(featName).join('·')} ｜ {THRESHOLDS.find(t => t.hits === row.g.threshold).label}</span>
                        <span style={{ marginLeft: 'auto', color: 'var(--text-secondary)', fontSize: 'clamp(0.74rem, 1.05vw, 0.9rem)' }}>
                          {row.mis > 0 && `误判 ×${row.mis} `}{row.miss > 0 && `漏判 ×${row.miss}`}{row.mis === 0 && row.miss === 0 && '零失误'}
                        </span>
                        <strong style={{ color: GROUP_COLORS[row.gi], fontSize: 'clamp(0.95rem, 1.4vw, 1.2rem)' }}>{row.score} / {SAMPLES.length}</strong>
                      </div>
                    ))}
                </div>
              </div>

              {/* 三条结论 */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'clamp(0.5rem, 1vw, 0.8rem)' }}>
                <div style={{ padding: 'clamp(0.6rem, 1.1vw, 0.9rem)', borderRadius: '10px', background: 'rgba(8,136,168,0.07)', borderLeft: '4px solid var(--accent-cyan)', fontSize: 'clamp(0.74rem, 1.05vw, 0.9rem)', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <strong style={{ color: 'var(--accent-cyan)' }}>特征决定模型看什么。</strong>便宜的宽泛特征容易骗过模型；稳健特征贵，但关键时刻靠得住。
                </div>
                <div style={{ padding: 'clamp(0.6rem, 1.1vw, 0.9rem)', borderRadius: '10px', background: 'rgba(139,63,217,0.07)', borderLeft: '4px solid var(--accent-purple)', fontSize: 'clamp(0.74rem, 1.05vw, 0.9rem)', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <strong style={{ color: 'var(--accent-purple)' }}>判定线决定宽和严。</strong>太宽容易误判（把狗当猫），太严容易漏判（认不出模糊猫）。
                </div>
                <div style={{ padding: 'clamp(0.6rem, 1.1vw, 0.9rem)', borderRadius: '10px', background: 'rgba(10,148,100,0.07)', borderLeft: '4px solid var(--accent-green)', fontSize: 'clamp(0.74rem, 1.05vw, 0.9rem)', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <strong style={{ color: 'var(--accent-green)' }}>训练时感觉好 ≠ 测试表现好。</strong>新样本才是检验模型的唯一标准。
                </div>
              </div>

              <button onClick={resetAll} style={{ alignSelf: 'center', padding: 'clamp(0.55rem, 1.2vh, 0.85rem) clamp(1.4rem, 2.6vw, 2.2rem)', borderRadius: '10px', border: '2px solid var(--border-glass-strong)', background: 'transparent', color: 'var(--text-primary)', fontWeight: 700, fontSize: 'clamp(0.85rem, 1.25vw, 1rem)', cursor: 'pointer' }}>
                🔄 换一批方案，再玩一轮
              </button>
            </>
          )}
        </div>
      </SlideContent>
    </Slide>
  );
};

const FeatureDecisionSlide = ({ isActive }) => {
  useSlideSteps(4);
  const [threshold, setThreshold] = useState(5);
  const samples = [
    { name: '清晰猫', icon: '🐱', score: 6, truth: true, details: '胡须 +3 · 尖耳 +2 · 圆脸 +1' },
    { name: '哈士奇', icon: '🐶', score: 3, truth: false, details: '尖耳 +2 · 四腿 +1' },
    { name: '模糊猫', icon: '🌫️🐈', score: 4, truth: true, details: '胡须模糊 +1 · 尖耳 +2 · 圆脸 +1' }
  ];

  const conceptCards = [
    ['① 看特征', '图片先被转换成“有没有胡须、耳朵形状”等可比较的信息。', 'var(--accent-cyan)'],
    ['② 给证据加权', '区分度高的特征分值更大；“四条腿”太常见，只能提供很弱的证据。', 'var(--accent-cyan)'],
    ['③ 累加总分', '多个特征共同投票，不依赖某一个线索就下结论。', 'var(--accent-purple)'],
    ['④ 跨过判定线', '总分达到阈值就判为猫，否则判为不是猫。', 'var(--accent-purple)']
  ];

  return (
    <Slide isActive={isActive}>
      <SlideTitle qtag="Q2 · 哪些线索有用">特征怎样一步步变成“是猫 / 不是猫”？</SlideTitle>
      <SlideContent>
        <div style={{ width: '94%', maxWidth: '1180px', display: 'grid', gridTemplateColumns: '0.88fr 1.12fr', gap: 'clamp(0.8rem, 1.7vw, 1.6rem)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.65rem, 1.3vh, 1rem)' }}>
            {conceptCards.map(([title, text, color], index) => {
              const card = (
                <div className="glass-panel" style={{ padding: 'clamp(0.65rem, 1.3vw, 1rem)', display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 'clamp(0.55rem, 1vw, 0.9rem)', alignItems: 'start', borderLeft: `4px solid ${color}` }}>
                  <strong style={{ fontSize: 'clamp(0.88rem, 1.35vw, 1.08rem)', color, whiteSpace: 'nowrap' }}>{title}</strong>
                  <span style={{ fontSize: 'clamp(0.74rem, 1.1vw, 0.92rem)', lineHeight: 1.5, color: 'var(--text-secondary)' }}>{text}</span>
                </div>
              );
              return index === 0
                ? <div key={title}>{card}</div>
                : <Step key={title} n={index}>{card}</Step>;
            })}
            <Step n={4}>
              <div className="glass-panel" style={{ padding: 'clamp(0.7rem, 1.3vw, 1rem)', border: '1px dashed var(--accent-green)' }}>
                <strong style={{ color: 'var(--accent-green)', fontSize: 'clamp(0.8rem, 1.2vw, 1rem)' }}>真实模型中的权重通常不是老师手写的，而是模型根据大量样本中的对错慢慢学出来的。</strong>
              </div>
            </Step>
          </div>

          <div className="glass-panel" style={{ padding: 'clamp(1rem, 1.9vw, 1.7rem)', borderTop: '4px solid var(--accent-green)' }} data-no-advance>
            <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'space-between', gap: '1rem' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: 'clamp(1rem, 1.7vw, 1.35rem)', color: 'var(--text-primary)' }}>拖动判定线，观察错误怎样变化</h3>
                <div style={{ marginTop: 'clamp(0.25rem, 0.6vh, 0.45rem)', color: 'var(--text-tertiary)', fontSize: 'clamp(0.72rem, 1vw, 0.88rem)' }}>总分 ≥ 判定线 → 预测“是猫”</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ color: 'var(--text-tertiary)', fontSize: 'clamp(0.7rem, 1vw, 0.86rem)' }}>判定线</div>
                <strong style={{ color: 'var(--accent-green)', fontSize: 'clamp(1.55rem, 2.7vw, 2.3rem)' }}>{threshold}</strong>
              </div>
            </div>
            <input type="range" min="2" max="7" step="1" value={threshold} onChange={(event) => setThreshold(Number(event.target.value))} aria-label="调整猫识别判定线" style={{ width: '100%', accentColor: 'var(--accent-green)', margin: 'clamp(0.6rem, 1.2vh, 0.9rem) 0' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.55rem, 1vh, 0.8rem)' }}>
              {samples.map(sample => {
                const predicted = sample.score >= threshold;
                const correct = predicted === sample.truth;
                return (
                  <div key={sample.name} style={{ padding: 'clamp(0.55rem, 1vw, 0.85rem)', borderRadius: '10px', background: 'var(--overlay-light)', borderLeft: `4px solid ${correct ? 'var(--accent-green)' : 'var(--accent-red)'}` }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'clamp(70px, 8vw, 100px) 1fr auto', gap: 'clamp(0.5rem, 1vw, 0.85rem)', alignItems: 'center' }}>
                      <strong style={{ fontSize: 'clamp(0.82rem, 1.2vw, 1rem)' }}>{sample.icon} {sample.name}</strong>
                      <div style={{ height: 'clamp(15px, 2vh, 21px)', borderRadius: '999px', background: 'var(--overlay-medium)', overflow: 'hidden' }}><div style={{ height: '100%', width: `${(sample.score / 7) * 100}%`, background: correct ? 'var(--accent-green)' : 'var(--accent-red)' }} /></div>
                      <span style={{ fontSize: 'clamp(0.76rem, 1.15vw, 0.96rem)', whiteSpace: 'nowrap' }}><strong>{sample.score} 分</strong> → {predicted ? '是猫' : '不是猫'} {correct ? '✓' : '✗'}</span>
                    </div>
                    <div style={{ marginTop: 'clamp(0.22rem, 0.5vh, 0.4rem)', fontSize: 'clamp(0.68rem, 0.95vw, 0.82rem)', color: 'var(--text-tertiary)' }}>{sample.details}</div>
                  </div>
                );
              })}
            </div>
            <div style={{ marginTop: 'clamp(0.6rem, 1.2vh, 0.9rem)', fontSize: 'clamp(0.74rem, 1.08vw, 0.9rem)', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              <strong style={{ color: 'var(--accent-cyan)' }}>判定线太低：</strong>容易把狗当猫（误判）； <strong style={{ color: 'var(--accent-purple)' }}>判定线太高：</strong>容易漏掉模糊猫（漏判）。
            </div>
          </div>
        </div>
      </SlideContent>
    </Slide>
  );
};

const ErrorAnalysisSlide = ({ isActive }) => {
  useSlideSteps(3);

  const cards = [
    { title: '误判 (把狗当猫)', color: 'var(--accent-red)', text: '原因：选了太多宽泛特征（四条腿、有毛）。', fix: '改进：增加更有区分度的结构特征。' },
    { title: '漏判 (没认出模糊猫)', color: 'var(--accent-cyan)', text: '原因：判定线太严格，或依赖了模糊时看不清的细节。', fix: '改进：放宽判定线，选更稳定的特征。' },
    { title: '脆弱特征失效', color: 'var(--accent-purple)', text: '原因：黑白照片让“毛色”特征完全失效。', fix: '改进：少依赖颜色，多看形状结构。' }
  ];

  return (
    <Slide isActive={isActive}>
      <SlideTitle qtag="实验复盘 · 错误即线索">误判复盘</SlideTitle>
      <SlideContent>
        <div style={{ width: '92%', maxWidth: '1060px' }}>
          <p style={{ textAlign: 'center', fontSize: 'clamp(1.05rem, 1.7vw, 1.4rem)', margin: '0 0 clamp(0.9rem, 2vh, 1.6rem)', color: 'var(--text-secondary)' }}>
            为什么测试集上会错？<strong style={{ color: 'var(--text-primary)' }}>错误不是失败，而是让我们看清模型到底学了什么。</strong>
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'clamp(0.7rem, 1.4vw, 1.3rem)' }}>
            {cards.map((card, i) => (
              <Step key={card.title} n={i + 1} style={{ display: 'flex' }}>
                <div className="glass-panel" style={{ padding: 'clamp(1rem, 1.8vw, 1.6rem)', borderTop: `4px solid ${card.color}`, flex: 1 }}>
                  <h4 style={{ color: card.color, fontSize: 'clamp(1rem, 1.6vw, 1.3rem)', marginTop: 0, marginBottom: '0.6rem' }}>{card.title}</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: 'clamp(0.82rem, 1.25vw, 1rem)', lineHeight: 1.55, margin: '0 0 0.6rem' }}>{card.text}</p>
                  <p style={{ color: 'var(--accent-green)', fontSize: 'clamp(0.78rem, 1.15vw, 0.94rem)', lineHeight: 1.5, margin: 0 }}>{card.fix}</p>
                </div>
              </Step>
            ))}
          </div>
        </div>
      </SlideContent>
    </Slide>
  );
};

const MLStructureSlide = ({ isActive }) => {
  useSlideSteps(4);
  const step = useCurrentStep();

  // 第一行作示例；其余四行两两一组：先出“猫识别机”，再揭示“机器学习概念”
  const rows = [
    { left: '猫 A、狗、兔子等旧图片', right: '样本 (Samples)', leftAt: 0, rightAt: 0 },
    { left: '胡须、尖耳朵、圆脸', right: '特征 (Features)', leftAt: 1, rightAt: 2 },
    { left: '图片背后标注的“是猫/不是猫”', right: '标签 (Labels)', leftAt: 1, rightAt: 2 },
    { left: '判定线及特征组合规则', right: '模型 (Model)', leftAt: 3, rightAt: 4 },
    { left: '用来检验的新图片（如模糊猫）', right: '测试集 (Test Set)', leftAt: 3, rightAt: 4 }
  ];

  const cellStyle = (at, isAnswer) => ({
    padding: 'clamp(0.65rem, 1.1vw, 1rem)',
    visibility: step >= at ? 'visible' : 'hidden',
    opacity: step >= at ? 1 : 0,
    transition: 'opacity 0.4s ease',
    color: isAnswer ? 'var(--text-secondary)' : 'var(--text-primary)'
  });

  return (
    <Slide isActive={isActive}>
      <SlideTitle qtag="Q3 · 怎样学出规则">机器学习四件套</SlideTitle>
      <SlideContent>
        <div className="glass-panel" style={{ padding: 'clamp(1.2rem, 2vw, 2rem)', width: '85%', maxWidth: '960px', borderTop: '4px solid var(--accent-cyan)' }}>
          <p style={{ margin: '0 0 clamp(0.5rem, 1vh, 0.9rem)', fontSize: 'clamp(0.85rem, 1.3vw, 1.05rem)', color: 'var(--text-secondary)' }}>
            🙋 左边每出现一条猫识别机的部件，先抢答：它在机器学习里叫什么？
          </p>
          <table style={{ width: '100%', fontSize: 'clamp(0.9rem, 1.4vw, 1.25rem)', textAlign: 'left', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--overlay-heavy)' }}>
                <th style={{ padding: 'clamp(0.65rem, 1.1vw, 1rem)', color: 'var(--accent-cyan)' }}>🐱 猫识别机</th>
                <th style={{ padding: 'clamp(0.65rem, 1.1vw, 1rem)', color: 'var(--accent-purple)' }}>💻 机器学习概念</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={row.left} style={{ borderBottom: i < rows.length - 1 ? '1px solid var(--overlay-medium)' : 'none' }}>
                  <td style={cellStyle(row.leftAt, false)}>{row.left}</td>
                  <td style={cellStyle(row.rightAt, true)}><strong>{row.right}</strong></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SlideContent>
    </Slide>
  );
};

const DatasetRolesSlide = ({ isActive }) => {
  useSlideSteps(3);

  const roles = [
    { icon: '🧭', title: '验证集', ratio: '约 15%', color: 'var(--accent-purple)', text: '像模拟考试。工程师用它选择特征、阈值和训练轮数，但不直接拿来背答案。' },
    { icon: '🔒', title: '测试集', ratio: '约 15%', color: 'var(--accent-green)', text: '像密封的期末卷。训练结束后才打开，用来检验模型面对新样本的真实能力。' }
  ];

  const renderRole = (item) => (
    <div className="glass-panel" style={{ padding: 'clamp(0.65rem, 1.15vw, 0.9rem)', borderLeft: `4px solid ${item.color}`, display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '0.65rem', alignItems: 'center', flex: 1 }}>
      <div style={{ fontSize: 'clamp(1.35rem, 2.2vw, 1.9rem)' }}>{item.icon}</div>
      <div>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '0.5rem' }}>
          <h3 style={{ fontSize: 'clamp(1.2rem, 2vw, 1.65rem)', color: item.color, margin: 0 }}>{item.title}</h3>
          <span style={{ fontSize: 'clamp(0.75rem, 1.1vw, 0.95rem)', color: 'var(--text-tertiary)' }}>{item.ratio}</span>
        </div>
        <p style={{ fontSize: 'clamp(0.74rem, 1.08vw, 0.92rem)', lineHeight: 1.45, color: 'var(--text-secondary)', margin: '0.25rem 0 0' }}>{item.text}</p>
      </div>
    </div>
  );

  return (
    <Slide isActive={isActive}>
      <SlideTitle qtag="Q4 · 新图片能否认对">训练集、验证集、测试集有什么不同？</SlideTitle>
      <SlideContent>
        <div style={{ width: '92%', maxWidth: '1160px', display: 'grid', gridTemplateColumns: '1.08fr 0.92fr', gap: 'clamp(0.8rem, 1.6vw, 1.4rem)', alignItems: 'stretch' }}>
          <figure className="glass-panel" style={{ margin: 0, padding: 'clamp(0.65rem, 1.1vw, 0.9rem)', borderTop: '4px solid var(--accent-cyan)', display: 'flex', flexDirection: 'column' }}>
            <img src="/images/dataset_exam.png" alt="机器人依次经历练习题、模拟考试和密封期末考试" className="teaching-visual" style={{ maxHeight: 'min(44vh, 335px)', height: '100%' }} />
            <figcaption style={{ marginTop: '0.55rem', color: 'var(--text-secondary)', fontSize: 'clamp(0.74rem, 1.05vw, 0.9rem)', lineHeight: 1.45 }}>同一批数据不能既当“练习题”又当“期末卷”；否则分数会很好看，却测不出面对新题的能力。</figcaption>
          </figure>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
            {renderRole({ icon: '📖', title: '训练集', ratio: '约 70%', color: 'var(--accent-cyan)', text: '像平时练习题。模型反复查看这些样本，并根据错误调整内部规则。' })}
            <Step n={1} style={{ display: 'flex', flex: 1 }}>{renderRole(roles[0])}</Step>
            <Step n={2} style={{ display: 'flex', flex: 1 }}>{renderRole(roles[1])}</Step>
          </div>
        </div>
        <Step n={3} style={{ width: '92%', maxWidth: '1160px' }}>
          <div className="glass-panel" style={{ marginTop: 'clamp(0.65rem, 1.5vh, 1rem)', padding: 'clamp(0.65rem, 1.2vw, 0.9rem)', textAlign: 'center', borderLeft: '4px solid var(--accent-red)' }}>
            <strong style={{ fontSize: 'clamp(0.95rem, 1.5vw, 1.2rem)' }}>为什么不能拿测试集训练？</strong>
            <span style={{ color: 'var(--text-secondary)', fontSize: 'clamp(0.85rem, 1.3vw, 1.05rem)' }}> 因为提前看过考题，就无法知道模型是真会了，还是只记住了答案。</span>
          </div>
        </Step>
      </SlideContent>
    </Slide>
  );
};

const BlackboxSlide = ({ isActive }) => {
  const [revealed, setRevealed] = useState(0);
  const samples = [
    { features: ['尖耳', '圆脸', '有毛'], result: '🐱 是猫', isCat: true },
    { features: ['圆脸', '长尾', '四腿'], result: '❌ 不是猫', isCat: false },
    { features: ['尖耳', '胡须', '长尾'], result: '🐱 是猫', isCat: true },
    { features: ['圆脸', '四腿', '有毛'], result: '❌ 不是猫', isCat: false },
    { features: ['尖耳', '胡须', '有毛', '长尾'], result: '🐱 是猫', isCat: true },
    { features: ['胡须', '圆脸', '四腿', '长尾'], result: '🐱 是猫', isCat: true },
  ];

  return (
    <Slide isActive={isActive}>
      <SlideTitle qtag="课堂实验 · 黑箱预测机">机器学习黑箱：找寻规律</SlideTitle>
      <SlideContent>
        <div data-no-advance className="responsive-flex-container" style={{ display: 'flex', gap: '2rem', width: '90%', maxWidth: '1100px', height: '100%', cursor: 'default' }}>
          {/* Samples column */}
          <div className="glass-panel" style={{ flex: 1.2, padding: '2rem', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
            <h3 style={{ marginTop: 0, color: 'var(--accent-purple)' }}>🔍 训练样本集 (逐步揭开)</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', flex: 1 }}>
              {samples.slice(0, revealed).map((s, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'var(--overlay-light)', borderRadius: '8px', borderLeft: `4px solid ${s.isCat ? 'var(--accent-green)' : 'var(--accent-red)'}` }}>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {s.features.map((f, idx) => (
                      <span key={idx} style={{ padding: '0.2rem 0.6rem', borderRadius: '4px', background: 'var(--overlay-medium)', color: 'var(--text-primary)', fontSize: '0.95rem', fontWeight: 600 }}>{f}</span>
                    ))}
                  </div>
                  <strong style={{ fontSize: '1.2rem', color: s.isCat ? 'var(--accent-green)' : 'var(--accent-red)', whiteSpace: 'nowrap', marginLeft: '1rem' }}>{s.result}</strong>
                </div>
              ))}
              {revealed === 0 && (
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-tertiary)', fontStyle: 'italic', fontSize: '1.2rem', minHeight: '150px' }}>
                  点击下方按钮，开始揭示样本...
                </div>
              )}
            </div>
            {revealed < samples.length ? (
              <button onClick={() => setRevealed(r => r + 1)} style={{ width: '100%', padding: '1.2rem', marginTop: '1.5rem', borderRadius: '8px', border: 'none', background: 'var(--accent-purple)', color: 'var(--on-accent)', cursor: 'pointer', fontWeight: 'bold', fontSize: '1.2rem', transition: 'all 0.3s' }}>
                揭示下一条样本 ({revealed}/{samples.length})
              </button>
            ) : (
              <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(10, 148, 100, 0.1)', color: 'var(--accent-green)', borderRadius: '8px', textAlign: 'center', fontWeight: 'bold' }}>
                ✅ 样本已全部揭示完毕！
              </div>
            )}
          </div>

          {/* Rules guess column */}
          <div className="glass-panel" style={{ flex: 1, padding: '2rem', borderTop: '4px solid var(--accent-cyan)' }}>
            <h3 style={{ marginTop: 0, color: 'var(--accent-cyan)' }}>🧠 推导判定规律</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', lineHeight: 1.6 }}>
              分析左侧的样本：什么特征在猫身上一定有？什么特征（比如“长尾”、“四腿”）可能只是无意义的<strong>干扰噪声</strong>？
            </p>
            <div style={{ padding: '1.5rem', background: 'var(--overlay-light)', borderRadius: '12px', marginTop: '1.5rem', border: '1px dashed var(--border-glass)', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <div>
                <strong style={{ color: 'var(--text-primary)' }}>你们推导的秘密条件：</strong>
                <p style={{ margin: '0.5rem 0 0 0', color: 'var(--text-secondary)', fontStyle: 'italic', fontSize: '1.1rem' }}>
                  必须同时满足哪几个特征，或者哪几个特征满足任意几个？
                </p>
              </div>
              <div style={{ borderTop: '1px solid var(--border-glass)', paddingTop: '1rem' }}>
                <span style={{ color: 'var(--accent-green)', fontWeight: 'bold' }}>💡 提示：</span>
                比较“是猫”和“不是猫”的特征重叠度，找出最硬核的规则。
              </div>
            </div>
          </div>
        </div>
      </SlideContent>
    </Slide>
  );
};

const GeneralizationSlide = ({ isActive }) => {
  useSlideSteps(3);

  const quizOptions = [
    { text: '🐱 是猫', correct: false, explain: '再想想：“长尾”“四腿”在刚才的样本里根本不是决定因素。' },
    { text: '🐿️ 不是猫', correct: true, explain: '核心特征只命中“胡须”1 个，没有达到 2 个核心特征的判定线——它可能是一只松鼠。旧规则在新样本上依然成立！' }
  ];

  return (
    <Slide isActive={isActive}>
      <SlideTitle qtag="Q4 · 新图片能否认对">泛化挑战：新样本测试</SlideTitle>
      <SlideContent>
        <div className="responsive-flex-container" style={{ display: 'flex', gap: '2rem', width: '90%', maxWidth: '1200px' }}>
          {/* Left: Test Case and Concept */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <div className="glass-panel" style={{ padding: 'clamp(1.2rem, 2.2vw, 2rem)', borderTop: '4px solid var(--accent-cyan)' }}>
              <h3 style={{ marginTop: 0, fontSize: 'clamp(1.2rem, 1.9vw, 1.55rem)', color: 'var(--accent-cyan)' }}>🧪 考考你的规则能“泛化”吗？</h3>
              <QuickQuiz
                question={<>来了一只新神秘动物，特征：<strong>胡须、长尾、四腿</strong>。按你们刚才推导的规则，它是猫吗？</>}
                options={quizOptions}
                columns={2}
              />
            </div>

            <Step n={1}>
              <div className="glass-panel" style={{ padding: 'clamp(1rem, 1.8vw, 1.6rem)', background: 'rgba(8, 136, 168, 0.05)', border: '1px solid var(--accent-cyan)' }}>
                <h4 style={{ margin: '0 0 0.6rem 0', color: 'var(--accent-cyan)', fontSize: 'clamp(1.05rem, 1.65vw, 1.35rem)' }}>🌟 什么是“泛化能力 (Generalization)”？</h4>
                <p style={{ fontSize: 'clamp(0.85rem, 1.3vw, 1.05rem)', lineHeight: 1.7, margin: 0, color: 'var(--text-secondary)' }}>
                  机器学习的目的，<strong>绝对不是死记硬背旧样本</strong>，而是从旧样本中抽出真正通用的规律，准确预测从未见过的<strong>新样本</strong>。
                </p>
              </div>
            </Step>
          </div>

          {/* Right: Metaphors */}
          <div style={{ flex: 1.1, display: 'flex' }}>
            <div className="glass-panel" style={{ flex: 1, padding: 'clamp(1rem, 1.9vw, 1.8rem)', borderTop: '4px solid var(--accent-purple)', display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ margin: '0 0 clamp(0.7rem, 1.4vh, 1.2rem)', fontSize: 'clamp(1.15rem, 1.85vw, 1.5rem)', color: 'var(--accent-purple)' }}>当模型“学习方法”出错时...</h3>
              <Step n={2} style={{ display: 'flex' }}>
                <div style={{ flex: 1, padding: 'clamp(0.8rem, 1.4vw, 1.2rem)', background: 'rgba(220, 47, 76, 0.05)', borderRadius: '10px', borderLeft: '4px solid var(--accent-red)' }}>
                  <strong style={{ fontSize: 'clamp(0.95rem, 1.45vw, 1.2rem)', color: 'var(--accent-red)' }}>🤯 过拟合 — “死记硬背的偏科生”</strong>
                  <p style={{ fontSize: 'clamp(0.8rem, 1.2vw, 0.98rem)', color: 'var(--text-secondary)', margin: '0.5rem 0 0 0', lineHeight: 1.6 }}>
                    训练集上拿 100 分，测试集上考 0 分。它把偶然的干扰噪声（“长尾”“四腿”）也背成铁律，一遇到新样本就翻车。
                  </p>
                </div>
              </Step>
              <Step n={3} style={{ display: 'flex', marginTop: 'clamp(0.7rem, 1.4vh, 1.2rem)' }}>
                <div style={{ flex: 1, padding: 'clamp(0.8rem, 1.4vw, 1.2rem)', background: 'var(--overlay-light)', borderRadius: '10px', borderLeft: '4px solid var(--text-tertiary)' }}>
                  <strong style={{ fontSize: 'clamp(0.95rem, 1.45vw, 1.2rem)', color: 'var(--text-primary)' }}>🥱 欠拟合 — “还没睡醒的懒学生”</strong>
                  <p style={{ fontSize: 'clamp(0.8rem, 1.2vw, 0.98rem)', color: 'var(--text-secondary)', margin: '0.5rem 0 0 0', lineHeight: 1.6 }}>
                    训练集、测试集分数都很惨。连最基本的规律（“尖耳”“胡须”）都没学会，比如胡乱得出“所有动物都是猫”。
                  </p>
                </div>
              </Step>
            </div>
          </div>
        </div>
      </SlideContent>
    </Slide>
  );
};

const DataQualitySlide = ({ isActive }) => {
  useSlideSteps(4);

  const items = [
    { icon: '⚖️', title: '类别要平衡', bad: '100 张猫，只有 2 张狗', result: '模型可能把大多数动物都猜成猫。' },
    { icon: '🌍', title: '样本要多样', bad: '只看白天、正面、高清照片', result: '夜晚、侧面或模糊图片就容易认错。' },
    { icon: '🏷️', title: '标签要准确', bad: '把狗错误标成“猫”', result: '错误答案会被模型当作正确规律学习。' },
    { icon: '🔍', title: '来源要真实', bad: '训练图片与现实场景差别太大', result: '实验室里很准，真正使用时却可能失灵。' }
  ];

  const renderCard = (item) => (
    <div className="glass-panel" style={{ padding: 'clamp(0.9rem, 1.7vw, 1.5rem)', display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 'clamp(0.7rem, 1.2vw, 1.1rem)', alignItems: 'start', borderLeft: '4px solid var(--accent-purple)', flex: 1 }}>
      <span style={{ fontSize: 'clamp(1.7rem, 2.7vw, 2.5rem)' }}>{item.icon}</span>
      <div>
        <h3 style={{ fontSize: 'clamp(1.05rem, 1.7vw, 1.4rem)', margin: 0, color: 'var(--text-primary)' }}>{item.title}</h3>
        <p style={{ margin: 'clamp(0.35rem, 0.8vh, 0.6rem) 0 0', fontSize: 'clamp(0.78rem, 1.2vw, 1rem)', color: 'var(--text-secondary)', lineHeight: 1.55 }}><strong style={{ color: 'var(--accent-red)' }}>问题：</strong>{item.bad}<br /><strong style={{ color: 'var(--accent-green)' }}>结果：</strong>{item.result}</p>
      </div>
    </div>
  );

  return (
    <Slide isActive={isActive}>
      <SlideTitle qtag="迁移 · AI 的公平与责任">模型的眼界，由数据决定</SlideTitle>
      <SlideContent>
        <div style={{ width: '92%', maxWidth: '1150px', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'clamp(0.7rem, 1.5vw, 1.4rem)' }}>
          {items.map((item, i) => (
            i === 0
              ? <div key={item.title} style={{ display: 'flex' }}>{renderCard(item)}</div>
              : <Step key={item.title} n={i} style={{ display: 'flex' }}>{renderCard(item)}</Step>
          ))}
        </div>
        <Step n={4} style={{ width: '92%', maxWidth: '1150px' }}>
          <div className="glass-panel" style={{ marginTop: 'clamp(0.8rem, 2vh, 1.4rem)', padding: 'clamp(0.8rem, 1.4vw, 1.2rem)', textAlign: 'center', border: '1px dashed var(--accent-cyan)' }}>
            <strong style={{ color: 'var(--accent-cyan)', fontSize: 'clamp(1rem, 1.6vw, 1.25rem)' }}>数据有偏差，模型的判断也会带着偏差。</strong>
            <span style={{ color: 'var(--text-secondary)', fontSize: 'clamp(0.82rem, 1.25vw, 1.02rem)' }}> 这也是人脸识别、招聘筛选等真实应用必须重视公平性的原因。</span>
          </div>
        </Step>
      </SlideContent>
    </Slide>
  );
};

export const Lesson2 = ({ onGoHome }) => {
  const slides = [
    CoverSlide,
    LeadInSlide,
    PixelFeatureSlide,
    GoodFeatureSlide,
    TaskRuleSlide,
    FeatureStoreSlide,
    FeatureDecisionSlide,
    ErrorAnalysisSlide,
    MLStructureSlide,
    DatasetRolesSlide,
    BlackboxSlide,
    GeneralizationSlide,
    DataQualitySlide
  ];

  const stages = [
    { from: 0, label: '课程导入' },
    { from: 2, label: '从像素到特征' },
    { from: 4, label: '课堂实验' },
    { from: 8, label: '模型怎样学习' },
    { from: 11, label: '泛化与责任' }
  ];

  return <Presentation slides={slides} onGoHome={onGoHome} lessonLabel="第 2 课时 · 从看图到预测" stages={stages} />;
};
