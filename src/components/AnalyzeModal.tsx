import { useEffect, useMemo, useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, CircleDot, Cpu, Globe, Shield, Brain, Target, Sparkles } from "lucide-react"
import { normalizeUrl } from "@/lib/utils"

type AnalyzeModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  targetUrl?: string
  onCompleted?: () => void
}

interface AnalysisStep {
  id: string
  label: string
  description: string
  icon: any
  duration: number
  details?: string[]
  color: string
}

const analysisSteps: AnalysisStep[] = [
  {
    id: "crawling",
    label: "Website Discovery",
    description: "Scanning website structure and content with AI precision",
    icon: Globe,
    duration: 2200,
    color: "from-purple-400 to-purple-600",
    details: ["🔍 Deep crawling page hierarchy", "🌐 Mapping internal link structure", "📊 Analyzing content distribution", "🎯 Identifying key components"],
  },
  {
    id: "content",
    label: "Content Intelligence",
    description: "Advanced AI processing of textual and visual content",
    icon: Brain,
    duration: 1800,
    color: "from-violet-400 to-purple-500",
    details: ["🧠 AI keyword extraction", "📈 Readability analysis", "✨ Content quality scoring", "🎨 Visual element assessment"],
  },
  {
    id: "seo",
    label: "SEO Optimization",
    description: "Comprehensive search engine optimization analysis",
    icon: Target,
    duration: 2400,
    color: "from-fuchsia-400 to-violet-500",
    details: ["🏷️ Meta tags optimization", "⚡ Core Web Vitals check", "📱 Mobile responsiveness scan", "🔗 Schema markup analysis"],
  },
  {
    id: "security",
    label: "Security Fortress",
    description: "Security configuration analysis",
    icon: Shield,
    duration: 1600,
    color: "from-purple-500 to-pink-500",
    details: ["🔒 SSL/TLS certificate validation", "🛡️ Security headers inspection", "🚨 Vulnerability assessment", "⚔️ Threat analysis complete"],
  },
]

