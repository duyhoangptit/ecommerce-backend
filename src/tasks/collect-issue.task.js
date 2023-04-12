const cron = require("node-cron");

class CollectIssueTask {

    execute() {
        return cron.schedule("*/10 * * * * *", function () {
            if (process.env.TASK_ENABLE === 'false') {
                return;
            }

            console.log("---------------------");
            console.log("running a task every 10 seconds");
        });
    }
}

module.exports = new CollectIssueTask()