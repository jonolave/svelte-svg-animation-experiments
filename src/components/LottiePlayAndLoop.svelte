<script>
  import { onMount } from "svelte";
  import { prefersReducedMotion } from 'svelte/motion';

  import lottie from "lottie-web";
  let lottieContainer = $state();

  onMount(() => {
    lottie.loadAnimation({
      container: lottieContainer,
      renderer: "svg",
      loop: true,
      autoplay: !prefersReducedMotion.current,
      path: "lottieAirplane.json",
    });
  });
</script>

<div bind:this={lottieContainer} style="width: 100px; height: 100px;"></div>
