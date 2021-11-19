import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyExchangerInterface from './js/currencyExchangerInterface.js';

function popylateMenus(currencies){
  
}

async function makePopuplateCall(){
  const currencies = await CurrencyExchangerInterface.getCurrencies();
  populateMenus(currencies);

}

$(document).ready(()=>{
  makePopuplateCall();
  $("#form-converter").submit((event)=>{

  });
});