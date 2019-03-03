<template>
  <v-flex>
    <h1>Liste des films</h1>
    <hr>
    <br/>
    <v-text-field
    solo-inverted
    flat
    label="Rechercher"
    prepend-icon="search"
    v-model="search"
    ></v-text-field>
    <div class="movies-list">
      <movie-item v-for="(movie, index) in movies_search" v-bind:movie="movie"></movie-item>
    </div>
  </v-flex>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      search: "",
    }
  },
  computed: mapState ({
    movies: function() {
      return this.$store.state.movies;
    },
    movies_search: function() {
      return this.movies.filter(m => m.title.toLowerCase().indexOf(this.search.toLowerCase())!==-1);
    }
  }),
  mounted: function() {
    this.$store.dispatch("displayMovies")
  }
}
</script>

<style lang="css">
.movies-list {
  display : flex;
  align-items : flex-start;
  flex-direction : row;
  flex-wrap : wrap;
}
</style>
