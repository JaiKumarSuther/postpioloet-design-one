import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Check, Star, Zap } from 'lucide-react'

const plans = [
  {
    name: "Starter",
    price: "$29",
    period: "/month",
    description: "Perfect for solo creators and small blogs",
    features: [
      "10 AI-generated posts per month",
      "Basic keyword research",
      "WordPress publishing",
      "Email support",
      "SEO optimization"
    ],
    popular: false,
    cta: "Start Free Trial"
  },
  {
    name: "Professional",
    price: "$79", 
    period: "/month",
    description: "Ideal for growing businesses and agencies",
    features: [
      "50 AI-generated posts per month",
      "Advanced keyword research",
      "Multi-site WordPress publishing",
      "Priority support",
      "Custom content templates",
      "Analytics & reporting",
      "API access"
    ],
    popular: true,
    cta: "Start Free Trial"
  },
  {
    name: "Enterprise",
    price: "$199",
    period: "/month", 
    description: "For large teams and high-volume content",
    features: [
      "Unlimited AI-generated posts",
      "White-label solution",
      "Custom integrations",
      "Dedicated account manager",
      "Advanced analytics",
      "Custom workflows",
      "SLA guarantee",
      "Team collaboration tools"
    ],
    popular: false,
    cta: "Contact Sales"
  }
]

export default function PricingSection() {
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
            Choose a Plan That Fits Your <span className="text-primary">Publishing Velocity</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Scale your content creation with plans designed for every stage of growth
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`relative group ${plan.popular ? 'scale-105' : ''}`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <div className="bg-gradient-primary px-6 py-2 rounded-full text-primary-foreground text-sm font-semibold flex items-center gap-2 shadow-glow">
                    <Star className="w-4 h-4" />
                    Most Popular
                  </div>
                </div>
              )}

              <div className={`glass-card p-8 h-full transition-all duration-500 ${
                plan.popular 
                  ? 'border-primary/30 shadow-elevated hover:shadow-glow' 
                  : 'hover:shadow-elevated hover:scale-[1.02]'
              }`}>
                {/* Plan header */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{plan.description}</p>
                  
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl md:text-5xl font-bold text-primary">
                      {plan.price}
                    </span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <motion.li
                      key={featureIndex}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.2 + featureIndex * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-sm">{feature}</span>
                    </motion.li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Button 
                  variant={plan.popular ? "hero" : "ghost-hero"}
                  className={`w-full h-12 font-semibold transition-all duration-300 ${
                    plan.popular && 'shadow-glow'
                  }`}
                >
                  {plan.popular && <Zap className="w-4 h-4 mr-2" />}
                  {plan.cta}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Guarantee section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="glass-card p-6 max-w-md mx-auto">
            <p className="text-sm text-muted-foreground">
              🔒 30-day money-back guarantee • Cancel anytime • No setup fees
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}