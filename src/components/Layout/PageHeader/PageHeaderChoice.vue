<script setup lang="ts">
import Icon from "@/components/UI/Icon.vue";
import { computed } from "vue";
import { useRoute } from "vue-router";

const props = defineProps<{
	icon: string;
	paragraph: string;
	to: string;
}>();

const currentRoute = useRoute();

const isActive = computed(() => {
	if (props.to === "/") {
		return currentRoute.path === "/";
	}
	return (
		currentRoute.path === props.to ||
		currentRoute.path.startsWith(`${props.to}/`)
	);
});
</script>

<template>
  <router-link :to="props.to">
    <div :class="$style.container">
      <Icon :name="props.icon" />
      <h3 :class="$style.header" :data-is-active="isActive">
        {{ props.paragraph }}
      </h3>
    </div>
  </router-link>
</template>

<style lang="scss" module>
.container {
  display: flex;
  gap: 1rem;
  align-items: center;

  padding: 0 1rem;

  border-radius: 16rem;
  box-sizing: border-box;
  border: 1px dashed $color-background;

  &:hover {
    color: $color-highlight;
    border: 1px dashed $color-highlight;
  }

  @media (max-width: 768px) {
    padding: 0;
    gap: 0.5rem;
  }
}

.header {
  font-weight: normal;
  color: inherit;
  &[data-is-active="true"] {
    font-weight: bold;
  }
}
</style>
