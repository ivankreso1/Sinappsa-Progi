var assert = require("assert");
const webdriver = require("selenium-webdriver");

const rootUrl = "http://localhost:3000";
const loginUrl = rootUrl + "/login";
const registerUrl = rootUrl + "/register";

describe("React Sinappsa Frontend Registration Test", () => {
  var driver;

  before(() => {
    driver = new webdriver.Builder().forBrowser("chrome").build();
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

  it("email input", () => {
    driver.get(registerUrl).then(() => {
      var email = driver.findElement(webdriver.By.id("email"));
      email.sendKeys("luka.lukic@fer.hr")
        .then(() => {
          var value = email.getAttribute("value");
          assert.equal(value.contains("@fer"), true);
        });
    });
  });

  it("password input", () => {
    driver.get(registerUrl).then(() => {
      var password = driver.findElement(webdriver.By.id("lozinka"));
      password.sendKeys("12345")
        .then(() => {
          var value = password.getAttribute("value");
          assert.equal(value.length >= 5 ? true : false, true);
        });
    });
  });

  it("username input", () => {
    driver.get(registerUrl).then(() => {
      var username = driver.findElement(webdriver.By.id("username"));
      username.sendKeys("testni username")
        .then(() => {
          var value = username.getAttribute("value");
          assert.equal(value === "testni username" ? true : false, true);
        });
    });
  });

  it("submit button disabled before required inputs", () => {
    driver.get(registerUrl).then(() => {
      var submit = driver.findElement(webdriver.By.id("submit"))
      .then(() => {
        var submitState = submit.getAttribute("disabled");
        assert.equal(submitState === true ? true : false, true)
      })
    })
  })

  after(() => driver.quit());
});
