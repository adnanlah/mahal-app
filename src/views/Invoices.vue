<template>
	<div class="invoices">
		<section class="hero is-small is-dark">
          <div class="hero-body">
            <div class="container">
              <h1 class="title">
                Les factures
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

                <b-field>
                    <b-field label="Choisi le type">
                    <b-select v-model="searchData.modelName" placeholder="Choisi le type" >
                  
                        <option v-for="(invoice, idx) in invoiceTypes" :key="idx"
                        :value='invoice.modelName'
                        >
                          {{invoice.title}}
                        </option>
                          
                    </b-select>
                    </b-field>
    
                    <b-field label="‎‎‎‎‎‎‎‏‏‎ ‎">
                        <p class="control">
                            <b-button class="button is-link" icon-left="magnify" @click="sendSearch">Rechercher</b-button>
                        </p>
                    </b-field>
    
                    <b-field label=" ‎">
                        <b-button class="button is-primary" icon-left="printer" @click="print">Imprimer</b-button>
                    </b-field>
                </b-field>

            </b-field>

			<b-table
				searchable 
				hoverable
				narrowed
				@click="clickInvoice"
	            :data="invoices"
	            :columns="columns">
	        </b-table>	    
		</section>

		<b-modal :active.sync="isEditInvoiceModalActive"
            has-modal-card
            trap-focus
            full-screen
            aria-role="dialog"
            aria-modal>
            <CreateInvoice
                isModal
                isUpdateProp
                :data="data"
                :modelName="searchData.modelName"
            ></CreateInvoice>
        </b-modal>

		<!-- <InvoicePreviewModal /> -->
	</div>
</template>

<script>
	import {ipcRenderer} from 'electron';
	import CreateInvoice from '@/components/CreateInvoice';
	export default {
		name: 'Invoices',
		components: {
			CreateInvoice
		},
		methods: {
			clickInvoice(invoice) {
				this.data = invoice.dataValues;
				this.isEditInvoiceModalActive = true;
			},
            sendSearch() {
                ipcRenderer.send('search_invoices', this.searchData);
                ipcRenderer.on('searched_invoices', (event, invoices) => {
                  this.invoices = invoices;
                });
            },
            print() {
                console.log('printing ', this.invoices.length, ' invoices')
                
            }
		},
		data() {
			return {
                searchData: {
                    fromDate: new Date(),
                    toDate: new Date(),
                    modelName: 'SaleInvoice',
                    isPurchase: false
                },
                
				isEditInvoiceModalActive: false,
				invoices: [],
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
                        field: 'dataValues.number',
                        label: 'number',
                        searchable: true,
                        centered: true
                    },
                    {
                        field: 'dataValues.ntp',
                        label: 'N.A.P',
                        centered: true
                    },
                    {
                        field: 'Supplier.dataValues.name',
                        label: 'Fournisseur',
                        centered: true
                    },
                    {
                        field: 'dataValues.date',
                        label: 'date',
                        centered: true
                    }
                ],
                invoiceTypes: [
                    {
                        modelName: 'PurchaseInvoice',
                        title: "Facture d'achats",
                        isPurchase: true,
                    },
                    {
                        modelName: 'SaleInvoice',
                        title: "Facture de ventes",
                        isPurchase: false,
                    },
                    {
                        modelName: 'CounterSale',
                        title: "Vente comptoir",
                        isPurchase: false,
                    },
                    {
                        modelName: 'Proformat',
                        title: "Les proformats",
                        isPurchase: false,
                    },
                    {
                        modelName: 'PurchaseOrder',
                        title: "Commandes d'achats",
                        isPurchase: true,
                    },
                    {
                        modelName: 'SaleOrder',
                        title: "Commandes de ventes",
                        isPurchase: false,
                    },
                ],
			}    
		},
        watch: {
            'searchData.modelName':{
              handler: function(after, before) {
                this.searchData.isPurchase = this.invoiceTypes.filter(it => it.modelName == after)[0].isPurchase;
              },
              deep: true
            }
        },
		computed: {

		},
		mounted() {
			this.sendSearch();
		    
		}
	};

    
    ipcRenderer.on('all_invoices', (event, invoices) => {
      this.invoices = invoices;
    });

    
</script>