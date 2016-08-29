/**
 * 
 */
var app = angular.module("UserManagement", []);

app.controller("UserManagementController", function($scope, $http) {

	$scope.employees = [];
	$scope.form = {
		firstName : "",
		lastName : "",
		email : "",
		rollno:""
	};

	// HTTP POST/PUT methods for add/edit employee
	$scope.submitEmployee = function() {

		var method = "";
		var url = "";
		if ($scope.form._id == undefined) {
			// Id is absent so add employee - POST operation
			method = "POST";
			url = 'http://192.168.0.11/mongo/rest/api/v1/dbs/local/employees';
		} else {
			// If Id is present, it's edit operation - PUT operation
			method = "PUT";
			url = 'http://192.168.0.11/mongo/rest/api/v1/dbs/local/employees/' + $scope.form._id;
		}

		$http({
			method : method,
			url : url,
			data : angular.toJson($scope.form),
			headers : {
				'Content-Type' : 'application/json'
			}
		}).then(handlesuccess, _error);
	};

	// HTTP DELETE- delete employee by Id
	$scope.removeEmployee = function(employee) {
		$http({
			method : 'DELETE',
			url : 'http://192.168.0.11/mongo/rest/api/v1/dbs/local/employees/' + employee._id
		}).then(handlesuccess, _error);
	};

	// In case of edit employee, populate form with employee data
	$scope.editEmployee = function(employee) {
		$scope.form.firstName = employee.firstName;
		$scope.form.lastName = employee.lastName;
		$scope.form.email = employee.email;
		$scope.form._id = employee._id;
		$scope.form.rollno = employee.rollno;
	};

	/* Private Methods */
	// HTTP GET- get all employees collection
	function refreshPageData() {
		$http({
			method : 'GET',
			url : 'http://192.168.0.11/mongo/rest/api/v1/dbs/local/employees/view'
		}).then(function successCallback(response) {
			$scope.employees = response.data;
		}, function errorCallback(response) {
			console.log(response.statusText);
		});
	}

	function handlesuccess(response) {
		$scope.employees = [];
		refreshPageData();
		clearForm()
	}

	function _error(response) {
		console.log(response.statusText);
	}

	// Clear the form
	function clearForm() {
		$scope.form.firstName = "";
		$scope.form.lastName = "";
		$scope.form.email = "";
		$scope.form._id = -1;
		$scope.form.rollno = "";
	}
	

	// Now load the data from server
	refreshPageData();
});