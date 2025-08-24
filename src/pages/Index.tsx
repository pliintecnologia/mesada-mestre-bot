import { FamilyHeader } from "@/components/FamilyHeader"
import { StatsCards } from "@/components/StatsCards"
import { ChildrenOverview } from "@/components/ChildrenOverview"
import { WhatsAppIntegration } from "@/components/WhatsAppIntegration"
import { QuickActions } from "@/components/QuickActions"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MessageSquare, Smartphone, Star } from "lucide-react"
import heroFamily from "@/assets/hero-family.jpg"

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <FamilyHeader 
        familyName="Família Silva"
        parentName="Ana Silva"
        totalChildren={2}
        monthlyBudget={500}
      />
      
      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary-glow to-secondary p-8 text-primary-foreground">
          <div className="relative z-10 grid lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                  Mesada e responsabilidade,{" "}
                  <span className="text-accent-glow">organizadas pelo WhatsApp</span>
                </h1>
                <p className="text-lg text-primary-foreground/90 leading-relaxed">
                  Uma ferramenta simples no WhatsApp para pais que querem organizar as tarefas dos filhos 
                  e usar a mesada como incentivo para o aprendizado e disciplina.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="accent" size="lg" className="gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Conectar WhatsApp
                </Button>
                <Button variant="outline" size="lg" className="gap-2 bg-white/10 border-white/20 text-white hover:bg-white/20">
                  <Star className="h-5 w-5" />
                  Ver Tutorial
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src={heroFamily} 
                alt="Família organizando tarefas juntos"
                className="w-full h-auto rounded-xl shadow-2xl"
              />
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <StatsCards 
          completedTasks={12}
          pendingTasks={4} 
          totalEarned={180}
          averageScore={8.5}
        />

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <ChildrenOverview />
            
            {/* Features Highlight */}
            <Card className="border-0 shadow-card">
              <CardContent className="p-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center space-y-3">
                    <div className="mx-auto p-3 rounded-xl bg-primary/10 w-fit">
                      <Smartphone className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground">Integração WhatsApp</h3>
                    <p className="text-sm text-muted-foreground">
                      Bot inteligente que facilita a comunicação com os filhos
                    </p>
                  </div>
                  
                  <div className="text-center space-y-3">
                    <div className="mx-auto p-3 rounded-xl bg-success/10 w-fit">
                      <Star className="h-8 w-8 text-success" />
                    </div>
                    <h3 className="font-semibold text-foreground">Sistema de Pontos</h3>
                    <p className="text-sm text-muted-foreground">
                      Gamificação que motiva e ensina responsabilidade
                    </p>
                  </div>
                  
                  <div className="text-center space-y-3">
                    <div className="mx-auto p-3 rounded-xl bg-accent/10 w-fit">
                      <MessageSquare className="h-8 w-8 text-accent" />
                    </div>
                    <h3 className="font-semibold text-foreground">IA Educativa</h3>
                    <p className="text-sm text-muted-foreground">
                      Assistente que orienta e encoraja bons hábitos
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-8">
            <WhatsAppIntegration isConnected={true} />
            <QuickActions />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
