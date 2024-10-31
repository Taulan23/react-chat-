import "./App.css";
import Header from "./components/Header/Header";
import ChatList from "./components/ChatList/ChatList";
import CreateChatButton from "./components/CreateChat/CreateChatButton/CreateChatButton";
import { UsersProvider, useUsers } from "./context/UsersContext";
import { useState } from "react";
import Chat from "./components/Chat/Chat";
import { MainAccountProvider, useMainAccount } from "./context/MainAccountContext";
import { Routes, Route, useNavigate, useParams } from "react-router-dom";
import EditProfile from "./components/Header/Menu/EditProfile/EditProfile";

function ChatView() {
  const { chatId } = useParams();
  const { users } = useUsers();
  const navigate = useNavigate();
  const user = users.find(u => u.id === Number(chatId));
  
  const handleBack = () => {
    navigate('/');
  };

  if (!user) return <div>Чат не найден</div>;

  return <Chat user={user} onBack={handleBack} />;
}

function ProfileRoute() {
  const navigate = useNavigate();
  const { mainAccount, setMainAccount, saveMainAccount } = useMainAccount();
  const [isEdited, setIsEdited] = useState(false);
  const [tempAccount, setTempAccount] = useState({...mainAccount});

  const handleBack = () => {
    setMainAccount(tempAccount);
    navigate('/');
  };

  const handleSave = () => {
    if (!mainAccount.name.trim()) {
      return;
    }
    
    if (!mainAccount.username.startsWith('@') || mainAccount.username.length < 6) {
      return;
    }

    saveMainAccount();
    setTempAccount({...mainAccount});
    setIsEdited(false);
  };

  const handleInputChange = (type, value) => {
    setIsEdited(true);
    setMainAccount(prev => ({
      ...prev,
      [type]: value,
    }));
  };

  return (
    <>
      <Header 
        isProfileEdit={true}
        showEditButtons={isEdited}
        onBack={handleBack}
        onSave={handleSave}
      />
      <EditProfile 
        onInputChange={handleInputChange}
      />
    </>
  );
}

function AppContent() {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleChatItemClick = (userId) => {
    navigate(`/chat/${userId}`);
  };

  return (
    <Routes basename="/chat-app-client">
      <Route
        path="/"
        element={
          <>
            <Header
              searchText={searchText}
              onSearchChange={handleSearchChange}
              setSearchText={setSearchText}
              isChatOpen={false}
            />
            <CreateChatButton />
            <ChatList
              searchText={searchText}
              onChatItemClick={handleChatItemClick}
            />
          </>
        }
      />
      <Route path="/chat/:chatId" element={<ChatView />} />
      <Route 
        path="/edit/profile" 
        element={<ProfileRoute />} 
      />
    </Routes>
  );
}

export default function App() {
  return (
    <UsersProvider>
      <MainAccountProvider>
        <AppContent />
      </MainAccountProvider>
    </UsersProvider>
  );
}
