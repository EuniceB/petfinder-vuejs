<template>
  <div id="app" class="full">
    <Header></Header>
    <div class="container full">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Header from "./components/layout/Header";

export default {
  name: "App",
  components: {
    Header,
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.accessToken != null;
    },
    typesAreLoaded() {
      return this.$store.state.types && this.$store.state.types.length > 0;
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Akaya+Telivigala&family=Quicksand:wght@500&display=swap");

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: "Quicksand", sans-serif;
  line-height: 1.6;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: "Akaya Telivigala", cursive;
  line-height: 1.1;
}

.btn {
  border: none;
  cursor: pointer;
  padding: 8px;
}

.btn-primary {
  background-color: #f15025;
  color: white;
}

.btn-secondary {
  background-color: #2a324b;
  color: white;
}


a.btn-primary {
  display: inline-block;
  text-decoration: none;
}

.loader {
  display: flex;
  align-items: center;
  justify-content: center;
}

.loader img {
  display: block;
  width: 100px;
  margin: 40px auto;
}

a.btn-primary:hover {
  cursor: pointer;
}

.container {
  display: flex;
  flex-direction: column;
  min-height: 85vh;
}

.container > * {
  min-height: inherit;
}

.full {
  width: 100%;
}

html,
body {
  width: 100%;
}
</style>
