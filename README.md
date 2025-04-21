# Daily Calendar Puzzle

This project is a React web app, where the user solves a puzzle based on the current date.

It is still in the development stage, so visuals and colour choices may still be angled towards more easily knowing myself when elements are interacted with, as opposed to appropriate colour and responsive interaction choices for a project further into production.

The puzzle is hosted on GitHub pages, with the live version here: https://json-bell.github.io/calendar-puzzle/

It replicates a physical puzzle designed by @the_puzzle_guy (Instagram). I take no credit for the original design of the puzzle and no copyright infringement is intend - this project is a portfolio piece only.

## Local Hosting

The project can also be hosted locally:

```bash
# Clone the repo
git clone https://github.com/json-bell/calendar-puzzle

# Navigate into the project folder
cd calendar-puzzle

# Install dependencies
yarn install

# Start the development server
yarn dev
```

# Features

- Intuitive User Interaction
- Detailed game logic
- Responsive layout

# Tech stack

The main technologies used are Typescript, React and CSS modules.

One of the goals of this project was to see what I could complete from only a basic framework. I decided to limit the production dependencies where possible, so as seen in the `package.json` these are limited to `react` and `react-dom`, and used Vite to set up the skeleton of the project.

On the testing side, I primarily used `jest` and tested user interactions with `@testing-library/user-event`.

Hosting is through GitHub pages, with CI/CD via GitHub Workflows along with checks using `husky`.

With ESLint and `lint-staged` called in Husky hooks, I keep the code clean and maintainable. I also ensure to separate concerns by keeping the game logic distinct from the user interactions, through thought out utils and a React Reducer controlling reloads of state efficiently.
