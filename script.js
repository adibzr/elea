let conversations = [
  {
    id: 1,
    title: "Conversación 1 - Título largo",
    chatMessages: [
      "¡Hola! Quiero saber información sobre la siguiente molécula: adrenalina",
      "La adrenalina, también conocida como epinefrina, es una hormona y un neurotransmisor crucial en la respuesta de 'lucha o huida' del cuerpo humano. Aquí hay una descripción detallada:",
    ],
    date: "2024-06-24",
  },
  {
    id: 2,
    title: "Conversación 2",
    chatMessages: [],
    date: "2024-06-19",
  },
  {
    id: 3,
    title: "Conversación 3",
    chatMessages: [],
    date: "2024-06-23",
  },
  {
    id: 4,
    title: "Conversación 4 - Título largo",
    chatMessages: [],
    date: "2024-06-2",
  },
  {
    id: 5,
    title: "Conversación 5 - Título largo",
    chatMessages: [],
    date: "2024-05-2",
  },
];
const nodes = Array.from(aiMessage.childNodes); // nodes to reveal

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
 * Reveals nodes one by one in a chat message. Added delay to simulate promise
 *
 * @return {void} This function does not return anything.
 */

function revealNode(node) {
  const aiMessage = document.getElementById("aiMessage");
  aiMessage.innerHTML = "";
  const cursor = document.createElement("span");
  cursor.className = "cursor";
  aiMessage.appendChild(cursor);
  cursor.style.display = "inline-block";
  nodes.forEach(async (node, index) => {
    setTimeout(() => {
      aiMessage.insertBefore(node, cursor);
      if (index === nodes.length - 1) {
        cursor.remove();
        send.style.display = "block";
        loading.style.display = "none";
      }
    }, index * 300);
  });
}

// Create dropdown items with SVG icons
const createDropdownItem = (svgPath, buttonText) => {
  const button = document.createElement("button");
  button.classList.add("dropdown-item");
  button.setAttribute("type", "button");

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  svg.setAttribute("width", "24");
  svg.setAttribute("height", "24");
  svg.setAttribute("viewBox", "0 0 24 24");

  const mask = document.createElementNS("http://www.w3.org/2000/svg", "mask");
  mask.setAttribute("id", "mask0");
  mask.setAttribute("style", "mask-type: alpha");
  mask.setAttribute("maskUnits", "userSpaceOnUse");
  mask.setAttribute("x", "0");
  mask.setAttribute("y", "0");
  mask.setAttribute("width", "24");
  mask.setAttribute("height", "24");
  const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  rect.setAttribute("width", "24");
  rect.setAttribute("height", "24");
  mask.appendChild(rect);

  const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
  g.setAttribute("mask", "url(#mask0)");
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", svgPath);
  g.appendChild(path);

  svg.appendChild(mask);
  svg.appendChild(g);
  button.appendChild(svg);
  button.appendChild(document.createTextNode(buttonText));

  return button;
};

/**
 * Creates a conversation element with a title and appends it to the menu container.
 *
 * @param {string} title - The title of the conversation.
 * @param {string[]} chatMessages - The chat messages of the conversation.
 * @param {string} date - The date of the conversation.
 * @return {HTMLElement} The created conversation element.
 */
