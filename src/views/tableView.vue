<template>
  <div class="main-contnent">
    <navView @toggleMenu="toggleMenu"></navView>
    <menuView ref="changeMenu"></menuView>
    <div class="overlay" @click="closeButton"></div>
    <section>
      <div class="table-wrapper">
        <h1>Nimekiri</h1>
        <div v-if="Loading" class="loading-screen">
          <div class="loading-circle"></div>
        </div>
        <table>
          <thead>
            <th>
              <div class="th-wrapper">
                Eesnimi
                <div class="arrows-container">
                  <font-awesome-icon
                    @click="sort('firstname')"
                    :icon="
                      currentSort === 'firstname'
                        ? currentSortDir === 'asc'
                          ? // If the sorting direction is asc, show the up arrow icon
                            'fa-solid fa-angle-up arrows'
                          : // If the sorting direction is desc, show the down arrow ico
                            'fa-solid fa-angle-down' // If the current column is not being sorted, show the sort icon
                        : 'fa-solid fa-sort'
                    "
                    class="icon"
                  />
                </div>
              </div>
            </th>
            <th>
              <div class="th-wrapper">
                Perenimi
                <div class="arrows-container">
                  <font-awesome-icon
                    @click="sort('surname')"
                    :icon="
                      currentSort === 'surname'
                        ? currentSortDir === 'asc'
                          ? 'fa-solid fa-angle-up arrows'
                          : 'fa-solid fa-angle-down'
                        : 'fa-solid fa-sort'
                    "
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
                    @click="sort('sex')"
                    :icon="
                      currentSort === 'sex'
                        ? currentSortDir === 'asc'
                          ? 'fa-solid fa-angle-up arrows'
                          : 'fa-solid fa-angle-down'
                        : 'fa-solid fa-sort'
                    "
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
                    @click="sort('date')"
                    :icon="
                      currentSort === 'date'
                        ? currentSortDir === 'asc'
                          ? 'fa-solid fa-angle-up arrows'
                          : 'fa-solid fa-angle-down'
                        : 'fa-solid fa-sort'
                    "
                    class="icon"
                  />
                </div>
              </div>
            </th>
            <th>
              <div class="th-wrapper">Telefon</div>
            </th>
          </thead>
          <tbody>
            <template
              class="row-wrapper"
              v-for="(list, i) in paginatedList"
              :key="'row' + list.id"
            >
              <tr
                :class="{ odd: i % 2 === 0, even: i % 2 === 1 }"
                @click="toggleRow(list.id)"
              >
                <td>{{ list.firstname }}</td>
                <td>{{ list.surname }}</td>
                <td>{{ list.sex }}</td>
                <td>{{ list.date }}</td>
                <td>{{ list.phone }}</td>
              </tr>
              <div :class="'hiddenRow' + list.id" class="hiddenRow">
                <div class="info-row">
                  {{
                    `${list.firstname} | ${list.surname} | ${list.sex} | ${list.date} | ${list.phone}`
                  }}
                </div>
                <button class="close-btn" @click="closeButton">&times;</button>
                <td colspan="5">
                  <div class="tab-wrapper">
                    <img
                      :src="`${list.image.small}`"
                      :alt="`${list.image.alt}`"
                      class="tab-image"
                    />
                    <div class="text-wrapper">
                      <div class="tab-text">
                        <p v-html="list.body"></p>
                      </div>
                      <div class="hidden-row-button">
                        <router-link
                          :to="{ name: 'listview', params: { id: list.id } }"
                        >
                          <a class="btn btn-primary">LOE ROHKEM</a>
                        </router-link>
                      </div>
                    </div>
                  </div>
                </td>
              </div>
            </template>
          </tbody>
        </table>
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
          <!-- creates pagination menu links -->
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
  },
  data() {
    return {
      list: [],
      currentPage: 1,
      itemsPerPage: 10,
      Loading: false,
      currentSort: '',
      currentSortDir: '',
      showMenu: false,
      openRows: [],
      sortedData: [],
    };
  },
  async mounted() {
    this.Loading = true; // show the loading screen
    try {
      const response = await axios.get(
        'https://midaiganes.irw.ee/api/list?limit=500'
      );
      // create new list where date and phone nr are modified and return it with spread operator
      const modifiedList = response.data.list.map((data) => {
        const timestamp = data.date;
        const date = new Date(timestamp * 1000);
        // returns a string representing the date in the specified locale using the local time zone
        const formatedDate = date.toLocaleDateString('et-EE');
        // replaces / wiht dot
        const dateWithdot = formatedDate.replace(/\//g, '.');
        // check if data.sex is f return naine else its mees
        const sex = data.sex === 'f' ? 'naine' : 'mees';
        // add space to phone number
        const phoneNumber = data.phone
          .toString()
          .replace(/(\d{3})(\d{7})/, '$1 $2');
        //text for inside the row
        const textApi = data.body;

        return {
          ...data,
          date: dateWithdot,
          sex: sex,
          phone: phoneNumber,
          body: textApi,
        };
      });
      this.list = modifiedList;
    } catch (err) {
      console.log(err);
    }
    this.Loading = false; // show the loading screen
  },
  computed: {
    // returns a portion of the list array based on the currentPage and itemsPerPage values.
    paginatedList() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      // calculates the endIndex of the items to be displayed by adding the startIndex to the itemsPerPage.
      const endIndex = startIndex + this.itemsPerPage;
      // returns a new array that contains the items between the startIndex and endIndex.
      return this.list.slice(startIndex, endIndex);
    },
    // Calculates the total number of pages needed to display all the data, based on the length of the list array(creates pages)
    totalPages() {
      return Math.ceil(this.list.length / this.itemsPerPage);
    },
  },
  methods: {
    toggleMenu() {
      // Change display style of menu component
      this.showMenu = !this.showMenu;
      const menu = this.$refs.changeMenu.$el;
      menu.style.display = this.showMenu ? 'block' : 'none';
    },

    // Set the currentSort and currentSortDir based on the sortKey
    sort(sortKey) {
      if (this.currentSort === sortKey) {
        // If they are the same, it toggles the current sort direction between asc and desc
        this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc';
      } else {
        // If they are different, it sets the current sort key to the specified sortKey and sets the sort direction to 'asc'.
        this.currentSort = sortKey;
        this.currentSortDir = 'asc';
      }
      // sorts the list data using the sortKey and currentSortDir to determine the sort order.
      this.sortedData = this.list.sort((a, b) => {
        const sortA = a[sortKey];
        const sortB = b[sortKey];
        //  check if a value is less than b value
        if (sortA < sortB) {
          // if currSortDir is asc which means that A should be placed before B
          return this.currentSortDir === 'asc' ? -1 : 1;
        } else if (sortA > sortB) {
          // else B first
          return this.currentSortDir === 'asc' ? 1 : -1;
        } else {
          return 0;
        }
      });
    },
    toggleRow(id) {
      // It gets the index of the current row in the openRows array by calling the indexOf method.
      const index = this.openRows.indexOf(id);
      // id parameter passed to the toggleRow function is used to select the corresponding hidden row
      const hiddenRow = document.querySelector(`.hiddenRow${id}`);
      const overlay = document.querySelector('.overlay');
      // If the current row is already open its index is greater than -1, the method removes the row's id from the openRows array
      // (has to be -1 otherwise it removes 2,3... and not 0,1)
      if (index > -1) {
        this.openRows.splice(index, 1);
        hiddenRow.classList.remove('active');
        overlay.classList.remove('active');
      } else {
        // otherwise push the id to openRows array
        this.openRows.push(id);
        hiddenRow.classList.add('active');
        overlay.classList.add('active');
      }
    },
    closeButton() {
      const hiddenRow = document.querySelector('.hiddenRow.active');
      const overlay = document.querySelector('.overlay.active');
      // if this returns true then remove active class
      if (hiddenRow && overlay) {
        hiddenRow.classList.remove('active');
        overlay.classList.remove('active');
      }
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
};
</script>
<style scoped>
.overlay {
  display: none;
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.178);
  backdrop-filter: blur(3px);
  z-index: 5;
}
.overlay.active {
  display: block;
}
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
  overflow-x: auto;
  height: 100vh;
}
@media only screen and (max-width: 1024px) {
  section {
    display: block;
  }
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
  width: 1000px;
}

