<script setup lang="ts">
import PageHeaderChoice from "./PageHeaderChoice.vue";
</script>

<template>
  <div :class="$style.container">
    <div :class="$style.nav">
      <router-link to="/">
        <h1 :class="$style.title">
          tesso.dev
        </h1>
      </router-link>
      <div :class="$style.links">
        <PageHeaderChoice icon="mdi:account" paragraph="Profile" to="/" />
        <PageHeaderChoice icon="mdi:pencil" paragraph="Works" to="/" />
        <PageHeaderChoice icon="mdi:document" paragraph="Blog" to="/" />
      </div>
    </div>
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
}

.nav {
  display: flex;
  gap: 2.5rem;
  align-items: center;
}

.links {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.title {
  color: $color-highlight;
  cursor: pointer;
}
</style>
