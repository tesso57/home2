<script setup lang="ts"></script>

<template>
  <main :class="$style.container">
    <!-- <div :class="$style.main"> -->
    <slot />

    <!-- </div> -->
  </main>
</template>

<style lang="scss" module>
// .main {
// flex: 1 1;
// position: relative;
// }

.container {
  width: 100%;
  max-width: 1024px;
  margin: 4rem auto 0;
}
</style>
