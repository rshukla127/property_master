process.env.CHROME_BIN = require("puppeteer").executablePath();
module.exports = function (config) {
  config.set({
    frameworks: ["ui5", "qunit", "sinon"],
    ui5: {
      url: "https://sapui5.hana.ondemand.com",
      mode: "script",
      config: {
        bindingSyntax: "complex",
        compatVersion: "edge",
        async: true,
        resourceRoots: {
          "com.public.storage": "./base/webapp",
        },
      },
      tests: [
        "com/public/storage/test/unit/allTests",
        "com/public/storage/test/integration/FirstJourney",
      ],
    },
    preprocessors: {
      // Files that should be included or excluded from coverage analysis            'webapp/*.js': ['coverage'],
      "webapp/!(test|localService)/**/*.js": ["coverage"],
    },
    coverageReporter: {
      includeAllSources: true,
      reporters: [{ type: "html", dir: "coverage" }, { type: "text" }],
      check: {
        each: { statements: 100, branches: 100, functions: 100, lines: 100 },
      },
    },
    reporters: ["progress", "coverage"],
    browsers: ["CustomChromeHeadless"],
    failOnFailingTestSuite: true,
    failOnEmptyTestPage: true,
    singleRun: true,
    customLaunchers: { CustomChromeHeadless: { base: "ChromeHeadless" } },
  });
};
