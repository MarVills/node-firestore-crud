const apiUrl = "/api/records";
const form = document.getElementById("recordForm");
const table = document.getElementById("recordsTable");
const recordIdInput = document.getElementById("recordId");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const cancelEditBtn = document.getElementById("cancelEdit");

// Fetch and display records
async function loadRecords() {
  const res = await fetch(apiUrl);
  const records = await res.json();
  table.innerHTML = "";
  records.forEach((r) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${r.name}</td>
      <td>${r.email}</td>
      <td>
        <button onclick="editRecord('${r.id}','${r.name}','${r.email}')">Edit</button>
        <button onclick="deleteRecord('${r.id}')">Delete</button>
      </td>
    `;
    table.appendChild(tr);
  });
}

// Create or Update
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = { name: nameInput.value, email: emailInput.value };
  const id = recordIdInput.value;

  if (id) {
    await fetch(`${apiUrl}/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
  } else {
    await fetch(apiUrl, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
  }

  recordIdInput.value = "";
  form.reset();
  loadRecords();
});

// Edit
function editRecord(id, name, email) {
  recordIdInput.value = id;
  nameInput.value = name;
  emailInput.value = email;
}

// Cancel edit
cancelEditBtn.addEventListener("click", () => {
  recordIdInput.value = "";
  form.reset();
});

// Delete
async function deleteRecord(id) {
  if (confirm("Are you sure?")) {
    await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
    loadRecords();
  }
}

// Initial load
loadRecords();
