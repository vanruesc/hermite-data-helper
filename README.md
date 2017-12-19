# Hermite Data Helper

[![Build status](https://travis-ci.org/vanruesc/hermite-data-helper.svg?branch=master)](https://travis-ci.org/vanruesc/hermite-data-helper) 
[![npm version](https://badge.fury.io/js/hermite-data-helper.svg)](http://badge.fury.io/js/hermite-data-helper) 
[![Dependencies](https://david-dm.org/vanruesc/hermite-data-helper.svg?branch=master)](https://david-dm.org/vanruesc/hermite-data-helper)

A Hermite data visualisation tool for [rabbit-hole](https://github.com/vanruesc/rabbit-hole) and [three.js](https://threejs.org/).


## Installation

```sh
npm install hermite-data-helper
``` 


## Usage

```javascript
import { Scene, Vector3 } from "three";
import { HermiteData } from "rabbit-hole";
import HermiteDataHelper from "hermite-data-helper";

const scene = new Scene();
const data = new HermiteData();
const cellPosition = new Vector3();
const cellSize = 1;

const hermiteDataHelper = new HermiteDataHelper(cellPosition, cellSize, data);

// Render the helper.
scene.add(hermiteDataHelper);

// Access special geometry subgroups.
console.log(hermiteDataHelper.gridPoints);
console.log(hermiteDataHelper.edges);
console.log(hermiteDataHelper.normals);

// Use a different cell size, position and data set.
hermiteDataHelper.set(otherPosition, otherSize, otherData);

try {

	// Destroy the helper geometry and rebuild grid points and edges.
	hermiteDataHelper.update(true, true);

} catch(e) {

	// The provided position, size or data is invalid.

}

// Destroy the helper geometry.
hermiteDataHelper.dispose();
```

A full example can be found [here](https://vanruesc.github.io/rabbit-hole/public/demo/#svo).


## Contributing

Maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code.
