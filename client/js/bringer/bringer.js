Vue.component('tattes-bringer', {
	props: ['bringer', 'chat'],
	template: `
		<section id="${Tattes.Bringer.CONSTS.ID}">
			<h2 id="${Tattes.Bringer.CONSTS.ID}-name">{{bringer.name}}</h2>
			<common-chat
				v-on:${Tattes.Chat.CommonChat.CONSTS.ID}-events-sendChat="sendChat"
				v-bind:chat="chat"></common-chat>
			<tattes-character-status
				v-bind:character="bringer.character"
				v-bind:hopedespair="bringer.hopedespair"
				v-bind:personalflower="bringer.personalflower"
				v-bind:keyword="bringer.keyword"
				v-bind:note="bringer.phrase"
				v-bind:id="bringer.id"
				v-bind:isBringer="bringer.isBringer"
			></tattes-character-status>
		</section>`,
		methods: {
			sendChat: function(data) {
				data.name = this.bringer.name;
				this.$emit(`${Tattes.Bringer.CONSTS.ID}-events-sendchat`, data);
			}
		}
});
