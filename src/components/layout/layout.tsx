import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Spinner } from "../spinner";
import { Footer } from "./footer";
import { Header } from "./header";

export const Layout = () => {
    return (
        <div className='flex flex-col h-screen'>
            <Header />
            <main className='flex-1 w-full p-4'>
                <Suspense fallback={<Spinner/>}>
                    <Outlet />
                </Suspense>
            </main>
            <Footer />
        </div>
    );
}