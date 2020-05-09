<template>
  <div id="app">
    <nav id="nav">

      <b-navbar>
        <template slot="brand">
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
                MAKHZAN
            </b-navbar-item>
        </template>
        <template slot="start">
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
                VENTE COMPTOIR
            </b-navbar-item>

            <b-dropdown aria-role="list">
                <!-- <button class="button is-primary" slot="trigger">
                    <span>Click me!</span>
                    <b-icon icon="menu-down"></b-icon>
                </button> -->
                <a
                  class="navbar-item"
                  slot="trigger">
                  <span>LES FACTURES</span>
                  <b-icon icon="menu-down"></b-icon>
                </a>
                <b-dropdown-item aria-role="listitem">
                  <b-navbar-item tag="router-link" :to="{ path: '/invoices' }">
                    LES FACTURES
                  </b-navbar-item>
                </b-dropdown-item>
                <b-dropdown-item aria-role="listitem">
                  <b-navbar-item tag="router-link" :to="{ path: '/createpurchaseinvoice' }">
                    FACTURES D'ACHATS
                  </b-navbar-item>
                </b-dropdown-item>
                <b-dropdown-item aria-role="listitem">
                  <b-navbar-item tag="router-link" :to="{ path: '/createsaleinvoice' }">
                    FACTURES DE VENTES
                </b-navbar-item>
                </b-dropdown-item>
            </b-dropdown>

            <b-navbar-item tag="router-link" :to="{ path: '/transactions' }">
                LA CAISSE
            </b-navbar-item>
            <b-navbar-item tag="router-link" :to="{ path: '/inventory' }">
                LE STOCK
            </b-navbar-item>
            <b-navbar-item tag="router-link" :to="{ path: '/accounts' }">
                LES COMPTES
            </b-navbar-item>
            <b-navbar-item tag="router-link" :to="{ path: '/debt' }">
                LES DETTES ({{overdueCount}})
            </b-navbar-item>
            <b-navbar-item tag="router-link" :to="{ path: '/reports' }">
                RAPPORTS
            </b-navbar-item>
            <b-navbar-item tag="router-link" :to="{ path: '/logs' }">
                HISTORIQUE
            </b-navbar-item>

        </template>

        <template slot="end">
          <b-dropdown aria-role="list">
              <a
                  class="navbar-item"
                  slot="trigger">
                  <span><b-icon icon="menu"></b-icon></span>
                  
              </a>

              <b-dropdown-item aria-role="listitem" @click="isCompanyModalActive = true">
                Entreprise
              </b-dropdown-item>
              <b-dropdown-item aria-role="listitem" @click="isPasswordModalActive = true">
                Mot de passe
              </b-dropdown-item>
              <b-dropdown-item aria-role="listitem" @click="isConfigModalActive = true">
                CONFIGURATION
              </b-dropdown-item>
              <b-dropdown-item aria-role="listitem" @click="isAboutModalActive = true">
                A PROPOS
              </b-dropdown-item>
              <b-dropdown-item aria-role="listitem">
                LOGOUT
              </b-dropdown-item>
          </b-dropdown>
        </template>
      </b-navbar>

    

    </nav>
    <main class="main">
      <div class="main-content">
        <router-view></router-view>
        <b-modal :active.sync="isCompanyModalActive"
                 has-modal-card
                 trap-focus
                 aria-role="dialog"
                 aria-modal>
            <CompanyForm></CompanyForm>
        </b-modal>
        <b-modal :active.sync="isPasswordModalActive"
                 has-modal-card
                 trap-focus
                 aria-role="dialog"
                 aria-modal>
            <PasswordForm></PasswordForm>
        </b-modal>
        <b-modal :active.sync="isConfigModalActive"
                 has-modal-card
                 trap-focus
                 aria-role="dialog"
                 aria-modal>
            <ConfigForm></ConfigForm>
        </b-modal>
        <b-modal :active.sync="isAboutModalActive"
                 has-modal-card
                 trap-focus
                 aria-role="dialog"
                 aria-modal>
            <About></About>
        </b-modal>
      </div>
    </main>
    <!-- <div v-if="isPreviewModalActive" class="tst" id="print-area">
      <div class="print">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis, ipsam. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil animi dolores cumque, ipsam odio culpa quia expedita accusantium tempora distinctio neque iste optio nesciunt, dolorum numquam autem vero perferendis asperiores possimus praesentium! Possimus quibusdam rerum ratione voluptates amet eos, voluptatem nam placeat voluptatum animi blanditiis id a, aperiam eaque corrupti!
      </div>
    </div>
    <button @click="savePDF">Sauv</button> -->

    <b-modal :active.sync="isPreviewModalActive"
      has-modal-card
      @close="closedDocPreview"
      full-screen
      trap-focus
      id="previewModal"
      aria-role="dialog"
      aria-modal> -->
      <DocPreview v-if="isPreviewModalActive" :data="previewData.data" :templateName="previewData.templateName" :company="companyData"></DocPreview>
    </b-modal>
  </div>
</template>

<script>
import {ipcRenderer} from 'electron';
import CompanyForm from '@/components/CompanyForm';
import PasswordForm from '@/components/PasswordForm';
import ConfigForm from '@/components/ConfigForm';
import DocPreview from '@/components/Templates/DocPreview';
import About from '@/components/About';

ipcRenderer.on('overdue_invoices', (event, overdueInvoicesResult) => {
  if (overdueInvoicesResult.count > 0)
    this.overdueCount = overdueInvoicesResult.count;
})

export default {
  name: 'App',

  components: {
    ConfigForm,
    CompanyForm,
    PasswordForm,
    DocPreview,
    About
  },

  data: () => ({
    overdueCount: 0,
    isConfigModalActive: false,
    isCompanyModalActive: false,
    isPasswordModalActive: false,
    isAboutModalActive: false,
    isPreviewModalActive: false,
  }),

  computed: {
    previewData() {
      return this.$store.getters.PMD;
    },
    companyData() {
      return this.$store.getters.COMPANY_DATA;
    },
  },

  methods: {
    closedDocPreview() {
      this.$store.commit('DELETE_PREVIEW_DATA')
    },
     savePDF() {
      ipcRenderer.send('save-pdf')
    }
  },

  watch: {
    previewData(val) {
      if (val)
        this.isPreviewModalActive = true;
      else
        this.isPreviewModalActive = false;
    }
  },

  mounted() {
    this.$store.dispatch('GET_INIT');
    ipcRenderer.send('get_overdue_invoices')

    ipcRenderer.on('error', (event, response) => {
      this.failToast(response.message)
    })
  },
};
</script>

<style lang="scss">

@media print {
  #app > * {
    display: none;
  }
  #previewModal, #previewModal {
    display: block;
  }
  #app {
    width: 100% !important;
  }
  #previewModal {
    padding: 0; margin: 0;
  }
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #222;
  width: 100vw;
}

#nav {

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.main {
  width: 100%;
  /*height: 100vh;*/
  margin: 0 auto;
  background-color: #efeeef;
  border: 1px solid yellow;
}
.main-content {
}

.page-container {
  padding: 10px 20px;
}

.menu-bar {
  border-bottom: 1px solid darkgray;
}

.error-message {
  color: red;
  margin: 10px 0;
}

.input-code {
  max-width: 65px;
}
</style>
