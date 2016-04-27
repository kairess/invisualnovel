var delay = require('delay');

module.exports.doTask = function(task, callback) {
	// console.log('task'.rainbow, task);

	replaceMustache(task);

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

var replaceMustache = function(task) {
	task.message.replace( /\{\{(.*?)\}\}/g, function(x){
		var noMStr = task.message.match(/[\w\.]+/)[0];

		switch (noMStr) {
			case 'username':
				task.message = task.message.replace(x, task.msg.from.first_name);
				break;
			case 'wife_gender':
				var wifeGender = (savedData[task.msg.from.id].gender=='male')?'아내가':'남편이';
				task.message = task.message.replace(x, wifeGender);
				break;
		}

		return task.message;
	});

	return task;
};

// console.log(replaceMustache({msg:{from:{first_name:'이태희'}},message:'아 나는 {{username}}'}));
