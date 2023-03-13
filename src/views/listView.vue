<template>
  <div class="main-contnent">
    <navView @toggleMenu="toggleMenu"></navView>
    <menuView ref="changeMenu"></menuView>
    <section>
      <div class="article-container">
        <h1 class="title">{{ title }}</h1>
        <p class="intro"></p>
        <div v-if="Loading" class="loading-screen">
          <div class="loading-circle"></div>
        </div>
        <div class="img-par-wrapper">
          <div
            class="img-wrapper"
            :style="{ 'background-image': `url(${backgroundImageUrl})` }"
          >
            <div class="img-container">
              <img :src="`${image}`" :alt="`${alt}`" />
            </div>
            <div class="image-title">{{ imageTitle }}</div>
          </div>
          <div class="par-container"></div>
          <button class="btn">amet</button>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import axios from 'axios';
import menuView from '../components/menuItem.vue';
import navView from '../components/navView.vue';
export default {
  name: 'requirements',
  components: {
    menuView,
    navView,
  },
  data() {
    return {
      alt: '',
      title: '',
      image: '',
      imageTitle: '',
      Loading: false,
      backgroundImageUrl: '',
    };
  },
  methods: {
    toggleMenu() {
      // Change display style of component
      this.showMenu = !this.showMenu;
      const menu = this.$refs.changeMenu.$el;
      menu.style.display = this.showMenu ? 'block' : 'none';
    },
  },
  async mounted() {
    this.Loading = true; // show the loading screen
    try {
      const response = await axios.get(
        'https://midaiganes.irw.ee/api/list/' + this.$route.params.id
      );
      // image alt
      this.alt = response.data.image.alt;
      // image title
      this.imageTitle = response.data.image.title;
      // title
      this.title = response.data.title;
      // intro
      this.intro = response.data.intro;
      const intro = document.querySelector('.intro');
      intro.innerHTML = response.data.intro;
      // image
      this.image = response.data.image.small;
      // background image
      this.backgroundImageUrl = response.data.image.large;
      // paragraphs
      const textApi = response.data.body;
      const containerEl = document.querySelector('.par-container');
      containerEl.innerHTML = textApi;
      const paragraphs = containerEl.querySelectorAll('p');
      paragraphs.forEach((p) => {
        p.style.marginTop = '40px';
        p.style.marginBottom = '40px';
      });
    } catch (err) {
      console.log(err);
    }
    this.Loading = false; // hide the loading screen
  },
};
</script>
<style scoped>
/* main content styles desktop */
.main-contnent {
  font-family: booster;
  font-size: 1.1875rem;
  font-weight: lighter;
  color: #fff;
  height: 100vh;
}
/* main content at width 960 row height */
@media (max-width: 960px) {
  .main-contnent {
    grid-template-rows: 50px;
  }
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
@media (max-width: 960px) {
  section {
    grid-row: 2 / 3;
    grid-column: 1 / 3;
  }
}
.article-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 1000px;
  padding: 80px 40px 80px 40px;
}
@media only screen and (max-width: 425px) {
  .img-container img {
    padding: 30px 0 30px 0;
  }
}
h1 {
  text-transform: uppercase;
  font-size: 2.8125rem;
  margin-bottom: 30px;
  text-align: center;
}
p {
  padding: 40px 0 40px 0;
}
.img-wrapper {
  display: flex;
  justify-content: center;
  background-size: cover;
  position: relative;
}

.image-title {
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: rgb(0, 0, 0, 0.6);
  width: 100%;
  display: flex;
  align-items: center;
  padding: 10px 24px 10px 24px;
}
img {
  width: 100%;
  height: 100%;
  padding: 0 100px 0 100px;
  transition: transform ease-in-out 0.2s;
}

img:hover {
  transform: scale(1.1);
}

.btn {
  background-color: #ff57a2;
  border: none;
  padding: 0.5rem 1rem;
  color: #fff;
  border-radius: 100px;
  font-weight: bold;
  font-size: 14px;
}
.par-container p {
  padding: 40px 0 40px 0;
}
.loading-circle {
  position: absolute;
  z-index: 99;
  top: 50%;
  left: 50%;
  display: inline-block;
  width: 80px;
  height: 80px;
  border: 6px solid #14cc76;
  border-radius: 50%;
  border-top-color: transparent;
  animation: spin 1s ease-in-out infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
