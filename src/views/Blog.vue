<script setup lang="ts">
import PageContainer from "@/components/Layout/PageContainer.vue";
import BlogCard from "@/components/Blog/BlogCard.vue";
import {blogs} from "@/lib/blog";
</script>

<template>
  <PageContainer>
    <BlogCard v-for="(blog,id) in blogs" :key="id" :blog="blog"/>
  </PageContainer>
</template>