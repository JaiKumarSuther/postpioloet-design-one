import { motion } from 'framer-motion'
import { Search, Target, PenTool, Upload } from 'lucide-react'

const steps = [
  {
    icon: Search,
    title: "Discover Topics",
    description: "We surface relevant, people-first topics in your niche. Aligned with Google's helpful content guidance.",
    color: "#3b82f6"
  },
  {
    icon: Target,
    title: "Do Keyword Research", 
    description: "The bot builds an SEO outline around primary/secondary terms and intent.",
    color: "#60a5fa"
  },
  {
    icon: PenTool,
    title: "Write & Optimize",
    description: "It drafts long-form, human-readable posts with headings, internal-link prompts, metadata, and images.",
    color: "#93c5fd"
  },
  {
    icon: Upload,
    title: "Auto-Publish to WordPress",
    description: "Scheduled or instant publish via official REST API. Draft mode available.",
    color: "#dbeafe"
  }
]

export default function HowItWorksSection() {
  return (
    <section className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            From Idea to Published Post—<span className="text-primary">On Autopilot</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our AI handles the entire content pipeline, from research to publication
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="glass-card p-8 h-full hover:shadow-elevated transition-all duration-300 group-hover:scale-105">
                {/* Step number */}
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm shadow-glow">
                  {index + 1}
                </div>

                {/* Icon */}
                <div className="mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center mb-4 group-hover:shadow-glow transition-all duration-300">
                    <step.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold mb-4 group-hover:text-primary transition-colors">
                  {step.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>

                {/* Connecting line for desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary/50 to-transparent" />
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="glass-card p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Ready to Automate Your Content?</h3>
            <p className="text-muted-foreground mb-6">
              Join thousands of creators who've scaled their content production with AI
            </p>
            <button className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-glow transition-all duration-300 border border-primary/20 backdrop-blur-sm px-8 py-3 rounded-md font-semibold">
              Start Free Trial
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}