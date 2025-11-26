employees.forEach(emp => {
  this.collection.add(new Employee(emp.id, emp.name, emp.username, emp.company));
});
