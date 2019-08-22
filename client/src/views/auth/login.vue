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
            <v-text-field v-model="user.email" label="email" prepend-icon="person" type="text"></v-text-field>

            <v-text-field
              label="Password"
              prepend-icon="lock"
              type="password"
              v-model="user.password"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="primary" @click="login(user)">Ingresar</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      user: { email: "", password: "" }
    };
  },
  methods: {
    login(user) {
      this.$store
        .dispatch("login", user)
        .then(res => {
          this.$store.dispatch("showSnackbar", {
            text: res,
            color: "success"
          });
          this.$router.push({ name: "dashboard" });
        })
        .catch(err => {
          this.$store.dispatch("showSnackbar", {
            text: "Usuario o contraseña incorrectos",
            color: "error"
          });
        });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>