Vue.component('tattes-audience', {
	props: ['chat', 'plname'],
	data: function() {
		return {
			text: '',
			channel: 1,
			thrownBouquet: 0
		};
	},
	template: `
		<section id="${Tattes.Audience.CONSTS.ID}">
			<h2 id="${Tattes.Audience.CONSTS.ID}-title">${Tattes.Audience.CONSTS.TITLE}</h2>
			<div id="${Tattes.Audience.CONSTS.ID}-bouquetchat">
				<div class="${Tattes.Chat.CommonChat.CONSTS.ID}-input">
					<select v-model="channel" class="${Tattes.Chat.CommonChat.CONSTS.ID}-input-channel">
						<option value="1">ブーケ</option>
						<option value="2">雑談</option>
					</select>
					<textarea 
						placeholder="${Tattes.Chat.CommonChat.CONSTS.INPUTAREA}"
						v-model="text"　@keyup.enter="submit" :class="inputTextClass"></textarea>
					<p class="${Tattes.Chat.CommonChat.CONSTS.ID}-input-explanation">${Tattes.Chat.CommonChat.CONSTS.HOW_TO_POST}</p>
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
				</div>
				<hr/>
				<div id="${Tattes.Audience.CONSTS.ID}-bouquetconsole-bouquetCount">
					<h3>${Tattes.Audience.CONSTS.THROWN_BOUQUET_COUNT}</h3>
					<input id="${Tattes.Audience.CONSTS.ID}-bouquetconsole-bouquetCount-counter" type="number" min="0" v-model="thrownBouquet" />
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
		editText: function(contents) {
			this.text = contents;
		},
		insertText: function(prefix='', suffix='') {
			this.text = prefix + this.text + suffix;
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
					name: this.plname
			};
			this.$emit(`${Tattes.Audience.CONSTS.ID}-events-sendchat`, data);
		}
	}
});