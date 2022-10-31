<script setup lang="ts">
import PageContainer from "@/components/Layout/PageContainer.vue";
import WorkList from "@/components/Works/WorkList.vue";
import type { Work } from "@/lib/work";

import NoImage from "@/assets/Image.png";
import WorkModal from "@/components/Works/WorkModal.vue";

const mock: Work[] = [
  {
    title: "Portfolio",
    description: "これ。Vueで作った。",
    imageUrl: NoImage,
    duration: {
      since: new Date(),
      until: new Date(),
    },
  },
  {
    title: "PrestoRay",
    description: "Unity",
    imageUrl: NoImage,
    duration: {
      since: new Date(),
      until: new Date(),
    },
  },
  {
    title: "Title",
    description: "Description",
    imageUrl: NoImage,
    duration: {
      since: new Date(),
    },
  },
];
</script>

<template>
  <PageContainer>
    <WorkList :works="mock" />
    <!-- <WorkModal
      title="てすと"
      description="こんにちは"
      link="https://tesso.dev/"
      :image-url="NoImage"
      :duration="{ since: new Date() }"
      :tags="['test']"
    /> -->
  </PageContainer>
</template>
