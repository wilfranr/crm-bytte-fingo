const fs = require('fs');

function markdownToHtml(md) {
  const lines = md.split(/\r?\n/);
  let html = '';
  let inCode = false;
  let inUl = false;
  let inOl = false;
  const closeUl = () => { if (inUl) { html += '</ul>'; inUl = false; } };
  const closeOl = () => { if (inOl) { html += '</ol>'; inOl = false; } };
  const closeLists = () => { closeUl(); closeOl(); };
  lines.forEach(line => {
    if (line.startsWith('```')) {
      if (!inCode) {
        closeLists();
        inCode = true;
        html += '<pre><code>';
      } else {
        inCode = false;
        html += '</code></pre>';
      }
    } else if (inCode) {
      html += line.replace(/</g, '&lt;').replace(/>/g, '&gt;') + '\n';
    } else if (line.startsWith('# ')) {
      closeLists();
      html += `<h1>${line.slice(2)}</h1>`;
    } else if (line.startsWith('## ')) {
      closeLists();
      html += `<h2>${line.slice(3)}</h2>`;
    } else if (line.startsWith('### ')) {
      closeLists();
      html += `<h3>${line.slice(4)}</h3>`;
    } else if (/^[*-] /.test(line)) {
      if (!inUl) { closeOl(); html += '<ul>'; inUl = true; }
      html += `<li>${line.slice(2)}</li>`;
    } else if (/^\d+\. /.test(line)) {
      if (!inOl) { closeUl(); html += '<ol>'; inOl = true; }
      html += `<li>${line.replace(/^\d+\. /, '')}</li>`;
    } else if (line.trim() === '') {
      closeLists();
    } else {
      closeLists();
      html += `<p>${line}</p>`;
    }
  });
  closeLists();
  if (inCode) html += '</code></pre>';
  return html;
}

const docs = [
  {file: 'README.md', title: 'Proyecto'},
  {file: 'frontend-bytte-operaciones/README.md', title: 'Frontend'}
];

let body = '<h1>Documentación</h1>\n<input id="search" placeholder="Buscar..." />';

for (const d of docs) {
  if (fs.existsSync(d.file)) {
    const md = fs.readFileSync(d.file, 'utf8');
    const html = markdownToHtml(md);
    body += `\n<section class="doc-section"><h2>${d.title}</h2>${html}</section>`;
  }
}

body += `<script>
const input=document.getElementById('search');
input.addEventListener('input',()=>{
  const term=input.value.toLowerCase();
  document.querySelectorAll('.doc-section').forEach(sec=>{
    sec.style.display=sec.innerText.toLowerCase().includes(term)?'':'none';
  });
});
</script>`;

const template = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8" />
<title>Documentación</title>
<style>
body{font-family:Arial,Helvetica,sans-serif;max-width:800px;margin:auto;padding:20px;}
#search{width:100%;padding:8px;margin-bottom:20px;}
pre{background:#f4f4f4;padding:10px;overflow:auto;}
section{margin-bottom:40px;}
ul,ol{margin-left:20px;}
</style>
</head>
<body>
${body}
</body>
</html>`;

fs.mkdirSync('docs', {recursive: true});
fs.writeFileSync('docs/index.html', template);
