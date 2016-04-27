module.exports.beforeTasks = [
	{
		type: 'sendMessage',
		message: '(지지직... 지지직...)',
		options: {
			reply_markup: {
				hide_keyboard: true
			}
		},
		delay: 1
	},
	{
		type: 'sendMessage',
		message: '밤밣따빠밣밟따뿌',
		options: {
			reply_markup: {
				hide_keyboard: true
			}
		},
		delay: 0
	},
	{
		type: 'sendMessage',
		message: '빠맣파빨받밤뚜뭏',
		options: {
			reply_markup: {
				hide_keyboard: true
			}
		},
		delay: 2
	},
	{
		type: 'waitAnswer',
		message: '아ㅏㅏㅏㅏㅏㅏㅏ',
		options: {
			parse_mode: 'Markdown',
			reply_markup: {
				keyboard: [
					[{text: '1. 뭐야'}],
					[{text: '2. 누구세요?'}]
				],
				one_time_keyboard: true
			}
		},
		delay: 0
	}
];

module.exports.afterTasks = [
	{
		nextStage: 1,
		nextPart: 2
	},
	{
		nextStage: 1,
		nextPart: 2
	}
];
