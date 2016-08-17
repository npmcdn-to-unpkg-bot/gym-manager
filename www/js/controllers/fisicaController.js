/**
 * Created by bruno.rossini on 16/08/2016.
 */
bodyApp.controller('fisicaController', function ($http, $scope, $state, $stateParams) {

    $scope.cancelar = function () {
        $state.go('alunos');
    }

    var url = 'http://localhost:8080/users/';
    var urlAntopometria = 'http://localhost:8080/antopometria/';

    function getAluno() {
        $http.get(url+$stateParams.id)
            .then(function(response) {
                $scope.aluno = response.data;
            }, function(err) {
                toastr.error('', 'Erro ao conectar ao servidor!');
            });
    }

    getAluno();

});