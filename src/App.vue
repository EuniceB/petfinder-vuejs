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
    typesAreLoaded() {
      return (
        this.$store.state.pets.types && this.$store.state.pets.types.length > 0
      );
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
  border-radius: 5px;
  background-color: rgb(238, 237, 237);
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

.btn-primary {
  text-align: center;
  border-radius: 5px;
  overflow: hidden;
  position: relative;
}

.btn-primary:hover {
  color: #2a324b;
  padding: 6px;
  border: 2px solid white;
}

.btn-primary::before {
  content: "";
  position: absolute;
  z-index: 10;
  background-color: rgb(255, 255, 255, 0.2);
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 150ms ease-in;
}

.btn-primary:hover::before {
  transform: scaleX(1);
  transition: transform 150ms ease-in;
  transform-origin: right;
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
