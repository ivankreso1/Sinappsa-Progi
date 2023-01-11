var assert = require("assert");
const webdriver = require("selenium-webdriver");

const rootUrl = "http://localhost:3000";
const loginUrl = rootUrl + "/login";
const registerUrl = rootUrl + "/register";

describe("React Sinappsa Frontend Registration Test", () => {
  var driver;

  before(() => {
    driver = new webdriver.Builder().forBrowser("firefox").build();
  });

  it("go to login", () => {
    driver.get(rootUrl).then(() => {
      driver
        .findElement(webdriver.By.linkText("Prijava"))
        .then((element) => element.click())
        .then(() => driver.getCurrentUrl())
        .then((url) => assert.equal(url, loginUrl))
        .catch(() => assert.fail("Test failed"));
    });
  });

  it("go to register", () => {
    driver.get(loginUrl).then(() => {
      driver
        .findElement(webdriver.By.linkText("Registriraj se ovdje"))
        .then((element) => element.click())
        .then(() => driver.getCurrentUrl())
        .then((url) => assert.equal(url, registerUrl))
        .catch(() => assert.fail("Test failed"));
    });
  });

  it("name input", () => {
    driver.get(registerUrl).then(() => {
      driver
        .findElement(webdriver.By.id("ime"))
        .sendKeys("Testno Ime\n")
        .then(() => {
          driver.getPageSource().then((source) => {
            assert.equal(source.includes("Testno Ime"), true);
          });
        });
    });
  });
  it("surname input", () => {
    driver.get(registerUrl).then(() => {
      driver
        .findElement(webdriver.By.id("prezime"))
        .sendKeys("Testno Prezime\n")
        .then(() => {
          driver.getPageSource().then((source) => {
            assert.equal(source.includes("Testno Prezime"), true);
          });
        });
    });
  });

  after(() => driver.quit());
});
