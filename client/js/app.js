const initTattes = async (params) =>{
	const characterSheetClient = new io.github.shunshun94.trpg.characterSheetsMasashige.client();

	const characterId = params.sheet.split('=')[1];
	const characterData = await characterSheetClient.sendRequest(Tattes.CONSTS.SYSTEM_CODE, characterId);

	const partnerId = characterData.partner.bringer.url.split('=')[1];
	const partnerData = await characterSheetClient.sendRequest(Tattes.CONSTS.SYSTEM_CODE, partnerId);
	
	const discordClient = new io.github.shunshun94.trpg.discord.Room(params.token, params.room.split(','));

	const data = {
		bringer: characterData.base,
		sheath: characterData.sheath
	};
	data.bringer.id = characterId;
	data.bringer.isBringer = true;
	data.bringer.skills = characterData.skills;
	data.bringer.skills = data.bringer.skills.map((v, i)=>{
		v.id = i;
		return v;
	});
	data.bringer.status = characterData.status;
	data.bringer.bouquet = 0;
	data.sheath.id = characterId;
	data.sheath.hopedespair.choice = Tattes.FUNCS.switchHope(partnerData.base.hopedespair);
	data.sheath.isBringer = false;
	data.activeTab = 0;
	data.chat = {
		log:[]
	};
	console.log(JSON.stringify(data, null, 2));
	const vueObject = new Vue({
		el: '#tattes',
		data: data,
		methods: {
			changeTab: function(num) {
				this.activeTab = num;
			},
			getChat: function() {
				discordClient.getChat().then((result)=>{
					this.chat.log = result.chatMessageDataLog.reverse();
				}, console.warn);
			},
			sendChat: function(messageData) {
				discordClient.sendChat(messageData);
			}
		}
	});
	setInterval(()=>{
		vueObject.getChat();
	}, 5000);
};

Tattes.FUNCS = {};
Tattes.FUNCS.switchHope = (hopedespair) => {
	if(hopedespair.choice === Tattes.CONSTS.HOPE) {
		return Tattes.CONSTS.DESPAIR;
	} else {
		return Tattes.CONSTS.HOPE;
	}
};
Tattes.FUNCS.getQueries = () => {
	const query = location.search.slice(1).split('&');
	const paramLength = query.length;
	let result = {};
	for(var i = 0; i < paramLength; i++) {
		const pair = query[i].split('=');
		result[pair[0]] = pair.slice(1).join('=');
	}
	return result;
};
