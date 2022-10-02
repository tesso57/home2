<script setup lang="ts">
import Icon from './Icon.vue'
</script>

<template>
  <a :class="$style.container">
    <slot />
    <Icon name="mdi:open-in-new" :size="16" />
  </a>
</template>

<style lang="scss" module>
.container {
  display: flex;
  color: $color-secondary;
}
</style>
