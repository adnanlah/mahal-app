<template>
  <div id="modal-template">
    <form @submit.prevent="onSubmit">
      <div class="modal-card" style="width: auto">
          <header class="modal-card-head">
              <p v-if="isUpdate" class="modal-card-title">Modifier un produit</p>
              <p v-else class="modal-card-title">Ajouter un produit</p>
          </header>
          <section class="modal-card-body">
              <b-field label="Nom du produit">
                  <b-input
                      v-model="productData.name"
                      placeholder="Piece, Kit.."
                      required>
                  </b-input>
              </b-field>
              <b-field label="Description">
                  <b-input
                      v-model="productData.description"
                      placeholder="P012569"
                      required>
                  </b-input>
              </b-field>
              <b-field label="Prix de vente">
                  <b-input v-model.number="productData.selling_price" required>
                  </b-input>
              </b-field>

              <b-field label="Choisi la categorie">
                <b-field>
                  <b-select placeholder="Categorie" expanded required v-model="productData.ProductCategoryID">
                    <option v-for="(pc, idx) in productCategories" :key="idx" :value="pc.ID">{{pc.name}}</option>
                  </b-select>
                  <p class="control">
                    <b-button class="button is-success" icon-left="plus" @click="activeNew"></b-button>
                  </p>
                  <p class="control">
                    <b-button class="button is-info" icon-left="pencil" @click="activateUpdate"></b-button>
                  </p>
                  <p class="control">
                    <b-button class="button is-danger" icon-left="delete" @click="onDeleteCat"></b-button>
                  </p>
                </b-field>
              </b-field>

              <b-field label="Ajouter une categorie" v-if="showNewCat">
                <b-field>
                  <b-input v-model="newCategoryData.name" placeholder="Le nom de la categorie" expanded required>
                  </b-input>
                  <p class="control">
                    <b-button class="button is-success" icon-left="check" @click="onCreateCat"></b-button>
                  </p>
                  <p class="control">
                    <b-button class="button is-danger" icon-left="close" @click="showNewCat = false"></b-button>
                  </p>
                </b-field>
              </b-field>

              <b-field label="Modifier la categorie" v-if="showUpdateCat">
                <b-field>
                  <b-input v-model="updateCategoryData.name" expanded required>
                  </b-input>
                  <p class="control">
                    <b-button class="button is-success" icon-left="check" @click="onUpdateCat"></b-button>
                  </p>
                  <p class="control">
                    <b-button class="button is-danger" icon-left="close" @click="showUpdateCat = false"></b-button>
                  </p>
                </b-field>
              </b-field>

              <div v-if="message">{{message}}</div>

          </section>
          <footer class="modal-card-foot">
              <button class="button" type="button" @click="$parent.close(); $parent.$parent.clearData()">Fermer</button>
              <template v-if="isUpdate">
                <button class="button is-danger" @click="action = 'delete'">Supprimer</button>
                <button class="button is-primary" @click="action = 'update'">Modifier</button>
              </template>
              <template v-else>
                <button class="button is-success" @click="action = 'add'">Ajouter</button>
              </template>
          </footer>
      </div>

    </form>
  </div>
</template>

