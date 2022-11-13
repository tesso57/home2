<script setup lang="ts">
import PageContainer from "@/components/Layout/PageContainer.vue";
import WorkList from "@/components/Works/WorkList.vue";
import { works } from "@/lib/work";
</script>

<template>
  <PageContainer>
    <WorkList :works="works" />
  </PageContainer>
</template>