function createConversation(id, title, chatMessages = [], date, index) {
  const container = document.getElementById("menuConteiner");

  const div = document.createElement("div");
  div.className = "dropend menuItem";
  div.id = `chat${id}`;

  const conversation = document.createElement("input");
  conversation.type = "button";
  conversation.className = "btn chat-title";
  conversation.value = title;

  // add event doble click listener to edit chat name. Confirm on enter key or on blur
  conversation.addEventListener("dblclick", () => {
    const oldTitle = conversation.value;
    conversation.type = "input";
    conversation.focus();
    conversation.style.cursor = "text";
    const length = conversation.value.length;
    conversation.setSelectionRange(length, length);
    conversation.scrollLeft = conversation.scrollWidth;
    const newTilte = conversation.value;
    conversation.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        if (conversation.value == "") {
          conversation.value = oldTitle;
        }
        updateMenuItemName(index, newTilte);
        conversation.blur();
        conversation.type = "button";
      }
    });
    conversation.addEventListener("blur", () => {
      if (conversation.value == "") {
        conversation.value = oldTitle;
      }
      updateMenuItemName(index, newTilte);
      conversation.type = "button";
    });
  });

  const dropdownButton = document.createElement("button");
  dropdownButton.className =
    "btn dropdown-button dropdown-toggle dropdown-toggle-split";
  dropdownButton.setAttribute("data-bs-toggle", "dropdown");
  dropdownButton.setAttribute("aria-haspopup", "true");
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

  const dropdownMenu = document.createElement("div");
  dropdownMenu.classList.add("dropdown-menu", "dropdownMenu");
  dropdownMenu.setAttribute("id", "dropdownMenu");

  const svgPaths = [
    "M12 18L16 14L14.6 12.6L13 14.2V10H11V14.2L9.4 12.6L8 14L12 18ZM5 8V19H19V8H5ZM5 21C4.45 21 3.97917 20.8042 3.5875 20.4125C3.19583 20.0208 3 19.55 3 19V6.525C3 6.29167 3.0375 6.06667 3.1125 5.85C3.1875 5.63333 3.3 5.43333 3.45 5.25L4.7 3.725C4.88333 3.49167 5.1125 3.3125 5.3875 3.1875C5.6625 3.0625 5.95 3 6.25 3H17.75C18.05 3 18.3375 3.0625 18.6125 3.1875C18.8875 3.3125 19.1167 3.49167 19.3 3.725L20.55 5.25C20.7 5.43333 20.8125 5.63333 20.8875 5.85C20.9625 6.06667 21 6.29167 21 6.525V19C21 19.55 20.8042 20.0208 20.4125 20.4125C20.0208 20.8042 19.55 21 19 21H5ZM5.4 6H18.6L17.75 5H6.25L5.4 6Z",
    "M5 19H6.425L16.2 9.225L14.775 7.8L5 17.575V19ZM3 21V16.75L16.2 3.575C16.4 3.39167 16.6208 3.25 16.8625 3.15C17.1042 3.05 17.3583 3 17.625 3C17.8917 3 18.15 3.05 18.4 3.15C18.65 3.25 18.8667 3.4 19.05 3.6L20.425 5C20.625 5.18333 20.7708 5.4 20.8625 5.65C20.9542 5.9 21 6.15 21 6.4C21 6.66667 20.9542 6.92083 20.8625 7.1625C20.7708 7.40417 20.625 7.625 20.425 7.825L7.25 21H3ZM15.475 8.525L14.775 7.8L16.2 9.225L15.475 8.525Z",
    "M7 21C6.45 21 5.97917 20.8042 5.5875 20.4125C5.19583 20.0208 5 19.55 5 19V6H4V4H9V3H15V4H20V6H19V19C19 19.55 18.8042 20.0208 18.4125 20.4125C18.0208 20.8042 17.55 21 17 21H7ZM17 6H7V19H17V6ZM9 17H11V8H9V17ZM13 17H15V8H13V17Z",
  ];

  // Button texts for the dropdown items
  const buttonTexts = ["Archivar", "Cambiar nombre", "Eliminar"];

  // Append dropdown items to the dropdown menu
  svgPaths.forEach((path, index) => {
    const item = createDropdownItem(path, buttonTexts[index]);

    // add event change name button event listener to edit chat name. Confirm on enter key or on blur
    item.addEventListener("click", () => {
      const oldtitle = conversation.value;
      conversation.type = "input";
      conversation.focus();
      conversation.style.cursor = "text";
      conversation.style.border = "1px solid black";
      const length = conversation.value.length;
      conversation.setSelectionRange(length, length);
      conversation.scrollLeft = conversation.scrollWidth;
      const newTilte = conversation.value;
      conversation.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          if (conversation.value == "") {
            conversation.value = oldtitle;
          }
          updateMenuItemName(index, newTilte);
          conversation.blur();
          conversation.type = "button";
        }
      });
      conversation.addEventListener("blur", () => {
        if (conversation.value == "") {
          conversation.value = oldtitle;
        }
        const newTilte = conversation.value;
        updateMenuItemName(index, newTilte);
        conversation.type = "button";
      });
    });

    dropdownMenu.appendChild(item);
  });

  div.appendChild(conversation);
  div.appendChild(dropdownButton);
  div.appendChild(dropdownMenu);
  container.appendChild(div);

  return { node: div, date };
}

/**
 * Categorizes conversations into different time periods and appends them to the appropriate chat group.
 * @param {Object} conversation
 * @return {void}
 */
