

// // Toggle nested options and hide upper-layer siblings, excluding NO and NC
// document.querySelectorAll('.option-btn').forEach(button => {
//     button.addEventListener('click', () => {
//         const parent = button.closest('.option-group');
//         const siblings = parent.parentNode.querySelectorAll(':scope > .option-group');

//         // If the button is linked to Assembly Yes, ensure NO and NC are visible
//         if (button.id === 'assembly-yes-btn') {
//             // Show NO and NC inputs
//             document.getElementById('NO-input').classList.remove('hidden');
//             document.getElementById('NC-input').classList.remove('hidden');
//             return;
//         }

//         // Hide siblings only at the upper layer, except NO and NC
//         siblings.forEach(sibling => {
//             if (sibling !== parent && !sibling.querySelector('#NO-btn') && !sibling.querySelector('#NC-btn')) {
//                 sibling.style.display = 'none';
//             }
//         });

//         // Show nested options for the clicked button
//         const nestedOptions = button.nextElementSibling;
//         if (nestedOptions) {
//             nestedOptions.style.display = nestedOptions.style.display === 'block' ? 'none' : 'block';
//         }
//     });
// });

// Ensure NO and NC are always visible and displayed together
document.getElementById('NO-btn').addEventListener('click', function () {
    document.getElementById('NO-input').classList.remove('hidden');
    document.getElementById('NC-input').classList.remove('hidden'); // Always show NC with NO
});

document.getElementById('NC-btn').addEventListener('click', function () {
    document.getElementById('NC-input').classList.remove('hidden');
    document.getElementById('NO-input').classList.remove('hidden'); // Always show NO with NC
});

// Restrict NO and NC inputs to positive numbers only
const positiveNumberOnly = (event) => {
    const input = event.target;
    input.value = input.value.replace(/[^0-9]/g, ''); // Allow only digits
};

// Add event listeners to enforce positive number restriction
document.getElementById('NO-input').addEventListener('input', positiveNumberOnly);
document.getElementById('NC-input').addEventListener('input', positiveNumberOnly);

// Function to generate the code and show the image only if the code is valid
function generateCode() {
    const noValue = document.getElementById('NO-input').value;
    const ncValue = document.getElementById('NC-input').value;

    if (noValue && ncValue) {
        const codes = {
            "11": "P2PSF111",
            "10": "P2PSF110",
            "01": "P2PSF101",
            "21": "P2PSF121",
            "23": "P2PSF123",
            "22": "P2PSF122",
            "33": "P2PSF133"
        };

        const combinedValue = noValue + ncValue;
        const code = codes[combinedValue] || 'Invalid Code';

        const resultContainer = document.getElementById('result');
        const imageContainer = document.getElementById('imageContainer');

        if (code === 'Invalid Code') {
            // Hide the image if the code is invalid
            imageContainer.classList.add('hidden');
            resultContainer.textContent = 'Generated Code: Invalid Code';
        } else {
            // Show the valid code and the image
            resultContainer.textContent = `Generated Code: ${code}`;
            resultContainer.classList.remove('hidden');
            imageContainer.classList.remove('hidden');
        }
    } else {
        // Hide the result and image if no input is provided
        const resultContainer = document.getElementById('result');
        const imageContainer = document.getElementById('imageContainer');
        resultContainer.classList.add('hidden');
        imageContainer.classList.add('hidden');
    }
}

// Monitor input changes to update generated code and show image
document.getElementById('NO-input').addEventListener('input', generateCode);
document.getElementById('NC-input').addEventListener('input', generateCode);
