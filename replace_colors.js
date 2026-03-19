const fs = require('fs');
const path = require('path');

const dir = 'c:/Project/Test/frontend/src';

const map = {
  'bg-white': 'bg-white dark:bg-slate-800',
  'bg-gray-50': 'bg-gray-50 dark:bg-slate-900',
  'text-gray-900': 'text-gray-900 dark:text-white',
  'text-gray-800': 'text-gray-800 dark:text-gray-100',
  'text-gray-700': 'text-gray-700 dark:text-gray-300',
  'text-gray-500': 'text-gray-500 dark:text-gray-400',
  'text-black': 'text-black dark:text-white',
  'border-gray-100': 'border-gray-100 dark:border-slate-700',
  'border-gray-200': 'border-gray-200 dark:border-slate-700',
  'border-gray-300': 'border-gray-300 dark:border-slate-600',
  'text-green-800': 'text-green-800 dark:text-green-200',
  'bg-green-100': 'bg-green-100 dark:bg-green-900/50',
  'text-blue-800': 'text-blue-800 dark:text-blue-200',
  'bg-blue-100': 'bg-blue-100 dark:bg-blue-900/50',
  'text-red-800': 'text-red-800 dark:text-red-200',
  'bg-red-100': 'bg-red-100 dark:bg-red-900/50',
  'text-red-500': 'text-red-500 dark:text-red-400'
};

function walk(currDir) {
  const files = fs.readdirSync(currDir);
  for (const f of files) {
    const p = path.join(currDir, f);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (p.endsWith('.tsx') || p.endsWith('.ts')) {
      let content = fs.readFileSync(p, 'utf8');
      let changed = false;
      const lines = content.split('\n');
      for(let i=0; i<lines.length; i++) {
        let line = lines[i];
        
        for (const [k, v] of Object.entries(map)) {
          const darkClass = v.split(' ')[1];
          // Replace if it's a full word and the dark class isn't already present on this line
          const regex = new RegExp(`\\b${k}\\b(?!\\s*dark:)`, 'g');
          if (regex.test(line) && !line.includes(darkClass)) {
             line = line.replace(regex, v);
             changed = true;
          }
        }
        lines[i] = line;
      }
      if (changed) {
        fs.writeFileSync(p, lines.join('\n'), 'utf8');
        console.log("Updated: " + p);
      }
    }
  }
}
walk(dir);
console.log("Done");
