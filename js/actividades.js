function showHideInfo(infoDiv) {
    if (infoDiv.style.display == "none") {
        infoDiv.style.display = "block";
    } else {
        infoDiv.style.display = "none";
    }
}

function expandContractImg(image) {
    if (image.width == "320") {
        image.width = "800";
        image.height = "600";
    } else {
        image.width = "320";
        image.height = "240";
    }
}