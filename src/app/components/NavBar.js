"use client";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import ProfileModal from "./ProfileModal";
import NotifyModal from "./NotifyModal";
import YourPost from "./YourPostDropDown";

export default function Navbar() {
    const pathname = usePathname();
    const { data: session, status, update } = useSession();
    const router = useRouter();

    if (pathname === "/login") {
        return null;
    }

    return (
        status === "authenticated" &&
        (

            <nav className="bg-indigo-500 fixed text-white px-8 py-4 flex items-center justify-center shadow-lg h-16 top-0 left-0 w-full z-50">
                
                <button className="absolute left-8">
                    <NotifyModal session={session} update={update}/>
                </button>

                {/* Centered Logo Text */}
                <button className="text-4xl font-bold tracking-wide justify-center text-center cursor-pointer" onClick={() => router.push("/home")}>
                    <p className="text-2xl -mb-2 text-gray-200 text-glow animate-bounce">Ngao Ngao</p> {/* Only the text */}
                </button>

                <div className="absolute right-25">
                    <YourPost />
                </div>

                {/* Profile Image with Dropdown Shadow at the top right */}
                <div className="absolute right-8">
                    <ProfileModal session={session} />
                </div>
            </nav>

            
        )
    )
}
