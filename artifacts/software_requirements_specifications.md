# Table of Contents

1. Introduction
   1.1 Purpose
   1.2 Scope
   1.3 Definitions, acronyms, and abbreviations
   1.4 References
   1.5 Overview
2. Overall description
   2.1 Product perspective
   2.2 Product functions
   2.3 User characteristics
   2.4 Constraints
   2.5 Assumptions and dependencies
3. Specific requirements

# 1. Introduction

# 1.1 Purpose

    The purpose of this document is:
        1. To explain the process by which the preliminary requirements for Scouting Hub were analyzed and refined.
        2. To state the requirements for the WiredCats Scouting Hub in a way that allows tracing from the original process to the refined process.
        3.

# 1.2 Scope

    The product is a software application which runs on a laptop that imports data to produce reports.

# 1.3 Definitions, acronyms, and abbreviations

    - Team: a group of students that design, build, program, and operate a robot.
    - Alliance: 3 teams that compete together during a match.
    - FRC: First Robotics Competition.

# 1.4 References

    - First Robotics Competition API Documentation v3
        [API v3](https://frc-api-docs.firstinspires.org/?version=216cd832-1976-40b0-855b-3a4d92166c08)
    - Electron Docs
        [latest docs](https://www.electronjs.org/docs/latest/)

# 1.5 Overview

    In a FIRST Robotics competition, data is used to determine match-by-match strategy. Data is also used to select teammates before playoff matches. The new system implemented by the WiredCats Scouting Hub will import both API data and Google Sheet data then merge the data into one set. The new system will produce charts and graphs of the combined data.

# 2. Overall description

# 2.1 Product perspective

# 2.2 Product functions

# 2.3 User characteristics

# 2.4 Constraints

# 2.5 Assumptions and dependencies

# 3. Specific requirements

## 3.1 Match Reports

The software shall produce Match reports.

### 3.1.1

Match reports shall include offensive power rating.

### 3.1.2

Match reports shall rank teams based on desired and adjustable parameters.

### 3.1.3

Match reports shall be printable in black and white.

### 3.1.4

Match reports shall be printable on standard paper size.

### 3.1.5

Match reports shall display data in tables, graphs, and charts.

#### 3.1.5.1

The displayed data shall be configurable. 

## 3.2 Alliance Selection Reports

The software shall produce Alliance Selection reports.

### 3.2.1

Alliance Selection reports shall include offensive power rating.

### 3.2.2

Alliance Selection reports shall rank teams based on desired parameters.

### 3.2.3

Alliance Selection reports shall remove teams that have been selected from the master list.

### 3.2.4

Alliance Selection reports shall group teams that have been selected into their alliance.

### 3.2.5

Alliance Selection shall allow editing of all tables.

## 3.3 FRC API Data Collection

The software shall access the FRC API to retrieve data.

### 3.3.1

Retrieved data shall include event data.

### 3.3.2

Retrieved data shall include team data.

### 3.3.3

Retrieved data shall be accessed several times per event.

### 3.3.4

Users shall have the ability to specify which data is retrieved. 

## 3.4 AppSheet Data Collection

The software shall access information collected with AppSheet. 

### 3.4.1

The data will be imported as a CSV.

### 3.4.2

Retrieved data will be accessed several times per event.

### 3.4.3

Users shall have the ability to specify which CSV is retrieved. 

### 3.4.4

The data collected will not be shared outside the team or the software. 

## 3.5 Data Combination

The software shall combine data from the API and AppSheet.

### 3.5.1

Users shall have the ability to view, validate, and edit data after synchronization.

## 3.6 Offline Operation

The software will be able to operate when cell service and Wi-Fi are not available.

### 3.6.1

Importing data will be handled by leaving the outage area.

## 3.7 Running environment

The software shall run on a laptop.

### 3.7.1

The software shall run on both windows and linux.

# 5.3.6.1 Reliability

# 5.3.6.2 Availability

    The software will be able to operate during cellular and Wi-Fi outages.

# 5.3.6.3 Security

    Data collected from individual matches will not be shared outside the team or application.

# 5.3.6.4 Maintainability

# 5.3.6.5 Portability

<!-- # 3.7 Organizing the specific requirements

# 3.7.1 System mode

# 3.7.2 User class

# 3.7.3 Objects

# 3.7.4 Feature

# 3.7.5 Stimulus

# 3.7.6 Response

# 3.7.7 Functional hierarchy

# 3.8 Additional comments -->
