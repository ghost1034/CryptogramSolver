from flask import Flask, request, jsonify
from flask_cors import CORS  # Import the CORS module
import subprocess

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/solve', methods=['POST'])
def solve():
    # Get the ciphertext from the POST request
    ciphertext = request.json.get('ciphertext', '')

    # Save the ciphertext to a temporary file
    with open('ciphertext.txt', 'w') as f:
        f.write(ciphertext)

    # Run the solver script
    result = subprocess.run(
        ['python3', 'sub_solver.py', '-c', 'english_corpus_generator/corpus.txt', 'ciphertext.txt'],
        capture_output=True,
        text=True
    )

    # Return the solution as JSON
    return jsonify({
        'solution': result.stdout.strip()
    })

if __name__ == '__main__':
    # Start the server on localhost:8080
    app.run(debug=True, port=8080)
