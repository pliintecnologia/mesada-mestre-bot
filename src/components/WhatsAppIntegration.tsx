import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Smartphone, CheckCircle, AlertCircle, Bot } from "lucide-react"

interface WhatsAppIntegrationProps {
  isConnected?: boolean
  lastMessage?: string
  messagesCount?: number
}

export const WhatsAppIntegration = ({ 
  isConnected = false,
  lastMessage = "Pedro: Terminei de organizar meu quarto! 🎉",
  messagesCount = 23
}: WhatsAppIntegrationProps) => {
  return (
    <Card className="border-0 shadow-card">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
          <div className="p-2 rounded-lg bg-accent/20">
            <MessageSquare className="h-5 w-5 text-accent" />
          </div>
          Integração WhatsApp
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-muted/50 to-muted/20 border border-border/50">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${isConnected ? 'bg-success/20' : 'bg-destructive/20'}`}>
              <Smartphone className={`h-5 w-5 ${isConnected ? 'text-success' : 'text-destructive'}`} />
            </div>
            <div>
              <p className="font-medium text-foreground">
                Status da Conexão
              </p>
              <p className="text-sm text-muted-foreground">
                {isConnected ? 'Bot ativo e funcionando' : 'Aguardando configuração'}
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
            {isConnected ? 'Conectado' : 'Desconectado'}
          </Badge>
        </div>

        {isConnected && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-primary/20">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground mb-1">
                    Última mensagem recebida
                  </p>
                  <p className="text-sm text-muted-foreground bg-card p-3 rounded-lg border">
                    "{lastMessage}"
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Há 5 minutos
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 rounded-lg bg-success/10 border border-success/20">
                <p className="text-2xl font-bold text-success">{messagesCount}</p>
                <p className="text-sm text-muted-foreground">Mensagens hoje</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-accent/10 border border-accent/20">
                <p className="text-2xl font-bold text-accent">5</p>
                <p className="text-sm text-muted-foreground">Tarefas criadas</p>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-2">
          {isConnected ? (
            <>
              <Button variant="outline" className="w-full gap-2">
                <MessageSquare className="h-4 w-4" />
                Abrir Conversa
              </Button>
              <Button variant="ghost" className="w-full text-destructive hover:text-destructive hover:bg-destructive/10">
                Desconectar Bot
              </Button>
            </>
          ) : (
            <Button variant="hero" className="w-full gap-2">
              <Smartphone className="h-4 w-4" />
              Conectar WhatsApp
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}