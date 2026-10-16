/*
 * Mergivolve — JPG Creature Image Adapter
 * Uses the existing JPG files in the repository root.
 * Keeps the original merge logic unchanged.
 */
(() => {
  'use strict';

  // merge-game.html is in the repository root.
  // Therefore these image URLs are relative to that page.
  const IMAGE_BASE = './';

  
  const CREATURES_BY_LEVEL = {
    1: {
      file: 'forest_hatchling.jpg',
      alt: 'Forest Hatchling'
    },
    2: {
      file: 'red_hatchling.jpg',
      alt: 'Red Hatchling'
    },
    3: {
      file: 'volcanic_baby_dino.jpg',
      alt: 'Volcanic Baby Dino'
    },
    4: {
      file: 'verdant_drake.jpg',
      alt: 'Verdant Drake'
    },
    5: {
      file: 'ember_heart.jpg',
      alt: 'Ember Heart'
    },
    6: {
      file: 'coral_sentinel.jpg',
      alt: 'Coral Sentinel'
    },
    7: {
      file: 'geode_dragon.jpg',
      alt: 'Geode Dragon'
    },
    8: {
      file: 'celestial_wyrm.jpg',
      alt: 'Celestial Wyrm'
    }
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
      filter: drop-shadow(0 2px 3px rgba(25,49,34,.18));
      animation: creatureEnter .22s ease-out both;
    }

    @keyframes creatureEnter {
      from {
        transform: translateY(3px) scale(.94);
        opacity: .75;
      }
      to {
        transform: translateY(0) scale(1);
        opacity: 1;
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
          node.dataset.creatureSprite === creature.file ||
          node.dataset.creatureError === creature.file
        ) {
          return;
        }

        const svg = node.querySelector('svg');
        if (!svg) return;

        const fallbackSvg = svg.cloneNode(true);
        const img = document.createElement('img');

        img.className = 'creature-portrait';
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
            '[Mergivolve] Could not load creature image:',
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
