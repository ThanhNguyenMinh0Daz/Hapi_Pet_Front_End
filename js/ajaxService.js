/*
* url lấy tất cả shop loại dịch vụ : [GET] http://localhost:9090/shop?categoryID=8
* lưu sessionStorage
* VD trả về
* data: {data: ...,
*        message: ...,
*        status: ...}
* */

/* MENU */
function ajaxGetAllServiceShop() {
    $.ajax("http://localhost:9090/shop/all/serviceShop",
        {method: "GET", async: false})
        .done(function (data) {
            if (data.status === "success") {
                window.sessionStorage.setItem("serviceShopDTOList", JSON.stringify(data.data));
            } else {
                alert('Lỗi');
            }
        });
}

function ajaxGetAllVetService() {
}

function ajaxGetAllGroomService() {
}

function ajaxGetAllHotelService() {
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
            alert("No img")
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
        if (tmp.has(1)) {
            shopServiceCategory.addClass("jquery-service-vet")
                .append(
                    $("<div>").addClass("col-4 mt-2")
                        .append(
                            $("<p>").addClass("txt-sm text-center rounded border-pink py-1 mb-0")
                                .append($("<i>").addClass("bi-plus-circle"))
                                .append("&nbsp; Vet")));
        }
        if (tmp.has(2)) {
            shopServiceCategory.addClass("jquery-service-groom")
                .append(
                    $("<div>").addClass("col-4 mt-2")
                        .append(
                            $("<p>").addClass("txt-sm text-center rounded border-teal py-1 mb-0")
                                .append($("<i>").addClass("bi-scissors"))
                                .append("&nbsp; Groom")));
        }
        if (tmp.has(3)) {
            shopServiceCategory.addClass("jquery-service-hotel")
                .append(
                    $("<div>").addClass("col-4 mt-2")
                        .append(
                            $("<p>").addClass("txt-sm text-center rounded border-yellow py-1 mb-0")
                                .append($("<i>").addClass("bi-building"))
                                .append("&nbsp; Hotel")));
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
    /*onload body, kiếm theo id điền vào chỗ trống*/
    let serviceList = ajaxGetAllVetService();
}

function fillServiceGroom() {
    /*onload body, kiếm theo id điền vào chỗ trống*/
    let serviceList = ajaxGetAllGroomService();
}

function fillServiceHotel() {
    /*onload body, kiếm theo id điền vào chỗ trống*/
    let serviceList = ajaxGetAllHotelService();
}


/* Detail */
function ajaxGetServiceShopByShopID(shopID) {
    $.ajax("http://localhost:9090/shop/dto/serviceShop/" + shopID,
        {method: "GET", async: false})
        .done(function (data) {
            if (data.status === "success") {
                window.sessionStorage.setItem("serviceShopDTO", JSON.stringify(data.data));
            } else {
                alert('Lỗi');
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

function moveToReservation(shopID) {
    window.location.href = "reservation_petOwner.html?shopID=" + shopID;
}

function fillServiceShopDetail(paramsString) {
    let params = new URLSearchParams(paramsString);

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
    if (serviceDTOList !== null && serviceDTOList.length > 0) {
        tmp = new Set();
        for (let i = 0; i < serviceDTOList.length; i++) {
            tmp.add(serviceDTOList[i].category.categoryID);
        }

        let serviceShopServiceOffer = $("#serviceShopServiceOffer");

        for (let i = 0; i < tmp.size; i++) {
            let category = $("<div>").addClass("col-4");

            switch (tmp[i]) {
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
        let serviceShopServiceTab = $("#serviceShopServiceTab");

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
                        .append($("<i>").addClass("bi-plus-circle"))
                        .append("&nbsp; " + serviceDTOList[i].service.serviceName);
                    break;
                case 3:
                    serviceDescName.addClass("border-yellow-b")
                        .append($("<i>").addClass("bi-plus-circle"))
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
                                        $("<p>").addClass("txt-sm")
                                            .append(serviceDTOList[i].service.serviceDescription)))));
        }
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