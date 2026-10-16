
/*
 * Mergivolve Creature Sprite Adapter
 * Connects creature PNG assets to the existing merge board.
 * Keeps the existing merge/game logic untouched.
 */
(() => {
  'use strict';

  const ASSET_BASE = './assets/creatures/';

  const CREATURES_BY_LEVEL = {
    1: { file: 'sprig.png', alt: 'Sprig — דרקון היער' },
    2: { file: 'emberflit.png', alt: 'Emberflit — לטאת האש' },
    3: { file: 'luma.png', alt: 'Luma — חד־קרן האור' },
    4: { file: 'mossy.png', alt: 'Mossy — שומר האבן' },
    5: { file: 'bubbles.png', alt: 'Bubbles — יצור המעמקים' },
    6: { file: 'nocti.png', alt: 'Nocti — שועל הירח' },
    7: { file: 'volt.png', alt: 'Volt — דרקון הברק' },
    8: { file: 'prisma.png', alt: 'Prisma — דרקון הגביש' }
  };

  const style = document.createElement('style');
  style.textContent = `
    .board-item img.creature-portrait {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: contain;
      pointer-events: none;
      user-select: none;
      -webkit-user-drag: none;
      filter: drop-shadow(0 2px 2px rgba(25,49,34,.13));
      animation: creatureEnter .22s ease-out both;
    }

    @keyframes creatureEnter {
      from { transform: translateY(3px) scale(.94); opacity: .75; }
      to { transform: translateY(0) scale(1); opacity: 1; }
    }
  `;
  document.head.appendChild(style);

  function enhanceBoard() {
    document
      .querySelectorAll('.board-item[data-type="wild"]')
      .forEach((node) => {
        const level = Number(node.dataset.level || 1);
        const creature = CREATURES_BY_LEVEL[level];

        if (
          !creature ||
          node.dataset.creatureSprite === creature.file ||
          node.dataset.creatureError === creature.file
        ) return;

        const svg = node.querySelector('svg');
        if (!svg) return;

        const fallbackSvg = svg.cloneNode(true);
        const img = document.createElement('img');

        img.className = 'creature-portrait';
        img.src = ASSET_BASE + creature.file;
        img.alt = creature.alt;
        img.draggable = false;
        img.decoding = 'async';
        img.loading = 'eager';

        img.addEventListener('error', () => {
          if (img.isConnected) img.replaceWith(fallbackSvg);
          delete node.dataset.creatureSprite;
          node.dataset.creatureError = creature.file;
        }, { once: true });

        svg.replaceWith(img);
        node.dataset.creatureSprite = creature.file;
        delete node.dataset.creatureError;
      });
  }

  function start() {
    enhanceBoard();

    const board = document.querySelector('#board');
    if (!board) return;

    const observer = new MutationObserver(enhanceBoard);
    observer.observe(board, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['data-level', 'data-type']
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
})();
