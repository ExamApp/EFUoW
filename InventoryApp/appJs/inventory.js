
//The Module Declaration
var app = angular.module('inventoryApp', ['ui.bootstrap']);
//app.filter('startsWithModelOrBrand', function () {
//    return function (item) {
//        return item.Brand == "Maruti";
//    };
//});

//app.filter('startsWithModelOrBrand', function () {
//    return function (items) {
//        var filtered = [];
//        for (var i = 0; i < items.length; i++) {
//            var item = items[i];
//            if (/a/i.test(item.name.substring(0, 1))) {
//                filtered.push(item);
//            }
//        }
//        return filtered;
//    };
//});

//Declaring Service
app.service('InventoryService', function ($http) {

    
    this.getUserCar = function (userName, callback) {
        var base_url = window.location.origin;
        var url = base_url + "/api/UserInventory/GetUserCar";
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

    this.editUserCar = function ( userId,  carId,  model,  brand,  price,  year, callback) {
        var base_url = window.location.origin;
        var url = base_url + "/api/UserInventory/EditUserCar";
        //
        url = url + "?userId=" + userId + "&carId=" + carId + "&model=" + model + "&brand=" + brand + "&price=" + price + "&year=" + year;

        var req = {
            method: 'POST',
            url: url,
            dataType: 'json'
        }

        var data = $http(req).then(callback);
        return data;
    };
      //  var promise = InventoryService.addUserCar(userName, model, brand, price, year, AddUserCar_callback);
    //

    this.addUserCar = function (userName, model, brand, price, year, callback) {
        var base_url = window.location.origin;
        var url = base_url + "/api/UserInventory/AddUserCar";
        //
        url = url + "?userName=" + userName + "&model=" + model + "&brand=" + brand + "&price=" + price + "&year=" + year;

        var req = {
            method: 'POST',
            url: url,
            dataType: 'json'
        }

        var data = $http(req).then(callback);
        return data;
    };
});

//Declaring the Controller
app.controller('InventoryController', function ($scope, $modal, $log, InventoryService) {

    $scope.isLoading = true;
    $scope.userName = '';
    $scope.userPassword = "";
    $scope.userCar = [];
    $scope.userLoggedIn = null;
    $scope.carFilter = '';
    $scope.fModel;
    $scope.fBrand;

    $scope.brand = '';
    $scope.model = '';
    $scope.year = '';
    $scope.price = '';
    $scope.myFilter = function (item) {
        if ($scope.carFilter.length == 0) return true;

        //return item.Brand.=== $scope.carFilter || item.model === $scope.carFilter;
        return item.Brand.toLowerCase().indexOf($scope.carFilter.toLowerCase()) >= 0 || item.Model.toLowerCase().indexOf($scope.carFilter.toLowerCase()) >= 0;
    };

    GetUserCar();

    $scope.EditCar = function (id, brand, model, year, price, userName, car) {
        $scope.message = "Show Form Button Clicked";
        $scope.Id = id;
        $scope.userName = userName;
        $scope.brand = brand;
        $scope.model = model;
        $scope.price = price;
        $scope.year = year;
        $scope.car = car;

        var modalInstance = $modal.open({
            templateUrl: '../modal-form.html',
            controller: ModalInstanceCtrl,
            scope: $scope,
            resolve: {
                userForm: function () {
                    return $scope.userForm;
                },
                userData: function () {
                    return $scope;
                },
                carData: function () {
                    return $scope.car;
                },
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
    var ModalInstanceCtrl = function ($scope, $modalInstance, userForm, userData, carData) {
        $scope.form = {}
        console.log('user data', $scope, carData);

        $scope.submitForm = function () {
            if ($scope.form.userForm.$valid) {
                var brand = $scope.form.userForm.$$controls["0"].$viewValue;
                var model = $scope.form.userForm.$$controls["1"].$viewValue;
                var year = $scope.form.userForm.$$controls["2"].$viewValue;
                var price = $scope.form.userForm.$$controls["3"].$viewValue;

                console.log('user form is in scope', brand, model, year, price);
                console.log($scope.model);

                EditUserCar(carData.OwnerId, carData.Id, model, brand, price, year);
                $modalInstance.close('closed');
            } else {
                console.log('userform is not in scope');
            }
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    };

    $scope.AddUserCar = function () {
        $scope.Id;
        $scope.userName;
        $scope.brand = '';
        $scope.model = '';
        $scope.price = '';
        $scope.year = '';
        $scope.car;

        var modalInstance = $modal.open({
            templateUrl: '../modal-form-add.html',
            controller: ModalInstanceAddCtrl,
            scope: $scope,
            resolve: {
                userForm: function () {
                    return $scope.userForm;
                },
                userData: function () {
                    return $scope;
                },
                carData: function () {
                    return $scope.car;
                },
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
    var ModalInstanceAddCtrl = function ($scope, $modalInstance, userForm, userData, carData) {
        $scope.form = {}
        $scope.submitForm = function () {
            if ($scope.form.userForm.$valid) {
                var brand = $scope.form.userForm.$$controls["0"].$viewValue;
                var model = $scope.form.userForm.$$controls["1"].$viewValue;
                var year = $scope.form.userForm.$$controls["2"].$viewValue;
                var price = $scope.form.userForm.$$controls["3"].$viewValue;

                console.log('user form is in scope', brand, model, year, price);
                console.log($scope.model);

                var userName = readCookie("userName");

                AddUserCar(userName, model, brand, price, year);
                $modalInstance.close('closed');
            } else {
                console.log('userform is not in scope');
            }
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    };


    function GetUserCar() {
        var userName = readCookie("userName");
        $scope.userName = userName;

        var promise = InventoryService.getUserCar(userName);
        promise.then(function (resp) {
            $scope.isLoading = false;

            var result = resp;
            console.log('Response :', result);
            $scope.userCar = resp.data; 
            //End

        }, function (err) {
            $scope.isLoading = false;

            console.log('printing error starts');
            console.log(err);
            console.log('printing error (GetUserCar) end');
            $scope.Message = "Call-Failed";
        });
    }

    function EditUserCar(userId, carId, model, brand, price, year) {
        var promise = InventoryService.editUserCar(userId, carId, model, brand, price, year, EditUserCar_callback);
        promise.then(function (resp) {
            $scope.isLoading = false;

            var result = resp;
            console.log('Response :', result);
            $scope.userCar = resp.data;
            //End

        }, function (err) {
            $scope.isLoading = false;

            console.log('printing error starts');
            console.log(err);
            console.log('printing error (EditUserCar) end');
            $scope.Message = "Call-Failed";
        });
    }

    function EditUserCar_callback(data) {
        GetUserCar();
    }

    function AddUserCar(userName, model, brand, price, year) {
        var promise = InventoryService.addUserCar(userName, model, brand, price, year, AddUserCar_callback);
        promise.then(function (resp) {
            $scope.isLoading = false;

            var result = resp;
            console.log('Response :', result);
            $scope.userCar = resp.data;
            //End

        }, function (err) {
            $scope.isLoading = false;

            console.log('printing error starts');
            console.log(err);
            console.log('printing error (AddUserCar) end');
            $scope.Message = "Call-Failed";
        });
    }

    function AddUserCar_callback(data) {
        GetUserCar();
    }

    $scope.UserSignOut = function () {
        eraseCookie("userName");
        var base_url = window.location.origin;
        window.location.href = base_url + "/Home/Index1";
    }

    $scope.FindByBrand = function () {
        var brandToFind = $scope.carFilter;
        if (brandToFind.length == 0) return;

        var allCars = $scope.userCar;
        var newList = [];    
        allCars.forEach(function (car) {
            if (car.Brand == brandToFind)
                newList.push(car);
        });

        $scope.userCar = newList;
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

