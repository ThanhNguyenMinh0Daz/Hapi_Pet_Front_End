/*
* url lấy tất cả shop loại dịch vụ : [GET] http://localhost:9090/shop?categoryID=8
* lưu sessionStorage
* VD trả về
* data: {data: ...,
*        message: ...,
*        status: ...}
* */


const vietSpeciesName = {
    Unknown: "Không biết",
    Dog: "Chó",
    Cat: "Mèo",
    Bird: "Chim",
    Fish: "Cá",
    Hamster: "Chuột Hamster",
    Rabbit: "Thỏ"
};

/* MENU */
function ajaxGetAllServiceShop() {
    $.ajax("http://localhost:9090/shop/all/serviceShop",
        {method: "GET", async: false})
        .done(function (data) {
            if (data.status === "success") {
                window.sessionStorage.setItem("serviceShopDTOList", JSON.stringify(data.data));
            } else {
                alert("Lỗi: " + data.message);
            }
        });
}

function fillServiceHome() {
    let serviceShopDTOListString = window.sessionStorage.getItem("serviceShopDTOList");

    if (serviceShopDTOListString === null) {
        /*Run once*/
        ajaxGetAllServiceShop();
        serviceShopDTOListString = window.sessionStorage.getItem("serviceShopDTOList");
    }

    let serviceShopDTOList = JSON.parse(serviceShopDTOListString);

    let serviceShopList = $("#serviceShopList");

    for (let i = 0; i < serviceShopDTOList.length; i++) {
        let serviceShopDTO = serviceShopDTOList[i];

        let shopImg = $("<div>").addClass("square-wrapper border-grey-sub-b")
        if (serviceShopDTO.imageList !== null) {
            shopImg.append(
                $("<div>").addClass("fill-wrapper")
                    .append(
                        $("<img>").attr("src", serviceShopDTO.imageList[0].imageLink)
                            .attr("alt", "shopImg")
                            .addClass("w-100 h-100 img-cover rounded-top")));
        } else {
            shopImg.append(
                $("<div>").addClass("fill-wrapper")
                    .append(
                        $("<img>").attr("src", "")
                            .attr("alt", "shopImg")
                            .addClass("w-100 h-100 img-cover rounded-top")));
        }

        let shopName = $("<p>").addClass("txt-bold txt-hover-orange px-2 mt-2 mb-1")
            .append($("<i>").addClass("bi-shop-window"))
            .append("&nbsp; " + serviceShopDTO.shop.shopName);

        let shopAddress = $("<p>").addClass("txt-smx txt-italic px-2 mb-1")
            .append($("<i>").addClass("bi-geo-alt"))
            .append("&nbsp; " + serviceShopDTO.shop.shopAddress);

        let shopReview = $("<p>").addClass("txt-smx txt-pink border-grey-sub-b px-2 pb-2 mb-0");
        if (serviceShopDTO.reviewList !== null) {
            let tmp = 0;
            for (let j = 0; j < serviceShopDTO.reviewList.length; i++) {
                tmp += shop.reviews[i].star;
            }
            tmp = tmp / serviceShopDTO.reviewList.length;
            for (let j = 0; j < 5; i++) {
                if (tmp >= 1) {
                    shopReview.append($("<i>").addClass("bi-star-fill"));
                } else if (tmp > 0.5) {
                    shopReview.append($("<i>").addClass("bi-star-half"));
                } else {
                    shopReview.append($("<i>").addClass("bi-star"));
                }
                tmp--;
            }
            tmp = null;
            shopReview.append("&nbsp; ")
                .append($("<i>").addClass("txt-black border-grey-l")
                    .append("&nbsp; (" + serviceShopDTO.reviewList.length + " đánh giá)"));
        } else {
            for (let j = 0; j < 5; j++) {
                shopReview.append($("<i>").addClass("bi-star"));
            }
            shopReview.append("&nbsp; ")
                .append($("<i>").addClass("txt-black border-grey-l")
                    .append("&nbsp; (0 đánh giá)"));
        }

        let shopServiceCategory =
            $("<div>").addClass("row txt-bold mx-0 mb-2")
                .attr("id", "serviceShop" + (i + 1) + "Category");
        tmp = new Set();
        for (let j = 0; j < serviceShopDTO.serviceDTOList.length; j++) {
            tmp.add(serviceShopDTO.serviceDTOList[j].category.categoryID);
        }

        for (let categoryID of tmp.values()) {
            switch (categoryID) {
                case 1:
                    shopServiceCategory.addClass("jquery-service-vet")
                        .append(
                            $("<div>").addClass("col-4 mt-2")
                                .append(
                                    $("<p>").addClass("txt-sm text-center rounded border-pink py-1 mb-0")
                                        .append($("<i>").addClass("bi-plus-circle"))
                                        .append("&nbsp; Vet")));
                    break;
                case 2:
                    shopServiceCategory.addClass("jquery-service-groom")
                        .append(
                            $("<div>").addClass("col-4 mt-2")
                                .append(
                                    $("<p>").addClass("txt-sm text-center rounded border-teal py-1 mb-0")
                                        .append($("<i>").addClass("bi-scissors"))
                                        .append("&nbsp; Groom")));
                    break;
                case 3:
                    shopServiceCategory.addClass("jquery-service-hotel")
                        .append(
                            $("<div>").addClass("col-4 mt-2")
                                .append(
                                    $("<p>").addClass("txt-sm text-center rounded border-yellow py-1 mb-0")
                                        .append($("<i>").addClass("bi-building"))
                                        .append("&nbsp; Hotel")));
                    break;
            }
        }

        let serviceShopDisplay =
            $("<div>").attr("id", "serviceShop" + (i + 1))
                .addClass("col-lg-4 col-sm-6 mt-3 jquery-service-shop")
                .append(
                    $("<div>").addClass("rounded border-pink border-hover-shadow h-100")
                        .append(
                            $("<a>").addClass("text-decoration-none txt-black txt-hover-black")
                                .attr("href", "serviceShop_detail.html?shopID=" + serviceShopDTO.shop.shopID)
                                .append(shopImg)
                                .append(shopName)
                                .append(shopAddress)
                                .append(shopReview)
                                .append(shopServiceCategory)));

        serviceShopList.append(serviceShopDisplay);
    }
}

