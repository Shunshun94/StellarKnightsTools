Vue.component('tattes-sheath', {
	props: ['sheath', 'chat'],
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
		<section id="${Tattes.Sheath.CONSTS.ID}">
			<h2 id="${Tattes.Sheath.CONSTS.ID}-name">{{sheath.name}}</h2>
			<common-chat
				v-on:${Tattes.Chat.CommonChat.CONSTS.ID}-events-sendChat="sendChat"
				v-bind:chat="chatLog"></common-chat>
			<tattes-character-status
				v-bind:character="sheath.character"
				v-bind:hopedespair="sheath.hopedespair"
				v-bind:personalflower="sheath.personalflower"
				v-bind:keyword="sheath.keyword"
				v-bind:note="sheath.phrase"
				v-bind:id="sheath.id"
				v-bind:isBringer="sheath.isBringer"
			></tattes-character-status>
			<div id="${Tattes.Sheath.CONSTS.ID}-config">
				<button @click="switchBouquet">{{switchBouquetText}}</button>
			</div>
		</section>`,
		methods: {
			switchBouquet: function() {
				this.isBouquetShow = ! this.isBouquetShow;
			},
			sendChat: function(data) {
				data.name = this.bringer.name;
				this.$emit(`${Tattes.Sheath.CONSTS.ID}-events-sendchat`, data);
			}
		}
});