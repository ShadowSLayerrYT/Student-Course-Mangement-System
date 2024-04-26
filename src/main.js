export function callApi(method, url, data, callbacksuccess, callbackerror)
{
    var xhttp = new XMLHttpRequest();
    xhttp.open(method, url, true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(data);

    xhttp.onreadystatechange = function(){
        if(this.readyState === 4)
        {
            if(this.status === 200)
                callbacksuccess(this.responseText);
            else
                callbackerror("Error: 404 - Service not available");
        }
    };
}

export function errorResponse(res)
{
    alert(res);
}

export function setSession(sname, svalue, exp)
{
    var d = new Date();
    d.setTime(d.getTime() + (exp * 60000));
    document.cookie = sname + "=" + svalue + ";expires=" + d.toUTCString() + ";path=/";
}

export function getSession(sname)
{
    sname += "=";
    var decoddedCookie = decodeURIComponent(document.cookie);
    var sn = decoddedCookie.split(";");
    for(var i=0; i< sn.length; i++)
    {
        var s = sn[i];
        while(s.charAt(0) === ' ')
            s = s.substring(1);
        if(s.indexOf(sname) === 0)
            return s.substring(sname.length, s.length);
    }
    return "";
}