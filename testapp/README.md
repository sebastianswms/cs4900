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

#### Run

`npm start`

## Demo API Request

To run the demo api request, you need to create two environment variables, API\_USERNAME and API\_PASSWORD. Do this using the following steps:

1. Register for FIRST API Access at https://frc-events.firstinspires.org/services/api/register
1. Run the bash command: `export API_USERNAME=yourUsernameHere`
1. Run the bash command: `export API_PASSWORD=yourPasswordHere`
1. Run the app.
1. Before pressing the button to make an API request, fill out the boxes with valid data. If in doubt, try `2022`, `migul`, and `23` for each box (in that order).
