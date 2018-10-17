module.exports.chat = (app, req, res) => {
    res.render("chat");
}

module.exports.iniciaChat = (app, req, res) => {

    var body = req.body;
    req.assert('apelido', 'Nome ou apelido é obrigatório').notEmpty();
    req.assert('apelido', 'Nome ou apelido deve conter entre 3 e 15 chars').len(3,15);

    var erros = req.validationErrors();

    if(erros){
        res.render('index', {validacao:erros});
        return;
    }

    app.get('io').emit('msgParaCliente', 
    {
        apelido : body.apelido,
        mensagem: 'Acabou de entrar no chat'
    });

    res.render("chat", {body : body});
}