<script setup lang="ts">
import Icon from "../UI/Icon.vue";

const props = defineProps<{
    icon: string;
    paragraph: string;
    to: string;
}>();
</script>

<template>
    <router-link :to="props.to">
        <div :class="$style.container">
            <Icon :name="props.icon" />
            <p :class="$style.paragraph">{{props.paragraph}}</p>
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
}

.paragraph {
    font-family: "Do Hyeon", sans-serif;
    font-size: 1.125rem;
}
</style>

