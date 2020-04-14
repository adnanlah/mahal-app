<template>
  <div id="modal-template">
    <form @submit.prevent="onSubmit">
      <div class="modal-card" style="width: auto">
        <header class="modal-card-head">
            <p class="modal-card-title">Configuration</p>
        </header>
        <section class="modal-card-body">
          <div class="columns">
            <div class="column is-4">
              <b-field label="Nom de l'Entreprise" label-position="on-border">
                <b-input v-model="companyData.name"></b-input>
              </b-field>
              <b-field label="Description" label-position="on-border">
                <b-input v-model="companyData.description"></b-input>
              </b-field>
              <b-field label="L'addresse" label-position="on-border">
                <b-input v-model="companyData.address"></b-input>
              </b-field>
              <b-field label="Cité" label-position="on-border">
                <b-input v-model="companyData.city"></b-input>
              </b-field>
              <b-field label="Téléphone (Domicile)" label-position="on-border">
                <b-input v-model="companyData.phone"></b-input>
              </b-field>
              <b-field label="Mobile" label-position="on-border">
                <b-input v-model="companyData.mobile"></b-input>
              </b-field>
              <b-field label="Fax" label-position="on-border">
                <b-input v-model="companyData.fax"></b-input>
              </b-field>
              <b-field label="E-Mail" label-position="on-border">
                <b-input v-model="companyData.email"></b-input>
              </b-field>
            </div>
            <div class="column is-4">
              <b-field label="RC" label-position="on-border">
                <b-input v-model="companyData.rc"></b-input>
              </b-field>
              <b-field label="NIF" label-position="on-border">
                <b-input v-model="companyData.nif"></b-input>
              </b-field>
              <b-field label="AI" label-position="on-border">
                <b-input v-model="companyData.ai"></b-input>
              </b-field>
              <b-field label="NIS" label-position="on-border">
                <b-input v-model="companyData.nis"></b-input>
              </b-field>
              <b-field label="CAP" label-position="on-border">
                <b-input v-model="companyData.cap"></b-input>
              </b-field>
              <b-field label="Le compte bancaire" label-position="on-border">
                <b-input v-model="companyData.bank_account"></b-input>
              </b-field>
            </div>
            <div class="column is-4">
              <b-field label="logo">
                <b-field class="file">
                  <b-upload v-model="companyData.imageFile" @input="onFileChange">
                      <a class="button is-link">
                          <b-icon icon="upload"></b-icon>
                          <span>Upload</span>
                      </a>
                  </b-upload>
                  <b-button type="is-danger" icon-right="autorenew" @click="companyData.imageFile = null"/>
                  <span class="file-name" v-if="companyData.imageFile">
                      {{ companyData.imageFile.name }}
                  </span>
                </b-field>
              </b-field>
              <b-field label="Apercu">
                <img :message="logoMessage" v-if="companyData.logo" :src="companyData.logo" alt="Pas de logo">
              </b-field>

            </div>
          </div> <!-- end of columns -->
        </section>
        <footer class="modal-card-foot">
          <button class="button" type="button" @click="$parent.close();">Fermer</button>
          <b-button :loading="isLoading" class="button is-link">Enregistrer</b-button>
        </footer>
      </div>
    </form>
  </div>
</template>

<script>
import {ipcRenderer} from 'electron';

export default {
  name: 'CompanyForm',
  components: {
  },
  props: [
  ],
  data() {
    return {
      companyData: {
        imageFile: null,
        image_path: '',
      },
      isLoading: false,
      logoMessage: ''
    }
  },
  computed: {
    
  },
  watch: {
    
  },
  mounted() {
    ipcRenderer.send('get_company');
    ipcRenderer.on('company', (event, data) => {
      if (data)
        this.companyData = data;
    })
    ipcRenderer.on('company_saved', (event, response) => {
      this.isLoading = false;
      if (response.status)
        this.successToast(response.message)
      else
        this.failToast(response.message)
    })
  },
  methods: {
    onSubmit() {
      this.isLoading = true;
      ipcRenderer.send('set_company', this.companyData);
    },
    onFileChange(e) {
      if (this.companyData.imageFile.type != 'image/jpeg' && this.companyData.imageFile.type != 'image/png') {
        this.companyData.imageFile = null;
        this.logoMessage = 'Le fichier doit etre une image (PNG ou Jpeg)'
      } else {
        this.message = '';
        let fileReader = new FileReader();
        fileReader.onload = (fileLoadedEvent) => {
          this.companyData.logo = fileLoadedEvent.target.result;
        }
        fileReader.readAsDataURL(this.companyData.imageFile);
      }

    }
  }
};
</script>