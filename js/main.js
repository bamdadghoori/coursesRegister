function myFunction() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}





let options = {

    placeholder: "تاریخ",
    twodigit: false,
    nextButtonIcon: "./assets/img/timeir_next.png",
    previousButtonIcon: "./assets/img/timeir_prev.png",
    markToday: true,
    // gotoToday: true,
    forceFarsiDigits: true,

}





kamaDatepicker('startdate', options);

kamaDatepicker('enddate', options);


/**
  @param { HTMLTableElement }
 * @param {number}
 @param {boolean}
 * 
 */
function sortTableByColumn(table, column, asc = true) {
    const dirModifier = asc ? 1 : -1;
    const tBody = table.tBodies[0];
    const rows = Array.from(tBody.querySelectorAll("tr"));

    const sortedRows = rows.sort((a, b) => {

        const aColText = a.querySelector(`td:nth-child(${column + 1 })`).textContent.trim();
        const bColText = b.querySelector(`td:nth-child(${column + 1 })`).textContent.trim();

        return aColText > bColText ? (1 * dirModifier) : (-1 * dirModifier);
    });

    // remove all exiting Trs from the table

    while (tBody.firstChild) {
        tBody.removeChild(tBody.firstChild);
    }

    // re-add the newly sorrted rows

    tBody.append(...sortedRows);

    //rememver how the column is currently sorted
    table.querySelectorAll("th").forEach(th => th.classList.remove("th-sort-asc", "th-sort-desc"));

    table.querySelector(`th:nth-child(${column + 1})`).classList.toggle("th-sort-asc", asc);
    table.querySelector(`th:nth-child(${column + 1})`).classList.toggle("th-sort-desc", !asc);

}

// number soton ra neshan midahaad va false nozoli mikonad
// 

document.querySelectorAll(".table-sortable th").forEach(headerCell => {
    headerCell.addEventListener("click", () => {

        const tableElement = headerCell.parentElement.parentElement.parentElement;
        const headerIndex = Array.prototype.indexOf.call(headerCell.parentElement.children, headerCell);
        const currentIsAscending = headerCell.classList.contains("th-sort-asc");

        sortTableByColumn(tableElement, headerIndex, !currentIsAscending);

    });


});