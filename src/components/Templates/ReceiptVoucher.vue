<template>
	<div class="invoice">
		<div class="container">
			<header>
				<div class="logo">
					<img src="{{{company.logo}}}" alt="" />
					
				</div>
				<div class="company-info">
					<div>
						<div>{{company.name}}</div>
						<div>{{company.address}}</div>
						<div>{{company.mobile}}</div>
					</div>		
				</div>
			</header>
			<main>
				<div class="title">
					<h3>BON DE RECU</h3>
				</div>
				<div class="invoice-info">
					<div>
						Reçu N: {{invoice.ID}}
					</div>
					<div>
						{{company.city}} le {{getYear invoice.date}}
					</div>
				</div>
				<div class="invoice-content">
					<p><b>Reçu de M:</b> {{invoice.client_name}}</p>
					<p><b>La somme de (DA): <span class="amount">{{invoice.amount}}</span></b></p>
					<p><b>La somme de (en lettres):</b> {{invoice.amount_text}}</p>
					<p><b>Motif:</b> {{invoice.motive}}</p>
					<p><b>Pour:</b> {{company.name}} ({{company.description}})</p>
				</div>
			</main>
			<footer>
				<div class="sign">Récépteur</div>
				<div class="sign">Préparé par</div>
			</footer>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'RecepitVoucherTemplate',
		props: [
			'data'
		],
	};
</script>
<style scoped>
	
</style>