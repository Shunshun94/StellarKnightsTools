Vue.component('tattes-charge-dice', {
	props: ['dice', 'index'],
	template: `<input
		type="number"
		class="${Tattes.ChargeDice.CONSTS.ID}"
		@change="updateChargeDiceValue"
		v-model="dice"
		min="1"
		max="6" />`,
	methods: {
		updateChargeDiceValue: function(event) {
			this.$emit(`${Tattes.ChargeDice.CONSTS.ID}-update`, {
				index: this.index, value: event.target.value
			});
		}
	}
});
