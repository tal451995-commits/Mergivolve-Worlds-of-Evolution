(() => {
  'use strict';

  const OWNER = 'tal451995-commits';
  const REPO = 'Mergivolve-Worlds-of-Evolution';
  const API = `https://api.github.com/repos/${OWNER}/${REPO}/contents/`;

  const style = document.createElement('style');
  style.textContent = `
    #pngGalleryButton {
      position: fixed;
      z-index: 9998;
      bottom: 14px;
      left: 14px;
      border: 0;
      border-radius: 24px;
      padding: 12px 16px;
      background: #234e3b;
      color: white;
      font: 700 14px system-ui;
      box-shadow: 0 4px 18px #0003;
      cursor: pointer;
    }
    #pngGalleryOverlay {
      position: fixed;
      inset: 0;
      z-index: 99999;
      display: none;
      overflow: auto;
      background: #f5f7f1;
      color: #20382b;
      padding: 16px;
      font-family: system-ui, sans-serif;
    }
    #pngGalleryOverlay.open { display: block; }
    .png-gallery-head {
      position: sticky;
      top: -16px;
      z-index: 2;
      background: #f5f7f1;
      padding: 10px 0 14px;
    }
    .png-gallery-tools {
      display: flex;
      gap: 8px;
      align-items: center;
      margin-top: 10px;
    }
    #pngGallerySearch {
      width: 100%;
      min-width: 0;
      padding: 11px;
      border: 1px solid #ccd9cd;
      border-radius: 12px;
      font-size: 15px;
    }
    #pngGalleryClose {
      border: 0;
      border-radius: 12px;
      padding: 11px 15px;
      background: #234e3b;
      color: white;
      font-size: 15px;
    }
    #pngGalleryGrid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 10px;
    }
    .png-gallery-card {
      min-width: 0;
      padding: 8px;
      border: 1px solid #dce5dc;
      border-radius: 14px;
      background: white;
      overflow: hidden;
    }
    .png-gallery-card img {
      display: block;
      width: 100%;
      aspect-ratio: 1;
      object-fit: contain;
      background:
        linear-gradient(45deg,#eef1ed 25%,transparent 25%),
        linear-gradient(-45deg,#eef1ed 25%,transparent 25%),
        linear-gradient(45deg,transparent 75%,#eef1ed 75%),
        linear-gradient(-45deg,transparent 75%,#eef1ed 75%);
      background-size: 16px 16px;
      background-position: 0 0,0 8px,8px -8px,-8px 0;
    }
    .png-gallery-name {
      margin-top: 7px;
      font-size: 12px;
      font-weight: 700;
      overflow-wrap: anywhere;
    }
    .png-gallery-path {
      margin-top: 3px;
      color: #6c7c70;
      font-size: 10px;
      overflow-wrap: anywhere;
    }
    @media(min-width:650px) {
      #pngGalleryGrid {
        grid-template-columns: repeat(5, minmax(0, 1fr));
      }
    }
  `;
  document.head.appendChild(style);

  const button = document.createElement('button');
  button.id = 'pngGalleryButton';
  button.textContent = '🖼 כל תמונות PNG';
  document.body.appendChild(button);

  const overlay = document.createElement('section');
  overlay.id = 'pngGalleryOverlay';
  overlay.innerHTML = `
    <div class="png-gallery-head">
      <h2 style="margin:0">גלריית המפלצות</h2>
      <div id="pngGalleryCount">טוען קבצים...</div>
      <div class="png-gallery-tools">
        <input id="pngGallerySearch"
               placeholder="חיפוש לפי שם קובץ..."
               aria-label="חיפוש תמונות">
        <button id="pngGalleryClose">סגירה</button>
      </div>
    </div>
    <div id="pngGalleryGrid"></div>
  `;
  document.body.appendChild(overlay);

  const grid = overlay.querySelector('#pngGalleryGrid');
  const count = overlay.querySelector('#pngGalleryCount');
  const search = overlay.querySelector('#pngGallerySearch');
  let loadingPromise = null;
  let allFiles = [];

  async function getJson(url) {
    const response = await fetch(url, {
      headers: { Accept: 'application/vnd.github+json' }
    });
    if (!response.ok) {
      throw new Error(`GitHub returned ${response.status}`);
    }
    return response.json();
  }

  async function loadFiles() {
    if (loadingPromise) return loadingPromise;

    loadingPromise = (async () => {
      const urls = [
        `${API}?ref=main&per_page=100&page=1`,
        `${API}?ref=main&per_page=100&page=2`,
        `${API}assets/creatures?ref=main&per_page=100&page=1`
      ];

      const pages = await Promise.all(urls.map(getJson));

      const seen = new Set();

      allFiles = pages
        .flat()
        .filter(file =>
          file.type === 'file' &&
          /\.png$/i.test(file.name) &&
          file.download_url
        )
        .filter(file => {
          if (seen.has(file.path)) return false;
          seen.add(file.path);
          return true;
        })
        .sort((a, b) => a.path.localeCompare(b.path));

      renderFiles();
    })().catch(error => {
      count.textContent =
        'לא הצלחתי לטעון את הרשימה. בדוק חיבור לאינטרנט ונסה שוב.';
      console.error('[Mergivolve PNG Gallery]', error);
      loadingPromise = null;
      throw error;
    });

    return loadingPromise;
  }

  function renderFiles() {
    const query = search.value.trim().toLowerCase();

    const files = allFiles.filter(file =>
      `${file.name} ${file.path}`.toLowerCase().includes(query)
    );

    count.textContent =
      `מוצגים ${files.length} מתוך ${allFiles.length} קובצי PNG`;

    grid.replaceChildren();

    for (const file of files) {
      const card = document.createElement('article');
      card.className = 'png-gallery-card';

      const img = document.createElement('img');
      img.src = file.download_url;
      img.alt = file.name;
      img.loading = 'lazy';
      img.decoding = 'async';

      const name = document.createElement('div');
      name.className = 'png-gallery-name';
      name.textContent = file.name;

      const path = document.createElement('div');
      path.className = 'png-gallery-path';
      path.textContent = file.path;

      card.append(img, name, path);
      grid.appendChild(card);
    }
  }

  button.addEventListener('click', async () => {
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';

    try {
      await loadFiles();
    } catch (_) {
      // הודעת השגיאה מוצגת בגלריה.
    }
  });

  overlay.querySelector('#pngGalleryClose').addEventListener('click', () => {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  });

  search.addEventListener('input', renderFiles);
})();
