const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    if (!fs.existsSync(dir)) return results;
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
            results.push(file);
        }
    });
    return results;
}

const files = walk('frontend/src');

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;
    
    const lines = content.split('\n');
    for(let i=0; i<lines.length; i++) {
        if(lines[i].includes('!bg-') && lines[i].includes('dark:bg-') && !lines[i].includes('dark:!bg-')) {
            lines[i] = lines[i].replace(/dark:bg-/g, 'dark:!bg-');
            changed = true;
        }
    }
    
    if (changed) {
        fs.writeFileSync(file, lines.join('\n'), 'utf8');
        console.log("Fixed", file);
    }
});
