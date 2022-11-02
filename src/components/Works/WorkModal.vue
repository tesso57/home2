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

const emit = defineEmits<{ (e: "close"): void }>();
const close = () => emit("close");
</script>

<template>
  <ModalTemplate @close="close">
    <div :class="$style.container">
      <img :src="imageUrl" alt="No Image" :class="$style.image" />
      <div :class="$style.content">
        <div :class="$style.title">
          <h1>{{ title }}</h1>
          <p :class="$style.duration">{{ duration }}</p>
        </div>
        <p :class="$style.tags">{{ tags.join(" ") }}</p>
        <p :class="$style.description">{{ description }}</p>
        <ExternalLink :href="link" :class="$style.link"
          >ブログ記事はこちら</ExternalLink
        >
      </div>
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

.content {
  padding: 0.5rem;
}

.image {
  object-fit: cover;
  width: 100%;
}

.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.duration {
  color: $color-boundary-black;
}
.tags {
  color: $color-boundary-black;
}

.description {
  margin: 0.5rem 0;
}
</style>
