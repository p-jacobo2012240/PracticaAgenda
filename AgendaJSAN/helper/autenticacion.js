var Autenticacion = function() {
  var path = "default/";
  var acceso = false;
  var idUsuario = 0;
  var nick = "";
  var password = "";

  this.getPath = function() {
    return path;
  }

  this.getAcceso = function() {
    return acceso;
  }

  this.getIdUsuario = function() {
    return idUsuario;
  }

  this.getNick = function() {
    return nick;
  }

  this.getPassword = function(){
    return password;
  }

  this.autorizar = function(peticion) {
    var cookie = peticion.cookies;
    if(cookie.nick !== undefined &&
      cookie.idUsuario !== undefined) {
      path = "dashboard/";
      acceso = true;
      idUsuario = cookie.idUsuario;
      nick = cookie.nick;
      password = cookie.password;
      console.log("Path: " + path);
      console.log("Acceso: " + acceso);
      console.log("idUsuario: " + idUsuario);
    } else {
      path = "default/";
      acceso = false;
      idUsuario = 0;
    }
  }
  return this;
}

module.exports = Autenticacion;
