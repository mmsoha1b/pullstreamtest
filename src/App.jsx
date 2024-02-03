import { useState } from "react";
import { Toaster } from "react-hot-toast";
import "./App.css";
import EditableTable from "./components/EditableTable";
import UserFormModal from "./components/UserFormModal";

function App() {
  const [userModalVisible, setUserModalVisible] = useState(null);
  const [userToEdit, setUserToEdit] = useState(null);
  const displayFormModal = () => {
    setUserModalVisible(true);
  };
  const hideFormModal = () => {
    setUserModalVisible(false);
  };
  const editUser = (user) => {
    setUserToEdit(user);
  };
  return (
    <>
      <Toaster />
      <main className='flex flex-col p-16 w-full  items-center  gap-2 '>
        <EditableTable
          displayFormModal={displayFormModal}
          editUser={editUser}
        />
      </main>
      {userModalVisible && (
        <UserFormModal hideFormModal={hideFormModal} user={userToEdit} />
      )}
    </>
  );
}

export default App;
