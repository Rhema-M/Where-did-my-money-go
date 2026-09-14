let transactionToDelete = null;
let transactionToEdit = null;

const deleteModal = document.getElementById("delete-modal");
const confirmDeleteBtn = document.getElementById("confirm-delete");
const cancelDeleteBtn = document.getElementById("cancel-delete");

function closeDeleteModal() {

    transactionToDelete = null;

    deleteModal.classList.add("hidden");

}

confirmDeleteBtn.addEventListener("click", confirmDeleteTransaction);
cancelDeleteBtn.addEventListener("click", closeDeleteModal);