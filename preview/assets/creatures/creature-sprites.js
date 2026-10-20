
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
    7: { file: 'draglet.png', alt: 'Dragon Hatchling' },
    8: { file: 'dragonet.png', alt: 'Evolved Dragon' }
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
      filter: drop-shadow(0 3px 3px rgba(25,49,34,.2));
      transform-origin: center bottom;
      animation: creaturePortraitIdle 3.2s ease-in-out infinite;
    }

    @keyframes creaturePortraitIdle {
      0%, 100% {
        transform: translateY(0) rotate(0deg);
      }
      50% {
        transform: translateY(-2px) rotate(.5deg);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .board-item img.creature-portrait {
        animation: none;
      }
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
