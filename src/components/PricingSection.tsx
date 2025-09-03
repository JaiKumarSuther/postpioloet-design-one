import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Check, Star, Zap } from 'lucide-react'

type Plan = {
  name: string
  price: string
  features: string[]
  popular: boolean
  cta: string
  description?: string
}

const plans: Plan[] = [
  {
    name: "Starter",
    price: "$15 / month",
    features: [
      "1 Website connected",
      "5 posts/week (~20/month)",
      "SEO keyword research",
      "Auto-publish to WordPress",
      "Email support (48h response)"
    ],
    popular: false,
    cta: "Start Free Trial"
  },
  {
    name: "Growth",
    price: "$50 / month",
    features: [
      "Up to 3 Websites",
      "15 posts/week (~60/month)",
      "Advanced SEO optimization",
      "Images & metadata included",
      "Priority support (24h response)",
      "Monthly performance summary"
    ],
    popular: true,
    cta: "Start Free Trial"
  },
  {
    name: "Agency",
    price: "$120 / month",
    features: [
      "Up to 10 Websites",
      "40 posts/week (~160/month)",
      "AI topic clustering & series",
      "White-label option",
      "Dedicated onboarding & setup",
      "Priority Slack/WhatsApp support"
    ],
    popular: false,
    cta: "Start Free Trial"
  },
  {
    name: "Enterprise",
    price: "Contact us",
    features: [
      "Unlimited websites",
      "100+ posts/week (custom)",
      "Multi-CMS integration (Webflow, Ghost, Shopify Blog, etc.)",
      "Dedicated account manager",
      "API access & SLA guarantees"
    ],
    popular: false,
    cta: "Contact Sales"
  }
]

export default function PricingSection() {
  return (
    <section className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
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

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`relative group h-full`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <div className="bg-gradient-primary px-2 py-2 rounded-full text-primary-foreground text-sm font-semibold flex items-center gap-2 shadow-glow">
                    <Star className="w-4 h-4" />
                    Most Popular
                  </div>
                </div>
              )}

              <div className={`glass-card p-8 h-full flex flex-col transition-all duration-500 ${
                plan.popular 
                  ? 'border-primary/30 shadow-elevated hover:shadow-glow' 
                  : 'hover:shadow-elevated'
              }`}>
                {/* Plan header */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  {plan.description && (
                    <p className="text-muted-foreground text-sm mb-4">{plan.description}</p>
                  )}
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl md:text-4xl font-bold text-primary">
                      {plan.price}
                    </span>
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
                  className={`w-full h-12 font-semibold mt-auto transition-all duration-300 ${
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