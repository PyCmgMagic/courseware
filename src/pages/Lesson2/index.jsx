import { useState } from 'react';
import { Presentation } from '../../components/Presentation';
import { Slide, SlideTitle, SlideContent } from '../../components/Slide';
import { motion } from 'framer-motion';

const CoverSlide = ({ isActive }) => (
  <Slide isActive={isActive}>
    <SlideContent>
      <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ duration: 0.8 }}>
        <h3 style={{ color: 'var(--accent-purple)', fontSize: '2rem', margin: 0, textAlign: 'center' }}>第 2 课时</h3>
        <h1 style={{ fontSize: '5rem', margin: '1rem 0', fontWeight: 800 }} className="text-gradient">
          从看图到预测
        </h1>
        <p style={{ fontSize: '1.8rem', color: 'var(--text-secondary)', textAlign: 'center' }}>
          AI 如何用特征和样本学规律？
        </p>
      </motion.div>
    </SlideContent>
  </Slide>
);

const LeadInSlide = ({ isActive }) => (
  <Slide isActive={isActive}>
    <SlideTitle>手机相册的秘密</SlideTitle>
    <SlideContent>
      <div className="responsive-flex-container" style={{ display: 'flex', gap: '4rem', alignItems: 'center', width: '90%', maxWidth: '1200px' }}>
        <div className="glass-panel" style={{ padding: '3rem', flex: 1 }}>
          <h3 style={{ fontSize: '2rem', color: 'var(--accent-purple)' }}>你在相册里搜索过“猫”吗？</h3>
          <p style={{ fontSize: '1.5rem', lineHeight: 1.8, color: 'var(--text-secondary)', margin: '2rem 0' }}>
            如果你没有给照片打标签，手机为什么知道照片里有猫？<br/>
            AI 是不是像人一样“一眼认出来”？
          </p>
          <div style={{ background: 'var(--overlay-light)', padding: '1.5rem', borderRadius: '12px' }}>
            <strong style={{ fontSize: '1.3rem', color: 'var(--accent-cyan)' }}>其实，机器看到的第一眼，根本不是猫。</strong>
          </div>
        </div>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <img src="/images/digital_cat.png" alt="Digital Cat Vision" style={{ width: '100%', maxWidth: '400px', borderRadius: '16px', boxShadow: '0 0 30px rgba(176, 38, 255, 0.3)', border: '1px solid rgba(176, 38, 255, 0.2)' }} />
        </div>
      </div>
    </SlideContent>
  </Slide>
);

