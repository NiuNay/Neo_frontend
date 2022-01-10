/* Reference - this service was referenced from: https://github.com/pardeep16/Spring-Security-Auth-Demo/blob/main/UI/src/api/authenticationService.js */
import React from 'react';
import axios from 'axios';

const getToken=()=>{
    console.log("getting key from storage");

    return localStorage.getItem('USER_KEY'); // prev USER_KEY
}

export const userLogin=(authRequest)=>{
    console.log("posting in process")

    return axios({
        method:'POST',
        url: `http://localhost:8080/api/login`,
        // 'url':`${process.env.hostUrl||'http://localhost:8080'}/api/login`, // (original url code copied over)
        data: authRequest,
    })
}

export const fetchUserData=(authRequest)=>{
    console.log("getting in process")

    return axios({
        "method":'GET',
        "url":`${process.env.hostUrl||'http://localhost:8080'}/api/user`,
        "headers":{
            'Authorization':'Bearer '+getToken()
        }
    })
}