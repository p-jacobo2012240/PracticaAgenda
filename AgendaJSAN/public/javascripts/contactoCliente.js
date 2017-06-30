var ContactoCliente = function() {
  var main = this;
  var contactoUri = "http://localhost:3000/api/contacto";
  var categoriaUri = "http://localhost:3000/api/categoria"
  main.contactos = ko.observableArray([]);
  main.categoria = ko.observableArray([]);
  main.contactoCargado = ko.observable();
  main.categoriaSeleccionada = ko.observable();
  main.categoriaSeleccionada1 = ko.observable();
  
  main.contactoNuevo = {
    nombreContacto: ko.observable(),
    apellido: ko.observable(),
    direccion: ko.observable(),
    telefono: ko.observable(),
    correo: ko.observable(),
    idCategoria: ko.observable()
  }

  function ajaxHelper(uri, method, data) {
    return $.ajax({
      url : uri,
      type: method,
      dataType: 'json',
      contentType: 'application/json',
      data: data ? JSON.stringify(data) : null
    }).fail(function(jqXHR, textStatus, errorThrown){
      console.log(errorThrown);
    })
  }

  main.getAllContactos = function() {
    ajaxHelper(contactoUri, 'GET').done(function(data) {
      limpiar();
      main.contactos(data);
    });
  }

  main.getAllCategorias = function(){
    ajaxHelper(categoriaUri, 'GET').done(function(data){
      main.categoria(data);
    });
  }

  main.agregar = function(){
    var contacto = {
      nombreContacto: main.contactoNuevo.nombreContacto(),
      apellido: main.contactoNuevo.apellido(),
      direccion: main.contactoNuevo.direccion(),
      telefono: main.contactoNuevo.telefono(),
      correo: main.contactoNuevo.correo(),
      idCategoria: main.categoriaSeleccionada1().idCategoria
    }
     ajaxHelper(contactoUri, 'POST', contacto).done(
       function(item){
         main.getAllContactos();
         $("#modalAgregarContacto").modal('hide');
       })
  }

  main.eliminar = function(item){
    var contactoId = item.idContacto;
    console.log(JSON.stringify(item));
      ajaxHelper(contactoUri +"/"+ contactoId, 'DELETE').done(function(data){
        main.getAllContactos();
      })
  }

  main.cargar = function(item){
    console.log(JSON.stringify(item));
    main.contactoCargado(item);
    $("#modalEditarContacto").modal('show');
  }

  main.editar = function(){
    var data = {
       idContacto: main.contactoCargado().idContacto,
       nombreContacto: main.contactoCargado().nombreContacto,
       apellido: main.contactoCargado().apellido,
       direccion: main.contactoCargado().direccion,
       telefono: main.contactoCargado().telefono,
       correo: main.contactoCargado().correo,
       idCategoria: main.categoriaSeleccionada().idCategoria
     }
     ajaxHelper(contactoUri + "/" + data.idContacto,'PUT',data).done(
       function(item){
         main.getAllContactos();
         $("#modalEditarContacto").modal('hide');
       }
      )
  }
  
  function limpiar(){
    main.contactoNuevo.nombreContacto(null);
    main.contactoNuevo.apellido(null);
    main.contactoNuevo.direccion(null);
    main.contactoNuevo.telefono(null);
    main.contactoNuevo.correo(null);
    main.contactoNuevo.idCategoria(null);
  }

  main.getAllContactos();
  main.getAllCategorias();
}

$(document).ready(function() {
  var contacto1 = new ContactoCliente();
  ko.applyBindings(contacto1);
});
