<template>
  <div class="home">
    <section class="hero is-small is-dark">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Créer une facture de vente
          </h1>
        </div>
      </div>
    </section>
    <section class="page-container">
     <b-tabs >
        <b-tab-item label="Créer un bon de livraison">
            
          <CreateInvoice
            modelName="SaleInvoice"
            isDesignation
          /> 
          
        </b-tab-item>
        <b-tab-item label="Créer une Proformat">

          <CreateInvoice
            modelName="Proformat"
            isDesignation
          /> 

        </b-tab-item>
        <b-tab-item label="Créer une Commande">

          <CreateInvoice
            modelName="SaleOrder"
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
  name: 'createsaleinvoice',
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
