import test from "ava";
import { HermiteDataHelper } from "../../build/hermite-data-helper.js";

test("can be instantiated", t => {

	const object = new HermiteDataHelper();

	t.truthy(object);

});

test("fails with invalid data", t => {

	const helper = new HermiteDataHelper();
	t.throws(helper.update);

});
