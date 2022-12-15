import configData from "../resources/config.json";


/* 
================================================KAKO KORISTITI OVE UTILITY FUNKCIJE================================================

Funkcije koje su namijenjene vanjskoj uporabi (dakle, one koje se mogu importati u drugi .js file) su:

    getData(url) -> dohvaća data sa servera za predani 'url'
    *getDataAuth(url) -> dohvaća data sa servera za predani 'url' uz uvijet da je korisnik prijavljen u sustav
    postData(url, data) -> šalje predani 'data' na server na lokaciju 'url'
    *postDataAuth(url, data) -> šalje predani 'data' na server na lokaciju 'url' uz uvijet da je korisnik prijavljen u sustav
    *putData(url, data) -> šalje predani 'data' na server na lokaciju 'url'
    putDataAuth(url, data) -> šalje predani 'data' na server na lokaciju 'url' uz uvijet da je korisnik prijavljen u sustav
    *deleteData(url, data) -> briše predani 'data' na server na lokaciju 'url'
    *deleteDataAuth(url, data) -> briše predani 'data' na server na lokaciju 'url' uz uvijet da je korisnik prijavljen u sustav
    getPersonInfo() -> dohvaća podatke iz localstoragea za trenutno prijavljenog korisnika

Napomena:   funkcije prefiksirane s '*' nisu još testirane; 
            sve ostale bi trebale raditi, ali bugovi su uvijek mogući, pa prijavljujte čudna ponašanja :)

Što slati kao parametar 'url'?

    Šaljete relativnu lokaciju, dakle na primjeru logina, to bi bilo ovako:

        postData("login");

    Može i ovako, mislim da će raditi:

        postData("/login");

Što je parametar 'data'?

    Predstavlja Javascript objekt, kao na primjer:

        personInfo = {
            userName: "Marko",
            password: "Prosenjak",
            id: 12
        }

Koja je razlika između <imeMetode> i <imeMetode>Auth?

        Metoda koja je sufiksirana s 'Auth' zahtijeva da je korisnik prijavljen u sustav.
        Time ste osigurali da korisnik mora biti prijavljen kako bi uspješno "izvršio" 
        bilo koji HTTP zahtjev (GET, PUT, POST, DELETE) nad određenim 'url-om'.

U slučaju nedozvoljenog pristupa...

        Ako korisnik nije prijavljen u sustav, a pozvana je neka metoda koja završava s
        s 'Auth', server će vratiti 'json endpoint' (json objekt) i u njemu ćete imati referencu 'error'
        postavljenu u 'true'.

        Primjer koda iz 'Login.js' (thanks to Neymarko):

            const data = { 
                korisnickoIme: info.userName, 
                lozinka: info.password 
            }

            postData("korisnik/prijava", data)
            .then(data => {
                if (data.error) {
                    setError(data.message)          // blok koda u kojem je došlo do pogreške te zahtjev nije izvršen
                }
                else {
                    ...                             // blok koda u kojem je uspješno izvršen HTTP zahtjev
                }

Za sva ostala pitanja -> WhatsApp ;)
            
 */


export const PERSON_INFO_TEMPLATE = {
    id: undefined,
    userName: "",
    password: ""
}
export const PERSON_INFO_KEY = "personInfo";


export async function getData(url) {
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


export async function putData(url, data) {
    return await putDataHelper(url, data, false);
}


export async function putDataAuth(url, data) {
    return await putDataHelper(url, data, true);
}


export async function deleteData(url, data) {
    return await deleteDataHelper(url, data, false);
}


export async function deleteDataAuth(url, data) {
    return await deleteDataHelper(url, data, true);
}


async function getDataHelper(url, auth) {
    return await fetchData(url, initOptions("GET", auth, undefined));
}


async function postDataHelper(url, data, auth) {
    return await fetchData(url, initOptions("POST", auth, data));
}


async function putDataHelper(url, data, auth) {
    return await fetchData(url, initOptions("PUT", auth, data));
}


async function deleteDataHelper(url, data, auth) {
    return await fetchData(url, initOptions("DELETE", auth, data));
}


function initOptions(method, auth, data) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    if (auth === true) {
        const personInfo = getPersonInfo();

        // console.log(`Basic ${personInfo.userName}:${personInfo.password}`);
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


export function getPersonInfo() {
    const personInfo = localStorage.getItem(PERSON_INFO_KEY);
    // console.log("Person info: " + personInfo);

    return personInfo ? JSON.parse(personInfo) : PERSON_INFO_TEMPLATE;
}


async function fetchData(url, options) {
    const response = await fetch(`${configData.hostname}/${url}`, options);

    return response.json();
}
