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

function filterService() {
    let filterVet = $("#serviceVet").hasClass("btn-pink");
    let filterGroom = $("#serviceGroom").hasClass("btn-pink");
    let filterHotel = $("#serviceHotel").hasClass("btn-pink");

    if (filterVet && filterGroom && filterHotel) {
        unfilterService();
        btnPinkFocus('serviceAll');
        btnPinkUnfocus('serviceVet');
        btnPinkUnfocus('serviceGroom');
        btnPinkUnfocus('serviceHotel');
        return;
    }

    for (let i = 1; i < 6; i++) {
        $("#service" + i).hide();
    }

    if (filterVet) {
        $("#service2").show();
        $("#service3").show();
        $("#service4").show();
        $("#service5").show();
    }

    if (filterGroom) {
        $("#service3").show();
        $("#service4").show();
        $("#service5").show();
    }

    if (filterHotel) {
        $("#service1").show();
        $("#service3").show();
        $("#service5").show();
    }
}

function unfilterService() {
    for (let i = 1; i < 6; i++) {
        $("#service" + i).show();
    }
}

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
}

function fillLoginRegister(nav) {
    nav.append(
        "<div class='row m-0'>\n" +
        "   <div class='col-6 text-center'>\n" +
        "       <a href='login_petOwner_ajax.html' class='btn btn-pink w-100'>\n" +
        "           ????ng nh???p\n" +
        "       </a>\n" +
        "   </div>\n" +
        "   <div class='col-6 text-center'>\n" +
        "       <a href='login_petOwner_ajax.html' class='btn btn-teal w-100'>\n" +
        "           ????ng k??\n" +
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
        "          href='account_petOwner.html'>T??i kho???n</a></li>\n" +
        "   <li><a class='dropdown-item'\n" +
        "          href='cart_petOwner.html'>Gi??? h??ng</a></li>\n" +
        "   <li><a class='dropdown-item'\n" +
        "          href='order_history_petOwner.html'>L???ch s??? mua h??ng</a></li>\n" +
        "   <li><a class='dropdown-item'\n" +
        "          href='reservation_history_petOwner.html'>L???ch s??? ?????t l???ch</a></li>\n" +
        "   <li><a class='dropdown-item'\n" +
        "          href='javascript:location.reload();' onclick='logout()'>????ng xu???t</a></li>\n" +
        "</ul>"
    );
}

