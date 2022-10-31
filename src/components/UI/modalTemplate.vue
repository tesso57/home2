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
  z-index: 1;
  width: 100%;
  height: 100%;
  padding: 1rem;
  background-color: rgb(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
