'use strict';
import 'regenerator-runtime/runtime';

export const ImportDataPython = async function(endPoint,content){

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    const csrftoken = getCookie('csrftoken');
    
    let headers = new Headers();
    headers.append('X-CSRFToken', csrftoken);
    // We expect the data returned from the view in JSON form, so we set the 'Accept' header to 'application/json'
    headers.append('Accept','application/json');
    // By including the 'X-Requested-With' header set to 'XMLHttpRequest', the view will be able to check if the request is AJAX or not
    headers.append('X-Requested-With','XMLHttpRequest');
    // headers.append('Access-Control-Allow-Origin','*');
    // headers.append('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept');
    // headers.append('Access-Control-Allow-Methods','GET, POST, PUT, DELETE');
    // headers.append('content-type','application/json; charset=utf-8');

    const myInit = { method: 'GET',
        mode: 'no-cors',
        cache: 'default',
        credentials: 'same-origin',
        headers: headers,
    };    
    let response = await fetch(endPoint,myInit).then(function(response){
        // return response.json();
        console.log(response);
        return response;
        }
    )
    let importResult;
    importResult = Object.values(await response);      

    return importResult;
}