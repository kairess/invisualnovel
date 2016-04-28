module.exports.beforeTasks = [
	{
		type: 'sendMessages',
		message: [
			{text: '아 나는 {{username}}', delay: 0},
			{text: '근데 이 똥폰이', delay: 0},
			{text: '용케도 되네?', delay: 0}
		],
		options: {
			reply_markup: {
				hide_keyboard: true
			}
		}
	},
	{
		type: 'waitAnswer',
		message: {text: '10년전에 쓰던건데'},
		options: {
			parse_mode: 'Markdown',
			reply_markup: {
				keyboard: [
					[{text: '1. 오 나랑 이름이 같네?'}]
				],
				one_time_keyboard: true
			}
		}
	}
];

module.exports.afterTasks = [
	{
		nextStage: 1,
		nextPart: 5,
	}
];
