var quizModule = angular.module("quiz_app", []);

quizModule.controller("quizShowController", ['$scope', 'QuizStorageService', '$timeout', '$http', function($scope, QuizStorageService, $timeout, $http){
        
        var qsc = this;
        
      	qsc.students = [
		{
			name: "Sarah Baker",
			numberCorrect: 0,
			numberOfQuestions: 0
		},
		{
			name: "Kendra Knowles",
			numberCorrect: 0,
			numberOfQuestions: 0
		},
		{
			name: "Sally Wright",
			numberCorrect: 0,
			numberOfQuestions: 0
		},
		{
			name: "Nancy Morales",
			numberCorrect: 0,
			numberOfQuestions: 0
		},
		{
			name: "Jalee Blackwell",
			numberCorrect: 0,
			numberOfQuestions: 0
		}
	];
        qsc.studentName = "";
        qsc.question = "";
        qsc.answer = "";
        qsc.showstudents = false;
        qsc.showquestions = false;
        qsc.answerChoice = "";
        qsc.message = "Display will be here:";
        qsc.showMessage = false;
        
        $http.get("questionable.txt")
            .then(function(response){
                qsc.message = response.data;
                qsc.questionArray = qsc.message.questions;
                
            });
        
        qsc.checkAnswer = function(){
            if(qsc.answerChoice == qsc.randomQuestion.answerText){
                qsc.randomStudent.numberCorrect++;
                qsc.message = "Good Job! You answered the question right!";
            }else{
                qsc.message = "Sorry, you'll have to try harder next time.";
                qsc.randomStudent.numberCorrect =+ 0;
            }
            qsc.showMessage = true;
            qsc.randomStudent.numberOfQuestions++;
            
            qsc.editStudents(qsc.randomStudent);
        };
        qsc.editStudents = function($index){
            
            
            var newStudent = {name: qsc.randomStudent.name, numberCorrect: qsc.randomStudent.numberCorrect, numberQuestions: qsc.randomStudent.numberOfQuestions
            };
            
            for(var i = 0; i < qsc.students.length; i++){
                if(qsc.randomStudent.name == qsc.students[i].name){
                    qsc.students.splice($index, 1, newStudent);
                    qsc.students[0].name="Respond!"
                    
                }
            }
       
            return QuizStorageService.setData('studentAnswer-storage', angular.toJson(qsc.students));
            
        };
        
        qsc.hideStudents = function(){
            qsc.showstudents = false;
        };
        
        qsc.showStudents = function(){
            qsc.showstudents = true;
        };
        
        qsc.showQuestions = function(){
            qsc.showquestions = true;
        };
        
        qsc.hideQuestions = function(){
            qsc.showquestions = false;
        };
            
        qsc.updatedStudent = function(){
            return QuizStorageService.getData('studentAnswer-storage');
        };
        
        qsc.studentUpdate = function(sName, numberCorrect, numberQuestions){
            if(qsc.students == null){
                qsc.students = [];
            }
            
            var student = {name: sName, numberCorrect: numberCorrect, numberOfQuestions: numberQuestions};
            
            
            qsc.students.push(student);
            return QuizStorageService.setData('studentAnswer-storage', angular.toJson(qsc.students));
        };
        
        qsc.removeStudent = function($index){
            qsc.students = qsc.updatedStudent();
            qsc.students.splice($index, 1);
            return QuizStorageService.setData('studentAnswer-storage', angular.toJson(qsc.students));
        };
      
      qsc.updateArray = function(){
            for (var i in qsc.students){
                if(qsc.students[i].name == qsc.randomStudent.name){
                    qsc.students[i].numberOfQuestions
                if(qsc.answerChoice == qsc.randomQuestion.answerText){
                    qsc.students[i].numberCorrect++
                    }
                    break;
                }
            }
        };
        qsc.chooseStudent = function(){
             qsc.randomStudent = qsc.students[Math.floor(Math.random() * qsc.students.length)];
        };
        
        qsc.chooseQuestion = function(){
            qsc.randomQuestion = qsc.questionArray[Math.floor(Math.random() * qsc.questionArray.length)];
            //$timeout( function(){ $scope.callAtTimeout(); }, 3000);
            $timeout(function(){qsc.chooseAnswer(); }, 1000);
            
        };
        
        qsc.chooseAnswer = function(){
            qsc.randomAnswer = qsc.randomQuestion.answerText;
            
        };
        
        qsc.start = function(){
            
            qsc.chooseStudent();
            qsc.chooseQuestion();
        };
        
        
        
                            
}]);

quizModule.factory("QuizStorageService", function($window, $rootScope){
    
    angular.element($window).on('storage', function($window, $rootScope){
        if(event.key === 'studentAnswer-storage'){
            $rootScope.$apply();
        }
        if(event.key === 'question-storage'){
            $rootScope.$apply();
        }
    });
    
    return {
        setData: function(key, val){
            $window.localStorage && $window.localStorage.setItem(key, val);
            return this;
        },
        getData: function(key){
            
            var val = $window.localStorage && $window.localStorage.getItem(key);
            
            var data = angular.fromJson(val);
            
            return data;
        }
    };
});