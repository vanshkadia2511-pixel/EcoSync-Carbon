import SideNav from '@/components/layout/SideNav';
import DemoModeBanner from '@/components/demo/DemoModeBanner';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[var(--color-surface)]">
      <ProtectedRoute>
        <SideNav />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
        <DemoModeBanner />
      </ProtectedRoute>
    </div>
  );
}
