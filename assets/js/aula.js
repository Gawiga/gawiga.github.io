
function fncAjaxCep(cep){
	$.ajax({
		url:`http://cep.republicavirtual.com.br/web_cep.php?cep=${cep}&formato=json`,
		type:'get',
		dataType:'json',
		crossDomain: true,
		// data:{
		// 	cep: cep, //pega valor do campo
		// 	formato:'json'
		// },
		// success: retornaEndereco
		// sucess: retornaEnderecoJQUERY,
		// error: function(a,b,c){
		// 	var teste = "";
		// }
	}).done(function(data, textStatus, jqXHR) {
		retornaEnderecoJQUERY(data);
	}).fail(function(a, b, c) {
		// report error    
		var teste = "";
	});;	
}

//todo
function CPF(valor){
    valor = valor.replace(/{d}/);
    var pattern = new RegExp(/^\d(3)\.?\d(3)\.?\d(3)\-?\d(2)$/)
    pattern.focus();
}


function buscaCEP(valor) {
    fncAjaxCep(valor.value.replace("-", ""));
}

function buscaCEPJQUERY(){
	var cep = $("#cep").val().replace("-","");
	fncAjaxCep(cep);
}

function retornaEndereco(data){
    if (data.resultado != 0) {
        let uf = document.getElementById("uf");
        let bairro = document.getElementById("bairro");
        let cidade = document.getElementById("cidade");
        let endereco = document.getElementById("endereco");
        
        uf.value = data.uf;
        bairro.value = data.bairro;
        cidade.value = data.cidade;
        endereco.value = data.logradouro;
    }
    else {
        uf.disabled = false;
        bairro.disabled = false;
        cidade.disabled =  false;
        endereco.disabled = false;
    }
}
function retornaEnderecoJQUERY(data){
    if (data.resultado != 0) {
		$("#uf").val(data.uf);
		$("#bairro").val(data.bairro);
		$("#cidade").val(data.cidade);
		$("#endereco").val(data.logradouro);
    }
    else {
		$("#uf").prop("disabled", false);
		$("#bairro").prop("disabled", false);
		$("#cidade").prop("disabled", false);
        $("#endereco").prop("disabled", false);
	}
}

function validaCEP(valor){
    valor.value = valor.value.replace(/(\d{5})(\d{3})/, "$1-$2"); 
}
function validaCEPJQUERY(valor){
	$("#cep").val($("#cep").val().replace(/(\d{5})(\d{3})/, "$1-$2"));
}

function validaPlaca(valor){
	var enviar = document.getElementById("enviar");
	valor.value = valor.value.replace(/([A-Z]{3})(\d{4})/, "$1-$2");
	valor.value = valor.value.toUpperCase();

	let v2 = new RegExp(/([A-Z]{3})\-(\d{4})/);
	if (v2.test(valor.value)){
		valor.style.border = "#00FF00 solid 4px";
		//habilita o botão enviar
		enviar.disabled = false;
	}
	else {
		valor.style.border = "#FF0000 solid 4px";
		enviar.disabled = true;
	}
}

function validaPlacaJQUERY(){
	var placa = $("#placa").val().replace(/([A-Z]{3})(\d{4})/, "$1-$2").toUpperCase()
	$("#placa").val(placa);
}

function OlaMundo(objeto){
	alert($("#helloWorld").val());
}

function enviarPlaca() {

	var placa = document.getElementById("placa");
	var lista = document.getElementById("listaplacas");

	lista.innerHTML += `<option value="${placa.value}">${placa.value}</option>`;	
}

function meuAlert(){
	alert('Hello World!');
	console.log("Hello World!");
}

function calcIdade(objeto){
	if (objeto.value != ""){
		var horario = "00:00:00";
		var hoje = new Date();
		var dtNasc = new Date(`${objeto.value}`);
		var idade = hoje.getFullYear() - dtNasc.getFullYear();
		var m = hoje.getMonth() - dtNasc.getMonth();
		if (m < 0 || (m === 0 && hoje.getDate() < dtNasc.getDate())) {
			idade--;
		}
		alert(`Você tem ${idade} anos`);
		
	}
	else{
		alert("Se não tiver data não da pra calcular!");
	}
}

