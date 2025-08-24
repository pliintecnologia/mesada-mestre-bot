import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { useAuth } from './useAuth'
import { useToast } from './use-toast'

export interface WhatsAppMessage {
  id: string
  sender: string
  sender_name: string
  content: string
  message_type: 'user' | 'bot' | 'notification'
  timestamp: string
}

export const useWhatsApp = () => {
  const [messages, setMessages] = useState<WhatsAppMessage[]>([])
  const [isConnected, setIsConnected] = useState(false)
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()
  const { toast } = useToast()

  const fetchMessages = async () => {
    if (!user) return
    
    try {
      const { data, error } = await supabase
        .from('whatsapp_messages')
        .select('*')
        .eq('user_id', user.id)
        .order('timestamp', { ascending: false })
        .limit(50)

      if (error) throw error
      setMessages((data || []) as WhatsAppMessage[])
      setIsConnected(data && data.length > 0)
    } catch (error) {
      console.error('Error fetching messages:', error)
      toast({
        title: "Erro ao carregar mensagens",
        description: "Não foi possível carregar as mensagens do WhatsApp",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const sendMessage = async (content: string) => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('whatsapp_messages')
        .insert([{
          user_id: user.id,
          sender: 'family_admin',
          sender_name: 'Administrador',
          content,
          message_type: 'user'
        }])
        .select()
        .single()

      if (error) throw error
      
      setMessages(prev => [data as WhatsAppMessage, ...prev])
      
      // Simular resposta do bot
      setTimeout(() => {
        simulateBotResponse(content)
      }, 1000)
      
      return data
    } catch (error) {
      console.error('Error sending message:', error)
      toast({
        title: "Erro ao enviar mensagem",
        description: "Não foi possível enviar a mensagem",
        variant: "destructive"
      })
    }
  }

  const simulateBotResponse = async (originalMessage: string) => {
    if (!user) return

    const responses = [
      "Entendi! Vou processar essa informação e criar as tarefas necessárias. 🎯",
      "Perfeito! Registrei a atividade. Continue assim! 🌟",
      "Ótimo trabalho! A pontuação foi atualizada. 💪",
      "Recebido! Vou acompanhar o progresso dessa tarefa. 📝"
    ]

    const randomResponse = responses[Math.floor(Math.random() * responses.length)]

    try {
      const { data, error } = await supabase
        .from('whatsapp_messages')
        .insert([{
          user_id: user.id,
          sender: 'mesada_bot',
          sender_name: 'Mesada Bot',
          content: randomResponse,
          message_type: 'bot'
        }])
        .select()
        .single()

      if (error) throw error
      setMessages(prev => [data as WhatsAppMessage, ...prev])
    } catch (error) {
      console.error('Error sending bot response:', error)
    }
  }

  const connectWhatsApp = async () => {
    setIsConnected(true)
    toast({
      title: "WhatsApp conectado!",
      description: "Agora você pode receber mensagens e tarefas via WhatsApp"
    })
    
    // Simular mensagem de boas-vindas
    if (user) {
      await supabase
        .from('whatsapp_messages')
        .insert([{
          user_id: user.id,
          sender: 'mesada_bot',
          sender_name: 'Mesada Bot',
          content: 'Olá! WhatsApp conectado com sucesso! Agora posso ajudar a organizar as tarefas da família. 🎉',
          message_type: 'notification'
        }])
      
      fetchMessages()
    }
  }

  const disconnectWhatsApp = () => {
    setIsConnected(false)
    toast({
      title: "WhatsApp desconectado",
      description: "A integração com WhatsApp foi desconectada"
    })
  }

  useEffect(() => {
    fetchMessages()
  }, [user])

  return {
    messages,
    isConnected,
    loading,
    sendMessage,
    connectWhatsApp,
    disconnectWhatsApp,
    refetch: fetchMessages
  }
}