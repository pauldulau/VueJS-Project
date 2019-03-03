import Vue from 'vue'
import app from './app.vue'
import Vuetify from 'vuetify'
import store from './store.js'
import router from './routes.js'
import Layout from './components/layout.vue'
import MovieItem from './components/movie-item.vue'
import StarRating from './components/star-rating.vue'

Vue.use(Vuetify, {
  theme: {
    toolbar: "#FECC00",
    primary: "#FECC00",
    cards: "#d4d4d4",
  }
});

Vue.component('layout',Layout);
Vue.component('movie-item',MovieItem);
Vue.component('star-rating', StarRating);

import 'vuetify/dist/vuetify.min.css'

new Vue({
  el: '#app',
  render: h => h(app),
  store,
  router:router
});
