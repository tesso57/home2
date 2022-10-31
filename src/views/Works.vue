<script setup lang="ts">
import PageContainer from "@/components/Layout/PageContainer.vue";
import WorkList from "@/components/Works/WorkList.vue";
import type { Work } from "@/lib/work";

import NoImage from "@/assets/Image.png";

const mock: Work[] = [
  {
    title: "Title",
    description: "Description",
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
  </PageContainer>
</template>
