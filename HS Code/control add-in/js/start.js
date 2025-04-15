var controlAddIn = document.getElementById('controlAddIn');
controlAddIn.style.fontFamily = 'Calibri';
controlAddIn.style.paddingTop = '2px';
controlAddIn.style.position = 'relative';
var inputElement;
var validInput;
var error;
var codeDetailsContainer;
var codeDetailsDescription;

window.RaiseAddInReady = function() {
  Microsoft.Dynamics.NAV.InvokeExtensibilityMethod('ControlAddInReady');
}

window.CreateInputElement = function(hscode){
  inputElement = document.createElement('input');

  inputElement.setAttribute('name', 'hscode');
  inputElement.setAttribute('id', 'hscode');
  inputElement.setAttribute('type', 'text');
  inputElement.setAttribute('maxlength', '10');
  inputElement.setAttribute('placeholder','####.##.##');
  inputElement.setAttribute('value', `${hscode}`);

  inputElement.style.width = '10ch';
  inputElement.style.borderRadius = '0';
  inputElement.style.border = '1px solid rgb(141,149,160)';
  inputElement.style.marginRight = '2px';
  inputElement.style.float = 'right';
  inputElement.style.padding = '0.8ch';

  if(inputElement.getAttribute('value') == ''){
    validInput = true;
  }

  inputElement.addEventListener('input', async function(event){
    let enteredText = event.target.value;
    ValidInput(enteredText);
    if(validInput){
      error.style.display = 'none';
      if(!enteredText){
        codeDetailsDescription.innerText = '';
        codeDetailsContainer.style.display = 'block';
      }
      if(enteredText){
        codeDetailsDescription.innerText = await GetHsCodeDetails(enteredText);
        codeDetailsContainer.style.display = 'block';
      }
    } else {
      error.style.display = 'block';
      codeDetailsContainer.style.display = 'none';
    }
  });

  inputElement.addEventListener('focusout', function(event){
    if(validInput){
      let currentText = event.target.value;
      const textLen = currentText.length;
      switch(textLen){
        case 10:
          SendToAl(currentText, false);
          break;
        case 8:
          currentText = `${currentText}00`;
          SendToAl(currentText, true);
          break;
        case 7:
          currentText = `${currentText}.00`;
          SendToAl(currentText, true);
          break;
        case 0:
          currentText = '';
          SendToAl(currentText, false);
          break;
      }
    }
  });

  return inputElement;
}

window.AppendHTML = async function(hscode) {

  // Creating container for the label, leader and input box

  let flexContainer = document.createElement('section');
  flexContainer.style.display = 'flex';
  flexContainer.style.alignItems = 'center';
  flexContainer.style.width = 'inherit';

  // Creating the input label

  let label = document.createElement('label');
  label.setAttribute('for', 'hscode');
  label.setAttribute('id', 'hscodelabel');
  label.innerHTML = 'HS Code';
  label.style.color = 'rgb(75,90,100)';
  label.style.whiteSpace = 'nowrap';

  // Creating HS Code tooltip

  let tooltip = document.createElement('section');
  tooltip.style.position = 'absolute';
  tooltip.style.top = '2em';
  tooltip.style.boxShadow = '0px 0px 2px gray inset';
  tooltip.style.padding = '1ch';
  tooltip.style.margin = '0';
  tooltip.innerHTML = '<strong>Harmonized System Code</strong><br/><p style="color:rgb(75,90,100);">A Harmonized System Code is a standardized numerical method used internationally to classify traded products for customs purposes, facilitating trade and ensuring uniformity in product identification.</p>';
  tooltip.style.display = 'none';
  tooltip.style.backgroundColor = 'white';
  tooltip.style.zIndex = '1';
  var showTooltip = false;

  label.addEventListener('pointerenter', function(){
    showTooltip = true;
    setTimeout(function(){
      if(showTooltip){
        tooltip.style.display = 'block';
      } 
    }, 1000);
  });

  label.addEventListener('pointerleave', function(){
    showTooltip = false;
    tooltip.style.display = 'none';
  });

  // Creating the leader

  let leader = document.createElement('span');
  leader.style.color = 'rgb(218,220,223)';
  leader.style.maxWidth = '1000px';
  leader.style.overflow = 'hidden';
  leader.style.whiteSpace = 'nowrap';
  leader.style.position = 'relative';
  leader.style.zIndex = '-1';
  leader.innerHTML = Leader();

  // Creating the input box

  let input = CreateInputElement(hscode);

  // Creating the conditional error messege

  error = document.createElement('span');
  error.style.display = 'none';
  error.style.color = 'rgb(227,45,35)';
  error.innerText = '* Not a valid HS Code';

  codeDetailsContainer = document.createElement('div');
  codeDetailsContainer.style.color = 'rgb(75,90,100)';

  codeDetailsText = document.createElement('p');
  codeDetailsText.innerHTML = 'Description:&ensp;';

  codeDetailsDescription = document.createElement('span');
  codeDetailsDescription.style.color = 'black';
  codeDetailsDescription.innerText = hscode ? await GetHsCodeDetails(hscode) : '';

  codeDetailsText.appendChild(codeDetailsDescription);

  flexContainer.append(label, leader, input);
  codeDetailsContainer.append(document.createElement('br'), codeDetailsText);

  controlAddIn.append(flexContainer, error, tooltip, codeDetailsContainer);
}

window.Leader = function(){
  let str = '&ensp;·';
  for(i=0; i<100; i++){
    str += '&nbsp;·';
  }
  return str;
}

window.SendToAl = function(text, update){
  Microsoft.Dynamics.NAV.InvokeExtensibilityMethod('HSCodeFieldFilled', [text, update]);
}

window.UpdateHSCodeUI = function(hscode){
  inputElement.value = hscode;
}

window.ValidInput = function(enteredText){
  const hscodeRegex = /^((?!00)\d{4}(?<!00)\.(?!00)\d{2}(\.\d{2}|\.)?|)$/;
  if(hscodeRegex.test(enteredText)){
    validInput = true;
  } else {
    validInput = false;
  }
}

window.GetHsCodeDetails = async function(hscode){
  const segments = hscode.split('.');
  const value = segments[0] + segments[1];
  try {
    const response = await fetch(`https://hs-code-harmonized-system.p.rapidapi.com/code?term=${value}`, {
      headers: {
        "x-rapidapi-key": "f66335fbffmsh58da4fe5aa513afp162f45jsn10b53b7a26f2",
        "x-rapidapi-host": "hs-code-harmonized-system.p.rapidapi.com"
      }
    });
    const dataObject = await response.json();
    return `${dataObject.result.description}.`;
  } catch(error){ 
    console.log(error.message);
    return 'N/A';
  }
}

window.RaiseAddInReady(); 