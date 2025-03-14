<script lang="ts" setup>
import NoImage from "@/assets/Image.png";
import { computed } from "vue";
import ExternalLink from "../UI/ExternalLink.vue";
import Icon from "../UI/Icon.vue";

interface Props {
	icon: string;
	name: string;
	href: string;
	type: string;
	color: string;
}

const props = defineProps<Props>();
const isImg = props.type === "img";
const styled = {
	color: props.color,
};
const Urls = import.meta.glob<string>("../../assets/*.svg", {
	eager: true,
	import: "default",
});
const src = computed(() => Urls[`../../assets/${props.icon}`] ?? NoImage);
</script>

<template>
  <ExternalLink :href="href">
    <img
      v-if="isImg"
      :src="src"
      :class="$style.img"
      :alt="name"
      :style="styled"
    />
    <Icon v-else :name="icon" :class="$style.icon" :style="styled" />
    <p :class="$style.link">{{ name }}</p>
  </ExternalLink>
</template>

<style lang="scss" module>
.link {
  color: $color-secondary;
}
.icon {
  margin-right: 0.5rem;
}
.img {
  width: 24px;
  margin-right: 0.5rem;
}
</style>
