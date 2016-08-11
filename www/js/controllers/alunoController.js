bodyApp.controller('alunoController', function($scope, toastr, $http, $state) {
    $scope.typeView = 'list';
    $scope.alunos = [];
    $scope.alunoSelecionado = {};

    var url = 'http://localhost:8080/users/';
    $scope.salvar = function() {

        new Date()
        $http.post(url, $scope.aluno)
            .then(function(response) {
                $scope.aluno = {};
                listar();
                $scope.typeView = 'list';
                toastr.success('', 'Aluno matrículado com sucesso!');
            }, function(err) {
                toastr.error('', 'Erro ao cadastrar aluno!');
            });
    }

    $scope.cancelar = function() {
        $scope.aluno = {};
        $scope.typeView = 'list';
        toastr.error('', 'Registro cancelado!');
    }

    function listar() {
        $http.get(url)
            .then(function(response) {
                $scope.alunos = response.data;
            }, function(err) {
                toastr.error('', 'Erro ao conectar ao servidor!');
            });
    }
    listar();

    //TODO: FALTA FAZER
    $scope.selecionarAluno = function (aluno) {
        if($scope.alunoSelecionado._id != null && aluno._id == $scope.alunoSelecionado._id)
            $scope.alunoSelecionado = {};
        else
            angular.copy(aluno, $scope.alunoSelecionado);
    }

    $scope.musculacao = function () {
        $state.go('musculacao', {id: $scope.alunoSelecionado._id});
    }
});