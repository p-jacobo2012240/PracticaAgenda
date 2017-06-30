  var CategoriaCliente = function(){
	var main = this;
	var categoriaUri = "http://localhost:3000/api/categoria"
	main.categorias = ko.observableArray([]);
	main.categoriaCargada = ko.observable();
	main.categoriaNueva = {
        nombreCategoria: ko.observable()
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

  //MOSTRAR CATEGORIAS
  main.getAllCategorias = function () {
  	ajaxHelper(categoriaUri, 'GET').done(function(data){
  		limpiar();
  		main.categorias(data);
  	});
  }

  //AGREGAR CATEGORIAS
  main.agregar = function(){
  	var categoria = {
  		nombreCategoria : main.categoriaNueva.nombreCategoria()
  	}
  	ajaxHelper(categoriaUri, 'POST', categoria).done(function(data){
  		main.getAllCategorias();
  		$("#modalAgregarCategoria").modal('hide');
  	})
  }

  //ELIMINAR CATEGORIAS
  main.eliminar = function(item){
  	var CategoriaId = item.idCategoria;
  	console.log(JSON.stringify(item));
  	ajaxHelper(categoriaUri +"/"+ CategoriaId, 'DELETE').done(function(data){
  		main.getAllCategorias();
  	})
  }


  //LIMPIAR
  function limpiar(){
  	main.categoriaNueva.nombreCategoria(null);
  }
  

  //CARGAR
  main.cargar = function(item){
  	console.log(JSON.stringify(item));
  	main.categoriaCargada(item);
    $("#modalEditarCategoria").modal('show');
  }

  main.editar = function(){
   var data = {
     idCategoria: main.categoriaCargada().idCategoria,
     nombreCategoria: main.categoriaCargada().nombreCategoria
   }
   ajaxHelper(categoriaUri + "/" + data.idCategoria,'PUT',data).done(
     function(item){
       main.getAllCategorias();
       $("#modalEditarCategoria").modal('hide');
     }
    )
  }

  main.getAllCategorias();
}

$(document).ready(function() {
  var categoria = new CategoriaCliente();
  ko.applyBindings(categoria);
});
