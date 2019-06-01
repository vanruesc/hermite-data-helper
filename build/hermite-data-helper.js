/**
 * hermite-data-helper v0.15.0 build Sat Jun 01 2019
 * https://github.com/vanruesc/hermite-data-helper
 * Copyright 2019 Raoul van Rüschen, Zlib
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('three')) :
  typeof define === 'function' && define.amd ? define(['three'], factory) :
  (global = global || self, global.HERMITEDATAHELPER = factory(global.THREE));
}(this, function (three) { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  var air = 0;
  var HermiteDataHelper = function (_Group) {
    _inherits(HermiteDataHelper, _Group);

    function HermiteDataHelper() {
      var _this;

      var cellPosition = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var cellSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var useMaterialIndices = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      var useEdgeData = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;

      _classCallCheck(this, HermiteDataHelper);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(HermiteDataHelper).call(this));
      _this.name = "HermiteDataHelper";
      _this.cellPosition = cellPosition;
      _this.cellSize = cellSize;
      _this.data = data;
      _this.pointsMaterial = new three.PointsMaterial({
        vertexColors: three.VertexColors,
        sizeAttenuation: true,
        size: 0.05
      });

      _this.add(new three.Group());

      _this.add(new three.Group());

      _this.add(new three.Group());

      _this.gridPoints.name = "GridPoints";
      _this.edges.name = "Edges";
      _this.normals.name = "Normals";

      try {
        _this.update(useMaterialIndices, useEdgeData);
      } catch (e) {}

      return _this;
    }

    _createClass(HermiteDataHelper, [{
      key: "validate",
      value: function validate() {
        var error = null;

        if (this.cellPosition === null) {
          error = new Error("The cell position is not defined");
        } else if (this.cellSize <= 0) {
          error = new Error("Invalid cell size: " + this.cellSize);
        } else if (this.data === null) {
          error = new Error("No data");
        } else {
          if (this.data.empty) {
            error = new Error("The provided data is empty");
          }

          if (this.data.compressed) {
            error = new Error("The provided data must be uncompressed");
          }
        }

        return error;
      }
    }, {
      key: "set",
      value: function set(cellPosition, cellSize, data) {
        this.cellPosition = cellPosition;
        this.cellSize = cellSize;
        this.data = data;
        return this;
      }
    }, {
      key: "update",
      value: function update() {
        var useMaterialIndices = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        var useEdgeData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        var data = this.data;
        var error = this.validate();
        this.dispose();

        if (error !== null) {
          throw error;
        } else {
          if (useMaterialIndices) {
            this.createPoints(data);
          }

          if (useEdgeData && data.edgeData !== null) {
            this.createEdges(data);
          }
        }

        return this;
      }
    }, {
      key: "createPoints",
      value: function createPoints(data) {
        var materialIndices = data.materialIndices;
        var n = Math.cbrt(materialIndices.length) - 1;
        var s = this.cellSize;
        var base = this.cellPosition;
        var offset = new three.Vector3();
        var position = new three.Vector3();
        var color = new Float32Array([0.0, 0.0, 0.0]);
        var geometry = new three.BufferGeometry();
        var vertexCount = data.materials;
        var positions = new Float32Array(vertexCount * 3);
        var colors = new Float32Array(vertexCount * 3);
        var x, y, z;
        var i, j;

        for (i = 0, j = 0, z = 0; z <= n; ++z) {
          offset.z = z * s / n;

          for (y = 0; y <= n; ++y) {
            offset.y = y * s / n;

            for (x = 0; x <= n; ++x) {
              offset.x = x * s / n;

              if (materialIndices[i++] !== air) {
                position.addVectors(base, offset);
                positions[j] = position.x;
                colors[j++] = color[0];
                positions[j] = position.y;
                colors[j++] = color[1];
                positions[j] = position.z;
                colors[j++] = color[2];
              }
            }
          }
        }

        geometry.addAttribute("position", new three.BufferAttribute(positions, 3));
        geometry.addAttribute("color", new three.BufferAttribute(colors, 3));
        this.gridPoints.add(new three.Points(geometry, this.pointsMaterial));
      }
    }, {
      key: "createEdges",
      value: function createEdges(data) {
        var edgeData = data.edgeData;
        var n = Math.cbrt(data.materialIndices.length) - 1;
        var s = this.cellSize;
        var normalA = new three.Vector3();
        var normalB = new three.Vector3();
        var edgeIterators = [edgeData.edgesX(this.cellPosition, this.cellSize), edgeData.edgesY(this.cellPosition, this.cellSize), edgeData.edgesZ(this.cellPosition, this.cellSize)];
        var axisColors = [new Float32Array([0.6, 0.0, 0.0]), new Float32Array([0.0, 0.6, 0.0]), new Float32Array([0.0, 0.0, 0.6])];
        var normalColor = new Float32Array([0.0, 1.0, 1.0]);
        var lineSegmentsMaterial = new three.LineBasicMaterial({
          vertexColors: three.VertexColors
        });
        var edgePositions, edgeColors;
        var normalPositions, normalColors;
        var vertexCount, edgeColor, geometry, edges, edge;
        var d, i, j;

        for (i = 0, j = 0, d = 0; d < 3; ++d, i = 0, j = 0) {
          edgeColor = axisColors[d];
          edges = edgeIterators[d];

          if (edges.lengths.length > 0) {
            vertexCount = edges.lengths[0] * 2;
            edgePositions = new Float32Array(vertexCount * 3);
            edgeColors = new Float32Array(vertexCount * 3);
            normalPositions = new Float32Array(vertexCount * 3);
            normalColors = new Float32Array(vertexCount * 3);
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
              for (var _iterator = edges[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                edge = _step.value;
                edgePositions[i] = edge.a.x;
                edgeColors[i++] = edgeColor[0];
                edgePositions[i] = edge.a.y;
                edgeColors[i++] = edgeColor[1];
                edgePositions[i] = edge.a.z;
                edgeColors[i++] = edgeColor[2];
                edgePositions[i] = edge.b.x;
                edgeColors[i++] = edgeColor[0];
                edgePositions[i] = edge.b.y;
                edgeColors[i++] = edgeColor[1];
                edgePositions[i] = edge.b.z;
                edgeColors[i++] = edgeColor[2];
                edge.computeZeroCrossingPosition(normalA);
                normalB.copy(normalA).addScaledVector(edge.n, 0.25 * s / n);
                normalPositions[j] = normalA.x;
                normalColors[j++] = normalColor[0];
                normalPositions[j] = normalA.y;
                normalColors[j++] = normalColor[1];
                normalPositions[j] = normalA.z;
                normalColors[j++] = normalColor[2];
                normalPositions[j] = normalB.x;
                normalColors[j++] = normalColor[0];
                normalPositions[j] = normalB.y;
                normalColors[j++] = normalColor[1];
                normalPositions[j] = normalB.z;
                normalColors[j++] = normalColor[2];
              }
            } catch (err) {
              _didIteratorError = true;
              _iteratorError = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                  _iterator["return"]();
                }
              } finally {
                if (_didIteratorError) {
                  throw _iteratorError;
                }
              }
            }

            geometry = new three.BufferGeometry();
            geometry.addAttribute("position", new three.BufferAttribute(edgePositions, 3));
            geometry.addAttribute("color", new three.BufferAttribute(edgeColors, 3));
            this.edges.add(new three.LineSegments(geometry, lineSegmentsMaterial));
            geometry = new three.BufferGeometry();
            geometry.addAttribute("position", new three.BufferAttribute(normalPositions, 3));
            geometry.addAttribute("color", new three.BufferAttribute(normalColors, 3));
            this.normals.add(new three.LineSegments(geometry, lineSegmentsMaterial));
          }
        }
      }
    }, {
      key: "dispose",
      value: function dispose() {
        var child, children;
        var i, l;

        for (i = 0, l = this.children.length; i < l; ++i) {
          child = this.children[i];
          children = child.children;

          while (children.length > 0) {
            children[0].geometry.dispose();
            children[0].material.dispose();
            child.remove(children[0]);
          }
        }
      }
    }, {
      key: "gridPoints",
      get: function get() {
        return this.children[0];
      }
    }, {
      key: "edges",
      get: function get() {
        return this.children[1];
      }
    }, {
      key: "normals",
      get: function get() {
        return this.children[2];
      }
    }], [{
      key: "air",
      set: function set(value) {
        air = value;
      }
    }]);

    return HermiteDataHelper;
  }(three.Group);

  return HermiteDataHelper;

}));
