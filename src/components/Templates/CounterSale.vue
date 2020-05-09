<template functional>
	<div class="print">
		<div class="container">
			<header>
				<div class="logo">
					<img :src="props.company.image" alt="">
				</div>
				<h3>{{props.company.name}}</h3>
				<h4>Lorem ipsum dolor sit amet. {{props.company.city}}</h4>
			</header>
			<main>
				<div class="data-info">
					<div class="title">Bon de vente N: {{props.data.dataValues.id}}</div>
					<div>Djelfa le: {{props.data.dataValues.date}}</div>
				</div>
				<table class="lines-table">
					<tr>
						<th>N</th>
						<th>Code</th>
						<th>Produit</th>
						<th>Prix U</th>
						<th>Quantité</th>
						<th>Total</th>
					</tr>
					<tr v-for="(item, idx) in props.data.Items" :key="idx">
						<td>{{idx}}</td>
						<td>{{item.CounterSale_Product.dataValues.ProductId}}</td>
						<td>{{item.CounterSale_Product.dataValues.ProductId}}</td>
						<td>{{item.CounterSale_Product.dataValues.unity_price}}</td>
						<td>{{item.CounterSale_Product.dataValues.quantity}}</td>
						<td>{{item.CounterSale_Product.dataValues.amount}}</td>
					</tr>
				</table>
				<table class="total">
					<tr>
						<th>Total</th>
						<th>{{props.data.dataValues.ntp}}</th>
					</tr>
				</table>
			</main>
			<footer>
				<div>{{props.company.phone}}</div>
				<div>{{props.company.mobile}}</div>
				<div>{{props.company.email}}</div>
			</footer>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'CounterSale',
		props: [
			'data',
			'company'
		],
	};
</script>
<style scoped>
	@media print {
		.print {
			width: 10cm !important;
			min-width: 10cm !important;
			box-sizing: border-box;
		}
	}
	.print {
		font-size: 14px;
			width: 10cm !important;
		
			min-width: 3cm !important;
		padding: 15px 5px;
		box-sizing: border-box;
		border: 1px solid red;
	}
	header {
		margin: 15px auto;
		text-align: center;
	}
	h3, h4 {
		margin: 0;
	}
	footer {
		text-align: center;
		margin: 15px 0;
	}
	table.lines-table {
		width: 100%;
		margin-bottom: 10px;
	}
	table th, table td {
		text-align: center;
		padding: 5px;
	}
	table.total {
		margin: 0 auto;
	}
	
	.data-info {
		margin-bottom: 10px;
	}
	.container {
		
		border: 1px dashed darkgrey;
		padding: 15px 5px;
		box-sizing: border-box;
	}
	.title {
		font-weight: bold;
	}
</style>