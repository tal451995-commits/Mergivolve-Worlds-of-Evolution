
/*
 * Mergivolve Animation Engine
 * Version: 0.1.0
 *
 * Isolated visual-effects foundation.
 * Does not modify game logic, board state, or saved progress.
 */

(function () {
  "use strict";

  const ENGINE_VERSION = "0.1.0";
  const STYLE_ID = "mrg-animation-engine-styles";
  const PARTICLE_CLASS = "mrg-ambient-particle";

  function prefersReducedMotion() {
    return (
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
        overflow: hidden;
      }

      .mrg-animation-scene .mrg-ambient-light {
        position: absolute;
        inset: 0;
        pointer-events: none;
        z-index: 0;
        opacity: 0;
        background:
          radial-gradient(
            ellipse at 15% 15%,
            rgba(255, 239, 181, 0.22),
            transparent 55%
          ),
          radial-gradient(
            ellipse at 85% 80%,
            rgba(128, 205, 157, 0.15),
            transparent 60%
          );
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
        background: rgba(255, 246, 204, 0.9);
        box-shadow: 0 0 8px rgba(255, 236, 163, 0.55);
        pointer-events: none;
        z-index: 1;
        opacity: 0;
        animation: mrgParticleFloat var(--mrg-particle-duration, 8s)
          ease-in-out var(--mrg-particle-delay, 0s) infinite;
      }

      @keyframes mrgAmbientGlow {
        from { opacity: 0.35; }
        to { opacity: 0.9; }
      }

      @keyframes mrgParticleFloat {
        0% {
          transform: translate3d(0, 12px, 0) scale(0.7);
          opacity: 0;
        }
        20% { opacity: 0.65; }
        80% { opacity: 0.45; }
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
      }
    `;

    document.head.appendChild(style);
  }

  function addSceneEffects(scene, particleCount) {
    if (scene.dataset.mrgAnimationReady === "true") return;

    scene.dataset.mrgAnimationReady = "true";
    scene.classList.add("mrg-animation-scene");

    const light = document.createElement("div");
    light.className = "mrg-ambient-light";
    light.setAttribute("aria-hidden", "true");
    scene.prepend(light);

    for (let i = 0; i < particleCount; i += 1) {
      const particle = document.createElement("span");
      particle.className = PARTICLE_CLASS;
      particle.setAttribute("aria-hidden", "true");

      particle.style.setProperty(
        "--mrg-particle-x",
        `${8 + Math.random() * 84}%`
      );
      particle.style.setProperty(
        "--mrg-particle-y",
        `${35 + Math.random() * 60}%`
      );
      particle.style.setProperty(
        "--mrg-particle-size",
        `${2 + Math.random() * 3}px`
      );
      particle.style.setProperty(
        "--mrg-particle-duration",
        `${6 + Math.random() * 7}s`
      );
      particle.style.setProperty(
        "--mrg-particle-delay",
        `${-Math.random() * 10}s`
      );

      scene.appendChild(particle);
    }
  }

  function init(options) {
    const settings = Object.assign(
      {
        sceneSelector: ".world-card",
        particleCount: 10
      },
      options || {}
    );

    if (!document.body) {
      return {
        active: false,
        reason: "document-body-not-ready",
        version: ENGINE_VERSION
      };
    }

    installStyles();

    const scenes = Array.from(
      document.querySelectorAll(settings.sceneSelector)
    );

    if (prefersReducedMotion()) {
      return {
        active: true,
        version: ENGINE_VERSION,
        reducedMotion: true,
        scenesEnhanced: 0,
        destroy: function () {}
      };
    }

    scenes.forEach(function (scene) {
      addSceneEffects(
        scene,
        Math.max(0, Math.min(30, Number(settings.particleCount) || 0))
      );
    });

    return {
      active: true,
      version: ENGINE_VERSION,
      reducedMotion: false,
      scenesEnhanced: scenes.length,

      destroy: function () {
        scenes.forEach(function (scene) {
          scene
            .querySelectorAll(
              ".mrg-ambient-light, ." + PARTICLE_CLASS
            )
            .forEach(function (element) {
              element.remove();
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
    version: ENGINE_VERSION,
    init: init
  };
})();
