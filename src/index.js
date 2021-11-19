import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyExchangerInterface from './js/currencyExchangerInterface.js';

function populateMenus(response){
  if (response.conversion_rates) {
    
    Object.keys(response.conversion_rates).forEach(function(currency) {
      $('#currencyFrom').append(`<option value="${currency}"> ${currency} </option>`);
      if(currency==="CAD"){$('#currencyTo').append(`<option value="${currency}" selected> ${currency} </option>`);}
      else{$('#currencyTo').append(`<option value="${currency}"> ${currency} </option>`);}
    
      
    });
  } else {
    $('.showErrors').text(`There was an error: ${response.error}`);
  }
}

function getResult(results, currTo, amount){
  console.log(results.conversion_rates);
  if (results.conversion_rates) {
    $("#results").text("");
    let totalConverted=0;
    Object.keys(results.conversion_rates).forEach((key)=>{
      if(key===currTo){
        console.log(currTo);
      totalConverted=parseFloat(results.conversion_rates[key])*amount;
      console.log(totalConverted);
      }
    });
    $(".results").text(`Total: ${totalConverted} ${currTo}`);
  } else {
    $('.showErrors').text(`There was an error: ${results.error}`);
  }
}

async function makePopuplateCall(){
  //Make USD defualt request
  const response = await CurrencyExchangerInterface.getCurrencies("USD");
  populateMenus(response);

}

async function makeAPICall(currFrom, currTo, amount){
  const results = await CurrencyExchangerInterface.getCurrencies(currFrom);
  getResult(results, currTo, amount);
}
makePopuplateCall();
$(document).ready(()=>{

  $("#form-converter").submit((event)=>{
    event.preventDefault();
    const currencyFrom =$("#currencyFrom").val()
    const currencyTo = $("#currencyTo").val();
    const amount = parseFloat($("#amount").val());
    //put this up top 
    makeAPICall(currencyFrom, currencyTo, amount);
  });
});