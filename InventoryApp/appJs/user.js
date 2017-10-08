
//The Module Declaration
var app = angular.module('inventoryApp',[]);

//Declaring Service
app.service('UserService', function ($http) {

    this.registerUser = function (userName, userPassword, callback) {
        var base_url = window.location.origin;
        var url = base_url +"/api/Registration/Register";
        //
        url = url + "?userName=" + userName + "&password=" + userPassword;
        var req = {
            method: 'POST',
            url: url,
            dataType: 'json'
        }

        
        var data = $http(req).then(callback);
        //var data = $http.post(url, userName, userPassword);
        return data;
    };


    this.loginUser = function (userName, userPassword, callback) {
        var base_url = window.location.origin;
        var url = base_url + "/api/Registration/Login";
        //
        url = url + "?userName=" + userName + "&password=" + userPassword;
        var req = {
            method: 'GET',
            url: url,
            dataType: 'json'
        }

        var data = $http(req).then(callback);
        return data;
    };

    this.getUserCar = function (userName, callback) {
        var base_url = window.location.origin;
        var url = base_url + "api/UserInventory/GetUserCar";
        //
        url = url + "?userName=" + userName;

        var req = {
            method: 'GET',
            url: url,
            dataType: 'json'
        }

        var data = $http(req).then(callback);
        return data;
    };

});

//Declaring the Controller
app.controller('UserController', function ($scope, UserService) {

    $scope.isLoading = true;
    $scope.errorLogin = false;
    $scope.userName = '';
    $scope.userPassword = "";
    $scope.userCar = [];
    $scope.userLoggedIn = null;


    $scope.RegisterUser = function () {
        console.log('SCOPE RegisterUser ', $scope.userName, $scope.userPassword);
        var promise = UserService.registerUser($scope.userName, $scope.userPassword);
        promise.then(function (resp) {
            $scope.isLoading = false;

            var result = resp;
            console.log('Response :', result);
            //End

        }, function (err) {
            $scope.isLoading = false;

            console.log('printing error starts');
            console.log(err);
            console.log('printing error (RegisterUser) end');
            $scope.Message = "Call-Failed";
        });
    }


    function RegisterUser_callback(data) {
        return function (resp) {
            if (resp.data != undefined) {
            }
        }
    }

    $scope.LoginUser = function () {
        var promise = UserService.loginUser($scope.userName, $scope.userPassword);
        promise.then(function (resp) {
            $scope.isLoading = false;

            var result = resp;
            console.log('Response :', result);

            $scope.errorLogin = !result.data;
            if (result.data == true) {
                createCookie("userName", $scope.userName, 1);
                  var base_url = window.location.origin;
                  window.location.href = base_url + "/Inventory/Index";
            }
            //End

        }, function (err) {
            $scope.isLoading = false;
            $scope.errorLogin = true;


            console.log('printing error starts');
            console.log(err);
            console.log('printing error (RegisterUser) end');
            $scope.Message = "Call-Failed";
        });
    }

    $scope.GetUserCar = function () {
        var userName = readCookie("UserName");
        var promise = UserService.getUserCar(userName);
        promise.then(function (resp) {
            $scope.isLoading = false;

            var result = resp;
            console.log('Response :', result);
            //End

        }, function (err) {
            $scope.isLoading = false;

            console.log('printing error starts');
            console.log(err);
            console.log('printing error (GetUserCar) end');
            $scope.Message = "Call-Failed";
        });
    }
    function createCookie(name, value, days) {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            var expires = "; expires=" + date.toGMTString();
        }
        else var expires = "";
        document.cookie = name + "=" + value + expires + "; path=/";
    }

    function readCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    function eraseCookie(name) {
        createCookie(name, "", -1);
    }
});

