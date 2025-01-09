// const { Telegraf, Markup, session, Scenes, } = require('telegraf');
// const { help, aboutSei, community, guide, create_wallet, buy_sei } = require('./responses.cjs');
// const { sendSei, getBalance } = require('./send.cjs');
// require('dotenv').config();

// // Command Descriptions
// const commands = [
//     { command: 'start', description: 'Show a list of all commands.' },
//     { command: 'aboutsei', description: "Learn about Sei and its features." },
//     { command: 'community', description: "Join and collaborate with the Sei community." },
//     { command: 'guide', description: "Guides users through wallet creation, sending/receiving SEI, and exporting private keys." },
//     { command: 'wallet_connect', description: "Guide for wallet creation." },
//     { command: 'buy_sell_coin', description: "Guide for buying/selling coins." },
//     { command: 'balance', description: "Check balance." },
//     { command: 'buysei', description: "Guide on how to buy SEI with SimpleSwap.io." },
//     { command: 'exportwallet', description: "Guide on exporting wallet keys and providing a download link... Coming soon." },
//     { command: 'games', description: "List of games on the Sei network... Coming soon." },
//     { command: 'swap', description: "Swap tokens on Dragon Swap... Coming soon." },
//     { command: 'chatbot', description: "A chatbot to answer all Sei-based questions... Coming soon." },
// ];

// // Initialize Bot
// const bot = new Telegraf(process.env.BOT_TOKEN);

// bot.use(session());

// // Create a scene for collecting input
// const inputScene = new Scenes.WizardScene(
//     'sendscenes',
//     // Step 1: Ask for first string
//     (ctx) => {
//         ctx.reply('Please enter your mnemonic phrase:');
//         return ctx.wizard.next();
//     },
//     // Step 2: Save first string and ask for second
//     (ctx) => {
//         // Save first string
//         ctx.wizard.state.firstString = ctx.message.text;
//         ctx.reply('Please enter recipient sei address:');
//         return ctx.wizard.next();
//     },
//     (ctx) => {
//         // Save first string
//         ctx.wizard.state.secondString = ctx.message.text;
//         ctx.reply('Please enter an amount of SEI to send:');
//         return ctx.wizard.next();
//     },
//     // Step 3: Process both inputs
//     (ctx) => {
//         const amount = ctx.message.text;
//         const { firstString, secondString } = ctx.wizard.state;

//         // Process the collected data
//         processUserInput(ctx, firstString, secondString, amount);

//         // End the scene
//         return ctx.scene.leave();
//     }
// );

// const balanceScene = new Scenes.WizardScene(
//     'get_balance',
//     // Step 1: Ask for first string
//     (ctx) => {
//         ctx.reply('Please enter your address');
//         return ctx.wizard.next();
//     },
//     (ctx) => {
//         const address = ctx.message.text;
//         console.log(address)
//         getBalance(address).then((res)=> ctx.reply(res)).catch(error=> ctx.reply(`Error: ${error.message}`))
//         // End the scene
//         return ctx.scene.leave();
//     }
// );


// // Create stage and register the scene
// const stage = new Scenes.Stage([inputScene, balanceScene]);
// bot.use(stage.middleware());


// // Register Commands


// bot.telegram.setMyCommands(commands);

// // Command Handlers
// bot.start((ctx) => {
//     const keyboard = Markup.inlineKeyboard([
//         [
//             Markup.button.callback('About Sei', 'aboutsei'),
//             Markup.button.callback('Join Sei Community', 'community'),
//         ],
//         [
//             Markup.button.callback('Sei Guide', 'guide'),
//             Markup.button.callback('Buy sei', 'buysei')
//         ],
//     ]);
//     ctx.reply(help(), keyboard);
// });

// bot.command('aboutsei', (ctx) => {
//     aboutSei().then(response => ctx.reply(response)).catch(error => ctx.reply(`Error: ${error.message}`));
// });

// bot.command('community', (ctx) => {
//     community().then(response => ctx.reply(response)).catch(error => ctx.reply(`Error: ${error.message}`));
// });

// bot.command('guide', (ctx) => {
//     const keyboard = Markup.inlineKeyboard([
//         [
//             Markup.button.callback('Wallet Creation', 'wallet_connect'),
//             Markup.button.callback('Send & Receive SEI', 'buy_sell_coin'),
//         ],
//         [Markup.button.callback('Check balance', 'balance')],
//     ]);
//     ctx.reply('Choose a guide:', keyboard);
// });

