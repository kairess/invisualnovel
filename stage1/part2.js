module.exports.beforeTasks = [
	{
		type: 'sendMessages',
		message: [
			{text: '어라? 이제 되는건가?', delay: 0},
		],
		options: {
			reply_markup: {
				hide_keyboard: true
			}
		}
	},
	{
		type: 'waitAnswer',
		message: {text: '이런 똥폰같으니라고...'},
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
