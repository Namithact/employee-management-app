export default class EmployeeAPI {
  static async fetchEmployees() {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/users");
      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();

      // Map data to full employee object
      return data.map(user => ({
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        phone: user.phone,
        website: user.website,
        company: user.company.name 
      }));

    } catch (error) {
      console.error("Error fetching employees:", error);
      return [];
    }
  }
}
