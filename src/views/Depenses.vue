<template>
	<div class="depenses">
		<section class="hero is-small is-dark">
          <div class="hero-body">
            <div class="container">
              <h1 class="title">
                Depenses
              </h1>
            </div>
          </div>
        </section>
		<section class="page-container">
			
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
                        <b-button class="button is-primary" @click="sendSearch">Rechercher</b-button>
                    </p>
                </b-field>

            </b-field>

			<!-- <form @submit.prevent="">
				<div v-for="(input, index) in inputs" :key="index">
					<select name="" id="" v-model="input.DepenseUseID">
						<option v-for="(job, idx) in depenseUses" :key="idx" :value="job.ID">{{job.title}}</option>
					</select>
					<input type="text" placeholder="Prix" v-model="input.price">
					<button @click="deleteRow(index)">Delete</button>
				</div>
				<div>
					<button @click="addRow">Ajouter row</button>
				</div>
				<div>
			        <button @click="onCreateRecettes">Enregistrer</button>
			    </div>
			</form> -->

			<b-table
				searchable 
				hoverable
				narrowed
				@click="clickDepense"
	            :data="depenses"
	            :columns="columns">
	        </b-table>
			
		
		</section>
		<b-modal :active.sync="isEditDepenseModalActive"
                 has-modal-card
                 trap-focus
                 full-screen
                 aria-role="dialog"
                 :loading="loading"
                 aria-modal>
            <DepenseModalForm :data="data"></DepenseModalForm>
        </b-modal>

	</div>
</template>

<script>
	import {ipcRenderer} from 'electron';
	import DepenseModalForm from '@/components/DepenseModalForm';
	export default {
		name: 'Depenses',
		components: {
			DepenseModalForm
		},
		data() {
			return {
				searchData: {
					fromDate: new Date(),
					toDate: new Date()
				},
				depenses: [],
				data: null,
				columns: [
					{
                        field: 'dataValues.ID',
                        label: 'ID',
                        width: '10',
                        numeric: true,
                        searchable: true,
                    },
					{
			      		label: 'Depense',
			      		field: 'depense',
			      		sortable: true,
			      	},
			      	{
			      		label: 'Montant',
			      		field: 'amount',
			      		sortable: true,
			      	}
				],
				loading: true,
				isEditDepenseModalActive: false,
			}    
		},
		computed: {

		},
		methods: {
			clickDepense(depense) {
				this.data = depense;
				this.isEditDepenseModalActive = true;
			},
		    sendSearch() {
		    	this.loading = true;
		    	ipcRenderer.send('get_depenses', this.searchData);
		    	ipcRenderer.on('depenses', (event, depenses) => {
					this.depenses = depenses;
					this.loading = false;
				});
		    }
		},
		mounted() {
			this.sendSearch();
		}
	};
</script>