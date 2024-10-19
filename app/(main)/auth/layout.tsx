const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex flex-col items-center justify-center h-full bg-sky-100">
      {children}
    </main>
  );
}

export default AuthLayout;