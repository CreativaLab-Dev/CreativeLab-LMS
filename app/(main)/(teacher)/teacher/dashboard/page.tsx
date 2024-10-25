import { auth, signOut } from "@/auth";
import HeaderPage from "@/components/ui/header-page";

const DashboardTeacherPage = async () => {
  const session = await auth();
  return (
    <div className="space-y-3 py-4 lg:py-8">
      <HeaderPage
        icon="dashboard"
        title="Dashboard"
        description="Bienvenido a tu dashboard"
        bgColor="bg-sky-700/10"
        iconColor="text-sky-700"
      />
      <pre>
        {JSON.stringify(session, null, 2)}
      </pre>
      <form action={async () => {
        "use server"
        await signOut()
      }}>
        <button type="submit">
          Salir
        </button>
      </form>
    </div>
  );
}

export default DashboardTeacherPage;