var delay = require('delay');
var SerialRunner = require('serial').SerialRunner;

var runnerTasker = new SerialRunner();

module.exports.doTask = function(task, callback) {
	// console.log('task'.rainbow, task);

	switch (task.type) {
		case 'sendMessages':
			var tasks = [];
			runnerTasker = new SerialRunner();

			// copy object
			for(var i in task.message) {
				var tmpTask = JSON.parse(JSON.stringify(task));
				tmpTask.message = {
					text: task.message[i].text,
					delay: task.message[i].delay
				};

				replaceMustaches(tmpTask);

				tasks[i] = tmpTask;
			}

			// run runner
			for(var t of tasks) {
				runnerTasker.add(function(t, cb) {
					telegramBot.sendMessage(t.msg.chat.id, t.message.text, t.options).then(function() {
						if(development) {
							t.message.delay = 0;
						}

						setTimeout(function() {
							cb();
						}, t.message.delay * 1000);
						// delay(t.message.delay * 1000).then(cb());
					}, function(err) {
						console.log(err);
					});
				}, t);
			}

			runnerTasker.run(function() {
				callback();
			});
			break;

		case 'waitAnswer':
			replaceMustaches(task);

			telegramBot.sendMessage(task.msg.chat.id, task.message.text, task.options).then(function() {
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

var replaceMustaches = function(task) {
	// console.log('========task======'.rainbow, task);
	task.message.text.replace( /\{\{(.*?)\}\}/g, function(x){
		var noMStr = task.message.text.match(/[\w\.]+/)[0];

		switch (noMStr) {
			case 'username':
				task.message.text = task.message.text.replace(x, task.msg.from.first_name);
				break;
			case 'wife_gender':
				var wifeGender = (savedData[task.msg.from.id].gender=='male')?'아내가':'남편이';
				task.message.text = task.message.text.replace(x, wifeGender);
				break;
		}

		return task.message.text;
	});

	return task;
};

// runner error
runnerTasker.onError(function(err) {
	runnerTasker.stop(); // stop further queued function from being run
	sendTelegram("There was an error on runner: "+err);
	console.log("There was an error on runner", err);
});
