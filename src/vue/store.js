import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    movies:  []
  },
  mutations: {
    displayMovies: (state, movies) => {
      state.movies = movies
    },
    addMovie: (state, movie) => {
      state.movies.push(movie)
    },
    removeMovie: (state, id) =>{
      if(id !== -1)
      state.movies.splice(id,1);
    },
    editMovie: (state, movie) =>{
      if(state.movies.findIndex(m => m.id === movie.id) !== -1)
      state.movies.splice(state.movies.findIndex(m => m.id === movie.id),1, movie);
    },
    uploadPoster: (state, formData) =>{
      let index = state.movies.findIndex(m => m.id == formData.get("movieId"));
      if(index !== -1 && formData.get("file")) {
        let movie = state.movies[index];
        let extension = formData.get("file").name.split(".").reverse()[0];
        let filename = formData.get("file").name.split(".")[0] + "_" + movie.id + "." + extension;
        movie.poster_url = "/../../static/poster/" + filename;
      }
    },
  },
  actions: {
    displayMovies (context) {
      Axios.get('/api/movies')
      .then(response => {
        context.commit('displayMovies', response.data)
      })
    },
    addMovie (context, movie) {
      return new Promise((resolve, reject) => {
        Axios.post('/api/movie', movie)
        .then(response => {
          context.commit('addMovie', response.data);
          resolve(response.data);
        })
      });
    },
    removeMovie (context, id) {
      Axios.put('/api/movie/:id', {
        params: {
          id: id
        }
      })
      .then(response => {
        context.commit('removeMovie', id)
      })
    },
    editMovie (context, movie) {
      Axios.put('/api/movie/edit/:movie', movie)
      .then(response => {
        context.commit('editMovie', response.data)
      })
    },
    uploadPoster (context, formData) {
      Axios.post( '/api/upload',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    ).then(response => {
      context.commit('uploadPoster', formData)
    });
  }
},
getters: {
  getMovieById: (state) => (id) => {
    return state.movies.find(movie => movie.id === id)
  }
}

});

export default store;
