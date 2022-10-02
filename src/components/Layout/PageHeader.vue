<template>
  <div :class="$style.container">
    <div :class="$style.title">tesso.dev</div>
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
}

.title {
  color: $color-highlight;
  font-size: 1.5rem;
  font-family: "Do Hyeon", sans-serif;
}
</style>
