var part1 = require('./stage1/part1');

var SerialRunner = require('serial').SerialRunner;
var tasker = require('./tasker');

var runner = new SerialRunner();

// System menu
module.exports.callSystem = function(msg) {
	var responseMsg = '';
	var responseOpt = {
		reply_markup: {
			hide_keyboard: true
		}
	};

	var splitMsg = msg.text.split(' ');

	switch(splitMsg[0].toLowerCase()) {
		case "/도움말":
		case "/help":
			responseMsg = '```선택하세요```';
			responseOpt = {
				parse_mode: 'Markdown',
				reply_markup: {
					keyboard: [
						[{text: '/시작'}],
						[{text: '/종료'}]
					],
					one_time_keyboard: true
				}
			};

			telegramBot.sendMessage(msg.chat.id, responseMsg, responseOpt);
			break;

		case "/시작":
		case "/start":
		case "/start start":
			// reset data
			resetData(msg);

			responseMsg = 'Started!'
			telegramBot.sendMessage(msg.chat.id, responseMsg, responseOpt).then(function() {
				startPart(msg);
			});

			break;

		case "/저장":
		case "/save":
			saveData();
			break;

		case "/로드":
		case "/load":
			editData(msg, {stage: splitMsg[1], part: splitMsg[2]});
			startPart(msg);
			break;

		case "photo":
			responseMsg = 'Photo';
			telegramBot.sendPhoto(msg.chat.id, 'wallhaven-6686.jpg')
				.then(function() {}, function(err) {
					console.log(err)
				});
			return;
			break;

		default:
			// hook the message if waiting for answer
			if(savedData[msg.from.id] && savedData[msg.from.id].hasOwnProperty('waiting_answer') && savedData[msg.from.id].waiting_answer) {
				checkAnswer(msg);
			} else {
				responseMsg = '지금은 대답할 수 없어요. 기다려주시면 연락드리겠습니다.';
				telegramBot.sendMessage(msg.chat.id, responseMsg);
			}
	}

	console.log('Bot: ' + responseMsg, 'Options: ', responseOpt);
};

// Beginning the part story
var startPart = function(msg) {
	var stage = savedData[msg.from.id].stage;
	var part = savedData[msg.from.id].part;

	var thisPart = require('./stage'+stage+'/part'+part);
	runner = new SerialRunner();

	console.log('=========='.rainbow, 'Stage '.rainbow + stage + ' Part '.rainbow + part + ' started!!!'.rainbow, '=========='.rainbow);

	for(var task of thisPart.beforeTasks) {
		task['msg'] = msg;
		runner.add(tasker.doTask, task);
	}

	runner.run(function() {
		// console.log('waiting for answer'.rainbow);
	});
};

// When you're waiting for answer, check answer is validate
var checkAnswer = function(msg) {
	var stage = savedData[msg.from.id].stage;
	var part = savedData[msg.from.id].part;

	var thisPart = require('./stage'+stage+'/part'+part);

	var answerNumber = parseInt(msg.text.substring(0, 1)) - 1;

	// Wrong answer
	if(!thisPart.afterTasks.hasOwnProperty(answerNumber)) {
		responseMsg = '`You checked wrong answer!`';
		responseOpt = {
			reply_markup: {
				force_reply: true
			},
			parse_mode: 'Markdown'
		};
		telegramBot.sendMessage(msg.chat.id, responseMsg, responseOpt);

		return false;
	}

	// save user gender
	if(thisPart.afterTasks[answerNumber].hasOwnProperty('type')) {
		if(thisPart.afterTasks[answerNumber].type == 'selectGender') {
			var gender = (parseInt(msg.text.substring(0, 1))==1)?'male':'female';

			editData(msg, {'gender': gender});
		}
	}

	// Right answer
	editData(msg, {
		'stage': thisPart.afterTasks[answerNumber].nextStage,
		'part': thisPart.afterTasks[answerNumber].nextPart,
		'waiting_answer': false
	});

	// Start new part
	startPart(msg);

	return true;
};

// runner error
runner.onError(function(err) {
	runner.stop(); // stop further queued function from being run
	sendTelegram("There was an error on runner: "+err);
	console.log("There was an error on runner", err);
});
