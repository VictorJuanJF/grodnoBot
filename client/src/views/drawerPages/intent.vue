<template>
  <v-container>
    <h1 class="display-3">Listado de intenciones de Charly Bot</h1>
    <v-row align="center">
      <v-col>
        <v-text-field label="Buscar intención" v-model="intentToFind"></v-text-field>
      </v-col>
    </v-row>
    <div class="pa-10">
      <v-simple-table>
        <thead>
          <tr>
            <th class="text-center">Nro</th>
            <th class="text-center">Intención</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(intent,i) in filteredIntents" :key="i">
            <td class="text-center title">{{i+1}}</td>
            <td class="text-center title">
              <router-link
                :to="{name:'updateIntent',params:{id:extractIntentId(intent.name)}}"
              >{{ intent.displayName }}</router-link>
            </td>
          </tr>
        </tbody>
      </v-simple-table>
    </div>
  </v-container>
</template>

<script>
import { extractIntentId } from "../../tools/extractIntentId";
export default {
  data() {
    return {
      intentToFind: ""
    };
  },
  computed: {
    intents() {
      return this.$store.state.intents.sort((a, b) => {
        var nameA = a.displayName.toUpperCase(); // ignore upper and lowercase
        var nameB = b.displayName.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
    },
    filteredIntents() {
      return this.intents.filter(intent =>
        intent.displayName
          .toLowerCase()
          .includes(this.intentToFind.toLowerCase())
      );
    }
  },
  methods: {
    extractIntentId(intentId) {
      return extractIntentId(intentId);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>