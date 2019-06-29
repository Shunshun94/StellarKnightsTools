Vue.component('tattes-battle', {
	props: ['bringer', 'chat'],
	data: function() {
		return {
			rounds: 1,
			stacked: [0,0,0,0,0,0],
			chargeResult: []
		};
	},
	template: `<section id="${Tattes.Battle.CONSTS.ID}">
		<div id="${Tattes.Battle.CONSTS.ID}-left">
			<common-chat
				v-on:${Tattes.Chat.CommonChat.CONSTS.ID}-events-sendChat="sendChat"
				v-bind:chat="chat"></common-chat>
			<div id="${Tattes.Battle.CONSTS.ID}-info">
				<div id="${Tattes.Battle.CONSTS.ID}-info-smallmap" v-bind:style="mapStyle"></div>
				<span class="${Tattes.Battle.CONSTS.ID}-info-status">
					<span class="${Tattes.Battle.CONSTS.ID}-info-status-label">${Tattes.Battle.CONSTS.INFO.HP}</span>
					<input class="${Tattes.Battle.CONSTS.ID}-info-status-value" v-model="bringer.status.hp" type="number" min="0" />
				</span>
				<span class="${Tattes.Battle.CONSTS.ID}-info-status">
					<span class="${Tattes.Battle.CONSTS.ID}-info-status-label">${Tattes.Battle.CONSTS.INFO.CHARGE}</span>
					<input class="${Tattes.Battle.CONSTS.ID}-info-status-value" v-model="bringer.status.charge" type="number" min="0" />
				</span>
				<span class="${Tattes.Battle.CONSTS.ID}-info-status">
					<span class="${Tattes.Battle.CONSTS.ID}-info-status-label">${Tattes.Battle.CONSTS.INFO.DEFENSE}</span>
					<input class="${Tattes.Battle.CONSTS.ID}-info-status-value" v-model="bringer.status.defense" type="number" min="0" />
				</span>
				<span class="${Tattes.Battle.CONSTS.ID}-info-status">
					<span class="${Tattes.Battle.CONSTS.ID}-info-status-label">${Tattes.Battle.CONSTS.INFO.BOUQUET}</span>
					<input class="${Tattes.Battle.CONSTS.ID}-info-status-value" v-model="bringer.bouquet" type="number" min="0" />
				</span>
			</div>
		</div>
		<div id="${Tattes.Battle.CONSTS.ID}-act">
			<div id="${Tattes.Battle.CONSTS.ID}-act-rounds">
				<h3>${Tattes.Battle.CONSTS.ACT.ROUNDS}</h3>
				<input v-model="rounds" type="number" min="1" />			
			</div>

			<div id="${Tattes.Battle.CONSTS.ID}-act-charge">
				<h3>${Tattes.Battle.CONSTS.ACT.CHARGE}</h3>
				<button @click="charge">${Tattes.Battle.CONSTS.ACT.CHARGING}</button>
				<div id="${Tattes.Battle.CONSTS.ID}-act-charge-diceList">
					<tattes-charge-dice
						v-for="(dice, index) in chargeResult"
						@${Tattes.ChargeDice.CONSTS.ID}-update="updateChargeDiceWithHand"
						:dice="dice"
						:key="index"
						:index="index"
					></tattes-charge-dice>
					<button
						v-show="chargeResult.length!==0"
						@click="chargeApply"
					>${Tattes.Battle.CONSTS.ACT.CHARGING_APPLY}</button>
				</div>
			</div>

			<div id="${Tattes.Battle.CONSTS.ID}-act-skills">
				<h3>${Tattes.Battle.CONSTS.ACT.SKILLS}</h3>
				<tattes-skill
					 v-for="skill in bringer.skills"
					 :key="skill.id"
					 :skill="skill"
					 :stack="stacked[skill.id]"
				></tattes-skill>
			</div>
			<h3>${Tattes.Battle.CONSTS.ACT.MOVE}</h3>
			<h3>${Tattes.Battle.CONSTS.ACT.ATTACK}</h3>

		</div>
	</section>`,
	computed: {
		mapStyle: function() {
			return `background-image:url('http://hiyo-hitsu.sakura.ne.jp/sn/map.cgi?place=')`;
		}
	},
	methods: {
		chargeApply: function() {
			this.chargeResult.forEach((v)=>{
				this.stacked[Number(v) - 1]++;
			})
			this.chargeResult = [];
		},
		updateChargeDiceWithHand: function(d) {
			this.chargeResult[d.index] = d.value;
		},
		charge: function() {
			const dice = Number(this.bringer.status.charge) + Number(this.rounds);
			const diceResult = this.diceRoll(dice);

			this.chargeResult = this.diceToList(diceResult);

			this.sendChat({
				channel:0, message: `${Tattes.Battle.CONSTS.ACT.CHARGING_RESULT}\n[ ${this.chargeResult.join(' , ')} ]`
			});
		},
		diceToList: function(diceResult) {
			let result = [];
			for(var diceValue = 0; diceValue < 6; diceValue++) {
				for(var diceCount = 0; diceCount < diceResult[diceValue + 1]; diceCount++) {
					result.push(diceValue + 1);
				}
			}
			return result;
		},
		diceRoll: function(diceCount) {
			let dices = {1:0, 2:0, 3:0, 4:0, 5:0, 6:0};
			for(var i = 0; i < Number(diceCount); i++) {
				const val = Math.ceil(Math.random() * 6);
				dices[val]++;
			}
			return dices;
		},
		sendChat: function(data) {
			data.name = this.bringer.name;
			this.$emit(`${Tattes.Battle.CONSTS.ID}-events-sendchat`, data);
		}
	}
});