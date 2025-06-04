<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import PageHeaderChoice from "./PageHeaderChoice.vue";
import PageHeaderToggleButton from "./PageHeaderToggleButton.vue";

const isMobile = ref(window.innerWidth < 768);

const isOpen = ref(false);

const resizeHandler = () => {
	isMobile.value = window.innerWidth < 768;
};

onMounted(() => {
	window.addEventListener("resize", resizeHandler);
});

onUnmounted(() => {
	window.removeEventListener("resize", resizeHandler);
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
		},
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
		},
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
        <div :class="$style.links" v-if="!isMobile || isOpen" :data-is-open="isOpen">
          <PageHeaderChoice icon="mdi:account" paragraph="Profile" to="/" />
          <PageHeaderChoice icon="mdi:pencil" paragraph="Works" to="/works" />
          <PageHeaderChoice icon="mdi:document" paragraph="Blog" to="/blog" />
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
  margin-top: 1rem;
  margin-left: 1rem;
  margin-right: 1rem;

  border-radius: 1rem;
  border: solid 3px $color-card-background;

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
  font-weight: normal;
}
</style>
