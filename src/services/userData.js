import axiosInstance from "./axiosService";

const addUser = async (newUser) => {
  try {
    const res = await axiosInstance.post("/users", newUser);
    return res.data;
  } catch (err) {
    throw new Error(err);
  }
};

const editUser = async ({ newUser, id }) => {
  try {
    const res = await axiosInstance.patch(`/users/${id}`, newUser);
    return res.data;
  } catch (err) {
    throw new Error(err);
  }
};

const removeUser = async (id) => {
  try {
    const res = await axiosInstance.delete(`/users/${id}`);
    return res.data;
  } catch (err) {
    throw new Error(err);
  }
};

export default { addUser, removeUser, editUser };
