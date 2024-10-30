import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Provider } from "@/components/ui/provider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ClerkProvider } from "@clerk/nextjs";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: "Find It Faster",
    description: "Faster than the other guys",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning={true}>
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning={true}>
                <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
                    <Provider>
                        <div className="w-full bg-slate-500 dark:bg-emerald-300 md:px8 lg:px-16 xl:px32 2xl:px64">
                            <Header />
                        </div>
                        <div className="w-full px-4 bg-white dark:bg-slate-600 md:px8 lg:px-16 xl:px32 2xl:px64">
                            {children}
                        </div>
                        <Footer />
                    </Provider>
                </ClerkProvider>
            </body>
        </html>
    );
}
