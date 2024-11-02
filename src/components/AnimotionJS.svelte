<script>
  import { tween } from "@animotion/motion";

  const sfx = {
    transition: "transition.mp3",
    tally: "tally.mp3",
  };

  // initial values
  const camera = tween({ x: -2.5, y: -2.5, w: 40, h: 40 });
  const circle = tween({ x: 2.5, y: 2.5, r: 1.5, fill: "#00ffff" });
  const text = tween({ count: 0, opacity: 0 });

  async function animate() {
   
    await camera.sfx(sfx.transition).to({ x: -1, y: -1, w: 12, h: 12 }); // finish this animation before starting the next
    
    circle.sfx(sfx.transition).to({ x: 10, y: 10, r: 3, fill: "#ffff00" })
    camera.to({ x: 4, y: 4 })

    await text.to({ opacity: 1 }, { duration: 300 }) // finish this animation before starting the next

    text.sfx(sfx.tally).to({ count: 10_000 }, { duration: 600 });
  }

  async function resetAnimation() {
    await camera.to({ x: -2, y: -2, w: 40, h: 40 });
    circle.to({ x: 2.5, y: 2.5, r: 1.5, fill: "#00ffff" });
    text.to({ opacity: 0 });
  }
</script>

<svg
  viewBox="{camera.x} {camera.y} {camera.w} {camera.h}"
  style="height: 400px; width: 400px;"
  xmlns="http://www.w3.org/2000/svg"
>
  <!-- Gridlines -->
  {#each { length: 40 } as _, i}
    <line x1="-5" y1={i * 5 - 10} x2="40" y2={i * 5 - 10} stroke="#88888833" stroke-width="0.2" />
    <line x1={i * 5 - 10} y1="-5" x2={i * 5 - 10} y2="40" stroke="#88888833" stroke-width="0.2" />
  {/each}

  <circle cx={circle.x} cy={circle.y} r={circle.r} fill={circle.fill} />

  <text
    x={circle.x}
    y={circle.y}
    font-size={circle.r * 0.4}
    opacity={text.opacity}
    text-anchor="middle"
    dominant-baseline="middle"
    fill="#000"
  >
    {Math.round(text.count)}
  </text>
</svg>

<div style="display: flex; gap: 1rem; margin-top: 1rem">
  <button onclick={animate}>Animate</button>
  <button onclick={resetAnimation}>Reset</button>
</div>
