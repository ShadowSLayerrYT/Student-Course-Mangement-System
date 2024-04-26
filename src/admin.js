import React from 'react';
import './home.css';
import logouticon from './logo3.jpg';
import { callApi, errorResponse, getSession, setSession } from './main';
import menuicon from './menu.png';

const HS1 = {"padding-left" : "5px", "font-weight" : "bold"};
const HS2 = {"float" : "right", "padding-right" : "5px", "cursor" : "pointer"};
const HS3 = {"float" : "right", "height" : "16px", "margin-top" : "6px", "cursor" : "pointer"};
const HS4 = {"float" : "right", "padding-right" : "10px"};

export function loadAMenu(res) {
    var data = JSON.parse(res);
    var amenuitems = "";
    for(var x in data) {
        amenuitems += `<li>
                        <label id='${data[x].mid}L' >${data[x].mtitle}</label>
                        <div id='${data[x].mid}' class='amenu'></div>
                      </li>`;
    }
    var mlist = document.getElementById('mlist');
    mlist.innerHTML = amenuitems;

    for(x in data) {
        document.getElementById(`${data[x].mid}L`).addEventListener("click", showAMenu.bind(null, data[x].mid));
    }
}

export function showAMenu(mid) {
    var surl = "http://localhost:5000/amenus"; 
    var ipdata = JSON.stringify({
        mid : mid
    });
    callApi("POST", surl, ipdata, loadAMenus, errorResponse);
        
    var amenu = document.getElementById(mid);
    if(amenu.style.display === "block")
        amenu.style.display = "none";
    else
        amenu.style.display = "block";
}

export function loadAMenus(res) {
    var data = JSON.parse(res);
    var amenuitems = "";
    var amenu = document.getElementById(`${data[0].mid}`); // Get the parent amenu element
    for(var x of data) {
        amenuitems += `<label id='${x.smid}'>${x.smtitle}</label>`;
    }
    amenu.innerHTML = amenuitems;
// eslint-disable-next-line
    for(var x of data) {
        document.getElementById(`${x.smid}`).addEventListener("click", loadAModule.bind(null, x.smid));
    }
}

export function loadAModule(smid) {
   var titlebar = document.getElementById('titlebar');
   var module = document.getElementById('module');
   switch(smid) {
    case "M00102":
            module.src = "/components/deletecourse";
            titlebar.innerText = "Delete Course";
            break;
    case "M00101":
            module.src = "/components/facultydata";
            titlebar.innerText = "List of faculty";
            break;
    case "M10101":
            module.src = "/myprofile";
            titlebar.innerText = "User Data";
            break;
     case "M10102":
            module.src = "/changepassword";
            titlebar.innerText = "Change Password";
            break;
     case "M10201":
            module.src = "/components/deletefaculty";
            titlebar.innerText = "Delete Faculty";
            break;
        default:
            module.src = "";
            titlebar.innerText = "";
   }
}

class Admin extends React.Component {
    constructor() {
        super();
        this.sid = getSession("sid");
        if(this.sid === "")
            window.location.replace("/");

        var url = "http://localhost:5000/uname";
        var data = JSON.stringify({
            emailid : this.sid
        });
        callApi("POST", url, data, this.loadUname, errorResponse);

        url = "http://localhost:5000/amenu";
        callApi("POST", url, "", loadAMenu, errorResponse);
    }

    loadUname(res) {
        var data = JSON.parse(res);
        var HL1 = document.getElementById("HL1");
        HL1.innerText = `${data[0].firstname} ${data[0].lastname}`;
    }

    logout() {
        setSession("sid", "", -1);
        window.location.replace("/");
    }

    render() {
        return(
            <div className='full-height'>
                <div className='header'>
                    <label style={HS1}>Student Course Management System</label>
                    <label style={HS2} onClick={this.logout}>Logout</label>
                    <img src={logouticon} alt='' style={HS3} onClick={this.logout} />
                    <label id='HL1' style={HS4}></label>
                </div>
                <div className='content'>
                    <div className='menubar'>
                        <div className='menuheader'>
                            <img src={menuicon} alt='' />
                            <label>MENU</label>
                        </div>
                        <div className='menu'>
                            <nav><ul id='mlist' className='mlist'></ul></nav>
                        </div>
                    </div>
                    <div className='outlet'>
                        <div id='titlebar'></div>
                        <iframe id='module' src="" title="Module"></iframe>
                    </div>
                </div>
                
            </div>
        );
    }
}

export default Admin;
