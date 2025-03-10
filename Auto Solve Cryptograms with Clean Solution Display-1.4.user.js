// ==UserScript==
// @name         Auto Solve Cryptograms with Clean Solution Display
// @namespace    http://tampermonkey.net/
// @version      1.4
// @description  Automatically solve cryptograms on PuzzleBaron and display a clean plaintext solution subtly
// @author       Your Name
// @match        https://cryptograms.puzzlebaron.com/play.php*
// @grant        GM_xmlhttpRequest
// @connect      localhost
// @run-at       document-idle
// ==/UserScript==

(function () {
    'use strict';

    // Wait for the page to fully load
    window.addEventListener('load', async function () {
        // Function to extract words and send to the local server
        async function extractAndSolveWords() {
            const wordElements = document.querySelectorAll('.word');
            let result = [];

            wordElements.forEach(wordElement => {
                let wordParts = [];

                // Find all elements inside the word
                const letterElements = wordElement.querySelectorAll('.cletter, .symbol');

                // Extract text content from each letter and symbol
                letterElements.forEach(letterElement => {
                    wordParts.push(letterElement.textContent.trim());
                });

                // Join the parts of the word and push to result
                result.push(wordParts.join(''));
            });

            // Join all words with spaces to form the ciphertext
            const ciphertext = result.join(' ');

            console.log('Ciphertext:', ciphertext); // Debugging

            // Send the ciphertext to the local server
            try {
                // Use GM_xmlhttpRequest for cross-origin communication
                GM_xmlhttpRequest({
                    method: 'POST',
                    url: 'http://localhost:8080/solve',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: JSON.stringify({ ciphertext }),
                    onload: function (response) {
                        if (response.status === 200) {
                            const data = response.responseText;
                            console.log('Raw Response:', data);

                            // Extract only the plaintext solution
                            const match = data.match(/Plaintext:\s*(.+?)\s*Substitutions:/);
                            let plaintext = match ? match[1].trim() : 'Error: Could not extract solution';

                            // Clean up newlines and extra spaces
                            plaintext = plaintext.replace(/\\n/g, ' ').replace(/\s+/g, ' ').trim();

                            console.log('Cleaned Plaintext Solution:', plaintext);

                            // Display the cleaned plaintext solution on the webpage
                            displaySolution(plaintext);
                        } else {
                            console.error('Error in response:', response);
                        }
                    },
                    onerror: function (error) {
                        console.error('Request error:', error);
                    }
                });
            } catch (error) {
                console.error('Error solving ciphertext:', error);
            }
        }

        // Function to display the plaintext solution inconspicuously on the page
        function displaySolution(solution) {
            // Create a container for the solution
            const solutionContainer = document.createElement('div');
            solutionContainer.style.position = 'fixed';
            solutionContainer.style.bottom = '5px';
            solutionContainer.style.right = '5px';
            solutionContainer.style.padding = '5px 10px';
            solutionContainer.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'; // Light transparency
            solutionContainer.style.borderRadius = '5px';
            solutionContainer.style.fontSize = '12px';
            solutionContainer.style.fontFamily = 'Arial, sans-serif';
            solutionContainer.style.color = 'rgba(0, 0, 0, 0.2)'; // Nearly invisible text
            solutionContainer.style.zIndex = '10000';
            solutionContainer.style.transition = 'opacity 0.3s, color 0.3s';
            solutionContainer.style.cursor = 'pointer';

            // Add hover effect to make text visible
            solutionContainer.addEventListener('mouseover', () => {
                solutionContainer.style.color = '#000'; // Fully visible on hover
                solutionContainer.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
                solutionContainer.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
            });
            solutionContainer.addEventListener('mouseout', () => {
                solutionContainer.style.color = 'rgba(0, 0, 0, 0.2)'; // Revert to nearly invisible
                solutionContainer.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                solutionContainer.style.boxShadow = 'none';
            });

            // Add the solution text
            solutionContainer.textContent = solution;

            // Append the solution container to the body
            document.body.appendChild(solutionContainer);
        }

        // Execute the extraction and solving function
        extractAndSolveWords();
    });
})();
