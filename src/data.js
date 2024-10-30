function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
}

function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

function getMainAccount() {
  return JSON.parse(localStorage.getItem("mainAccount")) || mainAccount;
}

function saveMainAccount(account) {
  localStorage.setItem("mainAccount", JSON.stringify(account));
}

// Определяем, находимся ли мы в продакшене (GitHub Pages)
const isProduction = window.location.hostname !== 'localhost';

// Функция возвращает правильный путь в зависимости от окружения
const getImagePath = (name) => isProduction ? `/react-chat-/${name}` : `/${name}`;

const initialUsers = [
  {
    id: 1,
    name: "Яна",
    avatar: getImagePath("yana.jpg"),
    status: "недавно",
    lastMessage: "Нет сообщений",
    lastMessageTime: "",
  },
  {
    id: 2,
    name: "Захар",
    avatar: getImagePath("zahar.jpg"),
    status: "онлайн",
    lastMessage: "Нет сообщений",
    lastMessageTime: "",
  },
  {
    id: 3,
    name: "Мама",
    avatar: getImagePath("mama.jpg"),
    status: "2 часа назад",
    lastMessage: "Нет сообщений",
    lastMessageTime: "",
  },
];

const mainAccount = {
  id: "german",
  name: "Герман",
  username: "@prodbyagny",
  bio: "Привет, я Герман!",
  avatar: getImagePath("herman.jpg"),
  status: "онлайн",
  lastMessage: "Нет сообщений",
  lastMessageTime: "",
};

export { getUsers, saveUsers, initialUsers, mainAccount, getMainAccount, saveMainAccount, getImagePath };

