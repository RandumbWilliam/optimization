import Sidebar from "@/components/Sidebar";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <div className="flex">
          <Sidebar />
          <div className="flex-1 text-gray-500 dark:text-gray-400">
            <div className="h-screen overflow-y-auto bg-gray-50 dark:bg-gray-900">
              <div className="container px-6 mx-auto grid mb-40">
                {children}
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
