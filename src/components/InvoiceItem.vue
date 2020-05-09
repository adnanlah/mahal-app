<template>
	<form @submit.prevent="onSubmit">
		<b-field grouped expanded>
			<b-field label="Code">
            	<b-input class="input-code" required v-model="input.ProductId"></b-input>
          	</b-field>
          	<b-field label="Produit" expanded>
	            <b-field>
		            <b-select
		            :loading="isLoading"
		            v-model="input.ProductId"
		            placeholder="Choisi un produit"
		            @input="productSelected"
		            required
		            expanded>
		            	<template v-if="productCategories && !isLoading">
							<optgroup v-for="(pc, idx) in productCategories" :key="idx" :label="pc.dataValues.name">
							<template v-for="(prod, idx2) in pc.Products">
							  <option
							      :class="{disabled: (!isPurchase && !prod.dataValues.quantity) || selected.includes(prod.dataValues.id)}"
							      :disabled="selected.includes(prod.dataValues.id) || (prod.dataValues.quantity == 0 && !isPurchase)"
							      :key="idx2"
							      :value="prod.dataValues.id">
							        {{prod.dataValues.name}}
							        {{!isPurchase ? '(Q: ' + prod.dataValues.quantity + ')' : ''}}
							  </option>
							</template>
							</optgroup>
		              </template>
		            </b-select>
		            <p class="control">
			            <b-button class="button is-link" icon-left="database-plus" @click="isProductModalActive = true"></b-button>
			        </p>
		        </b-field>        
          	</b-field>

          <b-field v-if="!isPurchase" label="Désignation">
            <b-input type="is-light" required v-model="input.designation"></b-input>
          </b-field>

          <b-field label="Unité">
            <b-input style="width: 60px;" required controls-position="compact" type="is-light" v-model="input.unity"></b-input>
          </b-field>

          <b-field label="Quantité">
            <b-numberinput
            controls-position="compact"
            type="is-dark"
            v-model.number="input.quantity"
            min="1"
            :max="(!isPurchase && productData) ? productData.quantity : 9999999"
            required></b-numberinput>
          </b-field>

          <b-field label="Prix d'unité (DA)">
            <b-input style="width: 120px;" v-model.number="input.unity_price" required></b-input>
          </b-field>

			<b-field label="Montant (DA)">
	            <b-input style="width: 120px;" controls-position="compact" type="is-light" v-model.number="input.amount" disabled></b-input>
	         </b-field>

          <b-field v-if="inputToEdit" label=" ‎">
          	<button type="submit" class="button is-link" > <b-icon icon="pencil"></b-icon> </button>
          </b-field>

          <b-field v-else label=" ‎">
            <button type="submit" class="button is-success" > <b-icon icon="plus"></b-icon> </button>
          </b-field>

          <b-field v-if="inputToEdit" label=" ‎">
            <b-button type="is-danger"  @click="onDelete">
				<b-icon icon="delete"></b-icon>
            	</b-button>
          </b-field>

          <b-field label=" ‎">
            <b-button type="reset" class="button is-warning"  @click="$emit('reset')">
				<b-icon icon="autorenew"></b-icon>
            	</b-button>
          </b-field>

          <b-modal :active.sync="isProductModalActive"
                 has-modal-card
                 trap-focus
                 aria-role="dialog"
                 @create="getAllProducts"
                 aria-modal>
            <product-modal-form :productCategories="productCategories"></product-modal-form>
        </b-modal>
	</b-field>

	
	</form>
</template>

<script>

class Input {
  constructor(item) {
    this.id = item ? item.id : 'fakeid' + Input.incrementId(),
    this.ProductId = item ? item.ProductId : '',
    this.unity_price = item ? item.unity_price : null,
    this.unity = item ? item.unity : 'U',
    this.quantity = item ? item.quantity : 1,
    this.amount = item ? item.amount : 0,
    this.productData = {};
  }

  static incrementId() {
    if (!this.latestId) this.latestId = 1;
    else this.latestId++;
    return this.latestId;
  }
}

import ProductModalForm from '@/components/ProductModalForm';
import {ipcRenderer} from 'electron';

export default {
	name: 'InvoiceItem',
	components: {
		ProductModalForm
	},
	data(){
		return {
			input: new Input(),
			isLoading: true,
			isProductModalActive: false,
			productData: null,
			productCategories: null,
		}
	},
	props: {
		isPurchase: {
			type: Boolean,
			required: true
		},
		inputToEdit: {
			type: Object,
			required: false,
			default: null
		},
		isDesignation: {
			type: Boolean,
			default: false
		},
		selected: {
			type: Array,
			required: true
		},
		selectedId: {
			type: Number,
			required: false,
			default: null,
		}
	},
	methods: {
		onSubmit() {
			if (this.inputToEdit)
				this.$emit('edit', this.input)
			else
				this.$emit('add', this.input)
			this.input = new Input();
		},
		onDelete() {
			this.$emit('delete', this.input)
			this.input = new Input();
		},
		setProductData() {
			this.productCategories.some((pc) => {
				return pc.Products.some((p) => {
					if (p.dataValues.id == this.input.ProductId)
						return this.productData = p.dataValues;
				})
			})
		},
		getAllProducts() {
			this.isLoading = true;
			ipcRenderer.send('get_all_products');

		    ipcRenderer.on('all_products', (event, products) => {
				this.isLoading = false;
		      this.productCategories = products;
		    })
		},
		productSelected() {
			this.setProductData();
			if (!this.isPurchase) {
				this.input.unity_price = this.productData.selling_price;
			}
			this.input.designation = this.productData.name;
			this.$emit('select', this.productData.image_path)
		}
	},
	computed: {
		
	},
	watch: {
		'selectedId': {
			immediate: true,
			handler: function(newId) {
				this.input.ProductId = newId;
			},
		},
		'input.quantity': {
			handler: function(after, before) {
				this.input.amount = Number(this.input.unity_price) * Number(after);
			},
			deep: true
		},
		'input.unity_price': {
			handler: function(after, before) {
				this.input.amount = Number(after) * Number(this.input.quantity);
			},
			deep: true
		},
		'productCategories': {
			immediate: true,
			handler: function(after, before) {
				if (after) {
					this.isLoading = false;
					if (this.input.ProductId)
						this.setProductData()
				}
			}
		}
	},
	mounted() {
	    this.getAllProducts();
	}
};
	
</script>

<style>
	input {
		text-align: center !important;
	}
	.disabled {
		color: lightgray !important;
		font-style: italic;
	}
</style>