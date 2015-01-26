(function () {
    var app = angular.module('winesite', ["ui.bootstrap.modal"]);


    app.controller('SiteController', function ($http, $scope) {
        var site = this;
        site.tab = 1;
        site.showDetails =  false;
        site.wines = [];
        site.opinions = [];

        //for search
        site.search = function (){
            $http.get('freebase.json').success(function (data) {
                var results = data;
                site.wines = results;
            }).error(function (error, status) {
                alert("Eroarea " + error + " cu statusul: " + status)
            });
            site.setTab(3);
        };

        $scope.goToFindInfo = function(){
            site.setTab(2);
        }

        //for tabs
        site.isSet = function (checkTab) {
            return this.tab === checkTab;
        };

        site.setTab = function (activeTab) {
            this.tab = activeTab;
        };

        //pentru detalii
        $scope.open = function(wine) {
            $scope.showModal = true;
            $scope.wine = wine;
        };
     /*   $scope.ok = function() {
            $scope.showModal = false;
        };*/
        $scope.cancel = function() {
            $scope.showModal = false;
        };
    });



    /*app.controller('tabController', function () {
        this.tab = 1;

         this.isSet = function (checkTab) {
            return this.tab === checkTab;
         };

        this.setTab = function (activeTab) {
            this.tab = activeTab;
        };
    });
*/

    app.controller('contactController', function () {
        this.contact = {};

        this.addOpinion = function (opinions) {
            opinions.push(this.contact);

            this.contact = {};
        };
    });


    app.directive("welcome", function () {
        return {
            restrict: 'E',
            templateUrl: "welcome.html"
        };
    });

    app.directive("query", function () {
        return {
            restrict: 'E',
            templateUrl: "query.html"
        };
    });

    app.directive("results", function () {
        return {
            restrict: 'E',
            templateUrl: "results.html"
        };
    });

    app.directive("contact", function () {
        return {
            restrict: 'E',
            templateUrl: "contact.html"
        };
    });

})();