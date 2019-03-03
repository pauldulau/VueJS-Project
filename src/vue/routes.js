import Vue from 'vue'
import VueRouter from 'vue-router'
import moviesList from './components/movies-list.vue'
import formMovie from './components/form-new-movie.vue'
import movieDetail from './components/movie-detail.vue'
import editMovie from './components/form-edit-movie.vue'

Vue.use(VueRouter);


const routes = [
  { path: '/', name:'home', component: moviesList  },
  { path: '/add', name:'add', component: formMovie },
  { path: '/movie/:id', name:'movie', component: movieDetail },
  { path: '/movie/:id/edit', name:'edit', component: editMovie }
];

export default new VueRouter({
  routes ,
});
