const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex flex-col items-center justify-center h-full bg-gradient-to-l from-blue-800 to-blue-500">
      {children}
    </main>
  );
}

export default AuthLayout;