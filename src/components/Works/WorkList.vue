<script setup lang="ts">
import type { Work } from "@/lib/work";
import WorkItem from "./WorkItem.vue";

interface Prop {
  works: Work[];
}

defineProps<Prop>();
</script>

<template>
  <div :class="$style.container">
    <WorkItem
      v-for="work in works"
      :key="work.title"
      :title="work.title"
      :description="work.description"
      :image-url="work.imageUrl"
      :duration="work.duration"
    />
  </div>
</template>

<style lang="scss" module>
.container {
  display: grid;

  grid-template-columns: 1fr 1fr 1fr;

  padding: 1rem;
  gap: 2rem;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}
</style>
