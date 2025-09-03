import { useState, useEffect, Suspense } from "react";
import { CheckCircle, CircleDot, Zap, Globe, Search, Shield, Sparkles, Brain, Cpu, Target } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useLocation, useNavigate } from "react-router-dom";
import ThreeBackground from "@/components/ThreeBackground";

interface AnalysisStep {
  id: string;
  label: string;
  description: string;
  icon: any;
  duration: number;
  details?: string[];
  color: string;
}

const analysisSteps: AnalysisStep[] = [
  {
    id: "crawling",
    label: "Website Discovery",
    description: "Scanning website structure and content with AI precision",
    icon: Globe,
    duration: 2500,
    color: "from-purple-400 to-purple-600",
    details: ["🔍 Deep crawling page hierarchy", "🌐 Mapping internal link structure", "📊 Analyzing content distribution", "🎯 Identifying key components"],
  },
  {
    id: "content",
    label: "Content Intelligence",
    description: "Advanced AI processing of textual and visual content",
    icon: Brain,
    duration: 2000,
    color: "from-violet-400 to-purple-500",
    details: ["🧠 AI keyword extraction", "📈 Readability analysis", "✨ Content quality scoring", "🎨 Visual element assessment"],
  },
  {
    id: "seo",
    label: "SEO Optimization",
    description: "Comprehensive search engine optimization analysis",
    icon: Target,
    duration: 2800,
    color: "from-fuchsia-400 to-violet-500",
    details: ["🏷️ Meta tags optimization", "⚡ Core Web Vitals check", "📱 Mobile responsiveness scan", "🔗 Schema markup analysis"],
  },
  {
    id: "security",
    label: "Security Fortress",
    description: "Military-grade security configuration analysis",
    icon: Shield,
    duration: 1800,
    color: "from-purple-500 to-pink-500",
    details: ["🔒 SSL/TLS certificate validation", "🛡️ Security headers inspection", "🚨 Vulnerability assessment", "⚔️ Threat analysis complete"],
  },
];

const FloatingParticle = ({ delay }: { delay: number }) => (
  <div
    className="absolute w-1 h-1 bg-purple-primary rounded-full opacity-60 animate-particle"
    style={{
      left: `${Math.random() * 100}%`,
      animationDelay: `${delay}s`,
      animationDuration: `${8 + Math.random() * 4}s`,
    }}
  />
);

