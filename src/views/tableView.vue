<template>
  <div class="main-contnent">
    <navView @toggleMenu="toggleMenu"></navView>
    <menuView ref="changeMenu"></menuView>
    <section>
      <div class="table-wrapper">
        <h1>Nimekiri</h1>
        <table>
          <thead>
            <tr>
              <th>Eestnimi</th>
              <th>Perekonnanimi</th>
              <th>Sugu</th>
              <th>Sünnikuupäev</th>
              <th>telefon</th>
            </tr>
          </thead>
          <tbody
            v-for="(list, i) in list"
            :key="list.id"
            :class="{ odd: i % 2 === 0, even: i % 2 === 1 }"
          >
            <tr>
              <td>{{ list.firstname }}</td>
              <td>{{ list.surname }}</td>
              <td>{{ list.sex }}</td>
              <td>{{ list.date }}</td>
              <td>{{ list.phone }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="pagination-wrapper">
        <button class="button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="btn-icon"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>
        <a href="#" class="page-link page-link--current">1</a>
        <a href="#" class="page-link">2</a>
        <a href="#" class="page-link">3</a>
        <a href="#" class="page-link">4</a>
        <a href="#" class="page-link">5</a>
        <a href="#" class="page-link">6</a>

        <button class="button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="btn-icon"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>
    </section>
  </div>
</template>
<script>
import axios from 'axios';
import pagination from '../components/paginationView.vue';
import menuView from './../components/menuItem.vue';
import navView from '../components/navView.vue';
export default {
  name: 'requirements',
  components: {
    menuView,
    navView,
    pagination,
    showMenu: false,
  },
  data() {
    return {
      list: [],
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
    try {
      const response = await axios.get(
        'https://midaiganes.irw.ee/api/list?limit=500'
      );
      this.list = response.data.list;
    } catch (err) {
      console.log(err);
    }
  },
};
</script>
<style scoped>
/* main content styles desktop */
.table-wrapper {
  display: flex;
  color: #fff;
  font-family: booster;
  font-size: 2rem;
  padding: 5rem 2.5rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1;
}
h1 {
  text-transform: uppercase;
  margin-bottom: 30px;
}

/* SECTION STYLES */
section {
  padding: 80px 40px 80px 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #3a3d57;
  background-image: url('/bg-deco-right.svg'), url('/bg-deco-left.svg');
  background-repeat: no-repeat;
  background-position: top right, bottom left;
  background-size: 200px;
  flex-grow: 1;
}

table {
  border-collapse: collapse;
  border-collapse: collapse;
  font-size: 18px;
}
th,
td {
  padding: 16px 24px;
  text-align: left;
}
tr {
  border-bottom: 1px solid #a4a5a7;
}
thead th {
  background-color: #333;
  color: #fff;
  width: 25%;
}
.odd {
  background-color: #3a3d57;
}
.even {
  background-color: #494d6e;
}
/* PAGINATION STYLES  */

.pagination-wrapper {
  display: flex;
  width: 400px;
  justify-content: space-between;
  align-items: center;
}
.page-link {
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  width: 30px;
  height: 30px;
  border-radius: 200px;
}
.page-link:hover,
.page-link:active,
.page-link--current {
  background-color: #fff;
  color: #3a3d57;
}
.span-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
.btn-icon {
  height: 20px;
  width: 20px;
  stroke: #fff;
}
.button:hover .btn-icon {
  stroke: #fff;
}
.button {
  width: 35px;
  height: 35px;
  background: none;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
}
.button:hover {
  border: #fff;
  border: solid 1px #fff;
  border-radius: 100px;
}
</style>
