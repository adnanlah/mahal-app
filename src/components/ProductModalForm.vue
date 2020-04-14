<template>
  <div id="product-modal">
    <form @submit.prevent="onSubmit">
      <div class="modal-card" style="width: auto">
          <header class="modal-card-head">
              <p v-if="isUpdate" class="modal-card-title">Modifier un produit</p>
              <p v-else class="modal-card-title">Ajouter un produit</p>
          </header>
          <section class="modal-card-body">
            <div>
              <b-field label="Code (unique)">
                  <b-input
                    disabled
                    v-model="formattedID">
                  </b-input>
              </b-field>
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
              <b-field label="La marque">
                <b-input
                    v-model="productData.brand"
                    placeholder="P012569"
                    required>
                </b-input>
              </b-field>
              <b-field label="Prix de vente">
                <b-input v-model.number="productData.selling_price" required>
                  </b-input>
              </b-field>
              <b-field label="Ajouter une image">
                <b-field class="file">
                    <b-upload v-model="productData.imageFile" @input="onFileChange">
                        <a class="button is-link">
                            <b-icon icon="upload"></b-icon>
                            <span>Upload</span>
                        </a>
                    </b-upload>
                    <b-button type="is-danger" icon-right="autorenew" @click="productData.imageFile = null"/>
                    <span class="file-name" v-if="productData.imageFile">
                        {{ productData.imageFile.name }}
                    </span>
                </b-field>
              </b-field>
              <b-field v-if="isUpdate" label="Prix d'achat moyen">
                  <b-input disabled v-model.number="productData.average_purchase_price" required>
                  </b-input>
              </b-field>
              <b-field v-if="isUpdate" label="Quantité">
                  <b-input disabled v-model.number="productData.quantity" required>
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

            <div class="image" v-if="productData.image_path">
              <img :src="productData.image_path" alt="Pas d'image">
            </div>
          </div> <!-- end of div.form -->
          </section>
          <footer class="modal-card-foot">
              <button class="button" type="button" @click="$parent.close()">Fermer</button>
              <template v-if="isUpdate">
                <button class="button is-danger" @click="action = 'delete'" :loading="isLoading">Supprimer</button>
                <button class="button is-primary" @click="action = 'update'" :loading="isLoading">Modifier</button>
              </template>
              <template v-else>
                <button class="button is-success" @click="action = 'add'" :loading="isLoading">Ajouter</button>
              </template>
          </footer>
      </div>

    </form>
  </div>
</template>

<script>
import {ipcRenderer} from 'electron';
  export default {
    name: 'ProductModalForm',
    components: {
    },
    props: {
      data: {
        required: false
      }
    },
    data() {
      return {
        productData: {
          name: '',
          ID: '',
          description: '',
          selling_price: 0,
          ProductCategoryID: '',
          imageFile: null,
          image_path: '',
        },
        newCategoryData: {
          name: ''
        },
        updateCategoryData: {
          ID: '',
          name: ''
        },
        nextID: '',
        isLoading: true,
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
      },
      dirDocFiles() {
        return this.$store.getters.CONFIG.dirDocFiles;
      },
      formattedID() {
        if (this.isUpdate) 
          return this.pad(this.productData.ID, 4)
        else
          return this.pad(this.nextID, 4)
      }
    },
    watch: {
      showUpdateCat: function (newValue) {
        if (newValue) {
          if (this.productData.ProductCategoryID > 0) {
            this.updateCategoryData.ID = this.productData.ProductCategoryID;
            this.updateCategoryData.name = this.productCategories.filter(pc => pc.ID == this.productData.ProductCategoryID)[0].name;
          } else {
            this.showUpdateCat = false;
            this.message = 'SVP! Choisi une categorie'
          }

        }
      },
      'productData.ProductCategoryID': function(newValue) {
        if (newValue > 0)
          this.message = '';
      },
    },
    mounted() {
      if (this.data) {
        this.productData = this.data;
      }
      if (!this.isUpdate) {
        ipcRenderer.send('get_next_product_id')
        ipcRenderer.on('next_product_id', (event, id) => {
          this.nextID = id;
        })
      }
    },
    methods: {
      pad(n, size) {
        let s = String(n);
        while (s.length < (size || 2)) {s = "0" + s;}
        return s;
      },
      onFileChange(e) {
        this.productData.image_path = this.productData.imageFile.path;
      },
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
        ipcRenderer.on('product_created', (event, response) => {
          this.isLoading = false;
          if (response.status)
            this.successToast(response.message)
          else 
            this.failToast(response.message)
          this.$parent.close()
        })
        
      },
      onUpdateProd() {
        ipcRenderer.send('update_product', this.productData);
        ipcRenderer.on('product_updated', (event, response) => {
          this.isLoading = false;
          if (response.status)
            this.successToast(response.message)
          else 
            this.failToast(response.message)
          this.$parent.close()
        })
      },
      onDeleteProd() {
        ipcRenderer.send('delete_product', this.productData.ID);
        ipcRenderer.on('product_deleted', (event, response) => {
          this.isLoading = false;
          if (response.status)
            this.successToast(response.message)
          else 
            this.failToast(response.message)
          this.$parent.close()
        })
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
  .form {
    display: flex;
  }
  .image {
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-width: 250px;
    max-width: 500px;
    background-color: #011;
  }
  .image img {
    width: 100%;
  }
</style>