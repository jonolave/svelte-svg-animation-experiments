<script>
  import { prefersReducedMotion } from 'svelte/motion';
</script>

<svg viewBox="0 0 100 100" style="height: 400px; width: 400px;" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect x="0" y="0" width="100" height="100" fill="black" />

  <!-- Transform animation -->
  <circle cx="40%" cy="40%" r="4%" fill="red">
    {#if !prefersReducedMotion.current}
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
    {/if}
  </circle>

  <!-- Animated pink circle following path -->
  <circle cx="0" cy="0" r="4" fill="pink">
    {#if !prefersReducedMotion.current}
    <animateMotion
      path="M5 39.8583C18.5 28.5 49.5 17.0001 68.5 26.9999C87.0413 36.7583 38.2912 49.5638 41 67C44.3086 88.2977 80.2716 89 96 89"
      begin="0s"
      dur="10s"
      repeatCount="indefinite"
    />
    {/if}
  </circle>
</svg>
