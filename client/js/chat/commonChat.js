Vue.component('common-chat', {
	props: ['chat'],
	data: function() {
		return {
			text: '',
			channel: 0
		};
	},
	template: `
		<div class="${Tattes.Chat.CommonChat.CONSTS.ID}">
			<div class="${Tattes.Chat.CommonChat.CONSTS.ID}-input">
				<select v-model="channel" class="${Tattes.Chat.CommonChat.CONSTS.ID}-input-channel">
					<option value="0">メイン</option>
					<option value="2">雑談</option>
				</select>
				<textarea 
					placeholder="${Tattes.Chat.CommonChat.CONSTS.INPUTAREA}"
					v-model="text"
					@keyup.enter="submit"
					@keyup.ctrl.219="insertParentheses"
					:class="inputTextClass"></textarea>
				<p class="${Tattes.Chat.CommonChat.CONSTS.ID}-input-explanation">${Tattes.Chat.CommonChat.CONSTS.HOW_TO_POST}</p>
			</div>
			<div class="${Tattes.Chat.CommonChat.CONSTS.ID}-logs">
				<common-chat-post v-for="post in chat.log" :key="post[0]" v-bind:post="post"></common-chat-post>
			</div>
		</div>
	`,
	computed: {
		inputTextClass: function() {
			return `${Tattes.Chat.CommonChat.CONSTS.ID}-input-text ${Tattes.Chat.CommonChat.CONSTS.ID}-input-text-${this.channel}`
		}
	},
	methods: {
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
			this.$emit(`${Tattes.Chat.CommonChat.CONSTS.ID}-events-sendChat`, data);
		}
	}
});

Vue.component('common-chat-post', {
	props: ['post'],
	template: `
		<div :class="postClass">
			<span class="${Tattes.Chat.CommonChat.CONSTS.ID}-logs-post-info">
				<span class="${Tattes.Chat.CommonChat.CONSTS.ID}-logs-post-info-name">{{name}}</span>
				<span class="${Tattes.Chat.CommonChat.CONSTS.ID}-logs-post-info-channel">{{channel}}</span>
			</span>
			<pre class="${Tattes.Chat.CommonChat.CONSTS.ID}-logs-post-message">{{message}}</pre>
		</div>
	`,
	computed: {
		postClass: function() {
			return `${Tattes.Chat.CommonChat.CONSTS.ID}-logs-post-${this.post[1].channel}`
		},
		channel: function() {
			return Tattes.Chat.CommonChat.CONSTS.CHANNELS[this.post[1].channel]
		},
		name: function() {
			if(this.post[1].message.indexOf('http') > -1) {
				return this.post[1].senderName;
			}
			const reResults = Tattes.Chat.CommonChat.REGEXP.map((re, i)=>{
				return re.exec(this.post[1].message);
			}).filter((re)=>{
				return re;
			});
			if(reResults.length) {
				return reResults[0][1];
			} else {
				return this.post[1].senderName;
			}
		},
		message: function() {
			if(this.post[1].message.indexOf('http') > -1) {
				return this.post[1].message;
			}
			const reResults = Tattes.Chat.CommonChat.REGEXP.map((re, i)=>{
				return re.exec(this.post[1].message);
			}).filter((re)=>{
				return re;
			});
			if(reResults.length) {
				return reResults[0][2];
			} else {
				return this.post[1].message;
			}
		}
	}
});