<script setup lang="ts">
import Icon from "../UI/Icon.vue";
</script>

<template>
  <div :class="$style.container">
    <Icon name="mdi:account" :size="60" />
    <h1 :class="$style.title">Profile</h1>
  </div>
</template>

<style lang="scss" module>
.title {
  font-family: "Do Hyeon", sans-serif;
  font-size: 2.5rem;
}

.container {
  display: flex;
  align-items: center;
  gap: 1rem;
}
</style>
