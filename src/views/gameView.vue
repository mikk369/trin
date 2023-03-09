<template>
  <div class="main-container">
    <div class="main-contnent">
      <nav class="navbar">
        <div class="navbar-toggle" id="mobile-menu">
          <span class="bar">--</span>
          <span class="bar">--</span>
          <span class="bar">--</span>
        </div>
      </nav>
      <menuView></menuView>
      <section></section>
    </div>
  </div>
</template>
<script>
import menuView from './../components/menuItem.vue';
export default {
  name: 'requirements',
  components: {
    menuView,
  },
};
</script>
<style scoped>
@import url('./../style.css');

/* main content styles desktop */
.main-contnent {
  font-family: booster;
  font-size: 1.1875rem;
  font-weight: lighter;
  color: #fff;
  display: flex;
  height: 100vh;
}
/* main content at width 960 row height */
/* @media (max-width: 960px) {
  .main-contnent {
    grid-template-rows: 50px;
  }
} */

/*  NAV STYLES */
nav {
  display: none;
}
/* @media (max-width: 960px) {
  nav {
    display: block;
    grid-column: 1 / 3;
  }
} */
.bar {
  color: #3a3d57;
}

/* SECTION STYLES */
section {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #3a3d57;
  background-image: url('/bg-deco-right.svg'), url('/bg-deco-left.svg');
  background-repeat: no-repeat;
  background-position: top right, bottom left;
  background-size: 200px;
}
/* @media (max-width: 960px) {
  section {
    grid-row: 2 / 3;
    grid-column: 1 / 3;
  }
} */
</style>