function fillServiceVet() {
    let serviceShopDTOListString = window.sessionStorage.getItem("serviceShopDTOList");

    if (serviceShopDTOListString === null) {
        /*Run once*/
        ajaxGetAllServiceShop();
        serviceShopDTOListString = window.sessionStorage.getItem("serviceShopDTOList");
    }

    let serviceShopDTOList = JSON.parse(serviceShopDTOListString);

    let serviceVetList = $("#serviceVetList");

    for (let i = 0; i < serviceShopDTOList.length; i++) {

        let serviceShopDTO = serviceShopDTOList[i];

        let serviceDTOList = serviceShopDTO.serviceDTOList;
        if (serviceDTOList !== null && serviceDTOList.length > 0) {

            for (let j = 0; j < serviceDTOList.length; j++) {

                let serviceDTO = serviceDTOList[j];
                if (serviceDTO.category.categoryID === 1) {
                    let shopName = $("<p>").addClass("txt-bold txt-hover-orange px-2 mt-2 mb-1")
                        .append($("<i>").addClass("bi-shop-window"))
                        .append("&nbsp; " + serviceShopDTO.shop.shopName);

                    let shopAddress = $("<p>").addClass("txt-smx txt-italic px-2 mb-1")
                        .append($("<i>").addClass("bi-geo-alt"))
                        .append("&nbsp; " + serviceShopDTO.shop.shopAddress);

                    let shopReview = $("<p>").addClass("txt-smx txt-pink px-2 mb-1");
                    if (serviceShopDTO.reviewList !== null && serviceShopDTO.reviewList.length > 0) {
                        let tmp = 0;
                        for (let j = 0; j < serviceShopDTO.reviewList.length; i++) {
                            tmp += shop.reviews[i].star;
                        }
                        tmp = tmp / serviceShopDTO.reviewList.length;
                        for (let j = 0; j < 5; i++) {
                            if (tmp >= 1) {
                                shopReview.append($("<i>").addClass("bi-star-fill"));
                            } else if (tmp > 0.5) {
                                shopReview.append($("<i>").addClass("bi-star-half"));
                            } else {
                                shopReview.append($("<i>").addClass("bi-star"));
                            }
                            tmp--;
                        }
                        tmp = null;
                        shopReview.append("&nbsp; ")
                            .append($("<i>").addClass("txt-black border-grey-l")
                                .append("&nbsp; (" + serviceShopDTO.reviewList.length + " đánh giá)"));
                    } else {
                        for (let j = 0; j < 5; j++) {
                            shopReview.append($("<i>").addClass("bi-star"));
                        }
                        shopReview.append("&nbsp; ")
                            .append($("<i>").addClass("txt-black border-grey-l")
                                .append("&nbsp; (0 đánh giá)"));
                    }

                    let serviceImg = $("<div>").addClass("square-wrapper border-grey-sub-y")
                        .append(
                            $("<div>").addClass("fill-wrapper")
                                .append(
                                    $("<img>").addClass("w-100 h-100 img-cover")
                                        .attr("src", serviceDTO.image.imageLink)
                                        .attr("alt", "serviceImg")));

                    let serviceName = $("<p>").addClass("txt-bold txt-hover-pink px-2 my-2")
                        .append($("<i>").addClass("bi-plus-circle"))
                        .append("&nbsp; " + serviceDTO.service.serviceName);

                    let serviceDesc = $("<p>").addClass("txt-bold txt-sm px-2 mb-2")
                        .append(serviceDTO.service.serviceDescription.slice(0, 150) + " ...");

                    let servicePrice = $("<p>").addClass("txt-smx txt-italic px-2 mb-1")
                        .append(serviceDTO.service.serviceprice);

                    let serviceVetDisplay =
                        $("<div>").addClass("col-lg-4 col-sm-6 mt-3")
                            .append(
                                $("<div>").addClass("rounded border-pink border-hover-shadow h-100")
                                    .append(
                                        $("<a>").addClass("text-decoration-none txt-black txt-hover-black")
                                            .attr("href", "serviceShop_detail.html?shopID=" + serviceShopDTO.shop.shopID)
                                            .append(shopName)
                                            .append(shopAddress)
                                            .append(shopReview)
                                            .append(serviceImg)
                                            .append(serviceName)
                                            .append(serviceDesc)
                                            .append(servicePrice)
                                    )
                            );

                    serviceVetList.append(serviceVetDisplay);
                }
            }
        }
    }
}

