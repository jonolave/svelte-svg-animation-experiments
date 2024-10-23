<script>
  import { tweened } from "svelte/motion";
  import { cubicInOut } from "svelte/easing";

  // Create tweened stores for width and height
  let width = tweened(100, { duration: 500, easing: cubicInOut });
  let height = tweened(100, { duration: 500, easing: cubicInOut });

  $: mySvg = {
    x: 0,
    y: 0,
    width: $width,
    height: $height,
  };

  var y = 0;

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

<svelte:window bind:scrollY={y} />

<div style="min-height: 200vh; position: relative; max-width: 400px; padding: 10px;">
  <!-- Scroll position -->
  <div>
    <h1>Bind scroll position to SVG attribute</h1>
    <p>With svelte window bind. Scroll position: {Math.round(y)}</p>
    <svg viewBox="0 0 100 25" style="height: 100px; width: 400px;" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="100" height="25" fill="black" />
      <circle cx={y * 0.5} cy="50%" r="4%" fill="yellow"></circle>
    </svg>
  </div>

  <!-- Zoom -->
  <div>
    <h1>Zoom using Svelte and viewBox</h1>
    <p>
      Change width and height of SVG viewBox to zoom.
      Tweened store and Easing cubicInOut from Svelte.
      Use % to keep things in the same place; px to zoom.
      Inspired by
      <a href="https://youtu.be/_jWnyJRKOvU">this</a>
      .
    </p>
    <div style="margin-bottom: 1em;">
      <button on:click={() => zoom(1.25, 1.25)}>Zoom out</button>
      <button on:click={() => zoom(0.8, 0.8)}>Zoom in</button>
      <button on:click={() => resetZoom()}>Reset</button>
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
    <p>
      <strong>Red:</strong>
      % position.
      <strong>Blue:</strong>
      px position.
      <br />
      <strong>Circle:</strong>
      % size.
      <strong>Rect:</strong>
      px size.
    </p>
  </div>

  <!-- SMIL -->
  <div>
    <h1>Animation with SMIL</h1>
    <p>
      <strong>SMIL</strong>
      = Synchronized Multimedia Integration Language.
      <br />
      Native SVG animations, no CSS or JS.
      <a href="https://caniuse.com/svg-smil">Limited browser support.</a>
      .
      <br />

      <br />
      <strong>&lt;animateTransform&gt;</strong>
      – animate transformations such as rotation, scaling, or translation.
      <br />
      <strong>&lt;animate&gt;</strong>
      – animate any attribute of an SVG element.
      <br />
      <strong>&lt;animateMotion&gt;</strong>
      – animates an object along a defined path.
    </p>
    <svg viewBox="0 0 100 100" style="height: 400px; width: 400px;" xmlns="http://www.w3.org/2000/svg">
      <!-- Background -->
      <rect x="0" y="0" width="100" height="100" fill="black" />

      <!-- Transform animation -->
      <circle cx="40%" cy="40%" r="4%" fill="red">
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
      </circle>

      <!-- Animated pink circle following path -->
      <circle cx="0" cy="0" r="4" fill="pink">
        <animateMotion
          path="M5 39.8583C18.5 28.5 49.5 17.0001 68.5 26.9999C87.0413 36.7583 38.2912 49.5638 41 67C44.3086 88.2977 80.2716 89 96 89"
          begin="0s"
          dur="10s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  </div>

  <!-- CSS -->
  <div>
    <h1>CSS animation</h1>
    <p>
      Use <a href="https://www.w3schools.com/css/css3_animations.asp"><strong>CSS animation</strong></a>
      to animate fill, stroke, and opacity in SVG.
      <br />
      Other properties in SVG might not work.
    </p>

    <p>
      Use
      <a href="https://www.w3schools.com/css/css3_2dtransforms.asp">CSS transform animation</a>
      for smooth, hardware-accelerated
      <br />
      animations like scaling, rotating, and translating (moving) SVG elements.
      <br />
    </p>

    <p>
      Objects animate from their initial positions. This examples uses <br />
      CSS animation to change fill, and transform:translate to move with cubicInOut.
    </p>

    <svg class="cssvg" viewBox="0 0 100 100" style="height: 400px; width: 400px;" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="100" height="100" fill="black" />
      <circle cx="20%" cy="20%" r="4%" fill="red" />
    </svg>
  </div>

  <!-- Other.. -->
  <div style="margin-bottom: 10em;">
    <h1>Other to look into...</h1>
    <p>Other options: GSAP, SNAP, Lottiefiles, Web Animations API, (more) Svelte with SVG Animations.</p>
    <p>https://animate.style/ - tips frå Prash</p>
  </div>
</div>

<style>
  .cssvg circle {
    animation:
      move 2s cubic-bezier(0.645, 0.045, 0.355, 1) infinite,
      changeFill 4s ease 0s infinite alternate-reverse;
  }

  /* Animate CSS properties */
  @keyframes changeFill {
    0% {
      fill: red;
    }
    100% {
      fill: blue;
    }
  }

  /* Animate with transform property */
  @keyframes move {
    0% {
      transform: translate(0, 0);
    }
    25% {
      transform: translate(60%, 0%);
    }
    50% {
      transform: translate(60%, 60%);
    }
    75% {
      transform: translate(0%, 60%);
    }
    100% {
      transform: translate(0, 0);
    }
  }
</style>
