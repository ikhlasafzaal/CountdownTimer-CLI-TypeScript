#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
console.log(chalk.yellow.bold("\n \t \t Countdown Timer"));
async function runTimer() {
    const { duration, selectedUnit } = await inquirer.prompt([
        {
            name: "duration",
            type: "number",
            message: chalk.cyan("Enter duration:"),
        },
        {
            name: "selectedUnit",
            type: "list",
            message: chalk.cyan("Select unit:"),
            choices: ["seconds", "minutes", "hours"],
        }
    ]);
    // Convert time to second
    let totalSeconds;
    switch (selectedUnit) {
        case "minutes":
            totalSeconds = duration * 60;
            break;
        case "hours":
            totalSeconds = duration * 3600;
            break;
        default:
            totalSeconds = duration;
            break;
    }
    // start timer
    const startTime = new Date();
    const endTime = new Date(startTime.getTime() + totalSeconds * 1000);
    const interval = setInterval(() => {
        const currentTime = new Date();
        const difference = Math.floor((endTime.getTime() - currentTime.getTime()) / 1000);
        if (difference <= 0) {
            clearInterval(interval);
            console.log(chalk.green("\n \n \t'Timer Completed.'"));
            // run the timer again
            inquirer.prompt([
                {
                    name: "runAgain",
                    type: "confirm",
                    message: chalk.yellow("Do you want to run the timer again?")
                }
            ]).then((answer) => {
                if (answer.runAgain) {
                    runTimer();
                }
                else {
                    console.log(chalk.blue("\n \t Countdown Timer Exit."));
                    process.exit();
                }
            });
        }
        else {
            const hours = Math.floor(difference / 3600);
            const minutes = Math.floor((difference % 3600) / 60);
            const remainingSeconds = difference % 60;
            process.stdout.write("\n \t Time Left: " +
                chalk.magentaBright(hours < 10 ? "0" + hours : hours) + ":" +
                chalk.magentaBright(minutes < 10 ? "0" + minutes : minutes) + ":" +
                chalk.magentaBright(remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds));
        }
    }, 1000);
}
runTimer();
