<template>
  <div class="main-contnent">
    <navView @toggleMenu="toggleMenu"></navView>
    <menuView ref="changeMenu"></menuView>
    <section>
      <div class="table-wrapper">
        <h1>Nimekiri</h1>
        <table>
          <div v-if="Loading" class="loading-screen">
            <div class="loading-circle"></div>
          </div>
          <thead>
            <tr>
              <th>
                <div class="th-wrapper">
                  Eesnimi
                  <div class="arrows-container">
                    <font-awesome-icon
                      icon="fa-solid fa-angle-up arrows"
                      class="icon"
                    /><font-awesome-icon
                      icon="fa-solid fa-angle-down"
                      class="icon"
                    />
                  </div>
                </div>
              </th>
              <th>
                <div class="th-wrapper">
                  Perekonnanimi
                  <div class="arrows-container">
                    <font-awesome-icon
                      icon="fa-solid fa-angle-up arrows"
                      class="icon"
                    /><font-awesome-icon
                      icon="fa-solid fa-angle-down"
                      class="icon"
                    />
                  </div>
                </div>
              </th>
              <th>
                <div class="th-wrapper">
                  Sugu
                  <div class="arrows-container">
                    <font-awesome-icon
                      icon="fa-solid fa-angle-up arrows"
                      class="icon"
                    /><font-awesome-icon
                      icon="fa-solid fa-angle-down"
                      class="icon"
                    />
                  </div>
                </div>
              </th>
              <th>
                <div class="th-wrapper">
                  Sünnikuupäev
                  <div class="arrows-container">
                    <font-awesome-icon
                      icon="fa-solid fa-angle-up "
                      class="icon"
                    /><font-awesome-icon
                      icon="fa-solid fa-angle-down"
                      class="icon"
                    />
                  </div>
                </div>
              </th>
              <th>
                <div class="th-wrapper">
                  telefon
                  <div class="arrows-container">
                    <font-awesome-icon
                      icon="fa-solid fa-angle-up"
                      class="icon"
                    /><font-awesome-icon
                      icon="fa-solid fa-angle-down"
                      class="icon"
                    />
                  </div>
                </div>
              </th>
            </tr>
          </thead>
          <tbody
            v-for="(list, i) in paginatedList"
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
        <button class="button" @click="previousPage">
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
        <a
          v-for="page in totalPages"
          :key="page"
          :href="`#${page}`"
          :class="{
            'page-link': true,
            'page-link--current': page === currentPage,
          }"
          @click.prevent="setCurrentPage(page)"
        >
          {{ page }}
        </a>

        <button class="button" @click="nextPage">
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
import menuView from './../components/menuItem.vue';
import navView from '../components/navView.vue';
export default {
  name: 'requirements',
  components: {
    menuView,
    navView,
    showMenu: false,
  },
  data() {
    return {
      list: [],
      currentPage: 1,
      itemsPerPage: 10,
      Loading: false,
    };
  },
  computed: {
    // to determine which rows of data should be displayed on the current page.
    paginatedList() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.list.slice(startIndex, endIndex);
    },
    // Calculates the total number of pages needed to display all the data, based on the length of the list array
    totalPages() {
      return Math.ceil(this.list.length / this.itemsPerPage);
    },
  },
  methods: {
    toggleMenu() {
      // Change display style of component
      this.showMenu = !this.showMenu;
      const menu = this.$refs.changeMenu.$el;
      menu.style.display = this.showMenu ? 'block' : 'none';
    },
    // This method sets the currentPage property to the specified page number.
    setCurrentPage(pageNumber) {
      this.currentPage = pageNumber;
    },
    // This method increments currentPage
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    // This method decrements currentPage
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
  },
  async mounted() {
    this.Loading = true; // show the loading screen
    try {
      const response = await axios.get(
        'https://midaiganes.irw.ee/api/list?limit=500'
      );
      this.list = response.data.list;
    } catch (err) {
      console.log(err);
    }
    this.Loading = false; // show the loading screen
  },
};
</script>
<style scoped>
h1 {
  text-transform: uppercase;
  margin-bottom: 30px;
}

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
  height: 100vh;
  overflow-x: auto;
}
.table-wrapper {
  display: flex;
  color: #fff;
  font-family: booster;
  font-size: 2rem;
  padding: 5rem 2.5rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
table {
  border-collapse: collapse;
  font-size: 1.3rem;
}

th,
td {
  padding: 10px 16px;
  /* text-align: left; */
  white-space: nowrap;
}

th tr {
  border-bottom: 1px solid #a4a5a7;
}
.th-wrapper {
  display: flex;
  align-items: center;
}
thead th {
  background-color: #333;
  color: #fff;
  width: 25%;
}
.arrows-container {
  display: flex;
  flex-direction: column;
  margin-left: 9px;
}
.icon {
  width: 16px;
  height: 16px;
  cursor: pointer;
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
.loading-circle {
  z-index: 99;
  position: absolute;
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
