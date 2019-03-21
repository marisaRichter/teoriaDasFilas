function submitForm() { // inside script tags
  var time = $("#time").val();

  var chegadaA = $(".chegada-A").val();
  var chegadaB = $(".chegada-B").val();
  var chegadaC = $(".chegada-C").val();

  var servicoA = $(".servico-A").val();
  var servicoB = $(".servico-B").val();
  var servicoC = $(".servico-C").val();

  var prob = $("#prob").val();

  var resultChegadaA = parseFloat((time/chegadaA).toFixed(2));
  var resultChegadaB = parseFloat((time/chegadaB).toFixed(2));
  var resultChegadaC = parseFloat((time/chegadaC).toFixed(2));

  var resultServicoA = parseFloat((time/servicoA).toFixed(2));
  var resultServicoB = parseFloat((time/servicoB).toFixed(2));
  var resultServicoC = parseFloat((time/servicoC).toFixed(2));

  $(".result-chegada-A").text(resultChegadaA);
  $(".result-chegada-B").text(resultChegadaB);
  $(".result-chegada-C").text(resultChegadaC);

  $(".result-servico-A").text(resultServicoA);
  $(".result-servico-B").text(resultServicoB);
  $(".result-servico-C").text(resultServicoC);

  $(".result-num-med-A").text(parseFloat(resultChegadaA/(resultServicoA-resultChegadaA)).toFixed(2));
  $(".result-num-med-B").text(parseFloat(resultChegadaB/(resultServicoB-resultChegadaB)).toFixed(2));
  $(".result-num-med-C").text(parseFloat(resultChegadaC/(resultServicoC-resultChegadaC)).toFixed(2));

  $(".result-time-med-A").text(parseFloat(1/(resultServicoA-resultChegadaA)).toFixed(2));
  $(".result-time-med-B").text(parseFloat(1/(resultServicoB-resultChegadaB)).toFixed(2));
  $(".result-time-med-C").text(parseFloat(1/(resultServicoC-resultChegadaC)).toFixed(2));

  $(".result-tax-med-A").text(parseFloat(resultChegadaA/resultServicoA).toFixed(2));
  $(".result-tax-med-B").text(parseFloat(resultChegadaB/resultServicoB).toFixed(2));
  $(".result-tax-med-C").text(parseFloat(resultChegadaC/resultServicoC).toFixed(2));

  var htmlTable = "<tr>";

  for( var i = 0; i <= prob; i++){
    htmlTable += "<th scope='row'>"+ i + "</th><td>P("+ i + ")</td><td>" + parseFloat((1-(resultChegadaA/resultServicoA))*Math.pow((resultChegadaA/resultServicoA), i)).toFixed(2) + "</td><td>" + parseFloat((1-(resultChegadaB/resultServicoB))*Math.pow((resultChegadaB/resultServicoB), i)).toFixed(2) + "</td><td>" + parseFloat((1-(resultChegadaC/resultServicoC))*Math.pow((resultChegadaC/resultServicoC), i)).toFixed(2) + "</td></tr>";
  }

  $("tbody").html(htmlTable);

}

var tecs = [10,12,15];
var tss = [9,10,11];

function getTecs(){
  var htmlTecs = "<select multiple class='form-control' id='select-tec'>";

  tecs.forEach(function (item, indice, array) {
    htmlTecs += "<option value='" + indice + "'>" + item + "</option>";
  });
  htmlTecs += "</select>";
  $(".select-tecs").html(htmlTecs);
}

function addTEC(){
  tecs.push($(".tec-input").val());
  getTecs();
}

function getTss(){
  var htmlTss = "<select multiple class='form-control' id='select-ts'>";

  tss.forEach(function (item, indice, array) {
    htmlTss += "<option value='" + indice + "'>" + item + "</option>";
  });
  htmlTss += "</select>";
  $(".select-tss").html(htmlTss);
}

function addTS(){
  tss.push($(".ts-input").val());
  getTss();
}

function excluirTEC(){
  var value = $("#select-tec  option:selected");
  tecs.splice(value, 1);
  getTecs();

}

function excluirTS(){
  var value = $("#select-ts  option:selected");
  tss.splice(value, 1);
  getTss();

}

function tabelaDeSimulacao(){

  var time = $("#time").val();

  var randomTec = 0;
  var randomTs = 0;

  var tempoFinalServicoRelogio = 0;
  var count = 1;

  var anteriorTempoChegadaRelogio = 0;


  var resultA = 0;
  var somaTS = 0;
  var somaSistema = 0;
  var htmlTable = "<tr>";

  while(tempoFinalServicoRelogio <= time){
    if(count != 1){
      randomTec = tecs[Math.floor(Math.random()*tecs.length)];
      randomTs = tss[Math.floor(Math.random()*tss.length)];

      var tempoChegadaRelogio = parseInt(randomTec) + parseInt(anteriorTempoChegadaRelogio);
      anteriorTempoChegadaRelogio = tempoChegadaRelogio;

      var fila = 0;
      if(tempoFinalServicoRelogio>=tempoChegadaRelogio){
        fila = tempoFinalServicoRelogio - tempoChegadaRelogio;
      }

      var tempoInicio = parseInt(tempoChegadaRelogio) + parseInt(fila);
      var tempoSistema = parseInt(randomTs) + parseInt(fila);

      var soma =  parseInt(randomTs) + parseInt(tempoInicio);
      var tempoLivre = 0;
      if(tempoFinalServicoRelogio < tempoChegadaRelogio){
        tempoLivre = tempoChegadaRelogio - tempoFinalServicoRelogio;
      }
      htmlTable += "<th class='client-" + count + "' scope='row'>"+ count + "</th>";
      htmlTable += "<td>"+ randomTec + "</td>";
      htmlTable += "<td>" + tempoChegadaRelogio + "</td>";
      htmlTable += "<td>" + randomTs + "</td>";
      htmlTable += "<td>" + tempoInicio + "</td>";
      htmlTable += "<td>" + fila + "</td>";
      htmlTable += "<td>" + soma + "</td>";
      htmlTable += "<td>" + tempoSistema + "</td>";
      htmlTable += "<td>" + tempoLivre + "</td></tr>";
      tempoFinalServicoRelogio = soma;
      resultA += fila;
      somaTS += randomTs;
      somaSistema += tempoSistema;

    }else{
      randomTec = tecs[Math.floor(Math.random()*tecs.length)];
      randomTs = tss[Math.floor(Math.random()*tss.length)];
      var soma = parseInt(randomTec) + parseInt(randomTs);
      htmlTable += "<th class='client-" + count + "' scope='row'>"+ count + "</th><td>"+ randomTec + "</td><td>" + randomTec + "</td><td>" + randomTs + "</td><td>" + randomTec + "</td><td>0</td><td>" + soma + "</td><td>" + randomTs + "</td><td>" + randomTec + "</td></tr>";
      tempoFinalServicoRelogio = soma;
      anteriorTempoChegadaRelogio = randomTec;
      somaTS += randomTs;
      somaSistema += randomTs;
    }
    count++;
  }

  $(".tempos").html(htmlTable);
  $(".resultA").text(resultA/(count-1));
  if(resultA > 0){
    $(".resultB").text(resultA/(count-1));
  }
  $(".resultC").text(tempoLivre/soma);
  $(".resultD").text(somaTS/(count-1));
  $(".resultE").text(somaSistema/(count-1));
}
