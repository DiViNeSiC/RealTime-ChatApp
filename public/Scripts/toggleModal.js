const settingsModal = document.getElementById('deleteModal')
const chatRoomModal = document.getElementById('modal')
const changePassModal = document.getElementById('changePassModal')


function toggleModal(openButton, modalContainer, closeButton) {
    openButton.addEventListener('click', () => {
        modalContainer.classList.remove('hidden')
    })
    closeButton.addEventListener('click', () => {
        modalContainer.classList.add('hidden')
    })
}

if (settingsModal != null) {
    const settingsOpenButton = document.getElementById('deleteButton')
    const settingsCloseButton = document.getElementById('closeModalButton')
    toggleModal(settingsOpenButton, settingsModal, settingsCloseButton)
}

if (chatRoomModal != null) {
    const chatRoomOpenButton = document.getElementById('openModalButton')
    const chatRoomCloseButton = document.getElementById('closeButton')
    toggleModal(chatRoomOpenButton, chatRoomModal, chatRoomCloseButton)
}

if (changePassModal != null) {
    const changePassCloseModalButton = document.getElementById('changePassCloseModalButton')
    const changePassButton = document.getElementById('changePassButton')
    toggleModal(changePassButton, changePassModal, changePassCloseModalButton)
}