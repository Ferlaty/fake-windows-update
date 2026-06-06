const startBtn = document.getElementById('start-btn');
const launcher = document.getElementById('launcher');
const updateScreen = document.getElementById('update-screen');
const percentText = document.getElementById('percent');

// Get the value of the checkboxes and slider
const StartPercentInput = document.getElementById('startPercent');
const updateLengthSlider = document.getElementById('updateLength');
const ESC_btnInput = document.getElementById('ESC_btn');
const mouseInput = document.getElementById('mouse');
const fbtnsInput = document.getElementById('fbtns');

// 1. Activate Full Screen & Freeze Controls
startBtn.addEventListener('click', async () => {
    try {
        // Request modern full screen
        await document.documentElement.requestFullscreen();

        // Trap the cursor using Pointer Lock API
        document.documentElement.requestPointerLock();

        // Engage Escape Key Hold Modification (Chromium)
        if (ESC_btnInput.checked) {
            if (navigator.keyboard && typeof navigator.keyboard.lock === 'function') {
                await navigator.keyboard.lock(['Escape']);
            }
        }

        // Swap out interfaces
        launcher.style.display = 'none';
        updateScreen.style.display = 'flex';

        if (mouseInput.checked) {
            document.addEventListener('click', block, true);
            document.addEventListener('mousedown', block, true);
            document.addEventListener('mouseup', block, true);
            document.addEventListener('contextmenu', block, true);
            document.addEventListener('selectstart', block, true);
            document.addEventListener('wheel', block, { passive: false });
        }

        // Block common refresh/window modification commands
        if (fbtnsInput.checked) {
            window.addEventListener('keydown', (e) => {
                if (e.key === 'F5' || e.key === 'F11' || (e.ctrlKey && e.key.toLowerCase() === 'r')) {
                    e.preventDefault();
                }
            });
        }

        let progress = StartPercentInput.valueAsNumber || 0; // Start from the user-defined percentage, default to 0 if invalid

        // Fire up the fake progression counter
        startFakeUpdate(progress);

    } catch (err) {
        alert("Click failed to engage full screen: " + err.message);
    }
});

// 2. Progression Tracking Engine
const slider1 = document.getElementById('updateLength');
let randomness = 0;
function startFakeUpdate(progress) {
    if (progress < 100) {
        // 70% chance to advance, 30% chance to stall temporarily
        progress += Math.random() > 0.3 ? 1 : 0;
        percentText.innerText = `${progress}%`;

        // Let's assume 'inputNum' is your number from 1 to 100 (e.g., 45 means ~45 minutes)
        let inputNum = slider1.valueAsNumber;
        // 1. Calculate the exact target delay needed to satisfy your formula
        // Since (minutes * 60 * 1000) gives total ms, dividing by 100 gives the base delay
        let baseDelay = (inputNum * 60 * 1000) / (100 - progress);

        // 2. Add a random fluctuation (±10,000 ms or 10 seconds) so it's not a static number
        if (slider1.valueAsNumber < 10) {
            let randomness = Math.floor(Math.random() * 20000) - 1000;
        } else {
            // 2. Add a random fluctuation (±10,000 ms or 10 seconds) so it's not a static number
            let randomness = Math.floor(Math.random() * 20000) - 10000;
        }

        // 3. Combine them (and ensure it doesn't drop below a safe minimum, like 1500ms)
        let delay = Math.max(1500, baseDelay + randomness);

        // console.log("Delay variable is:", delay);
         console.log("Minutes to get to 100% is roughly:", (delay * (100 - progress)) / 60000);

        setTimeout(() => startFakeUpdate(progress), delay);
    } else {
        percentText.innerText = "100% Complete";
    }
}

// 3. Robust Input Mitigation 
const block = e => e.preventDefault();



