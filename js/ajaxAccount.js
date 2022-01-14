function updatePersonalInfo() {
    let accountString = window.localStorage.getItem("account");
    let account = JSON.parse(accountString);

    account.displayName = $("#displayName").val();
    account.firstName = $("#firstName").val();
    account.lastName = $("#lastName").val();
    account.birthday = $("#birthday").val();
    account.gender = $("#gender").val();

    ajaxUpdateAccount(account);
}

function updateContact() {
    let accountString = window.localStorage.getItem("account");
    let account = JSON.parse(accountString);

    account.phone = $("#phone").val();
    account.username = $("#email").val();
    account.address = $("#address").val();

    ajaxUpdateAccount(account);
}

function ajaxUpdateAccount(account) {
    $.ajax("http://localhost:9090/account/" + account.accountID,
        {method: "PUT", processData: false, contentType: 'application/json', data: JSON.stringify(account)})
        .done(function (data) {
            if (data.status === "success") {
                alert("Cập nhập thành công");
                window.localStorage.setItem("account", JSON.stringify(data.data));
                window.location.reload();
                /* Tải lại trang để js cập nhập thay đổi */
            } else {
                alert("Lỗi" + data.message);
            }
        });
}

function fillAccountPage() {
    if (accountString === null) {
        window.location.replace("index.html");
    } else {
        let account = JSON.parse(accountString);

        $("#displayName").val(account.displayName);
        $("#firstName").val(account.firstName);
        $("#lastName").val(account.lastName);
        $("#birthday").val(account.birthday);
        $("#gender").val(account.gender);

        $("#phone").val(account.phone);
        $("#email").val(account.username);
        $("#address").val(account.address);
    }
}