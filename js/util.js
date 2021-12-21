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
    if (day < 10) {
        day = "0" + day;
    }
    let month = date.getMonth();
    if (month < 10) {
        month = "0" + month;
    }
    let year = date.getFullYear();

    $("#" + id).attr("max", day + "-" + month + "-" + year);
}

/* account */

/* service */
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

    for (let i = 1; i < $("#serviceShopList .jquery-service-shop").length; i++) {
        let serviceShop = $("#serviceShop" + i);
        serviceShop.hide();

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
/* service */

/* detail service shop*/

const shops = {
    CSCHHCM: {
        name: "Trông giữ chó mèo HCM",
        address: "338/3/2 Nơ Trang Long, P.13, Bình Thạnh, TP.HCM",
        phone: "08 3456 9721",
        website: "https://giuchomeo.com",
        worktime: "07:00 - 21:00",
        img: ["https://giuchomeo.com/wp-content/uploads/2021/02/IMG_20210130_130947_756-scaled.jpg",
            "https://lh5.googleusercontent.com/p/AF1QipMks06In94yXd-O5f66UveRUtaR2Li1p2ZzRWmy=w408-h408-k-no",
            "https://giuchomeo.com/wp-content/uploads/2021/02/20210130_085431-scaled.jpg",
            "https://giuchomeo.com/wp-content/uploads/2021/02/IMG_20210201_125730_110-scaled.jpg"],
        desc: "Dịch vụ khách sạn Trông Giữ Chó Mèo HCM tự hào là một trong những khách sạn chăm sóc thú cưng chuyên nghiệp, tận tình tại HCM với mô hình phòng ốc hiện đại. Khách sạn Trông Giữ Chó Mèo luôn đảm bảo điều kiện ánh sáng và vệ sinh theo tiêu chuẩn chất lượng. Khu vực phòng ốc được giám sát bởi hệ thống camera 24/7 đảm bảo quá trình vận hành an toàn tối đa.\nTrông Giữ Chó Mèo HCM luôn mong muốn cung cấp môi trường sạch sẽ, an toàn và thoải mái cho thú cưng. Chính vì vậy, chế độ và quy trình chăm sóc cho chó mèo cũng luôn được chúng tôi chú trọng và cải thiện thường xuyên.",
        serviceOffer: ["hotel"],
        services: [{
            name: "Trông chó",
            type: "hotel",
            desc: "Phòng riêng biệt, được vệ sinh hàng ngày. Mỗi phòng đều có quạt hút thoáng khí và đèn.\nĂn sáng: Pate thịt & rau củ.\nĂn trưa: Hạt dinh dưỡng Ganador.\nĂn tối: Pate thịt & rau củ.\nĐược ra sân chạy nhảy để không khó chịu, cuồng chân. Các bé cún trong khi ra sân chơi sẽ có thời gian vệ sinh riêng.",
            img: "https://giuchomeo.com/wp-content/uploads/2021/02/Images-video.jpg",
            price: "Từ 90.000 đ / 1 ngày",
        }, {
            name: "Giữ mèo",
            type: "hotel",
            desc: "Phòng riêng biệt, được vệ sinh hàng ngày. Mỗi phòng đều có quạt hút thoáng khí và đèn.\nĂn sáng: Pate cá & rau củ mèo.\nĂn trưa: Hạt dinh dưỡng Minimo, Catsran.\nĂn tối: Pate cá & rau củ.\nLuôn được yêu thương vuốt ve để không sợ khi lạ chỗ. Vệ sinh bằng cát thơm hương coffee dễ chịu",
            img: "https://giuchomeo.com/wp-content/uploads/2021/02/5F4118B6-DE19-4E95-83C2-A2311D15DDE9.jpg",
            price: "Từ 80.000 đ / 1 ngày",
        }],
        reviews: [{
            by: "Ngoc Nghia Nguyen",
            review: "Chị chủ ở đây rất có tâm, khu vực chăm các bé cực kì sạch sẽ, thoáng, chế độ ăn uống cho mấy bé cũng ok nữa, cập nhật tình trạng hằng ngày.",
            star: 5
        }, {
            by: "Quynh Ngan",
            review: "Cô chủ rất có tâm thương mấy bé lắm nên gửi rất yên tâm. Phòng của mấy bé sạch sẽ thoáng mát, cô chủ cho ăn đầy đủ. Từ nay đi đâu xa ít ngày có chỗ gửi trẻ rồi hihi",
            star: 5
        }, {
            by: "Thái Duy Khang",
            review: "Tuy là ở trong hẻm nhưng cũng rất dễ tìm, trông giữ tại nhà nên mình rất yên tâm, 2 bạn và gia đình rất dễ thương và hiếu khách, nhà trần cao thoáng mát, có sân nhỏ kinh doanh thêm dịch vụ gội đầu làm móng cho các bé ra chơi luôn 😁 nói chung là hợp lý về mọi thứ và quan trọng là giá cả rất ok",
            star: 5
        }]
    },
    PKTHYVietpet: {
        name: "Phòng Khám Thú Y Vietpet",
        address: "247 Lê Quang Định, P.7, Bình Thạnh, TP.HCM",
        phone: "090 713 76 73",
        website: "https://phong-kham-thu-y-vietpet.business.site/",
        worktime: "T2 - CN: Mở cả ngày",
        img: ["https://lh3.googleusercontent.com/p/AF1QipPN0ZkZb5UPre_JJx0SEK9uWA2sH9iQfNplk5BI=w1080-h608-p-no-v0"],
        desc: "",
        serviceOffer: ["vet"],
        services: [{
            name: "Tiêm vaccine",
            type: "vet",
            desc: "Tiêm đủ các loại vaccine cở bản cho bé khỏe mạnh.",
            img: "data:image/jpeg;base64,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",
            price: "Từ 150.000 đ / 1 lần",
        }],
        reviews: [{
            by: "Dũng N",
            review: "Nhân viên nhiệt tình. Có lịch nhắc mỗi khi tới hạn tiêm chích.",
            star: 4
        }, {
            by: "Nguyễn H",
            review: "Tốt",
            star: 4
        }, {
            by: "Vinhvinh N",
            review: "",
            star: 5
        }]
    },
    TYProCare: {
        name: "THÚ Y PROCARE",
        address: "98C Phan Đăng Lưu, P.3, Phú Nhuận, TP.HCM",
        phone: "(028) 35 511 002",
        website: "https://thuyprocare.com",
        worktime: "Từ 8h00 - 20h00 hằng ngày - Ngày lễ & chủ nhật: Từ 8h00 - 16h00.",
        img: ["https://thuyprocare.com/upload/images/GI%E1%BB%9AI%20THI%E1%BB%86U/Ph%C3%B2ng-kh%C3%A1m-th%C3%BA-y-procare.jpg",
            "https://thuyprocare.com/upload/hinhanh/034756856335434_1349x450.jpg",
            "https://thuyprocare.com/upload/hinhanh/704993368852694_1349x450.jpg",
            "https://thuyprocare.com/upload/hinhanh/064738477621145_1349x450.jpg"],
        desc: "Phòng khám thú y Procare | Trạm thú y uy tín tại Tphcm Bình Thạnh cung cấp dịch vụ điều trị chăm sóc thú cưng, chó mèo, với đội ngũ Bác Sĩ uy tín chuyên nghiệp.",
        serviceOffer: ["vet", "groom"],
        services: [{
            name: "TRIỆT SẢN CHÓ MÈO",
            type: "vet",
            desc: "Với đội ngũ bác sĩ thú y được đào tạo chuyên sâu và kinh nghiệm hành nghề lâu năm, Procare đã và đang triển khai dịch vụ triệt sản chó mèo - với tiêu chí: nhanh chóng, an toàn, trách nhiệm; đảm bảo cam kết sẽ giúp thú cưng của bạn có một cuộc phẫu thuật triệt sản chó mèo thành công, không đau.",
            img: "https://thuyprocare.com/upload/images/PH%E1%BA%A8U%20THU%E1%BA%ACT/dich-vu-triet-san-cho-meo.jpg",
            price: "Từ 50.000 / 1 lượt"
        }, {
            name: "Xét nghiệm chó mèo",
            type: "vet",
            desc: "Trung tâm xét nghiệm chó mèo Procare ra đời giúp việc chẩn đoán bệnh cho thú cưng để đưa ra phác đồ điều trị phù hợp nhất." +
                "<br/>Bao gồm: Xét nghiệm nhanh phục vụ phẫu thuật. Xét nghiệm ký sinh trùng. Xét nghiệm máu sinh lý, sinh hóa. Xét nghiệm da soi ký sinh trùng, nấm…",
            img: "https://thuyprocare.com/upload/images/X%C3%89T%20NGHI%E1%BB%86M/trung-tam-xet-nghiem-cho-meo.jpg",
            price: "Từ 100.000 đ / 1 lượt"
        }, {
            name: "Cắt tỉa lông chó Poodle TpHCM",
            type: "groom",
            desc: "Đến với Procare thú cưng của bạn sẽ có trải nghiệm hoàn toàn mới về việc chăm sóc cơ thể. Không chỉ đơn giản là cắt tỉa lông mà mà thú cưng của bạn còn được hương nhiều dịch vụ đi kèm khác nữa.",
            img: "https://thuyprocare.com/upload/images/Screenshot_1(2).png",
            price: "Từ 35.000 đ / 1 lượt"
        }],
        reviews: [{
            by: "Lê Phước Sang",
            review: "Very good 👍🏻",
            star: 5
        }, {
            by: "Cúc Nguyễn",
            review: "Hôm mình đem mèo đến thì phòng khám chưa mở cửa hẳn, chỉ nhận khám thú cưng rồi tư vấn qua điện thoại. Sau đó chủ sẽ đến đón bé về. Bác sĩ Định tư vấn tận tình, cung cấp thông tin và giải đáp những thắc mắc của mình. Các bạn nhân viên thân thiện và nhanh nhẹn. Chi phí khám và thuốc hợp lý.",
            star: 4
        }, {
            by: "Tuan Le",
            review: "Good services, nice staff.",
            star: 5
        }]
    },
    DRBullSpa: {
        name: "DR BULL SPA",
        address: "205 Nguyễn Cư Trinh, P.Nguyễn Cư Trinh, Q.1, TP.HCM",
        phone: "(08) 66817913",
        website: "https://drbull.vn",
        worktime: "9AM – 8:30PM",
        img: ["https://lh5.googleusercontent.com/p/AF1QipM-Yf4L_9pICC2z8yeTLrDhpmWB73Boyn2JLvE6=w426-h240-k-no",
            "https://drbull.vn/wp-content/uploads/2019/05/2020-10-08-15_20_13.4910700-e1602145934929-1024x986.jpg",
            "https://drbull.vn/wp-content/uploads/2017/09/vet4-1024x661.jpg"],
        desc: "Dr. Bull là thương hiệu thú y và dịch vụ chăm sóc chất lượng cao cho chó mèo, tọa lạc tại vị trí trung tâm quận 1. Với phương châm chất lượng phục vụ đi đầu, cùng đội ngũ y bác sỹ và nhân viên đầy tâm huyết phục vụ nhu cầu toàn diện cho đối tượng khách hàng yêu thú cưng tại Tp HCM. Đến với Dr. Bull các bé cưng của bạn sẽ được thăm khám tận tình bởi các bác sỹ chuyên môn cao dựa trên hồ sơ cá nhân hóa của từng bé. Chủ của các bé sẽ được tư vấn trước về phương pháp điều trị cũng như chi phí trước khi phối hợp cùng chúng tôi tiến hành điều trị nhằm mang lại kết quả hoàn hảo nhất.",
        serviceOffer: ["vet", "groom", "hotel"],
        services: [{
            name: "Triệt sản mèo",
            type: "vet",
            desc: "Quy trình triệt sản phải được thực hiện với chất lượng thuốc mê tốt nhất tránh những nguy cơ như giảm trí nhớ, nôn mửa. Phòng ốc và thiết bị phải luôn đầy đủ, quy trình phải nhanh và trong môi trường thực hiện vô trùng tránh nhiễm trùng. Các bước được thực hiện bởi bác sỹ có tay nghề lâu năm tránh những nguy cơ khác không muốn sau này cho Bé. Chủ nuôi được tư vấn và hỗ trợ tận tình",
            img: "https://drbull.vn/wp-content/uploads/2017/09/cat-vaccinations-2.jpg",
            price: "Từ 40.000 / 1 bé"
        }, {
            name: "SPA Tắm, sấy & Vệ sinh tổng quát",
            type: "groom",
            desc: "Dịch vụ SPA Tắm & Vệ sinh tổng quát cho các bé CHÓ MÈO tại DR BULL được thực hiện theo quy trình chuyên nghiệp, sử dụng mỹ phẩm SPA cao cấp nhằm mang lại hiệu quả chăm sóc tốt nhất cho các Bé. ",
            img: "https://drbull.vn/wp-content/uploads/2017/09/tamthucung.jpg",
            price: "Từ 125.000 đ / 1 bé dưới 2kg. <a href='https://drbull.vn/wp-content/uploads/2020/08/0001-724x1024.jpg' class='text-decoration-none txt-blue'>Chi tiết</a>"
        }, {
            name: "Dịch vụ lưu trú",
            type: "hotel",
            desc: "Bạn đi du lịch, sửa nhà hay bận rộn với công việc nên tạm thời gặp khó khăn trong việc chăm sóc các bé nhưng không an tâm giao cho một người thân nào đó khi họ chưa có kinh nghiệm chăm sóc. Đưa Bé yêu đến DR BULL để Bé sẽ được vui chơi, chăm sóc và yêu thương bởi những chuyên viên và bác sỹ thú y có kinh nghiệm trong việc nuôi dưỡng thú cưng ngay cả khi Bé có gặp vấn đề về sức khỏe.",
            img: "https://drbull.vn/wp-content/uploads/2019/03/53639387_308003453212464_8865575860661387264_n.jpg",
            price: "115.000 đ / bé dưới 4kg 1 đêm. <a href='https://drbull.vn/wp-content/uploads/2020/08/0001-724x1024.jpg' class='text-decoration-none txt-blue'>Chi tiết</a>"
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
            by: "Nhi Nguyễn",
            review: "Nhân viên ở đây hoàn toàn không được đào tạo, không có chuyên môn. Dắt con chó qua tỉa lông mà cạo lông bộ lông của con người ta còn kêu k vừa lòng thì Miễn phí cho còn muốn gì? Trong khi dòng chó Border Collie kỵ nhất là cạo lông. Phản ánh còn trả treo \"Đó giờ cắt Poodle có bị gì đâu?\" . Mở cái tiệm mà chuyên môn gói gọn trong 1 dòng chó. Cảm thấy không biết làm thì đừng có nhận !\n" +
                "Giải quyết sự việc = cách im lặng, coi thường khách hàng. Ví dụ ra tiệm nhờ tỉa tóc, thợ lấy tông đơ cạo đầu khách xong cái miễn phí là hết chuyện à? Ở đâu ra vậy? Thiếu chuyên nghiệp từ nhân viên tới chủ. Trốn tránh trách nhiệm, đổ lỗi cho khách, bao che lỗi của nhân viên.  Còn kêu mình muốn dưỡng lông lại cho chó thì mua sản phẩm bên nó giảm cho 20%??? Ai ở SG làm ơn né ra dùm nếu không muốn vừa tức vừa xót xa vật nuôi của mình.  Cảm ơn!!!",
            star: 1
        }, {
            by: "Do Royce",
            review: "Ở đây mình tin tưởng dẫn 3 bé nhà mình cả chó mèo lên làm hơn 3 năm nay rồi. Tiện ghê luôn",
            star: 5
        }]
    },
    PPetHotelASpa: {
        name: "PPet hotel & spa",
        address: "172 Hoa Lan, P.2, Phú Nhuận, TP.HCM",
        phone: "+84 835172904",
        website: "",
        worktime: "08:00 – 18:30",
        img: ["https://photo-cms-plo.zadn.vn/w800/Uploaded/2021/abxbflu/2014_08_13/pbmt01.jpg",
            "https://photo-cms-plo.zadn.vn/w800/Uploaded/2021/abxbflu/2014_08_13/htew06.jpg",
            "https://photo-cms-plo.zadn.vn/w800/Uploaded/2021/abxbflu/2014_08_13/nkhs10_3.jpg"],
        desc: "Khách sạn dành cho thú cưng sang trọng có nhiều dịch vụ đi kèm như spa thẩm mỹ, tập thể dục, cắt tỉa móng... với tiêu chuẩn 5 sao đầu tiên ở Sài Gòn vừa được đầu tư hơn 5 tỷ đồng.",
        serviceOffer: ["vet", "groom", "hotel"],
        services: [{
            name: "Khám tổng quát",
            type: "vet",
            desc: "Phòng khám và điều trị cao cấp dành cho thú cưng.",
            img: "https://photo-cms-plo.zadn.vn/w800/Uploaded/2021/abxbflu/2014_08_13/irei05.jpg",
            price: "Tùy tình huống"
        }, {
            name: "Spa làm đẹp",
            type: "groom",
            desc: "Spa cao cấp cho các bé, đảm bảo thư giãn thoải mái. Gồm 2 gói: Ddaayfddur, cơ bản",
            img: "https://photo-cms-plo.zadn.vn/w800/Uploaded/2021/abxbflu/2014_08_13/bnsi12_2.jpg",
            price: "200.000 - 300.000/lượt"
        }, {
            name: "Khách sạn 5 sao (Phòng VIP)",
            type: "hotel",
            desc: "Phòng VIP rộng khoản 4 m2, có giường ngủ và đồ chơi riêng cho thú cưng cùng đồ ăn được nhập từ nước ngoài",
            img: "https://photo-cms-plo.zadn.vn/w800/Uploaded/2021/abxbflu/2014_08_13/mfku03.jpg",
            price: "600.000 - 700.000 đồng / ngày"
        }, {
            name: "Khách sạn 5 sao (Phòng thường)",
            type: "hotel",
            desc: "Phòng thường có 2 dạng, gồm phòng lớn & nhỏ. Tất cả thú cưng khi vào \"lưu trú\" tại khách sạn đều được bác sĩ thú y kiểm tra và theo dõi tình trạng sức khỏe thường xuyên",
            img: "https://photo-cms-plo.zadn.vn/w800/Uploaded/2021/abxbflu/2014_08_13/oace04.jpg",
            price: "250.000 - 500.000 đồng/ngày"
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
    window.location.href = "reservation_petOwner.html?shop=" + shop;
    return;
}