function fillServiceGroom() {
    let serviceShopDTOListString = window.sessionStorage.getItem("serviceShopDTOList");

    if (serviceShopDTOListString === null) {
        /*Run once*/
        ajaxGetAllServiceShop();
        serviceShopDTOListString = window.sessionStorage.getItem("serviceShopDTOList");
    }

    let serviceShopDTOList = JSON.parse(serviceShopDTOListString);

    let serviceGroomList = $("#serviceGroomList");

    for (let i = 0; i < serviceShopDTOList.length; i++) {

        let serviceShopDTO = serviceShopDTOList[i];

        let serviceDTOList = serviceShopDTO.serviceDTOList;
        if (serviceDTOList !== null && serviceDTOList.length > 0) {

            for (let j = 0; j < serviceDTOList.length; j++) {

                let serviceDTO = serviceDTOList[j];
                if (serviceDTO.category.categoryID === 2) {
                    let shopName = $("<p>").addClass("txt-bold txt-hover-orange px-2 mt-2 mb-1")
                        .append($("<i>").addClass("bi-shop-window"))
                        .append("&nbsp; " + serviceShopDTO.shop.shopName);

                    let shopAddress = $("<p>").addClass("txt-smx txt-italic px-2 mb-1")
                        .append($("<i>").addClass("bi-geo-alt"))
                        .append("&nbsp; " + serviceShopDTO.shop.shopAddress);

                    let shopReview = $("<p>").addClass("txt-smx txt-pink px-2 mb-1");
                    if (serviceShopDTO.reviewList !== null && serviceShopDTO.reviewList.length > 0) {
                        let tmp = 0;
                        for (let j = 0; j < serviceShopDTO.reviewList.length; i++) {
                            tmp += shop.reviews[i].star;
                        }
                        tmp = tmp / serviceShopDTO.reviewList.length;
                        for (let j = 0; j < 5; i++) {
                            if (tmp >= 1) {
                                shopReview.append($("<i>").addClass("bi-star-fill"));
                            } else if (tmp > 0.5) {
                                shopReview.append($("<i>").addClass("bi-star-half"));
                            } else {
                                shopReview.append($("<i>").addClass("bi-star"));
                            }
                            tmp--;
                        }
                        tmp = null;
                        shopReview.append("&nbsp; ")
                            .append($("<i>").addClass("txt-black border-grey-l")
                                .append("&nbsp; (" + serviceShopDTO.reviewList.length + " đánh giá)"));
                    } else {
                        for (let j = 0; j < 5; j++) {
                            shopReview.append($("<i>").addClass("bi-star"));
                        }
                        shopReview.append("&nbsp; ")
                            .append($("<i>").addClass("txt-black border-grey-l")
                                .append("&nbsp; (0 đánh giá)"));
                    }

                    let serviceImg = $("<div>").addClass("square-wrapper border-grey-sub-y")
                        .append(
                            $("<div>").addClass("fill-wrapper")
                                .append(
                                    $("<img>").addClass("w-100 h-100 img-cover")
                                        .attr("src", serviceDTO.image.imageLink)
                                        .attr("alt", "serviceImg")));

                    let serviceName = $("<p>").addClass("txt-bold txt-hover-teal px-2 my-2")
                        .append($("<i>").addClass("bi-scissors"))
                        .append("&nbsp; " + serviceDTO.service.serviceName);

                    let serviceDesc = $("<p>").addClass("txt-bold txt-sm px-2 mb-2")
                        .append(serviceDTO.service.serviceDescription.slice(0, 150) + " ...");

                    let servicePrice = $("<p>").addClass("txt-smx txt-italic px-2 mb-1")
                        .append(serviceDTO.service.serviceprice);

                    let serviceGroomDisplay =
                        $("<div>").addClass("col-lg-4 col-sm-6 mt-3")
                            .append(
                                $("<div>").addClass("rounded border-pink border-hover-shadow h-100")
                                    .append(
                                        $("<a>").addClass("text-decoration-none txt-black txt-hover-black")
                                            .attr("href", "serviceShop_detail.html?shopID=" + serviceShopDTO.shop.shopID)
                                            .append(shopName)
                                            .append(shopAddress)
                                            .append(shopReview)
                                            .append(serviceImg)
                                            .append(serviceName)
                                            .append(serviceDesc)
                                            .append(servicePrice)
                                    )
                            );

                    serviceGroomList.append(serviceGroomDisplay);
                }
            }
        }
    }
}

