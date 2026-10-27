import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { renderChicoRoute, CHICO_ROUTES } from '../src/prerender/renderPages';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

export function injectPreRender(templateHtml: string, routePath: string): string {
  const result = renderChicoRoute(routePath);
  if (!result) return templateHtml;

  const { html, meta } = result;

  let pageHtml = templateHtml;

  // Replace Title
  pageHtml = pageHtml.replace(/<title>.*?<\/title>/i, `<title>${meta.title}</title>`);

  // Replace Meta Description
  if (pageHtml.includes('name="description"')) {
    pageHtml = pageHtml.replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i,
      `<meta name="description" content="${meta.description}" />`
    );
  }

  // Ensure Canonical Link
  const canonicalTag = `<link rel="canonical" href="${meta.canonical}" />`;
  if (!pageHtml.includes('rel="canonical"')) {
    pageHtml = pageHtml.replace('</head>', `  ${canonicalTag}\n  </head>`);
  } else {
    pageHtml = pageHtml.replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i, canonicalTag);
  }

  // Inject content into #root
  pageHtml = pageHtml.replace('<div id="root"></div>', `<div id="root">${html}</div>`);

  return pageHtml;
}

export function prerenderAll() {
  const distIndexPath = path.join(distDir, 'index.html');
  if (!fs.existsSync(distIndexPath)) {
    console.error('Error: dist/index.html not found. Run vite build first.');
    process.exit(1);
  }

  const template = fs.readFileSync(distIndexPath, 'utf-8');

  for (const routePath of Object.keys(CHICO_ROUTES)) {
    const renderedHtml = injectPreRender(template, routePath);
    
    // 1. Directory based: dist/chico/index.html, dist/chico/privacidade/index.html, etc.
    const cleanPath = routePath.replace(/^\//, '');
    const targetDir = path.join(distDir, cleanPath);
    fs.mkdirSync(targetDir, { recursive: true });
    const targetIndexPath = path.join(targetDir, 'index.html');
    fs.writeFileSync(targetIndexPath, renderedHtml, 'utf-8');
    console.log(`Generated: ${path.relative(distDir, targetIndexPath)}`);

    // 2. File based: dist/chico.html, dist/chico/privacidade.html (useful for servers configured with cleanUrls)
    const targetHtmlPath = path.join(distDir, `${cleanPath}.html`);
    const targetHtmlDir = path.dirname(targetHtmlPath);
    fs.mkdirSync(targetHtmlDir, { recursive: true });
    fs.writeFileSync(targetHtmlPath, renderedHtml, 'utf-8');
    console.log(`Generated: ${path.relative(distDir, targetHtmlPath)}`);
  }

  console.log('Static pre-rendering complete for Chico routes.');
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  prerenderAll();
}
