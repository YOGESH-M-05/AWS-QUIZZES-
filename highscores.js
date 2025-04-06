const highscoreList = document.getElementById('highscore-list');
let highScores = JSON.parse(localStorage.getItem('highScores')) || [];

// Display High Scores
function displayHighScores() {
    if (highScores.length === 0) {
        highscoreList.innerHTML = '<li class="no-score">No scores yet!</li>';
        return;
    }

    highscoreList.innerHTML = highScores
        .sort((a, b) => b.score - a.score) // Sort scores in descending order
        .slice(0, 5) // Show only top 5 scores
        .map((score, index) => 
            `<li class="high-score">
                <span class="rank">#${index + 1}</span> 
                <span class="name">${score.name}</span> 
                <span class="score">${score.score}</span>
            </li>`
        )
        .join('');
}

// Save New Score
function saveScore(name, score) {
    const newScore = { name, score };
    highScores.push(newScore);
    highScores.sort((a, b) => b.score - a.score); // Sort in descending order
    highScores = highScores.slice(0, 5); // Keep only top 5 scores
    localStorage.setItem('highScores', JSON.stringify(highScores)); // Save to localStorage
    displayHighScores(); // Update UI immediately
}

// Clear High Scores
document.getElementById('clear-scores')?.addEventListener('click', () => {
    localStorage.removeItem('highScores');
    highScores = []; // Reset array
    displayHighScores();
    location.reload(); // Force refresh to show changes
});

// Call the function to display existing scores
displayHighScores();
