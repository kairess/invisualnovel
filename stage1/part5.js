module.exports.beforeTasks = [
	{
		type: 'sendMessage',
		message: '오',
		options: {
			reply_markup: {
				hide_keyboard: true
			}
		},
		delay: 0
	},
	{
		type: 'sendMessage',
		message: '나랑 이름이같다니',
		options: {
			reply_markup: {
				hide_keyboard: true
			}
		},
		delay: 0
	},
	{
		type: 'sendMessage',
		message: '신기하군그래',
		options: {
			reply_markup: {
				hide_keyboard: true
			}
		},
		delay: 2
	},
	{
		type: 'sendMessage',
		message: '근데 설마 너',
		options: {
			reply_markup: {
				hide_keyboard: true
			}
		},
		delay: 0.5
	},
	{
		type: 'waitAnswer',
		message: '여자니?',
		options: {
			parse_mode: 'Markdown',
			reply_markup: {
				keyboard: [
					[{text: '1. 아니 남자'}],
					[{text: '2. 응 여잔데'}],
				],
				one_time_keyboard: true
			}
		},
		delay: 0
	}
];

module.exports.afterTasks = [
	{
		type: 'selectGender',
		nextStage: 1,
		nextPart: 6,
	},
	{
		type: 'selectGender',
		nextStage: 1,
		nextPart: 6,
	}
];
