import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyExchangerInterface from './js/currencyExchangerInterface.js';


function populateMenus(response){
  if (response.conversion_rates) {
    Object.keys(response.conversion_rates).forEach(function(currency) {
      $('#currencyFrom').append(`<option value="${currency}"> ${currency} </option>`);
      if(currency==="CAD"){
        $('#currencyTo').append(`<option value="${currency}" selected> ${currency} </option>`);
      }
      else{
        $('#currencyTo').append(`<option value="${currency}"> ${currency} </option>`);
      }
    });
  } 
  else {
    $('.showErrors').text(`There was an error: ${response.error}`);
  }
}

function getResult(results, currTo, originalAmount){
  let amount = parseFloat(originalAmount);
  console.log(originalAmount);
  console.log(amount);
  if (results.conversion_rates) {
    $("#results").text("");
    let totalConverted=0;
    let currFound=false;
    Object.keys(results.conversion_rates).forEach((key)=>{
      if(key===currTo){
        currFound=true;
      totalConverted=(parseFloat(results.conversion_rates[key])*amount).toFixed(2);
      }
    });
    if(!currFound){
      $('.showErrors').text(`There was an error: ${currTo} not found.`);
    }
    else if(isNaN(totalConverted) || totalConverted<0 || parseFloat(originalAmount)!=originalAmount){
      $('.showErrors').text("Please enter a valid number.");
    }
    else{ $(".results").text(`Total: ${totalConverted} ${currTo}`);}
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

function clearVals(){
  $(".results").empty();
  $(".showErrors").empty();
}

$(document).ready(()=>{
  makePopuplateCall();
  $("#form-converter").submit((event)=>{
    event.preventDefault();
    const currencyFrom =$("#currencyFrom").val()
    const currencyTo = $("#currencyTo").val();
    const amount = $("#amount").val();
    clearVals();
    //put this up top 
    makeAPICall(currencyFrom, currencyTo, amount);
  });
});