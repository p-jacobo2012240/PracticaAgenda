var database = require('./database');
var contacto = {};

contacto.selectAll = function(idUsuario, callback) {
  if(database) {
    database.query("SELECT * FROM vistaContacto",
    idUsuario,
    function(error, resultados) {
      if(error) {
        throw error;
      } else {
        callback(null, resultados);
      }
    });//Fin query
  }//Fin IF
}//FIN SelectAll

contacto.select = function(idContacto, callback) {
  if(database) {
    var sql = "SELECT * FROM Contacto WHERE idContacto = ?";
    database.query(sql, idContacto,
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback(null, resultado);
      }
    });//Fin query
  }//Fin IF
}//FIN SelectAll

contacto.insert = function(data, callback){
  if(database){
    database.query("Call SP_agregarContacto(?,?,?,?,?,?)",
      [data.nombreContacto, data.apellido, data.direccion, data.telefono, data.correo, data.idCategoria, data.idUsuario], function(error, resultado){
        if(error){
          throw error;
        }else{
          callback(null, {"insertId": resultado.insertId});
        }
      });
  }
}

contacto.update = function(data, callback){
  if(database){
    var sql = "Call SP_updateContacto(?,?,?,?,?,?,?)"
    database.query(sql, [data.idContacto, data.nombreContacto, data.apellido, data.direccion, data.telefono, data.correo, data.idCategoria],
       function(error, resultado){
        if(error){
          throw error;
        }else{
          callback(null, data);
        }
      });
  }
}

contacto.delete = function(idContacto, callback){
  if(database){
    var consulta = "Call SP_deleteContacto(?)";
    database.query(consulta, idContacto,
      function(error, resultado){
        if(error){
          throw error;
        }else{
          var notificacion = {"Mensaje": ""}
          if(resultado.affectedRows > 0){
            notificacion.Mensaje = "Eliminado correctamente";
          }else{
            notificacion.Mensaje = "No se pudo eliminar";
          }

          callback(null, notificacion)

        }
      });
  }
}


module.exports = contacto;
