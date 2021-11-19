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
    $('.showError').text(`There was an error: ${response}`);
  }
}

function getResult(results){
  $("#results").text("");
  const currTo = $("#currencyTo").val();
  const amount = parseFloat($("#amount").val());
  const totalConverted;
  Object.keys(results.conversion_rates).forEach((key)=>{
    if(key===currTo){
     totalConverted=parseFloat(results.conversion_rates[key])*amount;
    }
  });
  $("#results").text(`${totalConverted} ${currTo}`);

}

async function makePopuplateCall(){
  //Make USD defualt request
  const response = await CurrencyExchangerInterface.getCurrencies("USD");
  populateMenus(response);

}

async function makeAPICall(currFrom){
  const results = await CurrencyExchangerInterface.getCurrencies(currFrom);
  getResult(results);
}

$(document).ready(()=>{
  makePopuplateCall();
  $("#form-converter").submit((event)=>{
    event.preventDefault();
  
    const currencyFrom =$("#currencyFrom").val()
   //
    //put this up top 
    makeAPICall(currencyFrom);
  });
});