'use strict';

var _    = require('lodash');
var fs   = require('fs');
var path = require('path');

function Converter(file, options) {
  var self         = this;
  self.file        = file;
  self.module      = null;
  self.inputSchema = null;
  self.schemaName  = null;
  var defaults     = {
    putId: false
  };
  self.options     = _.merge({}, defaults, options);

  self.baseSchema = {
    'title': '',
    'type': 'object',
    'properties': {
      /*'active': {type: 'boolean', default: true},*/
    },
    'required': []
  };

  this._initSchema = function () {
    self.schema = _.cloneDeep(self.baseSchema);
    return self;
  };

  this._getModule = function () {
    try {
      self.module     = require(self.file);
      self.schemaName = path.basename(self.file, path.extname(self.file));
      return self;
    }
    catch (err) {
      throw new Error(err);
      return self;
    }
  };


  this._extractSchema = function () {
    if (self.module.tree) {
      self.inputSchema = self.module.tree;
      delete self.inputSchema.id;
    } else {
      self.inputSchema = self.module;
    }
    return self;
  };

  this._toJSONSchema = function () {
    self.schema = _.merge({}, self.schema, _convertSchema(self.inputSchema));

    if (self.options.putId && _.isUndefined(self.schema.properties._id)) {
      self.schema.properties._id = {
        type: 'string'
      };
    }
    return self;
  };

  this._setTitle = function () {
    var title         = self.schemaName + ' Schema';
    title             = title.charAt(0).toUpperCase() + title.slice(1);
    self.schema.title = title;
    return self;
  };

  this._result = function () {
    return {
      name: self.schemaName,
      path: self.file,
      schema: self.schema
    };
  };


  function _convertSchema(inputSchema) {
    var newSchema = _.cloneDeep(self.baseSchema);
    _.each(inputSchema, function (field, fieldName) {
      var property = _convertField(newSchema, field, fieldName);
      _.set(newSchema.properties, fieldName, property);
    });

    return newSchema;

  }


  function _convertField(schema, field, fieldName) {
    var property = {};
    if (_.isFunction(field)) {
      property.type = _convertPropertyType(field);
    } else
    //is a field definition
    if (!_.isUndefined(field.type)) {
      _.each(field, function (fieldProperty, fieldPropertyName) {
        switch (fieldPropertyName) {
          case 'type':
            property.type = _convertPropertyType(fieldProperty);
            break;
          case 'required':
            if (fieldProperty === true) {
              schema.required.push(fieldName);
            }
            break;
        }
      });
    } else if (_.isArray(field)) {
      property = {
        type: "array",
        items: _convertSchema(field[0])
      };
      /*_.each(field, function (f, fname) {
       property[fname] = _convertField(_.cloneDeep(self.baseSchema), f, fname);
       });*/
    } else if (_.isObject(field)) {
      property = _convertSchema(field);
    }

    return property;
  }


  /**
   * Utility function to convert property type
   * @param type
   */
  function _convertPropertyType(_type) {
    var type = '';
    if (_.isString(_type)) {
      type = _type.toLowerCase();
    }
    if (_.isFunction(_type)) {
      type = _type.name.toLowerCase();
    }

    if (type === 'objectid') {
      type = 'string';
    }
    type = type.replace('schema', '');

    if (type === 'date') {
      type = 'string';
    }

    return type;
  }


  function run() {
    return self
     ._initSchema()
     ._getModule()
     ._extractSchema()
     ._toJSONSchema()
     ._setTitle()
     ._result();
  }


  return {
    run: run
  }
}

module.exports = Converter;