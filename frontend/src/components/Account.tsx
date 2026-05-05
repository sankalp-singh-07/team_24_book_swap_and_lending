import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import profilePicture from "./profile-picture.png";
import { useAuth } from "../context/AuthProvider";
import Cards from "./Cards";
import { apiEndpoints } from "../api/apiEnpoints";
import { FaBell, FaCheck, FaPlus, FaTimes, FaUndo } from "react-icons/fa";

const statusClass = {
  pending: "bg-amber-100 text-amber-800",
  approved: "bg-emerald-100 text-emerald-800",
  rejected: "bg-rose-100 text-rose-800",
  returned: "bg-slate-100 text-slate-800",
};

const Account = () => {
  const [authUser] = useAuth();
  const [userData, setUserData] = useState(null);
  const [booksOwned, setBooksOwned] = useState([]);
  const [ownerRequests, setOwnerRequests] = useState([]);
  const [myRequests, setMyRequests] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const bookById = useMemo(() => {
    return booksOwned.reduce((map, book) => {
      map[book.id || book._id] = book;
      return map;
    }, {});
  }, [booksOwned]);

  const loadDashboard = async () => {
    if (!authUser) return;
    setLoading(true);
    setError(null);

    try {
      const [profileRes, booksRes, ownerReqRes, myReqRes, notifRes] =
        await Promise.all([
          axios.get(apiEndpoints.GET_USER_PROFILE(authUser._id)),
          axios.get(apiEndpoints.GET_BOOKS),
          axios.get(apiEndpoints.GET_OWNER_REQUESTS(authUser._id)),
          axios.get(apiEndpoints.GET_MY_REQUESTS(authUser._id)),
          axios.get(apiEndpoints.GET_NOTIFICATIONS(authUser._id)),
        ]);

      setUserData(profileRes.data.user);
      setBooksOwned(booksRes.data.filter((book) => book.user === authUser._id));
      setOwnerRequests(ownerReqRes.data);
      setMyRequests(myReqRes.data);
      setNotifications(notifRes.data);
    } catch (err) {
      console.error("Error loading dashboard:", err);
      setError("Failed to load dashboard.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, [authUser]);

  const updateRequestStatus = async (requestId, status) => {
    try {
      await axios.put(apiEndpoints.UPDATE_REQUEST_STATUS(requestId), {
        status,
      });
      loadDashboard();
    } catch (err) {
      console.error("Error updating request:", err);
      setError("Could not update request status.");
    }
  };

  if (!authUser) {
    return (
      <div className="pt-28 text-center">
        You need to log in to view this page.
      </div>
    );
  }

  if (loading)
    return <div className="pt-28 text-center">Loading dashboard...</div>;
  if (error)
    return <div className="pt-28 text-center text-rose-600">{error}</div>;

  return (
    <div className="pt-24 pb-12">
      <div className="container mx-auto px-4 space-y-8">
        <section className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex flex-col items-center">
            <img
              src={profilePicture}
              alt="User"
              className="rounded-full w-32 h-32 mb-4"
            />
            <h4 className="text-lg font-semibold dark:text-white">
              {userData?.fullname}
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {userData?.email}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300 text-center mt-2">
              {userData?.address || "No location added"}
            </p>
            <Link
              to="/add-book"
              className="mt-5 inline-flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700"
            >
              <FaPlus /> List a Book
            </Link>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold dark:text-white">
                Notifications
              </h3>
              <FaBell className="text-emerald-600" />
            </div>
            <div className="space-y-3">
              {notifications.length > 0 ? (
                notifications.slice(0, 5).map((notification) => (
                  <div
                    key={notification.id || notification._id}
                    className="border dark:border-gray-700 rounded p-3"
                  >
                    <p className="text-sm dark:text-gray-100">
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {notification.type}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-600 dark:text-gray-300">
                  No notifications yet.
                </p>
              )}
            </div>
          </div>
        </section>

        <section className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold mb-4 dark:text-white">
            Owner Dashboard
          </h3>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Book</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Due Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {ownerRequests.length > 0 ? (
                  ownerRequests.map((request) => (
                    <tr key={request.id || request._id}>
                      <td>
                        {bookById[request.bookId]?.name || request.bookId}
                      </td>
                      <td className="capitalize">{request.requestType}</td>
                      <td>
                        <span
                          className={`px-2 py-1 rounded text-xs ${statusClass[request.status] || statusClass.pending}`}
                        >
                          {request.status}
                        </span>
                      </td>
                      <td>{request.dueDate || "After approval"}</td>
                      <td className="flex gap-2">
                        <button
                          onClick={() =>
                            updateRequestStatus(
                              request.id || request._id,
                              "approved",
                            )
                          }
                          className="btn btn-xs bg-emerald-600 text-white border-0"
                          title="Approve"
                        >
                          <FaCheck />
                        </button>
                        <button
                          onClick={() =>
                            updateRequestStatus(
                              request.id || request._id,
                              "rejected",
                            )
                          }
                          className="btn btn-xs bg-rose-600 text-white border-0"
                          title="Reject"
                        >
                          <FaTimes />
                        </button>
                        <button
                          onClick={() =>
                            updateRequestStatus(
                              request.id || request._id,
                              "returned",
                            )
                          }
                          className="btn btn-xs"
                          title="Mark returned"
                        >
                          <FaUndo />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center text-gray-500">
                      No incoming requests yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold mb-4 dark:text-white">
              My Requests
            </h3>
            <div className="space-y-3">
              {myRequests.length > 0 ? (
                myRequests.map((request) => (
                  <div
                    key={request.id || request._id}
                    className="border dark:border-gray-700 rounded p-3 flex justify-between"
                  >
                    <div>
                      <p className="font-medium">Book ID: {request.bookId}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300 capitalize">
                        {request.requestType}
                      </p>
                    </div>
                    <span
                      className={`h-fit px-2 py-1 rounded text-xs ${statusClass[request.status] || statusClass.pending}`}
                    >
                      {request.status}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-gray-600 dark:text-gray-300">
                  You have not requested any books yet.
                </p>
              )}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold mb-4 dark:text-white">
              My Library
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {booksOwned.length > 0 ? (
                booksOwned.map((book) => (
                  <Cards key={book.id || book._id} item={book} />
                ))
              ) : (
                <p className="text-gray-600 dark:text-gray-300">
                  No books listed yet.
                </p>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Account;
