import configData from "../resources/config.json";
import { CATEGORIES } from "./constants";

export const PERSON_INFO_TEMPLATE = {
	id: "",
	userName: "",
	password: "",
	isModerator: "",
};
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

		headers.append(
			"Authorization",
			"Basic " +
				window.btoa(personInfo.userName + ":" + personInfo.password)
		);
	}

	const options = {
		method: method,
		headers: headers,
	};

	if (data !== undefined) {
		options.body = JSON.stringify(data);
	}

	return options;
}

export function getPersonInfo() {
	const personInfo = localStorage.getItem(PERSON_INFO_KEY);

	return personInfo ? JSON.parse(personInfo) : null;
}

export function login(id, userName, password, moderator) {
	const personInfo = { ...PERSON_INFO_TEMPLATE };

	personInfo.id = id;
	personInfo.userName = userName;
	personInfo.password = password;
	personInfo.isModerator = moderator;

	localStorage.setItem(PERSON_INFO_KEY, JSON.stringify(personInfo));
}

export function logout() {
	console.log(PERSON_INFO_TEMPLATE);
	localStorage.setItem(PERSON_INFO_KEY, null);
}

export function updatePersonInfo(id, userName, password) {
	const personInfo = { ...PERSON_INFO_TEMPLATE };

	personInfo.id = id;
	personInfo.userName = userName;
	personInfo.password = password;
	personInfo.isModerator = false;

	localStorage.setItem(PERSON_INFO_KEY, JSON.stringify(personInfo));
}

async function fetchData(url, options) {
	const response = await fetch(`${configData.hostname}/${url}`, options);

	const string = await response.text();
	const json = string === "" ? { error: !response.ok } : JSON.parse(string);

	return json;
}

export function getCategoriesPretty() {
	return [...CATEGORIES];
}

export function getCategoryToEnumValue(category) {
	return category.toUpperCase().replace(" ", "_");
}

export function getCategoryFromEnumValue(category) {
	return getValueFromEnum(category);
}

export function getValueFromEnum(enumValue) {
	let lower = enumValue.toLowerCase().replace("_", " ");
	let firstLetter = lower.at(0).toUpperCase();

	return `${firstLetter}${lower.slice(1)}`;
}
