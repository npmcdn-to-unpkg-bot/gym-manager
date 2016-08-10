/**
 * Created by Nice on 14/07/2016.
 */
bodyApp.controller('exercicioController', function($scope, toastr, $http) {

    $scope.exercicios = [];
    var url = 'http://localhost:8080/exercises/';

    $scope.showIncluir = function() {
        $("#modalIncluir").modal('show');
    }

    $scope.salvarExercicio = function () {
        if($scope.exercicio._id != null) {
            $http.put(url, $scope.exercicio)
                .then(function(response) {
                    $scope.exercicios = response.data;
                    listar();
                }, function(err) {
                    toastr.error('', 'Erro ao conectar ao servidor!');
                });
            $("#modalIncluir").modal('hide');
            toastr.success('', 'Exercício editado com sucesso!');
            $scope.exercicio = {};
        } else {
            $http.post(url, $scope.exercicio)
                .then(function(response) {
                    $scope.exercicios = response.data;
                    listar();
                }, function(err) {
                    toastr.error('', 'Erro ao conectar ao servidor!');
                });
            $("#modalIncluir").modal('hide');
            toastr.success('', 'Exercício cadastrado com sucesso!');
            $scope.exercicio = {};
        }
    }

    $scope.cancelarExercicio = function () {
        $scope.exercicio = {};
        $("#modalIncluir").modal('hide');
        toastr.error('', 'Registro cancelado!');
    }

    $scope.editarExercicio = function (exercicio) {
        $scope.exercicio = exercicio;
        $("#modalIncluir").modal('show');
    }

    function listar() {
        $http.get(url)
            .then(function(response) {
                $scope.exercicios = response.data;
            }, function(err) {
                toastr.error('', 'Erro ao conectar ao servidor!');
            });
    }

    listar();
});