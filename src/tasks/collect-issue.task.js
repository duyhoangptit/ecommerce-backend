const cron = require("node-cron");

class CollectIssueTask {

    execute() {
        return cron.schedule("*/10 * * * * *", function () {
            console.log("---------------------");
            console.log("running a task every 10 seconds");
        });
    }
}

module.exports = new CollectIssueTask()