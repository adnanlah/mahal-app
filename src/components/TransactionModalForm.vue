<template>
  <div id="modal-template">
    <form @submit.prevent="onSubmit">
      <div class="modal-card" style="width: auto">
          <header class="modal-card-head">
              <p v-if="isUpdate" class="modal-card-title">Modifier la transaction</p>
              <p v-else class="modal-card-title">Ajouter une transaction</p>
          </header>
          <section class="modal-card-body">
            <div class="columns">
              <div class="column is-6">
                <b-field label="Montant (DA)">
                  <b-select v-model="transactionData.type" placeholder="In ou Out" required>
                    <option value="in">Recette</option>
                    <option value="out">Depense</option>
                    </b-select>
                </b-field>

                <b-field label="Montant (DA)">
                  <b-input v-model.number="transactionData.amount" required>
                    </b-input>
                </b-field>

                <b-field label="Montant (en lettres)">
                  <b-input disabled v-model.number="transactionData.amount_text" >
                    </b-input>
                </b-field>

                <b-field label="Le motif">
                  <b-input
                      v-model="transactionData.motive"
                      placeholder=""
                      required>
                  </b-input>
                </b-field>

              </div>
              <div class="column is-6">
                <b-field label="Nom de client">
                  <b-input
                      v-model="transactionData.client_name"
                      placeholder="Nom.."
                      required>
                  </b-input>
                </b-field>

                <b-field label="Note sur le client">
                  <b-input
                      v-model="transactionData.client_info"
                      placeholder="Tel.."
                      >
                  </b-input>
                </b-field>

                <b-field label="La date">
                  <b-datepicker
                      placeholder="Choisi la date.."
                      icon="calendar-today"
                      v-model="transactionData.date"
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
  name: 'TransactionModalForm',
  components: {
  },
  props: [
    'data',
    'type'
  ],
  data() {
    return {
      transactionData: {
        type: null,
        amount: '',
        amount_text: '',
        client_name: '',
        client_info: '',
        motif: '',
        full_date: new Date(),
        date: '',
      },
      
      isPrinted: true,
      action: '',
      message: '',
      isLoading: false
    }
  },
  computed: {
    isUpdate() {
      return this.data ? true : false;
    },
    classes() {
      if (this.transactionData.type == 'recette')
        return this.$store.getters.RECETTE_MOTIVES;
      else
        return this.$store.getters.DEPENSE_DESIGNATIONS;
    }
  },
  watch: {
    'transactionData.amount': {
      handler: function(after, before) {
        if (after)
          this.transactionData.amount_text = numberToText(after)
      },
      deep: true
    },
    'transactionData.full_date': {
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
      this.transactionData = this.data;
    }
    this.transactionData.type = this.type;
  },
  methods: {
    onSubmit() {
      this.isLoading = true;
      if (this.action == 'delete') {
        this.onDeleteTransaction()
      } else if (this.action == 'update') {
        this.onUpdateTransaction()
      } else if (this.action == 'add') {
        this.onCreateTransaction();
      }
      ipcRenderer.on('transaction_created', (event, result) => {
        this.isLoading = false;
        console.log("result", result)
        if (result.status) {
            this.transactionData = {};
            this.successToast(result.message);
        } else {
          this.failToast(result.message);
        }
      })

      ipcRenderer.on('transaction_updated', (event, result) => {
        this.isLoading = false;
        if (result.status) {
            this.successToast(result.message);
        } else {
          this.failToast(result.message);
        }
      })

      ipcRenderer.on('transaction_deleted', (event, result) => {
        this.isLoading = false;
        if (result.status) {
            this.$parent.close();
            this.successToast(result.message);
        } else {
          this.failToast(result.message);
        }
      })
    },

    // Transaction SEND
    onCreateTransaction() {
      ipcRenderer.send('create_transaction', {
        transactionData: this.transactionData,
        isPrinted: this.isPrinted
      });
    },
    onUpdateTransaction() {
      ipcRenderer.send('update_transaction', {
        transactionData: this.transactionData,
        isPrinted: this.isPrinted
      });
    },
    onDeleteTransaction() {
      ipcRenderer.send('delete_transaction', this.transactionData.ID);
    },

    print() {
      console.log('printing', this.transactionData)
      ipcRenderer.send('print', {data: [this.transactionData], type: 'receiptvoucher'});
    }

  }
};
</script>

<style scoped>
</style>