table {
  border-collapse: collapse;
  font-size: 1.3rem;
}
th,
td {
  padding: 10px 16px;
  white-space: nowrap;
}

/* HIDDEN ROW  */
.hiddenRow {
  display: none;
  background-color: white;
  color: #000;
  padding: 50px;
}
.hiddenRow.active {
  display: block;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 6;
}

@media (max-width: 1024px) {
  .hiddenRow.active {
    max-width: 100%;
    overflow-x: auto;
    padding: 6px;
  }
  .tab-wrapper {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .hidden-row-button {
    display: flex;
    justify-content: center;
  }
}
.close-btn {
  position: absolute;
  top: -1px;
  right: 9px;
  font-size: 3rem;
  color: #333;
  cursor: pointer;
  border: none;
  background: none;
}
@media (max-width: 425px) {
  .close-btn {
    right: -18rem;
  }
}
@media (max-width: 425px) {
  .close-btn {
    right: -22rem;
  }
}
.tab-wrapper {
  display: flex;
}
.tab-text {
  display: flex;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  width: 629px;
  margin-bottom: 20px;
}
.tab-image {
  width: 15rem;
  height: auto;
}
.text-wrapper {
  margin-left: 19px;
}
.text-wrapper a:link {
  text-decoration: none;
  background-color: #2ab662;
  padding: 10px 20px 10px 20px;
  border-bottom: 0.25rem solid #37945c;
  color: #151516;
  font-size: 0.75rem;
  font-weight: 700;
}
a:visited {
  color: #3a3d57;
  border-bottom: 0.25rem solid #37945c;
}
a:hover {
  text-decoration: none;
  background-color: #1cdf84;
}

a:active {
  color: #3a3d57;
}
.th-wrapper {
  display: flex;
  align-items: left;
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
  margin-top: 20px;
}
.page-link {
  font-size: 1rem;
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
