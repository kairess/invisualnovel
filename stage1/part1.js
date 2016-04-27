module.exports.beforeTasks = [
	{
		type: 'sendMessage',
		message: 'this is part1-1',
		options: {
			reply_markup: {
				hide_keyboard: true
			}
		},
		delay: 1
	},
	{
		type: 'sendMessage',
		message: 'this is part1-2',
		options: {
			reply_markup: {
				hide_keyboard: true
			}
		},
		delay: 2
	},
	{
		type: 'waitAnswer',
		message: 'wait for answer',
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
		text: 'go to part2',
		nextStage: 1,
		nextPart: 2,
	},
	{
		text: 'go to part3',
		nextStage: 1,
		nextPart: 3,
	}
];
