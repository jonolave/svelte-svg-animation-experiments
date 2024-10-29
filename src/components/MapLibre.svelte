<script>
  import { onMount, onDestroy } from "svelte";
  import { Map, NavigationControl } from "maplibre-gl";
  import "maplibre-gl/dist/maplibre-gl.css";

  // Props
  export let lng = 10.754; // Longitude prop (default value)
  export let lat = 59.92; // Latitude prop (default value)
  export let zoom = 12; // Zoom prop (default value)
  export let pitch = 0; // Tilt (pitch) prop (default value)

  let map;
  let mapContainer;

  const apiKey = import.meta.env.VITE_MAPTILER_API_KEY;

  // Function to fetch the GeoJSON file
  async function loadGeoJSON() {
    const response = await fetch('/tracks.geojson'); // Replace with the correct path to your file
    if (!response.ok) {
      console.error('Failed to load GeoJSON:', response.statusText);
      return null;
    }
    return await response.json();
  }

  onMount(async () => {
    // Initialize MapLibre with MapTiler basemap
    map = new Map({
      container: mapContainer, // HTML container reference
      style: `https://api.maptiler.com/maps/dataviz-dark/style.json?key=${apiKey}`, // MapTiler style
      center: [lng, lat],
      zoom: zoom,
      pitch: pitch,
    });

    // Add navigation controls (zoom in/out, compass)
    // map.addControl(new NavigationControl());

    // Optional: Handle map load errors
    map.on("error", (e) => {
      console.error("Map failed to load:", e);
    });

    // map.dragPan.disable(); // Disable panning with the mouse
    // map.scrollZoom.disable(); // Disable zooming with the scroll wheel
    // map.boxZoom.disable(); // Disable box zoom (shift + drag)
    // map.doubleClickZoom.disable(); // Disable zooming by double-clicking
    // map.touchZoomRotate.disable(); // Disable zooming and rotation with touch gestures
    // map.keyboard.disable(); // Disable keyboard interactions

    // Load GeoJSON from the public folder
    const geojsonData = await loadGeoJSON();
    if (geojsonData) {
      // Add the GeoJSON line as a source
      map.on('load', () => {
        map.addSource('line', {
          "type": "geojson",
          "data": geojsonData  // Use the fetched GeoJSON data
        });

        // Add a layer to display the line
        map.addLayer({
          "id": "line-layer",
          "type": "line",
          "source": "line",
          "layout": {
            "line-join": "round",
            "line-cap": "round"
          },
          "paint": {
            "line-color": "#ff0000",  // Line color (red)
            "line-width": 4           // Line width
          }
        });
      });
    }


  });

  // Watch for prop changes and animate map accordingly
  $: if (map) {
    // Animate the map to the new center, zoom, and pitch when props change
    map.flyTo({
      center: [lng, lat],
      zoom: zoom,
      pitch: pitch, // Tilt the map
      speed: 0.2, // Animation speed
      curve: 1.42, // Smoother transition
      easing: (t) => t * ( 2 - t), // Easing function for the animation
    });
  }

  // Clean up the map when the component is destroyed
  onDestroy(() => {
    if (map) map.remove();
  });
</script>

<!-- HTML for the map container -->
<div class="map" bind:this={mapContainer}></div>

<style>
  /* Ensure the map takes up full width and height */
  .map {
    position: relative;
    width: 100%;
    height: calc(60vh - 60px);
  }
</style>
