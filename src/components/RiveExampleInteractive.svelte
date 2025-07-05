<script>
  import { onMount } from "svelte";
  import { Rive, EventType } from "@rive-app/canvas";

  let riveInstance;
  let ratingValue = $state(0);
  let inputs;
  let ratingTrigger;

  onMount(() => {
    riveInstance = new Rive({
      src: "star_rating.riv",
      // @ts-ignore
      canvas: document.getElementById("starCanvas"),
      autoplay: true,
      stateMachines: "State Machine 1",
      onLoad: () => {
        // Get the inputs via the name of the state machine
        inputs = riveInstance.stateMachineInputs("State Machine 1");
        // Find the input you want to set a value for, or trigger
        ratingTrigger = inputs.find((i) => i.name === "Rating");
      },
    });

    function onRiveEventReceived(riveEvent) {
      if (riveEvent.data[0]) {
        ratingValue = riveEvent.data[0]
      }  
    }

    riveInstance.on(EventType.StateChange, onRiveEventReceived);

    return () => {
      riveInstance.cleanup();
      riveInstance.off(EventType.RiveEvent, onRiveEventReceived);
    };
  });

  // Function to set the value of Rating from the button
  function setRating(value) {
    if (ratingTrigger) {
      ratingTrigger.value = value; // Set the input value directly
    }
  }
</script>

<canvas id="starCanvas" width="400" height="100"></canvas>

<p>Buttons to control states using JavaScript:</p>
<div style="display: flex; flex-wrap: wrap; gap: 0.5em; margin-bottom: 2rem;">
  <button onclick={() => setRating(1)}>1</button>
  <button onclick={() => setRating(2)}>2</button>
  <button onclick={() => setRating(3)}>3</button>
  <button onclick={() => setRating(4)}>4</button>
  <button onclick={() => setRating(5)}>5</button>
</div>
<p>State: {ratingValue}</p>
