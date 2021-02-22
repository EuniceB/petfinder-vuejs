<template>
  <article class="pet-item">
    <header>
      <h1 class="pet-name" v-html="pet.name"></h1>
      <font-awesome-icon
        v-if="pet.gender === 'Male'"
        icon="mars"
        :style="{ color: '#2547e1', fontSize: '16pt' }"
      />
      <font-awesome-icon
        v-if="pet.gender === 'Female'"
        icon="venus"
        :style="{ color: '#e1258e', fontSize: '16pt' }"
      />
    </header>
    <main>
      <p class="date">{{ new Date(pet.published_at).toLocaleString() }}</p>
      <div class="img-container">
        <img
          v-if="pet.photos && pet.photos.length > 0"
          v-bind:src="pet.photos[0].medium"
        />
        <img
          class="no-photo"
          v-if="!pet.photos || pet.photos.length === 0"
          src="@/assets/no-photo-available.jpeg"
        />
      </div>
      <p v-if="pet.description" class="pet-desc" v-html="pet.description"></p>
      <p v-if="!pet.description" class="pet-desc">
        No description was provided.
      </p>
      <router-link
        :to="'pet/' + pet.id"
        class="btn btn-primary"
        v-bind:key="pet.id"
        >See more</router-link
      >
    </main>
  </article>
</template>

<script>
export default {
  name: "PetItem",
  props: ["pet"],
  methods: {},
};
</script>

<style scoped>
.pet-item {
  background-color: #2a324b;
  color: white;
  padding: 3em;
  border-radius: 5px;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.1);
}

.pet-item:hover {
  cursor: pointer;
}

.no-photo {
  display: inline-block;
  filter: grayscale(80%);
}

.pet-item > .btn {
  flex: 0 0 auto;
  text-align: center;
}

header {
  display: flex;
  justify-content: center;
  margin-bottom: 1em;
}

.pet-name {
  margin-right: 0.5em;
}

.pet-desc {
  height: 70px;
}

.img-container {
  height: 300px;
  text-align: center;
}

img {
  height: 100%;
  width: auto;
  max-width: 100%;
  object-fit: cover;
  object-position: 20% 10%;
  border-radius: 5px;
}

.date {
  color: grey;
  text-align: center;
  font-size: 8pt;
}

main{
  position: relative;
  z-index: 1;
}

main > *:not(:last-child) {
  margin-bottom: 3em;
}

.btn {
  width: 100%;
  text-align: center;
  border-radius: 5px;
  position: relative;
}

.btn:hover{
  color: #2a324b;
  background-color: white;
  border: 2px solid #f15025;
}

.btn::before{
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

.btn:hover::before{
  transform: rotate(4deg);
}
</style>