export default function AnalyzeModal({ open, onOpenChange, targetUrl, onCompleted }: AnalyzeModalProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<string[]>([])
  const [progress, setProgress] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)
  const [currentDetail, setCurrentDetail] = useState(0)

  const normalizedTarget = useMemo(() => (targetUrl ? normalizeUrl(targetUrl) : ""), [targetUrl])
  const hostname = useMemo(() => {
    if (!normalizedTarget) return ""
    try {
      const u = new URL(normalizedTarget)
      return u.hostname.replace("www.", "")
    } catch {
      return normalizedTarget
    }
  }, [normalizedTarget])

  useEffect(() => {
    if (!open) {
      // Reset when closed
      setCurrentStep(0)
      setCompletedSteps([])
      setProgress(0)
      setIsCompleted(false)
      setCurrentDetail(0)
      return
    }

    const totalSteps = analysisSteps.length
    if (currentStep < totalSteps) {
      const step = analysisSteps[currentStep]
      const stepProgress = (currentStep / totalSteps) * 100

      const progressInterval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 0.9, stepProgress + 100 / totalSteps))
      }, step.duration / 25)

      const detailInterval = setInterval(() => {
        setCurrentDetail((prev) => (prev + 1) % (step.details?.length || 1))
      }, 900)

      const stepTimeout = setTimeout(() => {
        setCompletedSteps((prev) => [...prev, step.id])
        setCurrentStep((prev) => prev + 1)
        clearInterval(progressInterval)
        clearInterval(detailInterval)
        setCurrentDetail(0)
      }, step.duration)

      return () => {
        clearTimeout(stepTimeout)
        clearInterval(progressInterval)
        clearInterval(detailInterval)
      }
    } else if (open) {
      const finalTimeout = setTimeout(() => {
        setProgress(100)
        setIsCompleted(true)
        if (onCompleted) onCompleted()
      }, 500)
      return () => clearTimeout(finalTimeout)
    }
  }, [open, currentStep])

  const currentStepData = analysisSteps[currentStep]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-gradient-card border border-purple-primary/20 shadow-purple-glow">
        <div className="text-center mb-4">
          <div className="relative inline-flex items-center justify-center mb-3">
            <div className="relative w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center shadow-purple-intense">
              <Cpu className="w-6 h-6 text-black animate-spin" style={{ animationDuration: "8s" }} />
            </div>
          </div>
          <h2 className="text-2xl font-black bg-gradient-primary bg-clip-text text-transparent">AI Website Analysis</h2>
          {hostname && (
            <div className="mt-1 flex items-center justify-center gap-2">
              <span className="text-xs text-purple-primary bg-purple-primary/10 border border-purple-primary/20 rounded-full px-2 py-0.5 font-medium truncate max-w-[75%]" title={normalizedTarget}>
                Analyzing: {hostname}
              </span>
            </div>
          )}
        </div>

        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-bold text-foreground flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-primary animate-pulse" />
              Neural Processing
            </span>
            <span className="text-sm font-mono text-purple-primary bg-purple-primary/10 px-2 py-0.5 rounded-lg">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="relative">
            <Progress value={progress} className="h-3 bg-muted border border-purple-primary/20 shadow-glow" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-glow/40 to-transparent animate-shimmer"></div>
          </div>
        </div>

        {!isCompleted && currentStepData && (
          <div className="mb-4 animate-fade-in-up">
            <div className="relative p-4 bg-gradient-secondary rounded-xl border border-purple-primary/30 shadow-purple-glow">
              <div className="flex items-center gap-4 mb-3">
                <div className={`relative flex items-center justify-center w-12 h-12 bg-gradient-to-br ${currentStepData.color} rounded-xl shadow-purple-intense animate-pulse-glow`}>
                  <currentStepData.icon className="w-6 h-6 text-white" />
                  <div className="absolute inset-0 bg-white/20 rounded-xl blur-sm"></div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground">{currentStepData.label}</h3>
                  <p className="text-purple-secondary text-sm">{currentStepData.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <CircleDot className="w-4 h-4 text-purple-primary animate-pulse" />
                  <span className="text-xs text-purple-primary font-mono bg-purple-primary/10 px-2 py-0.5 rounded">ACTIVE</span>
                </div>
              </div>

              {currentStepData.details && (
                <div className="relative pl-6">
                  <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-purple-primary to-transparent rounded-full"></div>
                  <div className="bg-black/40 rounded-lg p-3 border border-purple-primary/20">
                    <p className="text-purple-primary font-mono text-sm animate-typing whitespace-nowrap overflow-hidden border-r-2 border-purple-primary">
                      {currentStepData.details[currentDetail]}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="space-y-2 mb-2">
          {analysisSteps.map((step, index) => {
            const stepCompleted = completedSteps.includes(step.id)
            const isCurrent = index === currentStep && !stepCompleted
            if (index > currentStep && !stepCompleted) return null
            return (
              <div key={step.id} className={`relative group transition-all ${stepCompleted ? "animate-fade-in-up" : isCurrent ? "animate-pulse-glow" : "opacity-60"}`}>
                <div className={`flex items-center gap-4 p-3 rounded-xl border transition-all ${stepCompleted ? "bg-gradient-secondary border-purple-primary/40 shadow-purple-glow" : isCurrent ? "bg-gradient-secondary/50 border-purple-primary/30" : "bg-muted/20 border-border"}`}>
                  <div className={`relative flex items-center justify-center w-10 h-10 rounded-lg transition-all ${stepCompleted ? `bg-gradient-to-br ${step.color} shadow-purple-intense` : "bg-muted"}`}>
                    {stepCompleted ? (
                      <>
                        <CheckCircle className="w-5 h-5 text-white" />
                        <div className="absolute inset-0 bg-white/20 rounded-lg blur-sm"></div>
                      </>
                    ) : (
                      <step.icon className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className={`font-bold text-sm ${stepCompleted ? "text-foreground" : "text-muted-foreground"}`}>{step.label}</p>
                    <p className="text-xs text-muted-foreground">{step.description}</p>
                  </div>
                  {stepCompleted && (
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-purple-primary rounded-full animate-pulse"></div>
                      <span className="text-xs text-purple-primary font-mono font-bold bg-purple-primary/10 px-2.5 py-0.5 rounded-lg">COMPLETE</span>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </DialogContent>
    </Dialog>
  )
}