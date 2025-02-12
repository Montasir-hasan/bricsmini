// Constants
const TASK_COMPLETED_FLAG = 'true';
const BALANCE_KEY = 'balance';

// Initialize balance
let balance = parseInt(localStorage.getItem(BALANCE_KEY)) || 0;

// Function to complete a task
function completeTask(reward, taskUrl) {
    if (isTaskCompleted(taskUrl)) {
        alert('You have already completed this task.');
        return;
    }

    // Update balance
    updateBalance(reward);

    // Mark task as completed
    markTaskAsCompleted(taskUrl);

    // Open task URL in a new tab
    openTaskUrl(taskUrl);
}

// Check if a task is already completed
function isTaskCompleted(taskUrl) {
    return localStorage.getItem(taskUrl) === TASK_COMPLETED_FLAG;
}

// Update balance and save to localStorage
function updateBalance(reward) {
    balance += reward;
    localStorage.setItem(BALANCE_KEY, balance);
    document.getElementById('balance').textContent = balance;
}

// Mark a task as completed in localStorage
function markTaskAsCompleted(taskUrl) {
    localStorage.setItem(taskUrl, TASK_COMPLETED_FLAG);
}

// Open task URL in a new tab
function openTaskUrl(taskUrl) {
    window.open(taskUrl, '_blank');
}

// Initialize balance display on page load
function initializeBalance() {
    document.getElementById('balance').textContent = balance;
}

// Initialize the balance display when the page loads
initializeBalance();
