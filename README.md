# Quiz Show App

This app will choose random students to answer questions that are randomly read from a json file.

### Code

Getting the array to update was the most challenging part of this application this time.

```
qsc.updateArray = function(){
            for (var i in qsc.students){
                if(qsc.students[i].name == qsc.randomStudent.name){
                    qsc.students[i].numberOfQuestions
                if(qsc.answerChoice == qsc.randomQuestion.answerText){
                    qsc.students[i].numberCorrect++
                    }
```