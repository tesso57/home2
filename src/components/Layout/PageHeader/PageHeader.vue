<script setup lang="ts">
import PageHeaderChoice from "./PageHeaderChoice.vue";
import { onUnmounted, onMounted, ref } from "vue";
import PageHeaderToggleButton from "./PageHeaderToggleButton.vue";

const isMobile = ref(window.innerWidth < 768);

const isOpen = ref(true);

onMounted(() => {
  window.addEventListener("resize", () => {
    isMobile.value = window.innerWidth < 768;
  });
});

onUnmounted(() => {
  window.removeEventListener("resize", () => {
    isMobile.value = window.innerWidth < 768;
  });
});

async function enter(el: Element, done: () => void) {
  await el.animate(
    [
      {
        height: 0,
      },
      {
        height: `${(el as HTMLElement).offsetHeight}px`,
      },
    ],
    {
      duration: 200,
      easing: "ease-out",
    }
  ).finished;
  done();
}

// 閉まるとき
async function leave(el: Element, done: () => void) {
  await el.animate(
    [
      {
        height: `${(el as HTMLElement).offsetHeight}px`,
      },
      {
        height: 0,
      },
    ],
    {
      duration: 100,
      easing: "ease-out",
    }
  ).finished;
  done();
}
</script>

<template>
  <div :class="$style.container">
    <div :class="$style.nav">
      <router-link to="/">
        <h1 :class="$style.title">tesso.dev</h1>
      </router-link>
      <Transition @enter="enter" @leave="leave">
        <div
          :class="$style.links"
          v-if="!isMobile || isOpen"
          :data-is-open="isOpen"
        >
          <PageHeaderChoice icon="mdi:account" paragraph="Profile" to="/" />
          <PageHeaderChoice icon="mdi:pencil" paragraph="Works" to="/" />
          <PageHeaderChoice icon="mdi:document" paragraph="Blog" to="/" />
        </div>
      </Transition>
    </div>
    <PageHeaderToggleButton v-model="isOpen" v-if="isMobile" />
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

  overflow: hidden;

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
</style>
