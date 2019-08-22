<template>
  <div>
    <strong>Rich message de tipo: quick reply</strong>
    <br />
    <v-dialog v-model="dialog" width="800">
      <template v-slot:activator="{ on:dialog }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on: tooltip }">
            <v-btn color="primary" dark v-on="{ ...tooltip, ...dialog }">Editar</v-btn>
          </template>
          <span>Editar quick reply</span>
        </v-tooltip>
      </template>
      <v-card>
        <v-toolbar color="primary" dark>
          <v-toolbar-title>Mensaje tipo Quick Reply</v-toolbar-title>
        </v-toolbar>
        <v-container class="pa-5">
          <p>Mensaje que acompaña al quick reply (obligatorio)</p>
          <v-text-field outlined v-model="quickReplies.text"></v-text-field>
          <v-row v-for="(quickReply,quickIndex) in quickReplies.quick_replies" :key="quickIndex">
            <v-col cols="12" sm="6">
              <v-text-field
                :label="'Texto del quick reply '+(quickIndex+1) "
                v-model="quickReply.title"
              ></v-text-field>
              <v-text-field
                label="Mensaje de emparejamiento (para DialogFlow) "
                v-model="quickReply.payload"
              ></v-text-field>
              <v-text-field label="URL de la imagen" v-model="quickReply.image_url"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-card outlined class="pa-5">
                <strong>Vista previa</strong>
                <br />
                <v-btn outlined text color="primary">{{quickReply.title}}</v-btn>
              </v-card>
              <v-btn small color="error">Eliminar</v-btn>
            </v-col>
            <div class="bottonLine"></div>
          </v-row>
        </v-container>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="addQuickReply">Agregar quick reply (max 15)</v-btn>
          <v-btn color="success" @click="dialog = false;saveQuickReply();">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-row justify="center">
      <v-col sm="6">
        <v-card outlined class="pa-5">
          <strong>Vista previa del rich message:</strong>
          <v-divider></v-divider>
          <p>{{quickReplies.text}}</p>
          <v-btn
            v-for="(quickReply,quickIndex) in quickReplies.quick_replies"
            :key="quickIndex"
            text
            outlined
            color="primary"
          >{{quickReply.title}}</v-btn>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: ["data", "index"],
  data() {
    return {
      dialog: false,
      quickReplies: this.data.facebook
    };
  },
  methods: {
    addQuickReply() {
      this.quickReplies.quick_replies.push({
        image_url: "",
        content_type: "text",
        title: "ejemplo",
        payload: "ejemplo_payload"
      });
    },
    saveQuickReply() {
      let newData = this.data;
      newData.facebook = this.quickReplies;
      this.$emit("onSaveQuickReply", newData, this.index);
    }
  }
};
</script>

<style lang="scss" scoped>
.bottonLine {
  width: 90%;
  margin: 0 auto;
  border-bottom: 1px solid #000;
}
</style>