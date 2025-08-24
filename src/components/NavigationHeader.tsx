import { Link, useLocation } from "react-router-dom"
import { useAuth } from "@/hooks/useAuth"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { 
  Bell, 
  Settings, 
  Users, 
  Wallet, 
  Home, 
  CheckSquare, 
  MessageSquare,
  BarChart3,
  LogOut,
  Menu,
  X
} from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

interface NavigationHeaderProps {
  familyName: string
  parentName: string
  totalChildren: number
  monthlyBudget: number
}

export const NavigationHeader = ({ 
  familyName = "Família Silva", 
  parentName = "Ana Silva",
  totalChildren = 2,
  monthlyBudget = 500
}: NavigationHeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()
  const { signOut } = useAuth()
  const { toast } = useToast()

  const handleLogout = async () => {
    try {
      await signOut()
      toast({
        title: "Logout realizado com sucesso!",
        description: "Até logo!"
      })
    } catch (error) {
      toast({
        title: "Erro no logout",
        description: "Tente novamente",
        variant: "destructive"
      })
    }
  }

  const navItems = [
    { path: "/", label: "Dashboard", icon: Home },
    { path: "/tarefas", label: "Tarefas", icon: CheckSquare },
    { path: "/whatsapp", label: "WhatsApp", icon: MessageSquare },
    { path: "/relatorios", label: "Relatórios", icon: BarChart3 },
  ]

  const isActive = (path: string) => location.pathname === path

  return (
    <header className="bg-card border-b border-border/50 px-6 py-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-primary-glow">
              <Users className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">{familyName}</h1>
              <p className="text-sm text-muted-foreground">
                Olá, {parentName} • {totalChildren} filhos
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-2">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path}>
                <Button
                  variant={isActive(item.path) ? "default" : "ghost"}
                  className="gap-2"
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Button>
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg bg-accent/10 border border-accent/20">
            <Wallet className="h-4 w-4 text-accent" />
            <span className="text-sm font-medium text-foreground">
              R$ {monthlyBudget.toLocaleString('pt-BR')}
            </span>
            <Badge variant="secondary" className="text-xs">
              Mesada Mensal
            </Badge>
          </div>

          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <div className="absolute -top-1 -right-1 h-4 w-4 bg-accent rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-accent-foreground">3</span>
            </div>
          </Button>

          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>

          <Avatar className="h-9 w-9 ring-2 ring-primary/20">
            <AvatarImage src="/placeholder.svg" alt={parentName} />
            <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
              {parentName.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>

          <Button 
            variant="ghost" 
            size="icon" 
            className="text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5" />
          </Button>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden mt-4 pb-4 border-t border-border/50">
          <nav className="flex flex-col gap-2 mt-4">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path}>
                <Button
                  variant={isActive(item.path) ? "default" : "ghost"}
                  className="w-full justify-start gap-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Button>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}