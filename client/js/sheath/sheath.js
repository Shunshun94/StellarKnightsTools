Vue.component('tattes-sheath', {
	props: ['sheath'],
	template: `
		<section id="${Tattes.Sheath.CONSTS.ID}">
			<h2 id="${Tattes.Sheath.CONSTS.ID}-name">{{sheath.name}}</h2>
			<tattes-character-status
				v-bind:character="sheath.character"
				v-bind:hopedespair="sheath.hopedespair"
				v-bind:personalflower="sheath.personalflower"
				v-bind:note="sheath.phrase"
				v-bind:id="sheath.id"
				v-bind:isBringer="sheath.isBringer"
			></tattes-character-status>
		</section>`
});