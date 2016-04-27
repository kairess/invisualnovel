module.exports.beforeTasks = [
	{
		type: 'sendMessage',
		message: '어라? 이제 되는건가?',
		options: {
			reply_markup: {
				hide_keyboard: true
			}
		},
		delay: 0
	},
	{
		type: 'waitAnswer',
		message: '이런 똥폰같으니라고...',
		options: {
			parse_mode: 'Markdown',
			reply_markup: {
				keyboard: [
					[{text: '1. ?'}],
					[{text: '2. 누구세요?'}],
					[{text: '3. 꺼져'}]
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
		nextPart: 3,
	},
	{
		nextStage: 1,
		nextPart: 3,
	},
	{
		nextStage: 1,
		nextPart: 4,
	}
];
