let Tattes = {};
Tattes.CONSTS = {
		SYSTEM_CODE: 'stellar',
		HOPE: '希望',
		DESPAIR: '絶望',
		BOUQUET: 'ブーケ',
		TOTAL: '合計'
};

Tattes.Audience = {};
Tattes.Audience.CONSTS = {
		ID: 'tattes-audience',
		TITLE: '観客',
		HOW_TO_POST: 'SHIFT + Enter で改行、Enter で発言',
		SHORTCUTS: 'ショートカットボタン',
		THROWN_BOUQUET_COUNT: '投げたブーケの数 (このシーン中)',
		THROWN_BOUQUET_COUNT_TOTAL: '投げたブーケの数 (トータル)',
		BOUQUET_THROW: 'ブーケ譲渡',
		CLEARING: '清算する',
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

Tattes.Battle = {};
Tattes.Battle.CONSTS = {
		ID: 'tattes-battle',
		MAP: {
			CGI: 'http://hiyo-hitsu.sakura.ne.jp/sn/map.cgi',
			REGEXP: /hiyo-hitsu\.sakura\.ne\.jp\/sn\/map\.cgi\?place=(.*),(.*),(.*),(.*),(.*),(.*)/
		},
		INFO: {
			CHARGE: 'チャージ',
			DEFENSE: '防御力',
			HP: '耐久力',
			BOUQUET: 'ブーケ'
		},
		ACT: {
			CHARGE: 'チャージ',
			SKILLS: 'スキル',
			MOVE: '移動',
			ATTACK: 'アタック判定',
			BOUQUET: 'ブーケ使用',
			ROUNDS: '現在のラウンド数',

			CHARGING: 'チャージ判定のダイスを振る',
			CHARGING_RESULT: 'チャージ判定 結果',
			CHARGING_APPLY: '反映',

			BOUQUET_COUNT: '枚',
			BOUQUET_STOCK: '残',

			ATTACKING: 'アタック判定のダイスを振る',
			ATTACKING_DICE: 'ダイス',

			MOVED_TO_PREFIX: '',
			MOVED_TO_SUFFIX: 'に移動'
		}
};

Tattes.Bringer = {};
Tattes.Bringer.CONSTS = {
		ID: 'tattes-bringer',
		BOUQUET_ON: 'ブーケを表示する',
		BOUQUET_OFF: 'ブーケを表示しない',
		BOUQUET: 'ブーケ所持数',
		BOUQUET_SHARE_COUNT: 'ブーケの数を共有する',
		BOUQUET_SHARED_COUNT: 'ブーケの数を共有しました',
		BOUQUET_PARSER: /ブーケ譲渡(\d+)/,
		BOUQUET_HOW_TO_GET: '「ブーケ譲渡」と書かれた発言をクリックするとブーケを受け取れます',
		NOTIFY_GET_BOUQUET: 'ブーケを\d枚受け取りました (合計\d)'
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

Tattes.ChargeDice = {};
Tattes.ChargeDice.CONSTS = {
		ID: 'tattes-battle-chargeDice'
};

Tattes.Skill = {};
Tattes.Skill.CONSTS = {
		ID: 'tattes-skill'
};
Tattes.Skill.REGEXP = {
		ATTACK_DICE: /[アAＡ]タ?ッ?ク?判?定?[:：](\d+)/
};
