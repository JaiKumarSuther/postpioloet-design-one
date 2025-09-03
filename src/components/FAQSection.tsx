import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "Will AI-written posts still rank after Google's recent updates?",
    answer: "Google rewards helpful, people-first content. We focus on intent, clarity, and usefulness, not keyword stuffing. You can publish directly or review drafts before going live. Our AI follows Google's helpful content guidelines to ensure your posts meet quality standards."
  },
  {
    question: "Can you publish straight to WordPress?",
    answer: "Yes—via the official WordPress REST API with secure authentication, including categories, tags, and featured images. Our integration is WordPress-native and supports all major WordPress configurations, including custom post types and fields."
  },
  {
    question: "How fast can I start?",
    answer: "Most clients onboard in under 24 hours. Add topics, connect WordPress, choose schedule—done. Our streamlined setup process gets you from signup to your first published post in minutes, not days."
  },
  {
    question: "Do I need a human editor?",
    answer: "Many customers let the bot auto-publish; others review drafts. We recommend a light editorial pass for brand voice consistency, but our AI produces publish-ready content that follows SEO best practices and maintains readability."
  },
  {
    question: "What makes PostPilot different from other AI writing tools?",
    answer: "PostPilot is the only AI that handles the complete content pipeline—from topic research and keyword analysis to SEO optimization and WordPress publishing. Most tools just generate text; we deliver a complete content marketing solution."
  },
  {
    question: "How does the keyword research work?",
    answer: "Our AI analyzes search trends, competition, and user intent to build comprehensive SEO outlines. It identifies primary and secondary keywords, understands search intent, and structures content for maximum ranking potential while maintaining readability."
  },
  {
    question: "Can I customize the writing style and tone?",
    answer: "Absolutely. PostPilot learns your brand voice and adapts to your preferred writing style. You can set tone preferences, style guidelines, and even provide sample content for the AI to emulate in future posts."
  },
  {
    question: "What types of content can PostPilot create?",
    answer: "Blog posts, how-to guides, product reviews, comparison articles, listicles, and more. Our AI specializes in long-form, SEO-optimized content that provides real value to your readers while driving organic traffic."
  }
]

export default function FAQSection() {
  return (
    <section className="py-24 px-6 relative">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Everything you need to know about PostPilot AI
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <AccordionItem 
                  value={`item-${index}`} 
                  className="glass-card p-6 border-glass-border hover:shadow-card transition-all duration-300 rounded-xl"
                >
                  <AccordionTrigger className="text-left text-lg font-semibold hover:text-primary transition-colors hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pt-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>

        {/* CTA after FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="glass-card p-8">
            <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
            <p className="text-muted-foreground mb-6">
              Our team is here to help you get the most out of PostPilot AI
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" className="px-6 py-3">
                Schedule a Demo
              </Button>
              <Button variant="ghost-hero" className="px-6 py-3">
                Contact Support
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}