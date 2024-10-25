<svg class="cssvg" viewBox="0 0 100 100" style="height: 400px; width: 400px;" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="0" width="100" height="100" fill="black" />
  <circle cx="20%" cy="20%" r="4%" fill="red" />
</svg>

<style>
  .cssvg circle {
    animation:
      move 2s cubic-bezier(0.645, 0.045, 0.355, 1) infinite,
      changeFill 4s ease 0s infinite alternate-reverse;
  }

  /* For users who prefer reduced motion */
  @media (prefers-reduced-motion: reduce) {
    .cssvg circle {
      animation: none;
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

  /* Animate CSS properties */
  @keyframes changeFill {
    0% {
      fill: red;
    }
    100% {
      fill: blue;
    }
  }
</style>
