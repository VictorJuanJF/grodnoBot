<template>
  <v-app id="keep">
    <v-app-bar dark app clipped-left color="#1867C0">
      <span class="title ml-3 mr-5">
        <span class="font-weight-light">Charlie Bot</span>
      </span>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-content v-if="isDataReady">
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import axios from "axios";
export default {
  props: {
    source: String
  },
  data: () => ({
    drawer: null,
    items: [
      { icon: "lightbulb_outline", text: "Intenciones", to: "intent" }
      // { icon: "touch_app", text: "Notas bruses 2", to: "brusesNotes2" },
    ],
    isDataReady: false
  }),
  beforeMount() {
    this.getInitialData();
  },
  methods: {
    getInitialData() {
      axios
        .get("/api/chatbot/agent/intents")
        .then(res => {
          if (res.data.ok) {
            console.log(res.data);
            console.log("datos conseguidos:");
            this.$store.dispatch("setIntents", res.data.payload);
            this.isDataReady = true;
          } else {
            // error msg
            console.error(res.data);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style>
#keep .v-navigation-drawer__border {
  display: none;
}
</style>