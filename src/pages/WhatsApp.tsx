import { useState } from "react"
import { NavigationHeader } from "@/components/NavigationHeader"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { 
  MessageSquare, 
  Smartphone, 
  CheckCircle, 
  AlertCircle, 
  Bot, 
  Send,
  QrCode,
  Settings,
  Users,
  BarChart3
} from "lucide-react"

interface Message {
  id: string
  sender: string
  senderName: string
  content: string
  timestamp: string
  type: "user" | "bot" | "notification"
}

export const WhatsAppPage = () => {
  const [isConnected, setIsConnected] = useState(true)
  const [newMessage, setNewMessage] = useState("")
  
  const [messages] = useState<Message[]>([
    {
      id: "1",
      sender: "bot",
      senderName: "Mesada Mestre Bot",
      content: "Olá! Bem-vindos ao Mesada Mestre! 🎉 Estou aqui para ajudar a organizar as tarefas e mesadas da família.",
      timestamp: "2024-01-20T09:00:00",
      type: "bot"
    },
    {
      id: "2", 
      sender: "pedro",
      senderName: "Pedro Silva",
      content: "Oi! Terminei de organizar meu quarto! 🎉",
      timestamp: "2024-01-20T10:30:00", 
      type: "user"
    },
    {
      id: "3",
      sender: "bot",
      senderName: "Mesada Mestre Bot", 
      content: "Parabéns Pedro! 🌟 Você ganhou 15 pontos pela tarefa 'Organizar o quarto'. Continue assim!",
      timestamp: "2024-01-20T10:31:00",
      type: "bot"
    },
    {
      id: "4",
      sender: "maria",
      senderName: "Maria Silva",
      content: "Mamãe, posso fazer uma tarefa extra hoje?",
      timestamp: "2024-01-20T14:15:00",
      type: "user"
    }
  ])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return
    
    // Aqui seria enviado via API do WhatsApp
    console.log("Enviando mensagem:", newMessage)
    setNewMessage("")
  }

  const handleConnect = () => {
    // Aqui seria a integração real com WhatsApp Business API
    setIsConnected(true)
  }

  const handleDisconnect = () => {
    setIsConnected(false)
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
            <h1 className="text-3xl font-bold text-foreground">Integração WhatsApp</h1>
            <p className="text-muted-foreground">
              Gerencie a comunicação com seus filhos via WhatsApp
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <QrCode className="h-4 w-4" />
              QR Code
            </Button>
            <Button variant="outline" className="gap-2">
              <Settings className="h-4 w-4" />
              Configurações
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Connection Status */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="border-0 shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5" />
                  Status da Conexão
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-muted/50 to-muted/20 border border-border/50">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${isConnected ? 'bg-success/20' : 'bg-destructive/20'}`}>
                      <Smartphone className={`h-5 w-5 ${isConnected ? 'text-success' : 'text-destructive'}`} />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">WhatsApp Business</p>
                      <p className="text-sm text-muted-foreground">
                        {isConnected ? 'Conectado e funcionando' : 'Desconectado'}
                      </p>
                    </div>
                  </div>
                  
                  <Badge 
                    variant={isConnected ? "default" : "destructive"}
                    className="gap-1"
                  >
                    {isConnected ? (
                      <CheckCircle className="h-3 w-3" />
                    ) : (
                      <AlertCircle className="h-3 w-3" />
                    )}
                    {isConnected ? 'Ativo' : 'Inativo'}
                  </Badge>
                </div>

                {isConnected ? (
                  <Button 
                    variant="destructive" 
                    className="w-full"
                    onClick={handleDisconnect}
                  >
                    Desconectar
                  </Button>
                ) : (
                  <Button 
                    variant="hero" 
                    className="w-full gap-2"
                    onClick={handleConnect}
                  >
                    <Smartphone className="h-4 w-4" />
                    Conectar WhatsApp
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Stats */}
            <Card className="border-0 shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Estatísticas
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 rounded-lg bg-success/10 border border-success/20">
                    <p className="text-xl font-bold text-success">24</p>
                    <p className="text-xs text-muted-foreground">Mensagens hoje</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-accent/10 border border-accent/20">
                    <p className="text-xl font-bold text-accent">7</p>
                    <p className="text-xs text-muted-foreground">Tarefas criadas</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-primary/10 border border-primary/20">
                    <p className="text-xl font-bold text-primary">2</p>
                    <p className="text-xs text-muted-foreground">Filhos ativos</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-warning/10 border border-warning/20">
                    <p className="text-xl font-bold text-warning">89%</p>
                    <p className="text-xs text-muted-foreground">Taxa resposta</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-0 shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5" />
                  Ações Rápidas
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Users className="h-4 w-4" />
                  Adicionar Contato
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Mensagem em Grupo
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Bot className="h-4 w-4" />
                  Configurar Bot
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-card h-[600px] flex flex-col">
              <CardHeader className="border-b border-border/50">
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Chat Familiar
                  <Badge variant="outline" className="ml-auto">
                    {messages.length} mensagens
                  </Badge>
                </CardTitle>
              </CardHeader>
              
              {/* Messages */}
              <CardContent className="flex-1 p-4 overflow-y-auto space-y-4">
                {messages.map((message) => (
                  <div 
                    key={message.id} 
                    className={`flex ${message.type === 'bot' ? 'justify-start' : 'justify-end'}`}
                  >
                    <div className={`max-w-[80%] ${
                      message.type === 'bot' 
                        ? 'bg-muted rounded-2xl rounded-bl-sm' 
                        : 'bg-primary text-primary-foreground rounded-2xl rounded-br-sm'
                    } p-3`}>
                      <div className="flex items-center gap-2 mb-1">
                        {message.type === 'bot' && <Bot className="h-4 w-4 text-primary" />}
                        <span className="text-xs font-medium opacity-80">
                          {message.senderName}
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed">{message.content}</p>
                      <p className="text-xs opacity-60 mt-1">
                        {new Date(message.timestamp).toLocaleTimeString('pt-BR', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
              
              {/* Message Input */}
              <div className="border-t border-border/50 p-4">
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <Textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Digite uma mensagem para a família..."
                    className="flex-1 min-h-[40px] max-h-[100px] resize-none"
                    disabled={!isConnected}
                  />
                  <Button 
                    type="submit" 
                    variant="hero" 
                    size="icon"
                    disabled={!newMessage.trim() || !isConnected}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
                
                {!isConnected && (
                  <p className="text-xs text-muted-foreground mt-2 text-center">
                    Conecte o WhatsApp para enviar mensagens
                  </p>
                )}
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

export default WhatsAppPage