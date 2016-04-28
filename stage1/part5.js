module.exports.beforeTasks = [
	{
		type: 'sendMessages',
		message: [
			{text: '오', delay: 0},
			{text: '나랑 이름이같다니', delay: 0},
			{text: '신기하군그래', delay: 0.5},
			{text: '근데 설마 너', delay: 3}
		],
		options: {
			reply_markup: {
				hide_keyboard: true
			}
		}
	},
	{
		type: 'waitAnswer',
		message: {text: '여자니?'},
		options: {
			parse_mode: 'Markdown',
			reply_markup: {
				keyboard: [
					[{text: '1. 아니 남자'}],
					[{text: '2. 응 여잔데'}],
				],
				one_time_keyboard: true
			}
		}
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
