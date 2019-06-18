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
			</div>
		</section>`,
		methods: {
			switchBouquet: function() {
				this.isBouquetShow = ! this.isBouquetShow;
			},
			sendChat: function(data) {
				data.name = this.bringer.name;
				this.$emit(`${Tattes.Bringer.CONSTS.ID}-events-sendchat`, data);
			}
		}
});
