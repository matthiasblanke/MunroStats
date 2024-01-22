<script setup>
import Map from '../components/BaseMap.vue';
import OptionsPanel from '../components/OptionsPanel.vue';
</script>

<template>
  <div class="container">
    <div class="background">
      <Map />
    </div>
    <OptionsPanel :showOptions="true"/>
  </div>
</template>


<style scoped>
.container {
  display: flex;
}

.background {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  color: rgb(253, 240, 240);
}
</style>
