<template>
	<v-fade-transition>
		<v-card color="cards" class="black--text" :id="movie.id">
			<v-container fluid grid-list-lg>
				<v-layout>
					<v-flex xs5>
						<v-card-media
						v-bind:src="movie.poster_url"
						height="200px"
						contain
						></v-card-media>
					</v-flex>
					<v-flex xs7>
						<div>
							<div class="headline">{{ cutLongtext }}</div>
							<div>Année de sortie : {{ movie.year }} </div>
							<div>Genre : {{ movie.type }} </div>
							<div>Langue : {{ movie.lang }} </div>
							<div>Réalisé par :  {{ movie.real.name }} ({{movie.real.nationality}})</div>
							<star-rating :value="movie.note" :disabled="true"></star-rating>
						</div>
					</v-flex>
				</v-layout>
			</v-container>
			<v-card-actions>
				<v-flex xs12>
					<router-link :to="{ name: 'movie', params: { id: movie.id }}" tag="span"><v-btn flat>Détails</v-btn></router-link>
					<router-link :to="{ name: 'edit', params: { id: movie.id }}" tag="span"><v-btn flat>Modifier</v-btn></router-link>
					<v-btn flat color="red" v-on:click="deletemovie(movie)">Supprimer</v-btn>
					<v-btn icon @click.native="show = !show"><v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon></v-btn>
				</v-flex>
			</v-card-actions>
			<v-slide-y-transition>
				<v-card-text v-show="show">
					{{cutLongtDesc}}
				</v-card-text>
			</v-slide-y-transition>
		</v-card>
	</v-fade-transition>
</template>

<script>
export default {
	props: [ "movie" ],
	data: function(){
		return {
			show: false
		}
	},
	methods: {
		deletemovie: function(movie){
			this.$store.dispatch('removeMovie', this.$store.state.movies.findIndex(m => m.id === movie.id));
		},
	},
	computed : {
		cutLongtext() {
			if(this.movie.title !== undefined)
			return (this.movie.title.length >= 17)?this.movie.title.slice(0,16) + "...":this.movie.title;
			else
			return "Sans titre"
		},
		cutLongtDesc() {
			if(this.movie.desc !== undefined)
			return (this.movie.desc.length >= 100)?this.movie.desc.slice(0,99) + "...":this.movie.desc;
			else
			return "Aucune description"
		}
	}
}

</script>

<style scoped>
.card {
	margin:15px;
	width: 450px;
}

.card__actions .flex {
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
}
</style>
