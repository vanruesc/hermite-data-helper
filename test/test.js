"use strict";

const HermiteDataHelper = require("../build/hermite-data-helper");

module.exports = {

	"HermiteDataHelper": {

		"can be instantiated": function(test) {

			const helper = new HermiteDataHelper();
			test.ok(helper);
			test.done();

		},

		"fails with invalid data": function(test) {

			const helper = new HermiteDataHelper();
			test.throws(helper.update);
			test.done();

		}

	}

};
