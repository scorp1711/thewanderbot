const restify = require('restify');
const { BotFrameworkAdapter } = require('botbuilder');
const { EchoBot } = require('./bot');

const server = restify.createServer();
server.listen(process.env.PORT || 3978, function () {
    console.log(`\n${server.name} listening to ${server.url}`);
});

// ➡️ New root route
server.get('/', (req, res, next) => {
  res.send(200, 'Wanderbot App is Running!');
  next();
});

const adapter = new BotFrameworkAdapter({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword
});

const bot = new EchoBot();

server.post('/api/messages', async (req, res, next) => {
    await adapter.processActivity(req, res, async (context) => {
        await bot.run(context);
    });
    next();
});
