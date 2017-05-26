app.controller('ClockController', ['$scope', function($scope) {
    var defaultWorkTime = 25; //set defaults
    var defaultBreakTime = 5;
    $scope.workTime = defaultWorkTime; //set to default initially
    $scope.breakTime = defaultBreakTime;


    $scope.workMinutes = 0; //make 0's appear so something appears at least
    $scope.workSeconds = "00";
    $scope.breakMinutes = 0;
    $scope.breakSeconds = "00";
    $scope.showClock = false;
    $scope.running;
    var x;
    $scope.reset = function() {
        $scope.workTime = defaultWorkTime; //reset everything to original state
        $scope.breakTime = defaultBreakTime;
        $scope.workMinutes = 0;
        $scope.workSeconds = "00";
        $scope.breakMinutes = 0;
        $scope.breakSeconds = "00";
        $scope.showClock = false;
        clearInterval(x);
    };
    $scope.startWork = function(time) {
        clearInterval(x); //if user clicks button again, let go of previous timer
        var countDownTime = new Date().getTime() +
            time * 1000 * 60;
        $scope.showClock = true;
        x = setInterval(function() {
            var now = new Date().getTime();
            var distance = countDownTime - now;
            $scope.workMinutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            $scope.workSeconds = Math.floor((distance % (1000 * 60)) / 1000);
            if ($scope.workMinutes <= 0) {
                $scope.workMinutes = 0;
            }
            if ($scope.workSeconds < 0) {
                $scope.workSeconds = 0;
            }
            if ($scope.workSeconds < 10) { //for seconds from 0-9
                $scope.workSeconds = "0" + $scope.workSeconds;
            }
            if (distance <= 0) {
                clearInterval(x);
                startBreak($scope.breakTime);
            }
            $scope.$apply();
        }, 1000);

        function startBreak(time) {
            var countDownTime = new Date().getTime() + time * 1000 * 60;

            x = setInterval(function() {
                var now = new Date().getTime();
                var distance = countDownTime - now;
                $scope.breakMinutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                $scope.breakSeconds = Math.floor((distance % (1000 * 60)) / 1000);
                if ($scope.breakMinutes <= 0) {
                    $scope.breakMinutes = 0;
                }
                if ($scope.breakSeconds < 0) {
                    $scope.breakSeconds = 0;
                }
                if ($scope.breakSeconds < 10) {
                    $scope.breakSeconds = "0" + $scope.breakSeconds;
                }
                if (distance <= 0) {
                    clearInterval(x);
                    $scope.startWork($scope.workTime);
                }
                $scope.$apply();
            }, 1000);
        }

    };
}]);
