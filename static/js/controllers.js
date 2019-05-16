
var ConsoleModule = angular.module('ConsoleModule', ['ngRoute']);

ConsoleModule.config(['$routeProvider', '$locationProvider','$sceDelegateProvider', '$httpProvider',
    function ($routeProvider, $locationProvider, $sceDelegateProvider, $httpProvider) {
    $routeProvider.when('/', {
        templateUrl: '/partials/Byzip.html',
        controller: 'wcontroller',
        controllerAs: 'wcontroller'
    });
}]);

ConsoleModule.controller('wcontroller', ['$scope', '$http', '$routeParams', '$timeout', '$sce',
    function($scope, $http, $routeParams, $timeout, $sce) {

    $scope.somemessage = "Some weather";
    $scope.zip1City = "";
    $scope.zip1Weather = "";
	
	var a,b,c,d;
	
	var map=new google.maps.Map(document.getElementById('googleMap'),{
		zoom:4,
		center:{lat:-36.8486,lng:174.7633}});
	
		
    $scope.zip = function(which) {

        var data = "";
        if(which === 1) {
            data = $scope.zip1m;
        } else if(which === 2) {
            data = $scope.zip2m;
        } else if(which === 3) {
            data = $scope.zip3m;
        } else if(which === 4) {
            data = $scope.zip4m;
        } 

        if(data.length >=4) {
            $http({
                method: "GET",
                url: '/api/v1/getWeather?zip=' + data
            }).then( function(response) {
            	var myLatLng=null;
            	
                if(which === 1) {
                    $scope.zip1City = response.data.city;
                    $scope.zip1Weather = response.data.weather;
                    myLatLng={lat:response.data.la,lng:response.data.lo};
                    
                    a=new google.maps.Marker({position:myLatLng,map:map});
                    
                    
                    /*var conn = new ActiveXObject("ADODB.Connection");
				var rs = new ActiveXObject("ADODB.Recordset"); 
                var connectionstring = "Driver={IBM DB2 ODBC DRIVER};Database=BLUDB;Hostname=dashdb-txn-sbox-yp-dal09-03.services.dal.bluemix.net;Port=50000;Protocol=TCPIP;Uid=scq49262;Pwd=Woaizhuying1995.;";  
				conn.open(connectionstring);  
                    var sql = " insert into Req values('Auckland','100000');";
                rs=conn.execute(sql);
                rs.close(); 
                conn.close();
                    */
                   var ibmdb = require('ibm_db');
                   ibmdb.open("DATABASE=BLUDB;HOSTNAME=	dashdb-txn-sbox-yp-dal09-03.services.dal.bluemix.net;UID=scq49262;PWD=Woaizhuying.;PORT=	dashdb-txn-sbox-yp-dal09-03.services.dal.bluemix.net;PROTOCOL=TCPIP", function (err,conn) {
  if (err) return console.log(err);
  
  conn.query("insert into Req values('Auckland','100000');", function (err, data) {
    if (err) console.log(err);
    else console.log(data);
 
    conn.close(function () {
      console.log('done');
    });
  });
});
                   
                } else if(which === 2) {
                    $scope.zip2City = response.data.city;
                    $scope.zip2Weather = response.data.weather;
                     myLatLng={lat:response.data.la,lng:response.data.lo};
                    
                    b=new google.maps.Marker({position:myLatLng,map:map});
                } else if(which === 3) {
                    $scope.zip3City = response.data.city;
                    $scope.zip3Weather = response.data.weather;
                     myLatLng={lat:response.data.la,lng:response.data.lo};
                    
                    c=new google.maps.Marker({position:myLatLng,map:map});
                } else if(which === 4) {
                    $scope.zip4City = response.data.city;
                    $scope.zip4Weather = response.data.weather;
                     myLatLng={lat:response.data.la,lng:response.data.lo};
                    
                    d=new google.maps.Marker({position:myLatLng,map:map});
                } 
                
                //sql part
				
            	
              
            });
        } else {
            if(which === 1) {
                    $scope.zip1City = "";
                    $scope.zip1Weather = "";
                } else if(which === 2) {
                    $scope.zip2City = "";
                    $scope.zip2Weather = "";
                } else if(which === 3) {
                    $scope.zip3City = "";
                    $scope.zip3Weather = "";
                } else if(which === 4) {
                    $scope.zip4City = "";
                    $scope.zip4Weather = "";
                } 
        }
    };
    
}]);