let Tattes = {};
Tattes.CONSTS = {
		SYSTEM_CODE: 'stellar',
		HOPE: '希望',
		DESPAIR: '絶望',
		BOUQUET: 'ブーケ'
};

Tattes.Audience = {};
Tattes.Audience.CONSTS = {
		ID: 'tattes-audience',
		TITLE: '観客',
		HOW_TO_POST: 'SHIFT + Enter で改行、Enter で発言',
		SHORTCUTS: 'ショートカットボタン',
		THROWN_BOUQUET_COUNT: '投げたブーケの数',
		BUTTONS: {
			BOUQUET: 'ブーケを投げる準備をする (CTRL+B)',
			TATTES: '「はぁ、尊い」とだけ言ってブーケを投げる',
			EMOTIONAL: '「エモい……」とだけ言ってブーケを投げる',
			LOVEIT:'「これ、しゅき」とだけ言ってブーケを投げる'
		},
		TEXTS: {
			BOUQUET: `＜${Tattes.CONSTS.BOUQUET}＞ `,
			TATTES: `＜${Tattes.CONSTS.BOUQUET}＞ はぁ、尊い……`,
			EMOTIONAL: `＜${Tattes.CONSTS.BOUQUET}＞ エモい……`,
			LOVEIT:`＜${Tattes.CONSTS.BOUQUET}＞ これ、しゅき……`
		}
};

Tattes.Bringer = {};
Tattes.Bringer.CONSTS = {
		ID: 'tattes-bringer',
		BOUQUET_ON: 'ブーケを表示する',
		BOUQUET_OFF: 'ブーケを表示しない'
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
		ID: 'tattes-chat-commonchat',
		UNEXPECTED: ['[]', '""', `""`, '「」', '()', '（）', '<>', '＜＞', ''],
		IS_IT_OK: '誤送信な気がします。本当に送りますか?',
		HOW_TO_POST: 'SHIFT + Enter で改行、Enter で発言。CTRL + [ で 「」 挿入',
		INPUTAREA: '発言したい内容を入力',
		CHANNELS: {
			0: '',
			1: '＠ ブーケ',
			2: '＠ 雑談'
		}
};
Tattes.Chat.CommonChat.REGEXP = [
	/^\*?\*?([^:：\*\n]+)\*?\*?[:：]?\s*(「[^」]*」)/,
	/^\*?\*?([^:：\*\n]+)\*?\*?[:：]([^「]*)/
];

