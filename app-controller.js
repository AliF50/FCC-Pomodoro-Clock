app.controller('ClockController', ['$scope', function($scope) {
    var defaultWorkTime = 25;
    var defaultBreakTime = 5;
    var initialWorkTime, initialBreakTime;
    $scope.workTime = defaultWorkTime;
    $scope.breakTime = defaultBreakTime;


    $scope.workMinutes;
    $scope.workSeconds;
    $scope.breakMinutes;
    $scope.breakSeconds;
    $scope.showClock = false;
    $scope.running;
    var x;
    $scope.reset = function() {
        $scope.workTime = defaultWorkTime;
        $scope.breakTime = defaultBreakTime;
        $scope.showClock = false;
        clearInterval(x);
    };
    $scope.pause = function() {
        clearInterval(x);
        initialWorkTime = $scope.workTime;
        initialBreakTime = $scope.breakTime;
        $scope.workTime = $scope.workMinutes + $scope.workSeconds / 60;
        $scope.breakTime = $scope.breakMinutes + $scope.breakSeconds / 60;
    };
    $scope.startWork = function(time) {

        var countDownTime = new Date().getTime() + time * 1000 * 60;
        $scope.showClock = true;
        x = setInterval(function() {
            var now = new Date().getTime();
            var distance = countDownTime - now;
            $scope.workMinutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            $scope.workSeconds = Math.floor((distance % (1000 * 60)) / 1000);
            if ($scope.workSeconds < 10) {
                $scope.workSeconds = "0" + $scope.workSeconds;
            }
            if (distance <= 0) {
                clearInterval(x);
                if (initialWorkTime && initialBreakTime) {
                    $scope.workTime = initialWorkTime;
                    $scope.breakTime = initialBreakTime;
                }
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
                if ($scope.breakSeconds < 10) {
                    $scope.breakSeconds = "0" + $scope.breakSeconds;
                }
                if (distance <= 0) {
                    clearInterval(x);
                    if (initialWorkTime && initialBreakTime) {
                        $scope.workTime = initialWorkTime;
                        $scope.breakTime = initialBreakTime;
                    }
                    $scope.startWork($scope.workTime);
                }
                $scope.$apply();
            }, 1000);
        }

    };
}]);
