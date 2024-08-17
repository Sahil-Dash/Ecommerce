export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className=" bg-gray-200 h-screen flex flex-col items-center justify-center">
        <div className="text-3xl font-semibold">Ecommerce</div>
        {children}
      </div>
    </>
  );
}
