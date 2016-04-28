module.exports.beforeTasks = [
	{
		type: 'sendMessages',
		message: [
			{text: '(지지직... 지지직...)', delay: 1},
			{text: '밤밣따빠밣밟따뿌', delay: 0},
			{text: '빠맣파빨받밤뚜뭏', delay: 2},
		],
		options: {
			reply_markup: {
				hide_keyboard: true
			}
		}
	},
	{
		type: 'waitAnswer',
		message: {text: '아ㅏㅏㅏㅏㅏㅏㅏ'},
		options: {
			parse_mode: 'Markdown',
			reply_markup: {
				keyboard: [
					[{text: '1. 뭐야'}],
					[{text: '2. 누구세요?'}]
				],
				one_time_keyboard: true
			}
		}
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
