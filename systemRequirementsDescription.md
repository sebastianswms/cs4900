# System Requirements Description

## Glossary of Terms

- Team - a group of students that design, build, program, and operate a robot.
- Alliance - 3 teams that compete together during a match.

## Introduction

This document outlines the development plan for <Application Name here>, an application that will allow users to collect data on First Robotics matches, extrapolate reports on specific teams, and assist with alliance building. This plan is intended for software engineers, designers, and investors of the project.

## Overall Description

In a First Robotics competition, data is used in determining strategies in matches. This data is also used to select teammates during playoff matches. The system will streamline the current process. The current process incorporates several different 3rd party systems that lack direct interconnectivity to the desired output. The new system will incorporate the features of the 3rd party systems into one system. The new system will be capable of modification and customization by the Wiredcats team.


## Customers

The system will be used by the Wiredcats(team 5675) members. The customers are knowledgeable on terms used in First Robotics and terms used during competitions.

## Functionality

- Users should be able to operate the application during cellular and Wi-Fi outages.
- Users should be able to collect real time scoring data from several API.
- Users should be able to pass data collected from API between devices.
- Users should be able to input user defined data from individual matches.
- Users should be able to synchronize all data collected from API’s and individual matches onto a single device.
- Users should be able to edit and validate data after synchronization.
- Users should be able to produce, view, and filter reports representing the data in tables, bar graphs, and pie charts.
- The system shall produce reports calculating Offensive Power Rating.
- The system shall produce reports ranking teams based on desired parameters.
- The system should be able to print out the reports in black and white.
- The system should be easy to use and uplifting for student users. 
- Data collected from individual matches will not be shared outside the team or application.

## Platform

The application will be built using Electron, a framework that utilizes javascript, html, and css. The app will also connect to RESTful API and store data in SQLite.

## Development Responsibilities

The software development team for <Application Name here> will be responsible for programming the app, designing the user interface, and testing the app for quality assurance.

## User Class and Characteristic

There will be two types of users for <Application Name here>: member and admins. Members will be able to use all the app’s features, while admins will have access to additional features such as editing data.

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

The app should have a goal of 100% availability to ensure customers can win.

## Correctness

The app should accurately display information and ensure secure transactions.

## Maintainability

The app should be well documented so that features, updates, and bug fixes can be deployed by team members.

## Usability

The interface should be intuitive and easy to navigate, allowing users to input, sync, and view data without confusion.
