document.addEventListener('DOMContentLoaded', () => {
    const results = JSON.parse(sessionStorage.getItem('quizResults'));
    
    if (!results) {
        alert('No results found. Please take a quiz first.');
        window.location.href = 'index.html';
        return;
    }
    
    // DOM elements
    const scoreSpan = document.getElementById('score');
    const totalSpan = document.getElementById('total');
    const scoreMessage = document.getElementById('score-message');
    const resultsContainer = document.getElementById('results');
    const newQuizBtn = document.getElementById('new-quiz');
    
    // Display score
    scoreSpan.textContent = results.score;
    totalSpan.textContent = results.total;
    
    // Score message
    const percentage = (results.score / results.total) * 100;
    let message = '';
    if (percentage >= 80) message = 'Excellent work!';
    else if (percentage >= 60) message = 'Good job!';
    else if (percentage >= 40) message = 'Not bad!';
    else message = 'Keep practicing!';
    scoreMessage.textContent = message;
    
    // Display each question result
    results.questions.forEach((question, index) => {
        const userAnswer = results.userAnswers[index];
        const isCorrect = userAnswer === question.answer;
        
        const questionElement = document.createElement('div');
        questionElement.className = `question-result ${isCorrect ? 'correct' : 'incorrect'}`;
        
        questionElement.innerHTML = `
            <h3>Question ${index + 1}: ${question.question}</h3>
            <p>Your answer: ${userAnswer || 'Not answered'}</p>
            <p>Correct answer: ${question.answer}</p>
            <p class="explanation">Explanation: ${question.explanation}</p>
        `;
        
        resultsContainer.appendChild(questionElement);
    });
    
    // New quiz button
    newQuizBtn.addEventListener('click', () => {
        window.location.href = 'index.html';
    });
});