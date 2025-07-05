const condesnippets = {

  bindy: `<svelte:window bind:scrollY={y} />`,

  bindysvg: `<circle cx={y * 0.5} cy="50%" r="4%" fill="yellow" />`,

  viewbox: `<svg viewBox="{mySvg.x} {mySvg.y} {mySvg.width} {mySvg.height}">`,

  viewboxtween: `import { Tween } from "svelte/motion";
let width = new Tween(100, { duration: prefersReducedMotion.current ? 0 : 500, easing: cubicInOut });
let height = new Tween(100, { duration: prefersReducedMotion.current ? 0 : 500, easing: cubicInOut });

let mySvg = $derived({
  x: 0,
  y: 0,
  width: width.current,
  height: height.current,
});`,

smilAnimate: `<circle cx="40%" cy="40%" r="4%" fill="red">
  {#if !prefersReducedMotion}
    <animateTransform
      attributeName="transform"
      attributeType="XML"
      type="scale"
      from="1"
      to="1.5"
      dur="2s"
      repeatCount="indefinite"
    />
    <animate attributeName="opacity" from="1" to="0" dur="2s" repeatCount="indefinite" />
  {/if}
</circle>`,

smilAnimateMotion: `<circle cx="0" cy="0" r="4" fill="pink">
  {#if !prefersReducedMotion}
    <animateMotion
      path="M5 39.8583C18.5 28.5 49.5 17.0001 68.5 26.9999C87.0413 36.7583 38.2912 49.5638 41 67C44.3086 88.2977 80.2716 89 96 89"
      begin="0s"
      dur="10s"
      repeatCount="indefinite"
    />
  {/if}
</circle>`,

cssAnimation: `.cssvg circle {
  animation:
    move 2s cubic-bezier(0.645, 0.045, 0.355, 1) infinite,
    changeFill 4s ease 0s infinite alternate-reverse;
}

/* Animate CSS properties */
@keyframes changeFill {
  0% { fill: red; }
  100% { fill: blue; }
}

/* Animate with transform property */
@keyframes move {
  0% { transform: translate(0, 0); }
  25% { transform: translate(60%, 0%); }
  50% { transform: translate(60%, 60%); }
  75% { transform: translate(0%, 60%); }
  100% { transform: translate(0, 0);}
}`,

reduceMotion: `@media (prefers-reduced-motion: reduce) {
  .animated-element {
    animation: none;
  }
}`,
reduceMotionJS: `import { prefersReducedMotion } from 'svelte/motion';
if (prefersReducedMotion.current) {
  // Skip animations
} else {
  // Run animations
}`,

svgator: `<object
  type="image/svg+xml"
  data="svgator.svg"
  title="Rocket morphing into heart"
  style="height: 100px; width: 100px;">
</object>`,

lottieSimplePlay: `import lottie from "lottie-web";
let lottieContainer;

onMount(() => {
  // Lottie plain animation
  lottie.loadAnimation({
    container: lottieContainer, // First container
    renderer: "svg",
    loop: true,
    autoplay: true,
    path: "lottieAirplane.json",
  });
});`,

lottieSimplePlayHTML: `<div bind:this={lottieContainer} style="width: 100px; height: 100px;"></div>`,

lottieOnHover: `import lottie from "lottie-web";
let lottieHoverContainer;
let lottieHoverAnimation;

function lottieMouseEnter() {
    lottieHoverAnimation.goToAndPlay(0, true);
  }

onMount(() => {
  lottieHoverAnimation = lottie.loadAnimation({
    container: lottieHoverContainer,
    renderer: "svg",
    loop: false,
    autoplay: false,
    path: "lottieAirplane.json",
  });
});`,

lottieOnHoverHTML: `<div bind:this={lottieHoverContainer} on:mouseenter={lottieMouseEnter} style="width: 42px; height: auto;"></div>
`,

animotion: `// Initial values
const camera = tween({ x: -2.5, y: -2.5, w: 40, h: 40 });
const circle = tween({ x: 2.5, y: 2.5, r: 1.5, fill: "#00ffff" });
const text = tween({ count: 0, opacity: 0 });

// Animate
async function animate() {
  await camera.sfx(sfx.transition).to({ x: -1, y: -1, w: 12, h: 12 });
  
  circle.sfx(sfx.transition).to({ x: 10, y: 10, r: 3, fill: "#ffff00" })
  camera.to({ x: 4, y: 4 })
  await text.to({ opacity: 1 }, { duration: 300 })

  text.sfx(sfx.tally).to({ count: 10_000 }, { duration: 600 });
}`,
mapLibre: `map.flyTo({
  center: [lng, lat],
  zoom: zoom,
  pitch: pitch, // Tilt
  speed: 0.2, // Speed
  curve: 1.42,
  easing: (t) => t * ( 2 - t), // Easing function
});`,


};

export default condesnippets;