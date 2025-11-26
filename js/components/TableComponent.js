export default class TableComponent {
  constructor(containerId, rowHeight = 50, buffer = 5) {
    this.container = document.getElementById(containerId);
    this.rowHeight = rowHeight; // height of each row
    this.buffer = buffer;       // extra rows to render above/below
    this.employees = [];
    this.scrollContainer = null;
    this.tbody = null;
  }

  render(employees) {
  if (!this.container) return;
  this.employees = employees;

  this.container.innerHTML = "";

  // Fixed header table
  const headerTable = document.createElement("table");
  headerTable.classList.add("employee-table");
  const thead = document.createElement("thead");
  thead.innerHTML = `
    <tr>
      <th>ID</th>
      <th>Name</th>
      <th>Username</th>
      <th>Email</th>
      <th>Company</th>
      <th>Actions</th>
    </tr>
  `;
  headerTable.appendChild(thead);
  this.container.appendChild(headerTable);

  // Scrollable body container
  this.scrollContainer = document.createElement("div");
  this.scrollContainer.style.height = "400px";
  this.scrollContainer.style.overflowY = "auto";
  this.scrollContainer.style.position = "relative";

  const bodyTable = document.createElement("table");
  bodyTable.classList.add("employee-table");
  bodyTable.style.width = "100%";
  this.tbody = document.createElement("tbody");
  bodyTable.appendChild(this.tbody);

  this.scrollContainer.appendChild(bodyTable);
  this.container.appendChild(this.scrollContainer);

  // total height simulation
  this.tbody.style.position = "relative";
  this.tbody.style.height = `${this.employees.length * this.rowHeight}px`;

  this.updateVisibleRows();

  this.scrollContainer.addEventListener("scroll", () => this.updateVisibleRows());
}


  updateVisibleRows() {
    const scrollTop = this.scrollContainer.scrollTop;
    const containerHeight = this.scrollContainer.clientHeight;

    const startIdx = Math.max(0, Math.floor(scrollTop / this.rowHeight) - this.buffer);
    const endIdx = Math.min(this.employees.length, Math.ceil((scrollTop + containerHeight) / this.rowHeight) + this.buffer);

    this.tbody.innerHTML = "";

    for (let i = startIdx; i < endIdx; i++) {
      const emp = this.employees[i];
      const tr = document.createElement("tr");
    //   tr.style.position = "absolute";
    //   tr.style.top = `${i * this.rowHeight}px`;
      tr.innerHTML = `
        <td>${emp.id}</td>
        <td>${emp.name}</td>
        <td>${emp.username}</td>
        <td>${emp.email}</td>
        <td>${emp.company}</td>
        <td><button class="delete-btn" data-id="${emp.id}">Delete</button></td>
      `;
      this.tbody.appendChild(tr);
    }
  }

  addDeleteHandler(handler) {
    if (!this.tbody) return;
    this.tbody.addEventListener("click", (e) => {
      if (e.target.classList.contains("delete-btn")) {
        const id = parseInt(e.target.dataset.id);
        handler(id);
      }
    });
  }
}
