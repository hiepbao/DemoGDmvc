﻿const data = [];
for (let i = 1; i <= 50; i++) {
    data.push({
        id: i,
        customer: `CTY ${i.toString().padStart(2, "0")}`,
        currentDebt: Math.floor(Math.random() * 1000000),
        debt: Math.random() < 0.5 ? "0" : "1",
        debtTerm: 60,
        overdueDebt: Math.floor(Math.random() * 1000000),
        dueDate: "0",
        paymentInPeriod: Math.floor(Math.random() * 1000000),
        paymentDate: "0",
        totalDelivery: "0",
        uncheckedDebt: "0",
        manager: i % 2 === 0 ? "Tân An Bel" : "Lê Khác Hòa",
    });
}
let currentPage = 1;
let rowsPerPage = 20;

// Hàm load bảng
function loadTable() {
    const tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = "";

    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const pageData = data.slice(start, end);

    pageData.forEach((row) => {
        const tr = document.createElement("tr");
        tr.setAttribute("onclick", "redirectToDetailPage()");
        tr.innerHTML = `
                    <td class="fixed-column">${row.customer}</td>
                    <td class="fixed-column-2">${formatNumber(row.currentDebt)}</td>
                    <td>${row.debtTerm}</td>
                    <td>${formatNumber(row.overdueDebt)}</td>
                    <td>${row.dueDate}</td>
                    <td>${formatNumber(row.paymentInPeriod)}</td>
                    <td>${row.paymentDate}</td>
                    <td>${row.totalDelivery}</td>
                    <td>${row.uncheckedDebt}</td>
                    <td>${row.manager}</td>
                    <td>
                      ${row.debt === "1" ? "✔" : ""}
                    </td>
                `;
        tableBody.appendChild(tr);
    });

    updatePagination();
}

// Cập nhật phân trang
function updatePagination() {
    const pageCount = Math.ceil(data.length / rowsPerPage);
    const paginationDiv = document.getElementById("pagination");
    paginationDiv.innerHTML = "";

    for (let i = 1; i <= pageCount; i++) {
        const button = document.createElement("button");
        button.classList.add("btn", "btn-sm", "btn-primary");
        button.textContent = i;
        if (i === currentPage) {
            button.classList.add("active");
        }
        button.onclick = () => {
            currentPage = i;
            loadTable();
        };
        paginationDiv.appendChild(button);
    }
}

// Thay đổi số dòng trên mỗi trang
function changeRowsPerPage() {
    const select = document.getElementById("rowsPerPage");
    rowsPerPage = parseInt(select.value);
    currentPage = 1; // Reset lại trang hiện tại
    loadTable();
}

loadTable();

function searchFunction() {
    const input = document.getElementById("searchInput");
    const filter = input.value.toUpperCase();
    const table = document.getElementById("quotationTable");
    const tr = table.getElementsByTagName("tr");

    for (let i = 1; i < tr.length; i++) {
        const td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            const txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

function redirectToDetailPage(quotationId) {
    window.location.href = `./CongNo/ChiTietCN`;
}

function formatNumber(number) {
    return number.toLocaleString("en-US");
}