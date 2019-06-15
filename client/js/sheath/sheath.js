Vue.component('tattes-sheath', {
	props: ['sheath', 'chat'],
	template: `
		<section id="${Tattes.Sheath.CONSTS.ID}">
			<h2 id="${Tattes.Sheath.CONSTS.ID}-name">{{sheath.name}}</h2>
			<common-chat v-bind:chat="chat"></common-chat>
			<tattes-character-status
				v-bind:character="sheath.character"
				v-bind:hopedespair="sheath.hopedespair"
				v-bind:personalflower="sheath.personalflower"
				v-bind:keyword="sheath.keyword"
				v-bind:note="sheath.phrase"
				v-bind:id="sheath.id"
				v-bind:isBringer="sheath.isBringer"
			></tattes-character-status>
		</section>`
});