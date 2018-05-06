function  show($scope,$http) {

    var refresh = function (){
    $http.get('/contact').success(function (response) {

        $scope.contact = response;
        $scope.cont=""
    });
};
    refresh();
    $scope.addcontact = function () {

        $http.post('/contact',$scope.cont).success(function (response) {
            refresh();
        })
    };
 $scope.remove=function (id) {
     $http.delete('/contact/'+id).success(function (response) {
         refresh();
     });

 };
 $scope.edit=function (id) {
     $http.get('/contact/' + id).success(function (response) {
         $scope.cont=response;

     });
 };
    $scope.update=function () {
        $http.put('/contact/'+$scope.cont._id,$scope.cont).success(function () {

            refresh()
        })


    };

}