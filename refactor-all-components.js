const fs = require('fs');
const path = require('path');

const TARGET_DIR = path.join(process.cwd(), 'components');

// Mapeos de compactación, responsividad y paleta institucional sobria
const REPLACEMENTS = [
  // 1. DENSIDAD Y ESPACIADOS COMPACTOS
  { from: /\bp-8\b/g, to: 'p-3 sm:p-4' },
  { from: /\bp-6\b/g, to: 'p-3 sm:p-4' },
  { from: /\bp-5\b/g, to: 'p-2.5 sm:p-3' },
  { from: /\bpx-6\b/g, to: 'px-3 sm:px-4' },
  { from: /\bpy-6\b/g, to: 'py-2.5 sm:py-3.5' },
  { from: /\bpy-4\b/g, to: 'py-2 sm:py-2.5' },
  { from: /\bgap-8\b/g, to: 'gap-3 sm:gap-4' },
  { from: /\bgap-6\b/g, to: 'gap-3 sm:gap-4' },
  { from: /\bgap-4\b/g, to: 'gap-2 sm:gap-3' },

  // 2. TIPOGRAFÍA ESCALABLE Y DENSA (Ideal para laptops/pantallas medianas)
  { from: /\btext-3xl\b/g, to: 'text-xl sm:text-2xl font-bold tracking-tight' },
  { from: /\btext-2xl\b/g, to: 'text-lg sm:text-xl font-semibold tracking-tight' },
  { from: /\btext-xl\b/g, to: 'text-base sm:text-lg font-medium' },
  { from: /\btext-base\b/g, to: 'text-xs sm:text-sm' },

  // 3. ALTURAS Y BOTONES DENSOS
  { from: /\bh-12\b/g, to: 'h-9 sm:h-10' },
  { from: /\bh-10\b/g, to: 'h-8 sm:h-9' },
  { from: /\bpy-3\b/g, to: 'py-1.5 sm:py-2' },

  // 4. RESPONSIVIDAD DE MODALES Y PANELES (Ajuste estricto a ventana)
  { from: /\bmax-w-4xl\b/g, to: 'max-w-4xl w-[95vw] max-h-[88vh] overflow-y-auto' },
  { from: /\bmax-w-2xl\b/g, to: 'max-w-2xl w-[95vw] max-h-[88vh] overflow-y-auto' },
  { from: /\bmax-w-xl\b/g, to: 'max-w-xl w-[95vw] max-h-[85vh] overflow-y-auto' },
  { from: /\bmax-w-lg\b/g, to: 'max-w-lg w-[95vw] max-h-[85vh] overflow-y-auto' },

  // 5. PALETA ACERO / GRAFITO / SLATE (Sustitución de colores estridentes)
  { from: /\bbg-blue-600\b/g, to: 'bg-slate-900 dark:bg-slate-800' },
  { from: /\bbg-blue-500\b/g, to: 'bg-slate-800 dark:bg-slate-700' },
  { from: /\bbg-indigo-600\b/g, to: 'bg-slate-900' },
  { from: /\bbg-indigo-500\b/g, to: 'bg-slate-800' },
  { from: /\btext-blue-600\b/g, to: 'text-slate-900 dark:text-slate-200' },
  { from: /\btext-indigo-600\b/g, to: 'text-slate-900 dark:text-slate-200' },
  { from: /\bhover:bg-blue-700\b/g, to: 'hover:bg-slate-800 dark:hover:bg-slate-700' },
  { from: /\bhover:bg-indigo-700\b/g, to: 'hover:bg-slate-800' },
  { from: /\bbg-emerald-600\b/g, to: 'bg-zinc-800' },
  { from: /\bbg-emerald-500\b/g, to: 'bg-zinc-700' },
  { from: /\btext-emerald-600\b/g, to: 'text-zinc-800 dark:text-zinc-200' },
  { from: /\bbg-purple-600\b/g, to: 'bg-slate-800' },
  { from: /\bbg-amber-500\b/g, to: 'bg-zinc-700' }
];

let modifiedCount = 0;

function scanAndRefactor(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir, { withFileTypes: true });

  for (const file of files) {
    const fullPath = path.join(dir, file.name);
    if (file.isDirectory()) {
      if (!['node_modules', '.next', '.git'].includes(file.name)) {
        scanAndRefactor(fullPath);
      }
    } else if (/\.(tsx|jsx|ts|js)$/.test(file.name)) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let updatedContent = content;

      REPLACEMENTS.forEach(rule => {
        updatedContent = updatedContent.replace(rule.from, rule.to);
      });

      if (updatedContent !== content) {
        fs.writeFileSync(fullPath, updatedContent, 'utf8');
        modifiedCount++;
        console.log(`  ✓ Optimizado: ${path.relative(process.cwd(), fullPath)}`);
      }
    }
  }
}

console.log('\n==================================================');
console.log('🏛️ REFACTORIZACIÓN COMPACTA Y SERIA DE DENSIDAD UI');
console.log('==================================================\n');

scanAndRefactor(TARGET_DIR);

console.log(`\n✨ ¡Refactorización finalizada! ${modifiedCount} componentes actualizados a alta densidad y estética profesional.`);
