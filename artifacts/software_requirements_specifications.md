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

# 3.1 External Interfaces

# 3.1.1 Landing Page / Import Data Page

# 3.1.2 Validation Page

# 3.1.3 Match Report Page

# 3.1.4 Alliance Selection Page

# 3.1.5 Create Report Layout Page

# 3.1.6 Create Alliance Selection Table Page

# 3.1.7 Settings API Import Page

# 3.1.8 Settings CSV Import Page

# 3.2 Functions

    System features:

# 3.2.1 Match Reports

    The software shall produce reports calculating Offensive Power Rating.

# 3.2.2 Create Reports

    The software shall produce reports ranking teams based on desired parameters.

# 3.2.3 Print Reports

    The software shall be able to print out reports in black and white.

# 3.2.3 Import FRC Data

    Users shall be able to import real time scoring data from the First Robotics API.

# 3.2.3 Import CSV Data (Google Sheets)

    Users shall be able to import data from Google Sheets.

# 3.2.4 Edit/Validate Data

    Users shall be able to edit and validate data after synchronization.

# 3.3 Performance requirements

    The software will run on a single laptop.

    Note: Minimum requirements by operating system:
    - OS X 10.9
    - Windows 7
    - Linux Fedora 21/Debian 8/Ubuntu 12.04

# 3.4 Logical database requirements

# 3.5 Design constraints

    The software will use the data generated from AppSheet

# 3.6 Software system attributes

# 5.3.6.1 Reliability

# 5.3.6.2 Availability

    The software will be able to operate during cellular and Wi-Fi outages.

# 5.3.6.3 Security

    Data collected from individual matches will not be shared outside the team or application.

# 5.3.6.4 Maintainability

# 5.3.6.5 Portability

# 3.7 Organizing the specific requirements

# 3.7.1 System mode

# 3.7.2 User class

# 3.7.3 Objects

# 3.7.4 Feature

# 3.7.5 Stimulus

# 3.7.6 Response

# 3.7.7 Functional hierarchy

# 3.8 Additional comments
