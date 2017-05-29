app.controller('ClockController', ['$scope', function($scope) {
    var defaultWorkTime = 0.2; //set defaults
    var defaultBreakTime = 0.2;
    $scope.workTime = defaultWorkTime; //set to default initially
    $scope.breakTime = defaultBreakTime;

    $scope.workMinutes = 0; //make 0's appear so something appears at least
    $scope.workSeconds = "00";
    $scope.breakMinutes = 0;
    $scope.breakSeconds = "00";
    $scope.showClock = false;
    var x;
    var firstTimeRunning = true;
    var initialWorkTime, initialBreakTime;
    var pause = false;

    $scope.reset = function() {
        $scope.workTime = defaultWorkTime; //reset everything to original state
        $scope.breakTime = defaultBreakTime;
        $scope.workMinutes = 0;
        $scope.workSeconds = "00";
        $scope.breakMinutes = 0;
        $scope.breakSeconds = "00";
        $scope.showClock = false;
        firstTimeRunning = true;
        clearInterval(x);
    };

    $scope.pause = function() {
        clearInterval(x);
        pause = true;
        console.log($scope.workMinutes + " " + $scope.workSeconds + " " + $scope.breakMinutes + " " + $scope.breakSeconds);
        if (($scope.workMinutes >= 0 && $scope.workSeconds >= 0)) {
            $scope.workTime = $scope.workMinutes + $scope.workSeconds / 60;
        }
        if (($scope.breakMinutes >= 0 && $scope.breakSeconds >= 0)) {
            $scope.breakTime = $scope.breakMinutes + $scope.breakSeconds / 60;
        }
        console.log($scope.workTime + " " + $scope.breakTime);
    };

    $scope.startWork = function(time) {
        clearInterval(x); //if user clicks button again, let go of previous timer
        var countDownTime = new Date().getTime() +
            time * 1000 * 60;
        $scope.showClock = true;
        console.log($scope.workTime + " " + $scope.breakTime);
        if (firstTimeRunning === true) {
            initialWorkTime = $scope.workTime;
            initialBreakTime = $scope.breakTime;
            firstTimeRunning = false;
        }
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
                $scope.workTime = initialWorkTime;
                if (pause === true && $scope.breakTime != 0) {
                    $scope.breakTime = $scope.breakMinutes + $scope.breakSeconds / 60;
                    pause = false;
                } else {
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
                    $scope.breakTime = initialBreakTime;
                    $scope.workTime = initialWorkTime;
                    $scope.startWork($scope.workTime);
                }
                $scope.$apply();
            }, 1000);
        }

    };
}]);
