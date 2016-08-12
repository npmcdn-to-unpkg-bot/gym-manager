/**
 * Created by bruno.rossini on 09/08/2016.
 */
bodyApp.controller('musculacaoController', function ($scope, $http, $state, $stateParams, toastr) {

    $scope.cancelar = function () {
        $state.go('alunos');
    }

    var url = 'http://localhost:8080/users/';
    var urlExercicios = 'http://localhost:8080/exercises/';

    function getAluno() {
        $http.get(url+$stateParams.id)
            .then(function(response) {
                $scope.aluno = response.data;
                console.log($scope.aluno);
            }, function(err) {
                toastr.error('', 'Erro ao conectar ao servidor!');
            });
    }

    getAluno();

    function listarExercicios() {
        $http.get(urlExercicios)
            .then(function(response) {
                $scope.exercicios = response.data;
            }, function(err) {
                toastr.error('', 'Erro ao conectar ao servidor!');
            });
    }

    listarExercicios();

    $scope.tabs = [];
    var ordem = [
        {nome:'A', exercicios:[]},
        {nome:'B', exercicios:[]},
        {nome:'C', exercicios:[]},
        {nome:'D', exercicios:[]},
        {nome:'E', exercicios:[]},
        {nome:'F', exercicios:[]},
        {nome:'G', exercicios:[]},
        {nome:'H', exercicios:[]}
    ]
    $scope.adicionarSerie = function () {
        if($scope.tabs.length < 8) {
            $scope.tabs.push(ordem[$scope.tabs.length]);
        } else {
            toastr.error('', 'Número máximo de séries!');
        }
    }

    $scope.tabActive = null;
    $scope.onTabChanges = function (tab) {
        $scope.tabActive = tab;
        console.log(tab);
    }

    $scope.adicionarExercicio = function () {
        if($scope.tabs.length == 1) {
            $scope.tabs[0].exercicios.push($scope.exercicio);
        } else {
            for(var i=0; i<$scope.tabs.length; i++) {
                if($scope.tabs[i].nome == $scope.tabActive.nome) {
                    console.log($scope.tabs[i]);
                    
                    $scope.tabs[i].exercicios.push($scope.exercicio);
                }
            }
        }
    }

    $scope.removerExercicio = function (exerc) {
        console.log(exerc);
        if($scope.tabs.length == 1) {
            for (var x = 0; x < $scope.tabs[0].exercicios.length; x++) {
                if ($scope.tabs[0].exercicios[x].nome == exerc.nome) {
                    $scope.tabs[0].exercicios.splice(x, 1);
                }
            }
        } else {
            for (var i = 0; i < $scope.tabs.length; i++) {
                if($scope.tabs[i].nome == $scope.tabActive.nome) {
                    for (var x = 0; x < $scope.tabs[i].exercicios.length; x++) {
                        if ($scope.tabs[i].exercicios[x].nome == exerc.nome) {
                            $scope.tabs[i].exercicios.splice(x, 1);
                        }
                    }
                }
            }
        }
    }
});