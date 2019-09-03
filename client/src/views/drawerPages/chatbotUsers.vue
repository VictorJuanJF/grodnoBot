<template>
  <v-container>
    <h1>Usuarios de Charly Bot</h1>
    <v-data-table
      :headers="headers"
      :items="users"
      :items-per-page="10"
      class="elevation-1"
      :loading="users.length==0"
      loading-text="Cargando usuarios del chatbot"
    >
      <template v-slot:item.estado_politicas_privacidad="{item}">
        <v-chip v-if="item.estado_politicas_privacidad" color="success">Aceptó</v-chip>
        <v-chip v-else color="error">No aceptó</v-chip>
      </template>
      <template v-slot:item.hoja_informativa="{item}">
        <p v-if="!item.hoja_informativa">Por definir</p>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        {
          text: "Nombres",
          align: "left",
          value: "first_name"
        },
        { text: "Apellidos", value: "last_name" },
        { text: "ID de Facebook", value: "fb_id" },
        { text: "Fecha de Registro", value: "date" },
        {
          text: "Estado de políticas de privacidad",
          value: "estado_politicas_privacidad"
        },
        { text: "Hoja informativa", value: "hoja_informativa" }
      ],
      users: []
    };
  },
  beforeMount() {
    this.getInitialData();
  },
  methods: {
    getInitialData() {
      axios
        .get("/api/chatbot/users/list")
        .then(res => {
          if (res.data.ok) {
            console.log(res.data.payload);
            this.users = res.data.payload;
          }
        })
        .catch(err => {
          console.error(err);
        });
    }
  }
};
</script>
</script>

<style lang="scss" scoped>
</style>