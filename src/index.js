'use strict'

exports.__esModule = true
exports.default = _default

var core = require('@babel/core')

function _default () {
  var t = core.types

  function isCharCode (path) {
    return path.node.property.name === 'charCodeAt' && path.parent.arguments[0].value === 0
  }

  return {
    visitor: {
      MemberExpression: {
        exit: function exit (path) {
          if (!isCharCode(path)) {
            return
          }

          var object = path.node.object
          if (object.type === 'StringLiteral') {
            path.parentPath.replaceWith(t.numericLiteral(path.node.object.value.charCodeAt(0)))
          } else if (object.type === 'TemplateLiteral' && !object.expressions.length) {
            path.parentPath.replaceWith(t.numericLiteral(path.node.object.quasis[0].value.raw.charCodeAt(0)))
          }
        }
      }
    }
  }
}
