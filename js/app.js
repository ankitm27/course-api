'use strict';

angular.module('myApp', [])
  .controller('mycontroller', function($scope, $http) {
   

  $scope.start=0;
  $scope.end=10;
  $scope.dropdown=false;

  
  $scope.pagination=function(val){
    console.log("val="+val);
    $scope.start=val*10-10;
    $scope.end=val*10;
    console.log($scope.start);
    console.log($scope.end);
  }

    $scope.fetch=function(event){
      $scope.dropdown=false;
      console.log($scope.searchval);
      if(event.which==13){
        $scope.fill($scope.searchval);
      }
      $http.get("https://api.coursera.org/api/courses.v1?q=search&query="+$scope.searchval).success(function(response) {
          $scope.details = response;
          console.log(response);
        })
      .error(function(err){
        console.log(err)
      });

      
    }


    $scope.enterval=function(){
      $scope.dropdown=true;
      
      var val=$scope.searchval;
      $http.get("https://api.coursera.org/api/courses.v1?q=search&query="+val+"&includes=instructorIds,partnerIds,photoUrl&fields=instructorIds,partnerIds,photoUrl").success(function(response) {
          $scope.courses = response;
          $scope.inst=[];
          $scope.prov=[];
           angular.forEach($scope.courses.elements, function ( item ) {
            var val=[];
            console.log("courses.....")
            angular.forEach(item.instructorIds, function ( item1 ) {
            $http.get("https://api.coursera.org/api/instructors.v1/"+item1).success(function(response){
                val.push(response.elements[0].fullName);
                
            })
            .error(function(err){

            });
            

           });
            var val2=[];
              angular.forEach(item.partnerIds, function ( item1 ) {
              
                 $http.get("https://api.coursera.org/api/partners.v1/"+item1).success(function(response){
                val2.push(response.elements[0].name);
            })
            .error(function(err){

            });
            

           });

              $scope.prov.push(val2)
            $scope.inst.push(val);
          });
        })
      .error(function(err){
        console.log(err)
      });
      console.log($scope.inst);
    }


    $scope.fill=function(val){
      $scope.dropdown=true;
      console.log("working="+val);
      $scope.searchval=val;
      $http.get("https://api.coursera.org/api/courses.v1?q=search&query="+val+"&includes=instructorIds,partnerIds,photoUrl&fields=instructorIds,partnerIds,photoUrl").success(function(response) {
          $scope.courses = response;
          $scope.inst=[];
          $scope.prov=[];
           angular.forEach($scope.courses.elements, function ( item ) {
            var val=[];
            console.log("courses.....")
            angular.forEach(item.instructorIds, function ( item1 ) {
            $http.get("https://api.coursera.org/api/instructors.v1/"+item1).success(function(response){
                val.push(response.elements[0].fullName);
                
            })
            .error(function(err){

            });
            

           });
            var val2=[];
              angular.forEach(item.partnerIds, function ( item1 ) {
              
                 $http.get("https://api.coursera.org/api/partners.v1/"+item1).success(function(response){
                val2.push(response.elements[0].name);
            })
            .error(function(err){

            });
            

           });

              $scope.prov.push(val2)
            $scope.inst.push(val);
          });
        })
      .error(function(err){
        console.log(err)
      });
      console.log($scope.inst);
    }
  })
  .filter('slice', function() {
  return function(arr, start, end) {
    return (arr || []).slice(start, end);
  };
});