<script setup lang="ts">
import type { Work } from "@/lib/work";
import { ref } from "vue";
import WorkItem from "./WorkItem.vue";
import WorkModal from "./WorkModal.vue";

interface Props {
  works: Work[];
}

const props = defineProps<Props>();

const handleOpen = (id: number) => {
  selectedWork.value = props.works[id];
  isOpen.value = true;
};

const handleClose = () => {
  isOpen.value = false;
};

const selectedWork = ref<Work>(props.works[0]);
const isOpen = ref(false);
</script>

<template>
  <div :class="$style.container">
    <WorkItem
      v-for="(work, id) in works"
      :key="work.title"
      :id="id"
      :title="work.title"
      :tags="work.tags"
      :image-url="work.imageUrl"
      :duration="work.duration"
      @open="handleOpen"
    />
  </div>

  <WorkModal
    v-if="isOpen"
    :title="selectedWork?.title"
    :description="selectedWork?.description"
    :link="selectedWork?.link"
    :image-url="selectedWork?.imageUrl"
    :duration="selectedWork?.duration"
    :tags="selectedWork?.tags"
    @close="handleClose"
  />
</template>

<style lang="scss" module>
.container {
  display: grid;

  grid-template-columns: 1fr 1fr 1fr;

  padding: 1rem;
  gap: 2rem;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}
</style>
