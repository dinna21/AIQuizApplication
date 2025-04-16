import { generateQuestions } from './api.js';

document.addEventListener('DOMContentLoaded', () => {
    // Show/hide custom topic field
    const categorySelect = document.getElementById('category');
    const customTopicInput = document.getElementById('custom-topic');
    
    categorySelect.addEventListener('change', () => {
        customTopicInput.style.display = 
            categorySelect.value === 'custom' ? 'block' : 'none';
    });
    
    // Start quiz button
    const startButton = document.getElementById('start-quiz');
    startButton.addEventListener('click', async () => {
        const category = categorySelect.value === 'custom' 
            ? customTopicInput.value.trim() 
            : categorySelect.value;
        const count = parseInt(document.getElementById('question-count').value);
        const difficulty = document.getElementById('difficulty').value;
        
        if (!category || isNaN(count) || count < 1 || count > 10) {
            alert('Please enter valid inputs');
            return;
        }
        
        startButton.disabled = true;
        startButton.textContent = 'Generating...';
        
        try {
            const questions = await generateQuestions(category, count, difficulty);
            
            // Store questions and quiz settings in session storage
            sessionStorage.setItem('quizQuestions', JSON.stringify(questions));
            sessionStorage.setItem('quizSettings', JSON.stringify({
                category,
                count,
                difficulty
            }));
            
            // Redirect to quiz page
            window.location.href = 'quiz.html';
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to generate quiz. Please try again.');
        } finally {
            startButton.disabled = false;
            startButton.textContent = 'Generate Quiz';
        }
    });
});