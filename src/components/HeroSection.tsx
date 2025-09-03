import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowRight, Sparkles } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { normalizeUrl } from '@/lib/utils'

export default function HeroSection() {
  const [blogUrl, setBlogUrl] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!blogUrl) return
    const normalized = normalizeUrl(blogUrl)
    navigate(`/analyze?url=${encodeURIComponent(normalized)}`)
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute inset-0" />
      
      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-6"
        >
          
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 leading-tight"
        >
          <span className="glow-text">AI Blog Writer</span> that{' '}
          <span className="text-primary">Researches, Writes</span>{' '}
          & <span className="text-primary">Publishes</span> for You
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0 text-white"
        >
          PostPilot AI automates topic research, keyword strategy, SEO-optimized writing, 
          and auto-publishes to WordPress—so you post consistently and rank faster.
        </motion.p>

        <motion.form 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-2xl mx-auto mb-8 px-4 sm:px-0"
        >
          <Input
            type="text"
            placeholder="Enter your blog or website URL"
            value={blogUrl}
            onChange={(e) => setBlogUrl(e.target.value)}
            className="flex-1 h-12 sm:h-14 text-base sm:text-lg glass-card border-glass-border bg-card/50 backdrop-blur-xl focus:border-primary/50 transition-all duration-300"
            required
          />
          <Button 
            type="submit" 
            variant="hero"
            size="lg"
            className="h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg font-semibold group whitespace-nowrap"
          >
            Get Started
            <ArrowRight className="ml-2 w-4 sm:w-5 h-4 sm:h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center text-sm text-muted-foreground"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-glow-pulse"></div>
            <span>No credit card required</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-glow-pulse" style={{ animationDelay: '0.5s' }}></div>
            <span>Setup in under 5 minutes</span>
          </div>
        </motion.div>
      </div>

      {/* Floating elements */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-10 w-4 h-4 bg-primary/30 rounded-full blur-sm"
      />
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-1/4 right-10 w-6 h-6 bg-primary/20 rounded-full blur-sm"
      />
    </section>
  )
}