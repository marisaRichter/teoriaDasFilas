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
