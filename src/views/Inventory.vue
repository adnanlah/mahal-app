<template>
	<div class="inventory">
		<section class="hero is-small is-dark">
					<div class="hero-body">
						<div class="container">
							<h1 class="title">
								Inventaire
							</h1>
						</div>
					</div>
				</section>
				<section class="page-container">
						<div class="menu-bar">
								<b-field grouped>
										<b-field label="Filtrer par code">
												<b-input :value="filterCode" v-cleave="masks.creditCard"></b-input>
										</b-field>

										<b-field label=" ‎">
										<b-button type="is-success" icon-left="database-plus" @click="isProductModalActive = true">
														Ajouter un produit
												</b-button>
										</b-field>

										<b-field label=" ‎">
										<b-button type="is-link" icon-left="printer" @click="printInventory">
														Imprimer l'inventaire
												</b-button>
										</b-field>

										<b-field label=" ‎">
												<b-button type="is-link" icon-left="printer" @click="printTickets">
														Imprimer les tickets
												</b-button>
										</b-field>
								</b-field>
						</div>

						<b-table
								:data="productCategories"
								ref="table"
								detailed
								hoverable
								custom-detail-row
								checkable
								:default-sort="['name', 'asc']"
								detail-key="name">

								<template slot-scope="props">
										<b-table-column
												field="name"
												:label="columnsVisible['name'].title"
												width="300"
												sortable
										>
												{{ props.row.dataValues.name }}
										</b-table-column>

										<b-table-column
												field="sold"
												:label="columnsVisible['code'].title"
												sortable
												centered
										>
												
										</b-table-column>

										<b-table-column
												field="sold"
												:label="columnsVisible['average_purchase_price'].title"
												sortable
												centered
										>
												
										</b-table-column>

										<b-table-column
												field="available"
												:label="columnsVisible['selling_price'].title"
												sortable
												centered
										>
												
										</b-table-column>

										<b-table-column
												:label="columnsVisible['brand'].title"
												centered
										>
												
										</b-table-column>
										<b-table-column
												:label="columnsVisible['quantity'].title"
												centered
										>
												
										</b-table-column>
								</template>

								<template slot="detail" slot-scope="props">
										<tr v-for="item in props.row.dataValues.Products" :key="item.dataValues.ID" @click="clickProduct(item)">
												<td v-if="showDetailIcon"></td>
												<td>&nbsp;&nbsp;&nbsp;&nbsp;{{ item.dataValues.name }}</td>
												<td class="has-text-centered">{{ item.dataValues.ID }}</td>
												<td class="has-text-centered">{{ item.dataValues.average_purchase_price }}</td>
												<td class="has-text-centered">{{ item.dataValues.selling_price }}</td>
												<td class="has-text-centered">{{ item.dataValues.brand }}</td>
												<td class="has-text-centered">{{ item.dataValues.quantity }}</td>
										</tr>
								</template>
						</b-table>
				</section>
				<b-modal :active.sync="isProductModalActive"
								 has-modal-card
								 trap-focus
								 aria-role="dialog"
								 aria-modal
					@close="clearData"
								 >
						<product-modal-form :data="data" :productCategories="productCategories"></product-modal-form>
				</b-modal>
										
				
	</div>
</template>

<script>
	import Cleave from 'cleave.js';
	const cleave = {
		name: 'cleave',
		bind(el, binding) {
			const input = el.querySelector('input')
			input._vCleave = new Cleave(input, binding.value)
		},
		update(el, binding) {
			const input = el.querySelector('input')
			input._vCleave.destroy()
			input._vCleave = new Cleave(input, binding.value)
		},
		unbind(el) {
			const input = el.querySelector('input')
			input._vCleave.destroy()
		}
	}
	import {ipcRenderer} from 'electron';
	import ProductModalForm from '@/components/ProductModalForm';
	import { EventBus } from '@/utils/event-bus.js';

	export default {
		name: 'Inventory',
			directives: { cleave },
		components: {
			ProductModalForm
		},
		computed: {
			
		},
		data() {
			return {
				data: null,
				isLoading: false,
				showDetailIcon: true,
				isProductModalActive: false,
				productCategories: [],
				filterCode: '',
				columnsVisible: {
					name: { title: 'Nom', display: true },
					code: { title: 'Code', display: true },
					average_purchase_price: { title: "Avg. Prix d'achat", display: true },
					selling_price: { title: 'Prix de vente', display: true },
					brand: { title: 'Marque', display: true },
					quantity: { title: 'Quantité', display: true },
				},
				masks: {
					creditCard: { uppercase: true, blocks: [0, 9] },
				}
			}    
		},
		methods: {
			filteredProductCategories() {
				// this.productCategories.map((pc) => {
				//     return pc.Products.some((p) => {
				//         if (p.dataValues.ID == this.filterCode)
				//             return this.productData = p.dataValues;
				//     })
				// })
			},
			onInput(event) {
					this.filterCode = event.target._vCleave.getFormattedValue()
			},
			toggle(row) {
					this.$refs.table.toggleDetails(row)
			},
			clickProduct(product) {
				this.data = product.dataValues;
				this.isProductModalActive = true;
			},
			clearData() {
				this.data = null;
			},
			printInventory() {
				ipcRenderer.send('create-pdf', {data: this.productCategories, doc: 'Inventory'})
			},
			printInventory() {
				console.log('create-pdf ', {data: this.productCategories, doc: 'Tickets'})
			}
		},
		mounted() {
			ipcRenderer.send('get_all_products');
			ipcRenderer.on('all_products', (event, productCategories) => {
				this.isLoading = true;
				this.productCategories = productCategories;
			});
			ipcRenderer.on('pdf-created', (event, r) => {
				if (r.status)
					EventBus.$emit('open-pdf-viewer', r.pdfFile);
				else
					this.failToast(r.message)
			});
		}
	};
</script>