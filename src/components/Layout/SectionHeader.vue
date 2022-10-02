<script setup lang="ts">
const props = defineProps<{ name: string }>()
</script>

<template>
  <h2 :class="$style.title">{{ name }}</h2>
</template>

<style lang="scss" module>
.title {
  font-size: 1.5rem;
}
</style>
