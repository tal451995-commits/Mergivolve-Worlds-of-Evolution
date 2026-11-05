(() => {
  'use strict';

  const root = document.querySelector('#gameRoot');
  if (!root || root.dataset.referenceUi === '1') return;

  root.dataset.referenceUi = '1';

  const $ = (selector, parent = root) =>
    parent.querySelector(selector);

  const topbar = $('.topbar');
  const resources = $('.resource-row');
  const topActions = $('.top-actions');
  const boardFrame = $('.board-frame');
  const board = $('#board');
  const companion = $('.companion-strip');
  const oldTools = $('.bottom-tools');

  const shopBtn = $('#shopBtn');
  const collectionBtn = $('#collectionBtn');
  const missionsBtn = $('#missionsBtn');
  const summonBtn = $('#summonBtn');

  if (
    !topbar || !resources || !topActions ||
    !board || !companion || !oldTools ||
    !shopBtn || !collectionBtn || !missionsBtn || !summonBtn
  ) return;

  /* 1. Player portrait */

  const player = document.createElement('button');
  player.className = 'reference-player';
  player.type = 'button';
  player.textContent = '🧑🏻‍🚀';
  player.setAttribute('aria-label', 'פרופיל שחקן');

  player.addEventListener('click', () => {
    $('#settingsBtn')?.click();
  });

  topbar.insertBefore(player, topbar.firstChild);
  topbar.insertBefore(resources, topActions);

  /* 2. Resource plus buttons */

  resources.querySelectorAll('.resource').forEach(resource => {
    const plus = document.createElement('button');

    plus.type = 'button';
    plus.className = 'reference-resource-plus';
    plus.textContent = '+';
    plus.setAttribute('aria-label', 'פתיחת החנות');

    plus.addEventListener('click', () => shopBtn.click());

    resource.append(plus);
  });

  /* 3. Missions panel */

  const missions = document.createElement('section');
  missions.className = 'reference-missions';
  missions.setAttribute('aria-label', 'המשימות שלך');

  missions.innerHTML = `
    <button class="reference-mission" data-reference-mission="merge">
      <div class="art">🐉</div>
      <strong>אסוף מפלצות</strong>
      <small id="refMergeCount">0/3</small>
      <div class="bar"><i id="refMergeProgress" style="width:0%"></i></div>
      <div class="reward">💎 50</div>
    </button>

    <button class="reference-mission" data-reference-mission="egg">
      <div class="art">🥚</div>
      <strong>צור ביצים</strong>
      <small id="refEggCount">0/3</small>
      <div class="bar"><i id="refEggProgress" style="width:0%"></i></div>
      <div class="reward">💎 40</div>
    </button>

    <button class="reference-mission" data-reference-mission="plant">
      <div class="art">🌱</div>
      <strong>גדל צמחים</strong>
      <small id="refPlantCount">0/5</small>
      <div class="bar"><i id="refPlantProgress" style="width:0%"></i></div>
      <div class="reward">💎 30</div>
    </button>

    <button class="reference-chest" type="button"
            aria-label="תגמול מיוחד">
      <div class="chest-art">🎁</div>
      <b>תגמול מיוחד</b>
    </button>
  `;

  topbar.after(missions);

  missions.addEventListener('click', event => {
    if (
      event.target.closest('.reference-mission') ||
      event.target.closest('.reference-chest')
    ) {
      missionsBtn.click();
    }
  });

  /* 4. Put the existing creature panel directly below the board */

  boardFrame.after(companion);

  /* 5. Keep existing summon event inside the creature panel */

  summonBtn.querySelector('.tool-icon').textContent = '🌱';
  summonBtn.querySelector('.tool-label').textContent = 'יצירה';
  summonBtn.querySelector('.tool-sub').textContent = '';

  /* 6. New merge button: uses the original merge engine */

  const mergeBtn = document.createElement('button');

  mergeBtn.type = 'button';
  mergeBtn.className = 'reference-merge';
  mergeBtn.innerHTML = 'מיזוג<br>⚡ 1';
  mergeBtn.setAttribute('aria-label', 'מזג פריטים תואמים');

  companion.append(mergeBtn, summonBtn);

  function syntheticTap(itemNode) {
    if (!itemNode || !window.PointerEvent) return false;

    const rect = itemNode.getBoundingClientRect();

    const options = {
      bubbles: true,
      cancelable: true,
      clientX: rect.left + rect.width / 2,
      clientY: rect.top + rect.height / 2,
      pointerId: 1,
      pointerType: 'touch',
      isPrimary: true
    };

    itemNode.dispatchEvent(
      new PointerEvent('pointerdown', options)
    );

    window.dispatchEvent(
      new PointerEvent('pointerup', options)
    );

    return true;
  }

  function showNotice(message) {
    const toast = $('#toast');
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add('show');

    window.setTimeout(() => {
      toast.classList.remove('show');
    }, 1900);
  }

  function mergeMatchingItems() {
    const items = [...board.querySelectorAll('.board-item')];

    const groups = new Map();

    items.forEach(item => {
      const key = `${item.dataset.type}-${item.dataset.level}`;

      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(item);
    });

    const pair = [...groups.values()].find(group => group.length >= 2);

    if (!pair) {
      showNotice('אין כרגע זוג פריטים תואמים למיזוג');
      return;
    }

    const selected = $('.cell.selected .board-item', board);

    if (selected && pair.includes(selected)) {
      syntheticTap(pair.find(item => item !== selected));
      return;
    }

    if (selected) syntheticTap(selected);

    window.setTimeout(() => {
      syntheticTap(pair[0]);

      window.setTimeout(() => {
        syntheticTap(pair[1]);
      }, 60);
    }, 60);
  }

  mergeBtn.addEventListener('click', mergeMatchingItems);

  /* 7. Update the creature information card from the selected tile */

  const avatar = $('#companionAvatar');
  const creatureName = $('#companionName');
  const creatureDesc = $('#companionDesc');
  const stageText = $('#stageText');

  const defaultAvatar = avatar?.innerHTML || '';
  const defaultName = creatureName?.textContent || '';
  const defaultDesc = creatureDesc?.textContent || '';

  function updateSelectedCreature() {
    const selected = $('.cell.selected .board-item', board);

    if (!selected) {
      if (avatar) avatar.innerHTML = defaultAvatar;
      if (creatureName) creatureName.textContent = defaultName;
      if (creatureDesc) creatureDesc.textContent = defaultDesc;
      return;
    }

    const art = selected.querySelector(
      'img.creature-portrait, img, svg'
    );

    const charm = avatar?.querySelector('.cosmetic-charm');

    if (avatar && art) {
      const copy = art.cloneNode(true);
      avatar.replaceChildren(copy);

      if (charm) avatar.append(charm.cloneNode(true));
    }

    const type = selected.dataset.type;
    const level = selected.dataset.level;

    const names = {
      wild: 'יצור מתפתח',
      egg: 'ביצת דרקון',
      gen: 'יוצר פריטים',
      incubator: 'מדגרת ביצים'
    };

    if (creatureName) {
      creatureName.textContent = names[type] || 'היצור שלך';
    }

    if (creatureDesc) {
      creatureDesc.textContent =
        `דרגה ${level} · מוכן להתפתחות`;
    }

    if (stageText) {
      stageText.textContent = `${level} / 8`;
    }
  }

  /* 8. Live mission counters based on the actual board */

  function updateMissionDisplay() {
    const mergesText = $('#mergeCount')?.textContent || '0';
    const merges = Number(mergesText.replace(/[^\d]/g, '')) || 0;

    const eggs = board.querySelectorAll(
      '.board-item[data-type="egg"]'
    ).length;

    const plants = board.querySelectorAll(
      '.board-item[data-type="wild"][data-level="2"]'
    ).length;

    function update(id, value, target) {
      const label = $(`#ref${id}Count`, missions);
      const bar = $(`#ref${id}Progress`, missions);

      if (label) label.textContent = `${Math.min(value, target)}/${target}`;

      if (bar) {
        bar.style.width =
          `${Math.min(100, value / target * 100)}%`;
      }
    }

    update('Merge', merges, 3);
    update('Egg', eggs, 3);
    update('Plant', plants, 5);
  }

  const observer = new MutationObserver(() => {
    updateSelectedCreature();
    updateMissionDisplay();
  });

  observer.observe(board, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['class', 'data-type', 'data-level']
  });

  /* 9. Navigation: preserve the original buttons and their event handlers */

  function makeNavButton(icon, label, className = '') {
    const button = document.createElement('button');

    button.type = 'button';
    button.className = `tool-btn ${className}`;

    button.innerHTML = `
      <span class="tool-icon">${icon}</span>
      <span class="tool-label">${label}</span>
      <span class="tool-sub"></span>
    `;

    return button;
  }

  shopBtn.querySelector('.tool-icon').textContent = '🛍️';
  shopBtn.querySelector('.tool-label').textContent = 'חנות';

  collectionBtn.querySelector('.tool-icon').textContent = '🎒';
  collectionBtn.querySelector('.tool-label').textContent = 'מלאי';

  missionsBtn.querySelector('.tool-icon').textContent = '🏆';
  missionsBtn.querySelector('.tool-label').textContent = 'הישגים';

  const playBtn = makeNavButton('🥚', 'משחק', 'primary');
  const mapBtn = makeNavButton('🗺️', 'מפה');
  const digitalBtn = makeNavButton('🌳', 'עולם דיגיטלי', 'digital-world');

  playBtn.addEventListener('click', () => {
    boardFrame.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });
  });

  const modalBackdrop = $('#modalBackdrop');
  const modalTitle = $('#modalTitle');
  const modalBody = $('#modalBody');

  mapBtn.addEventListener('click', () => {
    modalTitle.textContent = 'מפת העולמות';

    modalBody.innerHTML = `
      <div class="reference-map">
        <div class="reference-map-item"><span>🌳</span>יער הקסם</div>
        <div class="reference-map-item"><span>🌊</span>ממלכת המים</div>
        <div class="reference-map-item"><span>💎</span>מדבר הגבישים</div>
        <div class="reference-map-item"><span>☁️</span>איי השמיים</div>
        <div class="reference-map-item"><span>🏰</span>לומינה העתיקה</div>
        <div class="reference-map-note">
          ניתן להיכנס לתצוגת העולמות דרך כפתור העולם הדיגיטלי.
        </div>
      </div>
    `;

    modalBackdrop.classList.add('open');
  });

  digitalBtn.addEventListener('click', () => {
    window.location.href = './monster-lab.html';
  });

  const nav = document.createElement('nav');
  nav.className = 'reference-nav';
  nav.setAttribute('aria-label', 'ניווט במשחק');

  nav.append(
    shopBtn,
    collectionBtn,
    playBtn,
    mapBtn,
    missionsBtn,
    digitalBtn
  );

  oldTools.replaceWith(nav);

  updateSelectedCreature();
  updateMissionDisplay();

})();
