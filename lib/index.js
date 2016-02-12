'use strict';

var fs        = require('fs');
var path      = require('path');
var program   = require('commander');
var Converter = require('./converter');
var _         = require('lodash');
var Promise   = require('bluebird');

function main() {
  program
   .version('0.0.1')
   .usage('[files ...] [folders ...]')
   .option('-i, --put-id', 'Put _id into schemas')
   .option('-p, --prettyprint', 'Pretty print json')
   .option('-m, --merge <path>', 'Merge into one Json file. You have to pass the name of the output file')
   .parse(process.argv);

  var options = {
    putId: program.putId
  };

  var promises = [];
  program.args.forEach(function (f) {

    var p = _startRecursive(f, options);
    promises.push(p);
  });

  Promise.all(promises).then(function (result) {
    var out = [];
    result.forEach(function(item){
      out = _.concat(out, item);
    });

    if (program.merge) {
      var merged = _getMergedObject(out);
      _writeFile(program.merge, merged);
    } else {
      out.forEach(function (s) {
        _writeFile(s.path, s.schema);
      });
    }
  });

  /*if (program.merge) {
   var merged = _getMergedObject(result);
   _writeFile(program.merge, merged);
   } else {
   result.forEach(function (s) {
   console.log(s);
   _writeFile(s.path, s.schema);
   });
   }*/
}

function _startRecursive(item, options) {

  return new Promise(function (resolve, reject) {
    if (fs.lstatSync(item).isFile()) {
      if (item.match(/.js$/)) {
        item          = _normalizePath(item);
        var converter = new Converter(item, options);
        resolve([converter.run()]);
      }
    } else if (fs.lstatSync(item).isDirectory()) {
      var directory = item;
      _getFiles(directory, function (err, files) {
        if (err) {
          reject(err);
        }

        var results = [];

        files.forEach(function (f) {
          if (f.match(/.js$/)) {
           // f             = _normalizePath(f);
            var converter = new Converter(f, options);
            results.push(converter.run());
          }
        });

        resolve(results);
      });
    }
  });
}

function _getFiles(dir, done) {
  var results = [];
  fs.readdir(dir, function (err, list) {
    if (err) return done(err);
    var pending = list.length;
    if (!pending) return done(null, results);
    list.forEach(function (file) {
      file = path.resolve(dir, file);
      fs.stat(file, function (err, stat) {
        if (stat && stat.isDirectory()) {
          _getFiles(file, function (err, res) {
            results = results.concat(res);
            if (!--pending) done(null, results);
          });
        } else {
          results.push(file);
          if (!--pending) done(null, results);
        }
      });
    });
  });
}

function _getMergedObject(schemas) {
  var merged = {};
  schemas.forEach(function (schema) {
    merged[schema.name] = schema.schema;
  });
  return merged;
}


function _normalizePath(item) {
  return path.join(process.cwd(), item);
}


function _writeFile(path, _fileContent) {
  var newPath = path.replace(/.js$/, '.json');
  try {
    var prettyPrint = program.prettyprint ? 4 : 0;
    var fileContent = JSON.stringify(_fileContent, null, prettyPrint);
  }
  catch (err) {
    var fileContent = err;
  }
  fs.writeFile(newPath, fileContent, function (err) {
    if (err) {
      return console.log(err);
    }
  });

}


//function _writeFiles


module.exports = main;