function fillServiceHotel() {
    let serviceShopDTOListString = window.sessionStorage.getItem("serviceShopDTOList");

    if (serviceShopDTOListString === null) {
        /*Run once*/
        ajaxGetAllServiceShop();
        serviceShopDTOListString = window.sessionStorage.getItem("serviceShopDTOList");
    }

    let serviceShopDTOList = JSON.parse(serviceShopDTOListString);

    let serviceHotelList = $("#serviceHotelList");

    for (let i = 0; i < serviceShopDTOList.length; i++) {

        let serviceShopDTO = serviceShopDTOList[i];

        let serviceDTOList = serviceShopDTO.serviceDTOList;
        if (serviceDTOList !== null && serviceDTOList.length > 0) {

            for (let j = 0; j < serviceDTOList.length; j++) {

                let serviceDTO = serviceDTOList[j];
                if (serviceDTO.category.categoryID === 3) {
                    let shopName = $("<p>").addClass("txt-bold txt-hover-orange px-2 mt-2 mb-1")
                        .append($("<i>").addClass("bi-shop-window"))
                        .append("&nbsp; " + serviceShopDTO.shop.shopName);

                    let shopAddress = $("<p>").addClass("txt-smx txt-italic px-2 mb-1")
                        .append($("<i>").addClass("bi-geo-alt"))
                        .append("&nbsp; " + serviceShopDTO.shop.shopAddress);

                    let shopReview = $("<p>").addClass("txt-smx txt-pink px-2 mb-1");
                    if (serviceShopDTO.reviewList !== null && serviceShopDTO.reviewList.length > 0) {
                        let tmp = 0;
                        for (let j = 0; j < serviceShopDTO.reviewList.length; i++) {
                            tmp += shop.reviews[i].star;
                        }
                        tmp = tmp / serviceShopDTO.reviewList.length;
                        for (let j = 0; j < 5; i++) {
                            if (tmp >= 1) {
                                shopReview.append($("<i>").addClass("bi-star-fill"));
                            } else if (tmp > 0.5) {
                                shopReview.append($("<i>").addClass("bi-star-half"));
                            } else {
                                shopReview.append($("<i>").addClass("bi-star"));
                            }
                            tmp--;
                        }
                        tmp = null;
                        shopReview.append("&nbsp; ")
                            .append($("<i>").addClass("txt-black border-grey-l")
                                .append("&nbsp; (" + serviceShopDTO.reviewList.length + " đánh giá)"));
                    } else {
                        for (let j = 0; j < 5; j++) {
                            shopReview.append($("<i>").addClass("bi-star"));
                        }
                        shopReview.append("&nbsp; ")
                            .append($("<i>").addClass("txt-black border-grey-l")
                                .append("&nbsp; (0 đánh giá)"));
                    }

                    let serviceImg = $("<div>").addClass("square-wrapper border-grey-sub-y")
                        .append(
                            $("<div>").addClass("fill-wrapper")
                                .append(
                                    $("<img>").addClass("w-100 h-100 img-cover")
                                        .attr("src", serviceDTO.image.imageLink)
                                        .attr("alt", "serviceImg")));

                    let serviceName = $("<p>").addClass("txt-bold txt-hover-yellow px-2 my-2")
                        .append($("<i>").addClass("bi-building"))
                        .append("&nbsp; " + serviceDTO.service.serviceName);

                    let serviceDesc = $("<p>").addClass("txt-bold txt-sm px-2 mb-2")
                        .append(serviceDTO.service.serviceDescription.slice(0, 150) + " ...");

                    let servicePrice = $("<p>").addClass("txt-smx txt-italic px-2 mb-1")
                        .append(serviceDTO.service.serviceprice);

                    let serviceHotelDisplay =
                        $("<div>").addClass("col-lg-4 col-sm-6 mt-3")
                            .append(
                                $("<div>").addClass("rounded border-pink border-hover-shadow h-100")
                                    .append(
                                        $("<a>").addClass("text-decoration-none txt-black txt-hover-black")
                                            .attr("href", "serviceShop_detail.html?shopID=" + serviceShopDTO.shop.shopID)
                                            .append(shopName)
                                            .append(shopAddress)
                                            .append(shopReview)
                                            .append(serviceImg)
                                            .append(serviceName)
                                            .append(serviceDesc)
                                            .append(servicePrice)
                                    )
                            );

                    serviceHotelList.append(serviceHotelDisplay);
                }
            }
        }
    }
}


/* Detail */
function ajaxGetServiceShopByShopID(shopID) {
    $.ajax("http://localhost:9090/shop/dto/serviceShop/" + shopID,
        {method: "GET", async: false})
        .done(function (data) {
            if (data.status === "success") {
                window.sessionStorage.setItem("serviceShopDTO", JSON.stringify(data.data));
            } else {
                alert("Lỗi: " + data.message);
            }
        });
    return window.sessionStorage.getItem("serviceShopDTO");
}

function replaceServiceShopCurrentImg(id) {
    let src = $("#" + id).attr("src");
    $("#serviceShopCurrentImg").attr("src", src);
}

function selectAllService() {
    let serviceShopDTOString = window.sessionStorage.getItem("serviceShopDTO");
    let serviceShopDTO = JSON.parse(serviceShopDTOString);

    for (let i = 0; i < serviceShopDTO.serviceDTOList.length; i++) {
        let service = $("#service" + (i + 1) + "Check");
        if (service.hasClass("btn-pink-sub")) {
            service.trigger("click");
        }
    }
}

