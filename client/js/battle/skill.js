Vue.component('tattes-skill', {
	props: ['skill', 'stack'],
	data: function(){
		return {
			stackValue: Number(this.stack)
		};
	},
	template: `<div @click="onClick" class="${Tattes.Skill.CONSTS.ID}">
		<div class="${Tattes.Skill.CONSTS.ID}-num">{{Number(skill.id) + 1}}</div>
		<div class="${Tattes.Skill.CONSTS.ID}-name">{{skill.name}}</div>
		<div class="${Tattes.Skill.CONSTS.ID}-count">
			<input @change="updateStack" type="number" v-model="stack" />
		</div>
		<div class="${Tattes.Skill.CONSTS.ID}-text">{{skill.effect}}</div>
	</div>`,
	methods: {
		onClick: function() {
			let data = {
					name: this.skill.name
			};
			const regexpResult = Tattes.Skill.REGEXP.ATTACK_DICE.exec(this.skill.effect);
			if(regexpResult) {
				data.attack = Number(regexpResult[1]);
			}
			this.$emit(`${Tattes.Skill.CONSTS.ID}-events-sendInfo`, data);
		},
		updateStack: function(event) {
			this.$emit(`${Tattes.Skill.CONSTS.ID}-events-updateStack`, {
				index: this.skill.id,
				value: event.target.value
			});
		}
	}
});
