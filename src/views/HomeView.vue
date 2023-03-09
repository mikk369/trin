<template>
  <div class="main-content">
    <navView @toggleMenu="toggleMenu"></navView>
    <div class="container">
      <menuView ref="changeMenu"></menuView>
      <section>
        <div class="text-wrapper">
          <h1>TRINIDAD WISEMAN</h1>
          <p>SPA proovitöö</p>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import navView from '../components/navView.vue';
import menuView from './../components/menuItem.vue';

export default {
  name: 'requirements',
  components: {
    menuView,
    navView,
  },
  data() {
    return {
      showMenu: false,
    };
  },
  methods: {
    toggleMenu() {
      // Change display style of component
      console.log('button clicked');
      this.showMenu = !this.showMenu;
      const menu = this.$refs.changeMenu.$el;
      menu.style.display = this.showMenu ? 'block' : '';
    },
  },
};
</script>

<style scoped>
/* main content styles desktop */
.main-content {
  font-family: booster;
  font-size: 1.1875rem;
  color: #fff;
  display: flex;
  height: 100vh;
}

.container {
  display: flex;
  flex-grow: 1;
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
  flex-grow: 1;
}

.text-wrapper {
  text-align: center;
}

h1 {
  color: #14cc76;
  font-size: 45px;
}

p {
  font-size: 40px;
  font-weight: bold;
}
</style>
