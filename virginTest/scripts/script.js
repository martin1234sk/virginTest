
    // GENERAL FUNCTIONS

    function hide (element){
        element.classList.add('hide')
    } 

    function show(element) {
        element.classList.remove('hide')
    }

    function fadeIn(element, opacity) {
        element.style.opacity = opacity
    }

    function fadeOut(element, opacity) {
        element.style.opacity = opacity
    }

    // test 

    const questionsArray = [
        {
            question: 'Mal si niekedy sex?',
            virginityPercentage: 100
        },
        {
            question: 'Mal si niekedy oralny sex?',
            virginityPercentage: 20
        },
        {
            question: 'Bozkával si sa niekedy s niekym mimo rodiny?',
            virginityPercentage: 5
        },
        {
            question: 'Masturboval si niekedy s niekym?',
            virginityPercentage: 15
        },        
    ]

    const startTestCard = document.querySelector('.start-test')
    const questionCard = document.querySelector('.question-card')
    const question = document.querySelector('.question')
    let questionIndex = 0


    function startTest() {
        question.innerHTML = questionsArray[questionIndex].question
        startTestCard.style.animation = 'slide-up .5s ease-in forwards'
        fadeOut(startTestCard, 0)

        setTimeout(()=>{
            hide(startTestCard)
            show(questionCard)
            questionCard.style.animation = 'slide-down .5s ease-in forwards'
            fadeIn(questionCard, 1)
        }, 500)
    }

    const checkBoxes = document.querySelectorAll('.answer-check')
    let positiveResponse = false

    function checkAnswer(clickedCheck) {
        checkBoxes.forEach(checkBox=>{
            if(checkBox.classList.contains('checked')){
                checkBox.classList.remove('checked')
            }
        })

        clickedCheck.classList.add('checked')

        if(clickedCheck.classList.contains('yes')){
            positiveResponse = true
        } else{
            positiveResponse = false
        }

    }

    const errorAlert = document.querySelector('.error-alert')
    const questionControls = document.querySelectorAll('.question-control')
    const nextQuestionControl = document.getElementById('next-question')
    const endTestBtn = document.getElementById('end-test')


    function nextQuestion() {

        let checked = false
        checkBoxes.forEach(checkbox=>{
            if(checkbox.classList.contains('checked')){
                checked = true
                return
            } 
        })

        if(checked == false){
            show(errorAlert)
            return
        } 
        if(!errorAlert.classList.contains('hide')){
            hide(errorAlert)
        }
        
        if(questionIndex == 2){
            questionControls.forEach(control=>{
                hide(control)
            })
            show(endTestBtn)
        } 

        questionIndex++
        question.innerHTML = questionsArray[questionIndex].question
        checkBoxes.forEach(checkbox=>{
            checkbox.classList.remove('checked')
        })
    }
   
    let virginityPercentage = 100

    function calculatePercentage(){
        if(virginityPercentage == 0){
            return 
        }
        if(positiveResponse == true){
            virginityPercentage = virginityPercentage - questionsArray[questionIndex].virginityPercentage
        }
   }

   const resultCard = document.querySelector('.result-card')
   const virginityLevelElement = document.getElementById('viriginity-level')

   function endTest() {
        let checked = false
        checkBoxes.forEach(checkbox=>{
            if(checkbox.classList.contains('checked')){
                checked = true
                return
            } 
        })

        if(checked == false){
            show(errorAlert)
            return
        } 
        if(!errorAlert.classList.contains('hide')){
            hide(errorAlert)
        }
        virginityLevelElement.innerHTML = virginityPercentage
        questionCard.style.animation = 'slide-up .5s ease-in forwards'
        fadeOut(questionCard, 0)

        setTimeout(()=>{
            hide(questionCard)
            show(resultCard)
            resultCard.style.animation = 'slide-down .5s ease-in forwards'
            fadeIn(resultCard, 1)
        }, 500)
   }

   function startAgain() {
        fadeOut(resultCard, 0)
        setTimeout(()=>{
            hide(resultCard)
            show(startTestCard)
            fadeIn(startTestCard, 1)
        },500)

        virginityPercentage = 100
        questionIndex = 0

        checkBoxes.forEach(checkbox=>{
            checkbox.classList.remove('checked')
        })
        show(nextQuestionControl)
        hide(endTestBtn)
   }
   