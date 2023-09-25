#! /usr/bin/env node
import {program} from "commander";
import fs from "fs";
import chalk from "chalk";
import ora from "ora";
import spawn from "cross-spawn";
import create from "../lib/create.js";
import figlet from "figlet";

const cliVersion = JSON.parse(fs.readFileSync('package.json', 'utf8')).version;
const chalkKey = chalk.red;
const chalkValue = chalk.yellow;
program.version(cliVersion)
    .usage('<command> [option]');
program
    // 定义命令和参数
    .command('create <app-name>')
    .description('create a new project')
    // -f or --force 为强制创建，如果创建的目录存在则直接覆盖
    .option('-f, --force', 'overwrite target directory if it exist')
    .action((name, options) => {
        // 打印执行结果
        console.log(chalkKey('name:'), chalkValue(name) , chalkKey('options:'), chalkValue(options));
        create(name, options);
    });
// 配置 config 命令
program
    .command('config [value]')
    .description('inspect and modify the config')
    .option(`-g, --get <path>`, 'get value from option')
    .option('-s, --set <path> <value>')
    .option('-d, --delete <path>', 'delete option from config')
    .action((value, options) => {
        console.log(value, options)
    });
// 配置 ui 命令
program
    .command('ui')
    .description('start add open roc-cli ui')
    .option('-p, --port <port>', 'Port used for the UI Server')
    .action((option) => {
        console.log(option)
    });
//Help
program
    // 监听 --help 执行
    .on('--help', () => {
        console.log('\r\n' + figlet.textSync('SodaP', {
            font: 'Ghost',
            horizontalLayout: 'default',
            verticalLayout: 'default',
            width: 180,
            whitespaceBreak: true
        }));
        // 新增说明信息
        console.log(`\r\nRun ${chalk.cyan(`sd <command> --help`)} for detailed usage of given command\r\n`)
    })
// 解析用户执行命令传入参数
program.parse(process.argv);