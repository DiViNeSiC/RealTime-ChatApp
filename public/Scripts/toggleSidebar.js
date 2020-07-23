const sidebar = document.getElementById('sidebar')
const sidebarButton = document.getElementById('sidebarButton')

function changeSideBarPosition() {
    if (sidebarButton.classList.contains('close')) {
        sidebar.classList.remove('show')
        sidebarButton.classList.remove('close')
        return sidebarButton.classList.add('open')
    }
    sidebarButton.classList.add('close')
    sidebar.classList.add('show')
}

sidebarButton.addEventListener('click', changeSideBarPosition)