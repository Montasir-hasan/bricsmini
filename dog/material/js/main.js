const body = document.body;
const image = body.querySelector('#coin');
const h1 = body.querySelector('h1');
const powerElement = body.querySelector('#power');
const totalElement = body.querySelector('#total');
const progressElement = body.querySelector('.progress');
const qtyElements = document.querySelectorAll('[name="qty"]');
const totalDisplay = document.getElementById('totall');

// Helper functions for localStorage
const getLocalStorage = (key, defaultValue) => {
    const value = localStorage.getItem(key);
    return value !== null ? value : defaultValue;
};

const setLocalStorage = (key, value) => {
    localStorage.setItem(key, value);
};

// Initialize values
let coins = getLocalStorage('coins', '0');
let total = getLocalStorage('total', '500');
let power = getLocalStorage('power', '500');
let count = getLocalStorage('count', '1');

h1.textContent = Number(coins).toLocaleString();
totalElement.textContent = `/${total}`;
powerElement.textContent = power;

// Handle coin click
const handleCoinClick = (e) => {
    const { offsetX: x, offsetY: y } = e;

    // Vibrate device
    if (navigator.vibrate) navigator.vibrate(5);

    // Update coins and power
    updateCoinsAndPower();

    // Apply animation
    applyAnimation(x, y);

    // Update progress bar
    updateProgressBar();
};

const updateCoinsAndPower = () => {
    let coins = getLocalStorage('coins', '0');
    let power = getLocalStorage('power', '500');

    if (Number(power) > 0) {
        setLocalStorage('coins', `${Number(coins) + 1}`);
        h1.textContent = `${(Number(coins) + 1).toLocaleString()}`;

        setLocalStorage('power', `${Number(power) - 1}`);
        powerElement.textContent = `${Number(power) - 1}`;
    }
};

const applyAnimation = (x, y) => {
    if (x < 150 && y < 150) {
        image.style.transform = 'translate(-0.25rem, -0.25rem) skewY(-10deg) skewX(5deg)';
    } else if (x < 150 && y > 150) {
        image.style.transform = 'translate(-0.25rem, 0.25rem) skewY(-10deg) skewX(5deg)';
    } else if (x > 150 && y > 150) {
        image.style.transform = 'translate(0.25rem, 0.25rem) skewY(10deg) skewX(-5deg)';
    } else if (x > 150 && y < 150) {
        image.style.transform = 'translate(0.25rem, -0.25rem) skewY(10deg) skewX(-5deg)';
    }

    setTimeout(() => {
        image.style.transform = 'translate(0px, 0px)';
    }, 100);
};

const updateProgressBar = () => {
    const power = getLocalStorage('power', '500');
    const total = getLocalStorage('total', '500');
    const progressPercentage = (100 * power) / total;
    progressElement.style.width = `${progressPercentage}%`;
};

image.addEventListener('click', handleCoinClick);

// Update power every second
setInterval(() => {
    const count = getLocalStorage('count', '1');
    const power = getLocalStorage('power', '500');
    const total = getLocalStorage('total', '500');

    if (Number(total) > power) {
        const newPower = Number(power) + Number(count);
        setLocalStorage('power', `${newPower}`);
        powerElement.textContent = `${newPower}`;
        updateProgressBar();
    }
}, 1000);

// Update total when qty elements change
const updateTotal = () => {
    let total = 0;
    qtyElements.forEach((element) => {
        total += parseFloat(element.textContent) || 0;
    });
    totalDisplay.textContent = total;
};

const observer = new MutationObserver(updateTotal);
qtyElements.forEach((element) => {
    observer.observe(element, { characterData: true, subtree: true, childList: true });
});

updateTotal(); // Initial calculation
