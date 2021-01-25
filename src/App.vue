<template>
  <div id="app">
    <Header></Header>
    <div class="container">
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
    typesAreLoaded(){
      return this.$store.state.types && this.$store.state.types.length>0
    }
  }
};
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: Arial, Helvetica, sans-serif;
  line-height: 1.4;
}

.btn {
  border: none;
  cursor: pointer;
  padding: 8px;
}

.btn-primary {
  background-color: #2a324b;
  color: white;
}

.btn-primary:hover {
  background-color: #1e2334;
}

.btn-secondary {
  background-color: #6273a7;
  color: white;
}

.btn-secondary:hover {
  background-color: #58699d;
}

a.btn-primary {
  display: inline-block;
  text-decoration: none;
}

.loader {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
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
</style>