// bot.command("balance", (ctx)=>{
//     ctx.scene.enter("get_balance")
// })
// bot.command('buysei', (ctx)=>{
//     ctx.reply(buy_sei())
// })



// //Actions

// bot.action('aboutsei', (ctx) => {
//     aboutSei().then(response => ctx.reply(response)).catch(error => ctx.reply(`Error: ${error.message}`));
// });

// bot.action('community', (ctx) => {
//     community().then(response => ctx.reply(response)).catch(error => ctx.reply(`Error: ${error.message}`));
// });

// bot.action('guide', (ctx) => {
//     const keyboard = Markup.inlineKeyboard([
//         [
//             Markup.button.callback('Wallet Creation', 'wallet_connect'),
//             Markup.button.callback('Send & Receive SEI', 'buy_sell_coin'),
//         ],
//         [Markup.button.callback('Check balance', 'balance')],
//     ]);
//     ctx.reply(guide(), keyboard);
// });

// bot.action("wallet_connect", (ctx)=>{
//     create_wallet().then(response => ctx.reply(response)).catch(error => ctx.reply(`Error: ${error.message}`));
// })

// bot.action("buy_sell_coin", (ctx)=>{
//     ctx.scene.enter('sendscenes');
// })

// bot.action("balance", (ctx)=>{
//     ctx.scene.enter("get_balance")
// })
// bot.action('buysei', (ctx)=>{
//     ctx.reply(buy_sei())
// })

// function processUserInput(ctx, firstString, secondString, amount) {
//     sendSei(firstString, secondString, `${Number(amount) * 1000000}`).then(response => ctx.reply(`Sent ${Number(amount)/1000000} SEI to ${secondString} \n` + `Transaction hash: ${response.transactionHash}`)).catch(error => ctx.reply(`Error: ${error.message}`));
    
//     // Add your command logic here using firstString and secondString
// }

// // Fallback Handler for Undefined Commands
// bot.on('text', (ctx) => {
//     ctx.reply('Still working on this command. Developers need rest too!');
// });



// // Start Bot
// bot.launch()
//     .then(() => console.log('Bot started successfully'))
//     .catch((error) => console.error('Error starting bot:', error));

// // Graceful Stop
// process.once('SIGINT', () => bot.stop('SIGINT'));
// process.once('SIGTERM', () => bot.stop('SIGTERM'));


const { Telegraf, Markup, session, Scenes } = require('telegraf');
const express = require('express');
const { help, aboutSei, community, guide, create_wallet, buy_sei } = require('./responses.cjs');
const { sendSei, getBalance } = require('./send.cjs');
require('dotenv').config();

// Initialize Express App
const app = express();
const PORT = process.env.PORT || 3000;

// Command Descriptions
const commands = [
    { command: 'start', description: 'Show a list of all commands.' },
    { command: 'aboutsei', description: "Learn about Sei and its features." },
    { command: 'community', description: "Join and collaborate with the Sei community." },
    { command: 'guide', description: "Guides users through wallet creation, sending/receiving SEI, and exporting private keys." },
    { command: 'wallet_connect', description: "Guide for wallet creation." },
    { command: 'buy_sell_coin', description: "Guide for buying/selling coins." },
    { command: 'balance', description: "Check balance." },
    { command: 'buysei', description: "Guide on how to buy SEI with SimpleSwap.io." },
    { command: 'exportwallet', description: "Guide on exporting wallet keys and providing a download link... Coming soon." },
    { command: 'games', description: "List of games on the Sei network... Coming soon." },
    { command: 'swap', description: "Swap tokens on Dragon Swap... Coming soon." },
    { command: 'chatbot', description: "A chatbot to answer all Sei-based questions... Coming soon." },
];

// Initialize Bot
const bot = new Telegraf(process.env.BOT_TOKEN);
bot.use(session());

