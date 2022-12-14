import configData from "../resources/config.json";


export async function getData(url) {
    // Funkciji pošaljete url. Funkcija potom dohvaća podatke sa servera
    // te vam vraća Promise objekt. Primjer korištenja ove metode:
    // 
    // handleRankList = () => {
    //     getData("korisnik/rang").then(data => this.setState({ rankList: data }));
    // }

    return await getDataHelper(url, false);
}


export async function getDataAuth(url) {
    return await getDataHelper(url, true);
}


export async function postData(url, data) {
    return await postDataHelper(url, data, false);
}


export async function postDataAuth(url, data) {
    return await postDataHelper(url, data, true);
}


async function getDataHelper(url, auth) {
    return await fetchData(url, initOptions("GET", auth, undefined));
}


async function postDataHelper(url, data, auth) {
    return await fetchData(url, initOptions("POST", auth, data));
}


function initOptions(method, auth, data) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    if (auth === true) {
        const personInfo = getPersonInfo();

        headers.append('Authorization', 'Basic ' + window.btoa(personInfo.userName + ":" + personInfo.password));
    }

    const options = {
        method: method, 
        headers: headers
    };

    if (data !== undefined) {
        options.body = JSON.stringify(data);
    }
    
    return options;
}


function getPersonInfo() {
    const personInfo = localStorage.getItem("personInfo");
    console.log("Person info: " + personInfo);

    return personInfo ? personInfo : { userName: "", password: ""};
}


async function fetchData(url, options) {
    const response = await fetch(`${configData.hostname}/${url}`, options);

    return response.json();
}
