function ajaxSendOtp() {
    let phoneNum = $("#txtPhoneNum").val();
    $.ajax("http://localhost:9090/account/owner", {method: "GET", data: {phone: phoneNum}})
        .done(function (data) {
            if (data.status === "success") {
                hideItem('btnSendOTP');
                showItem('linkSendOTP');
                showItem('formOTP');
                // alert('Mã OTP đã được gửi');
                $("#otpNum1").focus();
            } else {
                alert('Số điện thoại không hợp lệ');
            }
        });
}

function ajaxLoginPhone() {
    let phoneNum = $("#txtPhoneNum").val();
    let otpNum = $("#otpNum1").val() + $("#otpNum2").val() + $("#otpNum3").val()
        + $("#otpNum4").val() + $("#otpNum5").val() + $("#otpNum6").val();
    $.ajax("http://localhost:9090/account/owner", {method: "GET", data: {phone: phoneNum, otp: otpNum}})
        .done(function (data) {
            if (data.status === "success") {
                localStorage.setItem("account", JSON.stringify(data.data));
                /*Lưu vào localStorage (xóa sau x ngày chưa vô lại (Cần hỏi business rule))*/
                window.location.replace("index.html");
                /*Login xong xóa luôn, khỏi back về login*/
            } else {
                alert('Mã otp không hợp lệ');
            }
        });
}