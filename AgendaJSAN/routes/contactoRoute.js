var express = require('express');
var contacto = require('../model/contacto');
var Autenticacion = require('../helper/autenticacion');
var router = express.Router();
var auth = new Autenticacion();

router.get('/api/contacto', function(req, res){
  auth.autorizar(req);
  if(auth.getAcceso()){
    contacto.selectAll(auth.getIdUsuario(),function(error, resultados){
      if(typeof resultados !== undefined){
        res.json(resultados);
      }else{
        res.json({"Mensaje" : "No hay contactos"});
      }
    });
  }else{
    console.log('no se pudo, regresa a autenticar');
    res.redirect('/autenticar');
  }

});

router.get('/api/contacto/:idContacto',
  function(req, res) {
    var idContacto = req.params.idContacto;
    contacto.select(idContacto, function(error, resultados){
      if(typeof resultados !== undefined) {
        res.json(resultados);
      } else {
        res.json({"Mensaje": "No hay contactos"});
      }
  });
});

router.post('/api/contacto', function(req, res){
  var data ={
    nombreContacto: req.body.nombreContacto,
    apellido: req.body.apellido,
    direccion: req.body.direccion,
    telefono: req.body.telefono,
    correo: req.body.correo,
    idCategoria: req.body.idCategoria,
    idUsuario: auth.getIdUsuario() // obtener usuario loggeado
  }
  console.log("Id usuario loggeado: "+data.idUsuario);

  contacto.insert(data,function(error, resultado){
    if(resultado && resultado.insertId > 0){
      res.json(resultado);
    }else{
      res.json({"Mensaje" : "No hay contactos"});
    }
  });
});

router.put('/api/contacto/:idContacto', function(req, res) {
  var idContacto = req.params.idContacto;
  var data = {
    idContacto : req.body.idContacto,
    nombreContacto: req.body.nombreContacto,
    apellido: req.body.apellido,
    direccion: req.body.direccion,
    telefono: req.body.telefono,
    correo: req.body.correo,
    idCategoria: req.body.idCategoria
  }

  if(idContacto === data.idContacto) {
    contacto.update(data, function(err, resultado) {
      if(resultado !== undefined) {
        res.json(resultado);
      } else {
        res.json({"Mensaje": "No se modifico la contacto"});
      }
    });
  } else {
    res.json({"Mensaje": "No concuerdan los datos"});
  }
});

router.delete('/api/contacto/:idContacto', function(req, res){
  var idContacto = req.params.idContacto;
    contacto.delete(idContacto,function(error, resultado){
      if(typeof resultado !== undefined){
        res.json(resultado);
      }else{
        res.json({"Mensaje": "Incorrecto, no se elimino"});
      }
    });
});


module.exports = router;
