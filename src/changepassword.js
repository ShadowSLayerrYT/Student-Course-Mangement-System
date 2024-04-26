import React from 'react';
import './changepassword.css';
import { callApi, errorResponse, getSession } from './main';

const tableStyle = {"width" : "100%"};

export function updatePwd()
{
    var uname = getSession("sid");
    var T1 = document.getElementById("T1");
    var url = "http://localhost:5000/login/signin";
    var data = JSON.stringify({
        emailid: uname,
        pwd: T1.value
    });
    callApi("POST", url, data, validatePwd, errorResponse);
}

export function validatePwd(res)
{
    var data = JSON.parse(res);
    if(data === 0)
        alert("Invalid Credentials...");
    else
    {
        var T2 = document.getElementById('T2');
        var T3 = document.getElementById('T3');
        if(T2.value !== T3.value)
        {
            alert("New password and Re-Type password are not matched");
            return;
        }
        var url = "http://localhost:5000/cp/updatepwd";
        var input = JSON.stringify({
            emailid : getSession("sid"),
            pwd: T2.value
        });
        callApi("POST", url, input, updatePwdSuccess, errorResponse);
    }
}

export function updatePwdSuccess(res)
{
    var data = JSON.parse(res);
    alert(data);
}

class ChangePassword extends React.Component
{
    constructor()
    {
        super();
        this.sid = getSession("sid");
        if(this.sid === "")
            window.location.replace("/");
    }

    render()
    {
        return(
            <div className='full-height'>
                <div className='cpcontent'>
                    <h3>Change Your Password</h3>
                    <table style={tableStyle}>
                    <tr>
                        <td>Current Password* <input type='text' id='T1' className='txtbox' /></td>
                    </tr>
                    <tr>
                        <td>New Password* <input type='text' id='T2' className='txtbox'  /></td>
                    </tr>
                    <tr>
                        <td>Re-type New Password* <input type='text' id='T3' className='txtbox' /></td>
                    </tr>
                    <tr>
                        <td><button className='button' onClick={updatePwd}>Update</button></td>
                    </tr>
                    </table>
                </div>
            </div>
        );
    }
}

export default ChangePassword;
