var database = require('./database');
var categoria = {};

categoria.selectAll = function(callback) {
  if(database) {
    database.query("SELECT * FROM Categoria",
    function(error, resultados) {
      if(error) {
        throw error;
      } else {
        callback(null, resultados);
      }
    });//Fin query
  }//Fin IF
}//FIN SelectAll

categoria.select = function(idCategoria, callback) {
  if(database) {
    var sql = "SELECT * FROM Categoria WHERE idCategoria = ?";
    database.query(sql, idCategoria,
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback(null, resultado);
      }
    });//Fin query
  }//Fin IF
}//FIN SelectAll

categoria.insert = function(data, callback) {
  if(database) {
    var consulta = "CALL SP_addCategoria1(?)";
    database.query(consulta, data.nombreCategoria, function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback(null, {"insertId": resultado.insertId});
      }
    });
  }
}

categoria.update = function(data, cualquierFuncionCallback){
  if(database){
    var sql = "Call SP_updateCategoria(?, ?)"
    database.query(sql, [data.nombreCategoria, data.idCategoria],
       function(error, resultado){
        if(error){
          throw error;
        }else{
          cualquierFuncionCallback(null, data);
        }
      });
  }
}

categoria.delete = function(idCategoria, callback) {
  if(database) {
    var sql = "Call SP_deleteCategoria(?)";
    database.query(sql, idCategoria,
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback(null, {"Mensaje": "Eliminado"});
      }
    });//Fin query
  }//Fin IF
}//FIN SelectAll


module.exports = categoria;
