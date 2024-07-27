#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
class BankAccount {
    accountNumber;
    balance;
    constructor(accountNumber, balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }
    withdraw(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(chalk.rgb(0, 255, 0)(`\n\t\tWithdrawal of $${amount} successful`));
            console.log(chalk.rgb(0, 255, 255)(`\t\tRemaining balance: $${this.balance}\n`));
        }
        else {
            console.log(chalk.rgb(255, 0, 0)(`\n\t\tInsufficient Balance!\n`));
        }
    }
    deposit(amount) {
        if (amount > 100) {
            amount -= 1;
        }
        this.balance += amount;
        console.log(chalk.rgb(0, 255, 0)(`\n\t\tDeposit of $${amount} Successful`));
        console.log(chalk.rgb(0, 255, 255)(`\t\tRemaining Balance : $${this.balance}\n`));
    }
    checkBalance() {
        console.log(chalk.rgb(0, 255, 255)(`\n\t\tYour Current Balance is ${this.balance}\n`));
    }
}
class Customer {
    firstName;
    lastName;
    gender;
    age;
    mobileNumber;
    account;
    constructor(firstName, lastName, gender, age, mobileNumber, account) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.account = account;
    }
}
const accounts = [new BankAccount(1001, 500), new BankAccount(1002, 1000), new BankAccount(1003, 1500), new BankAccount(1004, 2500)];
let customers = [
    new Customer("Hamdan", "Bhatti", "Male", 21, 3104488598, accounts[0]),
    new Customer("Ali", "Khan", "Male", 27, 3104484598, accounts[1]),
    new Customer("Ramiz", "Rajpoot", "Male", 25, 3102488398, accounts[2]),
    new Customer("Aslam", "Butt", "Male", 22, 3143438595, accounts[3]),
];
async function main() {
    console.log(chalk.bold.yellowBright("\n=========>\tWelcome to My Bank\t<=========\n"));
    let continueProgram = true;
    while (continueProgram) {
        let userAccNum = await inquirer.prompt({
            name: "accNum",
            type: "number",
            message: chalk.rgb(255, 165, 0)("Enter your account number: "),
        });
        const customer = customers.find((customer) => customer.account.accountNumber === userAccNum.accNum);
        if (customer) {
            console.log(chalk.rgb(0, 255, 0)(`\n\t\tWelcome "${customer.firstName} ${customer.lastName}"\n`));
            let continueOperations = true;
            while (continueOperations) {
                const ans = await inquirer.prompt({
                    name: "select",
                    type: "list",
                    message: chalk.rgb(255, 165, 0)("Select an Operation"),
                    choices: ["Deposit", "Withdraw", "Check Balance", "Exit"],
                });
                switch (ans.select) {
                    case "Deposit":
                        let depositAmount = await inquirer.prompt({
                            name: "amount",
                            type: "number",
                            message: chalk.rgb(255, 165, 0)("Enter amount to deposit: "),
                        });
                        customer.account.deposit(depositAmount.amount);
                        break;
                    case "Withdraw":
                        let withdrawAmount = await inquirer.prompt({
                            name: "amount",
                            type: "number",
                            message: chalk.rgb(255, 165, 0)("Enter amount to withdraw: "),
                        });
                        customer.account.withdraw(withdrawAmount.amount);
                        break;
                    case "Check Balance":
                        customer.account.checkBalance();
                        break;
                    case "Exit":
                        console.log(chalk.rgb(255, 255, 0)("Logging out..."));
                        await new Promise((resolve) => setTimeout(resolve, 2000));
                        continueOperations = false;
                        break;
                }
            }
        }
        else {
            console.log(chalk.rgb(255, 0, 0)("Invalid account number. Please try again!"));
        }
        const loginAgain = await inquirer.prompt({
            name: "choice",
            type: "list",
            message: chalk.rgb(255, 165, 0)("Do you want to login again or exit?"),
            choices: ["Login Again", "Exit"],
        });
        if (loginAgain.choice === "Exit") {
            console.log(chalk.rgb(255, 255, 0)("\n\tExiting..."));
            setTimeout(() => {
                console.log(chalk.bold.rgb(0, 149, 255)("\n\t\tThanks for using MyBank!\n"));
            }, 2000);
            continueProgram = false;
        }
    }
}
main();
