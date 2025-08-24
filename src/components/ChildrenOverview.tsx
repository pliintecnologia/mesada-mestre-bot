import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Plus, Star, Calendar, Coins } from "lucide-react"

interface Child {
  id: string
  name: string
  age: number
  avatar?: string
  completedTasks: number
  totalTasks: number
  currentScore: number
  earnedThisMonth: number
  nextTask: string
}

interface ChildrenOverviewProps {
  children?: Child[]
}

export const ChildrenOverview = ({ children }: ChildrenOverviewProps) => {
  const mockChildren: Child[] = children || [
    {
      id: "1",
      name: "Pedro Silva",
      age: 12,
      completedTasks: 8,
      totalTasks: 10,
      currentScore: 9.2,
      earnedThisMonth: 85,
      nextTask: "Organizar quarto"
    },
    {
      id: "2", 
      name: "Maria Silva",
      age: 8,
      completedTasks: 6,
      totalTasks: 8,
      currentScore: 8.8,
      earnedThisMonth: 65,
      nextTask: "Ajudar na cozinha"
    }
  ]

  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return "bg-success"
    if (percentage >= 60) return "bg-warning"
    return "bg-destructive"
  }

  return (
    <Card className="border-0 shadow-card">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
          <div className="p-2 rounded-lg bg-secondary/20">
            <Star className="h-5 w-5 text-secondary" />
          </div>
          Visão Geral dos Filhos
        </CardTitle>
        <Button variant="outline" size="sm" className="gap-2">
          <Plus className="h-4 w-4" />
          Adicionar Filho
        </Button>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {mockChildren.map((child) => {
          const progressPercentage = (child.completedTasks / child.totalTasks) * 100
          
          return (
            <div 
              key={child.id} 
              className="p-4 rounded-xl border border-border/50 hover:border-border transition-all duration-300 hover:shadow-md bg-gradient-to-r from-card to-muted/5"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 ring-2 ring-primary/20">
                    <AvatarImage src={child.avatar} alt={child.name} />
                    <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                      {child.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div>
                    <h3 className="font-semibold text-foreground">{child.name}</h3>
                    <p className="text-sm text-muted-foreground">{child.age} anos</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="gap-1">
                    <Star className="h-3 w-3 fill-current text-accent" />
                    {child.currentScore}
                  </Badge>
                  <Badge variant="secondary" className="gap-1">
                    <Coins className="h-3 w-3" />
                    R$ {child.earnedThisMonth}
                  </Badge>
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Progresso das Tarefas</span>
                    <span className="font-medium text-foreground">
                      {child.completedTasks}/{child.totalTasks}
                    </span>
                  </div>
                  <Progress 
                    value={progressPercentage} 
                    className="h-2"
                  />
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Próxima tarefa:</span>
                  </div>
                  <span className="font-medium text-foreground">{child.nextTask}</span>
                </div>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}