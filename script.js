document.addEventListener("DOMContentLoaded", () => {
  const conversations = [
    { title: "Conversación 1 - Título largo", date: "2024-06-21" },
    { title: "Conversación 2", date: "2024-06-20" },
    { title: "Conversación 3 - Título largo", date: "2024-06-13" },
    { title: "Conversación 4 - Título largo", date: "2024-05-25" },
    { title: "Conversación 5 - Título largo", date: "2024-06-13" },
    { title: "Conversación 6 - Título largo", date: "2024-01-25" },
  ];

  const menuItems = {
    today: document.getElementById("hoy"),
    yesterday: document.getElementById("ayer"),
    prev7days: document.getElementById("7dias"),
    prev30days: document.getElementById("30dias"),
    older: document.getElementById("anterior"),
  };
  const searchInput = document.getElementById("searchInput");
  const searchIcon = document.getElementById("searchIcon");

  /**
   * Creates a conversation element with a title and appends it to the menu container.
   *
   * @param {string} title - The title of the conversation.
   * @return {HTMLElement} The created conversation element.
   */
  function createConversation(title) {
    const container = document.getElementById("menuConteiner");

    const div = document.createElement("div");
    div.className = "dropend menuItem";

    const conversation = document.createElement("button");
    conversation.type = "button";
    conversation.className = "btn chat-title";
    conversation.textContent = title;

    const dropdownButton = document.createElement("button");
    dropdownButton.type = "button";
    dropdownButton.className =
      "btn dropdown-button dropdown-toggle dropdown-toggle-split";
    dropdownButton.setAttribute("data-bs-toggle", "dropdown");
    dropdownButton.setAttribute("aria-expanded", "false");

    const svgNS = "http://www.w3.org/2000/svg";

    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", "24");
    svg.setAttribute("height", "20");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("fill", "none");
    svg.setAttribute("xmlns", svgNS);

    const path = document.createElementNS(svgNS, "path");
    path.setAttribute("id", "menuItemButton");
    path.setAttribute(
      "d",
      "M6 14C5.45 14 4.97917 13.8042 4.5875 13.4125C4.19583 13.0208 4 12.55 4 12C4 11.45 4.19583 10.9792 4.5875 10.5875C4.97917 10.1958 5.45 10 6 10C6.55 10 7.02083 10.1958 7.4125 10.5875C7.80417 10.9792 8 11.45 8 12C8 12.55 7.80417 13.0208 7.4125 13.4125C7.02083 13.8042 6.55 14 6 14ZM12 14C11.45 14 10.9792 13.8042 10.5875 13.4125C10.1958 13.0208 10 12.55 10 12C10 11.45 10.1958 10.9792 10.5875 10.5875C10.9792 10.1958 11.45 10 12 10C12.55 10 13.0208 10.1958 13.4125 10.5875C13.8042 10.9792 14 11.45 14 12C14 12.55 13.8042 13.0208 13.4125 13.4125C13.0208 13.8042 12.55 14 12 14ZM18 14C17.45 14 16.9792 13.8042 16.5875 13.4125C16.1958 13.0208 16 12.55 16 12C16 11.45 16.1958 10.9792 16.5875 10.5875C16.9792 10.1958 17.45 10 18 10C18.55 10 19.0208 10.1958 19.4125 10.5875C19.8042 10.9792 20 11.45 20 12C20 12.55 19.8042 13.0208 19.4125 13.4125C19.0208 13.8042 18.55 14 18 14Z"
    );
    path.setAttribute("fill", "#1E2430");

    svg.appendChild(path);
    dropdownButton.appendChild(svg);

    div.appendChild(conversation);
    div.appendChild(dropdownButton);

    container.appendChild(div);

    return div;
  }

  /**
   * Categorizes conversations into different time periods and appends them to the appropriate menu item.
   * @return {void}
   */
  function categorizeConversations() {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const prev7days = new Date(today);
    prev7days.setDate(today.getDate() - 7);
    const prev30days = new Date(today);
    prev30days.setDate(today.getDate() - 30);

    // Loop through each conversation and sort them into the appropriate menu item
    conversations.forEach((conversation) => {
      const dateString = conversation.date;
      const dateParts = dateString.split("-");
      const convDate = new Date(
        dateParts[0],
        dateParts[1] - 1,
        dateParts[2],
        12
      );
      // const li = document.createElement("li");
      // li.textContent = conversation.title;
      // li.role = "button";
      const div = createConversation(conversation.title);
      const dropdownMenu = document.getElementById("dropdownMenu");
      const clonedElement = dropdownMenu.cloneNode(true);

      div.appendChild(clonedElement);

      if (convDate.toDateString() === today.toDateString()) {
        menuItems.today.appendChild(div);
      } else if (convDate.toDateString() === yesterday.toDateString()) {
        menuItems.yesterday.appendChild(div);
      } else if (convDate > prev7days) {
        menuItems.prev7days.appendChild(div);
      } else if (convDate > prev30days) {
        menuItems.prev30days.appendChild(div);
      } else {
        menuItems.older.appendChild(div);
      }
    });

    // Hide empty sections
    document.querySelectorAll(".menu > span").forEach((span) => {
      const ul = span.nextElementSibling;
      if (ul.children.length === 0) {
        span.style.display = "none";
        ul.style.display = "none";
      }
    });
  }

  /**
   * Adds event listeners to each conversation item and to the search icon.
   * When the search icon is clicked, it filters the menu items based on the value of the search input.
   * @return {void}
   */
  function addEventListeners() {
    // Add click event listeners to each conversation item
    document.querySelectorAll(".menu > ul > li").forEach((item) => {
      item.addEventListener("click", (item) => {
        console.log(item.target.innerHTML);
      });
    });

    // Add click event listener to the search icon and filters conversations
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

  // Attach dropdown to body on show
  $(".dropend .dropdown-toggle").on("show.bs.dropdown", function () {
    const dropdownMenu = $(this).next(".dropdown-menu");
    $("body").append(
      dropdownMenu
        .css({
          position: "absolute",
          left: $(this).offset().left,
          top: 0,
        })
        .detach()
    );
  });
  // detach dropdown from body on hide
  $(".dropend .dropdown-toggle").on("hidden.bs.dropdown", function () {
    const dropdownMenu = $(this).next(".dropdown-menu");
    $(".bs-example").append(
      dropdownMenu
        .css({
          position: "",
          left: "",
          top: "",
        })
        .detach()
    );
  });
});
