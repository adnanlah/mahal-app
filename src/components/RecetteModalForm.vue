<template>
  <div id="modal-template">
    <form @submit.prevent="onSubmit">
      <div class="modal-card" style="width: auto">
          <header class="modal-card-head">
              <p v-if="isUpdate" class="modal-card-title">Modifier la recette</p>
              <p v-else class="modal-card-title">Ajouter une recette</p>
          </header>
          <section class="modal-card-body">
            <div class="columns">
              <div class="column is-6">
                <b-field label="Montant (DA)">
                  <b-input v-model.number="recetteData.amount" required>
                    </b-input>
                </b-field>

                <b-field label="Montant (en lettres)">
                  <b-input disabled v-model.number="recetteData.amount_text" >
                    </b-input>
                </b-field>

                <b-field label="Le motif">
                  <b-input
                      v-model="recetteData.motive"
                      placeholder=""
                      required>
                  </b-input>
                </b-field>

              </div>
              <div class="column is-6">
                <b-field label="Nom de client">
                  <b-input
                      v-model="recetteData.client_name"
                      placeholder="Nom.."
                      required>
                  </b-input>
                </b-field>

                <b-field label="Note sur le client">
                  <b-input
                      v-model="recetteData.client_info"
                      placeholder="Tel.."
                      >
                  </b-input>
                </b-field>

                <b-field label="La date">
                  <b-datepicker
                      placeholder="Choisi la date.."
                      icon="calendar-today"
                      v-model="recetteData.date"
                      required>
                  </b-datepicker>
                </b-field>

                <b-switch v-model="isPrinted">A imprimer</b-switch>
              </div>
            </div> <!-- end of columns -->
            <div class="error-message" v-if="message">{{message}}</div>

          </section>
          <footer class="modal-card-foot">
              <button class="button" type="button" @click="$parent.close();">Fermer</button>
              <template v-if="isUpdate">
                <button class="button is-danger" @click="action = 'delete'" :loading="isLoading">Supprimer</button>
                <button class="button is-dark" @click="print" :loading="isLoading">Imprimer</button>
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
import numberToText from '@/assets/js/numberToText';

export default {
  name: 'RecetteModalForm',
  components: {
  },
  props: [
    'data'
  ],
  data() {
    return {
      recetteData: {
        amount: '',
        amount_text: '',
        client_name: '',
        client_info: '',
        motif: '',
        full_date: new Date(),
        date: '',
      },
      tasks: [
        'Bricolage',
      ],
      isPrinted: true,
      action: '',
      message: '',
      isLoading: false
    }
  },
  computed: {
    isUpdate() {
      return this.data ? true : false;
    }
  },
  watch: {
    'recetteData.amount': {
      handler: function(after, before) {
        if (after)
          this.recetteData.amount_text = numberToText(after)
      },
      deep: true
    },
    'recetteData.full_date': {
      immediate: true,
      handler: function(after, before) {
        if (typeof after == Object) {
          const options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };
          this.date = after.toLocaleDateString('fr-FR', options);
        } else {
          this.full_date = new Date(after);
        }
      },
      deep: true
    }
  },
  mounted() {
    if (this.data) {
      this.recetteData = this.data;
    }
  },
  methods: {
    onSubmit() {
      this.isLoading = true;
      if (this.action == 'delete') {
        this.onDeleteRecette()
      } else if (this.action == 'update') {
        this.onUpdateRecette()
      } else if (this.action == 'add') {
        this.onCreateRecette();
      }
      ipcRenderer.on('recette_created', (event, result) => {
        this.isLoading = false;
        console.log("result", result)
        if (result.status) {
            this.recetteData = {};
            this.successToast(result.message);
        } else {
          this.failToast(result.message);
        }
      })

      ipcRenderer.on('recette_updated', (event, result) => {
        this.isLoading = false;
        if (result.status) {
            this.successToast(result.message);
        } else {
          this.failToast(result.message);
        }
      })

      ipcRenderer.on('recette_deleted', (event, result) => {
        this.isLoading = false;
        if (result.status) {
            this.$parent.close();
            this.successToast(result.message);
        } else {
          this.failToast(result.message);
        }
      })
    },

    // Recette SEND
    onCreateRecette() {
      ipcRenderer.send('create_recette', {
        recetteData: this.recetteData,
        isPrinted: this.isPrinted
      });
    },
    onUpdateRecette() {
      ipcRenderer.send('update_recette', {
        recetteData: this.recetteData,
        isPrinted: this.isPrinted
      });
    },
    onDeleteRecette() {
      ipcRenderer.send('delete_recette', this.recetteData.ID);
    },

    print() {
      console.log('printing', this.recetteData)
      ipcRenderer.send('print', {data: [this.recetteData], type: 'receiptvoucher'});
    }

  }
};
</script>

<style scoped>
</style>