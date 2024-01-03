<script setup lang="ts">
import type { Blog } from "@/lib/blog";
import { format } from "@/lib/date";
interface Props {
  blog: Blog;
}

const props = defineProps<Props>();

const date = format(props.blog.date);
</script>

<template>
  <div :class="$style.container">
    <div :class="$style.content">
      <h2 :class="$style.title">{{ blog.title }}</h2>
      <p :class="[$style.caption, $style.tags]">{{ blog.tags.join(" ") }}</p>
      <p :class="$style.caption">{{ date }}</p>
      <div :class="$style.body">
        <slot />
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>
.container {
  background-color: white;

  display: flex;
  flex-direction: column;

  border-radius: 8px;
  border: 3px solid $color-card-background;
}
.content {
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  gap: 0.25rem;
}

.title {
  font-size: 1.5rem;
}

.caption {
  font-size: 0.75rem;
}

.tags {
  color: $color-boundary-black;
}

.body {
  margin-top: 1rem;
}
</style>
