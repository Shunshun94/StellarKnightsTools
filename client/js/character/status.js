Vue.component('tattes-character-status', {
	props: [
		'character', 'hopedespair', 'personalflower', 'keyword', 'note',
		'isBringer', 'id'],
	template: `<div class="${Tattes.Character.Status.CONSTS.ID}">
	<div class="${Tattes.Character.Status.CONSTS.ID}-image"
		v-bind:style="imageUrl"></div>
	<div class="${Tattes.Character.Status.CONSTS.ID}-baseinfo">
		<span class="${Tattes.Character.Status.CONSTS.ID}-type">
			<span>{{hopedespair.choice}}${Tattes.Character.Status.CONSTS.NO_STELLARKNIGHT}</span>
		</span>
		<hr/>
		<span class="${Tattes.Character.Status.CONSTS.ID}-personalFlower">
			<span class="${Tattes.Character.Status.CONSTS.ID}-personalFlower-label">${Tattes.Character.Status.CONSTS.PERSONALFLOWER}：</span><span class="${Tattes.Character.Status.CONSTS.ID}-personalFlower-color">{{personalflower.color}}</span>${Tattes.Character.Status.CONSTS.OF}<span class="${Tattes.Character.Status.CONSTS.ID}-personalFlower-flower">{{personalflower.essence}}</span>
		</span>
		<hr/>
		<span class="${Tattes.Character.Status.CONSTS.ID}-character">
			<span class="${Tattes.Character.Status.CONSTS.ID}-character-value">{{character["1st"]}}${Tattes.Character.Status.CONSTS.AND}{{character["2nd"]}}</span>
		</span>
		<hr/>
		<span class="${Tattes.Character.Status.CONSTS.ID}-keyword">
			<span class="${Tattes.Character.Status.CONSTS.ID}-keyword-value">{{keyword}}</span>
		</span>	
	</div>

	<div class="${Tattes.Character.Status.CONSTS.ID}-note">{{note}}</div>
	</div>`,
	computed: {
		imageUrl: function() {
			return `background-image:url('${Tattes.Character.Status.CONSTS.IMAGE_PATH}${this.id}${this.isBringer ? '' : Tattes.Character.Status.CONSTS.SHEATH_IMAGEKEY}')`;
		}
	}
});

Tattes.Character.Status.FUNCS = {};

