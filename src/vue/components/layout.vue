<template>
  <v-app>
    <v-layout wrap style="height: 200px;">
      <v-navigation-drawer
      fixed
      clipped
      v-model="drawer"
      app
      >
      <v-list class="pt-0" dense>
        <v-divider></v-divider>
        <v-list-tile v-for="item in items" :key="item.title" @click="" :to="item.href">
          <v-list-tile-content>
            <v-list-tile-title><v-icon>{{ item.icon }}</v-icon></v-list-tile-title>
            <v-list-tile-sub-title v-html="item.title"></v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar color="toolbar" app fixed clipped-left>
      <v-toolbar-side-icon @click.native="drawer = !drawer"></v-toolbar-side-icon>
      <span class="title ml-3 mr-5">
        <router-link :to="{ name: 'home'}">
          <img src="/../../static/img/logo.png" style="width: 175px" />
        </router-link>
      </span>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-content v-bind:class="screenSize">
      <v-container fluid fill-height>
        <v-layout justify-center>
          <v-flex class="main-flex">
            <router-view></router-view>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-layout>
</v-app>
</template>

<script>
export default {
  data () {
    return {
      drawer: null,
      items: [
        { title: 'Les films', icon: 'movie', href: '/' },
        { title: 'Ajouter un film', icon: 'add', href: '/add' }
      ]
    }
  },
  computed: {
    screenSize() {
      return this.$vuetify.breakpoint.mdAndDown ? 'movie-content-md' : 'movie-content';
    }
  }
}
</script>

<style lang="css">
.toolbar {
  color: #B41C3A;
}

.navigation-drawer {
  padding-bottom: 0;
  width: 200px;
}

.navigation-drawer--open ~ .movie-content{
  padding: 65px 0 0 140px;
}

.navigation-drawer__border {
  display: inline;
}

.list{
  height: 100%;
  padding-bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  align-content: center;

}

.navigation-drawer>.list .list__tile {
  height: 100%;
  width: 100%;
}

.list>div  {
  height: 100%;
  width: 100%;
  text-align: center;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
}

.list--dense .list__tile .icon {
  font-size: 65px;
}

.list__tile__title {
  text-align: center;
  font-weight: 400;
  height: auto;
}
.list__tile__sub-title {
  text-align: center;
  font-weight: 400;
}

.main-flex {
  padding-left: 100px;
}

.application.theme--light {
  background-color: white;
}
</style>
