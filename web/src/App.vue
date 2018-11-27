<template>
  <div id="app" class="container">
    <pm-header/>
    <router-view/>
  </div>
</template>

<script>
import Header from '@/components/Header'

export default {
  name: 'App',
  components: {
    'pm-header': Header
  }
}
</script>

<style lang="scss" scoped>
#app {
  width:65%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
