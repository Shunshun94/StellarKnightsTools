Vue.component('battle-chat', {
	props: ['chat', 'text'],
	data: function() {
		return {
			channel: 0
		};
	},
	template: `
		<div class="${Tattes.Chat.BattleChat.CONSTS.ID}">
			<div class="${Tattes.Chat.CommonChat.CONSTS.ID}-input">
				<select v-model="channel" class="${Tattes.Chat.CommonChat.CONSTS.ID}-input-channel">
					<option value="0">メイン</option>
					<option value="2">雑談</option>
				</select>
				<textarea 
					placeholder="${Tattes.Chat.CommonChat.CONSTS.INPUTAREA}"
					v-model="text"
					@input="onEditText"
					@keyup.enter="submit"
					@keyup.ctrl.219="insertParentheses"
					:class="inputTextClass"></textarea>
				<p class="${Tattes.Chat.CommonChat.CONSTS.ID}-input-explanation">${Tattes.Chat.CommonChat.CONSTS.HOW_TO_POST}</p>
			</div>
			<div class="${Tattes.Chat.CommonChat.CONSTS.ID}-logs">
				<common-chat-post v-on:${Tattes.Chat.CommonChat.CONSTS.ID}-post-events-share="shareText" v-for="post in chat.log" :key="post[0]" v-bind:post="post"></common-chat-post>
			</div>
		</div>
	`,
	computed: {
		inputTextClass: function() {
			return `${Tattes.Chat.CommonChat.CONSTS.ID}-input-text ${Tattes.Chat.CommonChat.CONSTS.ID}-input-text-${this.channel}`
		}
	},
	methods: {
		onEditText: function(e) {
			this.onUpdateInputText(e.target.value);
		},
		onUpdateInputText: function(text) {
			this.$emit(`${Tattes.Chat.BattleChat.CONSTS.ID}-events-updateInputText`, {
				value: text
			});
		},
		shareText: function(e) {
			this.$emit(`${Tattes.Chat.CommonChat.CONSTS.ID}-events-share`, e);
		},
		insertParentheses: function(e) {
			if(this.text.trim().length) {
				this.text = `「${this.text}」` 
			} else {
				this.text = '「」';
				// 少し処理を遅延させないとカーソルの移動が DOM の再描画で上書きされてしまう
				// 描画終わりそうな短い時間待った上でカーソルを動かす
				setTimeout(()=>{
					this.$el.querySelector('textarea').setSelectionRange(1,1);
				}, 200);
			}
			this.onUpdateInputText(this.text);
		},
		submit: function(e) {
			if(e.shiftKey) {
				return;
			}
			const text = this.text.trim();
			if(Tattes.Chat.CommonChat.CONSTS.UNEXPECTED.includes(text) || /^\s+$/.test(text)) {
				if(! window.confirm(Tattes.Chat.CommonChat.CONSTS.IS_IT_OK)) {
					return;
				}
			}
			this.text = '';
			const data = {
					message: text,
					channel: this.channel
			};
			this.onUpdateInputText('');
			this.$emit(`${Tattes.Chat.CommonChat.CONSTS.ID}-events-sendChat`, data);
		}
	}
});
