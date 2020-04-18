<template>
  <div class="home">
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Créer une facture d'achats
          </h1>
        </div>
      </div>
    </section>
    <section class="page-container">
    <b-tabs>
      <b-tab-item label="Ajouter une facture d'achats">
          
        <CreateInvoice
          modelName="PurchaseInvoice"
          :accountRequired="false"
        />

      </b-tab-item>
      <b-tab-item label="Créer une Commande">

        <CreateInvoice
          modelName="PurchaseOrder"
          isDesignation
        /> 

      </b-tab-item>
    </b-tabs>
  </section>

  </div>
</template>

<script>
// @ is an alias to /src

import {ipcRenderer} from 'electron';
import CreateInvoice from '@/components/CreateInvoice';
export default {
  name: 'createpurchaseinvoice',
  components: {
    CreateInvoice
  },
   data(){
    return {
    }
  },
  computed: {
  },
  methods: {
  },
  mounted() {
  }
};
</script>
