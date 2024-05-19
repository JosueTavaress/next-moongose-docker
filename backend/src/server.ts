import { app } from './app';

const porta = process.env.PORT || 4000;

const server = app.listen(porta, () => console.log(`App listening port:${porta}`));

process.on('SIGINT', () => {
    server.close();
    console.log('App finally');
})