Vue.component('common-chat', {
	props: ['chat'],
	data: function() {
		return {
			text: '',
			channel: 0,
			name: ''
		};
	},
	template: `
		<div class="${Tattes.Chat.CommonChat.CONSTS.ID}">
			<div class="${Tattes.Chat.CommonChat.CONSTS.ID}-input">
				<select v-model="channel" class="${Tattes.Chat.CommonChat.CONSTS.ID}-input-channel">
					<option value="0">${Tattes.Chat.CommonChat.CONSTS.TABS[0]}</option>
					<option value="2">${Tattes.Chat.CommonChat.CONSTS.TABS[2]}</option>
				</select>
				<textarea 
					placeholder="${Tattes.Chat.CommonChat.CONSTS.INPUTAREA}"
					v-model="text"
					@keydown.enter="submit"
					@keydown.ctrl.219="insertParentheses"
					:class="inputTextClass"></textarea>
				<p class="${Tattes.Chat.CommonChat.CONSTS.ID}-input-explanation">${Tattes.Chat.CommonChat.CONSTS.HOW_TO_POST}</p>
			</div>
			<div class="${Tattes.Chat.CommonChat.CONSTS.ID}-logs">
				<common-chat-post
					@${Tattes.Chat.CommonChat.CONSTS.ID}-post-events-share="shareText"
					@${Tattes.Chat.CommonChat.CONSTS.ID}-post-events-receptBouquet="receptBouquet"
					v-for="post in chat.log" :key="post[0]" v-bind:post="post"></common-chat-post>
			</div>
		</div>
	`,
	computed: {
		inputTextClass: function() {
			return `${Tattes.Chat.CommonChat.CONSTS.ID}-input-text ${Tattes.Chat.CommonChat.CONSTS.ID}-input-text-${this.channel}`
		}
	},
	methods: {
		receptBouquet: function(e) {
			this.$emit(`${Tattes.Chat.CommonChat.CONSTS.ID}-events-receptBouquet`, e);
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
					e.target.setSelectionRange(1,1);
				}, 200);
			}
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
		<div @click="shareText" :class="postClass">
			<span class="${Tattes.Chat.CommonChat.CONSTS.ID}-logs-post-info">
				<span class="${Tattes.Chat.CommonChat.CONSTS.ID}-logs-post-info-name">{{name}}</span>
				<span class="${Tattes.Chat.CommonChat.CONSTS.ID}-logs-post-info-channel">{{channel}}</span>
			</span>
			<div class="${Tattes.Chat.CommonChat.CONSTS.ID}-logs-post-message">{{message}}<span v-show="isBouquetTos===true" class="${Tattes.Chat.CommonChat.CONSTS.ID}-logs-post-message-bouquetTos"><button @click="receptBouquet">${Tattes.Chat.CommonChat.CONSTS.GET_BOUQUET}</button></span>
			</div>
		</div>
	`,
	methods: {
		receptBouquet: function() {
			const parseResult = Tattes.Chat.CommonChat.CONSTS.BOUQUET_PARSER.exec(this.message);
			this.$emit(`${Tattes.Chat.CommonChat.CONSTS.ID}-post-events-receptBouquet`, Number(parseResult[1]));
		},
		shareText: function() {
			const data = {
					message: this.message,
					channel: this.post[1].channel,
					name: this.name
			};
			this.$emit(`${Tattes.Chat.CommonChat.CONSTS.ID}-post-events-share`, data);
		}
	},
	computed: {
		isBouquetTos: function() {
			return Tattes.Chat.CommonChat.CONSTS.BOUQUET_PARSER.test(this.message);
		},
		postClass: function() {
			return `${Tattes.Chat.CommonChat.CONSTS.ID}-logs-post ${Tattes.Chat.CommonChat.CONSTS.ID}-logs-post-${this.post[1].channel}`
		},
		channel: function() {
			return Tattes.Chat.CommonChat.CONSTS.CHANNELS[this.post[1].channel]
		},
		name: function() {
			const reResults = Tattes.Chat.CommonChat.REGEXP.map((re, i)=>{
				return re.exec(this.post[1].message);
			}).filter((re)=>{
				return re;
			});
			if(reResults.length) {
				if(reResults[0][1].indexOf('http') > -1) {
					return this.post[1].senderName.trim();
				} else {
					return reResults[0][1].trim();
				}
			} else {
				return this.post[1].senderName.trim();
			}
		},
		message: function() {
			const msgCand = this.post[1].message.replace(Tattes.Chat.CommonChat.CONSTS.MAP_REGEXP, '').trim();
			const reResults = Tattes.Chat.CommonChat.REGEXP.map((re, i)=>{
				return re.exec(msgCand);
			}).filter((re)=>{
				return re;
			});
			if(reResults.length) {
				if(reResults[0][1].indexOf('http') > -1) {
					return msgCand;
				} else {
					return reResults[0][2];
				}
			} else {
				return msgCand;
			}
		}
	}
});