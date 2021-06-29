<template>
  <div
    id="app"
    :class="appClass">
    <Loading v-show="isLoading" />
    <router-view/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Loading from '@/components/Loading.vue'

export default {
  components: {
    Loading
  },
  computed: {
    ...mapGetters({
      isLoading: 'loading'
    }),
    appClass () {
      return {
        isLoading: this.isLoading
      }
    }
  }
}
</script>

<style lang="scss">
@import "@/scss/reset.scss";
@import "@/scss/fonts.scss";
@import "@/scss/variables.scss";

html, body {
  background-color: #FFFFFF;
  width: 100vw;
  height: 100vh;
}

#app {
  background-color: #FFFFFF;
  width: 100%;
  height: 100%;
  padding: 46px;
  height: auto;
  position: relative;

  &.isLoading {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }
}
</style>