const PixelFeatureSlide = ({ isActive }) => {
  const [hoveredPixel, setHoveredPixel] = useState(null);
  
  // Create an 8x8 grid that roughly looks like an eye center (dark middle, colored iris, white sclera)
  const generateEyeGrid = () => {
    const grid = [];
    for(let r=0; r<8; r++) {
      for(let c=0; c<8; c++) {
        let color = [255, 255, 255]; // white sclera
        // Pupil
        if((r===3 || r===4) && (c===3 || c===4)) color = [20, 20, 20];
        // Iris (blue/greenish)
        else if(r>=2 && r<=5 && c>=2 && c<=5) color = [40, 160, 180];
        // Eyelid/skin shadow
        else if(r===0 || r===7) color = [240, 200, 180];
        
        // Add some noise
        color = color.map(v => Math.min(255, Math.max(0, v + Math.floor(Math.random()*20 - 10))));
        grid.push({ r, c, color });
      }
    }
    return grid;
  };
  
  const [pixels] = useState(generateEyeGrid());

  return (
    <Slide isActive={isActive}>
      <SlideTitle>从像素到特征</SlideTitle>
      <SlideContent>
        <div className="responsive-flex-container" style={{ display: 'flex', gap: '2rem', width: '90%', maxWidth: '1200px' }}>
          <div className="glass-panel" style={{ padding: '2rem', flex: 1, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h3 style={{ color: 'var(--accent-purple)', fontSize: '1.8rem', marginTop: 0 }}>图片 = 像素数字矩阵</h3>
            
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '1rem' }}>
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
              
              <div style={{ width: '150px', height: '120px', background: 'rgba(0,0,0,0.4)', borderRadius: '12px', border: '1px solid var(--border-glass)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                {hoveredPixel ? (
                  <>
                    <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: `rgb(${hoveredPixel.color[0]}, ${hoveredPixel.color[1]}, ${hoveredPixel.color[2]})`, marginBottom: '0.5rem', border: '2px solid var(--text-primary)' }} />
                    <div style={{ fontSize: '1.2rem', color: 'var(--accent-cyan)', fontFamily: 'monospace' }}>
                      R: {hoveredPixel.color[0]}<br/>
                      G: {hoveredPixel.color[1]}<br/>
                      B: {hoveredPixel.color[2]}
                    </div>
                  </>
                ) : (
                  <div style={{ color: 'var(--text-tertiary)', fontSize: '1.1rem' }}>悬停查看 RGB</div>
                )}
              </div>
            </div>
            
            <div style={{ marginTop: '1rem', padding: '1rem', background: 'var(--overlay-light)', borderRadius: '8px', border: '1px dashed var(--text-tertiary)', textAlign: 'left' }}>
              <strong style={{ color: 'var(--accent-cyan)', fontSize: '1.1rem' }}>📱 震撼的数据量</strong>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', margin: '0.5rem 0 0 0', lineHeight: 1.5 }}>
                手机随便拍一张照片（比如 1080×1920 分辨率），等于 <strong>207 万</strong>个方块。每个方块有 RGB 三个数字，机器一瞬间要处理 <strong>600 多万个数字</strong>！
              </p>
            </div>
          </div>
          
          <div className="glass-panel" style={{ padding: '2rem', flex: 1.2 }}>
            <h3 style={{ color: 'var(--accent-cyan)', fontSize: '1.8rem', marginTop: 0 }}>特征 (Features) 提取</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem' }}>AI 需要从孤立的数字中找到有意义的“组合”。</p>
            <ul style={{ fontSize: '1.3rem', lineHeight: 2.2, color: 'var(--text-primary)' }}>
              <li><strong style={{ color: 'var(--accent-purple)' }}>低级特征：</strong>相邻像素的突变（边缘、线条）</li>
              <li><strong style={{ color: 'var(--accent-cyan)' }}>中级特征：</strong>多条线组成的形状（圆形、尖角）</li>
              <li><strong style={{ color: 'var(--accent-green)' }}>高级特征：</strong>多个形状组成的部位（猫耳朵、猫眼睛）</li>
            </ul>
            
            {/* Deep Dive Panel */}
            <div style={{ marginTop: '1rem', padding: '1.2rem', background: 'var(--overlay-light)', borderRadius: '8px', border: '1px dashed var(--text-tertiary)' }}>
              <strong style={{ color: 'var(--accent-green)', fontSize: '1.1rem' }}>🔬 硬核拆解：卷积神经网络 (CNN)</strong>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', margin: '0.5rem 0 0 0', lineHeight: 1.5 }}>
                这么多数字怎么看？科学家发明了 CNN。它就像你拿着一个<strong>“会算数的放大镜”</strong>，在图片上从左到右、从上到下一点点扫描。这把放大镜能专门过滤出“竖线”、“横线”或者“红颜色”，一层一层网筛，最后拼出猫的轮廓！
              </p>
            </div>
          </div>
        </div>
      </SlideContent>
    </Slide>
  );
};

