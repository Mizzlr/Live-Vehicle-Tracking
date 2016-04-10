var getJSON = function(url, successHandler, errorHandler) {
  var xhr = new XMLHttpRequest();

  xhr.open('GET', url, true);
  xhr.onreadystatechange = function() {
    var status;
    var data;

    if (xhr.readyState == 4) { 
      status = xhr.status;
      alert("xhr: " + JSON.stringify(xhr));
      if (status == 200) {
        data = JSON.parse(xhr.responseText);
        successHandler && successHandler(data);
      } else {
        alert('data is:' + xhr.responseText);
        errorHandler && errorHandler(status);
      }
    }
  };
  //xhr.setRequestHeader('Access-Control-Allow-Origin','XYZ')
  xhr.send();
};


var postJSON = function(url, requestData, successHandler, errorHandler) {
  var xhr = new XMLHttpRequest();

  xhr.open('POST', url, true);
  xhr.onreadystatechange = function() {
    var status;
    var data;

    if (xhr.readyState == 4) { 
      status = xhr.status;
      if (status == 200) {
        data = JSON.parse(xhr.responseText);
        successHandler && successHandler(data);
      } else {
        errorHandler && errorHandler(status);
      }
    }
  };
  //alert('requestData: ' + JSON.stringify(requestData));
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.send(JSON.stringify(requestData));
};

function getMethodSuccessHandler(data) {
  alert('GET data: ' + JSON.stringify(data));
};

function postMethodSuccessHandler(data) {
  alert('POST data: ' + JSON.stringify(data));
};

function errorHandler(status){
  alert('ERROR status: ' + status);
};

