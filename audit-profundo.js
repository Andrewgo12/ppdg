const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

console.log('\n==================================================');
console.log('🚀 AUDITORÍA PROFUNDA Y COMPLETA DE VISTAS Y RUTAS');
console.log('==================================================\n');

const ROOT_DIR = process.cwd();
const APP_DIR = path.join(ROOT_DIR, 'app');
const COMPONENTS_DIR = path.join(ROOT_DIR, 'components');
const CONFIG_DIR = path.join(ROOT_DIR, 'config');

let errors = [];
let warnings = [];
let info = [];

function getAllFiles(dirPath, arrayOfFiles = []) {
  if (!fs.existsSync(dirPath)) return arrayOfFiles;
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (!['node_modules', '.next', '.git'].includes(file)) {
        arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
      }
    } else if (/\.(tsx|jsx|ts|js)$/.test(file)) {
      arrayOfFiles.push(fullPath);
    }
  });

  return arrayOfFiles;
}

const appFiles = getAllFiles(APP_DIR);
const existingRoutes = new Set();
const pageFilesMap = new Map();
const fileHashes = new Map();

appFiles.forEach((filePath) => {
  const relative = path.relative(APP_DIR, filePath).replace(/\\/g, '/');
  const fileName = path.basename(filePath);

  if (fileName === 'page.tsx' || fileName === 'page.jsx') {
    let routePath = '/' + path.dirname(relative);
    if (routePath === '/.') routePath = '/';
    routePath = routePath.replace(/\/\([^)]+\)/g, '');
    if (routePath === '') routePath = '/';

    existingRoutes.add(routePath);
    pageFilesMap.set(routePath, relative);

    const content = fs.readFileSync(filePath, 'utf8');
    if (!content.includes('export default')) {
      errors.push({ file: `app/${relative}`, msg: 'NO tiene `export default`. La página romperá al cargar.' });
    }

    if (content.trim().length < 150 || content.includes('TODO:') || content.includes('// undefined')) {
      warnings.push({ file: `app/${relative}`, msg: 'Vista incompleta o con tareas pendientes.' });
    }

    const hash = crypto.createHash('md5').update(content.replace(/\s+/g, '')).digest('hex');
    if (!fileHashes.has(hash)) {
      fileHashes.set(hash, []);
    }
    fileHashes.get(hash).push(`app/${relative}`);
  }
});

fileHashes.forEach((files, hash) => {
  if (files.length > 1) {
    warnings.push({
      file: files.join(' <--> '),
      msg: 'CÓDIGO DUPLICADO DETECTADO: Estas páginas tienen exactamente el mismo contenido renderizado.'
    });
  }
});

const allCodeFiles = [...appFiles, ...getAllFiles(COMPONENTS_DIR), ...getAllFiles(CONFIG_DIR)];
const referencedRoutes = new Set();
const linkPattern = /(?:href|route)\s*[:=]\s*["']([^"']+)["']/g;

allCodeFiles.forEach((filePath) => {
  const content = fs.readFileSync(filePath, 'utf8');
  let match;
  while ((match = linkPattern.exec(content)) !== null) {
    let targetRoute = match[1];
    if (!targetRoute.startsWith('http') && !targetRoute.startsWith('#') && !targetRoute.startsWith('mailto:')) {
      referencedRoutes.add(targetRoute);

      const cleanRoute = targetRoute.split('?')[0];
      const routeExists = existingRoutes.has(cleanRoute) || Array.from(existingRoutes).some(r => r.includes('['));

      if (!routeExists) {
        const relativeFile = path.relative(ROOT_DIR, filePath).replace(/\\/g, '/');
        errors.push({
          file: relativeFile,
          msg: `ENLACE ROTO (404): Apunta a "${targetRoute}", pero NO existe ninguna página creada para esa dirección.`
        });
      }
    }
  }
});

existingRoutes.forEach((route) => {
  if (route !== '/' && !referencedRoutes.has(route)) {
    const filePath = pageFilesMap.get(route);
    info.push({
      file: `app/${filePath}`,
      msg: `VISTA HUÉRFANA / NO UTILIZADA: Existe la página para "${route}", pero ningún menú ni enlace la utiliza.`
    });
  }
});

console.log(`📁 Rutas de páginas detectadas en /app: ${existingRoutes.size}`);
console.log(`🔗 Enlaces e hipervínculos analizados: ${referencedRoutes.size}\n`);

console.log('--------------------------------------------------');
console.log('🔴 ERRORES CRÍTICOS (Enlaces Rotos / Sin Export Default):');
console.log('--------------------------------------------------');
if (errors.length === 0) console.log('  ✅ Ninguno. Todos los enlaces apuntan a vistas válidas.');
errors.forEach(e => console.log(`  ❌ [${e.file}] -> ${e.msg}`));

console.log('\n--------------------------------------------------');
console.log('🟠 ADVERTENCIAS (Vistas duplicadas o incompletas):');
console.log('--------------------------------------------------');
if (warnings.length === 0) console.log('  ✅ Ninguna.');
warnings.forEach(w => console.log(`  ⚠️  [${w.file}] -> ${w.msg}`));

console.log('\n--------------------------------------------------');
console.log('🔵 INFORMACIÓN (Vistas huérfanas o sin enlazar):');
console.log('--------------------------------------------------');
if (info.length === 0) console.log('  ✅ Todas las páginas están vinculadas en el menú.');
info.forEach(i => console.log(`  ℹ️  [${i.file}] -> ${i.msg}`));

let md = `# 📊 REPORT DE AUDITORÍA PROFUNDA DE RUTAS Y VISTAS\n\n`;
md += `### 🔴 Errores Críticos (${errors.length})\n`;
errors.forEach(e => md += `- **${e.file}**: ${e.msg}\n`);
md += `\n### 🟠 Advertencias (${warnings.length})\n`;
warnings.forEach(w => md += `- **${w.file}**: ${w.msg}\n`);
md += `\n### 🔵 Vistas Huérfanas / No Enlazadas (${info.length})\n`;
info.forEach(i => md += `- **${i.file}**: ${i.msg}\n`);

fs.writeFileSync('AUDITORIA_VISTAS_Y_RUTAS.md', md);
console.log('\n📄 Reporte detallado guardado en: AUDITORIA_VISTAS_Y_RUTAS.md\n');