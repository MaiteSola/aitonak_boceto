const fs = require('fs');
const htmlFile = 'actividades.html';
const scssFile = 'actividades.scss';

let content = fs.readFileSync(htmlFile, 'utf8');

// 1. Pie chart
content = content.replace(/class="([^"]+?)"\s*\[style.background\]="pieGradient"/s, 
  'class="$1 pie-chart-circle"\n                      [ngStyle]="{\'--pie-gradient\': pieGradient}"');

// 2. Outer column bars
content = content.replace(/class="w-12 sm:w-16 flex flex-col justify-end overflow-hidden rounded-t-lg shadow-md hover:opacity-90 transition-opacity"/g, 
  'class="stat-column w-12 sm:w-16 flex flex-col justify-end overflow-hidden rounded-t-lg shadow-md hover:opacity-90 transition-opacity"');
content = content.replace(/\[style.height\.%\]="([^"]+)"\s*style="min-height:\s*20px"/g, 
  (match, p1) => {
    let clean = p1.replace(/\s+/g, ' ');
    return `[ngStyle]="{'--col-height': (${clean}) + '%'}"`;
});

// 3. Inner segment bars
content = content.replace(/class="bg-\[#([a-zA-Z0-9]+)\]\/90 w-full text-center text-xs text-white flex items-center justify-center font-bold"/g, 
  'class="stat-segment bg-[#$1]/90 w-full text-center text-xs text-white flex items-center justify-center font-bold"');
// Wait, we need to make sure we don't accidentally match outer columns.
content = content.replace(/\[style.height\.%\]="([^"]+)"/g, (match, p1) => {
    let clean = p1.replace(/\s+/g, ' ');
    return `[ngStyle]="{'--segment-height': (${clean}) + '%'}"`;
});

// 4. Age dist bars
const ages = [
    { o: 'style="height: 5%"',  c: 'age-bar-1' },
    { o: 'style="height: 15%"', c: 'age-bar-2' },
    { o: 'style="height: 45%"', c: 'age-bar-3' },
    { o: 'style="height: 70%"', c: 'age-bar-4' },
    { o: 'style="height: 90%"', c: 'age-bar-5' },
    { o: 'style="height: 100%"', c: 'age-bar-6' },
    { o: 'style="height: 65%"', c: 'age-bar-7' },
    { o: 'style="height: 40%"', c: 'age-bar-8' },
    { o: 'style="height: 10%"', c: 'age-bar-9' },
    { o: 'style="height: 3%"',  c: 'age-bar-10' }
];

ages.forEach(age => {
    // we find the div that specifies class="... transition-colors" style=" height..."
    // replace style with nothing, insert class to the class=""
    content = content.replace(new RegExp(`class="([^"]+?transition-colors(| relative))"\\s*${age.o.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')}`), 
      `class="$1 ${age.c}"`);
});

fs.writeFileSync(htmlFile, content);

let scssContent = fs.readFileSync(scssFile, 'utf8');
if (!scssContent.includes('.pie-chart-circle')) {
scssContent += `

// --- ESTILOS DINÁMICOS EXTRAÍDOS DEL HTML ---

.pie-chart-circle {
  background: var(--pie-gradient);
}

.stat-column {
  min-height: 20px;
  height: var(--col-height);
}

.stat-segment {
  height: var(--segment-height);
}

.age-bar-1 { height: 5%; }
.age-bar-2 { height: 15%; }
.age-bar-3 { height: 45%; }
.age-bar-4 { height: 70%; }
.age-bar-5 { height: 90%; }
.age-bar-6 { height: 100%; }
.age-bar-7 { height: 65%; }
.age-bar-8 { height: 40%; }
.age-bar-9 { height: 10%; }
.age-bar-10 { height: 3%; }
`;
fs.writeFileSync(scssFile, scssContent);
}

console.log("Done");
