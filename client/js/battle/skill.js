Vue.component('tattes-skill', {
	props: ['skill', 'stack'],
	template: `<div class="${Tattes.Skill.CONSTS.ID}">
		<div class="${Tattes.Skill.CONSTS.ID}-num">{{Number(skill.id) + 1}}</div>
		<div class="${Tattes.Skill.CONSTS.ID}-name">{{skill.name}}</div>
		<div class="${Tattes.Skill.CONSTS.ID}-count">
			<input type="number" v-model="this.stack" />
		</div>
		<div class="${Tattes.Skill.CONSTS.ID}-text">{{skill.effect}}</div>
	</div>`
});
