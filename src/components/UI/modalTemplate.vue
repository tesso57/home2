<script setup lang="ts">
import { Teleport } from "vue";

const emit = defineEmits<{ (e: "close"): void }>();
const close = () => emit("close");
</script>

<template>
  <Teleport to="#modal">
    <div :class="$style.container" @click="close">
      <slot />
    </div>
  </Teleport>
</template>

<style lang="scss" module>
.container {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  min-height: 100vh;
  padding: 3rem;

  overflow: {
    x: hidden;
    y: auto;
  }

  background-color: rgb(0, 0, 0, 0.5);


  animation: fadeIn 0.2s;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
</style>
