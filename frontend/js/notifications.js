function showNotification(message, type = "success") {

    const container = document.getElementById("notification-container");

    const notification = document.createElement("div");

    notification.className = `notification ${type}`;
    notification.textContent = message;

    container.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);

}