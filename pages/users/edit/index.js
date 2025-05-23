import { useEffect, useState } from "react";

export default function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://reqres.in/api/users?page=1", {
      headers: {
        "x-api-key": "reqres-free-v1",
      },
    })
      .then((res) => res.json())
      .then((data) => setUsers(data.data));
  }, []);

  const handleDelete = async (id) => {
    const res = await fetch(`https://reqres.in/api/users/${id}`, {
      method: "DELETE",
      headers: {
        "x-api-key": "reqres-free-v1",
      },
    });

    if (res.status === 204) {
      alert("User deleted successfully");
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">User List</h1>
      <table className="w-full border">
        <thead>
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Avatar</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="border p-2">{user.id}</td>
              <td className="border p-2">
                <img src={user.avatar} alt={user.first_name} className="w-12 h-12 rounded-full" />
              </td>
              <td className="border p-2">{user.first_name} {user.last_name}</td>
              <td className="border p-2">{user.email}</td>
              <td className="border p-2 space-x-2">
                <button
                  onClick={() => window.location.href = `/users/edit/${user.id}`}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
