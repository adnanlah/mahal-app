<template>
	<div>
		<header>
			<div>
				<h3 class="title">{{company.name}}</h3>
				<div>{{company.desciption}}</div>
				<div class="info">
					{{company.address}} {{company.city}} <br>
					Tél: {{company.phone}}. Fax {{company.fax}} <br>
					Capital: {{company.cap}}
				</div>
			</div>
			<div class="logo">
				<img src="{{{company.logo}}}" alt="" />
			</div>
					
		</header>
		<main>
			<div class="company">
				RC: {{company.rc}} - NIF: {{company.nif}} - AI: {{company.ai}} <br>
				NIS: {{company.nis}} - Cpte Bancaire BNA: {{company.bank_account}} <br>
			</div>
			<div class="base-info">
				<div class="account">
					<div class="doit">
						Doit a:
					</div>
					<div class="column">
						<b>Nom: </b>{{invoice.Supplier.dataValues.name}} <br>
						<b>Adresse: </b>{{invoice.Supplier.dataValues.name}} <br>
						<b>NRC: </b>{{invoice.Supplier.dataValues.name}} <br>
						<b>Art Imp: </b>{{invoice.Supplier.dataValues.name}} <br>
						<b>Id Fisc: </b>{{invoice.Supplier.dataValues.name}} <br>
					</div>
				</div>
				<div class="invoice-info">
					<div>
						<h3 class="title">Facture N: 123/2020</h3>
						Date: {{invoice.dataValues.date}} <br>
					</div>
				</div>
			</div>
			<table class="lines-table">
				<thead>
					<tr>
						<th>N</th>
						<th>Désignation</th>
						<th>U.N</th>
						<th>Qté</th>
						<th>Prix H.T</th>
						<th>Montant H.T</th>
					</tr>
				</thead>
				<tbody>
					{{#each invoice.Items}}
					<tr>
						<td>{{dataValues.ID}}</td>
						<td>{{dataValues.designation}}</td>
						<td>{{dataValues.product_unity}}</td>
						<td>{{dataValues.product_quantity}}</td>
						<td>{{dataValues.unity_price}}</td>
						<td>{{dataValues.product_amount}}</td>
					</tr>
					{{/each}}
				</tbody>
			</table>
			
			<div class="columns">
				<div>
					<p>Réglement: CHEQUE_N ........ du 28-10-2018</p>
					<p>Arrété la présente facture à la somme de: {{invoice.dataValues.ntp_text}}</p>
				</div>
				<table class="total">
					<tr>
						<td>Montant H.T</td>
						<td>{{invoice.dataValues.pretax_amount}}</td>
					</tr>
					<tr>
						<td>TVA de {{invoice.dataValues.tva_percentage}}(%)</td>
						<td>{{invoice.dataValues.tva}}</td>
					</tr>
					<tr>
						<td>Montant T.T.C</td>
						<td>{{invoice.dataValues.ttc}}</td>
					</tr>
					<tr>
						<td>Drois de timbres</td>
						<td>{{invoice.dataValues.timbres}}</td>
					</tr>
					<tr>
						<td>Remise</td>
						<td>{{invoice.dataValues.remise}}</td>
					</tr>
					<tr style="font-weight: 800">
						<td>NET A PAYER</td>
						<td>{{invoice.dataValues.ntp}}</td>
					</tr>
				</table>
	
			</div>
		</main>
		<footer>
			
			<p>
				MERCI DE NOUS AVOIR CHOISI
			</p>
		</footer>
	</div>
</template>
<script>
	export default {
		name: 'PurchaseInvoiceTemplate',
		props: [
			'data'
		],
	};
</script>
<style scoped>
	
</style>