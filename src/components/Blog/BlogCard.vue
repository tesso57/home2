<script setup lang="ts">
import type { Blog } from "@/lib/blog";
import { format } from "@/lib/date";

interface Props {
	blog: Blog;
}

const props = defineProps<Props>();

const date = format(props.blog.date);

const path = `/blog/${props.blog.date.toISOString().slice(0, 10)}`;
</script>

<template>
  <router-link :to="path">
    <div :class="$style.container">
      <div :class="$style.content">
        <h2 :class="$style.title">{{ blog.title }}</h2>
        <p :class="[$style.caption, $style.tags]">{{ blog.tags.join(" ") }}</p>
        <p :class="$style.caption">{{ date }}</p>
      </div>
    </div>
  </router-link>
</template>

<style lang="scss" module>
.container {
  background-color: white;

  display: flex;
  flex-direction: column;

  border-radius: 8px;
  border: 3px solid $color-card-background;

  overflow: hidden;

  cursor: pointer;
}
.content {
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  gap: 0.25rem;
}

.title {
  font-size: 1rem;
}

.caption {
  font-size: 0.75rem;
}

.tags {
  color: $color-boundary-black;
}
</style>
