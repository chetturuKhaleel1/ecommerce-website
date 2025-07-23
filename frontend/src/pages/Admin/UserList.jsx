import React, { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import {
  useGetUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
} from "../../redux/api/usersApiSlice";
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu";
// 👇 You already have the correct imports

const UserList = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();

  const [editNameId, setEditNameId] = useState(null);
  const [editEmailId, setEditEmailId] = useState(null);
  const [editableUserName, setEditableUserName] = useState("");
  const [editableUserEmail, setEditableUserEmail] = useState("");

  useEffect(() => {
    refetch();
  }, [refetch]);

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await deleteUser(id);
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const toggleEditName = (id, username) => {
    setEditNameId(id);
    setEditableUserName(username || "");
  };

  const toggleEditEmail = (id, email) => {
    setEditEmailId(id);
    setEditableUserEmail(email || "");
  };

  const updateHandler = async (id) => {
    try {
      await updateUser({
        userId: id,
        username: editableUserName,
        email: editableUserEmail,
      });
      setEditNameId(null);
      setEditEmailId(null);
      refetch();
      toast.success("User updated");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="p-4">
   
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="error">{error?.data?.message || error.error}</Message>
      ) : (
        <div className="flex flex-col md:flex-row">
          <AdminMenu />
          <table className="w-full text-left table-auto">
            <thead>
              <tr className="border-b">
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">NAME</th>
                <th className="px-4 py-2">EMAIL</th>
                <th className="px-4 py-2">ADMIN</th>
                <th className="px-4 py-2">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-b">
                  <td className="px-4 py-3 text-sm">{user._id}</td>

                  <td className="px-4 py-3">
                    {editNameId === user._id ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={editableUserName}
                          onChange={(e) => setEditableUserName(e.target.value)}
                          className="p-1 border rounded"
                        />
                        <button
                          onClick={() => updateHandler(user._id)}
                          className="bg-green-500 text-white p-1 rounded"
                        >
                          <FaCheck />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span>{user.username}</span>
                        <button
                          onClick={() => toggleEditName(user._id, user.username)}
                        >
                          <FaEdit />
                        </button>
                      </div>
                    )}
                  </td>

                  <td className="px-4 py-3">
                    {editEmailId === user._id ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="email"
                          value={editableUserEmail}
                          onChange={(e) => setEditableUserEmail(e.target.value)}
                          className="p-1 border rounded"
                        />
                        <button
                          onClick={() => updateHandler(user._id)}
                          className="bg-green-500 text-white p-1 rounded"
                        >
                          <FaCheck />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <a href={`mailto:${user.email}`}>{user.email}</a>
                        <button
                          onClick={() => toggleEditEmail(user._id, user.email)}
                        >
                          <FaEdit />
                        </button>
                      </div>
                    )}
                  </td>

                  <td className="px-4 py-3">
                    {user.isAdmin ? (
                      <FaCheck className="text-green-600" />
                    ) : (
                      <FaTimes className="text-red-600" />
                    )}
                  </td>

                  <td className="px-4 py-3">
                    {!user.isAdmin && (
                      <button
                        onClick={() => deleteHandler(user._id)}
                        className="bg-red-600 hover:bg-red-700 text-white p-2 rounded"
                      >
                        <FaTrash />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserList;
