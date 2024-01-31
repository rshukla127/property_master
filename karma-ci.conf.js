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
                "vast.ui.audit.manageaudits": "./base/webapp"
             }
          },
          tests: ["com/public/storage/test/unit/allTests", "com/public/storage/test/integration/FirstJourney"]
       },
       preprocessors: {
          // Files that should be included or excluded from coverage analysis 
          'webapp/*.js': ['coverage'],
          'webapp/!(test|localService)/**/*.js': ['coverage']
       },
       coverageReporter: {
          includeAllSources: true,
          reporters: [{
             type: "html",
             dir: "coverage"
          }, {
             type: "text"
          }],
          check: {
             each: {
                statements: 100,
                branches: 100,
                functions: 100,
                lines: 100
             }
          }
       },
       reporters: ['progress', 'coverage'],
       browsers: ['ChromeHeadless'],
       failOnFailingTestSuite: true,
       failOnEmptyTestPage: true,
       singleRun: true
    });
 }