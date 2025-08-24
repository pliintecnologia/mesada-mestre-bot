import { useState } from "react"
import { NavigationHeader } from "@/components/NavigationHeader"
import { WhatsAppIntegration } from "@/components/WhatsAppIntegration"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useWhatsApp } from "@/hooks/useWhatsApp"
import { useAuth } from "@/hooks/useAuth"
import { MessageSquare, Users, Send, Bot, User, CheckCircle, Smartphone, Loader2 } from "lucide-react"

const WhatsAppPage = () => {
  const { user } = useAuth()
  const { messages, isConnected, loading, sendMessage, connectWhatsApp, disconnectWhatsApp } = useWhatsApp()
  const [newMessage, setNewMessage] = useState("")

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim() && isConnected) {
      await sendMessage(newMessage)
      setNewMessage("")
    }
  }

  const handleConnect = () => {
    connectWhatsApp()
  }

  const handleDisconnect = () => {
    disconnectWhatsApp()
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-6 text-center">
          <p className="text-muted-foreground">Faça login para acessar o WhatsApp</p>
        </Card>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Carregando WhatsApp...</span>
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
            <h1 className="text-3xl font-bold text-foreground">Integração WhatsApp</h1>
            <p className="text-muted-foreground">
              Gerencie a comunicação com seus filhos via WhatsApp
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* WhatsApp Integration Component */}
          <div className="lg:col-span-1">
            <WhatsAppIntegration 
              isConnected={isConnected}
              messagesCount={messages.length}
              lastMessage={messages[0]?.content || "Nenhuma mensagem ainda"}
            />
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-card">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  Chat da Família
                  <Badge variant="outline" className="ml-auto">
                    {messages.length} mensagens
                  </Badge>
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Connection Actions */}
                {!isConnected ? (
                  <div className="text-center py-8">
                    <Smartphone className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      WhatsApp não conectado
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Conecte seu WhatsApp para começar a receber e enviar mensagens
                    </p>
                    <Button variant="hero" onClick={handleConnect} className="gap-2">
                      <Smartphone className="h-4 w-4" />
                      Conectar WhatsApp
                    </Button>
                  </div>
                ) : (
                  <>
                    {/* Messages List */}
                    <div className="max-h-96 overflow-y-auto space-y-4 p-4 bg-muted/20 rounded-lg">
                      {messages.length === 0 ? (
                        <div className="text-center py-8">
                          <MessageSquare className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                          <p className="text-muted-foreground">Nenhuma mensagem ainda</p>
                        </div>
                      ) : (
                        messages.map((message) => (
                          <div key={message.id} className="flex items-start gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                                {message.sender_name.slice(0, 2).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            
                            <div className="flex-1 space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-muted-foreground">
                                  {new Date(message.timestamp).toLocaleTimeString('pt-BR', { 
                                    hour: '2-digit', minute: '2-digit' 
                                  })}
                                </span>
                                <span className="font-medium">{message.sender_name}</span>
                              </div>
                              
                              <p className="text-foreground leading-relaxed">{message.content}</p>
                              
                              <div className="flex items-center gap-1">
                                <Badge variant="secondary" className="gap-1 text-xs">
                                  {message.message_type === "user" && <User className="h-3 w-3" />}
                                  {message.message_type === "bot" && <Bot className="h-3 w-3" />}
                                  {message.message_type === "notification" && <CheckCircle className="h-3 w-3" />}
                                  
                                  {message.message_type === "user" ? "Mensagem" : 
                                   message.message_type === "bot" ? "Bot" : "Sistema"}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>

                    {/* Message Input */}
                    <form onSubmit={handleSendMessage} className="flex gap-2">
                      <Input
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Digite uma mensagem..."
                        className="flex-1"
                      />
                      <Button 
                        type="submit" 
                        variant="hero" 
                        disabled={!newMessage.trim()}
                        className="gap-2"
                      >
                        <Send className="h-4 w-4" />
                        Enviar
                      </Button>
                    </form>

                    {/* Disconnect Button */}
                    <div className="pt-4 border-t">
                      <Button 
                        variant="outline" 
                        onClick={handleDisconnect}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        Desconectar WhatsApp
                      </Button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

export default WhatsAppPage