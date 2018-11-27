<template>
  <header class="container-flow">
    <div class="row">
      <div id="logo">
        <img src="@/assets/logo.png" alt="Pomarola Logo" class="navbar-brand">
      </div>
      <div id="navigation">
        <h1>Pomarola</h1>
        <b-nav tabs>
          <b-nav-item>Main</b-nav-item>
          <b-nav-item>Pomarola Types</b-nav-item>
        </b-nav>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style lang="scss">
header {
  #logo {
    width: 15%;
    img {
      width: 5em;
    }
  }
  #navigation {
    width: 85%;
    float: left;
    h1 {
      display: inline-block;
      margin-left: -75%;
    }
  }
}
</style>
