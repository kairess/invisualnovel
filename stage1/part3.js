module.exports.beforeTasks = [
	{
		type: 'sendMessage',
		message: '아 나는 {{username}}',
		options: {
			reply_markup: {
				hide_keyboard: true
			}
		},
		delay: 0
	},
	{
		type: 'sendMessage',
		message: '근데 이 똥폰이',
		options: {
			reply_markup: {
				hide_keyboard: true
			}
		},
		delay: 0
	},
	{
		type: 'sendMessage',
		message: '용케도 되네?',
		options: {
			reply_markup: {
				hide_keyboard: true
			}
		},
		delay: 0
	},
	{
		type: 'waitAnswer',
		message: '10년전에 쓰던건데',
		options: {
			parse_mode: 'Markdown',
			reply_markup: {
				keyboard: [
					[{text: '1. 오 나랑 이름이 같네?'}]
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
		nextPart: 5,
	}
];