const GoodFeatureSlide = ({ isActive }) => {
  const [activeTab, setActiveTab] = useState('fur');

  return (
    <Slide isActive={isActive}>
      <SlideTitle>什么是“好特征”？</SlideTitle>
      <SlideContent>
        <div className="responsive-flex-container" style={{ width: '90%', maxWidth: '1100px', display: 'flex', gap: '2rem' }}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-around', background: 'var(--overlay-light)' }}>
              <span style={{ fontSize: '1.3rem', color: 'var(--accent-green)' }}>✅ 有区分度</span>
              <span style={{ fontSize: '1.3rem', color: 'var(--accent-cyan)' }}>✅ 稳定/抗干扰</span>
            </div>
            
            <div className="glass-panel" style={{ padding: '2rem' }}>
              <h3 style={{ marginTop: 0, color: 'var(--accent-purple)' }}>测试：这些特征用来认猫好不好？</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
                <button onMouseEnter={() => setActiveTab('legs')} style={{ textAlign: 'left', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-glass)', background: activeTab === 'legs' ? 'rgba(255,51,102,0.1)' : 'transparent', color: 'var(--text-primary)', cursor: 'pointer' }}>
                  <strong style={{ fontSize: '1.3rem' }}>四条腿：</strong> <span style={{ color: 'var(--accent-red)' }}>太宽泛 (没有区分度)</span>
                </button>
                <button onMouseEnter={() => setActiveTab('fur')} style={{ textAlign: 'left', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-glass)', background: activeTab === 'fur' ? 'rgba(255,51,102,0.1)' : 'transparent', color: 'var(--text-primary)', cursor: 'pointer' }}>
                  <strong style={{ fontSize: '1.3rem' }}>黄棕毛色：</strong> <span style={{ color: 'var(--accent-red)' }}>极其脆弱 (不稳定)</span>
                </button>
                <button onMouseEnter={() => setActiveTab('whisker')} style={{ textAlign: 'left', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-glass)', background: activeTab === 'whisker' ? 'rgba(0,255,102,0.1)' : 'transparent', color: 'var(--text-primary)', cursor: 'pointer' }}>
                  <strong style={{ fontSize: '1.3rem' }}>猫须/尖耳朵：</strong> <span style={{ color: 'var(--accent-green)' }}>较好 (强特征)</span>
                </button>
              </div>
            </div>
          </div>
          
          <div className="glass-panel" style={{ flex: 1, padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '350px' }}>
            {activeTab === 'legs' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '6rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                  🐱 🐶 🐰 🐄
                </div>
                <h4 style={{ color: 'var(--accent-red)', fontSize: '1.5rem' }}>误判风险极高！</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem' }}>狗、兔子、牛全都有四条腿，模型会把它们全认成猫。</p>
              </motion.div>
            )}
            {activeTab === 'fur' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: 'center' }}>
                <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center' }}>
                  <div style={{ background: '#ffa500', padding: '2rem', borderRadius: '12px', fontSize: '4rem' }}>🐱</div>
                  <div style={{ filter: 'grayscale(100%)', background: '#ffa500', padding: '2rem', borderRadius: '12px', fontSize: '4rem' }}>🐱</div>
                </div>
                <h4 style={{ color: 'var(--accent-red)', fontSize: '1.5rem' }}>环境变化导致失效！</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem' }}>一旦变成黑白照片，或者在幽暗灯光下，这个特征就彻底不存在了（漏判）。</p>
              </motion.div>
            )}
            {activeTab === 'whisker' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '6rem', display: 'flex', gap: '1rem', justifyContent: 'center', filter: 'blur(2px)' }}>
                  🐱 😼 😽
                </div>
                <h4 style={{ color: 'var(--accent-green)', fontSize: '1.5rem' }}>轮廓稳定！</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem' }}>即便图片模糊或者失去色彩，耳朵的形状和胡须的线条依然能被检测到。</p>
              </motion.div>
            )}
          </div>
        </div>
      </SlideContent>
    </Slide>
  );
};

const TaskRuleSlide = ({ isActive }) => (
  <Slide isActive={isActive}>
    <SlideTitle>外星人的地球图鉴</SlideTitle>
    <SlideContent>
      <div className="glass-panel" style={{ padding: '3rem', maxWidth: '800px', textAlign: 'center' }}>
        <h3 style={{ fontSize: '2rem', color: 'var(--accent-cyan)' }}>小组任务</h3>
        <p style={{ fontSize: '1.5rem', lineHeight: 1.8, color: 'var(--text-secondary)' }}>
          为外星人写动物图鉴标签：<br/>
          每组选 3 种动物，写出 3 个关键特征。<br/>
          <strong style={{ color: 'var(--accent-red)' }}>必须故意放 1 个“坏标签”进去。</strong>
        </p>
        <div style={{ padding: '1.5rem', background: 'var(--overlay-light)', borderRadius: '12px', marginTop: '2rem' }}>
          测试：与旁边的组交换，看别人能不能凭你们的标签猜出来！
        </div>
      </div>
    </SlideContent>
  </Slide>
);

