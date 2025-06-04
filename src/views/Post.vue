<script setup lang="ts">
import BlogItem from "@/components/Blog/BlogItem.vue";
import PageContainer from "@/components/Layout/PageContainer.vue";
import type { Blog } from "@/lib/blog";
import { ref } from "vue";

interface Props {
	blog: Blog;
	path: string;
}
const props = defineProps<Props>();

const importBody = async () => {
        const { default: Body } = await import(`@/assets/posts/${props.path}.mdx`);
        body.value = Body;
        return Body;
};

const body = ref(null);

importBody();
</script>

<template>
  <PageContainer>
    <BlogItem :blog="blog">
      <div :class="$style.post">
        <component :is="body" />
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
    margin: 3rem 0 1rem;
  }
}
</style>
