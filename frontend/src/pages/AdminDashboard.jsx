import { useEffect, useState } from "react";
import api from "../services/api";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadUsers = async (pageNumber = 1) => {
    try {
      const res = await api.get(`/api/users?page=${pageNumber}`);
      setUsers(res.data.users);
      setPage(res.data.currentPage);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = async (id, status) => {
  const confirmed = window.confirm(`Are you sure you want to ${status} user`);
  if (confirmed) {
    await api.put(`/api/users/${id}/${status}`);
    loadUsers();
  } 
  };

  useEffect(() => {
    loadUsers(page);
  }, [page]);

  if (loading) {
    return <p className="text-center mt-10">Loading users...</p>;
  }

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-2xl font-bold mb-6 text-center md:text-left">
        Admin Dashboard
      </h2>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border border-gray-300 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id} className="border-t">
                <td className="p-3">{u.email}</td>
                <td className="p-3">{u.fullName}</td>
                <td className="p-3 capitalize">{u.role}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-sm font-medium ${
                      u.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {u.status}
                  </span>
                </td>
                <td className="p-3 text-center">
                  {u.status === "active" ? (
                    <button
                      onClick={() => toggleStatus(u._id, "deactivate")}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Deactivate
                    </button>
                  ) : (
                    <button
                      onClick={() => toggleStatus(u._id, "activate")}
                      className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      Activate
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {users.map((u) => (
          <div key={u._id} className="border rounded-lg p-4 shadow-sm bg-white">
            <p className="text-sm">
              <span className="font-semibold">Email:</span> {u.email}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Name:</span> {u.fullName}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Role:</span> {u.role}
            </p>
            <p className="text-sm flex items-center gap-2">
              <span className="font-semibold">Status:</span>
              <span
                className={`px-2 py-1 rounded text-xs font-medium ${
                  u.status === "active"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {u.status}
              </span>
            </p>

            <div className="mt-3">
              {u.status === "active" ? (
                <button
                  onClick={() => toggleStatus(u._id, "deactivate")}
                  className="w-full py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Deactivate
                </button>
              ) : (
                <button
                  onClick={() => toggleStatus(u._id, "activate")}
                  className="w-full py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Activate
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>

        <span className="font-medium">
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
