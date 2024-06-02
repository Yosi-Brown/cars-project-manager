import React from 'react';

function ShowUser({ user }) {
  console.log(user);
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200">Field</th>
            <th className="py-2 px-4 border-b border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200">Value</th>
          </tr>
        </thead>
        <tbody>

          <tr>
            <td className="py-2 px-4 border-b border-r border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-300">Email</td>
            <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-300">{user.email}</td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-b border-r border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-300">First Name</td>
            <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-300">{user.firstName}</td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-b border-r border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-300">Last Name</td>
            <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-300">{user.lastName}</td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-b border-r border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-300">Phone</td>
            <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-300">{user.phone}</td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-b border-r border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-300">Address</td>
            <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-300">{user.address}</td>
          </tr>
          {/* <tr>
            <td className="py-2 px-4 border-b border-r border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-300">Role</td>
            <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-300">{user.role}</td>
          </tr> */}
        </tbody>
      </table>
    </div>
  );
}

export default ShowUser;
