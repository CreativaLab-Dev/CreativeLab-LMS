import { auth } from "@/auth";
import { redirect } from "next/navigation";
import HeaderPage from "@/components/ui/header-page";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getStatisticsMembership } from "@/features/statistics/actions/get-statistics-memberships";
import { getStatisticsPayments } from "@/features/statistics/actions/get-statistics-payments";
import MembershipStatistics from "@/features/statistics/components/membership-statistics";
import PaymentStatistics from "@/features/statistics/components/payments-statistics";
import StudentsStatistics from "@/features/statistics/components/students-statistics";
import { getStatisticsStudents } from "@/features/statistics/actions/get-statistics-students";

interface StatisticsPageProps {
  searchParams: {
    year: number
  }
}

const statisticsPage = async ({
  searchParams
}: StatisticsPageProps) => {
  const session = await auth()
  if (!session || !session.user || !session.user.id) {
    return redirect('/')
  }
  const year = searchParams?.year || new Date().getFullYear()

  const {
    chartMembershipData,
    monthlyMembershipCount,
    yearlyMembershipCount,
    studentCount
  } = await getStatisticsMembership(year);

  const {
    chartRevenueData,
    totalYearlyRevenue
  } = await getStatisticsPayments(year);

  const {
    chartStudentData,
    totalActiveStudents,
    totalNewStudents
  } = await getStatisticsStudents(year);

  return (
    <div className="space-y-3 py-4 lg:py-8">
      <HeaderPage
        title="Estadisticas"
        description="Aquí encontrarás todas las estadisticas"
        bgColor="bg-sky-200"
        icon="statistics"
        iconColor="text-sky-500"
      />
      <div className="px-6">
        <Tabs defaultValue="memberships">
          <TabsList className="flex flex-row gap-3 justify-start w-full">
            <TabsTrigger value="memberships">Membresias</TabsTrigger>
            <TabsTrigger value="payments">Pagos</TabsTrigger>
            <TabsTrigger value="students">Estudiantes</TabsTrigger>

          </TabsList>
          <TabsContent value="memberships">
            <MembershipStatistics
              studentCount={studentCount}
              monthlyMembershipCount={monthlyMembershipCount}
              yearlyMembershipCount={yearlyMembershipCount}
              chartMembershipData={chartMembershipData}
              currentYear={year}
            />
          </TabsContent>
          <TabsContent value="payments">
            <PaymentStatistics
              totalYearlyRevenue={totalYearlyRevenue}
              chartRevenueData={chartRevenueData}
              currentYear={year}
            />
          </TabsContent>
          <TabsContent value="students">
            <StudentsStatistics
              chartStudentData={chartStudentData}
              totalActiveStudents={totalActiveStudents}
              totalNewStudents={totalNewStudents}
              currentYear={year}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default statisticsPage;