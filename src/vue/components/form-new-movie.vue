<template lang="html">
  <div class="form-add-content">
    <h1>Ajouter un film</h1>
    <hr>
    <v-form v-model="valid" ref="form" lazy-validation>
      <v-text-field
      label="Titre : "
      v-model="newFilm.nameFilm"
      :rules="requiredRule"
      required
      ></v-text-field>
      <v-text-field
      label="Année de sortie : "
      v-model="newFilm.anneeFilm"
      :rules="anneeRule"
      required
      ></v-text-field>
      <v-text-field
      label="Langue : "
      v-model="newFilm.langueFilm"
      :rules="requiredRule"
      required
      ></v-text-field>
      <v-text-field
      label="Nom du réalisteur : "
      v-model="newFilm.newReal.nomReal"
      :rules="requiredRule"
      required
      ></v-text-field>
      <v-text-field
      label="Nationalité du réalisteur : "
      v-model="newFilm.newReal.nationaliteReal"
      :rules="requiredRule"
      required
      ></v-text-field>
      <v-text-field
      label="Date de naissance du réalisteur : "
      v-model="newFilm.newReal.naissanceReal"
      :rules="naissanceRule"
      required
      ></v-text-field>
      <v-select
      label="Genre : "
      v-model="newFilm.genreFilm"
      :items="items"
      :rules="requiredRule"
      required
      ></v-select>
      <v-text-field
      name="synopsis"
      label="Synopsis"
      v-model="newFilm.synopsisFilm"
      textarea
      ></v-text-field>
      <div class="inline">
        Note :
        <star-rating
        :value="newFilm.note"
        v-model="newFilm.note"
        ></star-rating>
      </div>
      <div class="inline">
        Poster :
        <input name="file" type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
        <v-btn color="primary" class="black--text" @click="chooseFiles()"><v-icon>attach_file</v-icon></v-btn>
        <p><i id="fileName"></i></p>
      </div>
      <br>
      <v-btn
      @click="submit"
      :disabled="!valid"
      >
      Confirmer
    </v-btn>
  </v-form>
</div>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    file: "",
    newFilm : {
      nameFilm: '',
      anneeFilm: '',
      langueFilm: '',
      genreFilm: null,
      newReal : {
        nomReal: '',
        nationaliteReal: '',
        naissanceReal: '',
      },
      synopsisFilm: '',
      note : 1,
      affiche : "/../../static/poster/no_poster.jpg"
    },
    items: [
      'Action',
      'Aventure',
      'Fantastique',
      'Animation',
      'Comédie',
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
  }),

  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        if (this.newFilm.synopsisFilm.length === 0) {
          this.newFilm.synopsisFilm = "Aucun synopsis renseigné."
        }
        const movie = {
          title: this.newFilm.nameFilm,
          year: this.newFilm.anneeFilm,
          lang: this.newFilm.langueFilm,
          type: this.newFilm.genreFilm,
          desc: this.newFilm.synopsisFilm,
          note: this.newFilm.note,
          poster_url: this.newFilm.affiche,
        };

        movie.real = {
          name: this.newFilm.newReal.nomReal,
          nationality: this.newFilm.newReal.nationaliteReal,
          birth: this.newFilm.newReal.naissanceReal,
        };

        let formData = new FormData();
        formData.append('file', this.file);

        this.$store.dispatch('addMovie', movie).then(
          (movieWithId) => {
            console.log(movieWithId);
            formData.append('movieId', movieWithId.id);
            this.$store.dispatch('uploadPoster', formData).then(
              () =>
              this.$router.replace({path: '/'})
            )
          }
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
.form-add-content hr {
  margin-bottom: 25px;
}

.inline {
  display: inline;
}

.form-add-content input[type="file"] {
  display: none;
}
</style>
