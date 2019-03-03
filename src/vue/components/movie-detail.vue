<template lang="html">
	<div class="movie-detail-content">
		<h1>{{movie.title}}</h1>
		<hr>
		<v-container fluid grid-list-md>
			<v-layout row wrap justify-space-around>
				<v-flex md3>
					<v-card class="details">
						<img class="affiche" :src="movie.poster_url" alt="affiche">
					</v-card>
				</v-flex>
				<v-flex md9>
					<v-layout row wrap>
						<v-card class="details">
							<v-card-text>
								<div class="infos">
									<span class="intitule">Année de sortie : </span>{{movie.year}}<br/>
									<span class="intitule">Langue : </span>{{movie.lang}}<br/>
									<span class="intitule">Réalisateur : </span>{{movie.real.name}}<br/>
									<span class="intitule">Nationalité du réalisateur : </span>{{movie.real.nationality}}<br/>
									<span class="intitule">Date de naissance du réalisateur : </span>{{movie.real.birth}}<br/>
									<span class="intitule">Genre : </span>{{movie.type}}<br/>
								</div>
								<div class="actions">
									<star-rating :value="movie.note" :disabled="true"></star-rating>
									<v-btn	color="primary"
									class="black--text"
									v-on:click="editmovie(movie)">
									Modifier
									<v-icon right dark>edit</v-icon>
								</v-btn>
								<v-btn	color="red darken-4"
								class="white--text"
								v-on:click="deletemovie(movie)">
								Supprimer
								<v-icon right dark>delete</v-icon>
							</v-btn>
						</div>
					</v-card-text>
				</v-card>
			</v-layout>
		</v-flex>
	</v-layout>
	<v-layout row class="synopsis">
		<v-flex>
			<h2>SYNOPSIS :</h2>
			<p>{{movie.desc}}</p>
		</v-flex>
	</v-layout>
</v-container>
</div>
</template>

<script>
export default {
	data() {
		return {
			'id' : this.$route.params.id
		}
	},
	computed: {
		movie: function() {
			return this.$store.getters.getMovieById(this.id)
		}
	},
	methods:{
		deletemovie: function(movie){
			this.$store.dispatch('removeMovie', this.$store.state.movies.findIndex(m => m.id === movie.id)).then(
				() =>
				this.$router.replace({ path: '/' })
			);
		},
		editmovie: function(){
			this.$router.push({ name: 'edit', params: { id: this.id }});
		}
	}

}
</script>

<style lang="css">
h1 {
	text-transform: uppercase;
}

.intitule {
	color: #545454;
}

.card.details {
	box-shadow: none;
}

.actions {
	margin-top: 30px;
}

.synopsis {
	margin-top: 45px;
}

.details .affiche {
	max-width: 100%;
	max-width: -moz-available;
	max-width: -webkit-fill-available;
	max-width: fill-available;
}
</style>
