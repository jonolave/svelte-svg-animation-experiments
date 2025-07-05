<script>
  import { onMount } from "svelte";
  import { Rive } from "@rive-app/canvas"; // Notice the curly braces here

  let riveInstance;
  let playing = $state(true);

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  onMount(() => {
    riveInstance = new Rive({
      src: "https://cdn.rive.app/animations/vehicles.riv",
      // @ts-ignore
      canvas: document.getElementById("canvas"),
      autoplay: true,
      stateMachines: "bumpy",
      onLoad: () => {
        riveInstance.resizeDrawingSurfaceToCanvas();
      },
    });

    if (prefersReducedMotion) {
      riveInstance.pause();
      playing = false;
    }

    return () => {
      riveInstance.cleanup();
    };
  });

  // Function to toggle play and pause
  function togglePlayPause() {
    if (riveInstance.isPlaying) {
      riveInstance.pause();
      playing = false;
    } else {
      riveInstance.play();
      playing = true;
    }
  }
</script>


<canvas id="canvas" width="200" height="100"></canvas>
<div><button onclick={() => togglePlayPause()}>{playing ? "Stop" : "Start"}</button></div>
