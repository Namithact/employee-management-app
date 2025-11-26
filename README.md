# Employee Management System - Submission

## Overview
This is a modular Employee Management System built with pure JavaScript (ES6+), Fetch API, and dynamic DOM rendering. 

## Folder Structure
- `js/api/EmployeeAPI.js` - Fetches data from external API.
- `js/models/Employee.js` & `EmployeeCollection.js` - Employee data models.
- `js/components/TableComponent.js` - Table rendering with virtual scrolling.
- `js/app.js` - Consolidated main application logic including search, filters, add/delete employee, export CSV/JSON.
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
