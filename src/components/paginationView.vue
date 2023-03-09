<template>
  <div class="main-container">
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
  </div>
</template>

<style scoped>
.main-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
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
