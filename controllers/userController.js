exports.get = (req, res, next) => {
    res.status(200).send('Requisição recebida com sucesso!');
};

exports.getByUsername = (req, res, next) => {
    res.status(200).send('Olá: ' + req.params.username);
    
};