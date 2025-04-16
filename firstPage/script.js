// Show/hide custom topic input based on category selection
document.getElementById('category').addEventListener('change', (e) => {
    const customTopicInput = document.getElementById('custom-topic');
    customTopicInput.style.display = e.target.value === 'custom' ? 'block' : 'none';
});

document.getElementById('start-quiz').addEventListener('click', () => {
    const category = document.getElementById('category').value;
    const customTopic = document.getElementById('custom-topic').value;
    let questionCount = parseInt(document.getElementById('question-count').value);
    const difficulty = document.getElementById('difficulty').value;

    // Validate question count
    questionCount = Math.min(10, Math.max(1, questionCount)); // Ensure between 1-10

    let selectedTopic = category;
    if (category === 'custom') {
        selectedTopic = customTopic.trim();
        if (!selectedTopic) {
            alert('Please enter a custom topic');
            return;
        }
    }

    // Build query string
    const queryParams = new URLSearchParams({
        topic: selectedTopic,
        count: questionCount,
        difficulty: difficulty
    });

    // Redirect to quiz page
    window.location.href = `../secondPage/quiz.html?${queryParams.toString()}`;
});