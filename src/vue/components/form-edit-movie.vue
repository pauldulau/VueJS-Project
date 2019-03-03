<template lang="html">
  <div class="form-edit-content">
    <h1>Modifier un film</h1>
    <hr>
    <v-form v-model="valid" ref="form" lazy-validation>
      <v-text-field
      label="Titre : "
      v-model="movie.title"
      :rules="requiredRule"
      required
      ></v-text-field>
      <v-text-field
      name="synopsis"
      label="Synopsis"
      v-model="movie.desc"
      textarea
      ></v-text-field>
      <v-text-field
      label="Langue : "
      v-model="movie.lang"
      :rules="requiredRule"
      required
      ></v-text-field>
      <v-text-field
      label="Année de sortie : "
      v-model="movie.year"
      :rules="anneeRule"
      required
      ></v-text-field>
      <v-text-field
      label="Nom du réalisteur : "
      v-model="movie.real.name"
      :rules="requiredRule"
      required
      ></v-text-field>
      <v-text-field
      label="Date de naissance du réalisteur : "
      v-model="movie.real.birth"
      :rules="naissanceRule"
      required
      ></v-text-field>
      <v-text-field
      label="Nationalité du réalisteur : "
      v-model="movie.real.nationality"
      :rules="requiredRule"
      required
      ></v-text-field>
      <v-select
      label="Genre : "
      v-model="movie.type"
      :items="items"
      :rules="requiredRule"
      required
      ></v-select>
      <div class="inline">
        Note :
        <star-rating
        :value="movie.note"
        v-model="movie.note"
        ></star-rating>
      </div>
      <div class="inline">
        Poster :
        <v-btn color="primary" class="black--text" @click="chooseFiles()"><v-icon>attach_file</v-icon></v-btn>
        <input name="file" type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
        <p><i id="fileName"></i></p>
      </div>
      <br>
      <v-btn
      @click="submit"
      :disabled="!valid"
      >
      Valider
    </v-btn>
  </v-form>
</div>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
      file: "",
      valid: true,
      items: [
        'Action',
        'Aventure',
        'Biographie',
        'Fantastique',
        'Animation',
        'Comédie',
        'Drame',
      ],
      requiredRule: [
        v => !!v || "Champs obligatoire",
      ],
      naissanceRule: [
        v => !!v || 'Format de date = jj/mm/aaaa',
        v => /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/.test(v) || 'Format de date différent de jj/mm/aaaa'
      ],
      anneeRule: [
        v => !!v || "L'annee comporte 4 chiffres",
        v => /[0-9]{4}/.test(v) || "L'annee comporte 4 chiffres"
      ],
    }
  },

  computed: {
    movie: function() {
      return this.$store.getters.getMovieById(this.id)
    }
  },

  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        if (this.movie.desc.length === 0) {
          this.movie.desc = "Pas de synopsis disponible"
        }
        const movie = {
          id: this.movie.id,
          title: this.movie.title,
          year: this.movie.year,
          lang: this.movie.lang,
          type: this.movie.type,
          desc: this.movie.desc,
          note: this.movie.note,
          poster_url: this.movie.poster_url,
        };

        movie.real = {
          name: this.movie.real.name,
          nationality: this.movie.real.nationality,
          birth: this.movie.real.birth,
        };

        let formData = new FormData();
        formData.append('file', this.file);
        formData.append('movieId', movie.id);

        this.$store.dispatch('editMovie', movie).then(
          () =>
          this.$store.dispatch('uploadPoster', formData).then(
            () =>
            this.$router.replace({path: '/'})
          )
        );
      }
    },
    handleFileUpload(){
      this.file = this.$refs.file.files[0];
      let fileName = (this.file)?this.file.name:"";
      document.getElementById("fileName").innerText = fileName;
    },
    chooseFiles() {
      document.getElementById("file").click();
    },
  }
}
</script>

<style lang="css">
.form-edit-content hr {
  margin-bottom: 25px;
}

.inline {
  display: inline;
}

.form-edit-content input[type="file"] {
  display: none;
}
</style>
