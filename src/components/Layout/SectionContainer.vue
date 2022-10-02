<script setup lang="ts">
import SectionHeader from './SectionHeader.vue'
const props = defineProps<{ name: string }>()
</script>

<template>
  <section>
    <SectionHeader :name="name" :class="$style.header" />
    <div :class="$style.container">
      <slot />
    </div>
  </section>
</template>

<style lang="scss" module>
.header {
  margin-bottom: 0.5rem;
}

.container {
  margin-left: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>
