var colors = require('colors');
var nodeTelegramBot = require('node-telegram-bot-api');
var fs = require('fs');

var config = require('./config.json');
var common = require('./common');

var startTime = new Date().getTime() / 1000;

global.development = true;

// Global saved data
global.savedData = require('./data/save.json');

// Global edit & save function
global.editData = function(msg, obj) {
	if(!savedData.hasOwnProperty(msg.from.id)) {
		savedData[msg.from.id] = {};
	}

	for(var key in obj) {
		savedData[msg.from.id][key] = obj[key];
	}

	saveData();
}

global.resetData = function(msg) {
	savedData[msg.from.id] = {
		"user": msg.from,
		"chat": msg.chat,
		"started": true,
		"stage": 1,
		"part": 1
	};

	saveData();
}

global.saveData = function() {
	fs.writeFileSync(__dirname + '/data/save.json', JSON.stringify(savedData));
}

// Telegram bot
global.telegramBot = new nodeTelegramBot(config.telegram.token, {
	polling: true
});

// Send message to all user instantly
global.sendTelegram = function(msg) {
	for (var i = 0, len = config.telegram.receivers.length - 1; i < len; i++) {
		telegramBot.sendMessage(config.telegram.receivers[i], msg)
			.then(function() {}, function(err) {
				console.log(err)
			});
	}
	return telegramBot.sendMessage(config.telegram.receivers[config.telegram.receivers.length - 1], msg).then(function() {}, function(err) {
		console.log(err)
	});
};

// Testing
console.log('Bot started! at ' + new Date());
sendTelegram('Bot started! at ' + new Date());

// Get messages from users and send to this user
telegramBot.on('message', function(msg) {
	console.log(new Date());
	console.log(msg.from.first_name + ': ' + msg.text);

	if (msg.date > startTime) {
		common.callSystem(msg);
	}
});
