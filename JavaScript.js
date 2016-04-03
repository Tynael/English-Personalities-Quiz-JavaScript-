(function() {
  var questions = [{
    question: "Who formulated the law of Universal Gravitation?",
    choices: [" Charles Darwin", " Michael Faraday", " Stephen Hawking", " William Thomson Kelvin", " Isaac Newton"],
    correctAnswer: 4
  }, {
    question: "Who discovered the cell?",
    choices: [" Paul Dirac", " Robert Hooke", " Theodor Schwann", " Humprhy Davy", " Tim-Berners Lee"],
    correctAnswer: 1
  }, {
    question: "Who discovered the electromagnetic induction in the 18th century?",
    choices: [" Isaac Newton", " Michael Faraday", " J.J Thomson", " Francis Crick", " Roger Bacon"],
    correctAnswer: 1
  }, {
    question: "Who invented the wind map which is still used today in the field of meteorology?",
    choices: [" Rosaling Franklin", " Peter Higgs", " Ada Lovelace", " Edmond Halley", " Edward Jenner"],
    correctAnswer: 3
  }, {
    question: "Who was the first computer scientist in history?",
    choices: [" William Wallace", " Monica Grady", " Ada Lovelace", " Stephen Morgan", " Anakin Skywalker"],
    correctAsnwer: 2 
  }, {
    question: "Who theorized the idea which states that black holes emit radiation?",
    choices: [" Michael Faraday", " Stephen Hawking", " John Nash", " George Paul", " Emanuel Watt"],
    correctAnswer: 1
  }, {
    question: "Who formulated the idea of evolutionism?",
    choices: [" Francis Crick", " Paul Nurse", " Martin Reese", " Charles Darwin", " Nancy Rothwell" ],
    correctAnswer: 3
  } , {
    question: "Who invented the telephone?",
    choices: [" Andre Geim", " Jonathan Graham Bell", " Edmond Halley", " Eric Trist", " Maurice LaRouche"],
    correctAnswer: 1
  } , {
    question: "Who debunked the mystery of the rainbow?",
    choices: [" Nancy Rothwell", " Skittles", " Isaac Newton", " Carl Sagan", " Neil deGrasse Tyson"],
    correctAnswer: 2
  } , {
    question: "Who identified the gene <i>cdc2</i> in fission yeast?",
    choices: [" Brian May", " Leslie Chow", " Martin Lothar", " Paul Nurse", " Jonathan Graham Bell"],
    correctAnswer: 3
  
  }];
  // Tracks the question number
  var questionCounter = 0; 
  // Contains user's choices
  var selections = []; 
  // Quiz <div> object
  var quiz = $('#quiz'); 
  
  // Display initial question
  displayNext();
  
  // Click handler for the 'Next' button
  $('#next').on('click', function (e) {
    e.preventDefault();
    
    // Suspend click listener during fade animation
    if(quiz.is(':animated')) {        
      return false;
    }
    choose();
    
    // If no user selection, progress is stopped
    if (isNaN(selections[questionCounter])) {
      alert('Please choose an answer!');
    } else {
      questionCounter++;
      displayNext();
    }
  });
  
  // Click handler for the 'prev' button
  $('#prev').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    choose();
    questionCounter--;
    displayNext();
  });
  
  // Click handler for the 'Start Over' button
  $('#start').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    questionCounter = 0;
    selections = [];
    displayNext();
    $('#start').hide();
  });
  
  // Animates buttons on hover
  $('.button').on('mouseenter', function () {
    $(this).addClass('active');
  });
  $('.button').on('mouseleave', function () {
    $(this).removeClass('active');
  });
  
  // Creates and returns the div that contains the questions and 
  // the answer selections
  function createQuestionElement(index) {
    var qElement = $('<div>', {
      id: 'question'
    });
    
    var header = $('<h2>Question ' + (index + 1) + ':</h2>');
    qElement.append(header);
    
    var question = $('<p>').append(questions[index].question);
    qElement.append(question);
    
    var radioButtons = createRadios(index);
    qElement.append(radioButtons);
    
    return qElement;
  }
  
  // Creates a list of the answer choices as radio inputs
  function createRadios(index) {
    var radioList = $('<ul>');
    var item;
    var input = '';
    for (var i = 0; i < questions[index].choices.length; i++) {
      item = $('<li>');
      input = '<input type="radio" name="answer" value=' + i + ' />';
      input += questions[index].choices[i];
      item.append(input);
      radioList.append(item);
    }
    return radioList;
  }
  
  // Reads the user selection and pushes the value to an array
  function choose() {
    selections[questionCounter] = +$('input[name="answer"]:checked').val();
  }
  
  // Displays next requested element
  function displayNext() {
    quiz.fadeOut(function() {
      $('#question').remove();
      
      if(questionCounter < questions.length){
        var nextQuestion = createQuestionElement(questionCounter);
        quiz.append(nextQuestion).fadeIn();
        if (!(isNaN(selections[questionCounter]))) {
          $('input[value='+selections[questionCounter]+']').prop('checked', true);
        }
        
        // Controls display of 'prev' button
        if(questionCounter === 1){
          $('#prev').show();
        } else if(questionCounter === 0){
          
          $('#prev').hide();
          $('#next').show();
        }
      }else {
        var scoreElem = displayScore();
        quiz.append(scoreElem).fadeIn();
        $('#next').hide();
        $('#prev').hide();
        $('#start').show();
      }
    });
  }
  
  // Computes score and returns a paragraph element to be displayed
  function displayScore() {
    var score = $('<p>',{id: 'question'});
    
    var numCorrect = 0;
    for (var i = 0; i < selections.length; i++) {
      if (selections[i] === questions[i].correctAnswer) {
        numCorrect++;
      }
    }
    
    score.append('Congratulations! You answered correct to ' + numCorrect + ' questions out of ' +
                 questions.length) + " !";
    return score;
  }
})();