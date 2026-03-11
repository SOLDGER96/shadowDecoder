document.getElementById('decoderForm').addEventListener('submit', async function(e) {
    e.preventDefault(); // Prevent page reload
    
    const inputField = document.getElementById('shadowInput');
    const outputDiv = document.getElementById('output');
    const rawValue = inputField.value.trim();
    
    outputDiv.innerHTML = ''; // Clear previous output
    outputDiv.className = 'output'; 

    // 1. Validate and Parse Input (Bonus Feature implementation)
    let daysSinceEpoch;

    if (rawValue === "") {
        showError("Input cannot be empty.");
        return;
    }

    // Check if it's a full shadow line (contains colons)
    if (rawValue.includes(':')) {
        const parts = rawValue.split(':');
        // The last password change is always the 3rd field (index 2)
        if (parts.length >= 3 && !isNaN(parts[2]) && parts[2].trim() !== "") {
            daysSinceEpoch = parseInt(parts[2], 10);
            outputDiv.innerHTML += `> Extracted field 3: [${daysSinceEpoch}]\n`;
        } else {
            showError("Invalid shadow line format. Could not extract the 3rd field.");
            return;
        }
    } else {
        // Assume it's just the raw number
        if (isNaN(rawValue) || !Number.isInteger(Number(rawValue))) {
            showError("Input must be a positive integer or a valid shadow line.");
            return;
        }
        daysSinceEpoch = parseInt(rawValue, 10);
    }

    if (daysSinceEpoch < 0) {
        showError("Days since epoch cannot be negative.");
        return;
    }

    // 2. Fetch API to call the FastAPI backend
    try {
        outputDiv.innerHTML += `> Sending payload: {Calculating date: ${daysSinceEpoch}} \n`;
        
        const response = await fetch('http://127.0.0.1:8000/decode', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ days_since_epoch: daysSinceEpoch })
        });

        const data = await response.json();

        if (response.ok) {
            outputDiv.innerHTML += `\n[SUCCESS] Last Password Change Date: <strong style="color: #fff;">${data.last_password_change}</strong>`;
        } else {
            showError(`API Error: ${data.detail || 'Unknown error'}`);
        }
        
    } catch (error) {
        showError(`Network Error: Ensure the backend is running. (${error.message})`);
    }
    
    // Clear input for the next command
    inputField.value = '';
});

function showError(message) {
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML += `\n<span class="error">[ERROR] ${message}</span>`;
}
