<template>
	<div class="invoices">
		<section class="hero is-small is-dark">
          <div class="hero-body">
            <div class="container">
              <h1 class="title">
                Les dettes
              </h1>
            </div>
          </div>
        </section>
        <section class="page-container">

            <b-field grouped>

                <b-field>
                    <b-field label="Choisi le type">
                        <b-select v-model="searchData.type" placeholder="Choisi le type" >
                      
                            <option v-for="(type, idx) in debtType" :key="idx"
                            :value='type'
                            >
                              {{type}}
                            </option>
                              
                        </b-select>
                    </b-field>
    
                    <b-field label="Rechercher">
                        <p class="control">
                            <b-button class="button is-primary" @click="sendSearch">Rechercher</b-button>
                        </p>
                    </b-field>
                </b-field>

            </b-field>

			<b-table
				searchable 
				hoverable
				narrowed
                :loading="loading"
				@click="clickInvoice"
	            :data="invoices"
	            :columns="columns">
	        </b-table>	    
		</section>

		<b-modal :active.sync="isUpdateInvoiceModalActive"
                 has-modal-card
                 trap-focus
                 full-screen
                 aria-role="dialog"
                 aria-modal>
            <CreateInvoice
                :data="data"
                :modelName="SaleInvoice"
                @submit="clearData"
                isDebt
                isModal>
            </CreateInvoice>
            
        </b-modal>

		<!-- <InvoicePreviewModal /> -->
	</div>
</template>

<script>
	import {ipcRenderer} from 'electron';
	import CreateInvoice from '@/components/CreateInvoice';
	export default {
		name: 'Debts',
		components: {
			CreateInvoice
		},
		methods: {
			clickInvoice(invoice) {
				this.data = invoice.dataValues;
				this.isUpdateInvoiceModalActive = true;
			},
            sendSearch() {
                this.loading = true;
                ipcRenderer.send('get_unpaid_invoices', this.searchData);
                ipcRenderer.on('unpaid_invoices', (event, invoices) => {
                  this.invoices = invoices;
                  this.loading = false;
                });
            },
            clearData() {
                this.data = null;
            }
		},
		data() {
			return {
                searchData: {
                    type: 'unpaid'
                },
                loading: true,
				isUpdateInvoiceModalActive: false,
				invoices: [],
				data: null,
                debtType: ['overdue', 'unpaid'],
				columns: [
                    {
                        field: 'dataValues.number',
                        label: 'Numero',
                        searchable: true,
                        centered: true
                    },
                    {
                        field: 'dataValues.date',
                        label: 'Date de la facture',
                        centered: true
                    },
                    {
                        field: 'dataValues.ntp',
                        label: 'Net A Payé',
                        centered: true
                    },
                    {
                        field: 'Client.dataValues.name',
                        label: 'Nom du Client',
                        centered: true
                    },
                    {
                        field: 'dataValues.debt_note',
                        label: 'Note',
                        centered: true
                    },
                    {
                        field: 'dataValues.debt_alarm_date',
                        label: 'Délai',
                        centered: true
                    }
                ],
			}    
		},
		computed: {

		},
		mounted() {
		    if (this.$parent.overdueCount > 0)
                this.searchData.type = 'overdue'
			this.sendSearch();
		}
	};
   
</script>