var bodyApp = angular.module('bodyApp', ['ui.router', 'toastr', 'ngMaterial', 'ui.utils.masks', 'ngMask']);

bodyApp.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/alunos');

    $stateProvider
    // HOME STATES AND NESTED VIEWS ========================================
        .state('alunos', {
            url: '/alunos',
            templateUrl: 'pages/alunos.html',
            controller: 'alunoController'
        })
        .state('exercicios', {
            url: '/exercicios',
            templateUrl: 'pages/exercicios.html',
            controller: 'exercicioController'
        })
        .state('musculacao', {
            url: '/musculacao',
            templateUrl: 'pages/musculacao.html',
            controller: 'musculacaoController'
        })
});

bodyApp.controller("parentController", function ($scope, toastr, $state) {

    $scope.listarAlunos = function() {
        $state.go('alunos');
    }

    $scope.matricula = function () {
        alert('matricula');
    }

    $scope.musculacao = function () {
        $state.go('musculacao');
    }

    $scope.pesquisar = function () {
        alert('pesquisar');
    }

    $scope.listarExercicios = function () {
        $state.go('exercicios');
    }
});