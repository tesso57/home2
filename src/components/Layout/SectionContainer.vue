<template>
  <section>
    <slot name="header"></slot>
    <div :class="$style.container">
      <slot />
    </div>
  </section>
</template>

<style lang="scss" module>
.header {
  margin-bottom: 0.5rem;
}

.container {
  padding-left: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>
