<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="8" md="4">
      <v-card class="elevation-12">
        <v-toolbar color="primary" dark flat>
          <v-toolbar-title>Inicio de Sesión</v-toolbar-title>
          <div class="flex-grow-1"></div>
        </v-toolbar>
        <v-card-text>
          <v-form>
            <v-text-field name="nombres" label="nombres" v-model="user.first_name"></v-text-field>
            <v-text-field name="Apellidos" label="Apellidos" v-model="user.last_name"></v-text-field>
            <v-text-field
              label="email"
              name="email"
              prepend-icon="person"
              type="text"
              v-model="user.email"
            ></v-text-field>
            <v-text-field
              id="password"
              label="Password"
              name="password"
              prepend-icon="lock"
              type="password"
              v-model="user.password"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="primary" @click="register(user)">Registrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      user: {
        first_name: "",
        last_name: "",
        email: "",
        password: ""
      }
    };
  },
  methods: {
    register(user) {
      this.$store
        .dispatch("register", user)
        .then(res => {
          this.$store.dispatch("showSnackbar", {
            text: res,
            color: "success"
          });
          this.$router.push({ name: "dashboard" });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>