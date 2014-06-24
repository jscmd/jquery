define(function(require) {
  var $ = require('$');
  var daterangepicker = require('../src/daterangepicker');

  describe('daterangepicker', function() {

    it('normal usage', function() {
      expect(typeof $.daterangepicker === 'function').to.be.ok()
    });
  });

});
