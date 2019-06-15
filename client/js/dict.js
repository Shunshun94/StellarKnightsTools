let Tattes = {};
Tattes.CONSTS = {
		SYSTEM_CODE: 'stellar',
		HOPE: '希望',
		DESPAIR: '絶望'
};

Tattes.Bringer = {};
Tattes.Bringer.CONSTS = {
		ID: 'tattes-bringer'
};

Tattes.Sheath = {};
Tattes.Sheath.CONSTS = {
		ID: 'tattes-sheath'
};

Tattes.Character = {};
Tattes.Character.Status = {};
Tattes.Character.Status.CONSTS = {
		ID: 'tattes-character-status',
		IMAGE_PATH: 'https://character-sheets.appspot.com/stellar/image?key=',
		SHEATH_IMAGEKEY: '&imagekey=sheath',

		NO_STELLARKNIGHT: 'のステラナイト',
		PERSONALFLOWER: '花章',
		CHARACTER: '性格',
		OF: 'の',
		AND: 'にして'
};

Tattes.Chat = {};
Tattes.Chat.CommonChat = {};
Tattes.Chat.CommonChat.CONSTS = {
		ID: 'tattes-chat-commonchat'
}
Tattes.Chat.CommonChat.REGEXP = [
	/^\*?\*?([^:：\*\n]+)\*?\*?[:：]?(「[^「]*」)/,
	/^\*?\*?([^:：\*\n]+)\*?\*?[:：]([^「]*)/
];

