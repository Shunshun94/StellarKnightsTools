Vue.component('tattes-audience', {
	props: ['chat', 'plname'],
	data: function() {
		return {
			text: '',
			channel: 1,
			thrownBouquet: 0,
			thrownBouquetTotal: 0,
			name: this.plname
		};
	},
	template: `
		<section id="${Tattes.Audience.CONSTS.ID}">
			<h2 id="${Tattes.Audience.CONSTS.ID}-title">${Tattes.Audience.CONSTS.TITLE}</h2>
			<div id="${Tattes.Audience.CONSTS.ID}-bouquetchat">
				<div class="${Tattes.Chat.CommonChat.CONSTS.ID}-input">
					<select @change="updateTab" v-model="channel" class="${Tattes.Chat.CommonChat.CONSTS.ID}-input-channel">
						<option value="1">${Tattes.Chat.CommonChat.CONSTS.TABS[1]}</option>
						<option value="2">${Tattes.Chat.CommonChat.CONSTS.TABS[2]}</option>
						<option value="0">${Tattes.Chat.CommonChat.CONSTS.TABS[0]}</option>
					</select>
					<p class="${Tattes.Audience.CONSTS.ID}-input-name">${Tattes.Audience.CONSTS.NAME}:<input type="text" v-model="name" /></p>
					<textarea 
						placeholder="${Tattes.Chat.CommonChat.CONSTS.INPUTAREA}"
						v-model="text"
						@keydown.enter="submit"
						@keydown.ctrl.66="insertText('${Tattes.Audience.CONSTS.TEXTS.BOUQUET}');channel=1;"
						:class="inputTextClass"></textarea>
					<p class="${Tattes.Chat.CommonChat.CONSTS.ID}-input-explanation">${Tattes.Audience.CONSTS.HOW_TO_POST}</p>
				</div>
				<div class="${Tattes.Chat.CommonChat.CONSTS.ID}-logs">
					<common-chat-post v-for="post in chat.log" :key="post[0]" v-bind:post="post"></common-chat-post>
				</div>
			
			</div>
			<div id="${Tattes.Audience.CONSTS.ID}-bouquetconsole">
				<div id="${Tattes.Audience.CONSTS.ID}-bouquetconsole-shortcuts">
					<h3>${Tattes.Audience.CONSTS.SHORTCUTS}</h3>
					<button
						@click="insertText('${Tattes.Audience.CONSTS.TEXTS.BOUQUET}')"
					>${Tattes.Audience.CONSTS.BUTTONS.BOUQUET}</button>
					<button
						@click="forceSubmit('${Tattes.Audience.CONSTS.TEXTS.TATTES}')"
					>${Tattes.Audience.CONSTS.BUTTONS.TATTES}</button>
					<button
						@click="forceSubmit('${Tattes.Audience.CONSTS.TEXTS.EMOTIONAL}')"
					>${Tattes.Audience.CONSTS.BUTTONS.EMOTIONAL}</button>
					<button
						@click="forceSubmit('${Tattes.Audience.CONSTS.TEXTS.LOVEIT}')"
					>${Tattes.Audience.CONSTS.BUTTONS.LOVEIT}</button>
				</div>
				<hr/>
				<div id="${Tattes.Audience.CONSTS.ID}-bouquetconsole-bouquetCount">
					<h3>${Tattes.Audience.CONSTS.THROWN_BOUQUET_COUNT}</h3>
					<button 
						@click="clearBouquet"
						id="${Tattes.Audience.CONSTS.ID}-bouquetconsole-clearing">${Tattes.Audience.CONSTS.CLEARING}</button>
					<input id="${Tattes.Audience.CONSTS.ID}-bouquetconsole-bouquetCount-counter" type="number" min="0" v-model="thrownBouquet" />
					<h3>${Tattes.Audience.CONSTS.THROWN_BOUQUET_COUNT_TOTAL}</h3>
					<input id="${Tattes.Audience.CONSTS.ID}-bouquetconsole-bouquetCount-counter-total" type="number" min="0" v-model="thrownBouquetTotal" />
				</div>
			</div>
		</section>
	`,
	computed: {
		inputTextClass: function() {
			return `${Tattes.Chat.CommonChat.CONSTS.ID}-input-text ${Tattes.Chat.CommonChat.CONSTS.ID}-input-text-${this.channel}`
		}
	},
	methods: {
		updateTab: function() {
			if(this.channel === '0') {
				alertify.warning(Tattes.Audience.CONSTS.ENTER_SCENE_WARNING);
			}
		},
		editText: function(contents) {
			this.text = contents;
		},
		insertText: function(prefix='', suffix='') {
			this.text = prefix + this.text + suffix;
		},
		clearBouquet: function() {
			const data = {
					message: `${Tattes.Audience.CONSTS.BOUQUET_THROW}${this.thrownBouquet} (${Tattes.CONSTS.TOTAL}${Number(this.thrownBouquet)+Number(this.thrownBouquetTotal)})`,
					channel: 0,
					name: this.plname
			};
			this.thrownBouquetTotal = Number(this.thrownBouquet)+Number(this.thrownBouquetTotal); 
			this.thrownBouquet = 0;
			this.$emit(`${Tattes.Audience.CONSTS.ID}-events-sendchat`, data);
		},
		forceSubmit: function(text) {
			const data = {
					message: text,
					channel: 1,
					name: this.plname
			};
			if(text.indexOf(Tattes.Audience.CONSTS.TEXTS.BOUQUET) > -1) {
				this.thrownBouquet++;
			}
			this.$emit(`${Tattes.Audience.CONSTS.ID}-events-sendchat`, data);
		},
		submit: function(e) {
			if(e.shiftKey) {
				return;
			}
			e.preventDefault();
			const text = this.text.trim();
			if(Tattes.Chat.CommonChat.CONSTS.UNEXPECTED.includes(text) || /^\s+$/.test(text)) {
				if(! window.confirm(Tattes.Chat.CommonChat.CONSTS.IS_IT_OK)) {
					return;
				}
			}
			if(text.indexOf(Tattes.Audience.CONSTS.TEXTS.BOUQUET) > -1) {
				this.thrownBouquet++;
			}
			this.text = '';
			const data = {
					message: text,
					channel: this.channel,
					name: this.name
			};
			this.$emit(`${Tattes.Audience.CONSTS.ID}-events-sendchat`, data);
		}
	}
});