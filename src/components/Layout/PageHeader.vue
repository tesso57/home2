<template>
  <div :class="$style.container">
    <div :class="$style.title">tesso.dev</div>
  </div>
</template>

<style lang="scss" module>
.container {
  display: flex;
  height: 5rem;
  justify-content: space-between;
  align-items: center;
  border-bottom: solid 0.2rem $color-primary;
  padding: 0 2rem;
}

.title {
  color: $color-primary;
  font-size: 1.5rem;
  font-family: "Do Hyeon", sans-serif;
}
</style>