function categorizeConversation(conversation) {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const prev7days = new Date(today);
  prev7days.setDate(today.getDate() - 7);
  const prev30days = new Date(today);
  prev30days.setDate(today.getDate() - 30);

  const dateParts = conversation.date.split("-");
  const convDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2], 12);
  if (convDate.toDateString() === today.toDateString()) {
    menuItems.today.appendChild(conversation.node);
  } else if (convDate.toDateString() === yesterday.toDateString()) {
    menuItems.yesterday.appendChild(conversation.node);
  } else if (convDate > prev7days) {
    menuItems.prev7days.appendChild(conversation.node);
  } else if (convDate > prev30days) {
    menuItems.prev30days.appendChild(conversation.node);
  } else {
    menuItems.older.appendChild(conversation.node);
  }
}

/**
 * Updates the title of a menu item based on the provided index.
 *
 * @param {number} index - The index of the menu item to update.
 * @param {string} newTitle - The new title to assign to the menu item.
 * @return {void}
 */
function updateMenuItemName(index, newTitle) {
  console.log("updateMenuItemName", index, newTitle);
  const title = conversations[index].title;
  if (title && newTitle && title !== newTitle) {
    conversations[index].title = newTitle;
  }

  console.log(conversations);
}

/**
 * Adds event listeners to each conversation item and to the search icon.
 * When the search icon is clicked, it filters the menu items based on the value of the search input.
 * @return {void}
 */
function addEventListeners() {
  // Add click event listeners to each conversation item
  // console.log(Object.values(menuItems)[2].children);

  const menuItemsValues = Object.values(menuItems);
  menuItemsValues.forEach((item) => {
    if (item.hasChildNodes()) {
      for (const key in item.children) {
        if (Object.hasOwnProperty.call(item.children, key)) {
          const element = item.children[key].getElementsByTagName("input")[0];
          element.addEventListener("click", () => {
            // Remove the "active" class from all elements
            menuItemsValues.forEach((innerItem) => {
              if (innerItem.hasChildNodes()) {
                for (const innerKey in innerItem.children) {
                  if (
                    Object.hasOwnProperty.call(innerItem.children, innerKey)
                  ) {
                    innerItem.children[innerKey].classList.remove("active");
                  }
                }
              }
            });
            // Add the "active" class to the clicked element
            item.children[key].classList.add("active");
            console.log(element);
          });
        }
      }
    }
  });

  // Add click event listener to the search icon and filters conversations
  searchIcon.addEventListener("click", () => {
    const filter = searchInput.value.toLowerCase();
    Object.values(menuItems).forEach((item) => {
      const text = item.textContent.toLowerCase();
      if (text.includes(filter)) {
        item.style.display = "";
      } else {
        item.style.display = "none";
      }
    });

    hideEmptyMenu();
  });

  //add click event to send button
  const send = document.getElementById("send");
  const loading = document.getElementById("loading");
  send.addEventListener("click", () => {
    const message = document.getElementById("chatInput").value;
    send.style.display = "none";
    loading.style.display = "block";
  });

  //add event listener to generate report button
  const generarReporte = document.getElementById("generate-reporte");
  const analizando = document.getElementById("aiAnalizando");
  generarReporte.addEventListener("click", () => {
    analizando.style.display = "grid";
    generarReporte.setAttribute("disabled", true);
    setTimeout(() => {
      analizando.style.display = "none";
      generarReporte.removeAttribute("disabled");
    }, 3000);
  });
}

function hideEmptyMenu() {
  document.querySelectorAll(".menu > span").forEach((span) => {
    const ul = span.nextElementSibling;
    if (ul.style.display === "none") {
      span.style.display = "none";
    } else {
      span.style.display = "block";
    }
  });
}

function loadConversations(conversation) {
  conversation.forEach((conv, index) => {
    const date = conv.date;
    const chat = createConversation(
      conv.id,
      conv.title,
      conv.chatMessages,
      date,
      index
    );
    categorizeConversation(chat, date);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadConversations(conversations);
  addEventListeners();
  revealNode(nodes);

  //helpers
  // Hide empty sections
  document.querySelectorAll(".menu > span").forEach((span) => {
    const ul = span.nextElementSibling;
    if (ul.children.length === 0) {
      span.style.display = "none";
      ul.style.display = "none";
    }
  });

  // Attach dropdown to body on show
  $(".dropend .dropdown-toggle").on("show.bs.dropdown", function () {
    const dropdownMenu = $(this).next(".dropdown-menu");
    $("#menuConteiner").append(
      dropdownMenu
        .css({
          position: "absolute",
          left: $("#offcanvasNavbar").outerWidth() + $(this).outerWidth() + 10,
          top: $(this).offset().top,
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
