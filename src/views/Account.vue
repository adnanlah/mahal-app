<template>
	<div class="clients">
		<section class="hero is-small is-dark">
          <div class="hero-body">
            <div class="container">
              <h1 class="title">
                Clients et Fournisseurs
              </h1>
            </div>
          </div>
        </section>
    	<section class="page-container">
    		<div class="menu-bar">
				<b-field label="Choisi le type du compte">
					<b-select name="type" v-model="filterType">
						<option value="client">Clients</option>
						<option value="supplier">Fournisseurs</option>
					</b-select>
				</b-field>

				<b-field label="Rechercher par code">
					<b-input name="type" v-model="filterCode" placeholder="C0001, F0002.." v-uppercase>
					</b-input>
				</b-field>

				<b-field label="">
					<b-button class="button is-link" icon-left="magnify" @click="sendSearch">Rechercher</b-button>
				</b-field>

				<b-button type="is-link" icon-left="account-plus" @click="isAccountModalActive = true">
		            Ajouter un Client/Fournisseur
		        </b-button>
    		</div>

			<b-table
			hoverable
	            :data="filteredAccounts"
	            @click="clickAccount"
	            :columns="columns">
	        </b-table>

	        <b-modal :active.sync="isAccountModalActive"
	                 has-modal-card
	                 trap-focus
	                 aria-role="dialog"
	                 aria-modal>
	            <AccountModalForm :type="type" :data="data"></AccountModalForm>
	        </b-modal>
			
		</section>
	</div>
</template>

<script>
	import {ipcRenderer} from 'electron';
	import AccountModalForm from '@/components/AccountModalForm';
	export default {
		name: 'Account',
		components: {
			AccountModalForm
		},
		data() {
			return {
				data: null,
				columns: [
					{
			      		label: 'Type',
			      		field: 'type',
			      		sortable: true,
			      		type: "String",
			      		searchable: true
			      	},
					{
			      		label: 'Nom',
			      		field: 'name',
			      		sortable: true,
			      		type: "String",
			      		searchable: true
			      	},
			      	{
			      		label: 'Informations',
			      		field: 'info',
			      		sortable: true,
			      		type: "String",
			      		searchable: true
			      	}
				],
                isAccountModalActive: false,
				filterType: 'client',
				filterCode: 'client',
			}    
		},
		computed: {
			accounts() {
				return this.$store.getters.INDIVIDUALS;
			},
			filteredAccounts() {
				return this.accounts.filter((acc) => {
					return acc.code == this.filterCode && acc.type == this.filterCode;
				})
			},
		},
		methods: {
			clickAccount(account) {
				this.data = account;
				this.isAccountModalActive = true;
			},
			clearData() {
				this.data = null;
			}

		},
	};
</script>