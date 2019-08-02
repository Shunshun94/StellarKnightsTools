const initTattes = async (params) =>{
	const characterSheetClient = new io.github.shunshun94.trpg.characterSheetsMasashige.client();

	const characterId = params.sheet.split('=')[1];
	const characterData = await characterSheetClient.sendRequest(Tattes.CONSTS.SYSTEM_CODE, characterId);

	const dataType = characterData.base.knight.type;
	const discordClient = new io.github.shunshun94.trpg.discord.Room(params.token, params.room.split(','));

	const data = {
		bringer: characterData.base,
		sheath: characterData.sheath,
		version: Tattes.VERSION,
		type: dataType
	};
	data.bringer.iconName = params.iconName ? decodeURI(params.iconName) : data.bringer.name.substr(0,1);
	data.bringer.id = characterId;
	data.bringer.isBringer = true;
	data.bringer.skills = characterData.skills.map((v, i)=>{
		v.id = i;
		v.effect = v.effect ? (v.effect.replace(/[０-９]/g, (s)=>{
		    return String.fromCharCode(s.charCodeAt(0) - 65248);
		})) : '';
		return v;
	});
	data.bringer.status = characterData.status;
	data.bringer.bouquet = 0;
	if(data.type !== Tattes.CONSTS.EMBRACE) {
		// シースから見たパートナーなので partner.bringer を取得している
		const partnerId = characterData.partner.bringer.url.split('=')[1];
		const partnerData = await characterSheetClient.sendRequest(Tattes.CONSTS.SYSTEM_CODE, partnerId);
		data.sheath.id = characterId;
		data.sheath.hopedespair.choice = Tattes.FUNCS.switchHope(partnerData.base.hopedespair);
		data.sheath.isBringer = false;
	} else {
		data.sheath = Tattes.DUMMY_SHEATH;
	}
	if(! Boolean(data.bringer.status)) {
		data.bringer.status = {
			hp: '0',
			charge: '0',
			defense: '0'
		};
	}
	data.activeTab = 0;
	data.chat = {
		log:[[0, {
			senderName: 'Tattes System',
			message: Tattes.Chat.CommonChat.CONSTS.NOWLOADING,
			channel: 0
		}]]
	};
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
