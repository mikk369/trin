<template>
  <nav class="navbar">
    <div class="nav-wrapper">
      <div class="navbar-toggle" @click="$emit('toggleMenu')">
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </div>
      <div class="logo">
        <img src="/logo.svg" alt="twn-logo" />
      </div>
      <div class="nav-space"></div>
    </div>
  </nav>
</template>

<style scoped>
/*  NAV STYLES */
nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 10px 20px 10px 20px;
  background-color: #ffffff;
  z-index: 999;
  display: none;
}
@media (max-width: 960px) {
  nav {
    display: block;
  }
}
.nav-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  margin: 0;
}
.logo img {
  width: 103px;
  height: auto;
}

.navbar-toggle .bar {
  width: 20px;
  height: 3px;
  margin: 3px auto;
  transition: all 0.3s ease-in-out;
  background-color: #3a3d57;
  display: block;
  cursor: pointer;
}
</style>
