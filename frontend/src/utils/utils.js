// open modal
export const handleOpenModal = (modalId) => {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "block";
        document.body.classList.add("overflow-y-hidden");
    }
};

// close modal
export const closeModal = (modalId) => {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "none";
        document.body.classList.remove("overflow-y-hidden");
    }
};