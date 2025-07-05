// src/lib/animate.js
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function animate(node, options = {}) {
  const { type = 'from', scrollTrigger, ...args } = options;
  const method = gsap[type];
  if (!method) {
    console.warn(`GSAP method "${type}" does not exist.`);
    return {};
  }

  const tween = method(node, {
    ...args,
    scrollTrigger: scrollTrigger
      ? {
          ...scrollTrigger,
          trigger: scrollTrigger.trigger || node
        }
      : undefined
  });

  return {
    destroy() {
      tween.kill();
      if (scrollTrigger && tween.scrollTrigger) {
        tween.scrollTrigger.kill();
      }
    }
  };
}
