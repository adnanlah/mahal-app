<template>
	<div class="logs">
		<section class="hero is-small is-dark">
          <div class="hero-body">
            <div class="container">
              <h1 class="title">
                Logs
              </h1>
            </div>
          </div>
        </section>
		<section class="page-container">
		<div class="logs-content">
			
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

                <b-field label="">    
                    <p class="control">
                        <b-button class="button is-link" icon-left="magnify" @click="sendSearch">Rechercher</b-button>
                    </p>
                </b-field>

            </b-field>

            <nav class="level">
			  <div class="level-item has-text-centered">
			    <div>
			      <p class="heading">Logs</p>
			      <p class="title">{{logsCount}}</p>
			    </div>
			  </div>
			  <div class="level-item has-text-centered">
			    <div>
			      <p class="heading">Succée</p>
			      <p class="title">{{successTotal}}</p>
			    </div>
			  </div>
			  <div class="level-item has-text-centered">
			    <div>
			      <p class="heading">Échecs</p>
			      <p class="title">{{failTotal}}</p>
			    </div>
			  </div>
			</nav>

			<b-table
				searchable 
				hoverable
				narrowed
	            :data="logs"
	            :columns="columns">
	        </b-table>
			
		</div>
		</section>
	</div>
</template>

<script>
	import {ipcRenderer} from 'electron';
	export default {
		name: 'Logs',
		components: {
			
		},
		data() {
			return {
				searchData: {
					fromDate: new Date(),
					toDate: new Date()
				},
				logs: [],
				data: null,
				columns: [
					{
                        field: 'dataValues.ID',
                        label: 'ID',
                        width: '15',
                        searchable: true,
                    },
					{
			      		label: 'Status',
                        width: '150',
			      		field: 'dataValues.status',
			      		sortable: true,
                        searchable: true,
			      	},
					{
			      		label: 'Log',
                        width: '150',
			      		field: 'dataValues.log',
			      		sortable: true,
                        searchable: true,
			      	},
			      	{
			      		label: 'Client',
			      		field: 'dataValues.createdAt',
			      		sortable: true,
                        searchable: true,
			      	},
				],
				isLoading: true,
			}    
		},
		computed: {
			logsCount() {
				return this.logs.length;
			},
			successTotal() {
				return this.logs.filter(r => r.dataValues.status == 'success').length;
			},
			failTotal() {
				return this.logs.filter(r => r.dataValues.status == 'fail').length;
			}
		},
		methods: {
		    sendSearch() {
		    	this.isLoading = true;
		    	ipcRenderer.send('get_logs', this.searchData);
		    	ipcRenderer.on('logs', (event, logs) => {
					this.logs = logs;
					this.isLoading = false;
				});
		    }
		},
		mounted() {
			this.sendSearch();
		}
	};
</script>