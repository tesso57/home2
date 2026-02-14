<script setup lang="ts">
import BlogItem from "@/components/Blog/BlogItem.vue";
import PageContainer from "@/components/Layout/PageContainer.vue";
import type { Blog } from "@/lib/blog";
import type { Component } from "vue";

interface Props {
	blog: Blog;
	path: string;
}

const props = defineProps<Props>();

const modules = import.meta.glob("@/assets/posts/*.mdx", {
	eager: true,
	import: "default",
}) as Record<string, Component>;

const body = modules[`/src/assets/posts/${props.path}.mdx`];
</script>

<template>
  <PageContainer>
    <BlogItem :blog="blog">
      <div v-if="body" :class="$style.post">
        <component :is="body" />
      </div>
      <p v-else :class="$style.error">記事の読み込みに失敗しました。</p>
    </BlogItem>
  </PageContainer>
</template>

<style lang="scss" module>
.post {
  p {
    margin: 1rem 0;
  }
  h1 {
    font-size: 1.5rem;
  }
  h2 {
    font-size: 1.25rem;
    margin: 3rem 0 1rem;
  }
}

.error {
  margin-top: 1rem;
  color: $color-boundary-black;
}
</style>
