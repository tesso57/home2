<script setup lang="ts">
import PageContainer from "@/components/Layout/PageContainer.vue";
import BlogCard from "@/components/Blog/BlogCard.vue";
import { blogs } from "@/lib/blog";
</script>

<template>
  <PageContainer>
    <BlogCard
      v-for="(blog, id) in blogs"
      :key="id"
      :blog="blog"
      :class="$style.container"
    />
  </PageContainer>
</template>
<style lang="scss" module>
.container {
  display: grid;
  grid-template-columns: 1fr;
  padding-bottom: 1rem;
}
</style>