// Create Scenes
const inputScene = new Scenes.WizardScene(
    'sendscenes',
    (ctx) => {
        ctx.reply('Please enter your mnemonic phrase:');
        return ctx.wizard.next();
    },
    (ctx) => {
        ctx.wizard.state.firstString = ctx.message.text;
        ctx.reply('Please enter recipient sei address:');
        return ctx.wizard.next();
    },
    (ctx) => {
        ctx.wizard.state.secondString = ctx.message.text;
        ctx.reply('Please enter an amount of SEI to send:');
        return ctx.wizard.next();
    },
    (ctx) => {
        const amount = ctx.message.text;
        const { firstString, secondString } = ctx.wizard.state;

        processUserInput(ctx, firstString, secondString, amount);
        return ctx.scene.leave();
    }
);

const balanceScene = new Scenes.WizardScene(
    'get_balance',
    (ctx) => {
        ctx.reply('Please enter your address:');
        return ctx.wizard.next();
    },
    (ctx) => {
        const address = ctx.message.text;
        getBalance(address)
            .then((res) => ctx.reply(res))
            .catch((error) => ctx.reply(`Error: ${error.message}`));
        return ctx.scene.leave();
    }
);

// Register Scenes
const stage = new Scenes.Stage([inputScene, balanceScene]);
bot.use(stage.middleware());

// Register Commands
bot.telegram.setMyCommands(commands);

bot.start((ctx) => {
    const keyboard = Markup.inlineKeyboard([
        [Markup.button.callback('About Sei', 'aboutsei'), Markup.button.callback('Join Sei Community', 'community')],
        [Markup.button.callback('Sei Guide', 'guide'), Markup.button.callback('Buy sei', 'buysei')],
    ]);
    ctx.reply(help(), keyboard);
});

bot.command('aboutsei', (ctx) => {
    aboutSei().then((response) => ctx.reply(response)).catch((error) => ctx.reply(`Error: ${error.message}`));
});

bot.command('community', (ctx) => {
    community().then((response) => ctx.reply(response)).catch((error) => ctx.reply(`Error: ${error.message}`));
});

bot.command('guide', (ctx) => {
    const keyboard = Markup.inlineKeyboard([
        [Markup.button.callback('Wallet Creation', 'wallet_connect'), Markup.button.callback('Send & Receive SEI', 'buy_sell_coin')],
        [Markup.button.callback('Check balance', 'balance')],
    ]);
    ctx.reply('Choose a guide:', keyboard);
});

bot.command('balance', (ctx) => ctx.scene.enter('get_balance'));

bot.command('buysei', (ctx) => ctx.reply(buy_sei()));

bot.action('aboutsei', (ctx) => {
    aboutSei().then((response) => ctx.reply(response)).catch((error) => ctx.reply(`Error: ${error.message}`));
});

bot.action('community', (ctx) => {
    community().then((response) => ctx.reply(response)).catch((error) => ctx.reply(`Error: ${error.message}`));
});

bot.action('guide', (ctx) => {
    const keyboard = Markup.inlineKeyboard([
        [Markup.button.callback('Wallet Creation', 'wallet_connect'), Markup.button.callback('Send & Receive SEI', 'buy_sell_coin')],
        [Markup.button.callback('Check balance', 'balance')],
    ]);
    ctx.reply(guide(), keyboard);
});

bot.action('wallet_connect', (ctx) => {
    create_wallet().then((response) => ctx.reply(response)).catch((error) => ctx.reply(`Error: ${error.message}`));
});

bot.action('buy_sell_coin', (ctx) => ctx.scene.enter('sendscenes'));

bot.action('balance', (ctx) => ctx.scene.enter('get_balance'));

bot.action('buysei', (ctx) => ctx.reply(buy_sei()));

function processUserInput(ctx, firstString, secondString, amount) {
    sendSei(firstString, secondString, `${Number(amount) * 1000000}`)
        .then((response) => ctx.reply(`Sent ${Number(amount)} SEI to ${secondString}\nTransaction hash: ${response.transactionHash}`))
        .catch((error) => ctx.reply(`Error: ${error.message}`));
}

bot.on('text', (ctx) => ctx.reply('Still working on this command. Developers need rest too!'));

// Graceful Stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

// Express Endpoint for Bot Updates
app.use(bot.webhookCallback('/bot'));

// Health Check Endpoint
app.get('/', (req, res) => res.send('Bot is running!'));

// Start Express Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    bot.telegram.setWebhook(`${process.env.WEBHOOK_URL}/bot`);
});
