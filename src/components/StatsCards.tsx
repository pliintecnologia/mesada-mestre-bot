import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, Star, TrendingUp } from "lucide-react"

interface StatsCardsProps {
  completedTasks: number
  pendingTasks: number
  totalEarned: number
  averageScore: number
}

export const StatsCards = ({
  completedTasks = 12,
  pendingTasks = 4,
  totalEarned = 180,
  averageScore = 8.5
}: StatsCardsProps) => {
  const stats = [
    {
      icon: CheckCircle,
      label: "Tarefas Concluídas",
      value: completedTasks,
      suffix: " esta semana",
      gradient: "from-success to-success/80",
      bgColor: "bg-success/10",
      iconColor: "text-success"
    },
    {
      icon: Clock,
      label: "Tarefas Pendentes",
      value: pendingTasks,
      suffix: " em andamento",
      gradient: "from-warning to-warning/80",
      bgColor: "bg-warning/10",
      iconColor: "text-warning"
    },
    {
      icon: Star,
      label: "Média de Notas",
      value: averageScore,
      suffix: "/10",
      gradient: "from-accent to-accent-glow",
      bgColor: "bg-accent/10",
      iconColor: "text-accent"
    },
    {
      icon: TrendingUp,
      label: "Total Ganho",
      value: `R$ ${totalEarned}`,
      suffix: " este mês",
      gradient: "from-primary to-primary-glow",
      bgColor: "bg-primary/10",
      iconColor: "text-primary"
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="border-0 shadow-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
              </div>
              <Badge 
                variant="secondary" 
                className="text-xs font-medium"
              >
                Última semana
              </Badge>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-foreground">
                  {stat.value}
                </span>
                <span className="text-sm text-muted-foreground">
                  {stat.suffix}
                </span>
              </div>
              
              <p className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}