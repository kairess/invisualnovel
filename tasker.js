var delay = require('delay');

module.exports.doTask = function(task, callback) {
	// console.log('task'.rainbow, task);

	switch (task.type) {
		case 'sendMessage':
			telegramBot.sendMessage(task.msg.chat.id, task.message, task.options).then(function() {
				delay(task.delay * 1000).then(callback);
			}, function(err) {
				console.log(err);
			});
			break;

		case 'waitAnswer':
				telegramBot.sendMessage(task.msg.chat.id, task.message, task.options).then(function() {
					editData(task.msg, {'waiting_answer': true});

					callback();
				}, function(err) {
					console.log(err);
				});
				break;

		default:
			console.log('No such tasks!'.red);
	}
};
