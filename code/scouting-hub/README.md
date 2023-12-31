# Setup

## Installation and Basics

### Debian Based Systems

#### Install npm

`sudo apt install npm`

#### Install Electron

`npm install electron --save-dev`

#### Run the program

`npm run start`

### Windows Based Systems

#### Prerequisites

Node and npm must be installed

#### Install

`npm i`

#### Run Dev

`npm run dev`

## Demo API Request

To run the demo api request, you need to create two environment variables, API_USERNAME and API_PASSWORD. Do this using the following steps:

1. Register for FIRST API Access at https://frc-events.firstinspires.org/services/api/register
1. If necessary, reinstall npm packages to ensure you are up-to-date.
1. Run the bash command: `export API_USERNAME=yourUsernameHere`
1. Run the bash command: `export API_PASSWORD=yourPasswordHere`
1. Alternatively to running the bash commands, create a `.env` file with two lines: `API_USERNAME=yourUsernameHere` and `API_PASSWORD=yourPasswordHere`.
1. Run the app.
1. Before pressing the button to make an API request, fill out the boxes with valid data. If in doubt, try `2022`, `migul` for the two boxes (in that order).
