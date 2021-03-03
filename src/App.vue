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

.card {
  background-color: #2a324b;
  color: white;
  padding: 3em;
  border-radius: 5px;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.1);
  z-index: 1;
}

.card a {
  color: white;
}

.card header {
  display: flex;
  justify-content: center;
  margin-bottom: 1em;
}

.btn-primary {
  text-align: center;
  border-radius: 5px;
  position: relative;
}

.btn-primary:hover{
  color: #2a324b;
  background-color: white;
  border: 2px solid #f15025;
}

.btn-primary::before{
  content: '';
  position: absolute;
  z-index: -1;
  background-color: #f15025;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  transform: rotate(0deg);
  transition: transform 150ms ease-in;
}

.btn-primary:hover::before{
  transform: rotate(4deg);
}

a:hover {
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
