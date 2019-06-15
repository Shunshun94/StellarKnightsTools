Vue.component('common-chat', {
	props: ["chat"],
	template: `
		<div class="${Tattes.Chat.CommonChat.CONSTS.ID}">
			<div class="${Tattes.Chat.CommonChat.CONSTS.ID}-input">
				<textarea class="${Tattes.Chat.CommonChat.CONSTS.ID}-input-text"></textarea>
			</div>
			<div class="${Tattes.Chat.CommonChat.CONSTS.ID}-logs">
				<common-chat-post v-for="post in chat.log" :key="post[0]" v-bind:post="post"></common-chat-post>
			</div>
		</div>
	`
});

Vue.component('common-chat-post', {
	props: ['post'],
	template: `
		<div class="${Tattes.Chat.CommonChat.CONSTS.ID}-logs-post">
			<span class="${Tattes.Chat.CommonChat.CONSTS.ID}-logs-post-name">{{name}}</span>
			<pre class="${Tattes.Chat.CommonChat.CONSTS.ID}-logs-post-message">{{message}}</pre>
		</div>
	`,
	computed: {
		name: function() {
			if(this.post[1].message.indexOf('http') > -1) {
				return this.post[1].name;
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