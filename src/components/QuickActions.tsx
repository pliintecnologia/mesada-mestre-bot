import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, ListChecks, Coins, Calendar, Users, BarChart3 } from "lucide-react"

export const QuickActions = () => {
  const actions = [
    {
      icon: Plus,
      label: "Nova Tarefa",
      description: "Criar uma nova tarefa para os filhos",
      variant: "hero" as const,
      onClick: () => console.log("Nova tarefa")
    },
    {
      icon: Coins,
      label: "Definir Mesada",
      description: "Configurar valores de mesada",
      variant: "accent" as const,
      onClick: () => console.log("Definir mesada")
    },
    {
      icon: Calendar,
      label: "Agendar Tarefa",
      description: "Programar tarefas recorrentes",
      variant: "secondary" as const,
      onClick: () => console.log("Agendar tarefa")
    },
    {
      icon: BarChart3,
      label: "Ver Relatórios",
      description: "Acompanhar progresso dos filhos",
      variant: "outline" as const,
      onClick: () => console.log("Ver relatórios")
    },
    {
      icon: Users,
      label: "Gerenciar Filhos",
      description: "Adicionar ou editar perfis",
      variant: "outline" as const,
      onClick: () => console.log("Gerenciar filhos")
    },
    {
      icon: ListChecks,
      label: "Todas as Tarefas",
      description: "Ver lista completa de tarefas",
      variant: "outline" as const,
      onClick: () => console.log("Todas as tarefas")
    }
  ]

  return (
    <Card className="border-0 shadow-card">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
          <div className="p-2 rounded-lg bg-primary/20">
            <ListChecks className="h-5 w-5 text-primary" />
          </div>
          Ações Rápidas
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant={action.variant}
              className="h-auto p-4 flex-col items-start text-left gap-2 hover:-translate-y-1"
              onClick={action.onClick}
            >
              <div className="flex items-center gap-3 w-full">
                <action.icon className="h-5 w-5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{action.label}</p>
                  <p className="text-xs opacity-80 truncate">{action.description}</p>
                </div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}