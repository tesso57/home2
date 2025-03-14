<script setup lang="ts">
import PageFooter from "@/components/Layout/PageFooter.vue";
import PageHeader from "@/components/Layout/PageHeader/PageHeader.vue";
import Loading from "./views/Loading.vue";
</script>

<template>
  <PageHeader />
  <main :class="$style.main">
    <Suspense>
      <template v-slot:default>
        <router-view />
      </template>
      <template v-slot:fallback>
        <Loading />
      </template>
    </Suspense>
    <PageFooter />
  </main>
</template>

<style lang="scss" module>
.main {
  position: relative;
  flex: 1 1;
  overflow: hidden auto;
}
</style>
