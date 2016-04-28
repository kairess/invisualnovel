/*
파트6
잠깐만... 누가와가지고
(10초 대기)
[남편, 아내]가 왔네
*/

module.exports.beforeTasks = [
	{
		type: 'sendMessages',
		message: [
			{text: '잠깐만... 누가와가지고', delay: 2}
		],
		options: {
			reply_markup: {
				hide_keyboard: true
			}
		}
	},
	{
		type: 'waitAnswer',
		message: {text: '{{wife_gender}} 왔네'},
		options: {
			parse_mode: 'Markdown',
			reply_markup: {
				keyboard: [
					[{text: '1. 아니 너 결혼했냐?'}],
					[{text: '2. ㅎㅎㅎㅎㅎ'}],
				],
				one_time_keyboard: true
			}
		}
	}
];

module.exports.afterTasks = [
	{
		nextStage: 1,
		nextPart: 6,
	},
	{
		nextStage: 1,
		nextPart: 6,
	}
];
