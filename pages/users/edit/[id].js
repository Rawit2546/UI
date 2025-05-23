import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function EditUser() {
  const router = useRouter();
  const { id } = router.query;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (!id) return;
    fetch(`https://reqres.in/api/users/${id}`, {
      headers: { "x-api-key": "reqres-free-v1" },
    })
      .then((res) => res.json())
      .then((data) => {
        const user = data.data;
        setFirstName(user.first_name);
        setLastName(user.last_name);
        setEmail(user.email);
      });
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch(`https://reqres.in/api/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "reqres-free-v1",
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email: email,
        }),
      });

      if (res.ok) {
        setMessage({ type: "success", text: "User updated successfully!" });
        setTimeout(() => {
          router.push("/users");
        }, 1500);
      } else {
        const data = await res.json();
        setMessage({ type: "error", text: data.error || "Update failed" });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Something went wrong" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-xl max-w-md w-full p-8">
        <h1 className="text-3xl font-extrabold text-center mb-8 text-indigo-700">
          Edit User
        </h1>
        <form onSubmit={handleUpdate} className="space-y-6">
          <input
            type="text"
            placeholder="First Name"
            className="w-full border border-indigo-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            className="w-full border border-indigo-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full border border-indigo-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white font-semibold transition-colors duration-300 ${
              loading
                ? "bg-indigo-300 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {loading ? "Updating..." : "Update User"}
          </button>
        </form>

        {message && (
          <p
            className={`mt-6 text-center font-medium ${
              message.type === "success"
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {message.text}
          </p>
        )}
      </div>
    </div>
  );
}
