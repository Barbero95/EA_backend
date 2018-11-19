"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { mongoose } = require('mongoose');
const { GeoJSON } = require('mongoose-geojson-schema');
var schema = new mongoose.schema({
    any: mongoose.schema.Types.GeoJson,
    point: mongoose.Schema.Point
});
var db = mongoose.createConnection('localhost', 'geo');
var model = db.model('GeoJSON', schema);
//# sourceMappingURL=geo.js.map