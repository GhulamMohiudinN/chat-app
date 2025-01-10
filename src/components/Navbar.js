import { LogOut, MessageSquare, Settings, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/store/authSlice";


const Navbar = () => {
     const router = useRouter();
     const dispatch = useDispatch();

     const authUser = useSelector((state) => state.auth.authUser);

     // router.push('/home');

     const handleLogout = async () => {
          dispatch(logout());
          router.push("/login");
          // dispatch(checkAuth());
     };

     return (
          <header className="bg-base-100 border-b border-base-300 z-40 sticky w-full top-0  backdrop-blur-lg bg-base-100/80">
               <div className="container mx-auto px-4 h-16">
                    <div className="flex items-center justify-between h-full">
                         <div className="flex items-center gap-8" onClick={() => router.push("/home")}>
                              <div
                                   className="flex items-center gap-2.5 hover:opacity-80 transition-all"
                              >
                                   <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                                        <MessageSquare className="w-5 h-5 text-primary" />
                                   </div>
                                   <h1 className="text-lg font-bold">Chatty</h1>
                              </div>
                         </div>

                         <div
                              className="flex items-center gap-2"
                         >

                              <div
                                   onClick={() => router.push("/setting")}
                                   className={`btn btn-sm gap-2 transition-colors`}>
                                   <Settings className="w-4 h-4" />
                                   <span className="hidden sm:inline">Settings</span>
                              </div>
                              {authUser && (
                                   <>
                                        <div
                                             onClick={() => router.push("/profile")}
                                             className={`btn btn-sm gap-2`}
                                        >
                                             <User className="size-5" />
                                             <span className="hidden sm:inline">Profile</span>
                                        </div>

                                        <button
                                             className="flex gap-2 items-center"
                                             onClick={handleLogout}
                                        >
                                             <LogOut className="size-5" />
                                             <span className="hidden sm:inline">Logout</span>
                                        </button>
                                   </>
                              )}
                         </div>
                    </div>
               </div>
          </header >
     );
};
export default Navbar;
