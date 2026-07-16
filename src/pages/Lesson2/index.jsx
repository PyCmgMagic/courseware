import { useState } from 'react';
import { Presentation } from '../../components/Presentation';
import { Slide, SlideTitle, SlideContent } from '../../components/Slide';
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

const LeadInSlide = ({ isActive }) => (
  <Slide isActive={isActive}>
    <SlideTitle>手机相册为什么能搜出“猫”？</SlideTitle>
    <SlideContent>
      <div style={{ width: '92%', maxWidth: '1160px' }}>
        <div className="responsive-flex-container" style={{ display: 'flex', gap: 'clamp(1.2rem, 3vw, 3rem)', alignItems: 'center' }}>
          <div className="glass-panel" style={{ padding: 'clamp(1.2rem, 2.5vw, 2.4rem)', flex: 1.2 }}>
          <h3 style={{ fontSize: 'clamp(1.35rem, 2.1vw, 1.9rem)', color: 'var(--accent-purple)', marginTop: 0 }}>先做一个思想实验</h3>
          <p style={{ fontSize: 'clamp(0.95rem, 1.5vw, 1.25rem)', lineHeight: 1.7, color: 'var(--text-secondary)', margin: 'clamp(0.7rem, 1.5vh, 1.2rem) 0' }}>
            如果你没有给照片打标签，手机为什么知道照片里有猫？<br/>
            AI 是不是像人一样“一眼认出来”？
          </p>
          <div style={{ background: 'var(--overlay-light)', padding: 'clamp(0.8rem, 1.4vw, 1.2rem)', borderRadius: '12px', lineHeight: 1.6 }}>
            <strong style={{ fontSize: 'clamp(1rem, 1.5vw, 1.2rem)', color: 'var(--accent-cyan)' }}>机器看到的第一眼不是“猫”，而是一张由数字组成的像素表。</strong>
            <div style={{ marginTop: '0.45rem', color: 'var(--text-secondary)' }}>它必须先把像素中的边缘、纹理、形状等线索提取出来，再用训练样本学到的规律做判断。</div>
          </div>
        </div>
          <div style={{ flex: 0.8, display: 'flex', justifyContent: 'center' }}>
            <img src="/images/digital_cat.png" alt="Digital Cat Vision" style={{ width: '100%', maxWidth: '350px', borderRadius: '16px', boxShadow: '0 0 30px rgba(176, 38, 255, 0.3)', border: '1px solid rgba(176, 38, 255, 0.2)' }} />
          </div>
        </div>
        <div className="glass-panel" style={{ marginTop: 'clamp(0.8rem, 1.8vh, 1.3rem)', padding: 'clamp(0.8rem, 1.4vw, 1.2rem)', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.6rem', textAlign: 'center' }}>
          {['① 像素：机器看见什么', '② 特征：哪些线索有用', '③ 样本：怎样学出规则', '④ 泛化：新图片能否认对'].map((step, index) => (
            <div key={step} style={{ padding: '0.65rem', borderRadius: '8px', background: index % 2 ? 'rgba(192,132,252,0.08)' : 'rgba(34,211,238,0.08)', fontSize: 'clamp(0.78rem, 1.15vw, 0.98rem)', fontWeight: 700 }}>{step}</div>
          ))}
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
          
          <div className="glass-panel" style={{ padding: 'clamp(0.8rem, 1.5vw, 1.3rem)', flex: 1.2 }}>
            <h3 style={{ color: 'var(--accent-cyan)', fontSize: 'clamp(1.2rem, 1.9vw, 1.55rem)', margin: '0 0 0.55rem' }}>像素怎样一步步变成“猫”？</h3>
            <img src="/images/vision_pipeline.png" alt="猫照片从像素、边缘特征到识别结果的过程图" className="teaching-visual" style={{ maxHeight: 'min(27vh, 195px)' }} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.45rem', marginTop: '0.6rem' }}>
              {[['低级', '边缘、线条'], ['中级', '圆形、尖角'], ['高级', '猫耳、猫眼']].map(([level, text], index) => (
                <div key={level} style={{ padding: '0.55rem', borderRadius: '8px', background: 'var(--overlay-light)', textAlign: 'center', fontSize: 'clamp(0.7rem, 1vw, 0.86rem)', color: index === 0 ? 'var(--accent-purple)' : index === 1 ? 'var(--accent-cyan)' : 'var(--accent-green)' }}><strong>{level}特征</strong><br/><span style={{ color: 'var(--text-secondary)' }}>{text}</span></div>
              ))}
            </div>
            <div style={{ marginTop: '0.6rem', padding: '0.7rem', background: 'var(--overlay-light)', borderRadius: '8px', border: '1px dashed var(--text-tertiary)', fontSize: 'clamp(0.72rem, 1.05vw, 0.9rem)', lineHeight: 1.45, color: 'var(--text-secondary)' }}>
              <strong style={{ color: 'var(--accent-green)' }}>CNN 像“会算数的放大镜”：</strong>从局部像素找线条，再把线条组合成形状和部位，最后形成整只猫的判断。
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
        <div className="responsive-flex-container" style={{ width: '92%', maxWidth: '1160px', display: 'flex', gap: 'clamp(0.8rem, 1.5vw, 1.3rem)' }}>
          <figure className="glass-panel" style={{ flex: 1.12, margin: 0, padding: 'clamp(0.65rem, 1.1vw, 0.9rem)', borderTop: '4px solid var(--accent-cyan)', display: 'flex', flexDirection: 'column' }}>
            <img src="/images/feature_comparison.png" alt="猫狗兔的耳朵、胡须、口鼻和毛发等特征对比" className="teaching-visual" style={{ maxHeight: 'min(43vh, 325px)', height: '100%' }} />
            <figcaption style={{ marginTop: '0.55rem', color: 'var(--text-secondary)', fontSize: 'clamp(0.74rem, 1.05vw, 0.9rem)', lineHeight: 1.45 }}><strong style={{ color: 'var(--accent-cyan)' }}>看图：</strong>“都有毛、都有四条腿”只能说明它们相似；耳朵形状、胡须和口鼻轮廓更能把类别分开。</figcaption>
          </figure>
          <div style={{ flex: 0.88, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            <div className="glass-panel" style={{ padding: '0.75rem', display: 'flex', justifyContent: 'space-around', background: 'var(--overlay-light)', fontSize: 'clamp(0.78rem, 1.15vw, 0.98rem)' }}><span style={{ color: 'var(--accent-green)' }}>✅ 有区分度</span><span style={{ color: 'var(--accent-cyan)' }}>✅ 稳定抗干扰</span></div>
            <div className="glass-panel" style={{ padding: 'clamp(0.8rem, 1.4vw, 1.1rem)' }}>
              <h3 style={{ margin: '0 0 0.6rem', color: 'var(--accent-purple)', fontSize: 'clamp(0.95rem, 1.45vw, 1.2rem)' }}>把鼠标移到特征上，判断它好不好</h3>
              <div style={{ display: 'grid', gap: '0.45rem' }}>
                {[['legs','四条腿','没有区分度：很多动物都有'],['fur','黄棕毛色','不稳定：光线和黑白照片会改变颜色'],['whisker','猫须 / 尖耳朵','较强：形状轮廓更稳定']].map(([key,title,note]) => <button key={key} onMouseEnter={() => setActiveTab(key)} style={{ textAlign: 'left', padding: '0.65rem 0.75rem', borderRadius: '8px', border: `1px solid ${activeTab === key ? (key === 'whisker' ? 'var(--accent-green)' : 'var(--accent-red)') : 'var(--border-glass)'}`, background: activeTab === key ? (key === 'whisker' ? 'rgba(0,255,102,0.1)' : 'rgba(255,51,102,0.1)') : 'transparent', color: 'var(--text-primary)', cursor: 'pointer', fontSize: 'clamp(0.74rem, 1.05vw, 0.9rem)' }}><strong>{title}：</strong><span style={{ color: 'var(--text-secondary)' }}>{note}</span></button>)}
              </div>
            </div>
            <motion.div key={activeTab} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="glass-panel" style={{ padding: '0.8rem', borderLeft: `4px solid ${activeTab === 'whisker' ? 'var(--accent-green)' : 'var(--accent-red)'}`, color: 'var(--text-secondary)', fontSize: 'clamp(0.76rem, 1.1vw, 0.94rem)', lineHeight: 1.5 }}><strong style={{ color: activeTab === 'whisker' ? 'var(--accent-green)' : 'var(--accent-red)' }}>{activeTab === 'legs' ? '误判风险高：' : activeTab === 'fur' ? '环境一变就失效：' : '轮廓更可靠：'}</strong>{activeTab === 'legs' ? '狗、兔子、牛也有四条腿，单靠它无法认猫。' : activeTab === 'fur' ? '换成黑白照片或昏暗环境，颜色特征就可能消失。' : '即使颜色改变或略微模糊，耳形和胡须线条往往仍可检测。'}</motion.div>
            <div style={{ padding: '0.65rem 0.8rem', border: '1px dashed var(--accent-green)', borderRadius: '8px', color: 'var(--text-secondary)', fontSize: 'clamp(0.72rem, 1.02vw, 0.88rem)', lineHeight: 1.45 }}><strong style={{ color: 'var(--accent-green)' }}>知识结论：</strong>模型通常不会只靠一个特征，而会综合多条线索；强特征越稳定、越能区分类别，泛化越好。</div>
          </div>
        </div>
      </SlideContent>
    </Slide>
  );
};

const TaskRuleSlide = ({ isActive }) => (
  <Slide isActive={isActive}>
    <SlideTitle>课堂实验：什么样的特征才真的有用？</SlideTitle>
    <SlideContent>
      <div style={{ width: '92%', maxWidth: '1120px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: 'clamp(0.8rem, 1.7vw, 1.5rem)' }}>
          <div className="glass-panel" style={{ padding: 'clamp(1.2rem, 2.2vw, 2rem)', borderTop: '4px solid var(--accent-cyan)' }}>
            <h3 style={{ fontSize: 'clamp(1.3rem, 2vw, 1.7rem)', color: 'var(--accent-cyan)', marginTop: 0 }}>👽 外星人的地球图鉴</h3>
            <ol style={{ fontSize: 'clamp(0.9rem, 1.35vw, 1.1rem)', lineHeight: 1.8, color: 'var(--text-secondary)', margin: 0, paddingLeft: '1.4rem' }}>
              <li>每组选 3 种动物，为每种动物写出 3 个特征。</li>
              <li>特征必须能让没看过图片的“外星人”作出判断。</li>
              <li><strong style={{ color: 'var(--accent-red)' }}>故意混入 1 个坏特征</strong>，如颜色、背景或“四条腿”。</li>
              <li>与邻组交换图鉴，只看特征猜动物，并记录误判。</li>
            </ol>
          </div>
          <div className="glass-panel" style={{ padding: 'clamp(1.2rem, 2.2vw, 2rem)', borderTop: '4px solid var(--accent-purple)' }}>
            <h3 style={{ fontSize: 'clamp(1.2rem, 1.8vw, 1.55rem)', color: 'var(--accent-purple)', marginTop: 0 }}>🔎 观察记录</h3>
            <div style={{ display: 'grid', gap: '0.65rem', fontSize: 'clamp(0.85rem, 1.25vw, 1.03rem)', color: 'var(--text-secondary)' }}>
              <div style={{ padding: '0.75rem', background: 'var(--overlay-light)', borderRadius: '8px' }}><strong>区分度：</strong>别的动物也常有吗？</div>
              <div style={{ padding: '0.75rem', background: 'var(--overlay-light)', borderRadius: '8px' }}><strong>稳定性：</strong>换角度、光线后还成立吗？</div>
              <div style={{ padding: '0.75rem', background: 'var(--overlay-light)', borderRadius: '8px' }}><strong>误判类型：</strong>把不是猫判成猫，还是漏掉了真猫？</div>
            </div>
          </div>
        </div>
        <div className="glass-panel" style={{ marginTop: 'clamp(0.8rem, 1.8vh, 1.3rem)', padding: 'clamp(0.8rem, 1.4vw, 1.15rem)', textAlign: 'center', borderLeft: '4px solid var(--accent-green)' }}>
          <strong style={{ color: 'var(--accent-green)' }}>实验目的：</strong>
          <span style={{ color: 'var(--text-secondary)' }}> 不是比谁猜得快，而是找出“哪些线索能帮助判断、哪些线索会制造错误”。这正是机器学习选择特征时要解决的问题。</span>
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

const FeatureDecisionSlide = ({ isActive }) => {
  const [threshold, setThreshold] = useState(5);
  const samples = [
    { name: '清晰猫', icon: '🐱', score: 6, truth: true, details: '胡须 +3 · 尖耳 +2 · 圆脸 +1' },
    { name: '哈士奇', icon: '🐶', score: 3, truth: false, details: '尖耳 +2 · 四腿 +1' },
    { name: '模糊猫', icon: '🌫️🐈', score: 4, truth: true, details: '胡须模糊 +1 · 尖耳 +2 · 圆脸 +1' }
  ];

  return (
    <Slide isActive={isActive}>
      <SlideTitle>特征怎样一步步变成“是猫 / 不是猫”？</SlideTitle>
      <SlideContent>
        <div style={{ width: '94%', maxWidth: '1180px', display: 'grid', gridTemplateColumns: '0.88fr 1.12fr', gap: 'clamp(0.8rem, 1.7vw, 1.6rem)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.65rem, 1.3vh, 1rem)' }}>
            {[
              ['① 看特征', '图片先被转换成“有没有胡须、耳朵形状”等可比较的信息。'],
              ['② 给证据加权', '区分度高的特征分值更大；“四条腿”太常见，只能提供很弱的证据。'],
              ['③ 累加总分', '多个特征共同投票，不依赖某一个线索就下结论。'],
              ['④ 跨过判定线', '总分达到阈值就判为猫，否则判为不是猫。']
            ].map(([title, text], index) => (
              <div key={title} className="glass-panel" style={{ padding: 'clamp(0.65rem, 1.3vw, 1rem)', display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 'clamp(0.55rem, 1vw, 0.9rem)', alignItems: 'start', borderLeft: `4px solid ${index < 2 ? 'var(--accent-cyan)' : 'var(--accent-purple)'}` }}>
                <strong style={{ fontSize: 'clamp(0.88rem, 1.35vw, 1.08rem)', color: index < 2 ? 'var(--accent-cyan)' : 'var(--accent-purple)', whiteSpace: 'nowrap' }}>{title}</strong>
                <span style={{ fontSize: 'clamp(0.74rem, 1.1vw, 0.92rem)', lineHeight: 1.5, color: 'var(--text-secondary)' }}>{text}</span>
              </div>
            ))}
            <div className="glass-panel" style={{ padding: 'clamp(0.7rem, 1.3vw, 1rem)', border: '1px dashed var(--accent-green)' }}>
              <strong style={{ color: 'var(--accent-green)', fontSize: 'clamp(0.8rem, 1.2vw, 1rem)' }}>真实模型中的权重通常不是老师手写的，而是模型根据大量样本中的对错慢慢学出来的。</strong>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: 'clamp(1rem, 1.9vw, 1.7rem)', borderTop: '4px solid var(--accent-green)' }}>
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

const DatasetRolesSlide = ({ isActive }) => (
  <Slide isActive={isActive}>
    <SlideTitle>训练集、验证集、测试集有什么不同？</SlideTitle>
    <SlideContent>
      <div style={{ width: '92%', maxWidth: '1160px', display: 'grid', gridTemplateColumns: '1.08fr 0.92fr', gap: 'clamp(0.8rem, 1.6vw, 1.4rem)', alignItems: 'stretch' }}>
        <figure className="glass-panel" style={{ margin: 0, padding: 'clamp(0.65rem, 1.1vw, 0.9rem)', borderTop: '4px solid var(--accent-cyan)', display: 'flex', flexDirection: 'column' }}><img src="/images/dataset_exam.png" alt="机器人依次经历练习题、模拟考试和密封期末考试" className="teaching-visual" style={{ maxHeight: 'min(44vh, 335px)', height: '100%' }} /><figcaption style={{ marginTop: '0.55rem', color: 'var(--text-secondary)', fontSize: 'clamp(0.74rem, 1.05vw, 0.9rem)', lineHeight: 1.45 }}>同一批数据不能既当“练习题”又当“期末卷”；否则分数会很好看，却测不出面对新题的能力。</figcaption></figure>
        <div style={{ display: 'grid', gap: '0.55rem' }}>
        {[
          { icon: '📖', title: '训练集', ratio: '约 70%', color: 'var(--accent-cyan)', text: '像平时练习题。模型反复查看这些样本，并根据错误调整内部规则。' },
          { icon: '🧭', title: '验证集', ratio: '约 15%', color: 'var(--accent-purple)', text: '像模拟考试。工程师用它选择特征、阈值和训练轮数，但不直接拿来背答案。' },
          { icon: '🔒', title: '测试集', ratio: '约 15%', color: 'var(--accent-green)', text: '像密封的期末卷。训练结束后才打开，用来检验模型面对新样本的真实能力。' }
        ].map((item) => (
          <div key={item.title} className="glass-panel" style={{ padding: 'clamp(0.65rem, 1.15vw, 0.9rem)', borderLeft: `4px solid ${item.color}`, display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '0.65rem', alignItems: 'center' }}>
            <div style={{ fontSize: 'clamp(1.35rem, 2.2vw, 1.9rem)' }}>{item.icon}</div><div><div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '0.5rem' }}>
              <h3 style={{ fontSize: 'clamp(1.2rem, 2vw, 1.65rem)', color: item.color, margin: 0 }}>{item.title}</h3>
              <span style={{ fontSize: 'clamp(0.75rem, 1.1vw, 0.95rem)', color: 'var(--text-tertiary)' }}>{item.ratio}</span>
            </div>
            <p style={{ fontSize: 'clamp(0.74rem, 1.08vw, 0.92rem)', lineHeight: 1.45, color: 'var(--text-secondary)', margin: '0.25rem 0 0' }}>{item.text}</p></div>
          </div>
        ))}
        </div>
      </div>
      <div className="glass-panel" style={{ marginTop: 'clamp(0.65rem, 1.5vh, 1rem)', padding: 'clamp(0.65rem, 1.2vw, 0.9rem)', width: '92%', maxWidth: '1160px', textAlign: 'center', borderLeft: '4px solid var(--accent-red)' }}>
        <strong style={{ fontSize: 'clamp(0.95rem, 1.5vw, 1.2rem)' }}>为什么不能拿测试集训练？</strong>
        <span style={{ color: 'var(--text-secondary)', fontSize: 'clamp(0.85rem, 1.3vw, 1.05rem)' }}> 因为提前看过考题，就无法知道模型是真会了，还是只记住了答案。</span>
      </div>
    </SlideContent>
  </Slide>
);

const DataQualitySlide = ({ isActive }) => (
  <Slide isActive={isActive}>
    <SlideTitle>模型的眼界，由数据决定</SlideTitle>
    <SlideContent>
      <div style={{ width: '92%', maxWidth: '1150px', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'clamp(0.7rem, 1.5vw, 1.4rem)' }}>
        {[
          { icon: '⚖️', title: '类别要平衡', bad: '100 张猫，只有 2 张狗', result: '模型可能把大多数动物都猜成猫。' },
          { icon: '🌍', title: '样本要多样', bad: '只看白天、正面、高清照片', result: '夜晚、侧面或模糊图片就容易认错。' },
          { icon: '🏷️', title: '标签要准确', bad: '把狗错误标成“猫”', result: '错误答案会被模型当作正确规律学习。' },
          { icon: '🔍', title: '来源要真实', bad: '训练图片与现实场景差别太大', result: '实验室里很准，真正使用时却可能失灵。' }
        ].map((item) => (
          <div key={item.title} className="glass-panel" style={{ padding: 'clamp(0.9rem, 1.7vw, 1.5rem)', display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 'clamp(0.7rem, 1.2vw, 1.1rem)', alignItems: 'start', borderLeft: '4px solid var(--accent-purple)' }}>
            <span style={{ fontSize: 'clamp(1.7rem, 2.7vw, 2.5rem)' }}>{item.icon}</span>
            <div>
              <h3 style={{ fontSize: 'clamp(1.05rem, 1.7vw, 1.4rem)', margin: 0, color: 'var(--text-primary)' }}>{item.title}</h3>
              <p style={{ margin: 'clamp(0.35rem, 0.8vh, 0.6rem) 0 0', fontSize: 'clamp(0.78rem, 1.2vw, 1rem)', color: 'var(--text-secondary)', lineHeight: 1.55 }}><strong style={{ color: 'var(--accent-red)' }}>问题：</strong>{item.bad}<br/><strong style={{ color: 'var(--accent-green)' }}>结果：</strong>{item.result}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="glass-panel" style={{ marginTop: 'clamp(0.8rem, 2vh, 1.4rem)', padding: 'clamp(0.8rem, 1.4vw, 1.2rem)', textAlign: 'center', width: '92%', maxWidth: '1150px', border: '1px dashed var(--accent-cyan)' }}>
        <strong style={{ color: 'var(--accent-cyan)', fontSize: 'clamp(1rem, 1.6vw, 1.25rem)' }}>数据有偏差，模型的判断也会带着偏差。</strong>
        <span style={{ color: 'var(--text-secondary)', fontSize: 'clamp(0.82rem, 1.25vw, 1.02rem)' }}> 这也是人脸识别、招聘筛选等真实应用必须重视公平性的原因。</span>
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
