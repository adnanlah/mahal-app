<template>
	<div>
		<header>
			<h3>{{company.name}}</h3>
			<h3>{{company.address}}</h3>
			<h4>{{company.city}} le:{{date}}</h4>
		</header>
		<main>
			<h3>FACTURE PROFORMAT N:{{invoice.ID}}</h3>	
			<h4>DOIT: {{invoice.client}}</h4>
			<table class="lines-table">
				<tr>
					<th>N</th>
					<th>Désignation</th>
					<th>Unité</th>
					<th>Quantité</th>
					<th>Prix U (TTC)</th>
					<th>Total</th>
				</tr>
				<tr>
					<td>01</td>
					<td>Installation Kit GPL pour cherry</td>
					<td>Un</td>
					<td>01</td>
					<td>60 000,00</td>
					<td>60 000,00</td>
				</tr>
			</table>
			<table class="total">
				<tr>
					<td>Total-TTC</td>
					<td class="highlighted-td">60 000,00</td>
				</tr>
			</table>
			<div>
				La présente Facture est arrêtér à la sommes de en TTC: 
			</div>
		</main>
		<footer>
			<div>Le fournisseur: {{invoice.dataValues.Client.name}}</div>
		</footer>
	</div>
</template>
<script>
	export default {
		name: 'ProformatTemplate',
		props: [
			'data'
		],
	};
</script>
<style scoped>
	
</style>