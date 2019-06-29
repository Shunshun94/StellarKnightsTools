Vue.component('tattes-charge-dice', {
	props: ['dice', 'index'],
	data: function(){
		return {
			diceValue: Number(this.dice)
		};
	},
	template: `<input type="number" class="${Tattes.ChargeDice.CONSTS.ID}" v-model="diceValue" min="1" max="6" />`,
	watch: {
		diceValue: function(val) {
			this.$emit(`${Tattes.ChargeDice.CONSTS.ID}-update`, {
				index: this.index, value: this.diceValue
			});
		}
	}
});
