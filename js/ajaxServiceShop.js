function populateServiceShop() {

    }


    let shop;

    function selectAllService() {
        for (let i = 0; i < shop.services.length; i++) {
            let service = $("#service" + (i + 1) + "Check");
            if (service.hasClass("btn-pink-sub")) {
                service.trigger("click");
            }
    }
}

function unselectAllService() {
    for (let i = 0; i < shop.services.length; i++) {
        let service = $("#service" + (i + 1) + "Check");
        if (service.hasClass("btn-pink")) {
            service.trigger("click");
        }
    }
}

function replaceImgServiceShopDetail(id) {
    let src = $("#" + id).attr("src");
    $("#serviceShopCurrentImg").attr("src", src);
}

function toggleWhitePinkBG(id1, id2) {
    let item = $("#" + id1);
    let button = $("#" + id2);
    if (item.hasClass("bg-white")) {
        item.removeClass("bg-white").addClass("bg-pink-sub");
        button.removeClass("btn-pink-sub")
            .addClass("btn-pink");
    } else {
        item.removeClass("bg-pink-sub").addClass("bg-white");
        button.removeClass("btn-pink")
            .addClass("btn-pink-sub");
    }
}

function fillServiceShopDetail(paramsString) {
    let params = new URLSearchParams(paramsString);
    let shopName = params.get("shop");
    console.log(shopName);
    shop = shops[shopName];
    console.log(shop.name);
    let tmpString = "";
    let tmpInt = 0;

    /* img */
    $("#serviceShopCurrentImg").attr("src", shop.img[0]);

    for (let i = 0; i < shop.img.length; i++) {
        tmpString += $("<div></div>").addClass("col-3 p-0 ms-3 me-0")
            .attr("onclick", "replaceImgServiceShopDetail('serviceShopImg" + (i + 1) + "')")
            .html("<div class='square-wrapper'>\n" +
                "    <div class='fill-wrapper'>\n" +
                "        <img src='" + shop.img[i] + "' alt='img' class='w-100 h-100 img-cover rounded' id='serviceShopImg" + (i + 1) + "'/>\n" +
                "    </div>\n" +
                "</div>\n")
            .prop('outerHTML');
    }

    $("#serviceShopImgList").html(tmpString);
    tmpString = "";

    /* detail */
    $("#serviceShopName").html(shop.name);

    $("#serviceShopAddress").html("<b>Địa chỉ: </b>" + shop.address);

    $("#serviceShopWorktime").html("<b>Giờ mở cửa: </b>" + shop.worktime);

    $("#serviceShopPhone").html("<b>Điện thoại: </b>" + shop.phone);

    $("#serviceShopWeb").html("<b>Website: </b>" +
        "<a href='" + shop.website + "' class='text-decoration-none txt-blue'>" +
        shop.website +
        "</a>");

    for (let i = 0; i < 3; i++) {
        let tmp = "";
        if (shop.serviceOffer.length > i) {
            tmp = shop.serviceOffer[i];

            tmpString +=
                "<div class='col-4'>\n";
            switch (tmp) {
                case "vet":
                    tmpString +=
                        "    <p class='text-center rounded border-pink py-1 mb-0'>\n" +
                        "        <i class='bi-plus-circle'></i>&nbsp; Thú y\n";
                    break;
                case "groom":
                    tmpString +=
                        "    <p class='text-center rounded border-teal py-1 mb-0'>\n" +
                        "        <i class='bi-plus-circle'></i>&nbsp; Grooming-spa\n";
                    break;
                case "hotel":
                    tmpString +=
                        "    <p class='text-center rounded border-yellow py-1 mb-0'>\n" +
                        "        <i class='bi-building'></i>&nbsp; Khách sạn\n";
                    break;
            }
            tmpString +=
                "    </p>\n" +
                "</div>";
        } else {
            tmpString += "<div class='col-4'></div>\n";
        }
    }

    $("#serviceShopServiceOffer").html(tmpString);
    tmpString = "";

    $("#serviceShopDesc").html("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + shop.desc);

    let tab = $("#serviceShopServiceTab");

    for (let i = 0; i < shop.services.length; i++) {
        tab.prepend(
            $("<div></div>").addClass("col-lg-6 col-sm-12 txt-black mt-3")
                .append(
                    $("<div></div>").addClass("row h-100 bg-white rounded border-pink m-0")
                        .attr("id", "service" + (i + 1))
                        .append(
                            $("<div></div>").addClass("col-1 btn btn-pink-sub rounded-0 rounded-end justify-content-center d-flex align-items-center p-0")
                                .attr({
                                    id: "service" + (i + 1) + "Check",
                                    onclick: "toggleWhitePinkBG('service" + (i + 1) + "', 'service" + (i + 1) + "Check')"
                                })
                                .append("<i class='bi-check2 txt-lgxx txt-bold'></i>"))
                        .append(
                            $("<div></div>").addClass("col-3 p-0")
                                .append(
                                    "<div class='square-wrapper border-pink-x'>\n" +
                                    "    <div class='fill-wrapper'>\n" +
                                    "        <img src='" + shop.services[i].img + "'\n" +
                                    "            alt='' class='w-100 h-100 img-cover'>\n" +
                                    "    </div>\n" +
                                    "</div>"))
                        .append(
                            $("<div></div>").addClass("col-8")
                                .append(
                                    "<p class=\"txt-bold mb-1 py-1 " + borders[shop.services[i].type] + "\"><i class=\"rounded " + symbols[shop.services[i].type] + "\"></i>&nbsp; " + shop.services[i].name + "</p>\n" +
                                    "<p class='txt-bold txt-md mb-1'>" + shop.services[i].price + "</p>\n" +
                                    "<p class='txt-smx'>" + shop.services[i].desc + "</p>"))));
    }


    tab.append(
        "<div class='col-4'>\n" +
        "    <button class='btn btn-blue w-100' onclick=\"moveToReservation('" + shopName + "')\">Đặt lịch</button>\n" +
        "</div>");


    tab = $("#serviceShopReviewTab");

    for (let i = 0; i < shop.reviews.length; i++) {
        tmpInt += shop.reviews[i].star
    }

    tmpInt = tmpInt / shop.reviews.length;

    for (let i = 0; i < 5; i++) {
        if (tmpInt >= 1) {
            tmpString += "<i class='bi-star-fill'></i>\n";
        } else if (tmpInt > 0.5) {
            tmpString += "<i class='bi-star-half'></i>\n";
        } else {
            tmpString += "<i class='bi-star'></i>\n";
        }
        tmpInt--;
    }

    tmpString += "&nbsp; <i class='txt-black border-grey-l'>&nbsp; (" + shop.reviews.length + " đánh giá)</i>";

    tab.prepend("<div class='col-lg-10 col-sm-6 mt-3 txt-pink d-flex align-items-center'>" + tmpString + "</div>");
    $("#serviceShopStar").append(tmpString);
    tmpString = "";

    for (let i = 0; i < shop.reviews.length; i++) {
        tab.append(
            $("<div></div>").addClass("col-12 txt-black mt-3")
                .append(
                    $("<div></div>").addClass("row h-100 bg-white rounded border-pink m-0")
                        .append(
                            $("<div></div>").addClass("col-12")
                                .append(
                                    "<p class='txt-bold txt-lg my-1'><i class='bi-person-circle'></i>&nbsp; " + shop.reviews[i].by + "</p>\n" +
                                    "<p class='txt-bold txt-md mb-1 txt-pink'>" + shop.reviews[i].star.toFixed(1) + "&nbsp; <i class='bi-star-fill'></i></p>\n" +
                                    "<p class='txt-sm'>" + shop.reviews[i].review + "</p>"))));
    }
}

function moveToReservation(shop) {
    window.location.href = "reservation_petOwner.html?shop="+shop;
    return;
}