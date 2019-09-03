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
      <v-progress-circular :size="70" :width="3" color="primary" indeterminate></v-progress-circular>
      <p class="ml-n3">{{overlayText}}</p>
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
    isDataReady: false,
    local: null
  }),
  mounted() {
    this.getInitialData();
    this.$store.dispatch("initialLoad");
  },
  methods: {
    getInitialData() {
      this.$store.dispatch("showOverlay", {
        active: true,
        text: "Cargando datos"
      });
      axios
        .get("/api/chatbot/agent/intents")
        .then(res => {
          if (res.data.ok) {
            this.$store.dispatch("setIntents", res.data.payload);
            this.isDataReady = true;
          } else {
            // error msg
            console.error(res.data);
          }
        })
        .catch(error => {
          if (error.code === "ECONNABORTED") {
            console.log("se excedio el tiempo limite");
            this.$store.dispatch("showSnackbar", {
              text: "Algo salió mal",
              color: "error"
            });
          } else {
            console.log(error);
            throw error;
          }
        })
        .finally(() => {
          this.$store.dispatch("showOverlay", {
            active: false,
            text: "Cargando datos"
          });
        });
    }
  },
  computed: {
    overlay() {
      return this.$store.state.overlay.active;
    },
    overlayText() {
      return this.$store.state.overlay.text;
    }
  }
};
</script>

<style>
#keep .v-navigation-drawer__border {
  display: none;
}
</style>