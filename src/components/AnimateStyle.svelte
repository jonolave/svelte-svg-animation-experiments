<script>
  import "animate.css";

  // handle button interaction, apply class
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
</script>

<div style="display: flex; flex-wrap: wrap; gap: 0.5em; margin-bottom: 2rem;">
  <button onclick={() => applyAnimate("animate__bounce")}>bounce</button>
  <button onclick={() => applyAnimate("animate__headShake")}>headShake</button>
  <button onclick={() => applyAnimate("animate__jello")}>jello</button>
  <button onclick={() => applyAnimate("animate__backOutDown")}>backOutDown</button>
  <button onclick={() => applyAnimate("animate__bounceIn")}>bounceIn</button>
  <button onclick={() => applyAnimate("animate__hinge")}>hinge</button>
  <button onclick={() => applyAnimate("animate__lightSpeedInRight")}>lightSpeedInRight</button>
</div>

<svg id="animateStyleSVG" viewBox="0 0 400 400" style="height: 400px; width: 400px;" xmlns="http://www.w3.org/2000/svg">
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
