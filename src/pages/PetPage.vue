<template>
  <div class="pet-page">
    <div v-if="loading" class="loader">
      <img src="@/assets/loading.gif" />
    </div>
    <div class="card" v-if="pet">
      <a href="#" @click="$router.go(-1)"> &lt;&lt; Back to list of pets</a>
      <header>
        <h1 v-html="pet.name"></h1>
        <font-awesome-icon
          v-if="pet.gender === 'Male'"
          icon="mars"
          :style="{ color: '#2547e1', fontSize: '32pt', marginLeft: '.4em' }"
        />
        <font-awesome-icon
          v-if="pet.gender === 'Female'"
          icon="venus"
          :style="{ color: '#e1258e', fontSize: '32pt', marginLeft: '.4em' }"
        />
      </header>
      <p class="date">{{ new Date(pet.published_at).toLocaleString() }}</p>
      <img
        v-if="pet.photos && pet.photos.length > 0"
        v-bind:src="pet.photos[0].medium"
      />
      <img
        class="no-photo"
        v-if="!pet.photos || pet.photos.length === 0"
        src="@/assets/no-photo-available.jpeg"
      />
      <p class="description" v-html="pet.description"></p>
      <a class="btn btn-primary" target="_blank" v-bind:href="pet.url"
        >See PetFinder page</a
      >
      <div class="attributes">
        <p>Age: {{ pet.age }}</p>
        <p>Size: {{ pet.size }}</p>
        <p>House trained: {{ pet.attributes.house_trained ? "Yes" : "No" }}</p>
        <p>
          Shots are current: {{ pet.attributes.shots_current ? "Yes" : "No" }}
        </p>
        <p>
          Spayed/Neutered: {{ pet.attributes.spayed_neutered ? "Yes" : "No" }}
        </p>
        <p>Special Needs: {{ pet.attributes.special_needs ? "Yes" : "No" }}</p>
        <p>
          Breed:
          {{
            pet.breeds.mixed
              ? `Mix between ${pet.breeds.primary} and ${
                  pet.breeds.secondary || "?"
                }`
              : pet.breeds.primary
          }}
        </p>
        <p v-if="pet.coat">Coat: {{ pet.coat }}</p>
        <p v-if="pet.colors.primary">
          Colors: {{ pet.colors.primary }}
          <span v-if="pet.colors.secondary">({{ pet.colors.secondary }})</span>
        </p>
      </div>

      <div class="contact">
        <h4>Contact:</h4>
        <p>Country: {{ pet.contact.address.country }}</p>
        <p>
          Email:
          <a v-bind:href="`mailto:${pet.contact.email}`">
            {{ pet.contact.email }}</a
          >
        </p>
        <p v-if="pet.contact.phone">Phone number: {{ pet.contact.phone }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PetPage",
  computed: {
    loading() {
      return this.$store.state.pets.loading;
    },
    pet() {
      return this.$store.state.pets.pet;
    },
  },
  async mounted() {
    this.$store.dispatch("getPetInformation", { id: this.$route.params.id });
  },
};
</script>

<style scoped>
.pet-page {
  min-height: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
}

header {
  text-align: center;
  font-size: 16pt;
  margin-top: 16px;
}

header span {
  display: inline-block;
  margin-right: 8px;
}

.card {
  width: 60%;
  margin: 2em 1.5em;
}

@media only screen and (max-width: 860px) {
  .card {
    width: 90%;
    margin: 2em 1.5em;
  }
}

.card > *:not(:last-child) {
  margin-bottom: 3em;
}

.no-photo {
  display: block;
  margin: auto;
  width: 50%;
  filter: grayscale(80%);
}

img {
  display: block;
  margin: auto;
  max-width: 100%;
}

.attributes {
  font-size: small;
  margin-bottom: ;
}

.date {
  color: grey;
  text-align: center;
  font-size: 8pt;
}

.description {
  margin-top: 16px;
}
</style>