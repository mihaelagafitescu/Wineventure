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
            'Wineventure warns you that Sparkling wine is a common trigger for migraines, if consumed in bigger quantities.'
        ];
        site.whiteWineSuggestions = [
            'Wineventure suggests you White wine for keeping your lung tissues healthy.',
            'If you partied all night long, Wineventure suggests you White wine, since it prevents nausea, the feelings of irritation and anger caused by a hangover.',
            'Wineventure warns you that White wine is the worst wine for your teeth, since it is the most acidic from wines.'
        ];

        site.randIndex = function (min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };

        site.removeBackslash = function (mystring) {
            mystring = mystring.replace('\\','');
            return mystring;
        };


        //for search from the topbar with keyword
        site.search = function () {
            var url = 'http://192.168.0.102:7001/wineventure/api/v1/wines';
            url = url + '/search/?key=' + site.keyword;
            //alert(url);

            $http.get(url).success(function (data) {
                var results = data;
                site.wines = results;
            }).error(function (error, code) {
                alert("Eroarea " + error + " cu statusul: " + code);
            });

            site.displayResults = true;
            site.find = null;
        };

        //for search from the Find Info section with constraints
        site.findInfo = function () {
            var url = 'http://192.168.0.102:7001/wineventure/api/v1/wines';

            $http.post(url, site.find).success(function (data) {
                // alert(data.id);
                var results = data;
                site.wines = results;
            }).error(function (error, code) {
                alert("Eroarea " + error + " cu statusul: " + code);
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