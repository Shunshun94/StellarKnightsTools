Vue.component('tattes-bringer', {
	props: ['bringer', 'chat'],
	data: function() {
		return {
			isBouquetShow: false
		}
	},
	computed: {
		chatLog: function() {
			if(this.isBouquetShow) {
				return {
					log: this.chat.log.filter((p)=>{return p[1].channel !== 1})
				}
			} else {
				return this.chat;
			}
		},
		switchBouquetText: function() {
			return this.isBouquetShow ? Tattes.Bringer.CONSTS.BOUQUET_ON : Tattes.Bringer.CONSTS.BOUQUET_OFF;
		}
	},
	template: `
		<section id="${Tattes.Bringer.CONSTS.ID}">
			<h2 id="${Tattes.Bringer.CONSTS.ID}-name">{{bringer.name}}</h2>
			<common-chat
				v-on:${Tattes.Chat.CommonChat.CONSTS.ID}-events-sendChat="sendChat"
				v-on:${Tattes.Chat.CommonChat.CONSTS.ID}-events-receptBouquet="receptBouquet"
				v-bind:chat="chatLog"></common-chat>
			<tattes-character-status
				v-bind:character="bringer.character"
				v-bind:hopedespair="bringer.hopedespair"
				v-bind:personalflower="bringer.personalflower"
				v-bind:keyword="bringer.keyword"
				v-bind:note="bringer.phrase"
				v-bind:id="bringer.id"
				v-bind:isBringer="bringer.isBringer"
			></tattes-character-status>
			<div id="${Tattes.Bringer.CONSTS.ID}-config">
				<button @click="switchBouquet">{{switchBouquetText}}</button>
				<hr/>
				<h3>${Tattes.Bringer.CONSTS.BOUQUET}</h3>
				<input id="${Tattes.Bringer.CONSTS.ID}-config-bouquet-count" v-model="bringer.bouquet" type="number" />
				<p id="${Tattes.Bringer.CONSTS.ID}-config-bouquet-explanation">${Tattes.Bringer.CONSTS.BOUQUET_HOW_TO_GET}</p>
				<button id="${Tattes.Bringer.CONSTS.ID}-config-bouquet-shareCount"
					@click="shareBouquetCount">${Tattes.Bringer.CONSTS.BOUQUET_SHARE_COUNT}</button>
			</div>
		</section>`,
		methods: {
			receptBouquet: function(count) {
				this.bringer.bouquet = Number(this.bringer.bouquet) + Number(count);
			},
			shareText: function(e) {},
			switchBouquet: function() {
				this.isBouquetShow = ! this.isBouquetShow;
			},
			shareBouquetCount: function() {
				const data = {
						message: `${Tattes.Bringer.CONSTS.BOUQUET} ${this.bringer.bouquet}`,
						channel: 0,
						name: this.bringer.name
				};
				this.$emit(`${Tattes.Bringer.CONSTS.ID}-events-sendchat`, data);
				alertify.success(Tattes.Bringer.CONSTS.BOUQUET_SHARED_COUNT);
			},
			sendChat: function(data) {
				data.name = this.bringer.name;
				this.$emit(`${Tattes.Bringer.CONSTS.ID}-events-sendchat`, data);
			}
		}
});
