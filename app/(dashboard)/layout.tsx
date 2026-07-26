import { Suspense } from "react";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";

async function SidebarConversations() {
  const { userId } = await auth();
  const conversations = userId
    ? await prisma.conversation.findMany({
        where: { userId },
        include: { character: true },
        orderBy: { createdAt: "desc" },
      })
    : [];

  return <Sidebar conversations={conversations} />;
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Suspense
        fallback={
          <div className="w-64 h-full border-r border-border bg-surface animate-pulse" />
        }
      >
        <SidebarConversations />
      </Suspense>
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        {children}
      </div>
    </div>
  );
}
