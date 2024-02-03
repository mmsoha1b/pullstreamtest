import React, { useState } from "react";
import Button from "./Button";
import { mutate } from "swr";
import userData from "../services/userData";
import { toast } from "react-hot-toast";
export default function UserFormModal({ hideFormModal, user }) {
  const edit = user ? true : false;
  const [formData, setFormData] = useState({
    name: user?.name || "",
    salary: user?.salary || 0,
    designation: user?.designation || "",
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addNewUser = async () => {
    const { addUser } = userData;
    const newUser = {
      name: formData.name,
      designation: formData.designation,
      salary: formData.salary,
    };

    try {
      await addUser(newUser);
      mutate("/users");
      toast.success("Added new user", { duration: 2000 });
    } catch (err) {
      toast.error("Error occured " + err?.message, { duration: 2000 });
      console.log(err);
    }
  };

  const updateUser = async () => {
    const { editUser } = userData;
    const newUser = {
      name: formData.name,
      designation: formData.designation,
      salary: formData.salary,
    };
    try {
      await editUser({ newUser, id: user.id });
      mutate("/users");
      toast.success("Updated user", { duration: 2000 });
    } catch (err) {
      toast.error("Error occured " + err?.message, { duration: 2000 });
      console.log(err);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (edit) {
      await updateUser();
    } else {
      await addNewUser();
    }
    hideFormModal();
  };

  return (
    <div className='absolute w-[100dvw] h-[100dvh] top-0 left-0 bg-[rgba(200,200,200,0.5)]'>
      <div className='relative w-1/2 shadow-xl rounded-md border-gray-400 border-2 h-1/2 top-[50%] p-4 left-[50%] -translate-x-1/2 -translate-y-1/2 bg-white'>
        <h3 className='text-3xl font-extrabold'>
          {edit ? "Edit User" : "Add User"}
        </h3>
        <form
          className='flex flex-col gap-4  justify-evenly h-full '
          onSubmit={submitHandler}
        >
          <div class='relative  w-full mb-5 group'>
            <input
              type='text'
              name='name'
              id='name'
              placeholder='Enter name'
              value={formData.name}
              onChange={changeHandler}
              required
            />
            <label for='name'>Name</label>
          </div>
          <div class='relative  w-full mb-5 group'>
            <input
              type='number'
              name='salary'
              id='salary'
              value={formData.salary}
              placeholder='Enter salary '
              onChange={changeHandler}
              required
            />
            <label for='salary'>Salary</label>
          </div>
          <div class='relative flex flex-col gap-2 w-full mb-5 group'>
            <label for='designation'>Designation</label>
            <select
              name='designation'
              className='mt-3 h-9 p-2'
              value={formData.designation}
              id='designation'
              onChange={changeHandler}
              required
            >
              <option value={""} disabled>
                Select
              </option>
              <option value='manager'>Manager</option>
              <option value='hr'>HR</option>
              <option value='dev'>Developer</option>
            </select>
          </div>
          <section className='flex gap-2'>
            <Button type='submit'>ok</Button>
            <Button clickHandler={hideFormModal} varaint={"danger"}>
              Cancel
            </Button>
          </section>
        </form>
      </div>
    </div>
  );
}
