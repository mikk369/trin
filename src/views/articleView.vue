<template>
  <div class="main-container">
    <div class="main-contnent">
      <navView></navView>
      <menuView></menuView>
      <section>
        <div class="article-container">
          <h1 class="title">{{ title }}</h1>
          <p class="intro"></p>
          <div class="img-par-wrapper">
            <div class="img-container">
              <img :src="`${image}`" alt="dog picture" />
            </div>

            <div class="par-container"></div>
            <button class="btn">amet</button>
          </div>
        </div>
      </section>
    </div>
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
      title: '',
      image: '',
      imageTitle: '',
    };
  },
  async created() {
    try {
      const response = await axios.get(
        'https://midaiganes.irw.ee/api/list/972d2b8a'
      );
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
      // body
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
  display: grid;
  grid-template-columns: 220px 1fr;
  grid-template-rows: 1fr;
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
h1 {
  text-transform: uppercase;
  font-size: 2.8125rem;
  margin-bottom: 30px;
  text-align: center;
}
p {
  padding: 40px 0 40px 0;
}
.img-container {
  background-image: url('https://midaiganes.irw.ee/api/imgs/large/a3dac073.jpg');
  display: flex;
  justify-content: center;
  text-align: center;
  background-size: cover;
  filter: blur();
}
img {
  width: 800px;
  height: auto;
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
</style>
