/**
 * loader.js
 * Memuat semua section HTML secara berurutan ke dalam #app.
 * Untuk Research & Projects, setiap card dimuat terpisah ke dalam grid-nya.
 *
 * Kompatibel dengan:
 *   - GitHub Pages (https://)
 *   - Live Server VS Code (localhost)
 *   ❌ Tidak bisa dibuka via file:// langsung (gunakan Live Server)
 */

// ── 1. Section utama (dimuat berurutan ke #app) ──────────────────────────────
const mainSections = [
  'sections/navbar.html',
  'sections/hero.html',
  'sections/about.html',
  'sections/skills.html',
  'sections/experience.html',
  'sections/research.html',   // shell: berisi <div id="research-grid">
  'sections/projects.html',   // shell: berisi <div id="projects-grid">
  'sections/services.html',
  'sections/contact.html',
  'sections/marquee.html',
  'sections/footer.html',
];

// ── 2. Card individual Research (dimuat ke #research-grid) ───────────────────
const researchCards = [
  'sections/research/cnn-optimizer.html',
  'sections/research/hybrid-cnn-llm.html',
];

// ── 3. Card individual Projects (dimuat ke #projects-grid) ───────────────────
const projectCards = [
  'sections/projects/hybrid-cnn-llm.html',
  'sections/projects/bike-rental.html',
  'sections/projects/air-quality.html',
  'sections/projects/dog-cat.html',
  'sections/projects/spam-detection.html',
];

// ── Helper: fetch HTML dan append ke elemen target ───────────────────────────
async function injectHTML(path, targetEl) {
  try {
    const res = await fetch(path);
    if (!res.ok) throw new Error(`Gagal memuat: ${path} (${res.status})`);
    const html = await res.text();
    const wrapper = document.createElement('div');
    wrapper.innerHTML = html;
    targetEl.appendChild(wrapper);
  } catch (err) {
    console.error(err.message);
  }
}

// ── Main loader ───────────────────────────────────────────────────────────────
async function loadSections() {
  const app = document.getElementById('app');

  // Step 1: load semua section shell ke #app
  for (const path of mainSections) {
    await injectHTML(path, app);
  }

  // Step 2: load card research ke dalam #research-grid
  const researchGrid = document.getElementById('research-grid');
  if (researchGrid) {
    for (const path of researchCards) {
      await injectHTML(path, researchGrid);
    }
  }

  // Step 3: load card projects ke dalam #projects-grid
  const projectsGrid = document.getElementById('projects-grid');
  if (projectsGrid) {
    for (const path of projectCards) {
      await injectHTML(path, projectsGrid);
    }
  }

  // Step 4: beri tahu script.js bahwa semua DOM sudah siap
  document.dispatchEvent(new Event('sectionsLoaded'));
}

loadSections();
