function ajaxUpdatePersonalInfo() {
    let accountString = window.localStorage.getItem("account");
    let account = JSON.parse(accountString);

    account.displayName = $("#displayName").val();
    account.firstName = $("#firstName").val();
    account.lastName = $("#lastName").val();
    account.birthday = $("#birthday").val();
    account.gender = $("#gender").val();

    ajaxupdate(account);
}

function ajaxUpdateContact() {
    let accountString = window.localStorage.getItem("account");
    let account = JSON.parse(accountString);

    account.phone = $("#phone").val();
    account.username = $("#email").val();
    account.address = $("#address").val();

    ajaxupdate(account);
}

function ajaxupdate(account) {
    $.ajax("http://localhost:9090/account/" + account.accountID,
        {method: "PUT", processData: false, contentType: 'application/json', data: JSON.stringify(account)})
        .done(function (data) {
            if (data.status === "success") {
                alert("Cập nhập thành công");
                window.localStorage.setItem("account", JSON.stringify(data.data));
                window.location.reload();
                /* Tải lại trang để js cập nhập thay đổi */
            } else {
                alert(data.message);
            }
        });
}