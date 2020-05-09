<template>
  <div id="modal-template">
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
          <p class="modal-card-title">Apercu</p>
      </header>
      <section class="modal-card-body">
        <div :is="templateName" :data="data" :company="company"></div>
      </section>
      <footer class="modal-card-foot">
        <button class="button" type="button" @click="$parent.close();">Fermer</button>
        <button class="button is-dark" type="button" @click="printWindow">Imprimer</button>
        <button class="button is-dark" type="button" @click="savePDF">Sauvgarder</button>
      </footer>
    </div>
  </div>
</template>
<script>
import CounterSale from './CounterSale';
// import Inventory from '@/components/Templates/Inventory.vue';
// import PaymentVoucher from '@/components/Templates/PaymentVoucher.vue';
// import Proformat from '@/components/Templates/Proformat.vue';
// import PurchaseInvoice from '@/components/Templates/PurchaseInvoice.vue';
// import PurchaseOrder from '@/components/Templates/PurchaseOrder.vue';
// import ReceiptVoucher from '@/components/Templates/ReceiptVoucher.vue';
// import Report from '@/components/Templates/Report.vue';
// import SaleInvoice from '@/components/Templates/SaleInvoice.vue';
// import SaleOrder from '@/components/Templates/SaleOrder.vue';
// import Tickets from '@/components/Templates/Tickets.vue';
import {ipcRenderer} from 'electron';
export default {
  name: 'DocPreview',
  
  components: {
  	CounterSale,
  	// Inventory,
  	// PaymentVoucher,
  	// Proformat,
  	// PurchaseInvoice,
  	// PurchaseOrder,
  	// ReceiptVoucher,
  	// Report,
  	// SaleInvoice,
  	// SaleOrder,
  	// Tickets,
  },
  props: {
  	templateName: {
  		type: String,
  		required: true,
  	},
  	data: {
  		type: Object,
  		required: true,
  	},
  	company: {
  		type: Object,
  		required: false,
  	}
  },
  methods: {
    printWindow() {
      window.print()
      // ipcRenderer.send('print-win')
    },
    savePDF() {
      ipcRenderer.send('save-pdf')
    }
  }
};
</script>

<style lang="css" scoped>
  @media print {
    #modal-template {
      position: absolute;
      top:0; left: 0;
    }
    .modal-card > * {
      display: none !important;
    }
    .modal-card-body {
      display: block !important;
      padding: 0;
    }
  }
</style>