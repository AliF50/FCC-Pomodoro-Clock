app.controller('ClockController', ['$scope', function($scope) {
    var defaultWorkTime = 25; //set defaults
    var defaultBreakTime = 5;
    $scope.workTime = defaultWorkTime; //set to default initially
    $scope.breakTime = defaultBreakTime;
    $scope.workMinutes = 0; //make 0's appear so something appears at least
    $scope.workSeconds = "00"; //Double 0's for formatting
    $scope.breakMinutes = 0;
    $scope.breakSeconds = "00";
    $scope.showClock = false;
    $scope.showWork = false;
    $scope.showBreak = false;

    var x; //global time interval to be able to be cleared everywhere
    var pause = false;
    var initialWorkTime, initialBreakTime, firstTimeRunning = true;

    $scope.reset = function() {
        $scope.workTime = defaultWorkTime; //reset everything to original state
        $scope.breakTime = defaultBreakTime;
        $scope.workMinutes = 0;
        $scope.workSeconds = "00";
        $scope.breakMinutes = 0;
        $scope.breakSeconds = "00";
        $scope.showClock = false;
        $scope.showWork = false;
        $scope.showBreak = false;
        clearInterval(x);
    };

    $scope.pause = function() {
        clearInterval(x);
        //pause = true;
        var workTimeLeft = $scope.workMinutes + $scope.workSeconds / 60;
        var breakTimeLeft = $scope.breakMinutes + $scope.breakSeconds / 60;
        console.log(workTimeLeft + " " + breakTimeLeft);
        console.log()
        if (workTimeLeft > 0) {
            $scope.workTime = $scope.workMinutes + $scope.workSeconds / 60;
        } else {
            $scope.breakTime = $scope.breakMinutes + $scope.breakSeconds / 60;
            $scope.workTime = 0; //initialize to 0 so it goes straight to startBreak()
        }

    };

    $scope.startWork = function(time) {
        clearInterval(x); //if user clicks button again, let go of previous timer
        var countDownTime = new Date().getTime() +
            time * 1000 * 60;
        $scope.showClock = true;
        if ($scope.showBreak === false) //hide GET TO WORK !! if and only if showBreak is false
            $scope.showWork = true;
        if (firstTimeRunning === true) { //Get initial values
            initialWorkTime = $scope.workTime;
            initialBreakTime = $scope.breakTime;
            firstTimeRunning = false;
        }
        console.log($scope.workTime + " " + $scope.breakTime);
        x = setInterval(function() {
            var now = new Date().getTime();
            var distance = countDownTime - now;
            $scope.workMinutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)); //Calculate minutes
            $scope.workSeconds = Math.floor((distance % (1000 * 60)) / 1000); //Calculate seconds
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
                $scope.showWork = false;
                $scope.workTime = initialWorkTime;
                startBreak($scope.breakTime);
            }
            $scope.$apply();
        }, 1000);

        function startBreak(time) {
            var countDownTime = new Date().getTime() + time * 1000 * 60;
            $scope.showBreak = true;
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
                    $scope.showBreak = false;
                    $scope.breakTime = initialBreakTime;
                    $scope.startWork($scope.workTime);
                }
                $scope.$apply();
            }, 1000);
        }

    };
}]);
