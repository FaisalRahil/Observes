## -- Dependencies -------------------------------------------------------------

expressValidator = require('sailorjs/node_modules/sailor-validator/node_modules/express-validator')

## -- Exports ------------------------------------------------------------------

module.exports = (sails) ->
  routes:
    before:
      "*": expressValidator()
