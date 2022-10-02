<script setup lang="ts">
import Loading from './views/Loading.vue'
import PageHeader from './components/Layout/PageHeader.vue'
import PageFooter from './components/Layout/PageFooter.vue'
</script>

<template>
  <PageHeader />
  <Suspense>
    <template #default>
      <router-view :class="$style.main" />
    </template>
    <template #fallback>
      <Loading />
    </template>
  </Suspense>
  <PageFooter />
</template>

<style lang="scss" module>
.main {
  flex: 1;
  padding-bottom: 1rem;
}
</style>
