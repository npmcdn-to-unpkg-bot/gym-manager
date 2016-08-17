/**
 * Created by bruno.rossini on 09/08/2016.
 */
bodyApp.controller('musculacaoController', function ($scope, $http, $state, $stateParams, toastr) {

    $scope.ficha = null;

    $scope.cancelar = function () {
        $state.go('alunos');
    }

    var url = 'http://localhost:8080/users/';
    var urlExercicios = 'http://localhost:8080/exercises/';

    function getAluno() {
        $http.get(url+$stateParams.id)
            .then(function(response) {
                $scope.aluno = response.data;
            }, function(err) {
                toastr.error('', 'Erro ao conectar ao servidor!');
            });
    }

    getAluno();

    function listarExercicios() {
        $http.get(urlExercicios)
            .then(function(response) {
                $scope.exercicios = response.data;
                listar();
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
                    var exercicio = {};
                    angular.copy($scope.exercicio, exercicio);

                    var erro = false;
                    for(var x=0; x<$scope.tabs[i].exercicios.length; x++) {
                        if(exercicio._id == $scope.tabs[i].exercicios[x]._id)
                            erro = true;
                    }

                    if(!erro)
                        $scope.tabs[i].exercicios.push(exercicio);
                    else
                        toastr.error('', 'Exercício já adicionado!');
                }
            }
        }
    }

    $scope.removerExercicio = function (exerc) {
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

    var urlSerie = 'http://localhost:8080/series';

    $scope.salvarSerie = function () {
        var obj = {};
        obj.aluno = $scope.aluno._id;
        obj.series = [];
        for(var i=0; i<$scope.tabs.length; i++) {
            var serie = {};
            serie.nome = $scope.tabs[i].nome;
            serie.exercicios = [];
            for(var x=0; x<$scope.tabs[i].exercicios.length; x++) {
                var exercicio = {};
                exercicio.exercicio = $scope.tabs[i].exercicios[x]._id;
                exercicio.peso = $scope.tabs[i].exercicios[x].peso;
                exercicio.intensidade = $scope.tabs[i].exercicios[x].intensidade;
                exercicio.repeticoes = $scope.tabs[i].exercicios[x].repeticoes;
                exercicio.series = $scope.tabs[i].exercicios[x].series;
                serie.exercicios.push(exercicio);
            }
            obj.series.push(serie);
        }

        if($scope.ficha == null) {
            $http.post(urlSerie, obj)
                .then(function(response) {
                    toastr.success('', 'Ficha salva com sucesso!');
                    $state.go('alunos');
                }, function(err) {
                    toastr.error('', 'Erro ao conectar ao servidor!');
                });
        } else {
            obj._id = $scope.ficha;
            $http.put(urlSerie, obj)
                .then(function(response) {
                    toastr.success('', 'Ficha salva com sucesso!');
                    $state.go('alunos');
                }, function(err) {
                    toastr.error('', 'Erro ao conectar ao servidor!');
                });
        }

    }

    function listar() {
        $http.get(urlSerie+'/find/'+$stateParams.id)
            .then(function(response) {
                    var obj = response.data;
                    $scope.ficha = obj._id;

                    for(var i=0; i<obj.series.length; i++) {
                        var tab = {};
                        tab.exercicios = [];
                        tab.nome = obj.series[i].nome;
                        for(var x=0; x<obj.series[i].exercicios.length; x++) {
                            for(var y=0; y<$scope.exercicios.length; y++) {
                                if($scope.exercicios[y]._id == obj.series[i].exercicios[x].exercicio) {
                                    var exercicio = {};
                                    angular.copy($scope.exercicios[y], exercicio);
                                    exercicio.peso = obj.series[i].exercicios[x].peso;
                                    exercicio.intensidade = obj.series[i].exercicios[x].intensidade;
                                    exercicio.repeticoes = obj.series[i].exercicios[x].repeticoes;
                                    exercicio.series = obj.series[i].exercicios[x].series;
                                    tab.exercicios.push(exercicio);
                                }
                            }
                        }
                        $scope.tabs.push(tab);
                    }

            }, function(err) {
                console.log(err);
            });
    }

});