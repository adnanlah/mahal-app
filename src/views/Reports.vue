<template>
	<div class="repports">
		<section class="hero is-small is-dark">
          <div class="hero-body">
            <div class="container">
              <h1 class="title">
                Les rapports
              </h1>
            </div>
          </div>
        </section>
		<section class="page-container">
			<b-tabs>
		      <b-tab-item label="La caisse">
		          <div class="container">
					  <div class="notification">
					    This container is <strong>centered</strong> on desktop.
					  </div>
					</div>

		      </b-tab-item>
		      <b-tab-item label="Les statistiques">

				<nav class="level">
				  <div class="level-item has-text-centered">
				    <div>
				      <p class="heading">Tweets</p>
				      <p class="title">3,456</p>
				    </div>
				  </div>
				  <div class="level-item has-text-centered">
				    <div>
				      <p class="heading">Following</p>
				      <p class="title">123</p>
				    </div>
				  </div>
				  <div class="level-item has-text-centered">
				    <div>
				      <p class="heading">Followers</p>
				      <p class="title">456K</p>
				    </div>
				  </div>
				  <div class="level-item has-text-centered">
				    <div>
				      <p class="heading">Likes</p>
				      <p class="title">789</p>
				    </div>
				  </div>
				</nav>

		      </b-tab-item>
		    </b-tabs>
		</section>
	</div>
</template>

<script>
	import {ipcRenderer} from 'electron';
	export default {
		name: 'Reports',
		components: {
			
		},
		data() {
			return {
				searchData: {
					fromDate: new Date(),
					toDate: new Date(),
				},
				cash: {
					cash: null,
					
				}
			}    
		},
		computed: {
			
		},
		methods: {
			
		},
		mounted() {
			ipcRenderer.send('get_cash')
			ipcRenderer.send('cash')
		}
	};
</script>