const FeatureStoreSlide = ({ isActive }) => {
  const allFeatures = [
    { id: 'whisker', name: '猫须检测器', cost: 4, type: '稳健' },
    { id: 'ears', name: '尖耳轮廓仪', cost: 4, type: '稳健' },
    { id: 'face', name: '圆脸识别模块', cost: 3, type: '中等' },
    { id: 'furColor', name: '橘毛过滤器', cost: 2, type: '脆弱' },
    { id: 'legs', name: '四腿计数器', cost: 1, type: '宽泛' },
  ];

  const [budget, setBudget] = useState(8);
  const [selected, setSelected] = useState([]);
  const [testMode, setTestMode] = useState(false);
  const [revealedCards, setRevealedCards] = useState({}); // {0: true, 1: true}

  const toggleFeature = (feat) => {
    if (testMode) return;
    if (selected.includes(feat.id)) {
      setSelected(selected.filter(id => id !== feat.id));
      setBudget(budget + feat.cost);
    } else {
      if (budget >= feat.cost) {
        setSelected([...selected, feat.id]);
        setBudget(budget - feat.cost);
      }
    }
  };

  const calculateScore = (animal) => {
    let score = 0;
    if (selected.includes('whisker') && animal.hasWhisker) score += 3;
    if (selected.includes('ears') && animal.hasEars) score += 3;
    if (selected.includes('face') && animal.isRound) score += 2;
    if (selected.includes('furColor') && animal.isOrange) score += 2;
    if (selected.includes('legs') && animal.hasFourLegs) score += 1;
    return score;
  };

  const threshold = 5; // Needs 5 points to be classified as cat

  const testCases = [
    { name: '橘猫', emoji: '🐱', type: 'cat', hasWhisker: true, hasEars: true, isRound: true, isOrange: true, hasFourLegs: true },
    { name: '黑白猫', emoji: '🐈‍⬛', type: 'cat', hasWhisker: true, hasEars: true, isRound: true, isOrange: false, hasFourLegs: true },
    { name: '哈士奇', emoji: '🐶', type: 'dog', hasWhisker: false, hasEars: true, isRound: false, isOrange: false, hasFourLegs: true },
  ];

  const toggleTestMode = () => {
    setTestMode(!testMode);
    setRevealedCards({});
  };

  const revealCard = (idx) => {
    setRevealedCards({ ...revealedCards, [idx]: true });
  };

  return (
    <Slide isActive={isActive}>
      <SlideTitle>AI 鉴定所 (特征购买与测试)</SlideTitle>
      <SlideContent>
        <div style={{ width: '90%', maxWidth: '1200px', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* Shop Header */}
          <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '1.5rem' }}>{testMode ? '盲盒测试集' : '训练你的模型 (搭配出最优特征组合)'}</span>
            <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
              <span style={{ fontSize: '1.8rem', fontWeight: 700, color: budget > 0 ? 'var(--accent-green)' : 'var(--accent-red)' }}>
                剩余算力币: 🪙 {budget}
              </span>
              <button 
                onClick={toggleTestMode}
                style={{ padding: '0.8rem 2rem', fontSize: '1.2rem', fontWeight: 'bold', background: testMode ? 'var(--accent-purple)' : 'var(--accent-cyan)', color: testMode ? '#fff' : '#000', border: 'none', borderRadius: '8px', cursor: 'pointer', transition: 'var(--transition-fast)' }}
              >
                {testMode ? '返回重训' : '进入测试集 ->'}
              </button>
            </div>
          </div>

          {!testMode ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1rem' }}>
                {allFeatures.map(f => (
                  <motion.div 
                    key={f.id} 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toggleFeature(f)}
                    className="glass-panel"
                    style={{ 
                      padding: '1.5rem', 
                      cursor: 'pointer', 
                      border: selected.includes(f.id) ? '2px solid var(--accent-cyan)' : '1px solid var(--border-glass)',
                      background: selected.includes(f.id) ? 'var(--overlay-medium)' : 'var(--bg-glass)',
                      opacity: (!selected.includes(f.id) && budget < f.cost) ? 0.5 : 1
                    }}>
                    <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.2rem' }}>{f.name}</h4>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                      <span>🪙 {f.cost}</span>
                      <span style={{ fontSize: '0.9rem', padding: '0.2rem 0.5rem', background: 'var(--overlay-medium)', borderRadius: '4px' }}>{f.type}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="glass-panel" style={{ padding: '1.5rem', minHeight: '120px', display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>已装备特征 (特征融合中心)：</span>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  {selected.length === 0 && <span style={{ color: 'var(--text-tertiary)', fontStyle: 'italic' }}>暂无特征，模型处于“瞎子”状态</span>}
                  {selected.map(id => {
                    const f = allFeatures.find(x => x.id === id);
                    return (
                      <motion.div 
                        initial={{ scale: 0, opacity: 0 }} 
                        animate={{ scale: 1, opacity: 1 }} 
                        key={id} 
                        style={{ padding: '0.8rem 1.5rem', background: 'var(--accent-cyan)', color: '#000', borderRadius: '30px', fontWeight: 'bold' }}
                      >
                        {f.name}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
              {testCases.map((tc, idx) => {
                const score = calculateScore(tc);
                const isPredictedCat = score >= threshold;
                const isActuallyCat = tc.type === 'cat';
                
                let resultText = '';
                let resultColor = '';
                let resultIcon = '';
                
                if (isPredictedCat && isActuallyCat) { resultText = '正确识别'; resultColor = 'var(--accent-green)'; resultIcon = '✅'; }
                else if (!isPredictedCat && !isActuallyCat) { resultText = '正确排除'; resultColor = 'var(--accent-green)'; resultIcon = '✅'; }
                else if (isPredictedCat && !isActuallyCat) { resultText = '误判为猫'; resultColor = 'var(--accent-red)'; resultIcon = '❌'; }
                else if (!isPredictedCat && isActuallyCat) { resultText = '漏判没认出'; resultColor = 'var(--accent-red)'; resultIcon = '❌'; }

                const isRevealed = revealedCards[idx];

                return (
                  <div key={idx} style={{ perspective: '1000px', height: '320px' }}>
                    <motion.div 
                      onClick={() => !isRevealed && revealCard(idx)}
                      animate={{ rotateY: isRevealed ? 180 : 0 }}
                      transition={{ duration: 0.6, type: 'spring' }}
                      style={{ 
                        width: '100%', height: '100%', 
                        position: 'relative', 
                        transformStyle: 'preserve-3d', 
                        cursor: isRevealed ? 'default' : 'pointer'
                      }}
                    >
                      {/* Front of Card (Unrevealed) */}
                      <div className="glass-panel" style={{ 
                        position: 'absolute', width: '100%', height: '100%', backfaceVisibility: 'hidden', 
                        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                        background: 'var(--gradient-primary)', border: '2px dashed var(--text-tertiary)'
                      }}>
                        <span style={{ fontSize: '4rem' }}>❓</span>
                        <h3 style={{ marginTop: '1rem', color: 'var(--text-primary)' }}>点击鉴定</h3>
                        <span style={{ color: 'var(--text-secondary)' }}>测试样本 {idx + 1}</span>
                      </div>

                      {/* Back of Card (Revealed) */}
                      <div className="glass-panel" style={{ 
                        position: 'absolute', width: '100%', height: '100%', backfaceVisibility: 'hidden', 
                        transform: 'rotateY(180deg)',
                        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                        borderTop: `6px solid ${resultColor}`,
                        boxShadow: `0 10px 30px ${resultColor}33`
                      }}>
                        <div style={{ fontSize: '5rem', marginBottom: '0.5rem' }}>{tc.emoji}</div>
                        <h3 style={{ margin: '0 0 1rem 0' }}>{tc.name}</h3>
                        <div style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                          得分：{score} / {threshold}
                        </div>
                        <div style={{ padding: '0.8rem 1.5rem', background: 'var(--overlay-light)', borderRadius: '8px', color: resultColor, fontWeight: 'bold', fontSize: '1.3rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          {resultIcon} {resultText}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </motion.div>
          )}

          {testMode && Object.keys(revealedCards).length === testCases.length && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: 'center', marginTop: '1rem', color: 'var(--text-primary)', fontSize: '1.3rem', background: 'var(--overlay-medium)', padding: '1rem', borderRadius: '12px' }}>
              <strong>复盘提示：</strong>如果发生了<span style={{ color: 'var(--accent-red)' }}>误判</span>，说明你买了太“宽泛”的特征；发生<span style={{ color: 'var(--accent-red)' }}>漏判</span>，说明你依赖了太“脆弱”的特征。
            </motion.div>
          )}
        </div>
      </SlideContent>
    </Slide>
  );
};

const ErrorAnalysisSlide = ({ isActive }) => (
  <Slide isActive={isActive}>
    <SlideTitle>误判复盘</SlideTitle>
    <SlideContent>
      <div style={{ width: '90%', maxWidth: '1000px' }}>
        <p style={{ textAlign: 'center', fontSize: '1.5rem', marginBottom: '2rem' }}>
          为什么测试集上会错？错误让我们看清模型到底学了什么。
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem' }}>
          <div className="glass-panel" style={{ padding: '2rem' }}>
            <h4 style={{ color: 'var(--accent-red)', fontSize: '1.4rem', marginTop: 0 }}>误判 (把狗当猫)</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>原因：选了太多宽泛特征（四条腿、有毛）。</p>
          </div>
          <div className="glass-panel" style={{ padding: '2rem' }}>
            <h4 style={{ color: 'var(--accent-cyan)', fontSize: '1.4rem', marginTop: 0 }}>漏判 (没认出模糊猫)</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>原因：判定线太严格，或依赖了模糊时看不清的细节。</p>
          </div>
          <div className="glass-panel" style={{ padding: '2rem' }}>
            <h4 style={{ color: 'var(--accent-purple)', fontSize: '1.4rem', marginTop: 0 }}>脆弱特征失效</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>原因：黑白照片让“毛色”特征完全失效。</p>
          </div>
        </div>
      </div>
    </SlideContent>
  </Slide>
);

const MLStructureSlide = ({ isActive }) => (
  <Slide isActive={isActive}>
    <SlideTitle>机器学习四件套</SlideTitle>
    <SlideContent>
      <div className="glass-panel" style={{ padding: '2rem', width: '80%', maxWidth: '900px' }}>
        <table style={{ width: '100%', fontSize: '1.4rem', textAlign: 'left', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--overlay-heavy)' }}>
              <th style={{ padding: '1rem', color: 'var(--accent-cyan)' }}>猫识别机</th>
              <th style={{ padding: '1rem', color: 'var(--accent-purple)' }}>机器学习概念</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid var(--overlay-medium)' }}>
              <td style={{ padding: '1rem' }}>猫 A、狗、兔子等旧图片</td>
              <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>样本 (Samples)</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--overlay-medium)' }}>
              <td style={{ padding: '1rem' }}>胡须、尖耳朵、圆脸</td>
              <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>特征 (Features)</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--overlay-medium)' }}>
              <td style={{ padding: '1rem' }}>图片背后标注的“是猫/不是猫”</td>
              <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>标签 (Labels)</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--overlay-medium)' }}>
              <td style={{ padding: '1rem' }}>判定线及特征组合规则</td>
              <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>模型 (Model)</td>
            </tr>
            <tr>
              <td style={{ padding: '1rem' }}>用来检验的新图片（如模糊猫）</td>
              <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>测试集 (Test Set)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </SlideContent>
  </Slide>
);

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
      <SlideTitle>机器学习黑箱：找寻规律</SlideTitle>
      <SlideContent>
        <div className="responsive-flex-container" style={{ display: 'flex', gap: '2rem', width: '90%', maxWidth: '1100px', height: '100%' }}>
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
              <button onClick={() => setRevealed(r => r + 1)} style={{ width: '100%', padding: '1.2rem', marginTop: '1.5rem', borderRadius: '8px', border: 'none', background: 'var(--accent-purple)', color: '#fff', cursor: 'pointer', fontWeight: 'bold', fontSize: '1.2rem', transition: 'all 0.3s' }}>
                揭示下一条样本 ({revealed}/{samples.length})
              </button>
            ) : (
              <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(0, 255, 102, 0.1)', color: 'var(--accent-green)', borderRadius: '8px', textAlign: 'center', fontWeight: 'bold' }}>
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

const GeneralizationSlide = ({ isActive }) => (
  <Slide isActive={isActive}>
    <SlideTitle>泛化挑战：新样本测试</SlideTitle>
    <SlideContent>
      <div className="responsive-flex-container" style={{ display: 'flex', gap: '2rem', width: '90%', maxWidth: '1200px' }}>
        {/* Left: Test Case and Concept */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className="glass-panel" style={{ padding: '2.5rem', textAlign: 'center', borderTop: '4px solid var(--accent-cyan)' }}>
            <h3 style={{ marginTop: 0, fontSize: '1.8rem', color: 'var(--accent-cyan)' }}>🧪 考考你的规则能“泛化”吗？</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem' }}>现在来了一只拥有以下特征的新神秘动物，它是猫吗？</p>
            
            <div style={{ padding: '1.5rem', background: 'var(--overlay-light)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem', margin: '1.5rem 0' }}>
              <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                {['胡须', '长尾', '四腿'].map((f, i) => (
                  <span key={i} style={{ padding: '0.5rem 1rem', borderRadius: '4px', background: 'var(--overlay-heavy)', fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>{f}</span>
                ))}
              </div>
              <strong style={{ fontSize: '2.2rem', color: 'var(--accent-purple)' }}>➡️ ？(是猫 / 不是猫)</strong>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', margin: 0 }}>
              （真实答案：<span style={{ color: 'var(--accent-red)', fontWeight: 'bold' }}>不是猫</span>，因为核心特征只命中了“胡须”1个，没有达到2个核心特征的判定线。比如它可能是一只松鼠。）
            </p>
          </div>
          
          <div className="glass-panel" style={{ padding: '2rem', background: 'rgba(34, 211, 238, 0.05)', border: '1px solid var(--accent-cyan)' }}>
            <h4 style={{ margin: '0 0 0.8rem 0', color: 'var(--accent-cyan)', fontSize: '1.4rem' }}>🌟 什么是“泛化能力 (Generalization)”？</h4>
            <p style={{ fontSize: '1.2rem', lineHeight: 1.8, margin: 0, color: 'var(--text-secondary)' }}>
              机器学习的目的，<strong>绝对不是死记硬背旧样本</strong>，而是要从旧样本中抽取出真正通用的规律，用来准确预测从未见过的<strong>新样本</strong>。这种举一反三的能力就是“泛化”。
            </p>
          </div>
        </div>
        
        {/* Right: Metaphors */}
        <div className="glass-panel" style={{ flex: 1.1, padding: '2.5rem', borderTop: '4px solid var(--accent-purple)' }}>
          <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '1.8rem', color: 'var(--accent-purple)' }}>当模型“学习方法”出错时...</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* Overfitting */}
            <div style={{ padding: '1.2rem', background: 'rgba(255,51,102,0.05)', borderRadius: '10px', borderLeft: '4px solid var(--accent-red)', border: '1px dashed var(--border-glass)' }}>
              <strong style={{ fontSize: '1.3rem', color: 'var(--accent-red)' }}>🤯 过拟合 (Overfitting) — “死记硬背的偏科生”</strong>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', margin: '0.5rem 0 0 0', lineHeight: 1.6 }}>
                <strong>行为：</strong>在训练集（旧样本）上拿了 100 分，但在测试集上考了 0 分。<br/>
                <strong>原因：</strong>模型学习得太“死板”了。它把偶然出现的“干扰噪声”（比如“长尾”、“四腿”）也背成了绝对铁律（误以为“有长尾的就是猫”）。一旦碰到没有见过的新样本，立马就会翻车。
              </p>
            </div>
            
            {/* Underfitting */}
            <div style={{ padding: '1.2rem', background: 'var(--overlay-light)', borderRadius: '10px', borderLeft: '4px solid var(--text-tertiary)', border: '1px dashed var(--border-glass)' }}>
              <strong style={{ fontSize: '1.3rem', color: 'var(--text-primary)' }}>🥱 欠拟合 (Underfitting) — “还没睡醒的懒学生”</strong>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', margin: '0.5rem 0 0 0', lineHeight: 1.6 }}>
                <strong>行为：</strong>不论是做练习题（训练集）还是上考场（测试集），分数都低得惨不忍睹。<br/>
                <strong>原因：</strong>模型根本没有心思学习，连最基本的规律（“尖耳”、“胡须”）都没有发现。比如胡乱得出一个“所有动物都是猫”的偷懒结论。
              </p>
            </div>
 
          </div>
        </div>
      </div>
    </SlideContent>
  </Slide>
);


export const Lesson2 = ({ onGoHome }) => {
  const slides = [
    CoverSlide,
    LeadInSlide,
    PixelFeatureSlide,
    GoodFeatureSlide,
    TaskRuleSlide,
    FeatureStoreSlide,
    ErrorAnalysisSlide,
    MLStructureSlide,
    BlackboxSlide,
    GeneralizationSlide
  ];

  return <Presentation slides={slides} onGoHome={onGoHome} />;
};
