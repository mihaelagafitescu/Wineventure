(function () {

    var app = angular.module('winesite', ["ui.bootstrap.modal"]);


    app.controller('SiteController', function ($http, $scope) {
        var site = this;
        site.tab = 1;
        site.showDetails = false;
        site.wines = [];
        site.displayResults = false;

        site.redWineSuggestions = ['aa',
            'bb',
            'cc',
            'dd'
        ];
        site.sparklingWineSuggestions = [
            'bb',
            'cc'
        ];
        site.whiteWineSuggestions = [
            'bb',
            'cc'
        ];

        site.randIndex = function (min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        //for search from the topbar with keyword
        site.search = function () {
            //alert(site.keyword);
            var url = '';
            url = url + '/?search=' + site.keyword;
         //   alert(url);

            $http.get('freebaseK.json').success(function (data) {
                var results = data;
                site.wines = results;
            }).error(function (error, status) {
                alert("Eroarea " + error + " cu statusul: " + status)
            });
            site.displayResults = true;
            site.find = null;
        };

        //for search from the Find Info section with constraints
        site.findInfo = function () {
            var url = '';
            url = url + '/?name=' + site.find.name +
                    '&country=' + site.find.country +
                    '&region=' + site.find.region +
                    '&wine_producer=' + site.find.wine_producer +
                    '&vineyard=' + site.find.vineyard +
                    '&vintage=' + site.find.vintage +
                    '&percentage_alcohol=' + site.find.percentage_alcohol +
                    '&color=' + site.find.color +
                    '&wine_type=' + site.find.wine_type +
                    '&fruit_source=' + site.find.fruit_source;
            //alert(site.find.name + " " + site.find.vintage + " " + site.find.color);

            // $http.post('/wines',site.find)

            $http.get('freebase.json').success(function (data) {
                var results = data;
                site.wines = results;
            }).error(function (error, status) {
                alert("Eroarea " + error + " cu statusul: " + status)
            });
            site.displayResults = true;
            site.keyword = null;
        };

        //for tabs
        site.isSet = function (checkTab) {
            return this.tab === checkTab;
        };

        site.setTab = function (activeTab) {
            this.tab = activeTab;
        };

        //for details
        $scope.open = function (wine) {
            $scope.showModal = true;
            $scope.wine = wine;
        };
        /*   $scope.ok = function() {
         $scope.showModal = false;
         };*/
        $scope.cancel = function () {
            $scope.showModal = false;
        };



    });



    /*app.directive("welcome", function () {
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
    });*/




})();