<template>
	<div class="inventory">
		<header>
			<div class="logo">
				<img src="img/logo.png" alt="">
			</div>
			<div class="company-info">
				<div>
					<div>ETS DJOUDI BOUAZA</div>
					<div>Lorem ipsum dolor sit amet.</div>
					<div>021 50 56 95 / 0775 55 55 55</div>
				</div>		
			</div>
		</header>
		<main>
			<h2 class="title">L'INVENTOIRE</h2>
			<h4 class="info">Imprimé le 03-11-2020 01:14</h4>
			<div class="inventory">
				<table>
					<tr>
						<th>ID</th>
						<th>Nom</th>
						<th>Description</th>
						<th>Marque</th>
						<th>Avg. Prix d'achat</th>
						<th>Prix de vente</th>
						<th>Quantité</th>
					</tr>
					<tr>
						<td>1</td>
						<td class="category" colspan="6">Catone</td>
					</tr>
					<tr>
						<td>2</td>
						<td>Lorem ipsum.</td>
						<td>Lorem ipsum.</td>
						<td>Lorem ipsum.</td>
						<td>Lorem ipsum.</td>
						<td>Lorem ipsum.</td>
						<td>Lorem ipsum.</td>
					</tr>
					<tr>
						<td>3</td>
						<td class="category" colspan="6">Lorem ipsum dolor sit.</td>
					</tr>
					<tr>
						<td>2</td>
						<td>Lorem ipsum.</td>
						<td>Lorem ipsum.</td>
						<td>Lorem ipsum.</td>
						<td>Lorem ipsum.</td>
						<td>Lorem ipsum.</td>
						<td>Lorem ipsum.</td>
					</tr>
				</table>
			</div>
		</main>
		<footer>
			
		</footer>
	</div>
</template>
<script>
	export default {
		name: 'InventoryTemplate',
		props: [
			'data'
		],
	};
</script>
<style scoped>
	
</style>