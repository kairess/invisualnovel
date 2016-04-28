module.exports.beforeTasks = [
	{
		type: 'sendMessages',
		message: [
			{text: '다짜고짜 욕질이야', delay: 0}
		],
		options: {
			reply_markup: {
				hide_keyboard: true
			}
		}
	},
	{
		type: 'waitAnswer',
		message: {text: '넌 누구냐?'},
		options: {
			parse_mode: 'Markdown',
			reply_markup: {
				keyboard: [
					[{text: '1. 이름을 말한다'}],
					[{text: '2. 그러는 넌 누구냐'}],
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
	},
	{
		nextStage: 1,
		nextPart: 3,
	}
];
