<template>
  <div id="modal-template">
    <form @submit.prevent="onSubmit">
      <div class="modal-card" style="width: auto">
        <header class="modal-card-head">
            <p class="modal-card-title">Configuration</p>
        </header>
        <section class="modal-card-body">
          <b-field label="Ancien mot de passe">
            <b-input required v-model="passData.oldPassword"></b-input>
          </b-field>
          <b-field label="Le nouveau mot de passe">
            <b-input required type="password"
                  placeholder="Password reveal input"
                  v-model="passData.newPassword1"
                  :message="passwordMessage"
                  password-reveal>
            </b-input>
          </b-field>
          <b-field label="Re-tapez Le nouveau mot de passe">
            <b-input required type="password"
                  placeholder="Password reveal input"
                  v-model="passData.newPassword2"
                  :message="passwordMessage"
                  password-reveal>
            </b-input>
          </b-field>
        </section>
        <footer class="modal-card-foot">
          <button class="button" type="button" @click="$parent.close();">Fermer</button>
          <button type="submit" class="button is-link">Enregistrer</button>
        </footer>
      </div>
    </form>
  </div>
</template>

<script>
import {ipcRenderer} from 'electron';

export default {
  name: 'PasswordForm',
  components: {
  },
  props: [
  ],
  data() {
    return {
      passData: {
        oldPassword: '',
        newPassword1: '',
        newPassword2: '',
      },
      isLoading: false,
      passwordMessage: ''
    }
  },
  computed: {
    
  },
  watch: {
    'passData': {
      handler: function(after, before) {
        if (after.newPassword1 !== after.newPassword2)
          this.passwordMessage = 'Re-typer le password'
        else
          this.passwordMessage = ''

      },
      deep: true
    }
  },
  mounted() {
    ipcRenderer.on('password_saved', (event, response) => {
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
      ipcRenderer.send('set_password', this.passData);
    }
  }
};
</script>