import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyExchangerInterface from './js/currencyExchangerInterface.js';

function populateMenus(response){
  if (response.conversion_rates) {
    Object.keys(response.conversion_rates).forEach(function(currency) {
      $('#currencyFrom').append(`<option value="${currency}"> ${currency} </option>`);
      $('#currencyTo').append(`<option value="${currency}"> ${currency} </option>`);
    });
  } else {
    $('.showError').text(`There was an error: ${response}`);
  }
}

async function makePopuplateCall(){
  const response = await CurrencyExchangerInterface.getCurrencies();
  populateMenus(response);

}

$(document).ready(()=>{
  makePopuplateCall();
  $("#form-converter").submit((event)=>{

  });
});