window.onload=function dragOverAvatarUploadField() {
    const dropZone = document.querySelector(".avatarUploadField");
    const stockFotoInDropZone = document.querySelector(".avatarUploadField img:first-of-type");
    const HuidigeAvatar = document.querySelector(".eigenAvatarfotoGr");
    const uploadFotoOverlay = document.querySelector(".uploadFotoOverlay");

    dropZone.addEventListener("dragover", e => {
        e.preventDefault();
        stockFotoInDropZone.classList.add("hidden");
        HuidigeAvatar.classList.add("transparent50");
        uploadFotoOverlay.classList.remove("hidden");
    })

    dropZone.addEventListener("dragleave", e => {
        stockFotoInDropZone.classList.remove("hidden");
        HuidigeAvatar.classList.remove("transparent50");
        uploadFotoOverlay.classList.add("hidden");
    })

    dropZone.addEventListener("dragend", e => {
        stockFotoInDropZone.classList.remove("hidden");
        HuidigeAvatar.classList.remove("transparent50");
        uploadFotoOverlay.classList.add("hidden");
    })
}