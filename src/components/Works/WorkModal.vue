<script setup lang="ts">
import { formatDuration } from "@/lib/date";
import ExternalLink from "../UI/ExternalLink.vue";
import ModalTemplate from "../UI/modalTemplate.vue";

interface Props {
  title: string;
  description: string;
  tags: string[];
  link: string;
  imageUrl: string;
  duration: {
    since: Date;
    until?: Date;
  };
}

const props = defineProps<Props>();

const duration = formatDuration(props.duration);
</script>

<template>
  <ModalTemplate>
    <div :class="$style.container">
      <img :src="imageUrl" alt="No Image" :class="$style.image" />
      <h1>{{ title }}</h1>
      <p>{{ description }}</p>
      <p>{{ duration }}</p>
      <ExternalLink :href="link" :class="$style.link"
        >ブログ記事はこちら</ExternalLink
      >
    </div>
  </ModalTemplate>
</template>

<style lang="scss" module>
.container {
  background-color: white;
  border-radius: 0.5rem;
  border: 3px solid $color-card-background;
  width: 50%;
  overflow: hidden;

  @media (max-width: 768px) {
    width: 80%;
  }
}

.image {
  object-fit: cover;
  width: 100%;
}
</style>
