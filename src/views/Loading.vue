<template>
  <div :class="$style.container" aria-hidden="true">
    <div :class="$style.bar" />
    <div :class="$style.bar" />
    <div :class="$style.bar" />
  </div>
</template>

<style lang="scss" module>
.container {
  min-height: 12rem;
  padding: 0.5rem;
  display: grid;
  gap: 0.5rem;
}

.bar {
  height: 1.25rem;
  border-radius: 999px;
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0.06) 25%,
    rgba(0, 0, 0, 0.14) 40%,
    rgba(0, 0, 0, 0.06) 55%
  );
  background-size: 200% 100%;
  animation: shimmer 1.2s linear infinite;
}

@keyframes shimmer {
  from {
    background-position: 100% 0;
  }
  to {
    background-position: -100% 0;
  }
}
</style>
