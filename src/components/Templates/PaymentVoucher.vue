<template>
	<div class="invoice">
		<div class="container">
			<header>
				<div class="logo">
					<img src="{{{company.logo}}}" alt="" />
					
				</div>
				<div class="header-info">
					<div class="company-info">
						<div>ETS DJOUDI BOUAZA</div>
						<div>Lorem ipsum dolor sit amet.</div>
						<div>021 50 56 95 / 0775 55 55 55</div>
					</div>		
				</div>
			</header>
			<main>
				<div class="title">
					<h3>BON DE SORTIE DE CAISSE</h3>
				</div>
				<div class="invoice-info">
					<div>
						Bon N: 123
					</div>
					<div>
						Djelfa le 19-02-2020
					</div>
				</div>
				<div class="invoice-content">
					<p><b>Bénéficiare:</b> Lahrech Adnan</p>
					<p><b>La somme de (DA): <span class="amount">50,000</span></b></p>
					<p><b>La somme de (en lettres):</b> ciquante mille et troisant mill emil lemi lle mille</p>
					<p><b>Désignation:</b> kit omegle et preparation de un vehicule</p>
					<p><b>Pour:</b> ETS Djoudi Bouaza</p>
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
		name: 'PaymentVoucherTemplate',
		props: [
			'data'
		],
	};
</script>
<style scoped>
	
</style>