<template>
  <div class="home">
    <section class="hero is-small is-dark">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Vente Comptoir
          </h1>
        </div>
      </div>
    </section>
    <section class="page-container">
    <b-tabs v-model="activeTab" @input="clickedTab">
        <b-tab-item label="Vendez">

          <CreateInvoice
            modelName="CounterSale"
            :data="data"
            @submit="clearData"
            isOrder
          /> 

        </b-tab-item>
        <b-tab-item label="Brouillons">

          <b-table
            v-if="activeTab == 1"
            :data="drafts"
            :columns="columns"
            :loading="isLoading"
            @click="loadDraft">
          </b-table>

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
  name: 'countersale',
  components: {
    CreateInvoice
  },
   data(){
    return {
      activeTab: 0,
      data: null,
      isLoading: false,
    }
  },
  computed: {
    drafts() {
      return this.$store.getters.COUNTERSALE_DRAFTS;
    }
  },
  methods: {
    clearData() {
      this.data = null;
    },
    clickedTab() {
      if (this.activeTab == 1) {
        this.isLoading = true;
        ipcRenderer.send('get_counter_drafts')
        ipcRenderer.on('counter_drafts', (events, drafts) => {
          this.isLoading = false;
          this.drafts = drafts;
        })
      }
    },
    loadDraft(draft) {
      this.data = draft;
      this.activeTab = 0;
    }
  },
  mounted() {
  }
};
</script>
