<script setup lang="ts">
import PageHeaderChoice from "./PageHeaderChoice.vue";
import Icon from "../UI/Icon.vue";
import { onUnmounted, onMounted, ref } from "vue";

const isMobile = ref(window.innerWidth > 768);

const isOpen = ref(false);

const onClick = () => {
  isOpen.value = !isOpen.value;
};

onMounted(() => {
  window.addEventListener("resize", () => {
    isMobile.value = window.innerWidth > 768;
  });

});

onUnmounted(() => {
  window.removeEventListener("resize", () => {
    isMobile.value = window.innerWidth > 768;
  });
});
</script>

<template>
  <div :class="$style.container">
    <div :class="$style.nav">
      <router-link to="/">
        <h1 :class="$style.title">
          tesso.dev
        </h1>
      </router-link>
      <div :class="$style.links" v-if="isMobile || isOpen" :data-is-open="isOpen">
        <PageHeaderChoice icon="mdi:account" paragraph="Profile" to="/" />
        <PageHeaderChoice icon="mdi:pencil" paragraph="Works" to="/" />
        <PageHeaderChoice icon="mdi:document" paragraph="Blog" to="/" />
      </div>
    </div>
    <Icon name="mdi:menu" :class="$style.menu" v-show="!isMobile && !isOpen" :onclick="onClick" />
    <Icon name="mdi:close" :class="$style.menu" v-show="!isMobile && isOpen" :onclick="onClick" />
  </div>
</template>

<style lang="scss" module>
.container {
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 1rem 2.5rem;

  border-radius: 1rem;
  border: solid 3px $color-highlight;

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  background-color: $color-white;

  @media (max-width: 768px) {
    align-items: start;
  }

}

.nav {
  display: flex;
  gap: 2.5rem;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: start;
    gap: 1rem;
  }
}

.links {
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: start;
    gap: 1rem;
  }
}

.title {
  color: $color-highlight;
  cursor: pointer;
}

.menu {
  padding: 6px;
}

.open {
  &:global(-enter-active) {
    animation: open-in 0.5s ease-in-out;
  }

  &:global(-leave-active) {
    animation: open-in 0.5s reverse;
  }
}


@keyframes open-in {
  0% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(50%);
  }

  100% {
    transform: translateY(100%);
  }
}
</style>
