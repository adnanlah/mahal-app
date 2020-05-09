<template>
  <div class="invoice-form">
    <form @submit.prevent="onSubmit">
      <div :class="{'modal-card': isModal}" style="width: auto">
         <header v-if="isModal && isUpdate" class="modal-card-head">
              <p class="modal-card-title">Modifier la facture N: {{invoice.invoiceData.number}}</p>
          </header>
          <header v-if="isModal && !isUpdate" class="modal-card-head">
            <p class="modal-card-title">Créer une nouvelle facture</p>
          </header>
          <section :class="{'modal-card-body': isModal}">
            <div v-if="!isDebt">
              <div class="invoice-items" >
                <InvoiceItem
                  v-bind="{selected, isPurchase, inputToEdit, isDesignation, selectedId}"
                  @select="selectProduct"
                  @add="addInput"
                  @edit="editInput"
                  @delete="deleteInput"
                  @reset="resetInput">
                </InvoiceItem>
              </div>
              <div class="columns tags">
                <div class="column is-11">
                  <Tags
                    v-if="false"
                    :tags="trends"
                    @click="selectedId = $event"/>
                </div>
                <div class="colum is-1">
                  <b-field label="TOTAL"  type="is-primary">
                    <b-input :value="ntp" disabled></b-input>
                  </b-field>
                </div>
              </div>
            </div>

            <hr>

            <div class="columns">
              <div class="column is-9">
                <b-table
                  hoverable
                  narrowed
                  @click="setInvoiceItem"
                  :data="invoice.inputs"
                  :columns="inputColumns"
                  :loading="isLoading"
                />
              </div>
              <div class="column is-3">
                <div class="product-preview">
                  <img v-if="previewImagePath" :src="previewImagePath" alt="">
                  <div v-else class="preview-frame">
                    Apercu de l'image du produit
                  </div>
                </div>
              </div>
            </div>

            <hr>
            
            <div class="invoice-info columns">
              <div class="column is-4">
                <h2 class="title is-6">Informations</h2>
                <b-field v-if="!accountRequired">
                  <b-switch :rounded="false" type="is-dark" v-model="withoutSupplier">
                      Sans Fournisseur
                  </b-switch>
                </b-field>
                <b-field v-if="isPurchase" label-position="on-border" grouped>
                  <b-field expanded label="Fournisseur" label-position="on-border">
                    <b-select
                      :disabled="withoutSupplier"
                      v-model="invoice.invoiceData.SupplierId"
                      icon="account"
                      required
                      expanded
                      placeholder="Fournisseur">
                        <option
                            v-for="(inp, ind) in suppliers"
                            :key="ind"
                            :value="inp.id">
                          {{inp.name}}
                        </option>
                    </b-select>
                    <p class="control">
                      <b-button class="button is-link" icon-left="account-plus" @click="isAccountModalActive = true"></b-button>
                    </p>
                  </b-field>
                  <b-field label="Code" label-position="on-border">
                    <b-input class="input-code" v-model="invoice.invoiceData.SupplierId" placeholder="F0001.."></b-input>
                  </b-field>
                </b-field>
                
                <b-field v-else grouped>
                  <b-field expanded label="Client" label-position="on-border">
                    <b-select
                    expanded
                    v-model="invoice.invoiceData.ClientId"
                    icon="account"
                    required
                    placeholder="Client">
                        <option
                        v-for="(client, idx) in clients"
                        :key="idx"
                        :value="client.id">{{client.name}}</option>
                    </b-select>
                    <p class="control">
                      <b-button class="button is-link" icon-left="account-plus" @click="isAccountModalActive = true"></b-button>
                    </p>
                  </b-field>
                  <b-field label="Code" label-position="on-border">
                    <b-input class="input-code" v-model="invoice.invoiceData.ClientId" placeholder="C0001.."></b-input>
                  </b-field>
                </b-field>

                <b-field v-if="isPurchase" label="N de facture" label-position="on-border">
                  <b-input v-model="invoice.invoiceData.number" :disabled="invoice.invoiceData.SupplierId == null" required></b-input>
                </b-field>

                <b-field
                label="Mode de payment"
                v-if="realModelName == 'SaleInvoice'"
                label-position="on-border">
                  <b-autocomplete
                      required
                      v-model="invoice.invoiceData.payment_method"
                      placeholder="e.g. Par especes"
                      :keep-first="true"
                      :open-on-focus="true"
                      :data="filteredDataObj"
                      field="mode">
                  </b-autocomplete>
                </b-field>

                <b-field label="Djelfa le" label-position="on-border">
                  <b-datepicker
                      required
                      placeholder="Choisi la date.."
                      icon="calendar-today"
                      v-model="invoice.invoiceData.date">
                  </b-datepicker>
                </b-field>

                <b-field label-position="on-border">
                  <b-switch :rounded="false" type="is-dark" v-model="invoice.isPrinted">
                      A imprimer
                  </b-switch>
                </b-field>
              </div>
            
              <div
                class="column is-4"
                v-if="realModelName == 'SaleInvoice'"
              >
                <h2 class="title is-6">Paiement</h2>
                <b-field>
                  <b-switch type="is-success" v-model="invoice.invoiceData.fully_paid">
                      Entièrement payé
                  </b-switch>
                </b-field>
                
                <template v-for="(payment, idx) in payments" :label="idx">
                  <b-field label-position="on-border" :key="idx" :label="'Tranche N: ' + (idx + 1)" grouped>
                    <b-field expanded>
                      <b-input v-model="payment.amount" placeholder="Ajouter un paiement"></b-input>
                    </b-field>
                    <b-field>
                      <b-datepicker v-model="payment.date" disabled></b-datepicker>
                    </b-field>
                  </b-field>
                </template>

                <b-field label-position="on-border" label="Reste" >
                  <b-input disabled v-model="allRest"></b-input>
                </b-field>

                <b-field grouped  >
                  <b-field expanded label-position="on-border" label="Le délai">
                    <b-numberinput  type="is-dark" expanded :disabled="invoice.invoiceData.fully_paid" controls-position="compact" v-model="invoice.invoiceData.debt_alarm_weeks"></b-numberinput>
                  </b-field>
                </b-field>

                <b-field label-position="on-border" label="Note">
                  <b-input v-model="invoice.invoiceData.debt_note" :disabled="invoice.invoiceData.fully_paid"></b-input>
                </b-field>
              </div>

              <div v-else class="column is-4"></div>

              <div class="column is-4">
                  <h2 class="title is-6">Total</h2>
                  <b-field  label="Montant H.T" label-position="on-border">
                    <b-input v-model="pretax_amount" disabled></b-input>
                  </b-field>
                  <b-field  label="T.V.A (%)"  label-position="on-border">
                    <b-input v-model="invoice.invoiceData.tva_percentage"></b-input>
                  </b-field>
                  <b-field  label="T.V.A"  label-position="on-border">
                    <b-input v-model="tva" disabled></b-input>
                  </b-field>
                  <b-field  label="Montant T.T.C"  label-position="on-border">
                    <b-input v-model="ttc" disabled></b-input>
                  </b-field>
                  <b-field  label="Drois de timbres"  label-position="on-border">
                    <b-input v-model="invoice.invoiceData.timbres" :disabled="invoice.invoiceData.payment_method == 'Par especes'"></b-input>
                  </b-field>
                  <b-field  label="Remise (%)"  label-position="on-border">
                    <b-numberinput
                      type="is-dark"
                      v-model="invoice.invoiceData.remise_percentage"
                      controls-position="compact"
                      expanded/>
                  </b-field>
                  <b-field  label="Remise (DA)"  label-position="on-border">
                    <b-input
                      type="is-dark"
                      v-model="invoice.invoiceData.remise_amount"
                      expanded/>
                  </b-field>
                  <b-field label="Net A Payer" type="is-primary" label-position="on-border">
                    <b-input v-model="ntp" disabled></b-input>
                  </b-field>
                  <b-field v-if="!isPurchase" label="La somme en texte"  label-position="on-border" >
                    <b-input v-model="invoice.invoiceData.amount_text"  type="textarea"></b-input>
                  </b-field>
              </div>
            </div> <!-- End of .columns -->
          </section>

          <footer :class="{'modal-card-foot': isModal}">
            <template v-if="isUpdate">
              <button class="button" type="button" @click="$parent.close();">Fermer</button>
              <button class="button is-dark" @click="newCopy">Créer une copie</button>
              <button class="button is-primary" @click="preview">Apercu</button>
              <button class="button is-danger" icon-left="delete" @click="deleteInvoice">Supprimer</button>
              <button class="submit is-success">Modifier</button>
              <b-dropdown aria-role="list" v-if="transferList" @change="transferTo">
                  <button class="button is-dark" slot="trigger">
                      <span>Transferer vers</span>
                      <b-icon icon="menu-down"></b-icon>
                  </button>

                  <b-dropdown-item v-for="(transferItem, idx) in transferList" aria-role="listitem" :value="transferItem" :key="idx">{{transferItem}}</b-dropdown-item>
              </b-dropdown>
            </template>
            <template v-else>
              <button class="button is-warning" @click="resetInvoice">Reset</button>
              <button v-if="realModelName == 'CounterSale'" class="button is-link" @click="submitDraft">Brouillon</button>
              <button type="submit" class="button is-success">Enregistrer</button>
            </template>
          </footer>
        </div>
      </form>
      <b-modal :active.sync="isAccountModalActive"
        has-modal-card
        trap-focus
        aria-role="dialog"
        aria-modal>
        <AccountModalForm :type="isPurchase ? 'supplier' : 'client'"></AccountModalForm>
      </b-modal>
      
    </div>
