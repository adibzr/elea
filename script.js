document.addEventListener("DOMContentLoaded", () => {
  const conversations = [
    { title: "Conversación 1 - Título largo", date: "2024-06-20" },
    { title: "Conversación 2", date: "2024-06-19" },
    { title: "Conversación 3 - Título largo", date: "2024-06-13" },
    { title: "Conversación 4 - Título largo", date: "2024-05-25" },
    { title: "Conversación 5 - Título largo", date: "2024-06-13" },
    { title: "Conversación 6 - Título largo", date: "2024-01-25" },
    // Add more conversations with different dates
  ];

  const menuItems = {
    today: document.getElementById("today"),
    yesterday: document.getElementById("yesterday"),
    prev7days: document.getElementById("prev7days"),
    prev30days: document.getElementById("prev30days"),
    older: document.getElementById("older"),
  };
  const searchInput = document.getElementById("searchInput");
  const searchIcon = document.getElementById("searchIcon");

  function categorizeConversations() {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const prev7days = new Date(today);
    prev7days.setDate(today.getDate() - 7);
    const prev30days = new Date(today);
    prev30days.setDate(today.getDate() - 30);

    conversations.forEach((conversation) => {
      const dateString = conversation.date;
      const dateParts = dateString.split("-");
      const convDate = new Date(
        dateParts[0],
        dateParts[1] - 1,
        dateParts[2],
        12
      );
      const li = document.createElement("li");
      li.textContent = conversation.title;

      if (convDate.toDateString() === today.toDateString()) {
        menuItems.today.appendChild(li);
      } else if (convDate.toDateString() === yesterday.toDateString()) {
        menuItems.yesterday.appendChild(li);
      } else if (convDate > prev7days) {
        menuItems.prev7days.appendChild(li);
      } else if (convDate > prev30days) {
        menuItems.prev30days.appendChild(li);
      } else {
        menuItems.older.appendChild(li);
      }
    });
    document.querySelectorAll(".menu > span").forEach((span) => {
      const ul = span.nextElementSibling;
      if (ul.children.length === 0) {
        span.style.display = "none";
        ul.style.display = "none";
      }
    });
  }
  function addEventListeners() {
    document.querySelectorAll(".menu > ul > li").forEach((item) => {
      item.addEventListener("click", (item) => {
        // const activeItem = document.querySelector(".active");
        // if (activeItem) {
        //   activeItem.classList.remove("active");
        // }
        // item.classList.add("active");
        console.log(item.target.innerHTML);
      });
    });
    searchIcon.addEventListener("click", () => {
      const filter = searchInput.value.toLowerCase();
      menuItems.forEach((item) => {
        const text = item.textContent.toLowerCase();
        if (text.includes(filter)) {
          item.style.display = "";
        } else {
          item.style.display = "none";
        }
      });
    });
  }

  categorizeConversations();
  addEventListeners();
});
