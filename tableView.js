<script>
const tableContainer = document.getElementById("table");

tableContainer.innerHTML = `
    <button type="button" onclick="addRow()">Add Row</button>
    <button type="button" onclick="validateTable()">Validate</button>

    <table border="1" style="width:100%; margin-top:10px;">
        <thead>
            <tr>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Number of Hours</th>
                <th></th>
            </tr>
        </thead>
        <tbody id="tableBody"></tbody>
    </table>
`;

function addRow() {
    const tbody = document.getElementById("tableBody");

    const row = document.createElement("tr");

    row.innerHTML = `
        <td>
            <input type="date" class="startdate-field" min="1" required>
        </td>
        <td>
            <input type="date" class="enddate-field" required>
        </td>
        <td>
            <input type="number" class="hours-field" required>
        </td>
        <td>
            <button type="button" onclick="deleteRow(this)">
                Delete
            </button>
        </td>
    `;

    tbody.appendChild(row);
}

function deleteRow(button) {
    button.closest("tr").remove();
}

function validateTable() {
    const rows = document.querySelectorAll("#tableBody tr");

    if (rows.length === 0) {
        alert("Please add at least one row.");
        return false;
    }

    for (let i = 0; i < rows.length; i++) {
        const id = rows[i].querySelector(".startdate-field").value.trim();
        const name = rows[i].querySelector(".enddate-field").value.trim();
        const date = rows[i].querySelector(".hours-field").value;

    }

    alert("Validation successful!");
    return true;
}
</script>
