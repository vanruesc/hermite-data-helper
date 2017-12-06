"use strict";

const HermiteDataHelper = require("../build/hermite-data-helper");

module.exports = {

	"HermiteDataHelper": {

		"can be instantiated": function(test) {

			const helper = new HermiteDataHelper();
			test.ok(helper);
			test.done();

		}

	}

};
