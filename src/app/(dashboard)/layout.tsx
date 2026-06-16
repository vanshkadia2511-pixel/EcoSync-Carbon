import SideNav from '@/components/layout/SideNav';
import DemoModeBanner from '@/components/demo/DemoModeBanner';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import BottomNav from '@/components/BottomNav';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[var(--color-surface)]">
      <ProtectedRoute>
        <SideNav />
        <main className="flex-1 overflow-y-auto pb-24 md:pb-0">
          {children}
        </main>
        <BottomNav />
        <DemoModeBanner />
      </ProtectedRoute>
    </div>
  );
}

