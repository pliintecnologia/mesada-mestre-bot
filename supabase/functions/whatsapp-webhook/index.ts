import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.56.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabaseUrl = "https://nqyvqjvewkqgxzxdaifm.supabase.co";
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('WhatsApp webhook called:', req.method);
    
    if (req.method === 'POST') {
      const body = await req.json();
      console.log('WhatsApp webhook body:', body);

      // Processar mensagem recebida do WhatsApp
      if (body.entry?.[0]?.changes?.[0]?.value?.messages?.[0]) {
        const message = body.entry[0].changes[0].value.messages[0];
        const contact = body.entry[0].changes[0].value.contacts[0];
        
        console.log('Processing message:', message);

        // Salvar mensagem no banco de dados
        const { error: insertError } = await supabase
          .from('whatsapp_messages')
          .insert({
            sender: message.from,
            sender_name: contact?.profile?.name || message.from,
            content: message.text?.body || 'Mensagem de mídia',
            message_type: 'user'
          });

        if (insertError) {
          console.error('Error saving message:', insertError);
        }

        // Enviar resposta automática
        const response = await sendWhatsAppMessage(
          message.from,
          `Olá! Recebi sua mensagem: "${message.text?.body}". Vou processar e criar as tarefas necessárias! 🎯`
        );

        console.log('WhatsApp response sent:', response);
      }

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Webhook verification for WhatsApp
    if (req.method === 'GET') {
      const url = new URL(req.url);
      const mode = url.searchParams.get('hub.mode');
      const token = url.searchParams.get('hub.verify_token');
      const challenge = url.searchParams.get('hub.challenge');

      if (mode === 'subscribe' && token === 'mesada_mestre_token') {
        console.log('WhatsApp webhook verified');
        return new Response(challenge, { status: 200 });
      }

      return new Response('Forbidden', { status: 403 });
    }

    return new Response('Method not allowed', { status: 405 });

  } catch (error) {
    console.error('Error in WhatsApp webhook:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

async function sendWhatsAppMessage(to: string, text: string) {
  const whatsappApiKey = Deno.env.get('WHATSAPP_API_KEY');
  
  if (!whatsappApiKey) {
    console.log('WhatsApp API key not configured, simulating send');
    return { success: true, simulated: true };
  }

  try {
    // Aqui você implementaria a chamada real para a API do WhatsApp
    // Por enquanto, apenas simulamos o envio
    console.log(`Sending WhatsApp message to ${to}: ${text}`);
    
    return { 
      success: true, 
      message_id: 'simulated_' + Date.now(),
      to,
      text 
    };
  } catch (error) {
    console.error('Error sending WhatsApp message:', error);
    throw error;
  }
}