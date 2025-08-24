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
import { useTasks } from "@/hooks/useTasks"
import { useAuth } from "@/hooks/useAuth"
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
  Filter,
  Loader2
} from "lucide-react"

export const TasksPage = () => {
  const { user } = useAuth()
  const { tasks, loading, createTask, updateTask, deleteTask } = useTasks()
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<string | null>(null)
  const [filter, setFilter] = useState("all")
  
  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    assigned_to: "",
    points: 10,
    category: "",
    due_date: ""
  })

  const statusConfig = {
    pending: { color: "bg-warning", text: "Pendente", icon: Clock },
    "in_progress": { color: "bg-accent", text: "Em Andamento", icon: Clock },
    completed: { color: "bg-success", text: "Concluída", icon: CheckCircle }
  }

  const filteredTasks = tasks.filter(task => {
    if (filter === "all") return true
    return task.status === filter
  })

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.title) return
    
    await createTask({
      title: formData.title,
      description: formData.description,
      assigned_to: formData.assigned_to,
      status: "pending",
      points: formData.points,
      category: formData.category,
      due_date: formData.due_date
    })
    
    // Reset form
    setFormData({
      title: "",
      description: "",
      assigned_to: "",
      points: 10,
      category: "",
      due_date: ""
    })
    setIsCreateModalOpen(false)
  }

  const toggleTaskStatus = async (taskId: string) => {
    const task = tasks.find(t => t.id === taskId)
    if (!task) return
    
    const nextStatus = 
      task.status === "pending" ? "in_progress" : 
      task.status === "in_progress" ? "completed" : "pending"
    
    await updateTask(taskId, { status: nextStatus })
  }

  const handleDeleteTask = async (taskId: string) => {
    if (confirm("Tem certeza que deseja excluir esta tarefa?")) {
      await deleteTask(taskId)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-6 text-center">
          <p className="text-muted-foreground">Faça login para acessar suas tarefas</p>
        </Card>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Carregando tarefas...</span>
        </div>
      </div>
    )
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
                {tasks.filter(t => t.status === "in_progress").length}
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
            <TabsTrigger value="in_progress">Em Andamento</TabsTrigger>
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
                              {task.assigned_to ? task.assigned_to.slice(0, 2).toUpperCase() : "UN"}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-muted-foreground">{task.assigned_to || "Não atribuído"}</span>
                        </div>
                        
                        <div className="flex items-center gap-1 text-accent">
                          <Coins className="h-4 w-4" />
                          <span className="font-medium">{task.points} pontos</span>
                        </div>
                        
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {task.due_date ? new Date(task.due_date).toLocaleDateString('pt-BR') : 'Sem prazo'}
                          </span>
                        </div>
                        
                        <Badge variant="outline">{task.category || "Geral"}</Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant="outline"
                        className={`${statusConfig[task.status].color}/20 text-${statusConfig[task.status].color.replace('bg-', '')}`}
                      >
                        {statusConfig[task.status].text}
                      </Badge>
                      
                      <Button variant="ghost" size="icon" onClick={() => setEditingTask(task.id)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => handleDeleteTask(task.id)}
                      >
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
                    <Input 
                      id="title" 
                      placeholder="Ex: Organizar o quarto" 
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Descrição</Label>
                    <Textarea 
                      id="description" 
                      placeholder="Descreva o que deve ser feito..."
                      rows={3}
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="assignTo">Atribuir para</Label>
                      <Select 
                        value={formData.assigned_to} 
                        onValueChange={(value) => setFormData({...formData, assigned_to: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecionar filho" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Pedro">Pedro</SelectItem>
                          <SelectItem value="Maria">Maria</SelectItem>
                          <SelectItem value="João">João</SelectItem>
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
                        value={formData.points}
                        onChange={(e) => setFormData({...formData, points: parseInt(e.target.value) || 10})}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Categoria</Label>
                      <Select 
                        value={formData.category} 
                        onValueChange={(value) => setFormData({...formData, category: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Categoria" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Organização">Organização</SelectItem>
                          <SelectItem value="Cozinha">Cozinha</SelectItem>
                          <SelectItem value="Estudos">Estudos</SelectItem>
                          <SelectItem value="Limpeza">Limpeza</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="dueDate">Prazo</Label>
                      <Input 
                        id="dueDate" 
                        type="date"
                        value={formData.due_date}
                        onChange={(e) => setFormData({...formData, due_date: e.target.value})}
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