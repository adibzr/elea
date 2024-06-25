let conversations = [
  {
    title: "Conversación 1 - Título largo",
    chatMessages: [
      "¡Hola! Quiero saber información sobre la siguiente molécula: adrenalina",
      "La adrenalina, también conocida como epinefrina, es una hormona y un neurotransmisor crucial en la respuesta de 'lucha o huida' del cuerpo humano. Aquí hay una descripción detallada:",
    ],
    date: "2024-06-24",
  },
  {
    title: "Conversación 2",
    chatMessages: [],
    date: "2024-06-19",
  },
  {
    title: "Conversación 2",
    chatMessages: [],
    date: "2024-06-23",
  },
  {
    title: "Conversación 3 - Título largo",
    chatMessages: [],
    date: "2024-06-2",
  },
  {
    title: "Conversación 3 - Título largo",
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

/**
 * Creates a conversation element with a title and appends it to the menu container.
 *
 * @param {string} title - The title of the conversation.
 * @param {string[]} chatMessages - The chat messages of the conversation.
 * @param {string} date - The date of the conversation.
 * @return {HTMLElement} The created conversation element.
 */
function createConversation(title, chatMessages = [], date, index) {
  const container = document.getElementById("menuConteiner");
  const div = document.createElement("div");
  div.className = "dropend menuItem";

  const conversation = document.createElement("input");
  conversation.type = "button";
  conversation.className = "btn chat-title";
  conversation.value = title;

  // add event doble click listener to edit chat name. Confirm on enter key or on blur
  conversation.addEventListener("dblclick", () => {
    const oldTitle = conversation.value;
    conversation.value = "";
    conversation.type = "input";
    conversation.focus();
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
  dropdownButton.type = "button";
  dropdownButton.className =
    "btn dropdown-button dropdown-toggle dropdown-toggle-split";
  dropdownButton.setAttribute("data-bs-toggle", "dropdown");
  dropdownButton.setAttribute("aria-haspopup", "true");
  dropdownButton.setAttribute("aria-expanded", "false");
  dropdownButton.setAttribute("data-bs-offset", `0,10`);

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

  const dropdownMenu = document.getElementById("dropdownMenu");
  const clonedElement = dropdownMenu.cloneNode(true);
  // add event change name button event listener to edit chat name. Confirm on enter key or on blur
  clonedElement.children[1].addEventListener("click", () => {
    const oldtitle = conversation.value;
    conversation.value = "";
    conversation.type = "input";
    conversation.focus();
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
  div.appendChild(clonedElement);

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
  Object.values(menuItems).forEach((item) => {
    item.addEventListener("click", (item) => {
      // item.target.className += " active";
      // console.log(item.target.innerHTML);
    });
  });

  // console.log(Object.values(menuItems));
  // Object.values(menuItems).forEach((item) => {
  //   const text = item.querySelectorAll("button")[0];
  //   console.log(text);
  // });

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
    const chat = createConversation(conv.title, conv.chatMessages, date, index);
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
    $("body").append(dropdownMenu.detach());
  });

  // detach dropdown from body on hide
  $(".dropend .dropdown-toggle").on("hidden.bs.dropdown", function () {
    const dropdownMenu = $(this).next(".dropdown-menu");
    $(".bs-example").append(dropdownMenu.detach());
  });
});
