<template>
  <div class="main-contnent">
    <navView @toggleMenu="toggleMenu"></navView>
    <menuView ref="changeMenu"></menuView>
    <section>
      <body>
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
        <pagination></pagination>
      </body>
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
  async created() {
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
body {
  display: flex;
  color: #fff;
  font-family: booster;
  font-size: 2rem;
  padding: 5rem 2.5rem;

  flex-direction: column;
  justify-content: center;
  align-items: center;
}
h1 {
  text-transform: uppercase;
  margin-bottom: 30px;
}
.main-contnent {
  display: flex;
}

/* SECTION STYLES */
section {
  padding: 80px 40px 80px 40px;
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

body {
  display: flex;
  line-height: 1;
  justify-content: center;
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
</style>
