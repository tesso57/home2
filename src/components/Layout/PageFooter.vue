<template>
  <footer :class="$style.container">
    <div :class="$style.copyright">© 2022 tesso</div>
  </footer>
</template>

<style lang="scss" module>
.container {
  margin-top: 2rem;
  padding: 1.5rem 3rem;
  text-align: right;

  @media (max-aspect-ratio: 1/2) {
    text-align: center;
  }
}

.copyright {
  font-size: 0.8rem;
}
</style>
