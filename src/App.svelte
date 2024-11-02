<script>
  import { onMount } from "svelte";

  // Example components
  import SvelteZoom from "./components/SvelteZoom.svelte";
  import SMILanimation from "./components/SMILanimation.svelte";
  import SVGator from "./components/SVGator.svelte";
  import AnimateStyle from "./components/AnimateStyle.svelte";
  import CSSanimation from "./components/CSSanimation.svelte";
  import LottieonHover from "./components/LottieOnHover.svelte";
  import LottiePlayAndLoop from "./components/LottiePlayAndLoop.svelte";
  import AnimotionJS from "./components/AnimotionJS.svelte";
  import SplineScene from "./components/SplineScene.svelte";
  import MapLibre from "./components/MapLibre.svelte";
  import RiveExampleStatic from "./components/RiveExampleStatic.svelte"; 
  import RiveExampleInteractive from "./components/RiveExampleInteractive.svelte"; 


  // Prism for showing code snippets
  import Prism from "prismjs";
  import "prismjs/themes/prism-tomorrow.css";
  import condeSnippets from "./assets/codesnippets.js"; // my code snippets

  // Scroll position and SVG
  let y = 0;
  let svgTop = 0;
  let hasEnteredViewport = false;
  let scrollSinceSvgInView = 0;

  //  Map
  let mapPosition = {
    lng: 10.754,
    lat: 59.92,
    zoom: 12,
    pitch: 0,
  };

  function animateMap() {
    mapPosition.lng = 10.754;
    mapPosition.lat = 59.92 + Math.random() * 0.1;
    mapPosition.zoom = 12 + Math.random() * 0.1;
    mapPosition.pitch = Math.random() * 50;
  }

  onMount(() => {
    Prism.highlightAll();

    const svgElement = document.querySelector("#mySVG");

    if (svgElement) {
      // Calculate the SVG's position relative to the document
      svgTop = svgElement.getBoundingClientRect().top + window.scrollY;
    }
  });

  // Start counting when the SVG enters the viewport
  $: if (!hasEnteredViewport && y + window.innerHeight >= svgTop) {
    hasEnteredViewport = true;
  }

  // Calculate scroll distance since the SVG entered the viewport
  $: if (hasEnteredViewport) {
    scrollSinceSvgInView = y + window.innerHeight - svgTop;
  }
</script>

<svelte:window bind:scrollY={y} />

<main style="min-height: 200vh; position: relative; max-width: 600px; padding: 10px;">
  <h1>SVG animations</h1>
  <p>
    Here are some examples of how to animate SVGs in Svelte. The examples are not exhaustive, but should give you a good
    starting point.
  </p>

  <!-- Reduced motion -->
  <div>
    <h2>On reduced motion</h2>
    <p>Users can enable 'reduced motion' in their OS, and we should respect their choice.</p>
    <p>In CSS, set options for reduced motion like this:</p>
    <pre><code class="language-css">{condeSnippets.reduceMotion}</code></pre>
    <p>For non-CSS animation, use JavaScript to check for reduced motion:</p>
    <pre><code class="language-js">{condeSnippets.reduceMotionJS}</code></pre>
    <p>To test the result yourself, enable 'Reduced motion' like so:</p>
    <ul>
      <li>Mac: System settings &gt; Accessibbility &gt; Display &gt; Reduce motion (turn on)</li>
      <li>iPhone: System settings &gt; Accessibbility &gt; Motion &gt; Reduce motion (turn on)</li>
    </ul>
  </div>

  <!-- SMIL -->
  <div>
    <h2>Animation with SMIL</h2>
    <p>
      <strong>SMIL</strong>
      =
      <a href="https://developer.mozilla.org/en-US/docs/Web/SVG/SVG_animation_with_SMIL">
        Synchronized Multimedia Integration Language
      </a>
      . Native SVG animations, no CSS or JS. Works in modern browsers, but not in
      <a href="https://www.svgbackgrounds.com/is-smil-dead-in-2022/">
        Internet Explorer (officially retired) and Opera Mini.
      </a>
      Can do things that can't be done with CSS: animating movement along a path,
      <a href="https://css-tricks.com/many-tools-shape-morphing/">morphing shapes</a>
      , and animating gradients.
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

    <SMILanimation />
    <p>
      You need to use JavaScript to detect reduced motion. Exclude or adapt animation block accordingly. Red circle
      animated using &lt;animateTransform&gt; and &lt;animate&gt;:
    </p>
    <pre><code class="language-markup">{condeSnippets.smilAnimate}</code></pre>
    <p>Pink circle follows path using &lt;animateMotion&gt;:</p>
    <pre><code class="language-markup">{condeSnippets.smilAnimateMotion}</code></pre>
  </div>

  <!-- CSS animations -->
  <div>
    <h2>CSS animation / Web animation API</h2>
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

    <CSSanimation></CSSanimation>

    <p>CSS in &lt;style&gt;:</p>
    <pre><code class="language-css">{condeSnippets.cssAnimation}</code></pre>
    <h2 style="margin-top: 2rem;">Reduce motion for accessibility</h2>
    <p>Respect users' system preferences for reduced motion. Modify or remove animations and transitions:</p>
    <pre><code class="language-css">{condeSnippets.reduceMotion}</code></pre>
  </div>

  <!-- Svelte: Zoom -->
  <div>
    <h2>Zoom using Svelte and viewBox</h2>
    <p>
      Create smooth zoom effects in an SVG. The graphics in the SVG can go beyond the current viewBox. Inspired by
      <a href="https://youtu.be/_jWnyJRKOvU">this video</a>
      .
    </p>
    <SvelteZoom />
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

  <!-- Svelte: scroll position -->
  <div>
    <h2>Svelte: bind scroll position to SVG attribute</h2>
    <svg id="mySVG" viewBox="0 0 100 25" style="height: 100px; width: 400px;" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="100" height="25" fill="black" />
      <circle cx={hasEnteredViewport ? scrollSinceSvgInView * 0.1 : 0} cy="50%" r="4%" fill="yellow" />
    </svg>
    <p>Scroll position: {y}px</p>
   
    <p>Get the y scroll position:</p>
    <pre><code class="language-html">{condeSnippets.bindy}</code></pre>
    <p>Do calculations (if any), and apply to an attribute in the SVG.</p>
    <pre><code class="language-markup">{condeSnippets.bindysvg}</code></pre>
  </div>

  <!-- Svelte: animotionjs -->
  <div>
    <h2>Svelte: Animotion JS</h2>
    <p>
      <a href="https://github.com/animotionjs/motion">Animotion</a>
      is a simple Svelte animation library that uses Svelte's built-in tweened store. Includes sound effects. 
    </p>
    <AnimotionJS />
    <p>Code:</p>
    <pre><code class="language-js">{condeSnippets.animotion}</code></pre>
  </div>

  <!-- Spline 3d scene -->
  <div style="">
    <h2>Spline 3D scene embed</h2>
    <div>
      <SplineScene />
    </div>
  </div>

  <!-- Animate.style -->
  <div>
    <h2>Animate.style</h2>
    <p>
      <a href="https://animate.style/">Animate.css</a>
      provides CSS animations with utility classes. As with other CSS animations, it might not work as expected for SVGs.
      Respects 'prefers-reduced-motion'. Can also override the CSS variables, keyframes, and combine it with Javascript.
    </p>
    <AnimateStyle />
  </div>

