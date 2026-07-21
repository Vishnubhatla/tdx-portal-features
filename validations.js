document.addEventListener('DOMContentLoaded', function () {

    const tableContainer = document.querySelector(".tdx-grid-view");

    if (!tableContainer) {
        console.error("tdx-grid-view container not found.");
        return;
    }

    tableContainer.innerHTML = `
        <button type="button" id="addRowBtn">Add Row</button>

        <table border="1" style="width:100%; margin-top:10px;">
            <thead>
                <tr>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Number of Hours</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody id="tableBody"></tbody>
        </table>
    `;

    document
        .getElementById("addRowBtn")
        .addEventListener("click", addRow);

    function addRow() {

        const tbody = document.getElementById("tableBody");

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>
                <input 
                    type="date" 
                    class="startdate-field" 
                    required
                >
            </td>

            <td>
                <input 
                    type="date" 
                    class="enddate-field" 
                    required
                >
            </td>

            <td>
                <input 
                    type="number" 
                    class="hours-field" 
                    min="1"
                    required
                >
            </td>

            <td>
                <button 
                    type="button" 
                    class="delete-btn"
                >
                    Delete
                </button>
            </td>
        `;

        const startDateField =
            row.querySelector(".startdate-field");

        const endDateField =
            row.querySelector(".enddate-field");

        const hoursField =
            row.querySelector(".hours-field");

        startDateField.addEventListener("change", function () {

            // Prevent selecting End Date before Start Date
            endDateField.min = this.value;

            validateRow(row);
        });

        endDateField.addEventListener("change", function () {
            validateRow(row);
        });

        hoursField.addEventListener("input", function () {
            validateRow(row);
        });

        row.querySelector(".delete-btn")
            .addEventListener("click", function () {
                row.remove();
            });

        tbody.appendChild(row);
    }

    function validateRow(row) {

        const startDate =
            row.querySelector(".startdate-field");

        const endDate =
            row.querySelector(".enddate-field");

        const hours =
            row.querySelector(".hours-field");

        // Clear previous errors
        startDate.setCustomValidity("");
        endDate.setCustomValidity("");
        hours.setCustomValidity("");

        // Validate dates
        if (
            startDate.value &&
            endDate.value &&
            new Date(endDate.value) < new Date(startDate.value)
        ) {
            endDate.setCustomValidity(
                "End Date must be greater than or equal to Start Date."
            );
        }

        // Validate hours
        if (
            hours.value &&
            parseInt(hours.value, 10) <= 0
        ) {
            hours.setCustomValidity(
                "Number of Hours must be greater than 0."
            );
        }

        endDate.reportValidity();
        hours.reportValidity();
    }

});
