function toggleItem(id) {
    $("#" + id).toggle();
}

function showItem(id) {
    $("#" + id).show();
}

function hideItem(id) {
    $("#" + id).hide();
}

function btnPinkToggle(idOld, idNew) {
    $("#" + idOld).removeClass("btn-pink")
        .addClass("btn-pink-sub border-pink")
        .attr("onclick", "btnPinkToggle('" + idNew + "', '" + idOld + "')");

    $("#" + idNew).removeClass("btn-pink-sub border-pink")
        .addClass("btn-pink")
        .attr("onclick", "");
}


function orderServiceListNew() {
    for (let i = 1; i < 6; i++) {
        $("#service" + i).removeClass()
            .addClass("col-lg-4 col-sm-6 mt-3 order-" + i);
    }
}

function orderServiceListTrending() {
    $("#service1").removeClass()
        .addClass("col-lg-4 col-sm-6 mt-3 order-5");
    $("#service2").removeClass()
        .addClass("col-lg-4 col-sm-6 mt-3 order-4");
    $("#service3").removeClass()
        .addClass("col-lg-4 col-sm-6 mt-3 order-2");
    $("#service4").removeClass()
        .addClass("col-lg-4 col-sm-6 mt-3 order-3");
    $("#service5").removeClass()
        .addClass("col-lg-4 col-sm-6 mt-3 order-1");
}

/* account */
let accountString = window.localStorage.getItem("account");

function logout() {
    window.localStorage.removeItem("account");
    window.location.reload();
}

function fillLoginRegister(nav) {
    nav.append(
        "<div class='row m-0'>\n" +
        "   <div class='col-6 text-center'>\n" +
        "       <a href='login_petOwner.html' class='btn btn-pink w-100'>\n" +
        "           Đăng nhập\n" +
        "       </a>\n" +
        "   </div>\n" +
        "   <div class='col-6 text-center'>\n" +
        "       <a href='login_petOwner.html' class='btn btn-teal w-100'>\n" +
        "           Đăng ký\n" +
        "       </a>\n" +
        "   </div>\n" +
        "</div>"
    );
}

function fillAccountNav(nav, accountString) {
    let account = JSON.parse(accountString);
    nav.append(
        "<button type='button' class='btn btn-teal w-100 dropdown-toggle'\n" +
        "        id='btnAccountGroup' data-bs-toggle='dropdown' aria-expanded='false'>\n" +
        "   <i class='bi-person-circle'></i>&nbsp; " + account.displayName + "\n" +
        "</button>\n\n" +
        "<ul class='dropdown-menu w-100 text-end' aria-labelledby='btnAccountGroup'>\n" +
        "   <li><a class='dropdown-item'\n" +
        "          href='account_petOwner.html'>Tài khoản</a></li>\n" +
        "   <li><a class='dropdown-item'\n" +
        "          href='cart_petOwner.html'>Giỏ hàng</a></li>\n" +
        "   <li><a class='dropdown-item'\n" +
        "          href='order_history_petOwner.html'>Lịch sử mua hàng</a></li>\n" +
        "   <li><a class='dropdown-item'\n" +
        "          href='reservation_history_petOwner.html'>Lịch sử đặt lịch</a></li>\n" +
        "   <li><a class='dropdown-item'\n" +
        "          href='javascript:location.reload();' onclick='logout()'>Đăng xuất</a></li>\n" +
        "</ul>"
    );
}

function checkExistingLogin() {
    let accountNav = $("#accountNav");

    if (accountString === null) {
        fillLoginRegister(accountNav);
        $("#myPetHref").attr("href", "login_petOwner.html");
    } else { /*Logged in*/
        fillAccountNav(accountNav, accountString);
        $("#myPetHref").attr("href", "myPet_petOwner.html");
    }
}

function getCurrentDateString() {
    let date = new Date();

    let day = date.getDate();
    if (day < 10) {
        day = "0" + day;
    }

    let month = date.getMonth() + 1;
    if (month < 10) {
        month = "0" + month;
    }

    let year = date.getFullYear();

    return  day + "-" + month + "-" + year;
}

function getCurrentDateTimestampString() {
    let date = new Date();

    let year = date.getFullYear();

    let month = date.getMonth() + 1;
    if (month < 10) {
        month = "0" + month;
    }

    let day = date.getDate();
    if (day < 10) {
        day = "0" + day;
    }

    return year + "-" + month + "-" + day;
}

function maxDateCurrentDate(id) {
    $("#" + id).attr("max", getCurrentDateString());
}

function minDateCurrentDate(id) {
    $("#" + id).attr("min", getCurrentDateString());
}

/* account */

/* service */

function btnPinkFocus(id) {
    $("#" + id).removeClass("btn-pink-sub border-pink")
        .addClass("btn-pink")
        .attr("onclick", "btnPinkUnfocus('" + id + "')");
}

function btnPinkUnfocus(id) {
    $("#" + id).removeClass("btn-pink")
        .addClass("btn-pink-sub border-pink")
        .attr("onclick", "btnPinkFocus('" + id + "')");
}

function filterServiceShop() {
    let filterVet = $("#serviceVet").hasClass("btn-pink");
    let filterGroom = $("#serviceGroom").hasClass("btn-pink");
    let filterHotel = $("#serviceHotel").hasClass("btn-pink");

    if (filterVet && filterGroom && filterHotel) {
        /* chọn cả 3 = chọn hết */
        unfilterServiceShop();
        btnPinkFocus('serviceAll');
        btnPinkUnfocus('serviceVet');
        btnPinkUnfocus('serviceGroom');
        btnPinkUnfocus('serviceHotel');
        return;
    }

    let serviceShoplist = $("#serviceShopList .jquery-service-shop");
    serviceShoplist.hide();

    for (let i = 1; i < serviceShoplist.length; i++) {
        let serviceShop = $("#serviceShop" + i);

        let serviceShopCategory = $("#serviceShop" + i + "Category");

        if (filterVet) {
            serviceShopCategory.hasClass("jquery-service-vet") ? serviceShop.show() : null;
        }
        if (filterGroom) {
            serviceShopCategory.hasClass("jquery-service-groom") ? serviceShop.show() : null;
        }
        if (filterHotel) {
            serviceShopCategory.hasClass("jquery-service-hotel") ? serviceShop.show() : null;
        }
    }
}

function unfilterServiceShop() {
    $("#serviceShopList .jquery-service-shop").show();
}
