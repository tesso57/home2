<script setup lang="ts">
import { formatDuration } from "@/lib/date";
import type { Work } from "@/lib/work";
import { computed, ref } from "vue";
import WorkModal from "./WorkModal.vue";
import NoImage from "@/assets/Image.png";

interface Props {
  work: Work;
}

const props = defineProps<Props>();

const duration = formatDuration(props.work.duration);

const onClick = () => {
  isOpen.value = true;
};
const handleClose = () => {
  isOpen.value = false;
};
const isOpen = ref(false);

const Urls = import.meta.glob<string>("../../assets/*.(svg|png|gif)", {
  eager: true,
  import: "default",
});

const imageUrl = computed(
  () => Urls[`../../assets/${props.work.imageUrl}`] ?? NoImage
);

</script>

<template>
  <div :class="$style.container" @click="onClick">
    <div :class="$style.imageContainer">
      <img :class="$style.image" :src="imageUrl" alt="No Image" loading="lazy" />
    </div>
    <div :class="$style.content">
      <h2 :class="$style.title">{{ work.title }}</h2>
      <p :class="[$style.caption, $style.tags]">{{ work.tags.join(" ") }}</p>
      <p :class="$style.caption">{{ duration }}</p>
    </div>
  </div>
  <WorkModal v-if="isOpen" :title="work.title" :description="work.description" :link="work.link" :image-url="imageUrl"
    :duration="work.duration" :tags="work.tags" @close="handleClose" />
</template>

<style lang="scss" module>
.container {
  background-color: white;

  display: flex;
  flex-direction: column;

  border-radius: 8px;
  border: 3px solid $color-card-background;

  overflow: hidden;

  cursor: pointer;

  min-height: 10rem;
}

.content {
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  gap: 0.25rem;
}

.image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.imageContainer {
  position: relative;
  width: 100%;

  &::before {
    content: "";
    display: block;
    padding-top: math.div(9, 16) * 100%;
  }
}

.title {
  font-size: 1rem;
  font-weight: normal;
}

.caption {
  font-size: 0.75rem;
}

.tags {
  color: $color-boundary-black;
}
</style>
