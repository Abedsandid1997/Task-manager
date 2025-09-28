// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { Menu, X, Bell } from "lucide-react";
// export default function Nav() {
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [profileOpen, setProfileOpen] = useState(false);

//   return (
//     <nav className="relative bg-gray-800">
//       <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
//         <div className="relative flex h-16 items-center justify-between">
//           {/* Mobile menu button */}
//           <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
//             <button
//               onClick={() => setMobileOpen(!mobileOpen)}
//               className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-2 focus:-outline-offset-1 focus:outline-indigo-500"
//             >
//               <span className="sr-only">Open main menu</span>
//               {mobileOpen ? (
//                 <X className="h-6 w-6" aria-hidden="true" />
//               ) : (
//                 <Menu className="h-6 w-6" aria-hidden="true" />
//               )}
//             </button>
//           </div>

//           {/* Logo + Desktop menu */}
//           <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
//             <div className="flex shrink-0 items-center">
//               <img
//                 src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
//                 alt="Logo"
//                 className="h-8 w-auto"
//               />
//             </div>
//             <div className="hidden sm:ml-6 sm:block">
//               <div className="flex space-x-4">
//                 <Link
//                   href="/dashboard"
//                   className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
//                 >
//                   Dashboard
//                 </Link>
//                 <Link
//                   href="/team"
//                   className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white"
//                 >
//                   Team
//                 </Link>
//                 <Link
//                   href="/projects"
//                   className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white"
//                 >
//                   Projects
//                 </Link>
//                 <Link
//                   href="/calendar"
//                   className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white"
//                 >
//                   Calendar
//                 </Link>
//               </div>
//             </div>
//           </div>

//           {/* Right side */}
//           <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
//             {/* Notifications */}
//             <button
//               type="button"
//               className="relative rounded-full p-1 text-gray-400 hover:text-white focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500"
//             >
//               <span className="sr-only">View notifications</span>
//               <Bell className="h-6 w-6" />
//             </button>

//             {/* Profile dropdown */}
//             <div className="relative ml-3">
//               <button
//                 onClick={() => setProfileOpen(!profileOpen)}
//                 className="relative flex rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
//               >
//                 <span className="sr-only">Open user menu</span>
//                 <img
//                   src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
//                   alt="User"
//                   className="h-8 w-8 rounded-full bg-gray-800"
//                 />
//               </button>

//               {profileOpen && (
//                 <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5">
//                   <Link
//                     href="/profile"
//                     className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                   >
//                     Your Profile
//                   </Link>
//                   <Link
//                     href="/settings"
//                     className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                   >
//                     Settings
//                   </Link>
//                   <button
//                     onClick={() => alert("Sign out")}
//                     className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                   >
//                     Sign out
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Mobile menu */}
//       {mobileOpen && (
//         <div className="sm:hidden" id="mobile-menu">
//           <div className="space-y-1 px-2 pt-2 pb-3">
//             <Link
//               href="/dashboard"
//               className="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white"
//             >
//               Dashboard
//             </Link>
//             <Link
//               href="/team"
//               className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-white/5 hover:text-white"
//             >
//               Team
//             </Link>
//             <Link
//               href="/projects"
//               className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-white/5 hover:text-white"
//             >
//               Projects
//             </Link>
//             <Link
//               href="/calendar"
//               className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-white/5 hover:text-white"
//             >
//               Calendar
//             </Link>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// }

import Link from "next/link";
import { Home, FileText, Settings } from "lucide-react";

export default function Nav() {
  return (
    <aside className="fixed top-0 left-0 h-full w-64 bg-gray-900 text-white flex flex-col shadow-lg">
      <div className="p-4 text-2xl font-bold border-b border-gray-700">
        Min App
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          <li>
            <Link
              href="/"
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-800 cursor-pointer"
            >
              <Home size={18} /> <span>Home</span>
            </Link>
          </li>
          <li>
            <Link
              href="/tasks/list"
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-800 cursor-pointer"
            >
              <FileText size={18} /> <span>Tasks</span>
            </Link>
          </li>
          <li>
            <Link
              href="/users"
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-800 cursor-pointer"
            >
              <Settings size={18} /> <span>Inställningar</span>
            </Link>
          </li>
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-700">
        <span className="text-sm text-gray-400">© 2025</span>
      </div>
    </aside>
  );
}
