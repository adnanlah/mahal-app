<template>
  <div id="modal-template">
      <div class="modal-card" style="width: auto">
        <header class="modal-card-head">
            <p class="modal-card-title" v-if="isUpdate">Modifier le compte</p>
            <p class="modal-card-title" v-else>Ajouter un Client/Fournisseur</p>
        </header>
        <section class="modal-card-body">
          

          <div class="columns">
            <div class="column is-4">
              <b-field label="Client ou Fournisseur">
                <b-select
                    expanded
                    v-model="accountData.type"
                    placeholder="Client ou Fournisseur"
                    required>
                    <template v-if="type == 'company'">
                      <option value="company">Entreprise</option>
                    </template>
                    <template v-else>
                      <option value="supplier">Fournisseur</option>
                      <option value="client">Client</option>
                    </template>
                </b-select>
              </b-field>
              <b-field label="ID" label-position="on-border">
                <b-input v-model="formattedID" disabled></b-input>
              </b-field>
              <b-field label="Nom" label-position="on-border">
                <b-input v-model="accountData.name"></b-input>
              </b-field>
              <b-field label="Description" label-position="on-border">
                <b-input v-model="accountData.description"></b-input>
              </b-field>
              <b-field label="L'addresse" label-position="on-border">
                <b-input v-model="accountData.address"></b-input>
              </b-field>
              <b-field label="Cité" label-position="on-border">
                <b-input v-model="accountData.city"></b-input>
              </b-field>
              <b-field label="Téléphone (Domicile)" label-position="on-border">
                <b-input v-model="accountData.phone"></b-input>
              </b-field>
              <b-field label="Mobile" label-position="on-border">
                <b-input v-model="accountData.mobile"></b-input>
              </b-field>
              <b-field label="Fax" label-position="on-border">
                <b-input v-model="accountData.fax"></b-input>
              </b-field>
              <b-field label="E-Mail" label-position="on-border">
                <b-input v-model="accountData.email"></b-input>
              </b-field>
            </div>
            <div class="column is-4">
              <b-field label="RC" label-position="on-border">
                <b-input v-model="accountData.rc"></b-input>
              </b-field>
              <b-field label="NIF" label-position="on-border">
                <b-input v-model="accountData.nif"></b-input>
              </b-field>
              <b-field label="AI" label-position="on-border">
                <b-input v-model="accountData.ai"></b-input>
              </b-field>
              <b-field label="NIS" label-position="on-border">
                <b-input v-model="accountData.nis"></b-input>
              </b-field>
              <b-field label="CAP" label-position="on-border">
                <b-input v-model="accountData.cap"></b-input>
              </b-field>
              <b-field label="Compte bancaire" label-position="on-border">
                <b-input v-model="accountData.bank_account"></b-input>
              </b-field>
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button" type="button" @click="$parent.close();">Fermer</button>
          <button v-if="isUpdate" class="button is-primary" @click="onEdit">Modifier</button>
          <button v-else class="button is-success" @click="onCreate">Ajouter</button>
        </footer>
      </div>
  </div>
</template>

<script>
import {ipcRenderer} from 'electron';

  export default {
    name: 'AccountModalForm',
    components: {
    },
    props: [
      'type',
      'data'
    ],
    data() {
      return {
        accountData: {
          ID: '',
          name: '',
          type: 'client',
        },
        isLoading: false,
      }
    },
    computed: {
      isUpdate() {
        return this.data ? true : false;
      },
      formattedID() {
        if (this.isUpdate) 
          return this.pad(this.accountData.ID, 4)
        else
          return this.pad(this.$store.getters.NEXT_ID, 4)
      }
    },
    mounted() {
      if (this.data)
        this.accountData = this.data;
      else
        this.accountData.type = this.type;
    },
    methods: {
      pad(n, size) {
        let s = String(n);
        while (s.length < (size || 2)) {s = "0" + s;}
        return s;
      },
      onCreate() {
        this.$store.dispatch('SAVE_ACCOUNT', this.accountData)
          .then(() => {
            this.$parent.close()
            this.successToast('Compte bien crée')
          })
          .catch(e => this.failToast('Compte pas bien crée ', e.message))
      },
      onEdit() {
        this.$store.dispatch("UPDATE_ACCOUNT", this.accountData)
        .then(() => this.successToast('Compte bien modifier'))
        .catch(e => this.failToast('Compte pas bien modifier ', e.message))
      }
    }
  };
</script>

<style scoped>

</style>