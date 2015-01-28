(function () {

    var app = angular.module('winesite', ["ui.bootstrap.modal"]);


    app.controller('SiteController', function ($http, $scope) {
        var site = this;
        site.tab = 1;
        site.showDetails = false;
        site.wines = [];
        site.displayResults = false;

        site.redWineSuggestions = [
            'If you consume fat foods, Wineventure recommends you Red wine, since it can lower your cholesterol.',
            'Wineventure recommends you Red wine because prevents tooth decay by hardening your enamel.',
            'If you are fighting off a cold, Wineventure recommends you Red wine, because it contains antioxidants.',
            'Wineventure recommends you Red wine, which helps preventing damage to the blood vessels thanks to resveratrol (an ingredient found in the skin of red grapes).',
            'Wineventure recommends you Red wine, which helps keeping your memory sharp thanks to resveratrol (an ingredient found in the skin of red grapes).'
        ];
        site.sparklingWineSuggestions = [
            'If you are on a diet, Wineventure suggests you Sparkling wine, since it has fewer calories than red or white wine.',
            'If you partied all night long, Wineventure suggests you Sparkling wine, since it prevents nausea, the feelings of irritation and anger caused by a hangover.',
            'Wineventure warns you that Sparkling wine is a common trigger for migraines, if consumed in bigger quantities.'
        ];
        site.whiteWineSuggestions = [
            'Wineventure suggests you White wine for keeping your lung tissues healthy.',
            'Wineventure warns you that White wine is the worst wine for your teeth, since it is the most acidic from wines.'
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



    app.directive("header", function () {
        return {
            restrict: 'E',
            templateUrl: "header.html"
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



})();