# System Requirements Description

## Glossary of Terms

- Team - a group of students that design, build, program, and operate a robot.
- Alliance - 3 teams that compete together during a match.

## Introduction

This document outlines the development plan for the WiredCats Scouting Hub, an application that will import data on FIRST Robotics matches, build reports on specific teams, and assist with alliance selection. This plan is intended for software engineers, designers, and investors of the project.

## Overall Description

In a FIRST Robotics competition, data is used to determine match-by-match strategy. Data is also used to select teammates before playoff matches. The new system implemented by the WiredCats Scouting Hub will be capable of modification and customization by the Wiredcats team.

## Customers

The system will be used by members of the 5675 WiredCats FIRST Robotics team. The customers are knowledgeable about terms used in FIRST Robotics and terms used during FIRST Robotics competitions.

## Functionality

- Users should be able to operate the application during cellular and Wi-Fi outages.
- Users should be able to import real time scoring data from the First Robotics API.
- Users should be able to upload data collected in AppSheet from a google sheet after exporting it to a CSV file to the system.
- Users should be able to synchronize all data collected from the API and downloaded CSV to a single device.
- Users should be able to edit and validate data after synchronization.
- Users should be able to produce, view, and filter reports representing the data in tables, bar graphs, and pie charts.
- The system shall produce reports calculating Offensive Power Rating.
- The system shall produce reports ranking teams based on desired parameters.
- The system shall be able to print out reports in black and white.
- Data collected from individual matches will not be shared outside the team or application.
- The system will use the data generated from AppSheet

## Platform

The application will be built using Electron, a framework built on JavaScript, HTML, and CSS. The app will also connect to a RESTful API and store data in a database.

## Development Responsibilities

The software development team for the WiredCats Scouting Hub will be responsible for programming the app, designing the user interface, and testing the app for quality assurance.

## User Class and Characteristic

There will be two types of users for the WiredCats Scouting Hub: members and administrators. Members will be able to access data, add data into a staging area, and generate reports. Administrators will additionally be able to synchronize staged data into the main database, edit previously added data, and delete erroneous data.

## System Features and Characteristics

3. Specific requirements
   3.1 External interface requirements
   3.1.1 User interfaces
   3.1.2 Hardware interfaces
   3.1.3 Software interfaces
   3.1.4 Communications interfaces
   3.2 System features
   3.2.1 System Feature 1
   3.2.1.1 Introduction/Purpose of feature
   3.2.1.2 Stimulus/Response sequence
   3.2.1.3 Associated functional requirements
   3.2.1.3.1 Functional requirement 1
   .
   .
   .
   3.2.1.3.n Functional requirement n
   3.2.2 System feature 2
   .
   .
   .
   3.2.m System feature m
   .
   .
   .
   3.3 Performance requirements
   3.4 Design constraints
   3.5 Software system attributes
   3.6 Other requirements

## Availability

The app should have a goal of 100% availability, including during periods without cellular connection or Wi-Fi.

## Correctness

The app should accurately display information and ensure secure transactions.

## Maintainability

The app should be well-documented so that features, updates, and bug fixes can be deployed by WiredCats team members over the long-term.

## Usability

The interface should be intuitive and easy to navigate, allowing users to input, synchronize, and view data without confusion.
