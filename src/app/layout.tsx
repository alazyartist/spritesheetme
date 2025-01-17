import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { TRPCReactProvider } from "@/trpc/react";
import {
  HistoryIcon,
  ImagePlusIcon,
  MessageSquare,
  Share,
  UsersIcon,
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "spritesheet.me",
  description: "Create Spritesheets",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <div className="dark flex w-[100vw] max-w-[calc(100vw-1.25rem)] flex-col items-center justify-center text-white">
          <Header />
          <SidebarProvider>
            <AppSideBar />
            <div className="h-full w-full pl-2">
              <SidebarTrigger className="fixed top-16" />
              <TRPCReactProvider>
                <div className="mt-16 h-[calc(100vh-4.5rem)] rounded-md border pl-8 pt-2">
                  {children}
                </div>
              </TRPCReactProvider>
            </div>
          </SidebarProvider>
        </div>
      </body>
    </html>
  );
}
const Header = () => {
  return (
    <div className="fixed left-0 top-0 z-[100] flex h-14 w-full items-center justify-between bg-zinc-900 p-4 text-zinc-200">
      <Link href="/">
        <h1 className="text-3xl font-bold">spritesheet.me</h1>
      </Link>
      <div className="flex gap-2">
        <Share />
        <MessageSquare />
      </div>
    </div>
  );
};
const AppSideBar = () => {
  const items = [
    {
      title: "Create",
      url: "/",
      icon: () => <ImagePlusIcon />,
    },
    {
      title: "History",
      url: "/history",
      icon: () => <HistoryIcon />,
    },
  ];
  const items_account = [
    {
      title: "Account",
      url: "/account",
      icon: () => <UsersIcon />,
    },
  ];

  return (
    <Sidebar
      variant="floating"
      className="dark z-0 mt-14 max-h-[calc(100vh-3.5rem)]"
    >
      <SidebarContent className="p-2">
        <AppSideBarGroup group_name={"Spritesheets"} items={items} />
        <AppSideBarGroup group_name={"Account"} items={items_account} />
      </SidebarContent>
    </Sidebar>
  );
};

const AppSideBarGroup = ({
  items,
  group_name,
}: {
  items: { title: string; url: string; icon: () => JSX.Element }[];
  group_name: string;
}) => {
  return (
    <SidebarGroup className="dark">
      <SidebarGroupLabel>{group_name}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <Link href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};
