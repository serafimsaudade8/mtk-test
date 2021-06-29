<template>
  <div class="c-Loading">
    <div class="c-Loading__bg" />
    <img
      class="c-Loading__logo"
      src="/logo.png" />
  </div>
</template>

<script>
export default {
  name: 'Loading'
}
</script>

<style lang="scss" scoped>
.c-Loading {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100000;
  width: 100vw;
  height: 100vh;

  &__bg {
    width: 100%;
    height: 100%;
    background-color: #000000;
    opacity: 0.5;
  }

  &__logo {
    width: 100px;
    height: 100px;
    position: absolute;
    z-index: 2;
    top: calc(50% - 50px);
    left: calc(50% - 50px);
    animation: pulse 1s infinite;

    @keyframes pulse {
      0% {
        opacity: 1;
      }
      50% {
        opacity: 0.5;
      }
      100% {
        opacity: 1;
      }
    }
  }
}
</style>
