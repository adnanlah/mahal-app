<template>
	<div class="recettes">
		<section class="hero is-small is-dark">
          <div class="hero-body">
            <div class="container">
              <h1 class="title">
                Recettes
              </h1>
            </div>
          </div>
        </section>
		<section class="page-container">
		<div class="recettes-content">
			
			<b-field grouped>

                <b-field label="De la date">
                    <b-datepicker
                        placeholder="Choisi la date.."
                        icon="calendar-today"
                        v-model="searchData.fromDate">
                    </b-datepicker>
                </b-field>

                <b-field label="Jusqu'a la date">
                    <b-datepicker
                        placeholder="Choisi la date.."
                        icon="calendar-today"
                        v-model="searchData.toDate">
                    </b-datepicker>

                    
                </b-field>

                <b-field label="Rechercher">    
                    <p class="control">
                        <b-button class="button is-link" icon-left="magnify" @click="sendSearch">Rechercher</b-button>
                    </p>
                </b-field>

                <b-field label="Ajouter">    
                    <p class="control">
                        <b-button class="button is-success" icon-left="database-plus" @click="isUpdateRecetteModalActive = true;">Ajouter une recette</b-button>
                    </p>
                </b-field>

            </b-field>

            <nav class="level">
			  <div class="level-item has-text-centered">
			    <div>
			      <p class="heading">Recettes</p>
			      <p class="title">{{recettesCount}}</p>
			    </div>
			  </div>
			  <div class="level-item has-text-centered">
			    <div>
			      <p class="heading">Montant total</p>
			      <p class="title">{{amountTotal}}</p>
			    </div>
			  </div>
			</nav>

			<b-table
				searchable 
				hoverable
				narrowed
				@click="activateModal"
	            :data="recettes"
	            :columns="columns">
	        </b-table>
			
		</div>
		</section>
		<b-modal :active.sync="isUpdateRecetteModalActive"
                 has-modal-card
                 trap-focus
                 aria-role="dialog"
                 :loading="isLoading"
                 @close="clearData"
                 aria-modal>
            <RecetteModalForm :data="data"></RecetteModalForm>
        </b-modal>

	</div>
</template>

<script>
	import {ipcRenderer} from 'electron';
	import RecetteModalForm from '@/components/RecetteModalForm';
	export default {
		name: 'Recettes',
		components: {
			RecetteModalForm
		},
		data() {
			return {
				searchData: {
					fromDate: new Date(),
					toDate: new Date()
				},
				recettes: [],
				data: null,
				columns: [
					{
                        field: 'dataValues.ID',
                        label: 'ID',
                        width: '15',
                        searchable: true,
                    },
					{
			      		label: 'Recette',
                        width: '150',
			      		field: 'dataValues.motive',
			      		sortable: true,
                        searchable: true,
			      	},
			      	{
			      		label: 'Client',
			      		field: 'dataValues.client_name',
			      		sortable: true,
                        searchable: true,
			      	},
			      	{
			      		label: 'La date',
			      		field: 'dataValues.date',
			      		sortable: true,
                        searchable: true,
			      	},
			      	{
			      		label: 'Montant',
			      		field: 'dataValues.amount',
			      		sortable: true,
                        searchable: true,
			      	},
				],
				isLoading: true,
				isUpdateRecetteModalActive: false,
			}    
		},
		computed: {
			recettesCount() {
				return this.recettes.length;
			},
			amountTotal() {
				return this.recettes.map(r => r.dataValues.amount).reduce((a, b) => a + b, 0);
				// return this.recettes.reduce((a, b) => Number(a.dataValues.amount) + Number(b.dataValues.amount), {dataValues:{amount: 0}});
			}
		},
		methods: {
			activateModal(recette) {
				this.data = recette.dataValues;
				this.isUpdateRecetteModalActive = true;
			},
			clearData() {
				this.data = null;
			},
		    sendSearch() {
		    	this.isLoading = true;
		    	ipcRenderer.send('get_recettes', this.searchData);
		    	ipcRenderer.on('recettes', (event, recettes) => {

					this.recettes = recettes;
					this.isLoading = false;
				});
		    }
		},
		mounted() {
			this.sendSearch();
		}
	};
</script>