<!-- Rive -->
<div>
  <h2>Rive</h2>
  <p>
    <a href="https://rive.app/">Rive</a> offers both an editor and a runtime for animations. By using 'state machines' (variables connected to animations) it is possible to change states and start animations. Rive uses the canvas elements to render the animations on web.
  </p>
  <h3>Plain animation example</h3>
  <p>It is possible to start and stop the animation from JavaScript, and thereby stop the animation if user prefers-reduced-motion.</p>
  <div>
    <RiveExampleStatic />
  </div>
    <h3>Example with 'State machine'</h3>
    <div>
    <p>Made using a <a href="https://rive.app/blog/create-a-star-rating-component-with-rive-s-state-machine">Star rating tutorial</a>. It's possible to listen for state changes, or even <a href="https://www.youtube.com/watch?v=XPe488TRUxo">fire events</a> from the timeline.</p>
 
    <RiveExampleInteractive />
  </div>
</div>


  <!-- Svgator export -->
  <div>
    <h2>Animation with Svgator</h2>
    <p>
      <a href="https://app.svgator.com/">Svgator</a>
      is an online editor. Exports as CSS animations (with the limitations that follow) or with JavaScript embedded in the
      SVG. Easiest to load as external file that includes the JS. Can also export as Lottie JSON.
    </p>
    <SVGator />

    <p>Everything is contained in the SVG, including script:</p>
    <pre><code class="language-html">{condeSnippets.svgator}</code></pre>
  </div>

  <!-- Lottie ./assets/timeglass.json -->
  <div>
    <h2>Lottie</h2>
    <p>
      Animate in <a href="https://creator.lottiefiles.com/">Lottie creator</a>, After Effects or Figma. Export JSON or lottiefile. See
      <a href="https://airbnb.io/lottie/#/web">AirBnb docs</a>
      on how to export animatino from After Effects, and how to use in web or native. Supports Reduced motion on
      <a href="https://github.com/airbnb/lottie-ios/discussions/2189">iOS</a>
      and web. See their
      <a href="https://developers.lottiefiles.com/docs/resources/wcag/">section on WCAG</a>
      .
    </p>
    <h3>Autoplay and loop</h3>
    <LottiePlayAndLoop></LottiePlayAndLoop>
    <p>Code</p>
    <pre><code class="language-js">{condeSnippets.lottieSimplePlay}</code></pre>
    <pre><code class="language-html">{condeSnippets.lottieSimplePlayHTML}</code></pre>

    <h3>Play on hover</h3>
    <LottieonHover />
    <p>Code:</p>
    <pre><code class="language-js">{condeSnippets.lottieOnHover}</code></pre>
    <pre><code class="language-HTML">{condeSnippets.lottieOnHoverHTML}</code></pre>
  </div>

  <!-- MapLibre -->
  <div style="">
    <h2>MapLibre</h2>
    <div style="margin-bottom: 1rem;">
      <MapLibre lng={mapPosition.lng} lat={mapPosition.lat} zoom={mapPosition.zoom} pitch={mapPosition.pitch} />
    </div>
    <button on:click={animateMap}>Animate random</button>
    <p>Lots of code, this defines the animation:</p>
    <pre><code class="language-js">{condeSnippets.mapLibre}</code></pre>
  
  </div>

  <!-- Other.. -->
  <div style="margin-bottom: 10em;">
    <h2>Other solutions to check out...</h2>
    <ul>
      <li>(more) Svelte with SVG Animations.</li>
      <li>
        <a href="https://gsap.com/">GSAP</a>
        (just
        <a href="https://gsap.com/blog/webflow-GSAP/">acquired by Webflow</a>
        ).
      </li>
      <li>
        <a href="http://snapsvg.io/">SNAP</a>
        - JS lib for creating / editing SVG. With
        <a href="https://css-tricks.com/snap-animation-states/">JavaScript API for animation</a>
      </li>
    </ul>
  </div>
</main>

<style>
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
