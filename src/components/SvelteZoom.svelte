<script>
  import { tweened } from "svelte/motion";
  import { cubicInOut } from "svelte/easing";

   // Check for the user's reduced motion preference
   const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Create tweened stores for width and height
  // If reduced motion: 0 duration
  let width = tweened(100, { duration: prefersReducedMotion ? 0 : 500, easing: cubicInOut });
  let height = tweened(100, { duration: prefersReducedMotion ? 0 : 500, easing: cubicInOut });

  let mySvg = $derived({
    x: 0,
    y: 0,
    width: $width,
    height: $height,
  });

  function zoom(x, y) {
    const newWidth = mySvg.width * x;
    const newHeight = mySvg.height * y;

    width.set(newWidth);
    height.set(newHeight);
  }

  function resetZoom() {
    width.set(100);
    height.set(100);
  }
</script>

<div style="margin-bottom: 1em;">
  <button onclick={() => zoom(1.25, 1.25)}>Zoom out</button>
  <button onclick={() => zoom(0.8, 0.8)}>Zoom in</button>
  <button onclick={() => resetZoom()}>Reset</button>
</div>

<svg
  viewBox="{mySvg.x} {mySvg.y} {mySvg.width} {mySvg.height}"
  style="height: 400px; width: 400px;"
  xmlns="http://www.w3.org/2000/svg"
>
  <!-- Background -->
  <rect x="0" y="0" width="400" height="400" fill="black" />
  <rect x="10" y="10" width="80" height="80" fill="#55555533" />
  <rect x="20" y="20" width="60" height="60" fill="#55555533" />
  <rect x="30" y="30" width="40" height="40" fill="#55555533" />

  <!-- Gridlines -->
  {#each { length: 40 } as _, i}
    <line x1="0" y1={i * 10} x2="400" y2={i * 10} stroke="#88888833" stroke-width="0.5" />
    <line x1={i * 10} y1="0" x2={i * 10} y2="400" stroke="#88888833" stroke-width="0.5" />
  {/each}

  <!-- Transform animation -->
  <circle cx="40%" cy="40%" r="4%" fill="red" class="animated" />
  <rect x="38%" y="58%" width="4" height="4" fill="red" />
  <circle cx="60" cy="40" r="4%" fill="blue" />
  <rect x="58" y="58" width="4" height="4" fill="blue" />
</svg>
