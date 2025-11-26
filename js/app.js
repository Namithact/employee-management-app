import TableComponent from "./components/TableComponent.js";
import EmployeeAPI from "./api/EmployeeAPI.js";

const table = new TableComponent("table-container", 50, 5); // rowHeight=50, buffer=5
let employees = [];

// Containers
const searchInput = document.getElementById("search");
const controls = document.getElementById("controls"); // container for multi-select filters

// Fetch employees and render table
EmployeeAPI.fetchEmployees().then(data => {
  employees = data;
  applyFilters(); // initial render

  // Setup multi-select company filter
  setupCompanyFilter();
});

// Render table helper
function renderTable(data) {
  table.render(data);

  // Attach delete handler
  table.addDeleteHandler((id) => {
    employees = employees.filter(emp => emp.id !== id);
    applyFilters(); // reapply filters after delete
  });
}

// Search functionality
searchInput.addEventListener("input", applyFilters);

// Apply search + multi-select filters
function applyFilters() {
  let filtered = employees;

  // Multi-select company filter
  const selectedCompanies = Array.from(document.querySelectorAll(".company-filter:checked"))
    .map(cb => cb.value);

  if (selectedCompanies.length) {
    filtered = filtered.filter(emp => selectedCompanies.includes(emp.company));
  }

  // Search filter
  const query = searchInput.value.toLowerCase();
  if (query) {
    filtered = filtered.filter(emp =>
      emp.name.toLowerCase().includes(query) || emp.username.toLowerCase().includes(query)
    );
  }

  renderTable(filtered); // render filtered data with virtual scrolling
}

// Setup multi-select company filter
function setupCompanyFilter() {
  const uniqueCompanies = [...new Set(employees.map(emp => emp.company))];
  controls.innerHTML = `
    <label>Filter by Company:</label>
    ${uniqueCompanies.map(company => `
      <label>
        <input type="checkbox" class="company-filter" value="${company}"> ${company}
      </label>
    `).join("")}
  `;

  document.querySelectorAll(".company-filter").forEach(cb => {
    cb.addEventListener("change", applyFilters);
  });
}

// Add Employee Modal
const addBtn = document.getElementById("add-employee-btn");
const modal = document.getElementById("employee-modal");
const closeModal = document.getElementById("close-modal");
const form = document.getElementById("employee-form");

// Open modal
addBtn.addEventListener("click", () => modal.style.display = "flex");

// Close modal
closeModal.addEventListener("click", () => modal.style.display = "none");
window.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});

// Handle form submission
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const newEmp = {
    id: employees.length ? employees[employees.length - 1].id + 1 : 1,
    name: document.getElementById("emp-name").value,
    username: document.getElementById("emp-username").value,
    email: document.getElementById("emp-email").value,
    company: document.getElementById("emp-company").value
  };

  employees.push(newEmp);
  applyFilters(); // reapply filters + virtual scroll render
  modal.style.display = "none";
  form.reset();
});

// Export CSV
document.getElementById("export-csv").addEventListener("click", () => {
  if (!employees.length) return;

  const headers = ["ID", "Name", "Username", "Email", "Company"];
  const csvRows = [
    headers.join(","), // header row
    ...employees.map(emp =>
      [emp.id, emp.name, emp.username, emp.email, emp.company]
        .map(field => `"${field}"`)
        .join(",")
    )
  ];

  const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "employees.csv";
  a.click();
  URL.revokeObjectURL(url);
});

// Export JSON
document.getElementById("export-json").addEventListener("click", () => {
  if (!employees.length) return;

  const blob = new Blob([JSON.stringify(employees, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "employees.json";
  a.click();
  URL.revokeObjectURL(url);
});
