<script>
  export let y = 0;

  const offset = 10;
  const parallaxSpeed = 0.03;
  $: imageHeight = Math.min(264, 264 - offset * 6 + y * parallaxSpeed * 6);

  let parallax = true;

  $: if (y * parallaxSpeed * 6 - offset * 6 >= 0) {
    parallax = false;
  } else {
    parallax = true;
  }
</script>

<div class="parallax-container" style="height: {imageHeight}px;">
  <img aria-hidden="true" alt="" style="" src="/soriamoria/1_himmel.png" />

  <img
    aria-hidden="true"
    alt=""
    style="transform: translate(0,{parallax ? y * parallaxSpeed * 1 - offset * 1 : 0}px)"
    src="/soriamoria/2_soria.png"
  />

  <img
    aria-hidden="true"
    alt=""
    style="transform: translate(0,{parallax ? y * parallaxSpeed * 2 - offset * 2 : 0}px)"
    src="/soriamoria/3_fjell.png"
  />

  <img
    aria-hidden="true"
    alt=""
    style="transform: translate(0,{parallax ? y * parallaxSpeed * 3 - offset * 3 : 0}px)"
    src="/soriamoria/4_ground1.png"
  />

  <img
    aria-hidden="true"
    alt=""
    style="transform: translate(0,{parallax ? y * parallaxSpeed * 4 - offset * 4 : 0}px)"
    src="/soriamoria/5_ground2_person.png"
  />

  <img
    aria-hidden="true"
    alt=""
    style="transform: translate(0,{parallax ? y * parallaxSpeed * 5 - offset * 5 : 0}px)"
    src="/soriamoria/6_skyer1.png"
  />

  <img
    aria-hidden="true"
    alt=""
    style="transform: translate(0,{parallax ? y * parallaxSpeed * 6 - offset * 6 : 0}px)"
    src="/soriamoria/7_skyer2.png"
  />

  <div class="text" style="transform: translate(-50%, {y * parallaxSpeed * 8 + 60}px)">
    <p>Parallax</p>
  </div>
</div>

<!-- <p>Scrollbased value: {y}</p> -->

<style>
  .parallax-container {
    position: relative;
    width: 400px;
    overflow: hidden;
  }

  .parallax-container img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: auto;
  }

  .text {
    position: absolute;
    top: 0;
    left: 50%;
    color: white;
    font-size: 2rem;
    font-weight: bold;
    opacity: 0.7;
  }
</style>
