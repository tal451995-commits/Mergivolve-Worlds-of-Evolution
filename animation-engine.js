
/*
 * Mergivolve Animation Engine
 * Version 0.2.0
 * Visual effects only — never changes game state or saved progress.
 */
(function () {
  "use strict";

  const VERSION = "0.2.0";
  const STYLE_ID = "mrg-animation-engine-styles";
  const PARTICLE_CLASS = "mrg-ambient-particle";

  function reducedMotion() {
    return !!(
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }

  function installStyles() {
    if (document.getElementById(STYLE_ID)) return;

    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      .mrg-animation-scene {
        position: relative;
        isolation: isolate;
      }

      .mrg-animation-scene .mrg-ambient-light {
        position: absolute;
        inset: 0;
        pointer-events: none;
        z-index: 0;
        opacity: .5;
        mix-blend-mode: screen;
        background:
          radial-gradient(ellipse at 18% 18%,
            rgba(255,239,181,.19), transparent 54%),
          radial-gradient(ellipse at 83% 77%,
            rgba(128,205,157,.13), transparent 59%);
        animation: mrgAmbientGlow 9s ease-in-out infinite alternate;
      }

      .mrg-animation-scene .${PARTICLE_CLASS} {
        position: absolute;
        display: block;
        width: var(--mrg-particle-size, 4px);
        height: var(--mrg-particle-size, 4px);
        left: var(--mrg-particle-x, 50%);
        top: var(--mrg-particle-y, 80%);
        border-radius: 50%;
        background: rgba(255,246,204,.9);
        box-shadow: 0 0 8px rgba(255,236,163,.55);
        pointer-events: none;
        z-index: 3;
        opacity: 0;
        animation:
          mrgParticleFloat var(--mrg-particle-duration, 8s)
          ease-in-out var(--mrg-particle-delay, 0s) infinite;
      }

      .mrg-animation-scene .scene-cloud,
      .mrg-animation-scene .scene-tree,
      .mrg-animation-scene .scene-birds,
      .mrg-animation-scene .scene-foreground-leaf {
        will-change: translate;
      }

      .mrg-animation-scene .scene-cloud {
        translate: var(--mrg-cloud-x, 0px) var(--mrg-cloud-y, 0px);
      }

      .mrg-animation-scene .scene-tree {
        translate: var(--mrg-tree-x, 0px) var(--mrg-tree-y, 0px);
      }

      .mrg-animation-scene .scene-birds {
        translate: var(--mrg-birds-x, 0px) var(--mrg-birds-y, 0px);
      }

      .mrg-animation-scene .scene-foreground-leaf {
        translate: var(--mrg-leaf-x, 0px) var(--mrg-leaf-y, 0px);
      }

      @keyframes mrgAmbientGlow {
        from { opacity: .25; }
        to { opacity: .75; }
      }

      @keyframes mrgParticleFloat {
        0% {
          transform: translate3d(0, 12px, 0) scale(.7);
          opacity: 0;
        }
        20% { opacity: .65; }
        80% { opacity: .45; }
        100% {
          transform: translate3d(12px, -65px, 0) scale(1.15);
          opacity: 0;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .mrg-animation-scene .mrg-ambient-light,
        .mrg-animation-scene .${PARTICLE_CLASS} {
          animation: none !important;
          display: none !important;
        }
        .mrg-animation-scene .scene-cloud,
        .mrg-animation-scene .scene-tree,
        .mrg-animation-scene .scene-birds,
        .mrg-animation-scene .scene-foreground-leaf {
          translate: 0 0 !important;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function addParticles(scene, count) {
    if (scene.dataset.mrgAnimationReady === "true") return;

    scene.dataset.mrgAnimationReady = "true";
    scene.classList.add("mrg-animation-scene");

    const light = document.createElement("div");
    light.className = "mrg-ambient-light";
    light.setAttribute("aria-hidden", "true");
    scene.prepend(light);

    for (let i = 0; i < count; i++) {
      const particle = document.createElement("span");
      particle.className = PARTICLE_CLASS;
      particle.setAttribute("aria-hidden", "true");

      particle.style.setProperty(
        "--mrg-particle-x", (8 + Math.random() * 84) + "%"
      );
      particle.style.setProperty(
        "--mrg-particle-y", (35 + Math.random() * 60) + "%"
      );
      particle.style.setProperty(
        "--mrg-particle-size", (2 + Math.random() * 3) + "px"
      );
      particle.style.setProperty(
        "--mrg-particle-duration", (6 + Math.random() * 7) + "s"
      );
      particle.style.setProperty(
        "--mrg-particle-delay", (-Math.random() * 10) + "s"
      );

      scene.appendChild(particle);
    }
  }

  function addParallax(scene) {
    const layers = [
      { selector: ".scene-cloud", key: "cloud", x: 5, y: 2 },
      { selector: ".scene-tree", key: "tree", x: 2, y: 1 },
      { selector: ".scene-birds", key: "birds", x: 7, y: 3 },
      { selector: ".scene-foreground-leaf", key: "leaf", x: 3, y: 2 }
    ];

    const found = layers.map(function (layer) {
      return {
        config: layer,
        nodes: Array.from(scene.querySelectorAll(layer.selector))
      };
    }).filter(function (item) {
      return item.nodes.length > 0;
    });

    if (!found.length) return function () {};

    let rect;

    function measure() {
      rect = scene.getBoundingClientRect();
    }

    function move(event) {
      if (reducedMotion() || !rect) return;

      const px =
        ((event.clientX - rect.left) / Math.max(rect.width, 1) - .5) * 2;
      const py =
        ((event.clientY - rect.top) / Math.max(rect.height, 1) - .5) * 2;

      found.forEach(function (entry) {
        entry.nodes.forEach(function (node, index) {
          const direction = index % 2 ? -1 : 1;
          node.style.setProperty(
            "--mrg-" + entry.config.key + "-x",
            (px * entry.config.x * direction).toFixed(2) + "px"
          );
          node.style.setProperty(
            "--mrg-" + entry.config.key + "-y",
            (py * entry.config.y * direction).toFixed(2) + "px"
          );
        });
      });
    }

    function reset() {
      found.forEach(function (entry) {
        entry.nodes.forEach(function (node) {
          node.style.removeProperty("--mrg-" + entry.config.key + "-x");
          node.style.removeProperty("--mrg-" + entry.config.key + "-y");
        });
      });
    }

    measure();
    scene.addEventListener("pointerenter", measure);
    scene.addEventListener("pointermove", move, { passive: true });
    scene.addEventListener("pointerleave", reset);
    window.addEventListener("resize", measure, { passive: true });

    return function () {
      scene.removeEventListener("pointerenter", measure);
      scene.removeEventListener("pointermove", move);
      scene.removeEventListener("pointerleave", reset);
      window.removeEventListener("resize", measure);
      reset();
    };
  }

  function init(options) {
    const settings = Object.assign({
      sceneSelector: ".world-card",
      particleCount: 8
    }, options || {});

    if (!document.body) {
      return {
        active: false,
        reason: "document-body-not-ready",
        version: VERSION
      };
    }

    installStyles();

    const scenes = Array.from(
      document.querySelectorAll(settings.sceneSelector)
    );

    if (reducedMotion()) {
      return {
        active: true,
        version: VERSION,
        reducedMotion: true,
        scenesEnhanced: 0,
        destroy: function () {}
      };
    }

    const cleanup = [];

    scenes.forEach(function (scene) {
      addParticles(
        scene,
        Math.max(0, Math.min(24, Number(settings.particleCount) || 0))
      );
      cleanup.push(addParallax(scene));
    });

    return {
      active: true,
      version: VERSION,
      reducedMotion: false,
      scenesEnhanced: scenes.length,

      destroy: function () {
        cleanup.forEach(function (fn) { fn(); });

        scenes.forEach(function (scene) {
          scene.querySelectorAll(
            ".mrg-ambient-light, ." + PARTICLE_CLASS
          ).forEach(function (node) {
            node.remove();
          });

          scene.classList.remove("mrg-animation-scene");
          delete scene.dataset.mrgAnimationReady;
        });

        const style = document.getElementById(STYLE_ID);
        if (style) style.remove();
      }
    };
  }

  window.MergivolveAnimationEngine = {
    version: VERSION,
    init: init
  };
})();