function unselectAllService() {
    let serviceShopDTOString = window.sessionStorage.getItem("serviceShopDTO");
    let serviceShopDTO = JSON.parse(serviceShopDTOString);

    for (let i = 0; i < serviceShopDTO.serviceDTOList.length; i++) {
        let service = $("#service" + (i + 1) + "Check");
        if (service.hasClass("btn-pink")) {
            service.trigger("click");
        }
    }
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

function moveToReservation() {
    let serviceShopDTOString = window.sessionStorage.getItem("serviceShopDTO");
    let serviceShopDTO = JSON.parse(serviceShopDTOString);

    let serviceIDList = [];

    for (let i = 0; i < serviceShopDTO.serviceDTOList.length; i++) {
        let serviceNo = $("#service" + (i + 1) + "Check");
        if (serviceNo.hasClass("btn-pink")) {
            serviceIDList.push(serviceShopDTO.serviceDTOList[i].service.serviceID);
        }
    }

    if (serviceIDList.length > 0) {
        window.location.href = "reservation_petOwner_ajax.html?shopID=" + serviceShopDTO.shop.shopID
            + "&serviceIDList=" + encodeURIComponent(JSON.stringify(serviceIDList));
    } else {
        alert("Bạn chưa chọn dịch vụ nào");
    }
}

function fillServiceShopDetail(paramsString) {
    let params = new URLSearchParams(paramsString);

    /*refresh*/
    window.sessionStorage.removeItem("serviceShopDTO");

    let serviceShopDTOString = ajaxGetServiceShopByShopID(params.get("shopID"));

    let serviceShopDTO = JSON.parse(serviceShopDTOString);

    let tmp;

    let imageList = serviceShopDTO.imageList;
    if (imageList !== null && imageList.length > 0) {
        /* img */
        $("#serviceShopCurrentImg").attr("src", imageList[0].imageLink);

        let serviceShopImgList = $("#serviceShopImgList");
        /* img list */
        for (let i = 0; i < imageList.length; i++) {
            serviceShopImgList.append(
                $("<div>").addClass("col-3 p-0 ms-3 me-0")
                    .attr("onclick", "replaceServiceShopCurrentImg('serviceShopImg" + (i + 1) + "')")
                    .append(
                        $("<div>").addClass("square-wrapper")
                            .append(
                                $("<div>").addClass("fill-wrapper")
                                    .append(
                                        $("<img>").addClass("w-100 h-100 img-cover rounded")
                                            .attr("src", imageList[i].imageLink)
                                            .attr("alt", "img" + (i + 1))
                                            .attr("id", "serviceShopImg" + (i + 1))))));
        }
    }


    /* detail */
    $("#serviceShopName").append(serviceShopDTO.shop.shopName);

    $("#serviceShopAddress").append($("<b>").append("Địa chỉ: "))
        .append(serviceShopDTO.shop.shopAddress);

    $("#serviceShopSchedule").append($("<b>").append("Giờ mở cửa: "))
        .append(serviceShopDTO.shop.shopSchedule);

    $("#serviceShopPhone").append($("<b>").append("Điện thoại: "))
        .append(serviceShopDTO.shop.shopPhone);

    $("#serviceShopWeb").append($("<b>").append("Website: "))
        .append(
            $("<a>").addClass("text-decoration-none txt-blue")
                .attr("href", serviceShopDTO.shop.shopWebsite)
                .append(serviceShopDTO.shop.shopWebsite));

    $("#serviceShopDesc").append($("<b>").append("Giới thiệu: "))
        .append($("<br/>"))
        .append(serviceShopDTO.shop.shopDescription);


    /* Service offer */
    let serviceDTOList = serviceShopDTO.serviceDTOList;
    let serviceShopServiceTab = $("#serviceShopServiceTab");
    if (serviceDTOList !== null && serviceDTOList.length > 0) {
        tmp = new Set();
        for (let i = 0; i < serviceDTOList.length; i++) {
            tmp.add(serviceDTOList[i].category.categoryID);
        }

        let serviceShopServiceOffer = $("#serviceShopServiceOffer");

        for (let categoryID of tmp.values()) {
            let category = $("<div>").addClass("col-4");

            switch (categoryID) {
                case 1:
                    category.append(
                        $("<p>").addClass("text-center rounded border-pink py-1 mb-0")
                            .append($("<i>").addClass("bi-plus-circle"))
                            .append("&nbsp; Thú y"));
                    break;
                case 2:
                    category.append(
                        $("<p>").addClass("text-center rounded border-teal py-1 mb-0")
                            .append($("<i>").addClass("bi-scissors"))
                            .append("&nbsp; Grooming-spa"));
                    break;
                case 3:
                    category.append(
                        $("<p>").addClass("text-center rounded border-yellow py-1 mb-0")
                            .append($("<i>").addClass("bi-building"))
                            .append("&nbsp; Khách sạn"));
                    break;
            }

            serviceShopServiceOffer.append(category);
        }

        /* service tab  */

        for (let i = 0; i < serviceDTOList.length; i++) {

            let serviceDescName = $("<p>").addClass("txt-bold mb-1 py-1");
            switch (serviceDTOList[i].category.categoryID) {
                case 1:
                    serviceDescName.addClass("border-pink-b")
                        .append($("<i>").addClass("bi-plus-circle"))
                        .append("&nbsp; " + serviceDTOList[i].service.serviceName);
                    break;
                case 2:
                    serviceDescName.addClass("border-teal-b")
                        .append($("<i>").addClass("bi-scissors"))
                        .append("&nbsp; " + serviceDTOList[i].service.serviceName);
                    break;
                case 3:
                    serviceDescName.addClass("border-yellow-b")
                        .append($("<i>").addClass("bi-building"))
                        .append("&nbsp; " + serviceDTOList[i].service.serviceName);
                    break;
            }

            serviceShopServiceTab.prepend(
                $("<div>").addClass("col-12 txt-black mt-3")
                    .append(
                        $("<div>").addClass("row rounded border-pink m-0 bg-white")
                            .attr("id", "service" + (i + 1))
                            .append(
                                $("<div>").addClass("col-lg-2 col-sm-4")
                                    .append(
                                        $("<div>").addClass("row h-100")
                                            .append(
                                                $("<div>").addClass("col-3 btn rounded-0 rounded-end justify-content-center d-flex align-items-center p-0 btn-pink-sub")
                                                    .attr("id", "service" + (i + 1) + "Check")
                                                    .attr("onclick", "toggleWhitePinkBG('service" + (i + 1) + "', 'service" + (i + 1) + "Check')")
                                                    .append($("<i>").addClass("bi-check2 txt-lgxx txt-bold")))
                                            .append(
                                                $("<div>").addClass("col-9 p-0")
                                                    .append(
                                                        $("<div>").addClass("square-wrapper h-100 border-pink-x")
                                                            .append(
                                                                $("<div>").addClass("fill-wrapper")
                                                                    .append(
                                                                        $("<img>").addClass("w-100 h-100 img-cover")
                                                                            .attr("src", serviceDTOList[i].image.imageLink)))))))
                            .append(
                                $("<div>").addClass("col-lg-10 col-sm-8")
                                    .append(serviceDescName)
                                    .append(
                                        $("<p>").addClass("txt-bold txt-md mb-1")
                                            .append(serviceDTOList[i].service.servicePrice))
                                    .append(
                                        $("<p>").addClass("txt-sm mb-1")
                                            .append(serviceDTOList[i].service.serviceDescription)))));
        }
    } else {
        serviceShopServiceTab.html("")
            .append(
                $("<div>").addClass("col-12")
                    .append(
                        $("<p>").addClass("txt-bold text-center")
                            .append("No service available!")));
    }


    /* review */
    let reviewList = serviceShopDTO.reviewList;
    let serviceShopReviewTab = $("#serviceShopReviewTab");
    let serviceShopStar = $("#serviceShopStar");
    let reviewStar = $("<div>").addClass("col-lg-10 col-sm-6 mt-3 txt-pink d-flex align-items-center");
    if (reviewList !== null && reviewList.length > 0) {
        tmp = 0;
        for (let i = 0; i < reviewList.length; i++) {
            tmp += reviewList[i].star
        }
        tmp = tmp / reviewList.length;
        for (let i = 0; i < 5; i++) {
            if (tmp >= 1) {
                reviewStar.append($("<i>").addClass("bi-star-fill"));
                serviceShopStar.append($("<i>").addClass("bi-star-fill"));
            } else if (tmp > 0.5) {
                reviewStar.append($("<i>").addClass("bi-star-half"));
                serviceShopStar.append($("<i>").addClass("bi-star-half"));
            } else {
                reviewStar.append($("<i>").addClass("bi-star"));
                serviceShopStar.append($("<i>").addClass("bi-star"));
            }
            tmp--;
        }

        reviewStar.append("&nbsp; ")
            .append(
                $("<i>").addClass("txt-black border-grey-l")
                    .append("&nbsp; (" + reviewList.length + " đánh giá)"));
        serviceShopStar.append("&nbsp; ")
            .append(
                $("<i>").addClass("txt-black border-grey-l")
                    .append("&nbsp; (" + reviewList.length + " đánh giá)"));

        serviceShopReviewTab.prepend(reviewStar);

        for (let i = 0; i < reviewList.length; i++) {
            serviceShopReviewTab
                .append(
                    $("<div>").addClass("col-12 txt-black mt-3")
                        .append(
                            $("<div>").addClass("row h-100 bg-white rounded border-pink m-0")
                                .append(
                                    $("<div>").addClass("col-12")
                                        .append(
                                            $("<p>").addClass("txt-bold txt-lg my-1")
                                                .append($("<i>").addClass("bi-person-circle"))
                                                .append("&nbsp; " + reviewList[i].reviewerID))
                                        .append(
                                            $("<p>").addClass("txt-bold txt-md mb-1 txt-pink")
                                                .append($("<i>").addClass("bi-star-fill"))
                                                .append("&nbsp; " + reviewList[i].star))
                                        .append(
                                            $("<p>").addClass("txt-sm")
                                                .append(reviewList[i].reviewContent)))));
        }
    } else {
        for (let i = 0; i < 5; i++) {
            reviewStar.append($("<i>").addClass("bi-star"));
            serviceShopStar.append($("<i>").addClass("bi-star"));
        }
        reviewStar.append("&nbsp; ")
            .append(
                $("<i>").addClass("txt-black border-grey-l")
                    .append("&nbsp; (0 đánh giá)"));
        serviceShopStar.append("&nbsp; ")
            .append(
                $("<i>").addClass("txt-black border-grey-l")
                    .append("&nbsp; (0 đánh giá)"));
        serviceShopReviewTab.prepend(reviewStar);
    }
}

function ajaxSendReview() {
}

/* Reservation */
function fillReservationDetail(paramsString) {
    let params = new URLSearchParams(paramsString);

    /*refresh*/
    window.sessionStorage.removeItem("serviceShopDTO");

    let account = JSON.parse(accountString);

    let serviceShopDTO = JSON.parse(ajaxGetServiceShopByShopID(params.get("shopID")));

    let serviceIDList = JSON.parse(decodeURIComponent(params.get("serviceIDList")));

    let serviceDTOList = serviceShopDTO.serviceDTOList;

    $("#bookerName").val(account.displayName);

    $("#bookerPhone").val(account.phone);

    $("#bookedLocation").val(serviceShopDTO.shop.shopName);

    let serviceHolder = $("#serviceHolder");
    let tmp = 0;

    /* fill service */
    for (let serviceDTO of serviceDTOList) {
        if (serviceIDList.includes(serviceDTO.service.serviceID)) {
            /*numbering*/
            tmp++;
            let bookingDetailNo =
                $("<div>").addClass("row border-teal-b align-items-center txt-lg mx-0")
                    .append(
                        $("<div>").addClass("col-11")
                            .append(
                                $("<p>").addClass("txt-teal txt-bold mb-0")
                                    .append("Dịch vụ " + tmp)))
                    /*.append(
                        $("<div>").addClass("col-1 btn btn-pink rounded-0")
                            .attr("onClick", "hideItem('service" + tmp + "')")
                            .attr("id", "close" + tmp)
                            .append(
                                $("<i>").addClass("bi-x-lg")))*/;

            /*select service*/
            let selectService =
                $("<select>").addClass("rounded border-grey w-100 bg-white-sub mt-1 py-1 px-2")
                    .attr("name", "serviceChoose" + tmp);
            for (let tmpDTO of serviceDTOList) {
                let option =
                    $("<option>").attr("value", tmpDTO.service.serviceID)
                        .append(tmpDTO.service.serviceName);

                if (serviceDTO.service.serviceID
                    .localeCompare(tmpDTO.service.serviceID) === 0) {
                    option.attr("selected", "selected");
                }

                selectService.append(option);
            }

            /*select pet*/
            let selectPetSegment =
                $("<div>").addClass("row mt-1 align-items-center")
                    .attr("id", "service" + tmp + "petChoose");
            let btnNewPet =
                $("<button>").addClass("btn btn-teal w-100")
                    .append("Thêm bé");
            let petDTOList = JSON.parse(ajaxGetPet(account.accountID));
            if (petDTOList !== null && petDTOList.length > 0) {
                let petList =
                    $("<select>").addClass("rounded border-grey w-100 bg-white-sub py-1 px-2");

                for (let petDTO of petDTOList) {
                    petList.append(
                        $("<option>").attr("value", petDTO.petID)
                            .append(vietSpeciesName[petDTO.species.speciesName] + " - " + petDTO.pet.petName)
                    );
                }

                btnNewPet.attr("type", "button")
                    .attr("onclick", "chooseNewPet('service" + tmp + "petChoose', " + tmp + ")");

                selectPetSegment.append(
                    $("<div>").addClass("col-9")
                        .attr("id", "petChoose" + tmp + "-1")
                        .append(petList));
            } else {
                let message =
                    $("<div>").addClass("col-7")
                        .append(
                            $("<p>").addClass("txt-bold txt-pink mb-0")
                                .append("Bạn chưa có bé nào.<br/>Bạn cần ít nhất 1 bé để đặt dịch vụ"));

                let btnRefresh =
                    $("<div>").addClass("col-2")
                        .append(
                            $("<button>").addClass("btn btn-orange w-100")
                                .attr("onclick", "refreshPetList('" + account.accountID + "', '" + paramsString + "')")
                                .append($("<i>").addClass("bi-arrow-clockwise")));

                selectPetSegment.append(message)
                    .append(btnRefresh);

                btnNewPet.attr("onclick", "window.open('myPet_petOwner.html')");
            }
            selectPetSegment.append(
                $("<div>").addClass("col-3")
                    .append(btnNewPet)
                    .append($("<input>").attr("type", "hidden").val(1)));

            /*book datetime*/
            let bookDatetime =
                $("<div>").addClass("col-12 mt-2")
                    .append(
                        $("<div>").addClass("row mt-1 align-items-center")
                            .append(
                                $("<div>").addClass("col-6")
                                    .append(
                                        $("<label>").addClass("txt-bold txt-black")
                                            .append("Hẹn từ"))
                                    .append(
                                        $("<input>").addClass("rounded border-grey w-100 bg-white-sub py-1 px-2 mt-1")
                                            .attr("type", "datetime-local")
                                            .attr("name", "dateTimeFrom")
                                            .val(getCurrentDateTimestampString() + "T08:00:00")))
                            .append(
                                $("<div>").addClass("col-6")
                                    .append(
                                        $("<label>").addClass("txt-bold txt-black")
                                            .append("Hẹn Đến"))
                                    .append(
                                        $("<input>").addClass("rounded border-grey w-100 bg-white-sub py-1 px-2 mt-1")
                                            .attr("type", "datetime-local")
                                            .attr("name", "dateTimeTo")
                                            .val(getCurrentDateTimestampString() + "T22:00:00"))));


            /*problem & note*/
            let problemNote =
                $("<div>").addClass("col-12 mt-2")
                    .append(
                        $("<label>").addClass("txt-bold txt-black")
                            .append("Ghi chú"))
                    .append(
                        $("<textarea>").addClass("rounded border-grey w-100 bg-white-sub py-1 px-2 mt-1")
                            .attr("rows", "3")
                            .attr("placeholder", "Vấn đề của bạn")
                            .attr("style", "resize: none;"));

            /*final*/
            let bookingDetail =
                $("<div>").addClass("col-12 mt-3")
                    .attr("id", "service" + tmp)
                    .append(
                        $("<div>").addClass("rounded border-teal")
                            .append(bookingDetailNo)
                            .append(
                                $("<div>").addClass("row align-items-center pb-3 mx-0")
                                    .append(
                                        $("<div>").addClass("col-12 mt-2")
                                            .append(
                                                $("<label>").addClass("txt-bold txt-black")
                                                    .append("Dịch vụ muốn đặt")
                                            )
                                            .append(selectService)
                                    )
                                    .append(
                                        $("<div>").addClass("col-12 mt-2")
                                            .append(
                                                $("<label>").addClass("txt-bold txt-black")
                                                    .append("Bạn đặt cho bé nào")
                                            )
                                            .append(selectPetSegment))
                                    .append(bookDatetime)
                                    .append(problemNote)));

            serviceHolder.append(bookingDetail);
        }
    }

    // serviceHolder.append(
    //     $("<div>").addClass("col-12 mt-3")
    //         .append(
    //             $("<button>").addClass("btn btn-teal w-100")
    //                 .attr("onclick", "")
    //                 .append("Thêm dịch vụ")
    //         )
    // )
}

function refreshPetList(accountID, paramsString) {
    let petDTOList = JSON.parse(ajaxGetPet(accountID));

    if (petDTOList !== null && petDTOList.length > 0) {
        $("#serviceHolder").html("");
        fillReservationDetail(paramsString)
    }
}

function chooseNewPet(selectPetSegmentID, tmp) {
    let selectPetSegment = $("#" + selectPetSegmentID);


    let listNoHidden = $("#" + selectPetSegmentID + " input[type='hidden']");
    let listNo = parseInt(listNoHidden.val()) + 1;
    listNoHidden.val(listNo);

    let petList =
        $("<select>").addClass("rounded border-grey w-100 bg-white-sub py-1 px-2");

    let petDTOList = JSON.parse(window.sessionStorage.getItem("petDTOList"));

    if (listNo >= petDTOList.length) {
        $("#" + selectPetSegmentID + " button.btn-teal").attr("disabled", "disabled");
    }

    let selectedList = new Set();
    for (let i = 1; i < listNo; i++) {
        selectedList.add($("#" + selectPetSegmentID + " div[id='petChoose" + tmp + "-" + i + "'] select").val());
    }

    for (let petDTO of petDTOList) {
        let selected = false;
        if (!selected && !selectedList.has(petDTO.petID)) {
            petList.append(
                $("<option>").attr("value", petDTO.petID)
                    .attr("selected", "selected")
                    .append(vietSpeciesName[petDTO.species.speciesName] + " - " + petDTO.pet.petName));
        } else {
            petList.append(
                $("<option>").attr("value", petDTO.petID)
                    .append(vietSpeciesName[petDTO.species.speciesName] + " - " + petDTO.pet.petName));
        }
    }

    let btnRemovePetChoose =
        $("<div>").addClass("col-3 mt-2")
            .attr("id", "petChooseBtn" + tmp + "-" + listNo)
            .append(
                $("<button>").addClass("btn btn-pink w-100")
                    .append($("<i>").addClass("bi-x-lg"))
                    .attr("onclick", "removeChooseNewPet('" + selectPetSegmentID + "', " +
                        "'petChoose" + tmp + "-" + listNo + "', 'petChooseBtn" + tmp + "-" + listNo + "')"));

    selectPetSegment.append(
        $("<div>").addClass("col-9 mt-2")
            .attr("id", "petChoose" + tmp + "-" + listNo)
            .append(petList))
        .append(btnRemovePetChoose);
}

function removeChooseNewPet(selectPetSegmentID, selectPetID, selectPetRemoveBtnID) {
    let listNoHidden = $("#" + selectPetSegmentID + " input[type='hidden']");
    let listNo = parseInt(listNoHidden.val()) - 1;
    listNoHidden.val(listNo);

    let petDTOList = JSON.parse(window.sessionStorage.getItem("petDTOList"));

    if (listNo < petDTOList.length) {
        $("#" + selectPetSegmentID + " button.btn-teal").removeAttr("disabled");
    }

    $("#" + selectPetID).remove();
    $("#" + selectPetRemoveBtnID).remove();
}

function moveToReservationComplete(paramsString) {
    let params = new URLSearchParams(paramsString);
    window.location.replace("datLichThanhCong.html?shopID=" + params.get("shopID"));
}

function fillReservationCompletePage(paramsString) {
    let params = new URLSearchParams(paramsString);

    let serviceShopDTO = JSON.parse(ajaxGetServiceShopByShopID(params.get("shopID")));

    $("#reserveShopName").append(serviceShopDTO.shop.shopName)
}