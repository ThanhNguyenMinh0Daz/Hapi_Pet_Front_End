function ajaxInsertPet(pet) {
    $.ajax("http://localhost:9090/pet",
        {method: "POST", processData: false, contentType: 'application/json', data: JSON.stringify(pet)})
        .done(function (data) {
            if (data.status === "success") {
                alert("Lưu thành công");
                window.location.reload();
                /* Tải lại trang để js cập nhập thay đổi */
            } else {
                alert("Lỗi" + data.message);
            }
        });
}

function ajaxGetPet(accountID) {
    $.ajax("http://localhost:9090/pet/all/pet/" + accountID,
        {method: "GET", async: false})
        .done(function (data) {
            if (data.status === "success") {
                window.sessionStorage.setItem("petDTOList", JSON.stringify(data.data));
            } else {
                alert("Lỗi: " + data.message);
            }
        });
    return window.sessionStorage.getItem("petDTOList");
}

function ajaxUpdatePet(petDTO) {
    $.ajax("http://localhost:9090/pet/" + petDTO.pet.petID,
        {
            method: "PUT", processData: false,
            contentType: 'application/json', data: JSON.stringify(petDTO.pet)
        })
        .done(function (data) {
            if (data.status === "success") {
                alert("Lưu thành công");
                window.location.reload();
            } else {
                alert("Lỗi: " + data.message);
            }
        });


}

function ajaxDeletePet(petID) {
    $.ajax("http://localhost:9090/pet/" + petID,
        {method: "DELETE"})
        .done(function (data) {
            if (data.status === "success") {
                alert("Xóa thành công");
                window.location.reload();
            } else {
                alert("Lỗi: " + data.message);
            }
        });
}


function fillMyPetPage() {
    if (accountString === null) {
        window.location.replace("index.html");
    }

    let account = JSON.parse(accountString);

    let petDTOListString = ajaxGetPet(account.accountID);
    let petDTOList = JSON.parse(petDTOListString);

    if (petDTOList !== null && petDTOList.length > 0) {
        let petList = $("#petList");

        for (let i = 0; i < petDTOList.length; i++) {
            let petImage =
                $("<img>").addClass("w-100 h-100 img-contain rounded-top")
                    .attr("alt", "pet" + (i + 1))
                    .attr("id", "pet" + (i + 1) + "Image");
            if (petDTOList[i].image === null) {
                switch (petDTOList[i].species.speciesID) {
                    case 1:
                        petImage.attr("src", "img/images/alone/dog.png");
                        break;
                    case 2:
                        petImage.attr("src", "img/images/alone/cat.png");
                        break;
                    case 3:
                        petImage.attr("src", "img/images/alone/parrot.png");
                        break;
                    case 5:
                        petImage.attr("src", "img/images/alone/hamster.png");
                        break;
                    default:
                        petImage.attr("src", "img/images/logo_small.png");
                        break;
                }
            } else {
                petImage.attr("src", petDTOList[i].image.imagelink);
            }

            petList.append(
                $("<div>").addClass("col-lg-2 col-sm-4 mt-3")
                    .append(
                        $("<div>").addClass("h-100 rounded border-pink border-hover-shadow txt-hover-pink")
                            .attr("onclick", "fillPetDetail(" + i + ")")
                            .append(
                                $("<div>").addClass("square-wrapper")
                                    .append(
                                        $("<div>").addClass("fill-wrapper")
                                            .append(petImage)))
                            .append(
                                $("<p>").addClass("text-center txt-bold mt-3")
                                    .append(petDTOList[i].pet.petName))));
        }
    }
}

function fillPetDetail(i) {
    let petDTOListString = window.sessionStorage.getItem("petDTOList");

    if (petDTOListString === null) {
        if (accountString === null) {
            window.location.replace("index.html");
        }
        let account = JSON.parse(accountString);

        petDTOListString = ajaxGetPet(account.accountID);
    }

    let petDTOList = JSON.parse(petDTOListString);

    if (petDTOList !== null && petDTOList.length > 0) {
        showItem('petDetail');
        hideItem('newPet');

        $("#petImage").attr("src", $("#pet" + (i + 1) + "Image").attr("src"));

        $("#petName").val(petDTOList[i].pet.petName);

        $("#petBirthday").val(petDTOList[i].pet.petBirthday);

        $("input:radio[name='petGender'][value='" + petDTOList[i].gender.genderID + "']").click();

        $("#petSpecies").val(petDTOList[i].species.speciesID);

        $("#petBreed").val(petDTOList[i].pet.petBreed);

        $("#petWeight").val(petDTOList[i].pet.petWeight);

        $("#petColor").val(petDTOList[i].pet.petColor);

        $("#petChip").val(petDTOList[i].pet.chipNumber);

        $("#btnCancelPetChange").attr("onclick", "fillPetDetail(" + i + ")");

        $("#btnDeletePet").attr("onclick", "deletePet('" + petDTOList[i].pet.petID + "')");

        $("#btnUpdatePet").attr("onclick", "updatePet(" + i + ")");
    }
}

function insertPet() {
    let account = JSON.parse(accountString);

    let pet = {
        petID: null,
        petOwnerID: account.accountID,
        petSpecies: $("#newPetSpecies").val(),
        petName: $("#newPetName").val(),
        petGender: $("input:radio[name='newPetGender']:checked").val(),
        petBreed: $("#newPetBreed").val(),
        petBirthday: $("#newPetBirthday").val(),
        petColor: $("#newPetColor").val(),
        petWeight: $("#newPetWeight").val(),
        chipNumber: $("#newPetChip").val(),
        wantToDonate: false,
        isDeleted: false
    };

    if (pet.chipNumber.length <= 0) {
        pet.chipNumber = null
    }

    ajaxInsertPet(pet);
}

function updatePet(i) {
    let petDTOListString = window.sessionStorage.getItem("petDTOList");

    if (petDTOListString === null) {
        if (accountString === null) {
            window.location.replace("index.html");
        }
        let account = JSON.parse(accountString);

        petDTOListString = ajaxGetPet(account.accountID);
    }

    let petDTOList = JSON.parse(petDTOListString);

    if (petDTOList !== null && petDTOList.length > 0) {
        if (confirm("Bạn có chắc muốn lưu thay đổi cho hồ sơ này không?")) {
            let pet = {
                petID: petDTOList[i].pet.petID,
                petOwnerID: petDTOList[i].pet.petOwnerID,
                petSpecies: $("#petSpecies").val(),
                petName: $("#petName").val(),
                petGender: $("input:radio[name='petGender']:checked").val(),
                petBreed: $("#petBreed").val(),
                petBirthday: $("#petBirthday").val(),
                petColor: $("#petColor").val(),
                petWeight: $("#petWeight").val(),
                chipNumber: $("#petChip").val(),
                wantToDonate: false,
                isDeleted: false
            };
            if (pet.chipNumber.length <= 0) {
                pet.chipNumber = null
            }

            petDTOList[i].pet = pet;

            ajaxUpdatePet(petDTOList[i]);
        }
    }
}

function deletePet(petID) {
    if (confirm("Bạn có chắc muốn xóa hồ sơ này không?")) {
        ajaxDeletePet(petID);
    }
}