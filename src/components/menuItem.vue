<template>
  <menu class="menu-container">
    <div class="logo">
      <a href="/">
        <img src="/logo.svg" alt="trinidad wiseman logo" />
      </a>
    </div>
    <ul class="list-items">
      <li>
        <a href="/article"
          >artikkel
          <div class="icon-wrapper">
            <font-awesome-icon icon="fa-solid fa-file" /></div
        ></a>
      </li>
      <li>
        <a href="/table"
          >tabel
          <div class="icon-wrapper">
            <font-awesome-icon icon="fa-solid fa-table" /></div
        ></a>
      </li>
      <li>
        <a href="/game"
          >game of life
          <div class="icon-wrapper">
            <font-awesome-icon icon="fa-solid fa-image" /></div
        ></a>
      </li>
    </ul>
  </menu>
</template>
<script>
export default {
  data() {
    return {};
  },
};
</script>
<style scoped>
/* MENU STYLES   */
menu {
  color: #3a3d57;
}

.menu-container {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 210px;
  background-color: white;
  z-index: 99;
  padding: 25px;
  font-family: booster;
  transition: 0.2s ease-out;
}
@media (max-width: 960px) {
  .menu-container {
    display: none;
    margin-top: 40px;
  }
  .logo {
    display: none;
  }
}
.logo a {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 170px;
  height: auto;
  margin: 25px 0 50px 0;
}
ul {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  line-height: 3rem;
}
.list-items {
  list-style: none;
  font-size: 1.1875rem;
  text-transform: uppercase;
}
li a {
  display: flex;
}
.icon-wrapper {
  margin-left: 10px;
}

.list-items a {
  text-decoration: none;
  color: #3a3d57;
}

.list-items a:hover {
  cursor: pointer;
  color: #03875c;
  transition: all 0.3s ease-in-out;
  transform: scale(1.1) translateX(-9%);
}
.icon-wrapper:hover {
  transform: scale(1.6);
}
.active-link {
  color: #03875c;
}
</style>
