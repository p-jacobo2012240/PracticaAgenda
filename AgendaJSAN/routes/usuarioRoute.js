var express = require('express');
var Autenticacion = require('../helper/autenticacion');
var auth = new Autenticacion();
var usuario = require('../model/usuario');
var router = express.Router();

router.get('/autenticar', function(req, res) {
  res.render('default/autenticar', {title: 'Autenticar'});
});

router.get('/registrar', function(req, res) {
  res.render('default/registrar', {title: 'Registrar'});
});

router.get('/salir', function(req, res) {
  res.clearCookie('idUsuario');
  res.clearCookie('nick');
  res.redirect('/');
});

router.get('/api/usuario/', function(req, res) {
  usuario.selectAll(function(error, resultados){
    if(typeof resultados !== undefined) {
      res.json(resultados);
    } else {
      res.json({"Mensaje": "No hay usuarios"});
    }
  });
});

router.get('/api/usuario/:idUsuario',
  function(req, res) {
    var idUsuario = req.params.idUsuario;
    usuario.select(idUsuario,
      function(error, resultados){
      if(typeof resultados !== undefined) {
        res.json(resultados);
      } else {
        res.json({"Mensaje": "No hay usuarios"});
      }
  });
});



router.put('/perfil', function(req, res) {
  var data = {
    idUsuario : auth.getIdUsuario(),
    nick: req.body.nick,
    contrasena: req.body.contrasena
  }

  if(data.idUsuario !== 0) {
    usuario.update(data, function(err, resultado) {
      if(resultado !== undefined) {
        res.json(resultado);
      } else {
        res.json({"Mensaje": "No se modifico la usuario"});
      }
    });
  } else {
    res.json({"Mensaje": "No concuerdan los datos"});
  }
});

router.delete('/api/usuario/:idUsuario',
  function(req, res) {
    var idUsuario = req.params.idUsuario;
    usuario.delete(idUsuario,
      function(error, resultado){
      if(typeof resultado !== undefined) {
        res.redirect("/api/usuario");
      } else {
        res.json({"Mensaje": "No se puede eliminar"});
      }
  });
});

router.post('/autenticar', function(req, res) {
  var data =  {
    nick : req.body.nick,
    contrasena: req.body.contrasena
  }

  usuario.autenticar(data, function(err, resultado) {
    if(typeof resultado !== undefined) {
      res.cookie('nick', resultado[0].nick);
      res.cookie('idUsuario', resultado[0].idUsuario);
      res.redirect('/');
    } else {
      res.json({"Mensaje": "No existe usuario"});
    }
  });
});


router.post('/registrar', function(req, res) {
  var data =  {
    nick : req.body.nick,
    contrasena: req.body.contrasena
  }
  usuario.insert(data, function(err, resultado) {
    if(resultado && resultado.insertId > 0) {
      res.cookie('nick', resultado.nick);
      res.cookie('idUsuario', resultado.idUsuario);
      res.redirect('/');
    } else {
      res.json({"Mensaje": "No se registro el usuario"});
    }
  });
});

router.get('/api/usuario/usuarioActual',
  function(req, res) {
    var usuario = {
      id: auth.getIdUsuario() ,
      nick: auth.getNick()
    }
    res.json(usuario);
});
module.exports = router;
