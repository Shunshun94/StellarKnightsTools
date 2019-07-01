Vue.component('tattes-battle', {
	props: ['bringer', 'chat'],
	data: function() {
		return {
			rounds: 1,
			stacked: [0,0,0,0,0,0],
			chargeResult: [],
			attackDices: 1
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
					 @${Tattes.Skill.CONSTS.ID}-events-sendInfo="onSkillClick"
					 @${Tattes.Skill.CONSTS.ID}-events-updateStack="onUpdateStack"
				></tattes-skill>
			</div>
			<div id="${Tattes.Battle.CONSTS.ID}-act-bouquet">
				<h3>${Tattes.Battle.CONSTS.ACT.BOUQUET}</h3>
				<p>
					<button　@click="useBouquets(3, '3')">3</button>
					<button　@click="useBouquets(6, '3×2')">3×2</button>
					<button　@click="useBouquets(9, '3×3')">3×3</button>
					<button　@click="useBouquets(12, '3×4')">3×4</button>
					<button　@click="useBouquets(15, '3×5')">3×5</button>
				</p>
				<p>
					<button　@click="useBouquets(4, '4')">4</button>
					<button　@click="useBouquets(8, '4×2')">4×2</button>
					<button　@click="useBouquets(12, '4×3')">4×3</button>
				</p>
				<p>
					<button　@click="useBouquets(5, '5')">5</button>
				</p>
			</div>
			
			<div id="${Tattes.Battle.CONSTS.ID}-act-move">
				<h3>${Tattes.Battle.CONSTS.ACT.MOVE}</h3>
				<div id="${Tattes.Battle.CONSTS.ID}-act-move-menu">
					<svg width="220" height="220" viewBox="-110 -110 220 220" xmlns="http://www.w3.org/2000/svg">
						<g font-size="30">
							<text x="-50" y="-50">１</text>
							<text x="20" y="-50">２</text>
							<text x="50" y="10">３</text>
							<text x="20" y="70">４</text>
							<text x="-50" y="70">５</text>
							<text x="-85" y="10">６</text>
						</g>
						<path
							@click="onMoveClick(1)"
							id="${Tattes.Battle.CONSTS.ID}-act-move-menu-1"
							class="${Tattes.Battle.CONSTS.ID}-act-move-menu-place"
							d="M 0,0 L -87,-50 a 100 100 210 0 1 87,-50 z"
							fill="red"
							fill-opacity="0.2"
							stroke="black"
						/>
						<path
							@click="onMoveClick(2)"
							id="${Tattes.Battle.CONSTS.ID}-act-move-menu-2"
							class="${Tattes.Battle.CONSTS.ID}-act-move-menu-place"
							d="M 0,0 L 0,-100 a 100 100 -30 0 1 87 50 z"
							fill="orange"
							fill-opacity="0.2"
							stroke="black"
						/>
						<path
							@click="onMoveClick(3)"
							id="${Tattes.Battle.CONSTS.ID}-act-move-menu-3"
							class="${Tattes.Battle.CONSTS.ID}-act-move-menu-place"
							d="M 0,0 L 87,-50 a 100 100 -30 0 1 0 100 z"
							fill="yellow"
							fill-opacity="0.2"
							stroke="black"
						/>
						<path
							@click="onMoveClick(4)"
							id="${Tattes.Battle.CONSTS.ID}-act-move-menu-4"
							class="${Tattes.Battle.CONSTS.ID}-act-move-menu-place"
							d="M 0,0 L 87,50 a 100 100 30 0 1 -87,50 z"
							fill="green"
							fill-opacity="0.2"
							stroke="black"
						/>
						<path
							@click="onMoveClick(5)"
							id="${Tattes.Battle.CONSTS.ID}-act-move-menu-5"
							class="${Tattes.Battle.CONSTS.ID}-act-move-menu-place"
							d="M 0,0 L 0,100 a 100 100 90 0 1 -87,-50 z"
							fill="deepskyblue"
							fill-opacity="0.2"
							stroke="black"
						/>
						<path
							@click="onMoveClick(6)"
							id="${Tattes.Battle.CONSTS.ID}-act-move-menu-6"
							class="${Tattes.Battle.CONSTS.ID}-act-move-menu-place"
							d="M 0,0 L -87,50 a 100 100 -30 0 1 0 -100 z"
							fill="blue"
							fill-opacity="0.2"
							stroke="black"
						/>

					</svg>			
				</div>
			</div>
			<div id="${Tattes.Battle.CONSTS.ID}-act-attack">
				<h3>${Tattes.Battle.CONSTS.ACT.ATTACK}</h3>
				<input v-model="attackDices" type="number" min="1" />
				<button @click="attack">${Tattes.Battle.CONSTS.ACT.ATTACKING}</button>
			</div>
		</div>
	</section>`,
	computed: {
		mapStyle: function() {
			return `background-image:url('http://hiyo-hitsu.sakura.ne.jp/sn/map.cgi?place=')`;
		}
	},
	methods: {
		onMoveClick: function(num) {
			console.log(num)
		},
		onSkillClick: function(data) {
			if(data.attack) {
				this.attackDices = data.attack;
			}
		},
		onUpdateStack: function(data) {
			console.log(this.stacked);
			this.stacked[data.index] = Number(data.value);
			console.log(this.stacked)
		},
		attack: function() {
			const diceResult = this.diceRoll(this.attackDices);
			let str = `${Tattes.Battle.CONSTS.ACT.ATTACK}: ${this.attackDices}${Tattes.Battle.CONSTS.ACT.ATTACKING_DICE}\n`;
			str += `[ ${this.diceToList(diceResult).join(' , ')} ]\n`
			for(var i = 0; i < 6; i++) {
				const value = i + 1;
				if(diceResult[ value ]) {
					str += `${value}: ${diceResult[ value ]}\n`
				}
			}
			this.sendChat({
				channel:0, message: str
			});
		},
		useBouquets: function(count, text) {
			this.bringer.bouquet -= count;
			this.sendChat({
				channel:0, message: `${Tattes.Battle.CONSTS.ACT.BOUQUET}: ${text}${Tattes.Battle.CONSTS.ACT.BOUQUET_COUNT} (${Tattes.Battle.CONSTS.ACT.BOUQUET_STOCK}${this.bringer.bouquet}${Tattes.Battle.CONSTS.ACT.BOUQUET_COUNT})`
			});
		},
		chargeApply: function() {
			console.log(this.stacked)
			this.chargeResult.forEach((v)=>{
				this.stacked[Number(v) - 1]++;
			})
			console.log(this.stacked)
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