import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchUsers() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch("https://reqres.in/api/users", {
          headers: {
            "x-api-key": "reqres-free-v1",
          },
        });

        if (!res.ok) throw new Error("Failed to fetch users");

        const data = await res.json();
        setUsers(data.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    const res = await fetch(`https://reqres.in/api/users/${id}`, {
      method: "DELETE",
      headers: {
        "x-api-key": "reqres-free-v1",
      },
    });

    if (res.status === 204) {
      alert("ลบบัญชีผู้ใช้สำเร็จ");
      setUsers(users.filter((user) => user.id !== id));
    } else {
      alert("ลบบัญชีผู้ใช้ไม่สำเร็จ");
    }
  };

  const handleLogout = () => {
    alert("ออกจากระบบเรียบร้อย กำลังพาไปหน้า Login...");
    setTimeout(() => {
      router.push("/login");
    }, 3000); // รอ 3 วินาที
  };

  if (loading) return <p className="p-4 text-center text-blue-600 font-semibold">Loading users...</p>;
  if (error) return <p className="p-4 text-center text-red-600 font-semibold">{error}</p>;

  return (
    <div className="min-h-screen p-8 bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="max-w-4xl mx-auto flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-indigo-700 tracking-wide drop-shadow-md">
          User List
        </h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg shadow-md transition duration-300"
        >
          Logout
        </button>
      </div>

      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <table className="w-full table-auto border-collapse border border-gray-200">
          <thead className="bg-indigo-100">
            <tr>
              <th className="border border-gray-300 px-6 py-3 text-indigo-700 uppercase font-semibold tracking-wide">ID</th>
              <th className="border border-gray-300 px-6 py-3 text-indigo-700 uppercase font-semibold tracking-wide">Avatar</th>
              <th className="border border-gray-300 px-6 py-3 text-indigo-700 uppercase font-semibold tracking-wide">Name</th>
              <th className="border border-gray-300 px-6 py-3 text-indigo-700 uppercase font-semibold tracking-wide">Email</th>
              <th className="border border-gray-300 px-6 py-3 text-indigo-700 uppercase font-semibold tracking-wide">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="odd:bg-white even:bg-indigo-50 hover:bg-indigo-100 transition-colors duration-200"
              >
                <td className="border border-gray-300 px-6 py-4 text-center text-indigo-800 font-medium">{user.id}</td>
                <td className="border border-gray-300 px-6 py-4 text-center">
                  <img
                    src={user.avatar}
                    alt={user.first_name}
                    className="w-14 h-14 rounded-full mx-auto shadow-sm"
                  />
                </td>
                <td className="border border-gray-300 px-6 py-4 text-indigo-900 font-semibold">
                  {user.first_name} {user.last_name}
                </td>
                <td className="border border-gray-300 px-6 py-4 text-indigo-700">{user.email}</td>
                <td className="border border-gray-300 px-6 py-4 text-center space-x-3">
                  <button
                    onClick={() => (window.location.href = `/users/edit/${user.id}`)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow-md transition duration-300"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-md transition duration-300"
                  >
                    ลบบัญชีผู้ใช้
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
