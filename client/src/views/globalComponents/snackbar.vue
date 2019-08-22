<template>
  <v-snackbar :color="snackbarColor" :timeout="3000" v-model="snackbar">
    {{ snackbarText }}
    <v-btn text @click="snackbar = false">Close</v-btn>
  </v-snackbar>
</template>

<script>
export default {
  computed: {
    snackbar: {
      get() {
        return this.$store.state.snackbar.active;
      },
      set(newValue) {
        this.$store.state.snackbar.active = newValue;
      }
    },
    snackbarText() {
      return this.$store.state.snackbar.text;
    },
    snackbarColor() {
      return this.$store.state.snackbar.color;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>