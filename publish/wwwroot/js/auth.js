document.addEventListener("DOMContentLoaded", function () {
    if (!localStorage.getItem("loggedIn")) {
        window.location.href = "../login/Login"; // Đổi thành đường dẫn của trang đăng nhập
    }
});