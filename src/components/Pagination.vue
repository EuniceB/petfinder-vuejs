<template>
  <div class="pagination">
    <div class="page-link" v-if="currentPage !== 1" @click="getPage(1)">
      &laquo;
    </div>
    <div
      class="page-link"
      v-if="currentPage !== 1 && totalPages >= currentPage - 1"
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
    type() {
      return this.$store.state.pets.type;
    },
    totalCount() {
      return this.$store.state.pets.pagination
        ? this.$store.state.pets.pagination.total_count
        : null;
    },
    currentPage() {
      return this.$store.state.pets.pagination
        ? this.$store.state.pets.pagination.current_page
        : null;
    },
    totalPages() {
      return this.$store.state.pets.pagination
        ? this.$store.state.pets.pagination.total_pages
        : null;
    },
    pages() {
      const pages = [];

      if (this.totalPages >= this.currentPage - 2 && this.currentPage - 2 > 0) {
        pages.push(this.currentPage - 2);
      }
      if (this.totalPages >= this.currentPage - 1 && this.currentPage - 1 > 0) {
        pages.push(this.currentPage - 1);
      }
      if (this.totalPages >= this.currentPage && this.totalCount > 0) {
        pages.push(this.currentPage);
      }
      if (this.totalPages >= this.currentPage + 1) {
        pages.push(this.currentPage + 1);
      }
      if (this.totalPages >= this.currentPage + 2) {
        pages.push(this.currentPage + 2);
      }
      if (this.totalPages >= this.currentPage + 3 && this.currentPage < 3) {
        pages.push(this.currentPage + 3);
      }
      if (this.totalPages >= this.currentPage + 4 && this.currentPage < 2) {
        pages.push(this.currentPage + 4);
      }

      return pages;
    },
  },
  methods: {
    async getPage(page) {
      if (this.currentPage === page) {
        return;
      }

      this.$router.push({ path: `/pets/${this.type.name}/${page}` });
    },
  },
};
</script>

<style scoped>
.pagination {
  display: flex;
  width: 200px;
  margin: 0 auto;
  font-size: 80%;
  justify-content: space-around;
  align-items: center;
}

.page-link {
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 50%;
}

.page-link:hover {
  background-color: #6273a7;
  color: white;
}

.current {
  background-color: #2a324b;
  color: white;
  border-radius: 50%;
}
</style>