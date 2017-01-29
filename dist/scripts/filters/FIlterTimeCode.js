(function() {
  function FilterTimeCode() {
        return function (seconds) {
            if (Number.isNaN(seconds)) {
                return '0:00';
            }
            return buzz.toTimer(seconds)
    };
  }

  angular
    .module('blocJams')
    .filter('FilterTimeCode', FilterTimeCode);

})();