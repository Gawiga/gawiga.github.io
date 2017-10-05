// $("#botao").addEventListener("click", function () {
//     alert("teste");
// });

function colocaLinhaNaTabela(){
    $("#tabela tbody").append("<tr><td></td><td></td></tr>");
}

function consomeAPI(){
    limpaTabela();
    
	$.ajax({
		url:'http://formtalentosapi.azurewebsites.net/api/Episodio',
		type:'GET',
		dataType:'json',
		crossDomain: true,
        success: retSucesso,
        error: retErro
    });
}

function limpaTabela(){
    $("#tabela tbody").empty();
}

function pegaDados(){
    var ep = {
        id: $("#id").val(),
        dataLancamento: $("#dataLancamento").val(),
        descricao: $("#descricao").val(),
        nomeEpisodio: $("#nomeEpisodio").val(),
        numeroDoEp: $("#numeroDoEp").val(),
        temporada: $("#temporada").val(),
    };
    return ep;
}

function inserirAPI(){
    var ret = pegaDados();

    $.ajax({
		url:'http://formtalentosapi.azurewebsites.net/api/Episodio',
		type:'POST',
		dataType:'json',
        crossDomain: true,
        data: ret,
        success: alert('sucesso'),
        error: retErro
    });
}

function deletaAPI(){
    var id = $("#id").val()

    $.ajax({
		url:'http://formtalentosapi.azurewebsites.net/api/Episodio/' + id,
		type:'DELETE',
		dataType:'json',
        crossDomain: true,
        success: alert('sucesso'),
        error: retErro
    });
}

function atualizaAPI(){
    var ret = pegaDados();

    $.ajax({
		url:'http://formtalentosapi.azurewebsites.net/api/Episodio',
		type:'PUT',
		dataType:'json',
        crossDomain: true,
        data: ret,
        success: alert('sucesso'),
        error: retErro
    });
}

function retSucesso(data){
    data.forEach(function(element) {
        $("#tabela tbody").append(`<tr><td>${element.id}</td><td>${element.dataLancamento}</td><td>${element.descricao}</td>
        <td>${element.nomeEpisodio}</td><td>${element.numeroDoEp}</td><td>${element.temporada}</td><tr>`);
    });
}

function retErro(){
    alert('DEU ERRO CARALHO');
}