<script>
ipcRenderer.on('product_message', (result) => {
  if (result.success) {
      this.productData = {};
      this.$buefy.toast.open({
        message: result.message,
        type: 'is-success'
      })
  } else {
    this.$buefy.toast.open({
      duration: 10000,
      message: result.message,
      position: 'is-top',
      type: 'is-danger'
    })
  }
})
import {ipcRenderer} from 'electron';
  export default {
    name: 'ProductModalForm',
    components: {
    },
    props: [
      'data'
    ],
    data() {
      return {
        productData: {
          name: '',
          description: '',
          selling_price: 0,
          ProductCategoryID: '',
        },
        newCategoryData: {
          name: ''
        },
        updateCategoryData: {
          ID: '',
          name: ''
        },
        showNewCat: false,
        showUpdateCat: false,
        message: ''
      }
    },
    computed: {
      productCategories() {
        return this.$store.getters.CATEGORIES;
      },
      isUpdate() {
        return this.data ? true : false;
      }
    },
    watch: {
      showUpdateCat:  function (newValue) {
        if (newValue) {
          if (this.productData.ProductCategoryID > 0) {
            this.updateCategoryData.ID = this.productData.ProductCategoryID;
            this.updateCategoryData.name =this.productCategories.filter(pc => pc.ID == this.productData.ProductCategoryID)[0].name;
          } else {
            this.showUpdateCat = false;
            this.message = 'SVP! Choisi une categorie'
          }

        }
      },
      'productData.ProductCategoryID': function(newValue) {
        if (newValue > 0)
          this.message = '';
      }
    },
    mounted() {
      if (this.data) {
        this.productData = this.data;
      }
    },
    methods: {
      activateUpdate() {
        if (this.productData.ProductCategoryID > 0) {
          this.showNewCat = false;
          this.showUpdateCat = true;
          this.updateCategoryData.ID = this.productData.ProductCategoryID;
          this.updateCategoryData.name =this.productCategories.filter(pc => pc.ID == this.productData.ProductCategoryID)[0].name;
        } else {
          this.showUpdateCat = false;
          this.showNewCat = false;
          this.message = 'SVP! Choisi une categorie'
        }
      },
      activeNew() {
        this.showNewCat = true;
        this.showUpdateCat = false;
        this.message = ''
      },

      onSubmit() {
        if (this.action == 'delete') {
          this.onDeleteProd()
        } else if (this.action == 'update') {
          this.onUpdateProd()
        } else if (this.action == 'add') {
          this.onCreateProd();
        }
      },

      // Product CRUD
      onCreateProd() {
        ipcRenderer.send('create_product', this.productData);
        
      },
      onUpdateProd() {
        ipcRenderer.send('update_product', this.productData);
        
      },
      onDeleteProd() {
        ipcRenderer.send('delete_product', this.productData.ID);
        
      },

      // Category CRUD
      onCreateCat() {
        this.$store.dispatch("SAVE_CATEGORY", this.newCategoryData)
          .then((newPC) => {
            this.showNewCat = false;
            this.productData.ProductCategoryID = newPC.ID;
              this.$buefy.toast.open({
                  message: 'Categorie bien ajouté!',
                  type: 'is-success'
                })
            })
          .catch(e => {
            this.$buefy.toast.open({
              duration: 10000,
              message: `Categorie pas bien ajouté!  + ${e.message}`,
              position: 'is-top',
              type: 'is-danger'
            })
          })
      },
      onUpdateCat() {
        this.$store.dispatch("UPDATE_CATEGORY", this.updateCategoryData)
        .then(() => {
          this.showUpdateCat = false;
            this.$buefy.toast.open({
                message: 'Categorie bien modifié!',
                type: 'is-success'
              })
            })
          .catch(e => {
            this.$buefy.toast.open({
              duration: 10000,
              message: `Categorie pas bien modifié!  + ${e.message}`,
              position: 'is-top',
              type: 'is-danger'
            })
          })
      },
      onDeleteCat() {
        this.$store.dispatch("DELETE_CATEGORY", this.productData.ProductCategoryID)
        .then(() => {
            this.productData.ProductCategoryID = null;
              this.$buefy.toast.open({
                  message: 'Categorie bien supprimé!',
                  type: 'is-success'
                })
            })
          .catch(e => {
            this.$buefy.toast.open({
              duration: 10000,
              message: `Categorie pas bien supprimé!  + ${e.message}`,
              position: 'is-top',
              type: 'is-danger'
            })
          })
      }

    }
  };
</script>

<style scoped>
  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .3s ease;
  }

  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  .modal-container {
    width: 300px;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: Helvetica, Arial, sans-serif;
  }

  .modal-header h3 {
    margin-top: 0;
    color: #42b983;
  }

  .modal-body {
    margin: 20px 0;
  }

  .modal-default-button {
    float: right;
  }

  /*
   * The following styles are auto-applied to elements with
   * transition="modal" when their visibility is toggled
   * by Vue.js.
   *
   * You can easily play with the modal transition by updateing
   * these styles.
   */

  .modal-enter {
    opacity: 0;
  }

  .modal-leave-active {
    opacity: 0;
  }

  .modal-enter .modal-container,
  .modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }

</style>