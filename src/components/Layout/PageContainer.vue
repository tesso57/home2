<script setup lang="ts"></script>

<template>
  <div :class="$style.container">
    <slot />
  </div>
</template>

<style lang="scss" module>
.container {
  max-width: 1024px;
  margin: 4rem auto 0;
}
</style>
