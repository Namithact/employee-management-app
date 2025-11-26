import Employee from "./Employee.js";

export default class EmployeeCollection {
  constructor() {
    this.employees = [];
  }

  add(employee) {
    this.employees.push(employee);
  }

  remove(id) {
    this.employees = this.employees.filter(emp => emp.id !== id);
  }

  getAll() {
    return this.employees;
  }
}
