app.controller('GameCtrl', ['$scope', 'levels', function GameCtrl($scope,levels) {
  $scope.levels = levels.levels

  $scope.score = 0;
  $scope.guesses = [];
  $scope.currentLevel = 0;
  $scope.domain = $scope.levels[$scope.currentLevel].domain;
  $scope.message = "";
  $scope.isCorrect = false;
  $scope.isPlaying = false;

  function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}




  $scope.correctAnswer = $scope.levels[$scope.currentLevel].answer.toLowerCase();
  $scope.keys = function() {
    a = 12;
    b = $scope.keys.length

    return shuffle($scope.correctAnswer.split(""));
  }


  $scope.clearBoard = function() {
    $scope.guesses = [];
    $scope.keys = shuffle($scope.correctAnswer.split(""));
    $scope.isPlaying = true;
  };





  function checkCorrect() {
    a = $scope.guesses.toString().replace(/,/g, '');
    b = $scope.correctAnswer.split("");
    var same = a.length == b.length,
      result,
      len;
    if (!same) {
      result = false
    } else {
      // so far, they're the same
      result = true;
      len = a.length;
      for (var i = 0; result !== false && i < len; i++) {
        if (a[i] !== b[i]) {
          result = false;
          $scope.message = "Sorry, Try Again";
        }
      }
    }

    $scope.isCorrect = result;
  }

  $scope.checkCorrect = checkCorrect;

  $scope.nextLevel = function() {
    $scope.currentLevel++;
    $scope.domain = $scope.levels[$scope.currentLevel].domain;
    $scope.correctAnswer = $scope.levels[$scope.currentLevel].answer.toLowerCase();
    $scope.clearBoard();
    $scope.isCorrect = false;
    $scope.score = $scope.score+ 10;
  };


  $scope.removeGuess = function(guess) {
    $scope.guesses.splice($scope.guesses.indexOf(guess), 1);
    $scope.keys.push(guess);
    $scope.checkCorrect();
  };

  $scope.addLetter = function(key) {
    $scope.guesses.push(key);
    $scope.keys.splice($scope.keys.indexOf(key), 1);
    $scope.checkCorrect();

  };


}]);
