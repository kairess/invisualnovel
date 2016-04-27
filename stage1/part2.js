module.exports.beforeTasks = [
	{
		type: 'sendMessage',
		message: 'wait for me turn on!',
		options: {
			reply_markup: {
				hide_keyboard: true
			}
		},
		delay: 5
	},
	{
		type: 'sendMessage',
		message: 'yeah i turned on!',
		options: {
			reply_markup: {
				hide_keyboard: true
			}
		},
		delay: 1
	},
	{
		type: 'waitAnswer',
		message: 'wait for answer2',
		options: {
			parse_mode: 'Markdown',
			reply_markup: {
				keyboard: [
					[{text: '1. correct'}],
					[{text: '2. fail'}]
				],
				one_time_keyboard: true
			}
		},
		delay: 0
	}
];

module.exports.afterTasks = [
	{
		text: 'go to part3',
		nextStage: 1,
		nextPart: 2,
	},
	{
		text: 'go to part4',
		nextStage: 1,
		nextPart: 3,
	}
];
