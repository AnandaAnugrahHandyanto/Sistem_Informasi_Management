// Simple service worker to support showing notifications via registration
self.addEventListener("notificationclick", function (event) {
  event.notification.close();
  // focus/open the app
  event.waitUntil(
    self.clients.matchAll({ type: "window" }).then(function (clients) {
      if (clients && clients.length) {
        return clients[0].focus();
      }
      return self.clients.openWindow("/");
    }),
  );
});

// respond to messages (optional)
self.addEventListener("message", function (e) {
  try {
    const d = e.data || {};
    if (d && d.type === "showNotification") {
      const title = d.title || "Reminder";
      const options = d.options || {};
      self.registration.showNotification(title, options);
    }
  } catch (err) {
    console.error(err);
  }
});
