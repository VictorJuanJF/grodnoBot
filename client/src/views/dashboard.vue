<template>
  <v-app id="keep">
    <toolbar />
    <drawer />
    <v-content v-if="isDataReady">
      <v-fade-transition mode="out-in">
        <router-view></router-view>
      </v-fade-transition>
    </v-content>
    <v-overlay :value="overlay">
      <v-progress-circular :size="70" :width="3" color="purple" indeterminate></v-progress-circular>
    </v-overlay>
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
  mounted() {
    this.getInitialData();
    this.$store.dispatch("initialLoad");
  },
  methods: {
    getInitialData() {
      this.$store.dispatch("showOverlay", true);
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
        })
        .finally(() => {
          this.$store.dispatch("showOverlay", false);
        });
    }
  },
  computed: {
    overlay() {
      return this.$store.state.overlay;
    }
  }
};
</script>

<style>
#keep .v-navigation-drawer__border {
  display: none;
}
</style>