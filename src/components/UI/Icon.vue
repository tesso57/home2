<script setup lang="ts">
import { Icon as IconifyIcon } from "@iconify/vue";

const props = defineProps({
	name: {
		type: String,
		required: true,
	},
	size: {
		type: Number,
		default: 24,
	},
});
</script>

<template>
  <div :class="$style.container">
    <IconifyIcon :icon="name" :width="props.size" :height="props.size" class="$style.icon" />
  </div>
</template>

<style lang="scss" module>
.icon {
  contain: strict;
}

.container {
  display: inline-flex;
  align-items: center;
  color: inherit;
}
</style>
