# CryptogramSolver

Makes it easy to get solutions to cryptograms! Currently supports the popular cryptogram website [cryptograms.puzzlebaron.com](https://cryptograms.puzzlebaron.com/), widely used by cryptogram enthusiasts (including Science Olympiad Codebusters competitors).
Make sure to have the latest version of Python 3 installed. Also, run the command below for dependencies.

```
pip install flask flask-cors
```

Get the TamperMonkey Chrome extension and add `Auto Solve Cryptograms with Clean Solution Display-1.4.user.js` as a userscript. Go onto [cryptograms.puzzlebaron.com](https://cryptograms.puzzlebaron.com/) and play a game, and you should see the calculated solution appear in the corner in an intentionally inconspicious way. It's not always perfect, but it can help you if you're stuck!


## SubSolver info (from original repo)

This is handled by the program and you should not need to worry about this.

```
SubSolver v0.0.1

usage: sub_solver.py [-h] [-c corpus] [-v] input_text

Solves substitution ciphers using a recursive greedy brute-force search
using a corpus of the top 40000 English words. Corpus included with generator
script.

positional arguments:
  input_text  A file containing the ciphertext.

optional arguments:
  -h, --help  show this help message and exit
  -c corpus   Filename of the word corpus.
  -v          Verbose mode.
```

