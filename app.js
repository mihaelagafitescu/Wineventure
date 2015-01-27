(function () {
    var shufflemodule = angular.module('ShuffleModule', []);

    shufflemodule.filter('shuffle', function() {
        var shuffledArr = [],
            shuffledLength = 0;
        return function(arr) {
            var o = arr.slice(0, arr.length);
            if (shuffledLength == arr.length) return shuffledArr;
            for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
            shuffledArr = o;
            shuffledLength = o.length;
            return o;
        };
    });


    var app = angular.module('winesite', ["ui.bootstrap.modal", "ShuffleModule"]);


    app.controller('SiteController', function ($http, $scope) {
        var site = this;
        site.tab = 1;
        site.showDetails = false;
        site.wines = [];
        site.redWineSuggestions = ['aa', 'bb', 'cc', 'dd'];


        //for search from the topbar with keyword
        site.search = function () {
            //alert(site.keyword);
            var url = '';
            url = url + '/?search=' + site.keyword;
            alert(url);
            $http.get('freebaseK.json').success(function (data) {
                var results = data;
                site.wines = results;
            }).error(function (error, status) {
                alert("Eroarea " + error + " cu statusul: " + status)
            });
            site.setTab(3);
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
            $http.get('freebase.json').success(function (data) {
                var results = data;
                site.wines = results;
            }).error(function (error, status) {
                alert("Eroarea " + error + " cu statusul: " + status)
            });
            site.setTab(3);
            site.keyword = null;
        };

        $scope.goToFindInfo = function () {
            site.setTab(2);
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


    app.controller('contactController', function () {
        var contact = this;

        contact.addOpinion = function () {
            alert(contact.opinion.name);

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