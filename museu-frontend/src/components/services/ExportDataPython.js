'use strict';
import 'regenerator-runtime/runtime';

export const ExportDataPython = async function(endPoint,dadosEmJSON){

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
    headers.append('Content-Type','application/json');
    // By including the 'X-Requested-With' header set to 'XMLHttpRequest', the view will be able to check if the request is AJAX or not
    headers.append('X-Requested-With','XMLHttpRequest');


    const myInit = { method: 'POST',
        mode: 'cors',
        cache: 'default',
        credentials: 'same-origin',       
        headers: headers,
        body: dadosEmJSON,
    };    
    let response = await fetch(endPoint,myInit).then(function(response){
        return response.json();
        }
    )
    let importResult;
    importResult = Object.values(await response);      

    return importResult;
}