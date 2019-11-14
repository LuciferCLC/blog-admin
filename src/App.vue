<template>
  <div id="app">
    <transition name="fade">
      <router-view/>
    </transition>
  </div>
</template>

<script>
export default {
  beforeCreate () {
    this.$store.dispatch('initAuth')
  }
}
</script>

<style lang="scss">
#app {
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;
}
</style>
