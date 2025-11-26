# Employee Management System - Submission

## Overview
This is a modular Employee Management System built with pure JavaScript (ES6+), Fetch API, and dynamic DOM rendering. 

## Structure
- `app.js` contains the main logic, including API fetching, table rendering, search, filters, and modals.
- `components/`, `models/`, and `api/` folders follow the modular folder structure requested. 
- `Employee.js` and `EmployeeCollection.js` exist for modular design purposes, though employees are managed as plain objects in `app.js` for simplicity and speed.

- `js/components/SearchComponent.js` & `PaginationComponent.js` - Left empty due to time constraints; main logic is in `app.js`.

## Features Implemented
- Fetch and display employee data from API
- Virtual scrolling for large datasets
- Add employee modal
- Delete employee with confirmation
- Multi-select company filters
- Search by name/username
- Export data to CSV and JSON

## Note
SearchComponent and PaginationComponent were not implemented as separate modules to meet the 2-hour time limit. The app still respects modular principles using ES6 classes and modules.
