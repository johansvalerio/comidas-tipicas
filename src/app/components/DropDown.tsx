"use client";
import { signOut } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User, MenuIcon, Settings } from "lucide-react";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";

export default function UserDropdown({ session }: { session: Session | null }) {
  const router = useRouter();
  const userName = session?.user?.name || "";
  const userEmail = session?.user?.email || "";
  const userImage = session?.user?.image || "";

  const handleSignOut = async () => {
    try {
      console.log("handleSignOut called");
      await signOut({ redirect: false });
      router.refresh();
      // Eliminar el mensaje de bienvenida del localStorage
      localStorage.removeItem("welcomeShown");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  if (!session) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="relative">
          <Avatar
            data-testid="user-dropdown-menu"
            className="h-9 w-9 cursor-pointer border border-border hover:opacity-80 transition-opacity"
          >
            <AvatarImage src={userImage} alt={userName} />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {userName.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56" role="menu">
        <div className="flex items-center justify-start gap-2 p-2">
          <Avatar className="h-8 w-8 relative">
            <AvatarImage src={userImage} alt={userName} />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {userName.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">{userName}</p>
            <p className="text-xs text-muted-foreground">{userEmail}</p>
          </div>
        </div>
        <DropdownMenuSeparator />

        {session?.user?.role === 1 && (
          <DropdownMenuItem
            role="menuitem"
            onClick={() => router.push("/users/miperfil")}
            className="cursor-pointer flex flex-col items-start"
          >
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">Mi Perfil</span>
            </div>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem
          role="menuitem"
          onClick={() => router.push("/users/orders")}
          className="cursor-pointer flex flex-col items-start"
        >
          <div className="flex items-center gap-2">
            <MenuIcon className="h-4 w-4 mr-2" />
            <span className="text-sm font-medium">Mis Pedidos</span>
          </div>
        </DropdownMenuItem>
        {session?.user?.role === 1 && (
          <DropdownMenuItem
            role="menuitem"
            onClick={() => router.push("/users")}
            className="cursor-pointer flex flex-col items-start"
          >
            <div className="flex items-center gap-2">
              <Settings className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">Dashboard</span>
            </div>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem
          role="menuitem"
          onClick={handleSignOut}
          className="cursor-pointer text-destructive focus:text-destructive"
        >
          <LogOut className=" h-4 w-4 mr-2" />
          <span className="text-sm font-medium">Cerrar sesión</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
