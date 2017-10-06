$(document).ready(function(){
    consomeAPI();
    $("#tabela").DataTable();
});

$("#botao").click(function () {
    alert("teste");
});


// document.getElementById("botao").addEventListener("click", function () {
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
        async: false,
        success: retSucesso,
        error: retErro
    })
}

function limpaTabela(){
    $("#tabela tbody").empty();

    $("#id").val('');
    $("#dataLancamento").val('');
    $("#descricao").val('');
    $("#nomeEpisodio").val('');
    $("#numeroDoEp").val('');
    $("#temporada").val('');  
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
        success: alert('registro inserido com sucesso!'),
        error: retErro
    }).done(function(){
        consomeAPI();
    });

}

function deletaAPI(id){
    if (confirm('você tem certeza que deseja deletar?')){
        $.ajax({
            url:'http://formtalentosapi.azurewebsites.net/api/Episodio/' + id,
            type:'DELETE',
            dataType:'json',
            crossDomain: true,
            success: alert('registro deletado com sucesso!'),
            error: retErro
        }).done(function(data){
            consomeAPI();
        });
    }
}

function atualizaAPI(){
    var ret = pegaDados();

    $.ajax({
		url:'http://formtalentosapi.azurewebsites.net/api/Episodio',
		type:'PUT',
		dataType:'json',
        crossDomain: true,
        data: ret,
        success: alert('registro atualizado com sucesso!'),
        error: retErro
    }).done(function(){
        consomeAPI();
    });

}

function retSucesso(data){
    data.forEach(function(element) {
        $("#tabela tbody").append(`<tr><td>${element.id}</td><td>${element.dataLancamento}</td><td>${element.descricao}</td>
        <td>${element.nomeEpisodio}</td><td>${element.numeroDoEp}</td><td>${element.temporada}</td><td>
        <img src="../assets/img/delete.png" onclick="deletaAPI(${element.id})" style="cursor: pointer; margin: none !important" /></td></tr>`);
    });
}

function retErro(){
    alert('alguma coisa deu errado');
}