</template>

<script>
// @ is an alias to /src
import {ipcRenderer} from 'electron';
import InvoiceItem from '@/components/InvoiceItem.vue'
import AccountModalForm from '@/components/AccountModalForm';
import Tags from '@/components/Tags';
import numberToText from '@/assets/js/numberToText';
import { EventBus } from '@/utils/event-bus.js';

class Invoice {
  constructor(invoice) {
    this.id = invoice ? invoice.id : null;
    this.number = invoice ? invoice.number : '';
    this.tva_percentage = invoice ? invoice.tva_percentage : 0;
    this.payment_method = invoice ? invoice.payment_method : '';
    this.remise_percentage = invoice ? invoice.remise_percentage : 0;
    this.remise_amount = invoice ? invoice.remise_amount : 0;
    this.timbres = invoice ? invoice.timbres : 0;
    this.fully_paid = invoice ? invoice.fully_paid : true;
    this.amount_text = invoice ? invoice.amount_text : '';
    this.ClientId = invoice ? invoice.ClientId : null;
    this.SupplierId = invoice ? invoice.SupplierId : null;
    this.date = invoice ? new Date(invoice.date) : new Date();
    this.debt_last_date = invoice ? invoice.debt_last_date : '';
    this.debt_alarm_weeks = invoice ? invoice.debt_alarm_weeks : 0;
    this.debt_alarm_date = invoice ? new Date(invoice.debt_alarm_date) : new Date();
    this.debt_rest = invoice ? invoice.debt_rest : null;
    this.debt_note = invoice ? invoice.debt_note : '';
  }
}

