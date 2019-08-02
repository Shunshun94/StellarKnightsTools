Vue.component('tattes-menu', {
	props: ['version', 'type'],
	data: function() {
		return {
			commands: Tattes.MENU.CONSTS.PAGES,
			activeTab: 0
		}
	},
	template: `<nav id="${Tattes.MENU.CONSTS.ID}">
			<span
				v-for="(command, index) in commands"
				v-bind:class="{ active: activeTab===index }"
				class="${Tattes.MENU.CONSTS.ID}-tab"
				v-show="(index!==1 || type !== '${Tattes.CONSTS.EMBRACE}') && (index===2 || type !== '${Tattes.CONSTS.VISITOR}') "
				v-on:click="changeTab(index)"
				>{{command}}</span>
			{{version}}
		</nav>`,
	methods: {
		changeTab: function(index) {
			this.activeTab = index; 
			this.$emit(`${Tattes.MENU.CONSTS.ID}-events-changetab`, index);
		}
	}
});
