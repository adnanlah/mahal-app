<template>
  <div id="app">
    <div id="nav">
      <b-navbar>
        <template slot="brand">
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
                MAKHZAN
            </b-navbar-item>
        </template>
        <template slot="start">
            <!-- <b-navbar-item tag="router-link" :to="{ path: '/' }">
                Acceuil
            </b-navbar-item> -->
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
            <b-navbar-item tag="router-link" :to="{ path: '/testview' }">
                PDF
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

    

    </div>
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
  </div>
</template>

<script>
import {ipcRenderer} from 'electron';
import CompanyForm from '@/components/CompanyForm';
import PasswordForm from '@/components/PasswordForm';
import ConfigForm from '@/components/ConfigForm';
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
    About
  },

  data: () => ({
    overdueCount: 0,
    isConfigModalActive: false,
    isCompanyModalActive: false,
    isPasswordModalActive: false,
    isAboutModalActive: false,
  }),

  mounted() {
    this.$store.dispatch('GET_INIT');
    ipcRenderer.send('get_overdue_invoices')

    ipcRenderer.on('error', (event, response) => {
      this.failToast(response.message)
    })
  }
};
</script>

<style lang="scss">
@media print
{    
  * {
    display: none !important;
  }
  canvas {
    display: inline;
    border: 1px solid black;
    page-break-after: always;
  }
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #222;
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
  width: 85%;
  height: 100vh;
  margin: 0 auto;
  background-color: #efeeef;
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
