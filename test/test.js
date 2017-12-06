"use strict";

const HermiteDataHelper = require("../build/hermite-data-helper");
const Vector3 = require("three").Vector3;
const HermiteData = require("rabbit-hole").HermiteData;

module.exports = {

	"OctreeHelper": {

		"can be instantiated": function(test) {

			const helper = new HermiteDataHelper();
			test.ok(helper);
			test.done();

		},

		"can create grid points, edges and normals": function(test) {

			const helper = new HermiteDataHelper(new Vector3(), 1, new HermiteData(), true, true);
			test.notEqual(helper.gridPoints.children.length, 0, "grid points are missing");
			test.notEqual(helper.edges.children.length, 0, "edges are missing");
			test.notEqual(helper.normals.children.length, 0, "normals are missing");
			test.done();

		},

		"can be destroyed": function(test) {

			const helper = new HermiteDataHelper(new Vector3(), 1, new HermiteData(), true, true);
			helper.dispose();
			test.equal(helper.gridPoints.children.length, 0, "should delete grid points");
			test.equal(helper.edges.children.length, 0, "should delete edges");
			test.equal(helper.normals.children.length, 0, "should delete normals");
			test.done();

		}

	}

};
