document.addEventListener('DOMContentLoaded', () => {
    const questions = JSON.parse(sessionStorage.getItem('quizQuestions'));
    const settings = JSON.parse(sessionStorage.getItem('quizSettings'));
    
    if (!questions || !settings) {
        alert('No quiz data found. Please start a new quiz.');
        window.location.href = 'index.html';
        return;
    }
    
    // DOM elements
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const currentQuestionSpan = document.getElementById('current-question');
    const totalQuestionsSpan = document.getElementById('total-questions');
    const quizCategory = document.getElementById('quiz-category');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const submitBtn = document.getElementById('submit-btn');
    
    // Quiz state
    let currentQuestionIndex = 0;
    const userAnswers = new Array(questions.length).fill(null);
    
    // Initialize quiz
    quizCategory.textContent = `Quiz: ${settings.category}`;
    totalQuestionsSpan.textContent = questions.length;
    
    function showQuestion(index) {
        const question = questions[index];
        questionText.textContent = question.question;
        
        optionsContainer.innerHTML = '';
        question.options.forEach((option, i) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'option';
            if (userAnswers[index] === option) {
                optionElement.classList.add('selected');
            }
            optionElement.textContent = option;
            optionElement.addEventListener('click', () => selectOption(option, index));
            optionsContainer.appendChild(optionElement);
        });
        
        currentQuestionSpan.textContent = index + 1;
        prevBtn.disabled = index === 0;
        
        if (index === questions.length - 1) {
            nextBtn.style.display = 'none';
            submitBtn.style.display = 'inline-block';
        } else {
            nextBtn.style.display = 'inline-block';
            submitBtn.style.display = 'none';
        }
    }
    
    function selectOption(option, questionIndex) {
        userAnswers[questionIndex] = option;
        const options = document.querySelectorAll('.option');
        options.forEach(opt => {
            opt.classList.remove('selected');
            if (opt.textContent === option) {
                opt.classList.add('selected');
            }
        });
    }
    
    // Navigation
    prevBtn.addEventListener('click', () => {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            showQuestion(currentQuestionIndex);
        }
    });
    
    nextBtn.addEventListener('click', () => {
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            showQuestion(currentQuestionIndex);
        }
    });
    
    submitBtn.addEventListener('click', () => {
        // Calculate score
        let score = 0;
        questions.forEach((q, i) => {
            if (userAnswers[i] === q.answer) {
                score++;
            }
        });
        
        // Store results
        sessionStorage.setItem('quizResults', JSON.stringify({
            score,
            total: questions.length,
            userAnswers,
            questions
        }));
        
        // Redirect to results page
        window.location.href = 'results.html';
    });
    
    // Start with first question
    showQuestion(0);
});