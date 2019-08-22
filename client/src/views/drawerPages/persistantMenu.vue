<template>
  <v-container>
    <v-row align="center">
      <h1 class="display-3">Menú persistente</h1>
      <v-btn class="ml-5" color="primary" @click="addOption">Añadir Opción</v-btn>
    </v-row>
    <v-card class="mb-5 pa-5" outlined v-for="(option,optionIndex) in options" :key="optionIndex">
      <v-row justify="space-between">
        <strong class="title">Configuración del botón {{optionIndex+1}}</strong>
        <v-btn color="error" @click="deleteOption(optionIndex)">Eliminar</v-btn>
      </v-row>
      <v-row>
        <v-col>
          <p class="subtitle-1">Tipo:</p>
          <v-radio-group
            @change="changeButtonType(options,optionIndex,option.type)"
            class="ma-0 ml-5"
            row
            v-model="option.type"
          >
            <v-radio label="POSTBACK" value="postback"></v-radio>
            <v-radio label="ENLACE WEB" value="web_url"></v-radio>
          </v-radio-group>
        </v-col>
      </v-row>
      <v-text-field outlined clearable label="Nombre del botón" v-model="option.title"></v-text-field>
      <v-text-field
        v-if="option.type=='postback'"
        outlined
        clearable
        label="Mensaje de emparejamiento (para DialogFlow)"
        v-model="option.payload"
      ></v-text-field>
      <v-text-field v-else outlined clearable label="Dirección URL" v-model="option.url"></v-text-field>
    </v-card>
    <v-btn color="success" @click="setPersistantMenu(options)">Guardar</v-btn>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      options: []
    };
  },
  mounted() {
    this.getInitialData();
  },
  methods: {
    setPersistantMenu(options) {
      this.$store.dispatch("showOverlay", {
        active: true,
        text: "Actualizando"
      });
      axios
        .post("/api/chatbot/agent/persistantmenu", { buttons: options })
        .then(res => {
          if (res.data.ok) {
            this.$store.dispatch("showOverlay", {
              active: false,
              text: ""
            });
            this.$store.dispatch("showSnackbar", {
              text: res.data.message,
              color: "success"
            });
          }
        })
        .catch(err => {
          console.error(err);
        })
        .finally(() => {
          this.$store.dispatch("showOverlay", {
            active: false,
            text: "Actualizando"
          });
        });
    },
    getInitialData() {
      axios
        .get("/api/chatbot/agent/persistantmenu/list")
        .then(res => {
          console.log(res);
          if (res.data.ok) {
            this.options = res.data.payload;
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    changeButtonType(options, optionIndex, type) {
      if (type == "postback") {
        options.splice(optionIndex, 1, {
          payload: "",
          type: "postback",
          title: options[optionIndex].title
        });
      }
      if (type == "web_url") {
        options.splice(optionIndex, 1, {
          type: "web_url",
          url: "",
          title: options[optionIndex].title
        });
      }
    },
    addOption() {
      this.options.push({
        title: "Boton de ejemplo",
        type: "web_url",
        url: "https://developers.facebook.com"
      });
    },
    deleteOption(index) {
      this.options.splice(index, 1);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>