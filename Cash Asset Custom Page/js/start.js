var controlAddIn = document.getElementById('controlAddIn');

window.RaiseAddInReady = function() {
  Microsoft.Dynamics.NAV.InvokeExtensibilityMethod('AddInReady');
}

window.ImageLoad = function(){
  let imageContainer = document.createElement('div');
  imageContainer.style.padding = '0px 48px 48px 48px';
  imageContainer.style.position = 'absolute';
  imageContainer.style.top = '168px';
  let image = document.createElement('img');
  image.src = Microsoft.Dynamics.NAV.GetImageResource('./images/cash.png');
  image.style.width = '100%';
  image.style.height = 'auto';
  imageContainer.appendChild(image)
  return imageContainer;
}

window.PassCashText = function(cash){
  let header = document.createElement('h1');
  header.innerText = `$${cash}`;
  controlAddIn.append(header, window.ImageLoad());
}

window.RaiseAddInReady();