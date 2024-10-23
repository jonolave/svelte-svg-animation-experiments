<script>
  import { tweened } from "svelte/motion";
  import { cubicInOut } from "svelte/easing";
  import { onMount } from "svelte";

  import "animate.css"; // for https://animate.style/

  import Prism from "prismjs"; // for showing code snippets
  import "prismjs/themes/prism-tomorrow.css";
  import condeSnippets from "./assets/codesnippets.js"; // my code snippets

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

  function applyAnimate(animationClass) {
    const animatedText = document.getElementById("animateStyleSVG").querySelectorAll("text");

    animatedText.forEach((text) => {
      text.classList.add("animate__animated", `${animationClass}`);

      // Remove the class after 3 seconds (3000 milliseconds)
      setTimeout(() => {
        text.classList.remove("animate__animated", `${animationClass}`);
      }, 2100);
    });
  }

  onMount(() => {
    Prism.highlightAll();

    // function from svgator
  });
</script>

<svelte:window bind:scrollY={y} />

<div style="min-height: 200vh; position: relative; max-width: 600px; padding: 10px;">
  <!-- Scroll position -->
  <div>
    <h1>Bind scroll position to SVG attribute</h1>
    <p>With svelte window bind. Scroll position: {Math.round(y)}</p>
    <svg viewBox="0 0 100 25" style="height: 100px; width: 400px;" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="100" height="25" fill="black" />
      <circle cx={y * 0.5} cy="50%" r="4%" fill="yellow" />
    </svg>
    <p>Get the y scroll position:</p>
    <pre><code class="language-html">{condeSnippets.bindy}</code></pre>
    <p>Do calculations (if any), and apply to an attribute in the SVG.</p>
    <pre><code class="language-markup">{condeSnippets.bindysvg}</code></pre>
  </div>

  <!-- Zoom -->
  <div>
    <h1>Zoom using Svelte and viewBox</h1>
    <p>
      Create smooth zoom effects in an SVG. The graphics in the SVG can go beyond the current viewBox. Inspired by
      <a href="https://youtu.be/_jWnyJRKOvU">this video</a>
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

      <strong>Circle:</strong>
      % size.
      <strong>Rect:</strong>
      px size.
    </p>
    <p>Use Tweened from Svelte Motion to get smooth zoom transitions.</p>
    <pre><code class="language-javascript">{condeSnippets.viewboxtween}</code></pre>
    <p>Do calculations in JS and set the SVG viewBox.</p>
    <pre><code class="language-markup">{condeSnippets.viewbox}</code></pre>
  </div>

  <!-- SMIL -->
  <div>
    <h1>Animation with SMIL</h1>
    <p>
      <strong>SMIL</strong>
      =
      <a href="https://developer.mozilla.org/en-US/docs/Web/SVG/SVG_animation_with_SMIL">
        Synchronized Multimedia Integration Language
      </a>
      . Native SVG animations, no CSS or JS. Works in modern browsers, but not in <a href="https://www.svgbackgrounds.com/is-smil-dead-in-2022/">Internet Explorer (officially retired) and Opera Mini.</a> Can do things that can't be done with CSS: animating movement along a path, <a href="https://css-tricks.com/many-tools-shape-morphing/">morphing shapes</a>, and animating gradients.
    </p>
    <ul>
      <li>
        <strong>&lt;animateTransform&gt;</strong>
        – animate transformations such as rotation, scaling, or translation.
      </li>
      <li>
        <strong>&lt;animate&gt;</strong>
        – animate any attribute of an SVG element.
      </li>
      <li>
        <strong>&lt;animateMotion&gt;</strong>
        – animates an object along a defined path.
      </li>
    </ul>

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

    <p>Red circle animated using &lt;animateTransform&gt; and &lt;animate&gt;:</p>
    <pre><code class="language-markup">{condeSnippets.smilAnimate}</code></pre>
    <p>Pink circle follows path using &lt;animateMotion&gt;:</p>
    <pre><code class="language-markup">{condeSnippets.smilAnimateMotion}</code></pre>
  </div>

  <!-- CSS animations -->
  <div>
    <h1>CSS animation / Web animation API</h1>
    <p>
      Use <a href="https://www.w3schools.com/css/css3_animations.asp"><strong>CSS animation</strong></a>
      to animate fill, stroke, and opacity in SVG. Other properties in SVG might not work.
    </p>

    <p>
      Use
      <a href="https://www.w3schools.com/css/css3_2dtransforms.asp">CSS transform animation</a>
      for smooth, hardware-accelerated animations like scaling, rotating, and translating (moving) SVG elements.
    </p>
    <p>
      There is other fancy stuff that has <a
        href="https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timeline#browser_compatibility"
      >
        limited browser compatibility
      </a>
      for now.See also
      <a href="https://www.svgator.com/help/technical-issues/browser-support">Browser support for animated SVG</a>
    </p>

    <p>
      Objects animate from their initial positions. Tip: use <a href="https://cubic-bezier.com/">cubic-bezier.com</a>
      for previewing custom timing functions. Here: cubicInOut.
    </p>

    <svg class="cssvg" viewBox="0 0 100 100" style="height: 400px; width: 400px;" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="100" height="100" fill="black" />
      <circle cx="20%" cy="20%" r="4%" fill="red" />
    </svg>
    <p>CSS in &lt;style&gt;:</p>
    <pre><code class="language-css">{condeSnippets.cssAnimation}</code></pre>
    <h2 style="margin-top: 2rem;">Reduce motion for accessibility</h2>
    <p>Respect users' system preferences for reduced motion. Modify or remove animations and transitions:</p>
    <pre><code class="language-css">{condeSnippets.reduceMotion}</code></pre>
  </div>

  <!-- Animate.style -->
  <div>
    <h1>Animate.style</h1>
    <p>
      <a href="https://animate.style/">Animate.css</a>
      provides CSS animations with utility classes. As with other CSS animations, it might not work as expected for SVGs.
      Respects 'prefers-reduced-motion'. Can also override the CSS variables, keyframes, and combine it with Javascript.
    </p>
    <div style="display: flex; flex-wrap: wrap; gap: 0.5em; margin-bottom: 2rem;">
      <button on:click={() => applyAnimate("animate__bounce")}>bounce</button>
      <button on:click={() => applyAnimate("animate__headShake")}>headShake</button>
      <button on:click={() => applyAnimate("animate__jello")}>jello</button>
      <button on:click={() => applyAnimate("animate__backOutDown")}>backOutDown</button>
      <button on:click={() => applyAnimate("animate__bounceIn")}>bounceIn</button>
      <button on:click={() => applyAnimate("animate__hinge")}>hinge</button>
      <button on:click={() => applyAnimate("animate__lightSpeedInRight")}>lightSpeedInRight</button>
    </div>

    <svg
      id="animateStyleSVG"
      viewBox="0 0 400 400"
      style="height: 400px; width: 400px;"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="0" y="0" width="400" height="400" fill="black" />
      <text
        style="transform-box: fill-box; transform-origin: center"
        x="200"
        y="200"
        fill="white"
        font-size="40"
        text-anchor="middle"
      >
        Hello!
      </text>
    </svg>
  </div>

  <!-- svgator export -->
  <div>
    <h1>Animation with Svgatpr</h1>
    <p><a href="https://app.svgator.com/">Svgator</a> is an online editor. Exports as CSS animations (with the limitations that follow) or with JavaScript embedded in the SVG. Easiest to load as external file.</p>
    <object type="image/svg+xml" data="svgator.svg" title="Rocket morphing into heart" style="height: 100px; width: 100px;">
      <!-- Fallback content if the SVG can't be loaded -->
      Your browser does not support SVG.
    </object>
  </div>

  <!-- Other.. -->
  <div style="margin-bottom: 10em;">
    <h1>Other to look into...</h1>
    <p>
      <a href="https://gsap.com/">GSAP</a>
      (just
      <a href="https://gsap.com/blog/webflow-GSAP/">acquired by Webflow</a>
      ).
    </p>
    <p>Lottiefiles</p>
    <p>
      <a href="http://snapsvg.io/">SNAP</a>
      - JS lib for creating / editing SVG. With
      <a href="https://css-tricks.com/snap-animation-states/">JavaScript API for animation</a>
    </p>
    <p>
      (more) Svelte with SVG Animations. Recreate <a href="https://youtu.be/_jWnyJRKOvU">this video</a>
    </p>
    <p></p>
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

  code {
    font-family: "Fira Code", monospace;
    font-size: 0.95rem;
    white-space: pre-wrap;
    word-wrap: break-word;
  }

  pre {
    border-radius: 0.5rem;
  }
</style>
