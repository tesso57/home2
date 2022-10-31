<script setup lang="ts">
import { formatDuration, type Duration } from "@/lib/date";

interface Prop {
  title: string;
  description: string;
  imageUrl: string;
  duration: Duration;
}

const props = defineProps<Prop>();

const duration = formatDuration(props.duration);
</script>

<template>
  <div :class="$style.container">
    <img :src="imageUrl" alt="No Image" :class="$style.image" />
    <div :class="$style.content">
      <h2 :class="$style.title">{{ title }}</h2>
      <p :class="$style.caption">{{ description }}</p>
      <p :class="$style.caption">{{ duration }}</p>
    </div>
  </div>
</template>

<style lang="scss" module>
.container {
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  border: 3px solid $color-card-background;
  overflow: hidden;
}
.content {
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
}

.image {
  object-fit: contain;
}

.title {
  font-size: 1rem;
  font-weight: normal;
}

.caption {
  font-size: 0.75rem;
}
</style>
