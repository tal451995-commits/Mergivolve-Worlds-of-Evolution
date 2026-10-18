
/*
 * Mergivolve — PNG Creature Sprite Adapter
 * Uses existing PNG files from the repository root.
 * No JPG fallback and no character zoom animation.
 */
(() => {
  'use strict';

  const IMAGE_BASE = './';

  // These PNG files already exist in the repository root.
  const CREATURES_BY_LEVEL = {
    1: { file: 'draglet.png', alt: 'Draglet' },
    2: { file: 'dragonet.png', alt: 'Dragonet' },
    3: { file: 'draco.png', alt: 'Draco' },
    4: { file: 'flameheart.png', alt: 'Flameheart' },
    5: { file: 'crystalwing.png', alt: 'Crystalwing' },
    6: { file: 'frostfang.png', alt: 'Frostfang' },
    7: { file: 'hydra.png', alt: 'Hydra' },
    8: { file: 'tengu.png', alt: 'Tengu' }
  };

  const style = document.createElement('style');

  style.textContent = `
    .board-item img.creature-portrait {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: contain;
      object-position: center bottom;
      pointer-events: none;
      user-select: none;
      -webkit-user-drag: none;
      filter: drop-shadow(0 2px 2px rgba(25,49,34,.15));
      animation: none !important;
      transform: none !important;
      transition: none !important;
    }

    /* Prevent temporary zooming when an item appears or merges. */
    .board-item.merge-pop,
    .board-item.spawn-pop {
      animation: none !important;
      transform: none !important;
    }
  `;

  document.head.appendChild(style);

  function enhanceBoard() {
    document
      .querySelectorAll('.board-item[data-type="wild"]')
      .forEach((node) => {
        const level = Number(node.dataset.level || 1);
        const creature = CREATURES_BY_LEVEL[level];

        if (!creature) return;

        if (
          node.dataset.creatureError === creature.file
        ) {
          return;
        }

        const existingImage =
          node.querySelector('img.creature-portrait');

        if (
          node.dataset.creatureSprite === creature.file &&
          existingImage
        ) {
          return;
        }

        const svg = node.querySelector('svg');
        if (!svg) return;

        const fallbackSvg = svg.cloneNode(true);
        const img = document.createElement('img');

        img.className = 'creature-portrait';
        img.dataset.file = creature.file;
        img.src = IMAGE_BASE + creature.file;
        img.alt = creature.alt;
        img.draggable = false;
        img.decoding = 'async';
        img.loading = 'eager';

        img.addEventListener('load', () => {
          delete node.dataset.creatureError;
        }, { once: true });

        img.addEventListener('error', () => {
          if (img.isConnected) {
            img.replaceWith(fallbackSvg);
          }

          delete node.dataset.creatureSprite;
          node.dataset.creatureError = creature.file;

          console.warn(
            '[Mergivolve] PNG could not load:',
            img.src
          );
        }, { once: true });

        svg.replaceWith(img);
        node.dataset.creatureSprite = creature.file;
        delete node.dataset.creatureError;
      });
  }

  function start() {
    const board = document.querySelector('#board');

    if (!board) {
      console.warn('[Mergivolve] Board not found.');
      return;
    }

    enhanceBoard();

    const observer = new MutationObserver(enhanceBoard);

    observer.observe(board, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['data-level', 'data-type']
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, {
      once: true
    });
  } else {
    start();
  }
})();
