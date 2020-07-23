const notification = document.getElementById('errorNotification')
const nameExistErrNotification = document.getElementById('nameExistErrNotification')

function toggleNotification(notificationBar) {
    notificationBar.classList.remove('hide')
    setTimeout(() => {
        notificationBar.classList.add('hide')
    },5000)
}

if (notification != null) {
    if (notification.classList.contains('bad') || notification.classList.contains('good')) {
        toggleNotification(notification)
    }
}

if (nameExistErrNotification != null) {
    if (nameExistErrNotification.classList.contains('true')) {
        toggleNotification(nameExistErrNotification)
    }
}