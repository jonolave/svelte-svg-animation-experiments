<script>
  // pnpm install gsap
  // custom script to take care of common animation stuff
  import { animate } from "../lib/gsapanimate.js";
  import { onMount } from "svelte";
  import { gsap } from "gsap";

  let myElement;

  onMount(() => {
    // Select by bindable variable, animate from current position
    gsap.from(myElement, {
      opacity: 0,
      y: 400,
      rotation: 360,
      duration: 5,
      repeat: -1,
      yoyo: true,
      scrollTrigger: {
        trigger: myElement, // what element to watch
        start: "top 80%", // when top of node hits 80% of viewport
        end: "top 30%", // optional: when animation ends
        toggleActions: "play none none reverse", // behavior on enter/leave
        markers: false, // shows start/end markers for debugging
      },
    });
    // Select by class, animate from -> to
    gsap.fromTo(
      ".blue",
      {
        x: 0,
        y: 400,
        opacity: 0,
      },
      {
        duration: 4,
        rotate: 360,
        ease: "bounce.out",
        x: 400,
        y: 400,
        repeat: -1,
        yoyo: true,
        opacity: 1,
        stagger: 0.2,
      }
    );
  });
</script>

<div class="gsap-element">
  <!-- Animated from with onMount -->
  <div class="box" bind:this={myElement}>FROM</div>

  <!-- Animated fromTo with onMount -->
  <!-- Stagger effect creates the "echo" -->
  <div class="box blue">FROM - TO</div>
  <div class="box blue">FROM - TO</div>
  <div class="box blue">FROM - TO</div>

  <!-- Use the custom script for simple animations
   In this case, animate to current position
    -->
  <div
    class="box"
    use:animate={{
      type: "to",
      x: 400,
      duration: 3,
      rotation: 360,
      ease: "bounce.out",
      repeat: -1,
      yoyo: true,
    }}
  >
    TO
  </div>
</div>

<style lang="scss">
  .gsap-element {
    width: 100%;
    height: 480px;
    background-color: #00000022;
    margin: 0;
    overflow: hidden;
    position: relative;

    .box {
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      position: absolute;
      left: 10px;
      top: 10px;
      height: 40px;
      width: 40px;
      font-weight: 600;
      background-color: #ff0000;
      padding: 10px;
      border-radius: 5px;
    }

    .blue {
      background-color: #0000ff;
    }
  }
</style>
