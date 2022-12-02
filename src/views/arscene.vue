<template>
  <a-scene embedded vr-mode-ui="enabled: false;" arjs="debugUIEnabled: false;" >
    <a-assets>
      <img id="earth-sphere" crossorigin="anonymous" :src="imageUrl" />
    </a-assets>

    <a-marker type="pattern" preset="hiro">
      <a-sphere
        position="0 0.5 0"
        material="src: #earth-sphere; transparent: true; opacity: 0.95;"
        animation__rotate="property: rotation; dur: 8000; easing: linear; dir: normal; from:0 0 0; to: 0 360 0; loop: true;"
      >
      </a-sphere>
    </a-marker>

    <a-entity camera></a-entity>
  </a-scene>
</template>
<script setup>
const imageUrl = new URL(`../assets/earth-sphere.jpeg?url`, import.meta.url)
  .href;
</script>
<style lang="css">
a-scene {
  width: 100%;
  height: 100%;
}
</style>
