<template>
  <div class="pagination">
    <div
      class="page-link"
      v-if="currentPage !== 1"
      @click="getPage(1)"
    >
      &laquo;
    </div>
    <div
      class="page-link"
      v-if="currentPage !== 1"
      @click="getPage(currentPage - 1)"
    >
      &lt;
    </div>
    <div
      class="page-link"
      v-bind:key="page"
      v-bind:class="{ current: currentPage === page }"
      v-for="page in pages"
      @click="getPage(page)"
    >
      {{ page }}
    </div>
    <div
      class="page-link"
      v-if="currentPage !== totalPages"
      @click="getPage(currentPage + 1)"
    >
      &gt;
    </div>
    <div
      class="page-link"
      v-if="currentPage !== totalPages"
      @click="getPage(totalPages)"
    >
      &raquo;
    </div>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  computed: {
    currentPage () {
      return this.$store.state.pagination? this.$store.state.pagination.current_page: null;
    },
    totalPages () {
      return this.$store.state.pagination? this.$store.state.pagination.total_pages: null;
    },
    pages() {
      const pages = [];
      if (this.currentPage >= 1 && this.currentPage <= 5) {
        pages.push(1, 2, 3, 4, 5);
      } else if (
        this.currentPage >= this.totalPages - 4 &&
        this.currentPage <= this.totalPages
      ) {
        pages.push(
          this.totalPages - 4,
          this.totalPages - 3,
          this.totalPages - 2,
          this.totalPages - 1,
          this.totalPages
        );
      } else {
        pages.push(
          this.currentPage - 1,
          this.currentPage,
          this.currentPage + 1,
          this.currentPage + 2,
          this.currentPage + 3
        );
      }
      return pages;
    }
  },
  methods: {
    async getPage(page) {
      if (this.currentPage === page) {
        return;
      }

      await this.$store.dispatch("getPetsPage", {page});
    },
  }
};
</script>

<style scoped>
.pagination {
  display: flex;
  width: 200px;
  margin: 8px auto;
  justify-content: space-around;
  align-items: center;
}

.page-link {
  padding: 8px 16px;
  cursor: pointer;
}

.page-link:hover {
  background-color: #fbd1c5;
}

.current {
  background-color: #f15025;
  color: white;
}
</style>