import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Bell, Settings, Users, Wallet } from "lucide-react"

interface FamilyHeaderProps {
  familyName: string
  parentName: string
  totalChildren: number
  monthlyBudget: number
}

export const FamilyHeader = ({ 
  familyName = "Família Silva", 
  parentName = "Ana Silva",
  totalChildren = 2,
  monthlyBudget = 500
}: FamilyHeaderProps) => {
  return (
    <header className="bg-card border-b border-border/50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
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
        </div>
      </div>
    </header>
  )
}