function checkExistingLogin() {
    let accountNav = $("#accountNav");

    if (accountString === null) {
        fillLoginRegister(accountNav);
    } else {
        fillAccountNav(accountNav, accountString);
    }
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

function maxDateCurrentDate(id) {
    let date = new Date();

    let day = date.getDate();
    if (day < 10) { day = "0" + day; }
    let month = date.getMonth();
    if (month < 10) { month = "0" + month; }
    let year = date.getFullYear();

    $("#" + id).attr("max", day + "-" + month + "-" + year);
}

/* account */

/* detail service shop*/

const symbols = {
    vet: "bi-plus-circle",
    groom: "bi-scissors",
    hotel: "bi-building"
};

const borders = {
    vet: "border-pink-b",
    groom: "border-teal-b",
    hotel: "border-yellow-b"
};

const shops = {
    CSCHHCM: {
        name: "Tr??ng gi??? ch?? m??o HCM",
        address: "338/3/2 N?? Trang Long, P.13, B??nh Th???nh, TP.HCM",
        phone: "08 3456 9721",
        website: "https://giuchomeo.com",
        worktime: "07:00 - 21:00",
        img: ["https://giuchomeo.com/wp-content/uploads/2021/02/IMG_20210130_130947_756-scaled.jpg",
            "https://lh5.googleusercontent.com/p/AF1QipMks06In94yXd-O5f66UveRUtaR2Li1p2ZzRWmy=w408-h408-k-no",
            "https://giuchomeo.com/wp-content/uploads/2021/02/20210130_085431-scaled.jpg",
            "https://giuchomeo.com/wp-content/uploads/2021/02/IMG_20210201_125730_110-scaled.jpg"],
        desc: "D???ch v??? kh??ch s???n Tr??ng Gi??? Ch?? M??o HCM t??? h??o l?? m???t trong nh???ng kh??ch s???n ch??m s??c th?? c??ng chuy??n nghi???p, t???n t??nh t???i HCM v???i m?? h??nh ph??ng ???c hi???n ?????i. Kh??ch s???n Tr??ng Gi??? Ch?? M??o lu??n ?????m b???o ??i???u ki???n ??nh s??ng v?? v??? sinh theo ti??u chu???n ch???t l?????ng. Khu v???c ph??ng ???c ???????c gi??m s??t b???i h??? th???ng camera 24/7 ?????m b???o qu?? tr??nh v???n h??nh an to??n t???i ??a.\nTr??ng Gi??? Ch?? M??o HCM lu??n mong mu???n cung c???p m??i tr?????ng s???ch s???, an to??n v?? tho???i m??i cho th?? c??ng. Ch??nh v?? v???y, ch??? ????? v?? quy tr??nh ch??m s??c cho ch?? m??o c??ng lu??n ???????c ch??ng t??i ch?? tr???ng v?? c???i thi???n th?????ng xuy??n.",
        serviceOffer: ["hotel"],
        services: [{
            name: "Tr??ng ch??",
            type: "hotel",
            desc: "Ph??ng ri??ng bi???t, ???????c v??? sinh h??ng ng??y. M???i ph??ng ?????u c?? qu???t h??t tho??ng kh?? v?? ????n.\n??n s??ng: Pate th???t & rau c???.\n??n tr??a: H???t dinh d?????ng Ganador.\n??n t???i: Pate th???t & rau c???.\n???????c ra s??n ch???y nh???y ????? kh??ng kh?? ch???u, cu???ng ch??n. C??c b?? c??n trong khi ra s??n ch??i s??? c?? th???i gian v??? sinh ri??ng.",
            img: "https://giuchomeo.com/wp-content/uploads/2021/02/Images-video.jpg",
            price: "T??? 90.000 ?? / 1 ng??y",
        }, {
            name: "Gi??? m??o",
            type: "hotel",
            desc: "Ph??ng ri??ng bi???t, ???????c v??? sinh h??ng ng??y. M???i ph??ng ?????u c?? qu???t h??t tho??ng kh?? v?? ????n.\n??n s??ng: Pate c?? & rau c??? m??o.\n??n tr??a: H???t dinh d?????ng Minimo, Catsran.\n??n t???i: Pate c?? & rau c???.\nLu??n ???????c y??u th????ng vu???t ve ????? kh??ng s??? khi l??? ch???. V??? sinh b???ng c??t th??m h????ng coffee d??? ch???u",
            img: "https://giuchomeo.com/wp-content/uploads/2021/02/5F4118B6-DE19-4E95-83C2-A2311D15DDE9.jpg",
            price: "T??? 80.000 ?? / 1 ng??y",
        }],
        reviews: [{
            by: "Ngoc Nghia Nguyen",
            review: "Ch??? ch??? ??? ????y r???t c?? t??m, khu v???c ch??m c??c b?? c???c k?? s???ch s???, tho??ng, ch??? ????? ??n u???ng cho m???y b?? c??ng ok n???a, c???p nh???t t??nh tr???ng h???ng ng??y.",
            star: 5
        }, {
            by: "Quynh Ngan",
            review: "C?? ch??? r???t c?? t??m th????ng m???y b?? l???m n??n g???i r???t y??n t??m. Ph??ng c???a m???y b?? s???ch s??? tho??ng m??t, c?? ch??? cho ??n ?????y ?????. T??? nay ??i ????u xa ??t ng??y c?? ch??? g???i tr??? r???i hihi",
            star: 5
        }, {
            by: "Th??i Duy Khang",
            review: "Tuy l?? ??? trong h???m nh??ng c??ng r???t d??? t??m, tr??ng gi??? t???i nh?? n??n m??nh r???t y??n t??m, 2 b???n v?? gia ????nh r???t d??? th????ng v?? hi???u kh??ch, nh?? tr???n cao tho??ng m??t, c?? s??n nh??? kinh doanh th??m d???ch v??? g???i ?????u l??m m??ng cho c??c b?? ra ch??i lu??n ???? n??i chung l?? h???p l?? v??? m???i th??? v?? quan tr???ng l?? gi?? c??? r???t ok",
            star: 5
        }]
    },
    PKTHYVietpet: {
        name: "Ph??ng Kh??m Th?? Y Vietpet",
        address: "247 L?? Quang ?????nh, P.7, B??nh Th???nh, TP.HCM",
        phone: "090 713 76 73",
        website: "https://phong-kham-thu-y-vietpet.business.site/",
        worktime: "T2 - CN: M??? c??? ng??y",
        img: ["https://lh3.googleusercontent.com/p/AF1QipPN0ZkZb5UPre_JJx0SEK9uWA2sH9iQfNplk5BI=w1080-h608-p-no-v0"],
        desc: "",
        serviceOffer: ["vet"],
        services: [{
            name: "Ti??m vaccine",
            type: "vet",
            desc: "Ti??m ????? c??c lo???i vaccine c??? b???n cho b?? kh???e m???nh.",
            img: "data:image/jpeg;base64,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",
            price: "T??? 150.000 ?? / 1 l???n",
        }],
        reviews: [{
            by: "D??ng N",
            review: "Nh??n vi??n nhi???t t??nh. C?? l???ch nh???c m???i khi t???i h???n ti??m ch??ch.",
            star: 4
        }, {
            by: "Nguy???n H",
            review: "T???t",
            star: 4
        }, {
            by: "Vinhvinh N",
            review: "",
            star: 5
        }]
    },
    TYProCare: {
        name: "TH?? Y PROCARE",
        address: "98C Phan ????ng L??u, P.3, Ph?? Nhu???n, TP.HCM",
        phone: "(028) 35 511 002",
        website: "https://thuyprocare.com",
        worktime: "T??? 8h00 - 20h00 h???ng ng??y - Ng??y l??? & ch??? nh???t: T??? 8h00 - 16h00.",
        img: ["https://thuyprocare.com/upload/images/GI%E1%BB%9AI%20THI%E1%BB%86U/Ph%C3%B2ng-kh%C3%A1m-th%C3%BA-y-procare.jpg",
            "https://thuyprocare.com/upload/hinhanh/034756856335434_1349x450.jpg",
            "https://thuyprocare.com/upload/hinhanh/704993368852694_1349x450.jpg",
            "https://thuyprocare.com/upload/hinhanh/064738477621145_1349x450.jpg"],
        desc: "Ph??ng kh??m th?? y Procare | Tr???m th?? y uy t??n t???i Tphcm B??nh Th???nh cung c???p d???ch v??? ??i???u tr??? ch??m s??c th?? c??ng, ch?? m??o, v???i ?????i ng?? B??c S?? uy t??n chuy??n nghi???p.",
        serviceOffer: ["vet", "groom"],
        services: [{
            name: "TRI???T S???N CH?? M??O",
            type: "vet",
            desc: "V???i ?????i ng?? b??c s?? th?? y ???????c ????o t???o chuy??n s??u v?? kinh nghi???m h??nh ngh??? l??u n??m, Procare ???? v?? ??ang tri???n khai d???ch v??? tri???t s???n ch?? m??o - v???i ti??u ch??: nhanh ch??ng, an to??n, tr??ch nhi???m; ?????m b???o cam k???t s??? gi??p th?? c??ng c???a b???n c?? m???t cu???c ph???u thu???t tri???t s???n ch?? m??o th??nh c??ng, kh??ng ??au.",
            img: "https://thuyprocare.com/upload/images/PH%E1%BA%A8U%20THU%E1%BA%ACT/dich-vu-triet-san-cho-meo.jpg",
            price: "T??? 50.000 / 1 l?????t"
        }, {
            name: "X??t nghi???m ch?? m??o",
            type: "vet",
            desc: "Trung t??m x??t nghi???m ch?? m??o Procare ra ?????i gi??p vi???c ch???n ??o??n b???nh cho th?? c??ng ????? ????a ra ph??c ????? ??i???u tr??? ph?? h???p nh???t." +
                "<br/>Bao g???m: X??t nghi???m nhanh ph???c v??? ph???u thu???t. X??t nghi???m k?? sinh tr??ng. X??t nghi???m m??u sinh l??, sinh h??a. X??t nghi???m da soi k?? sinh tr??ng, n???m???",
            img: "https://thuyprocare.com/upload/images/X%C3%89T%20NGHI%E1%BB%86M/trung-tam-xet-nghiem-cho-meo.jpg",
            price: "T??? 100.000 ?? / 1 l?????t"
        }, {
            name: "C???t t???a l??ng ch?? Poodle TpHCM",
            type: "groom",
            desc: "?????n v???i Procare th?? c??ng c???a b???n s??? c?? tr???i nghi???m ho??n to??n m???i v??? vi???c ch??m s??c c?? th???. Kh??ng ch??? ????n gi???n l?? c???t t???a l??ng m?? m?? th?? c??ng c???a b???n c??n ???????c h????ng nhi???u d???ch v??? ??i k??m kh??c n???a.",
            img: "https://thuyprocare.com/upload/images/Screenshot_1(2).png",
            price: "T??? 35.000 ?? / 1 l?????t"
        }],
        reviews: [{
            by: "L?? Ph?????c Sang",
            review: "Very good ????????",
            star: 5
        }, {
            by: "C??c Nguy???n",
            review: "H??m m??nh ??em m??o ?????n th?? ph??ng kh??m ch??a m??? c???a h???n, ch??? nh???n kh??m th?? c??ng r???i t?? v???n qua ??i???n tho???i. Sau ???? ch??? s??? ?????n ????n b?? v???. B??c s?? ?????nh t?? v???n t???n t??nh, cung c???p th??ng tin v?? gi???i ????p nh???ng th???c m???c c???a m??nh. C??c b???n nh??n vi??n th??n thi???n v?? nhanh nh???n. Chi ph?? kh??m v?? thu???c h???p l??.",
            star: 4
        }, {
            by: "Tuan Le",
            review: "Good services, nice staff.",
            star: 5
        }]
    },
    DRBullSpa: {
        name: "DR BULL SPA",
        address: "205 Nguy???n C?? Trinh, P.Nguy???n C?? Trinh, Q.1, TP.HCM",
        phone: "(08) 66817913",
        website: "https://drbull.vn",
        worktime: "9AM ??? 8:30PM",
        img: ["https://lh5.googleusercontent.com/p/AF1QipM-Yf4L_9pICC2z8yeTLrDhpmWB73Boyn2JLvE6=w426-h240-k-no",
            "https://drbull.vn/wp-content/uploads/2019/05/2020-10-08-15_20_13.4910700-e1602145934929-1024x986.jpg",
            "https://drbull.vn/wp-content/uploads/2017/09/vet4-1024x661.jpg"],
        desc: "Dr. Bull l?? th????ng hi???u th?? y v?? d???ch v??? ch??m s??c ch???t l?????ng cao cho ch?? m??o, t???a l???c t???i v??? tr?? trung t??m qu???n 1. V???i ph????ng ch??m ch???t l?????ng ph???c v??? ??i ?????u, c??ng ?????i ng?? y b??c s??? v?? nh??n vi??n ?????y t??m huy???t ph???c v??? nhu c???u to??n di???n cho ?????i t?????ng kh??ch h??ng y??u th?? c??ng t???i Tp HCM.\n" +
            "?????n v???i Dr. Bull c??c b?? c??ng c???a b???n s??? ???????c th??m kh??m t???n t??nh b???i c??c b??c s??? chuy??n m??n cao d???a tr??n h??? s?? c?? nh??n h??a c???a t???ng b??. Ch??? c???a c??c b?? s??? ???????c t?? v???n tr?????c v??? ph????ng ph??p ??i???u tr??? c??ng nh?? chi ph?? tr?????c khi ph???i h???p c??ng ch??ng t??i ti???n h??nh ??i???u tr??? nh???m mang l???i k???t qu??? ho??n h???o nh???t.",
        serviceOffer: ["vet", "groom", "hotel"],
        services: [{
            name: "Tri???t s???n m??o",
            type: "vet",
            desc: "Quy tr??nh tri???t s???n ph???i ???????c th???c hi???n v???i ch???t l?????ng thu???c m?? t???t nh???t tr??nh nh???ng nguy c?? nh?? gi???m tr?? nh???, n??n m???a. Ph??ng ???c v?? thi???t b??? ph???i lu??n ?????y ?????, quy tr??nh ph???i nhanh v?? trong m??i tr?????ng th???c hi???n v?? tr??ng tr??nh nhi???m tr??ng. C??c b?????c ???????c th???c hi???n b???i b??c s??? c?? tay ngh??? l??u n??m tr??nh nh???ng nguy c?? kh??c kh??ng mu???n sau n??y cho B??. Ch??? nu??i ???????c t?? v???n v?? h??? tr??? t???n t??nh",
            img: "https://drbull.vn/wp-content/uploads/2017/09/cat-vaccinations-2.jpg",
            price: "T??? 40.000 / 1 b??"
        }, {
            name: "SPA T???m, s???y & V??? sinh t???ng qu??t",
            type: "groom",
            desc: "D???ch v??? SPA T???m & V??? sinh t???ng qu??t cho c??c b?? CH?? M??O t???i DR BULL ???????c th???c hi???n theo quy tr??nh chuy??n nghi???p, s??? d???ng m??? ph???m SPA cao c???p nh???m mang l???i hi???u qu??? ch??m s??c t???t nh???t cho c??c B??. ",
            img: "https://drbull.vn/wp-content/uploads/2017/09/tamthucung.jpg",
            price: "T??? 125.000 ?? / 1 b?? d?????i 2kg. <a href='https://drbull.vn/wp-content/uploads/2020/08/0001-724x1024.jpg' class='text-decoration-none txt-blue'>Chi ti???t</a>"
        }, {
            name: "D???ch v??? l??u tr??",
            type: "hotel",
            desc: "B???n ??i du l???ch, s???a nh?? hay b???n r???n v???i c??ng vi???c n??n t???m th???i g???p kh?? kh??n trong vi???c ch??m s??c c??c b?? nh??ng kh??ng an t??m giao cho m???t ng?????i th??n n??o ???? khi h??? ch??a c?? kinh nghi???m ch??m s??c. ????a B?? y??u ?????n DR BULL ????? B?? s??? ???????c vui ch??i, ch??m s??c v?? y??u th????ng b???i nh???ng chuy??n vi??n v?? b??c s??? th?? y c?? kinh nghi???m trong vi???c nu??i d?????ng th?? c??ng ngay c??? khi B?? c?? g???p v???n ????? v??? s???c kh???e.",
            img: "https://drbull.vn/wp-content/uploads/2019/03/53639387_308003453212464_8865575860661387264_n.jpg",
            price: "115.000 ?? / b?? d?????i 4kg 1 ????m. <a href='https://drbull.vn/wp-content/uploads/2020/08/0001-724x1024.jpg' class='text-decoration-none txt-blue'>Chi ti???t</a>"
        }],
        reviews: [{
            by: "Hoang Long",
            review: "Good",
            star: 5
        }, {
            by: "Tan Do Trong",
            review: "I like it!",
            star: 5
        }, {
            by: "Nhi Nguy???n",
            review: "Nh??n vi??n ??? ????y ho??n to??n kh??ng ???????c ????o t???o, kh??ng c?? chuy??n m??n. D???t con ch?? qua t???a l??ng m?? c???o l??ng b??? l??ng c???a con ng?????i ta c??n k??u k v???a l??ng th?? Mi???n ph?? cho c??n mu???n g??? Trong khi d??ng ch?? Border Collie k??? nh???t l?? c???o l??ng. Ph???n ??nh c??n tr??? treo \"???? gi??? c???t Poodle c?? b??? g?? ????u?\" . M??? c??i ti???m m?? chuy??n m??n g??i g???n trong 1 d??ng ch??. C???m th???y kh??ng bi???t l??m th?? ?????ng c?? nh???n !\n" +
                "Gi???i quy???t s??? vi???c = c??ch im l???ng, coi th?????ng kh??ch h??ng. V?? d??? ra ti???m nh??? t???a t??c, th??? l???y t??ng ???? c???o ?????u kh??ch xong c??i mi???n ph?? l?? h???t chuy???n ??? ??? ????u ra v???y? Thi???u chuy??n nghi???p t??? nh??n vi??n t???i ch???. Tr???n tr??nh tr??ch nhi???m, ????? l???i cho kh??ch, bao che l???i c???a nh??n vi??n.  C??n k??u m??nh mu???n d?????ng l??ng l???i cho ch?? th?? mua s???n ph???m b??n n?? gi???m cho 20%??? Ai ??? SG l??m ??n n?? ra d??m n???u kh??ng mu???n v???a t???c v???a x??t xa v???t nu??i c???a m??nh.  C???m ??n!!!",
            star: 1
        }, {
            by: "Do Royce",
            review: "??? ????y m??nh tin t?????ng d???n 3 b?? nh?? m??nh c??? ch?? m??o l??n l??m h??n 3 n??m nay r???i. Ti???n gh?? lu??n",
            star: 5
        }]
    },
    PPetHotelASpa: {
        name: "PPet hotel & spa",
        address: "172 Hoa Lan, P.2, Ph?? Nhu???n, TP.HCM",
        phone: "+84 835172904",
        website: "",
        worktime: "08:00 ??? 18:30",
        img: ["https://photo-cms-plo.zadn.vn/w800/Uploaded/2021/abxbflu/2014_08_13/pbmt01.jpg",
            "https://photo-cms-plo.zadn.vn/w800/Uploaded/2021/abxbflu/2014_08_13/htew06.jpg",
            "https://photo-cms-plo.zadn.vn/w800/Uploaded/2021/abxbflu/2014_08_13/nkhs10_3.jpg"],
        desc: "Kh??ch s???n d??nh cho th?? c??ng sang tr???ng c?? nhi???u d???ch v??? ??i k??m nh?? spa th???m m???, t???p th??? d???c, c???t t???a m??ng... v???i ti??u chu???n 5 sao ?????u ti??n ??? S??i G??n v???a ???????c ?????u t?? h??n 5 t??? ?????ng.",
        serviceOffer: ["vet", "groom", "hotel"],
        services: [{
            name: "Kh??m t???ng qu??t",
            type: "vet",
            desc: "Ph??ng kh??m v?? ??i???u tr??? cao c???p d??nh cho th?? c??ng.",
            img: "https://photo-cms-plo.zadn.vn/w800/Uploaded/2021/abxbflu/2014_08_13/irei05.jpg",
            price: "T??y t??nh hu???ng"
        }, {
            name: "Spa l??m ?????p",
            type: "groom",
            desc: "Spa cao c???p cho c??c b??, ?????m b???o th?? gi??n tho???i m??i. G???m 2 g??i: Ddaayfddur, c?? b???n",
            img: "https://photo-cms-plo.zadn.vn/w800/Uploaded/2021/abxbflu/2014_08_13/bnsi12_2.jpg",
            price: "200.000 - 300.000/l?????t"
        }, {
            name: "Kh??ch s???n 5 sao (Ph??ng VIP)",
            type: "hotel",
            desc: "Ph??ng VIP r???ng kho???n 4 m2, c?? gi?????ng ng??? v?? ????? ch??i ri??ng cho th?? c??ng c??ng ????? ??n ???????c nh???p t??? n?????c ngo??i",
            img: "https://photo-cms-plo.zadn.vn/w800/Uploaded/2021/abxbflu/2014_08_13/mfku03.jpg",
            price: "600.000 - 700.000 ?????ng / ng??y"
        }, {
            name: "Kh??ch s???n 5 sao (Ph??ng th?????ng)",
            type: "hotel",
            desc: "Ph??ng th?????ng c?? 2 d???ng, g???m ph??ng l???n & nh???. T???t c??? th?? c??ng khi v??o \"l??u tr??\" t???i kh??ch s???n ?????u ???????c b??c s?? th?? y ki???m tra v?? theo d??i t??nh tr???ng s???c kh???e th?????ng xuy??n",
            img: "https://photo-cms-plo.zadn.vn/w800/Uploaded/2021/abxbflu/2014_08_13/oace04.jpg",
            price: "250.000 - 500.000 ?????ng/ng??y"
        }],
        reviews: [{
            by: "Hoang Tran",
            review: "Good",
            star: 5
        }, {
            by: "Tu Do Trong",
            review: "I like it!",
            star: 5
        }]
    }
};

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

    $("#serviceShopAddress").html("<b>?????a ch???: </b>" + shop.address);

    $("#serviceShopWorktime").html("<b>Gi??? m??? c???a: </b>" + shop.worktime);

    $("#serviceShopPhone").html("<b>??i???n tho???i: </b>" + shop.phone);

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
                        "        <i class='bi-plus-circle'></i>&nbsp; Th?? y\n";
                    break;
                case "groom":
                    tmpString +=
                        "    <p class='text-center rounded border-teal py-1 mb-0'>\n" +
                        "        <i class='bi-plus-circle'></i>&nbsp; Grooming-spa\n";
                    break;
                case "hotel":
                    tmpString +=
                        "    <p class='text-center rounded border-yellow py-1 mb-0'>\n" +
                        "        <i class='bi-building'></i>&nbsp; Kh??ch s???n\n";
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
        "    <button class='btn btn-blue w-100' onclick=\"moveToReservation('" + shopName + "')\">?????t l???ch</button>\n" +
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

    tmpString += "&nbsp; <i class='txt-black border-grey-l'>&nbsp; (" + shop.reviews.length + " ????nh gi??)</i>";

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