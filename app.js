var app = require('./config/server');

var server = app.listen(3000, () => 
{
    console.log("Server ON");
});

var io = require('socket.io').listen(server);

app.set('io', io);

io.on('connection', (socket) => {
    console.log('Usuário conectou');

    socket.on('disconnect', () => {
        console.log("USuário saiu");
    });

    socket.on('msgParaServer', (data) => {
        socket.emit('msgParaCliente', {
            apelido : data.apelido,
            mensagem : data.mensagem
        });

        socket.broadcast.emit('msgParaCliente', {
            apelido : data.apelido,
            mensagem : data.mensagem
        });
        if(parseInt(data.apelido_atualizado) == 0){
            socket.emit('participantesParaCliente', {
                apelido : data.apelido
            });

            socket.broadcast.emit('participantesParaCliente', {
                apelido : data.apelido
            });
        }
    });
});