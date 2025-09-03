import { motion } from 'framer-motion'
import { Clock, DollarSign, Users, Zap } from 'lucide-react'

const benefits = [
  {
    icon: Clock,
    title: "Consistency at Scale",
    description: "Never miss a cadence; weekly posts that follow SEO structure.",
    metric: "10x faster",
    detail: "content production"
  },
  {
    icon: DollarSign,
    title: "Time & Cost Savings",
    description: "Automate repetitive content tasks and save resources for strategic work.",
    metric: "80% savings",
    detail: "on content costs"
  },
  {
    icon: Users,
    title: "People-First + Search-Ready",
    description: "Built to serve users first—clear answers, helpful formatting, and intent alignment.",
    metric: "3x higher",
    detail: "engagement rates"
  },
  {
    icon: Zap,
    title: "WordPress-Native Publishing",
    description: "Publish directly with titles, slugs, categories, tags, and featured images.",
    metric: "0% effort",
    detail: "manual publishing"
  }
]

export default function BenefitsSection() {
  return (
    <section className="py-24 px-6 relative">
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-glow opacity-20 blur-3xl" />
      
      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Scale SEO Content Without <span className="text-primary">Sacrificing Quality</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Outcomes that matter for your business growth
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <div className="glass-card p-8 h-full hover:shadow-elevated transition-all duration-500 group-hover:scale-[1.02] relative overflow-hidden">
                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  {/* Icon and metric */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-primary flex items-center justify-center group-hover:shadow-glow transition-all duration-300">
                      <benefit.icon className="w-7 h-7 text-primary-foreground" />
                    </div>
                    
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary group-hover:glow-text transition-all duration-300">
                        {benefit.metric}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {benefit.detail}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold mb-4 group-hover:text-primary transition-colors duration-300">
                    {benefit.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>

                  {/* Progress bar animation */}
                  <div className="mt-6 w-full h-1 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      transition={{ duration: 1.5, delay: index * 0.3 }}
                      viewport={{ once: true }}
                      className="h-full bg-gradient-primary rounded-full"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pro tip section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="glass-card p-8 border-l-4 border-primary relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-primary opacity-10 rounded-full -translate-y-16 translate-x-16" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Zap className="w-4 h-4 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-primary">Pro Tip</h3>
            </div>
            
            <p className="text-muted-foreground leading-relaxed">
              Use a hybrid approach—PostPilot AI for volume SEO posts + humans for thought-leadership. 
              This reflects the current SEO climate and helpful-content emphasis.
            </p>
          </div>
        </motion.div>

     
      </div>
    </section>
  )
}