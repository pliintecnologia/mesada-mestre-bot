import { useState } from "react"
import { NavigationHeader } from "@/components/NavigationHeader"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { 
  Plus, 
  CheckCircle, 
  Clock, 
  Star, 
  Coins, 
  Calendar,
  Trash2,
  Edit,
  User,
  Filter
} from "lucide-react"

interface Task {
  id: string
  title: string
  description: string
  assignedTo: string
  assignedToName: string
  status: "pending" | "in-progress" | "completed"
  points: number
  dueDate: string
  category: string
  createdAt: string
}

export const TasksPage = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Organizar o quarto",
      description: "Arrumar a cama, guardar roupas e brinquedos",
      assignedTo: "pedro",
      assignedToName: "Pedro Silva",
      status: "completed",
      points: 15,
      dueDate: "2024-01-20",
      category: "Organização",
      createdAt: "2024-01-18"
    },
    {
      id: "2",
      title: "Ajudar na cozinha",
      description: "Lavar a louça do almoço",
      assignedTo: "maria",
      assignedToName: "Maria Silva", 
      status: "in-progress",
      points: 10,
      dueDate: "2024-01-21",
      category: "Cozinha",
      createdAt: "2024-01-19"
    },
    {
      id: "3",
      title: "Estudar matemática",
      description: "Fazer exercícios do livro páginas 45-47",
      assignedTo: "pedro",
      assignedToName: "Pedro Silva",
      status: "pending",
      points: 20,
      dueDate: "2024-01-22",
      category: "Estudos",
      createdAt: "2024-01-20"
    }
  ])

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [filter, setFilter] = useState("all")

  const statusConfig = {
    pending: { color: "bg-warning", text: "Pendente", icon: Clock },
    "in-progress": { color: "bg-accent", text: "Em Andamento", icon: Clock },
    completed: { color: "bg-success", text: "Concluída", icon: CheckCircle }
  }

  const filteredTasks = tasks.filter(task => {
    if (filter === "all") return true
    return task.status === filter
  })

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault()
    // Aqui seria a integração com Supabase
    setIsCreateModalOpen(false)
  }

  const toggleTaskStatus = (taskId: string) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        const nextStatus = task.status === "pending" ? "in-progress" : 
                          task.status === "in-progress" ? "completed" : "pending"
        return { ...task, status: nextStatus }
      }
      return task
    }))
  }

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader 
        familyName="Família Silva"
        parentName="Ana Silva"
        totalChildren={2}
        monthlyBudget={500}
      />
      
      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Gerenciar Tarefas</h1>
            <p className="text-muted-foreground">
              Organize e acompanhe as atividades dos seus filhos
            </p>
          </div>
          
          <Button variant="hero" className="gap-2" onClick={() => setIsCreateModalOpen(true)}>
            <Plus className="h-5 w-5" />
            Nova Tarefa
          </Button>
        </div>

        {/* Filters and Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-0 shadow-card">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-foreground">{tasks.length}</div>
              <div className="text-sm text-muted-foreground">Total de Tarefas</div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-card">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-success">
                {tasks.filter(t => t.status === "completed").length}
              </div>
              <div className="text-sm text-muted-foreground">Concluídas</div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-card">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-accent">
                {tasks.filter(t => t.status === "in-progress").length}
              </div>
              <div className="text-sm text-muted-foreground">Em Andamento</div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-card">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-warning">
                {tasks.filter(t => t.status === "pending").length}
              </div>
              <div className="text-sm text-muted-foreground">Pendentes</div>
            </CardContent>
          </Card>
        </div>

        {/* Filter Tabs */}
        <Tabs value={filter} onValueChange={setFilter}>
          <TabsList className="grid w-full grid-cols-4 lg:w-fit">
            <TabsTrigger value="all">Todas</TabsTrigger>
            <TabsTrigger value="pending">Pendentes</TabsTrigger>
            <TabsTrigger value="in-progress">Em Andamento</TabsTrigger>
            <TabsTrigger value="completed">Concluídas</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Tasks List */}
        <div className="grid gap-4">
          {filteredTasks.map((task) => {
            const StatusIcon = statusConfig[task.status].icon
            
            return (
              <Card key={task.id} className="border-0 shadow-card hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-3">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toggleTaskStatus(task.id)}
                          className={`${statusConfig[task.status].color}/20 hover:${statusConfig[task.status].color}/30`}
                        >
                          <StatusIcon className={`h-5 w-5 ${statusConfig[task.status].color.replace('bg-', 'text-')}`} />
                        </Button>
                        
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-foreground">{task.title}</h3>
                          <p className="text-muted-foreground">{task.description}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                              {task.assignedToName.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-muted-foreground">{task.assignedToName}</span>
                        </div>
                        
                        <div className="flex items-center gap-1 text-accent">
                          <Coins className="h-4 w-4" />
                          <span className="font-medium">{task.points} pontos</span>
                        </div>
                        
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(task.dueDate).toLocaleDateString('pt-BR')}</span>
                        </div>
                        
                        <Badge variant="outline">{task.category}</Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant="outline"
                        className={`${statusConfig[task.status].color}/20 text-${statusConfig[task.status].color.replace('bg-', '')}`}
                      >
                        {statusConfig[task.status].text}
                      </Badge>
                      
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      
                      <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive hover:bg-destructive/10">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Create Task Modal */}
        {isCreateModalOpen && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-md border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Nova Tarefa
                </CardTitle>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleCreateTask} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Título da Tarefa</Label>
                    <Input id="title" placeholder="Ex: Organizar o quarto" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Descrição</Label>
                    <Textarea 
                      id="description" 
                      placeholder="Descreva o que deve ser feito..."
                      rows={3}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="assignTo">Atribuir para</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecionar filho" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pedro">Pedro Silva</SelectItem>
                          <SelectItem value="maria">Maria Silva</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="points">Pontos</Label>
                      <Input 
                        id="points" 
                        type="number" 
                        placeholder="10"
                        min="1"
                        max="50"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Categoria</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Categoria" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="organizacao">Organização</SelectItem>
                          <SelectItem value="cozinha">Cozinha</SelectItem>
                          <SelectItem value="estudos">Estudos</SelectItem>
                          <SelectItem value="limpeza">Limpeza</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="dueDate">Prazo</Label>
                      <Input 
                        id="dueDate" 
                        type="date"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="flex gap-2 pt-4">
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => setIsCreateModalOpen(false)}
                    >
                      Cancelar
                    </Button>
                    <Button type="submit" variant="hero" className="flex-1">
                      Criar Tarefa
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
}

export default TasksPage