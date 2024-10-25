<script>
  import { onMount } from "svelte";

  import lottie from "lottie-web";
  let lottieContainer;

   // Check for reduced motion preference
   const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  onMount(() => {
    lottie.loadAnimation({
      container: lottieContainer,
      renderer: "svg",
      loop: true,
      autoplay: !prefersReducedMotion,
      path: "lottieAirplane.json",
    });
  });
</script>

<div bind:this={lottieContainer} style="width: 100px; height: 100px;"></div>
