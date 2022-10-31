<script setup lang="ts">
import Loading from "./views/Loading.vue";
import PageHeader from "@/components/Layout/PageHeader/PageHeader.vue";
import PageFooter from "@/components/Layout/PageFooter.vue";
</script>

<template>
  <PageHeader />
  <Suspense>
    <template v-slot:default>
      <router-view :class="$style.main" />
    </template>
    <template v-slot:fallback>
      <Loading />
    </template>
  </Suspense>
  <PageFooter />
  <div id="modal" />
</template>

<style lang="scss" module>
.main {
  flex: 1;
  padding-bottom: 1rem;
}
</style>
