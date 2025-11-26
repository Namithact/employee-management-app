import EmployeeCollection from "../models/EmployeeCollection.js";
import Employee from "../models/Employee.js";
import EmployeeAPI from "../api/EmployeeAPI.js";

export default class DataService {
  constructor() {
    this.collection = new EmployeeCollection();
  }

  async loadEmployees() {
    const employees = await EmployeeAPI.fetchEmployees();
    employees.forEach(emp => {
      this.collection.add(new Employee(emp.id, emp.employee_name, emp.employee_salary, emp.employee_age));
    });
  }

  getAllEmployees() {
    return this.collection.getAll();
  }
}
