const fs = require('fs');
const path = require('path');

const DIRS = ['app', 'components', 'lib', 'nueva_plantilla_uso'];
const ROLES = ['estudiante', 'docente', 'tecnico', 'admin'];

let totalFiles = 0;
let totalLines = 0;
let issues = [];
let roles = { estudiante: 0, docente: 0, tecnico: 0, admin: 0 };

function scan(d) {
  if (!fs.existsSync(d)) return;
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const f = path.join(d, e.name);
    if (e.isDirectory()) {
      if (!['node_modules', '.next', '.git'].includes(e.name)) scan(f);
    } else if (/\.(tsx?|jsx?|json)$/.test(e.name)) {
      totalFiles++;
      const c = fs.readFileSync(f, 'utf8');
      const l = c.split('\n');
      totalLines += l.length;
      const rel = path.relative(process.cwd(), f).replace(/\\/g, '/');

      ROLES.forEach(r => {
        const m = c.match(new RegExp('\\b' + r + '\\b', 'gi'));
        if (m) roles[r] += m.length;
      });

      l.forEach((line, i) => {
        const t = line.trim();
        if (t.includes('TODO:') || t.includes('FIXME:')) {
          issues.push({ file: rel, line: i + 1, type: 'INCOMPLETO', msg: t });
        }
        if (/\b(as|:)\s*any\b/.test(t)) {
          issues.push({ file: rel, line: i + 1, type: 'ANY_TYPE', msg: t });
        }
        if (t.startsWith('console.log(')) {
          issues.push({ file: rel, line: i + 1, type: 'CONSOLE', msg: t });
        }
      });
    }
  }
}

DIRS.forEach(d => scan(path.join(process.cwd(), d)));

console.log('\n==================================================');
console.log('🚀 AUDITORÍA LEGENDARIA DE CÓDIGO');
console.log('==================================================');
console.log('📁 Archivos analizados:', totalFiles);
console.log('📝 Líneas de código:', totalLines);
console.log('👥 Menciones de Roles:', roles);
console.log('⚠️ Total de hallazgos:', issues.length);

if (issues.length > 0) {
  console.log('\n🔍 Primeros hallazgos detectados:');
  issues.slice(0, 15).forEach(i => console.log(` [${i.type}] ${i.file}:${i.line} -> ${i.msg}`));
  fs.writeFileSync('REPORT_AUDITORIA_LEGENDARIA.md', issues.map(i => `- [${i.type}] ${i.file}:${i.line} -> ${i.msg}`).join('\n'));
  console.log('\n📄 Reporte completo guardado en: REPORT_AUDITORIA_LEGENDARIA.md');
}
