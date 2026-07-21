document.addEventListener('DOMContentLoaded', function () {

    const tableContainer = document.getElementById("table");

    tableContainer.innerHTML = `
        <button type="button" id="addRowBtn">Add Row</button>
        <button type="button" id="validateBtn">Validate</button>

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

    document.getElementById("addRowBtn").addEventListener("click", addRow);
    document.getElementById("validateBtn").addEventListener("click", validateTable);

    function addRow() {
        const tbody = document.getElementById("tableBody");

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>
                <input type="date" class="startdate-field" required>
            </td>
            <td>
                <input type="date" class="enddate-field" required>
            </td>
            <td>
                <input type="number" class="hours-field" min="1" required>
            </td>
            <td>
                <button type="button" class="delete-btn">Delete</button>
            </td>
        `;

        row.querySelector(".delete-btn").addEventListener("click", function () {
            row.remove();
        });

        tbody.appendChild(row);
    }

    function validateTable() {
        const rows = document.querySelectorAll("#tableBody tr");

        if (rows.length === 0) {
            alert("Please add at least one row.");
            return false;
        }

        for (let i = 0; i < rows.length; i++) {

            const startDate = rows[i].querySelector(".startdate-field").value;
            const endDate = rows[i].querySelector(".enddate-field").value;
            const hours = rows[i].querySelector(".hours-field").value;

            if (!startDate || !endDate || !hours) {
                alert(`Row ${i + 1} is missing required values.`);
                return false;
            }

            if (new Date(endDate) < new Date(startDate)) {
                alert(`Row ${i + 1}: End Date must be greater than or equal to Start Date.`);
                return false;
            }

            if (parseInt(hours) <= 0) {
                alert(`Row ${i + 1}: Number of Hours must be greater than 0.`);
                return false;
            }
        }

        alert("Validation successful!");
        return true;
    }

});