class Payment {
  constructor(item) {
    this.id = item ? item.id : null,
    this.number = item ? item.number : 0,
    this.amount = item ? item.amount : 0
  }
}

export default {
  name: 'CreateInvoice',
  components: {
    InvoiceItem,
    AccountModalForm,
    Tags
  },
  props: {
    modelName: {
      type: String,
      required: true
    },
    isModal: {
      type: Boolean,
      default: false
    },
    isDebt: {
      type: Boolean,
      default: false
    },
    isDesignation: {
      type: Boolean,
      default: false
    },
    isUpdateProp: {
      type: Boolean,
      default: false
    },
    accountRequired: {
      type: Boolean,
      default: true,
    },
    data: {
      default: null,
    }
  },
  data(){
    return {
      forcedModelName: null,
      invoice: {
        invoiceData: new Invoice(),
        payments: [new Payment()],
        inputs: [],
        isPrinted: false,
      },
      inputToEdit: null,
      isLoading: false,
      previewImagePath: '',
      forcedUpdate: null,
      isAccountModalActive: false,
      isPDFViewerModalActive: false,
      pdfFile: null,
      withoutSupplier: false,
      selectedId: null,
      inputColumns: [
        {
            field: 'ProductId',
            label: 'Code',
        },
        {
            field: 'designation',
            label: 'Désignation',
        },
        {
            field: 'unity',
            label: 'U',
        },
        {
            field: 'quantity',
            label: 'Quantité',
        },
        {
            field: 'unity_price',
            label: "Prix d'unité",
        },
        {
            field: 'amount',
            label: 'Montant',
        },
      ],
      paymentMethods: [
        {mode: 'Par especes'},
        {mode: 'Cheque'}
      ],
    }
  },
  computed: {
    realModelName() {
      return this.forcedModelName ? this.forcedModelName : this.modelName;
    },
    selected() {
      return this.invoice.inputs.map(i => i.ProductId);
    },
    isUpdate() {
      return this.forcedUpdate !== null ? this.forcedUpdate : this.isUpdateProp;
    },
    isPurchase() {
      let bool;
      switch(this.realModelName) {
        case 'PurchaseOrder':
          bool = true; break;
        case 'PurchaseInvoice':
          bool = true; break;
        default: 
          bool = false;
      }
      return bool;
    },
    transferList() {
      if (this.modelName == 'Proformat' || this.modelName == 'SaleOrder')
        return ['SaleInvoice']
      else if (this.modelName == 'PurchaseOrder')
        return ['PurchaseInvoice']
      else 
        return []
    },
    filteredDataObj() {
        return this.paymentMethods.filter((option) => {
            return option.mode
                .toString().toLowerCase()
                .indexOf(this.invoice.invoiceData.payment_method.toLowerCase()) >= 0
        })
    },
    pretax_amount: function() {
        return this.invoice.inputs.map(input => input.unity_price * input.quantity).reduce((acc, cur) => {return Number(acc) + Number(cur)}, 0);
    },
    tva: function() {
        return this.pretax_amount * this.invoice.invoiceData.tva_percentage / 100;
    },
    ttc: function() {
      return this.pretax_amount + this.tva;
    },
    ttcPlusTimbres() {
      return Number(this.ttc) + Number(this.invoice.invoiceData.timbres);
    },
    ntp: function() {
      return this.ttcPlusTimbres - this.invoice.invoiceData.remise_amount;
    },
    paymentsTotal() {
      return this.invoice.payments.map(p => p.amount).reduce((a, b) => a + b, 0);
    },
    allRest() {
      return this.ntp - this.paymentsTotal;
    },
    clients: function() {
      return !this.isPurchase ? this.$store.getters.CLIENTS : null;
    },
    suppliers: function() {
      return this.isPurchase ? this.$store.getters.SUPPLIERS : null;
    },
    trends() {
      if (!this.isPurchase)
        return this.$store.getters.TRENDS;
      else
        return null;
    }
  },
  watch: {
    'ntp': {
      handler: function(after, before) {
        if (!this.isPurchase && !this.isUpdate)
          this.invoice.payments[0].amount = after;
          this.invoice.invoiceData.amount_text = numberToText(after)
      },
      deep: true
    },
    'invoice.invoiceData.payment_method': {
      immediate: true,
      handler: function(after, before) {
        if (after !== 'Par especes')
          this.invoice.invoiceData.timbres = 0;
      },
      deep: true
    },
    'paymentsTotal': {
      immediate: true,
      handler: function(after, before) {
        if (after >= this.ntp)
          this.invoice.fully_paid = true;
        else 
          this.invoice.fully_paid = false;
      },
      deep: true
    },
    'invoice.invoiceData.debt_alarm_weeks': {
      immediate: true,
      handler: function(after, before) {
        let now = new Date();
        now.setDate(now.getDate() + (after * 7));
        this.debt_alarm_date = now;
      },
      deep: true
    },
    'invoice.invoiceData.remise_amount': {
      handler: function(after, before) {
        this.invoice.invoiceData.remise_percentage = Number(after) * 100 / this.ttcPlusTimbres;
      },
      deep: true
    },
    'invoice.invoiceData.remise_percentage': {
      handler: function(after, before) {
        this.invoice.invoiceData.remise_amount = Number(after) * this.ttcPlusTimbres / 100;
      },
      deep: true
    },
  },
  methods: {
    transferTo(value) {
      console.log('transferTo', value)
      this.forcedModelName = value;
      this.forcedUpdate = false;
    },
    newCopy(value) {
      this.forcedUpdate = false;
    },
    selectProduct(path) {
      if (path)
        this.previewImagePath = path;
    },
    resetInvoice(data = null) {
      this.invoice.invoiceData = new Invoice();
      this.invoice.payments = [new Payment()];
      this.invoice.inputs = [];
    },
    onSubmit(v) {
      console.log('onSubmit', v)
      this.isLoading = true;
      let toSend = {
        invoice: this.invoice,
        modelName: this.realModelName,
        invoiceComputed: {
          pretax_amount: this.pretax_amount,
          tva: this.tva,
          ttc: this.ttc,
          ntp: this.ntp,
        },
      };
      if (this.type == "update") {
        ipcRenderer.send('update_invoice', toSend);
        this.$emit('submit');
      } else {
        ipcRenderer.send('create_invoice', toSend);
      }
    },
    submitDraft() {
      this.isLoading = true;
      let toSend = {
        invoiceData: this.invoice.invoiceData,
        modelName: this.realModelName,
      }
      this.$store.dispatch('UPDATE_DRAFT', toSend)
      this.isLoading = false;
    },
    deleteInvoice() {
      ipcRenderer.send('delete_invoice', {
        modelName: this.realModelName,
        id: this.invoice.id
      })
    },
    
    addInput(input) {
      this.invoice.inputs.push(input);
    },
    setInvoiceItem(row) {
      this.inputToEdit = {...row};
    },
    editInput(newInput) {
      let inputIndex = this.invoice.inputs.findIndex(input => input.id == newInput.id);
      this.invoice.inputs[inputIndex] = newInput;
      this.inputToEdit = null;
    },
    deleteInput() {
      this.invoice.inputs.splice(this.index, 1);
    },
    resetInput() {
      this.input = this.invoice.inputs[this.inputIndex];
    },
    preview() {
      this.$store.commit('SET_PREVIEW_DATA', {data: this.invoice, templateName: this.realModelName})
    }
  },
  mounted() {
    if (this.data) {
      this.invoice.invoiceData = new Invoice(this.data)
      this.invoice.inputs = this.data.items.dataValues;

      this.data.Payments.forEach((payment) => {
        this.invoice.payments.push(new Payment(payment.dataValues));
      })

      if (this.isDebt)
        // this.invoice.payments.push(new Payment({number: this.invoice.payments.length}));
        this.invoice.payments.push(new Payment());
    }

    ipcRenderer.on('invoice_created', (event, r) => {
      this.isLoading = false;
      
      if (r.status) {
        this.successToast(r.message)
        this.resetInvoice();
        if (this.invoice.isPrinted)
          this.$store.commit('SET_PREVIEW_DATA', {data: r.invoice, templateName: this.realModelName})
      } else {
        this.failToast(r.message)
      }
    })

    ipcRenderer.on('invoice_updated', (event, r) => {
      this.isLoading = false;
      if (r.status) {
        this.successToast(r.message)
      } else {
        this.failToast(r.message)
      }
    })

    ipcRenderer.on('invoice_deleted', (event, r) => {
      this.isLoading = false;
      this.resetInvoice();
      if (r.status) {
        this.successToast(r.message)
      } else {
        this.failToast(r.message)
      }
      // close modal
      this.$parent.close();
    })
  }
};
</script>

<style>
  img {
    max-width: 100%;
  }
  .invoice-items {
    
  }
  .preview-frame {
    border: 5px dashed grey;
    padding: 15px;
  }
</style>