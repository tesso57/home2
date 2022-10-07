<script setup lang="ts">
import Icon from "@/components/UI/Icon.vue";
import { computed } from "vue";

const props = withDefaults(defineProps<{
    modelValue: boolean;
}>(), {
});

const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void
}>()
const value = computed({
    get: () => props.modelValue,
    set: v => emit('update:modelValue', v)
})
</script>

<template>
    <label :class="$style.container">
        <input v-model="value" type="checkbox" :class="$style.input" />
        <Icon name="mdi:menu" :class="$style.menu" v-show="!value" />
        <Icon name="mdi:close" :class="$style.menu" v-show="value" />
    </label>
</template>

<style lang="scss" module>
.menu {
    cursor: pointer;

    .container:hover & {
        color: $color-highlight;
    }
}

.input {
    display: none;
}

.container {
    padding: 6px;
}
</style>