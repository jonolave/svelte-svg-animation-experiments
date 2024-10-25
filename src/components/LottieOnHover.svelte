<script>
  import { onMount } from "svelte";

  import lottie from "lottie-web";
  let lottieHoverContainer = $state(); // for animation on hover
  let lottieHoverAnimation; // for animation on hover

  function lottieMouseEnter() {
    lottieHoverAnimation.goToAndPlay(0, true); // play from beginning
  }

  onMount(() => {
    lottieHoverAnimation = lottie.loadAnimation({
      container: lottieHoverContainer,
      renderer: "svg",
      loop: false,
      autoplay: false,
      path: "lottieAirplane.json",
    });
  });
</script>

<div bind:this={lottieHoverContainer} onmouseenter={lottieMouseEnter} style="width: 100px; height: auto;"></div>