const Analyze = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [currentDetail, setCurrentDetail] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const targetUrl = params.get("url") || "";
  const hostname = (() => {
    try {
      const u = new URL(targetUrl);
      return u.hostname.replace("www.", "");
    } catch {
      return targetUrl;
    }
  })();

  useEffect(() => {
    const totalSteps = analysisSteps.length;

    if (currentStep < totalSteps) {
      const step = analysisSteps[currentStep];
      const stepProgress = (currentStep / totalSteps) * 100;

      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = Math.min(prev + 0.8, stepProgress + 100 / totalSteps);
          return newProgress;
        });
      }, step.duration / 25);

      const detailInterval = setInterval(() => {
        setCurrentDetail((prev) => (prev + 1) % (step.details?.length || 1));
      }, 1000);

      const stepTimeout = setTimeout(() => {
        setCompletedSteps((prev) => [...prev, step.id]);
        setCurrentStep((prev) => prev + 1);
        clearInterval(progressInterval);
        clearInterval(detailInterval);
        setCurrentDetail(0);
      }, step.duration);

      return () => {
        clearTimeout(stepTimeout);
        clearInterval(progressInterval);
        clearInterval(detailInterval);
      };
    } else {
      const finalTimeout = setTimeout(() => {
        setProgress(100);
        setIsCompleted(true);
        const qs = targetUrl ? `?url=${encodeURIComponent(targetUrl)}` : "";
        navigate(`/blog-writer${qs}`);
      }, 600);
      return () => clearTimeout(finalTimeout);
    }
  }, [currentStep]);

  const currentStepData = analysisSteps[currentStep];

  return (
    <div className="min-h-[80vh] relative overflow-hidden flex items-center justify-center p-3 md:p-4">
      {/* Animated Three.js background */}
      <Suspense fallback={<div className="fixed inset-0 bg-background -z-10" />}> 
        <ThreeBackground />
      </Suspense>

      <div className="absolute inset-0 bg-gradient-glow opacity-30"></div>
      <div className="absolute inset-0 bg-gradient-mesh opacity-20"></div>

      {Array.from({ length: 8 }).map((_, i) => (
        <FloatingParticle key={i} delay={i * 0.6} />
      ))}

      <div className="relative w-full max-w-3xl opacity-60">
        <div className="absolute -top-16 -left-16 w-28 h-28 bg-purple-primary/15 rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="absolute -bottom-16 -right-16 w-40 h-40 bg-purple-secondary/10 rounded-full blur-3xl animate-float"></div>

        <div className="relative bg-gradient-card border border-purple-primary/20 rounded-2xl p-6 md:p-8 shadow-card backdrop-blur-xl">
          <div className="text-center mb-6 md:mb-8">
            <div className="relative inline-flex items-center justify-center mb-4">
              <div className="absolute inset-0 bg-gradient-primary rounded-full blur-md opacity-70 animate-pulse-glow"></div>
              <div className="relative w-14 h-14 bg-gradient-primary rounded-full flex items-center justify-center shadow-purple-intense">
                <Cpu className="w-7 h-7 text-black animate-spin" style={{ animationDuration: "8s" }} />
              </div>
            </div>

            <h1 className="text-3xl md:text-5xl font-black bg-gradient-primary bg-clip-text text-transparent mb-2 md:mb-3">
              AI Website Analysis
            </h1>
            <div className="flex items-center justify-center gap-2">
              {hostname && (
                <span className="text-xs md:text-sm text-purple-primary bg-purple-primary/10 border border-purple-primary/20 rounded-full px-3 py-1 font-medium truncate max-w-[70%]" title={targetUrl}>
                  Analyzing: {hostname}
                </span>
              )}
            </div>
          </div>

          <div className="mb-6 md:mb-8">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm md:text-base font-bold text-foreground flex items-center gap-2">
                <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-purple-primary animate-pulse" />
                Neural Processing
              </span>
              <span className="text-sm md:text-base font-mono text-purple-primary bg-purple-primary/10 px-2 md:px-3 py-0.5 md:py-1 rounded-lg">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="relative">
              <Progress value={progress} className="h-3 md:h-3.5 bg-muted border border-purple-primary/20 shadow-glow" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-glow/40 to-transparent animate-shimmer"></div>
            </div>
          </div>

          {!isCompleted && currentStepData && (
            <div className="mb-6 md:mb-8 animate-fade-in-up">
              <div className="relative p-4 md:p-5 bg-gradient-secondary rounded-xl md:rounded-2xl border border-purple-primary/30 shadow-purple-glow">
                <div className="flex items-center gap-4 md:gap-5 mb-4 md:mb-5">
                  <div className={`relative flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br ${currentStepData.color} rounded-xl md:rounded-2xl shadow-purple-intense animate-pulse-glow`}>
                    <currentStepData.icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
                    <div className="absolute inset-0 bg-white/20 rounded-2xl blur-sm"></div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-bold text-foreground mb-1">{currentStepData.label}</h3>
                    <p className="text-purple-secondary text-sm md:text-base">{currentStepData.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <CircleDot className="w-5 h-5 text-purple-primary animate-pulse" />
                    <span className="text-xs md:text-sm text-purple-primary font-mono bg-purple-primary/10 px-2 py-0.5 rounded">ACTIVE</span>
                  </div>
                </div>

                {currentStepData.details && (
                  <div className="relative pl-6 md:pl-8">
                    <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-purple-primary to-transparent rounded-full"></div>
                    <div className="bg-black/40 rounded-lg md:rounded-xl p-3 md:p-4 border border-purple-primary/20">
                      <p className="text-purple-primary font-mono text-sm md:text-base animate-typing whitespace-nowrap overflow-hidden border-r-2 border-purple-primary">
                        {currentStepData.details[currentDetail]}
                      </p>
                    </div>
                  </div>
                )}

                <div className="mt-4 h-1 bg-gradient-to-r from-transparent via-purple-primary to-transparent relative overflow-hidden rounded-full">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-glow to-transparent w-1/3 animate-scan-line shadow-purple-glow"></div>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
            {analysisSteps.map((step, index) => {
              const stepCompleted = completedSteps.includes(step.id);
              const isCurrent = index === currentStep && !stepCompleted;

              if (index > currentStep && !stepCompleted) return null;

              return (
                <div
                  key={step.id}
                  className={`relative group transition-all duration-500 ${stepCompleted ? "animate-fade-in-up" : isCurrent ? "animate-pulse-glow" : "opacity-60"}`}
                >
                  <div
                    className={`flex items-center gap-4 md:gap-5 p-4 rounded-xl md:rounded-2xl border transition-all duration-300 ${stepCompleted ? "bg-gradient-secondary border-purple-primary/40 shadow-purple-glow" : isCurrent ? "bg-gradient-secondary/50 border-purple-primary/30" : "bg-muted/20 border-border"}`}
                  >
                    <div
                      className={`relative flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl transition-all duration-300 ${stepCompleted ? `bg-gradient-to-br ${step.color} shadow-purple-intense` : "bg-muted"}`}
                    >
                      {stepCompleted ? (
                        <>
                          <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-white" />
                          <div className="absolute inset-0 bg-white/20 rounded-lg md:rounded-xl blur-sm"></div>
                        </>
                      ) : (
                        <step.icon className="w-5 h-5 md:w-6 md:h-6 text-muted-foreground" />
                      )}
                    </div>

                    <div className="flex-1">
                      <p className={`font-bold text-base md:text-lg ${stepCompleted ? "text-foreground" : "text-muted-foreground"}`}>{step.label}</p>
                      <p className="text-xs md:text-sm text-muted-foreground">{step.description}</p>
                    </div>

                    {stepCompleted && (
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-purple-primary rounded-full animate-pulse"></div>
                        <span className="text-xs md:text-sm text-purple-primary font-mono font-bold bg-purple-primary/10 px-2.5 md:px-3 py-0.5 rounded-lg">COMPLETE</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {isCompleted && (
            <div className="text-center animate-fade-in-up">
              <div className="relative inline-flex items-center justify-center mb-6 md:mb-8">
                <div className="absolute inset-0 bg-gradient-primary rounded-full blur-2xl opacity-70 animate-pulse-glow"></div>
                <div className="relative w-20 h-20 md:w-24 md:h-24 bg-gradient-primary rounded-full flex items-center justify-center shadow-purple-intense">
                  <CheckCircle className="w-10 h-10 md:w-12 md:h-12 text-black animate-bounce" />
                </div>
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-foreground mb-3">Analysis Complete!</h2>
              <p className="text-base md:text-lg text-purple-secondary mb-6 md:mb-8 max-w-2xl mx-auto">
                🚀 Your website has been thoroughly analyzed by our advanced AI neural network. Every pixel, every line of code, every optimization opportunity has been mapped.
              </p>
              <div className="flex flex-wrap gap-3 md:gap-4 justify-center">
                <div className="px-4 md:px-6 py-2.5 md:py-3 bg-gradient-primary text-black rounded-lg md:rounded-xl font-bold text-sm md:text-lg shadow-purple-intense">🧠 4 AI Modules Deployed</div>
                <div className="px-4 md:px-6 py-2.5 md:py-3 bg-gradient-secondary border border-purple-primary/30 text-purple-primary rounded-lg md:rounded-xl font-bold text-sm md:text-lg">⚡ 100% Analysis Complete</div>
                <div className="px-4 md:px-6 py-2.5 md:py-3 bg-gradient-secondary border border-purple-primary/30 text-purple-primary rounded-lg md:rounded-xl font-bold text-sm md:text-lg">🎯 Ready for Optimization</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analyze;
