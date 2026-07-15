const fs = require('fs');
const path = require('path');

const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach(file => {
    const dirFile = path.join(dir, file);
    if (fs.statSync(dirFile).isDirectory()) {
      filelist = walkSync(dirFile, filelist);
    } else {
      if (dirFile.endsWith('.jsx')) {
        filelist.push(dirFile);
      }
    }
  });
  return filelist;
};

const srcDir = path.join(__dirname, 'src');
const files = walkSync(srcDir);

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // 1. Replace rgba strings
  content = content.replace(/rgba\(255,s*255,s*255,s*0\.02\)/g, 'var(--overlay-light)');
  content = content.replace(/rgba\(255,s*255,s*255,s*0\.05\)/g, 'var(--overlay-light)');
  content = content.replace(/rgba\(255,s*255,s*255,s*0\.1\)/g, 'var(--overlay-medium)');
  content = content.replace(/rgba\(255,s*255,s*255,s*0\.2\)/g, 'var(--overlay-heavy)');
  content = content.replace(/rgba\(255,s*255,s*255,s*0\.3\)/g, 'var(--overlay-heavy)'); // some borders use 0.3
  
  // 2. Specific case in Lesson1 Temperature buttons where `#fff` is used for inactive states
  if (file.includes('Lesson1')) {
    content = content.replace(/color: temperature === 'low' \? '#000' : '#fff'/g, "color: temperature === 'low' ? '#000' : 'var(--text-primary)'");
    content = content.replace(/color: temperature === 'high' \? '#fff' : '#fff'/g, "color: temperature === 'high' ? '#fff' : 'var(--text-primary)'");
    // And for `temp`
    content = content.replace(/color: temp === 'low' \? '#000' : '#fff'/g, "color: temp === 'low' ? '#000' : 'var(--text-primary)'");
    content = content.replace(/color: temp === 'high' \? '#fff' : '#fff'/g, "color: temp === 'high' ? '#fff' : 'var(--text-primary)'");
    // Some buttons use text-primary already
  }
  
  // 3. Specific cases in Lesson3 where SVGs use rgba
  if (file.includes('Lesson3')) {
    content = content.replace(/fill="rgba\(255,255,255,0\.3\)"/g, 'fill="var(--text-tertiary)"');
    content = content.replace(/stroke="rgba\(255,255,255,0\.3\)"/g, 'stroke="var(--text-tertiary)"');
  }

  // 4. Any '#fff' inside `border: '... solid #fff'` in Lesson 2 Pixel Feature Slide
  if (file.includes('Lesson2')) {
    content = content.replace(/border: '2px solid #fff'/g, "border: '2px solid var(--text-primary)'");
  }

  // 5. Hardcoded color='#fff' in standard styles
  content = content.replace(/color: '#fff'/g, "color: 'var(--text-primary)'");
  // EXCEPT where they are embedded inside buttons with primary backgrounds, wait!
  // I need to be careful with global '#fff'. 
  // Wait, in Lesson2 testMode buttons: color: testMode ? '#fff' : '#000'
  // My replace won't match `testMode ? '#fff' : '#000'` because it's looking for `color: '#fff'`.
  // Wait, `color: '#fff'` will match exact string.

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});
