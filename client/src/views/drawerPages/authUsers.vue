<template>
  <v-container>
    <h1>Listado de usuarios del sistema</h1>
    <v-data-table
      class="elevation-1"
      :loading="users.length==0"
      loading-text="Cargando usuarios"
      hide-default-footer
      :headers="headers"
      :items="users"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <div class="flex-grow-1"></div>
          <v-dialog persistent v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark class="mb-2" v-on="on">Crear usuario</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field v-model="editedItem.first_name" label="Nombres"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field v-model="editedItem.last_name" label="Apellidos"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field v-model="editedItem.email" label="Correo"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-select
                        :items="roles"
                        v-model="selectedRole"
                        item-text="name"
                        item-value="value"
                        label="Rol"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-select
                        :items="status"
                        v-model="selectedStatus"
                        item-text="name"
                        item-value="value"
                        label="Estado"
                      ></v-select>
                    </v-col>
                    <v-col v-if="editedIndex==-1" cols="12" sm="12" md="12">
                      <v-text-field
                        type="password"
                        v-model="editedItem.password"
                        label="Contraseña"
                      ></v-text-field>
                    </v-col>
                    <v-col v-else cols="12" sm="12">
                      <v-btn color="error" block @click.stop="dialog2=true">Nueva Contraseña</v-btn>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn color="error" text @click="close">Cancelar</v-btn>
                <v-btn color="success" @click="save">Guardar</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.status="{item}">
        <v-chip v-show="item.status==1" color="success">Activo</v-chip>
        <v-chip v-show="item.status==0" color="error">No Activo</v-chip>
      </template>
      <template v-slot:item.action="{ item }">
        <v-icon color="primary" small class="mr-2" @click="editItem(item)">edit</v-icon>
        <v-icon color="error" small @click="deleteItem(item)">delete</v-icon>
      </template>
    </v-data-table>
    <v-dialog v-model="dialog2" width="400">
      <v-card>
        <v-toolbar color="primary" dark>Confirma tu contraseña de SUPERADMINISTRADOR</v-toolbar>
        <v-container>
          <v-text-field v-model="superAdminPassword" type="password"></v-text-field>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            :loading="loadingButton"
            color="primary"
            @click="verifySuperAdminPassword(superAdminPassword)"
          >Confirmar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog3" width="400">
      <v-card>
        <v-toolbar color="primary" dark>Nueva contraseña</v-toolbar>
        <v-container>
          <v-text-field v-model="newUserPassword" type="password"></v-text-field>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" @click="updatePassword(editedItem.email,newUserPassword)">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      roles: [
        { id: 1, name: "ADMIN", value: 1 },
        { id: 2, name: "SUPERADMIN", value: 2 }
      ],
      selectedRole: 1,
      status: [
        { id: 1, name: "ACTIVO", value: 1 },
        { id: 2, name: "NO ACTIVO", value: 0 }
      ],
      selectedStatus: 1,
      newUserPassword: "",
      superAdminPassword: "",
      dialog3: false,
      dialog2: false,
      dialog: false,
      headers: [
        {
          text: "Nombres",
          align: "left",
          sortable: false,
          value: "first_name"
        },
        { text: "Apellidos", value: "last_name" },
        { text: "Correo", value: "email" },
        { text: "Rol", value: "role" },
        { text: "Estado", value: "status" },
        { text: "Acciones", value: "action", sortable: false }
      ],
      users: [],
      editedIndex: -1,
      editedItem: {
        first_name: "",
        last_name: "",
        email: "",
        role: "",
        status: "",
        password: ""
      },
      defaultItem: {
        first_name: "",
        last_name: "",
        email: "",
        role: "",
        status: "",
        password: ""
      },
      loadingButton: false
    };
  },
  beforeMount() {
    this.getInitialData();
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nuevo usuario" : "Editar usuario";
    }
  },
  methods: {
    verifySuperAdminPassword(password) {
      this.loadingButton = true;
      axios
        .post("/api/users/confirm-password", {
          email: this.$store.state.user.email,
          password: password
        })
        .then(res => {
          console.log(res);
          if (res.data.ok) {
            this.dialog2 = false;
            this.dialog3 = true;
          }
        })
        .catch(err => {
          console.error(err);
          this.$store.dispatch("showSnackbar", {
            text: err.response.data.err.message,
            color: "error"
          });
        })
        .finally(() => {
          this.loadingButton = false;
        });
    },
    updatePassword(email, password) {
      //   console.log("se actualizara la nueva contrasena con: ", email, password);
      axios
        .post("/api/user/update-password", { email, newPassword: password })
        .then(res => {
          console.log(res.data);
          if (res.data.ok) {
            this.$store.dispatch("showSnackbar", {
              text: res.data.message,
              color: "success"
            });
            this.dialog3 = false;
            this.newUserPassword = "";
            this.superAdminPassword = "";
          }
        })
        .catch(err => {
          console.error(err);
          this.$store.dispatch("showSnackbar", {
            text: err.response.data.err.message,
            color: "error"
          });
        });
    },
    getInitialData() {
      axios
        .get("/api/auth-users/list")
        .then(res => {
          console.log(res.data);
          this.users = res.data.payload;
        })
        .catch(err => {
          console.error(err);
        });
    },
    editItem(item) {
      console.log("llego este item: ", item);
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.selectedRole = parseInt(item.role);
      this.selectedStatus = parseInt(item.status);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.users.indexOf(item);
      console.log("se eliminara el usuario: ", item);
      if (confirm("¿Seguro que deseas eliminar este usuario?")) {
        axios
          .post("/api/auth-users/delete", {
            email: item.email
          })
          .then(res => {
            if (res.data.ok) {
              this.$store.dispatch("showSnackbar", {
                text: res.data.message,
                color: "success"
              });
              this.users[index].status = 0;
            }
          })
          .catch(err => {
            console.error(err);
          });
      }
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        axios
          .put("/api/auth-users/update", {
            first_name: this.editedItem.first_name,
            last_name: this.editedItem.last_name,
            email: this.editedItem.email,
            role: this.selectedRole,
            status: this.selectedStatus
          })
          .then(res => {
            if (res.data.ok) {
              this.$store.dispatch("showSnackbar", {
                text: res.data.message,
                color: "success"
              });
              Object.assign(this.users[this.editedIndex], this.editedItem);
              this.users[this.editedIndex].status = this.selectedStatus;
              this.users[this.editedIndex].role = this.selectedRole;
              this.close();
            }
          })
          .catch(err => {
            console.error(err);
          });
      } else {
        axios
          .post("/api/register", {
            first_name: this.editedItem.first_name,
            last_name: this.editedItem.last_name,
            email: this.editedItem.email,
            password: this.editedItem.password,
            role: this.selectedRole,
            status: this.selectedStatus
          })
          .then(res => {
            if (res.data.ok) {
              this.$store.dispatch("showSnackbar", {
                text: res.data.message,
                color: "success"
              });
              this.users.push(this.editedItem);
              this.close();
            }
          })
          .catch(err => {
            console.error(err);
          });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>