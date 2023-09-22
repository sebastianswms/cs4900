# System Requirements Description

## Glossary of Terms

- Team - a group of students that design, build, program, and operate a robot.
- Alliance - 3 teams that compete together during a match.

## Introduction

This document outlines the development plan for the WiredCats Scouting Hub, an application that will collect data on FIRST Robotics matches, build reports on specific teams, and assist with alliance selection. This plan is intended for software engineers, designers, and investors of the project.

## Overall Description

In a FIRST Robotics competition, data is used to determine match-by-match strategy. Data is also used to select teammates before playoff matches. The new system implemented by the WiredCats Scouting Hub will streamline the current process. The current process incorporates several different third-party systems that lack interconnectivity. The new system will incorporate the features of the third-party systems into one system. The new system will be capable of modification and customization by the Wiredcats team.


## Customers

The system will be used by members of the 5675 WiredCats FIRST Robotics team. The customers are knowledgeable about terms used in FIRST Robotics and terms used during FIRST Robotics competitions.

## Functionality

- Users should be able to operate the application during cellular and Wi-Fi outages.
- Users should be able to collect real time scoring data from several APIs.
- Users should be able to pass data collected from APIs between devices.
- Users should be able to input additional data from external sources.
- Users should be able to synchronize all data collected from APIs and individual matches onto a single device.
- Users should be able to edit and validate data after synchronization.
- Users should be able to produce, view, and filter reports representing the data in tables, bar graphs, and pie charts.
- The system shall produce reports calculating Offensive Power Rating.
- The system shall produce reports ranking teams based on desired parameters.
- The system should be able to print out reports in black and white.
- The system should be easy to use and uplifting for student users. 
- Data collected from individual matches will not be shared outside the team or application.

## Platform

The application will be built using Electron, a framework built on JavaScript, HTML, and CSS. The app will also connect to a RESTful API and store data in a database.

## Development Responsibilities

The software development team for the WiredCats Scouting Hub will be responsible for programming the app, designing the user interface, and testing the app for quality assurance.

## User Class and Characteristic

There will be two types of users for the WiredCats Scouting Hub: members and administrators. Members will be able to access data, add data into a staging area, and generate reports. Administrators will additionally be able to synchronize staged data into the main database, edit previously added data, and delete erroneous.

## System Features and Characteristics

- Functional Requirements
  - X
- Internal Interfaces
  - User Interfaces
    - X
  - Hardware Interfaces
- Non-functional Requirements
  - Performance Requirements
    - X
  - Safety Requirements
  - Security  Requirements
- Quality Attributes

## Availability

The app should have a goal of 100% availability, including during periods without cellular connection or Wi-Fi.

## Correctness

The app should accurately display information and ensure secure transactions.

## Maintainability

The app should be well-documented so that features, updates, and bug fixes can be deployed by WiredCats team members over the long-term.

## Usability

The interface should be intuitive and easy to navigate, allowing users to input, synchronize, and view data without confusion.
