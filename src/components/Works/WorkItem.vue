<script setup lang="ts">
interface Prop {
  title: string;
  description: string;
  imageUrl: string;
  link: string;
}

defineProps<Prop>();
</script>

<template>
  <div :class="$style.container">
    <img src="@/assets/Image.png" alt="No Image" :class="$style.image" />
    <div :class="$style.content">
      <h2 :class="$style.title">{{ title }}</h2>
      <p :class="$style.caption">{{ description }}</p>
      <p :class="$style.caption">xxxx/xx/xx ~ xxxx/xx/xx</p>
    </div>
  </div>
</template>

<style lang="scss" module>
.container {
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  border: 1px solid $color-card-background;
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
