<template>
  <div id="modal-template">
    <form @submit.prevent="onSubmit">
      <div class="modal-card" style="width: auto">
          <header class="modal-card-head">
              <p class="modal-card-title">Configuration</p>
          </header>
          <section class="modal-card-body">
            
            <b-field>
              La langue: <b-select disabled><option>ربي</option><option selected>Français</option></b-select>
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
  name: 'ConfigForm',
  components: {
  },
  props: [
    'data'
  ],
  data() {
    return {
      
    }
  },
  computed: {
    
  },
  watch: {
    
  },
  mounted() {
    
  },
  methods: {
    onSubmit() {
     
    },

  }
};
</script>

<style scoped>
</style>