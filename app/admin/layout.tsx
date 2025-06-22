import type React from "react";
import { Inter, Playfair_Display } from "next/font/google";

// import { FirebaseAdminProvider, useAdmin } from "@/components/admin/firebase-admin-provider"
import { AdminLayout } from "@/components/admin/admin-layout";
import { AdminLogin } from "@/components/admin/admin-login";
import { Loader2 } from "lucide-react";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  // const { user, loading } = useAdmin()

  // if (loading) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center">
  //       <div className="text-center">
  //         <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
  //         <p className="text-gray-600">Loading admin panel...</p>
  //       </div>
  //     </div>
  //   )
  // }

  // if (!user) {
  //   return <AdminLogin />
  // }

  return <AdminLayout>{children}</AdminLayout>;
}

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <FirebaseAdminProvider>
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-[#F8F6F3] text-[#2E2C2A] font-sans">
        <AdminLayoutContent>{children}</AdminLayoutContent>
      </body>
    </html>
    // </FirebaseAdminProvider>
  );
}
