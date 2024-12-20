"use client";
import React, { FormEvent, Suspense } from "react";
import { Image, Link } from "@chakra-ui/react";
import MobileMenu from "./MobileMenu";
import { ClerkLoaded, ClerkLoading, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { redirect, useSearchParams } from "next/navigation";
import { FaPerson } from "react-icons/fa6";

export function Search() {
    const searchParams = useSearchParams();

    function handleSearch(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const query = formData.get("query") as string;
        if (query != null && query.length > 0) {
            redirect("/search?query=" + encodeURIComponent(query));
        }
    }

    return (
        <>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    name="query"
                    defaultValue={
                        searchParams.get("query") != null ? decodeURIComponent(searchParams.get("query")!) : undefined
                    }
                    placeholder="search..."
                    className="bg-transparent outline-none dark:text-black"
                />
            </form>
            ;
            <Image src="/search.png" alt="" width={5} height={5} />
        </>
    );
}

export default function Header() {
    return (
        <div className="h-24 flex items-center justify-between bg-michelle text-white">
            {/* LEFT */}
            <div className="md:hidden lg:block w-[20%]">
                <Link href="/" className="font-bold text-xl text-black">
                    <Image
                        src="/finditfaster-logo-h.png"
                        height={100}
                        width={200}
                        alt="Find it Faster Logo"
                        className="ml-10"
                    />
                </Link>
            </div>
            {/* CENTER */}
            <div className="hidden md:flex w-[50%] text-sm items-center justify-between">
                {/* LINKS */}

                <div className="flex gap-6 text-white text-md">
                    <Link href="/about" className="flex items-center gap-2 text-lg">
                        <span>About</span>
                    </Link>
                    <Link href="/search" className="flex items-center gap-2">
                        <span className="text-lg">Business</span>
                    </Link>
                </div>
                <div className="hidden xl:flex p-2 bg-slate-100 items-center rounded-xl">
                    <Suspense>
                        <Search />
                    </Suspense>
                </div>
            </div>
            {/* RIGHT */}
            <div className="w-[30%] flex items-center gap-1 md:gap-4 lg:gap-6 xl:gap-8 2xl:gap-10 justify-end">
                <ClerkLoading>
                    <div className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-gray-500 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white" />
                </ClerkLoading>
                <ClerkLoaded>
                    <SignedIn>
                        <UserButton>
                            <UserButton.MenuItems>
                                <UserButton.Link href={"/profile"} label={"Manage Profile"} labelIcon={<FaPerson />} />
                            </UserButton.MenuItems>
                        </UserButton>
                    </SignedIn>
                    <SignedOut>
                        <div className="flex items-center gap-2 text-sm">
                            <Image src="/login.png" alt="" width={6} height={6} />
                            <Link href="/sign-in">Login/Register</Link>
                        </div>
                    </SignedOut>
                </ClerkLoaded>
                <MobileMenu />
            </div>
        </div>
    );
}
