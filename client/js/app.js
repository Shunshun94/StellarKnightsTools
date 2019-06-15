const initTattes = async (params) =>{
	const characterSheetClient = new io.github.shunshun94.trpg.characterSheetsMasashige.client();

	const characterId = params.url.split('=')[1];
	const characterData = await characterSheetClient.sendRequest(Tattes.CONSTS.SYSTEM_CODE, characterId);

	const partnerId = characterData.partner.bringer.url.split('=')[1];
	const partnerData = await characterSheetClient.sendRequest(Tattes.CONSTS.SYSTEM_CODE, partnerId);
	
	const discordClient = null; //new io.github.shunshun94.trpg.discord.Room(params.token, params.room.split(','));

	const data = {
		bringer: characterData.base,
		sheath: characterData.sheath
	};
	data.bringer.id = characterId;
	data.bringer.isBringer = true;
	data.bringer.skills = characterData.skills;
	data.bringer.status = characterData.status;
	data.sheath.id = characterId;
	data.sheath.hopedespair.choice = Tattes.FUNCS.switchHope(partnerData.base.hopedespair);
	data.sheath.isBringer = false;
	console.log(JSON.stringify(data, null, 2));
	new Vue({
		el: '#tattes',
		data: data
	});
};

Tattes.FUNCS = {};
Tattes.FUNCS.switchHope = (hopedespair) => {
	if(hopedespair.choice === Tattes.CONSTS.HOPE) {
		return Tattes.CONSTS.DESPAIR;
	} else {
		return Tattes.CONSTS.HOPE;
	}
};



// https://character-sheets.appspot.com/stellar/image?key=ahVzfmNoYXJhY3Rlci1zaGVldHMtbXByFwsSDUNoYXJhY3RlckRhdGEY1fjLpwIM&1560382859483