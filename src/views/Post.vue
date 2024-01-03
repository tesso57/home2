<script setup lang="ts">
import PageContainer from "@/components/Layout/PageContainer.vue";
import BlogItem from "@/components/Blog/BlogItem.vue";
import type { Blog } from "@/lib/blog";
import Body from "@/assets/posts/2024-01-04.mdx";

interface Props {
  blog: Blog;
}
defineProps<Props>();
</script>

<template>
  <PageContainer>
    <BlogItem :blog="blog">
        <div :class="$style.post">
            <Body  />
        </div>
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
        margin: 3rem 0 1rem ;
    }
}
</style>