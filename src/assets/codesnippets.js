const condesnippets = {

  bindy: `<svelte:window bind:scrollY={y} />`,

  bindysvg: `<circle cx={y * 0.5} cy="50%" r="4%" fill="yellow" />`,

  viewbox: `<svg viewBox="{mySvg.x} {mySvg.y} {mySvg.width} {mySvg.height}">`,

  viewboxtween: `import { tweened } from "svelte/motion";
let width = tweened(100, { duration: 500, easing: cubicInOut });
let height = tweened(100, { duration: 500, easing: cubicInOut });

$: mySvg = {
  x: 0,
  y: 0,
  width: $width,
  height: $height,
};`,

smilAnimate: `<circle cx="40%" cy="40%" r="4%" fill="red">
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
</circle>`,

smilAnimateMotion: `<circle cx="0" cy="0" r="4" fill="pink">
  <animateMotion
    path="M5 39.8583C18.5 28.5 49.5 17.0001 68.5 26.9999C87.0413 36.7583 38.2912 49.5638 41 67C44.3086 88.2977 80.2716 89 96 89"
    begin="0s"
    dur="10s"
    repeatCount="indefinite"
  />
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
};

export default condesnippets;