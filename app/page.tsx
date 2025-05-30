"use client"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { ArrowRight, Sparkles, Calendar, CheckCircle, Twitter, Mail, MessageCircle, X, Send } from "lucide-react"
import { supabase } from "@/utils/supabase/client"
import { Analytics } from "@vercel/analytics/next"

export default function MarketeerLanding() {
  const [Xid, setXid] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  // Feature request dialog states
  const [isFeatureDialogOpen, setIsFeatureDialogOpen] = useState(false)
  const [featureXid, setFeatureXid] = useState("")
  const [featureRequest, setFeatureRequest] = useState("")
  const [isFeatureSubmitting, setIsFeatureSubmitting] = useState(false)
  const [featureSubmitted, setFeatureSubmitted] = useState(false)
  

  // Party poppers effect on page load
  useEffect(() => {
    const createConfetti = () => {
      const colors = ['#3B82F6', '#8B5CF6', '#EC4899', '#F59E0B', '#EF4444', '#10B981']
      const confettiCount = 50
      
      for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div')
        confetti.style.position = 'fixed'
        confetti.style.left = Math.random() * 100 + 'vw'
        confetti.style.top = '-10px'
        confetti.style.width = Math.random() * 8 + 4 + 'px'
        confetti.style.height = confetti.style.width
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px'
        confetti.style.pointerEvents = 'none'
        confetti.style.zIndex = '9999'
        confetti.style.animation = `confetti-fall ${Math.random() * 3 + 2}s linear forwards`
        
        document.body.appendChild(confetti)
        
        setTimeout(() => {
          if (confetti.parentNode) {
            confetti.parentNode.removeChild(confetti)
          }
        }, 5000)
      }
    }

    // Add confetti CSS animation
    const style = document.createElement('style')
    style.textContent = `
      @keyframes confetti-fall {
        0% {
          transform: translateY(-100vh) rotate(0deg);
          opacity: 1;
        }
        100% {
          transform: translateY(100vh) rotate(720deg);
          opacity: 0;
        }
      }
    `
    document.head.appendChild(style)

    // Trigger confetti after a short delay
    const timer = setTimeout(createConfetti, 1000)
    
    return () => {
      clearTimeout(timer)
      if (style.parentNode) {
        style.parentNode.removeChild(style)
      }
    }
  }, [])

  // Smooth scrolling effect
  useEffect(() => {
    let rafId: number | null = null
    let currentScroll = window.pageYOffset
    let targetScroll = window.pageYOffset
    let ease = 0.08

    const updateScroll = () => {
      targetScroll = window.pageYOffset
      currentScroll += (targetScroll - currentScroll) * ease
      
      if (Math.abs(targetScroll - currentScroll) < 0.1) {
        currentScroll = targetScroll
      }
      
      rafId = requestAnimationFrame(updateScroll)
    }

    const startSmoothScroll = () => {
      if (rafId) {
        cancelAnimationFrame(rafId)
      }
      rafId = requestAnimationFrame(updateScroll)
    }

    startSmoothScroll()

    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId)
      }
    }
  }, [])

  const handleWaitlistSubmit = async (e:any) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      const { data, error } = await supabase
  .from('waitlist')
  .insert([{ Xid }])
      await new Promise(resolve => setTimeout(resolve, 1000))
      setIsSubmitted(true)
      setXid("")
      
      // Trigger celebration confetti
      const celebrateConfetti = () => {
        const colors = ['#10B981', '#059669', '#34D399', '#6EE7B7']
        for (let i = 0; i < 30; i++) {
          const confetti = document.createElement('div')
          confetti.style.position = 'fixed'
          confetti.style.left = Math.random() * 100 + 'vw'
          confetti.style.top = '-10px'
          confetti.style.width = Math.random() * 6 + 3 + 'px'
          confetti.style.height = confetti.style.width
          confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
          confetti.style.borderRadius = '50%'
          confetti.style.pointerEvents = 'none'
          confetti.style.zIndex = '9999'
          confetti.style.animation = `confetti-fall ${Math.random() * 2 + 1.5}s linear forwards`
          
          document.body.appendChild(confetti)
          
          setTimeout(() => {
            if (confetti.parentNode) {
              confetti.parentNode.removeChild(confetti)
            }
          }, 3500)
        }
      }
      
      celebrateConfetti()
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleFeatureRequest = async (e: any) => {
    e.preventDefault()
    setIsFeatureSubmitting(true)
    
    try {
      const { data, error } = await supabase
        .from('feature_requests')
        .insert([{ 
          Xid: featureXid || null, 
          feature_request: featureRequest 
        }])
      
      if (error) {
        console.error('Error submitting feature request:', error)
        return
      }
      
      setFeatureSubmitted(true)
      setTimeout(() => {
        setIsFeatureDialogOpen(false)
        setFeatureXid("")
        setFeatureRequest("")
        setFeatureSubmitted(false)
      }, 2000)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsFeatureSubmitting(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        duration: 0.6
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  }

  const features = [
    {
      icon: Twitter,
      title: "AI learns your voice",
      description: "Analyzes your existing tweets to match your unique tone and style"
    },
    {
      icon: Sparkles,
      title: "Daily tweet ideas",
      description: "Fresh content generated daily based on your SaaS product and audience"
    },
    {
      icon: Calendar,
      title: "Smart scheduling",
      description: "Post immediately or schedule tweets for optimal engagement times"
    }
  ]

  const steps = [
    { step: "01", title: "Connect X Account", desc: "Sign in with Twitter OAuth" },
    { step: "02", title: "Describe Your SaaS", desc: "Tell us about your product & audience" },
    { step: "03", title: "AI Learns Your Voice", desc: "We analyze your existing tweets" },
    { step: "04", title: "Get Daily Tweets", desc: "Review, edit, and post or schedule" }
  ]

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <Analytics />
      {/* Feature Request Dialog */}
      {isFeatureDialogOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <button
              onClick={() => setIsFeatureDialogOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Suggest a Feature</h3>
            </div>
            
            <p className="text-gray-600 mb-6">
              Have an idea for Marketeer? We'd love to hear from you!
            </p>

            {!featureSubmitted ? (
              <form onSubmit={handleFeatureRequest} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Xid (optional)
                  </label>
                  <input
                    type="text"
                    value={featureXid}
                    onChange={(e) => setFeatureXid(e.target.value)}
                    placeholder="@yourXid"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Feature Request *
                  </label>
                  <textarea
                    value={featureRequest}
                    onChange={(e) => setFeatureRequest(e.target.value)}
                    placeholder="Describe the feature you'd like to see..."
                    required
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all resize-none"
                  />
                </div>
                
                <motion.button
                  type="submit"
                  disabled={isFeatureSubmitting || !featureRequest.trim()}
                  className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isFeatureSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Submit Request
                    </>
                  )}
                </motion.button>
              </form>
            ) : (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-6"
              >
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Thank you!</h4>
                <p className="text-gray-600">Your feature request has been submitted.</p>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-blue-100/40 to-purple-100/40 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-pink-100/30 to-yellow-100/30 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <motion.header
          className="px-6 py-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Marketeer
              </span>
            </div>
            <div className="flex items-center gap-3">
              <motion.button
                onClick={() => setIsFeatureDialogOpen(true)}
                className="text-sm text-gray-700 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200/60 shadow-sm font-medium hover:bg-white/90 hover:shadow-md transition-all flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <MessageCircle className="w-4 h-4" />
                Suggest Features
              </motion.button>
              <motion.div
                className="text-sm text-gray-700 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200/60 shadow-sm font-medium"
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.9)" }}
                transition={{ duration: 0.2 }}
              >
                Coming Soon
              </motion.div>
            </div>
          </div>
        </motion.header>

        {/* Hero Section */}
        <motion.section
          className="px-6 py-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <motion.div variants={itemVariants} className="inline-block mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200/50 rounded-full shadow-sm hover:shadow-md transition-shadow">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold text-gray-700">AI-Powered Twitter Marketing</span>
              </div>
            </motion.div>

            {/* Main Headline */}
            <motion.h1 
              variants={itemVariants}
              className="text-4xl lg:text-6xl font-bold leading-tight mb-6"
            >
              <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                Never Run Out of
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 bg-clip-text text-transparent">
                Tweet Ideas
              </span>
              <span className="text-gray-900"> Again</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              variants={itemVariants}
              className="text-lg lg:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              Marketeer learns your voice from existing tweets and generates daily content 
              tailored to your SaaS product. <span className="font-semibold text-gray-900">Post consistently, grow your audience.</span>
            </motion.p>

            {/* Waitlist Form */}
            <motion.div variants={itemVariants} className="mb-12">
              {!isSubmitted ? (
                <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                  <div className="flex-1">
                    <input
                      type="Xid"
                      value={Xid}
                      onChange={(e) => setXid(e.target.value)}
                      placeholder="@yourXid"
                      required
                      className="w-full px-5 py-3.5 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none text-gray-800 transition-all bg-white/90 backdrop-blur-sm placeholder-gray-500 font-medium shadow-sm hover:shadow-md"
                    />
                  </div>
                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    onClick={handleWaitlistSubmit}
                    className="px-7 py-3.5 bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 hover:from-blue-700 hover:via-blue-800 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl active:shadow-md transition-all duration-200 text-base group disabled:opacity-50 disabled:cursor-not-allowed min-w-[140px] flex items-center justify-center"
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        Join Waitlist
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      </>
                    )}
                  </motion.button>
                </div>
              ) : (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl max-w-md mx-auto shadow-sm"
                >
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <span className="text-green-800 font-semibold">You're on the waitlist! 🎉</span>
                </motion.div>
              )}

              <motion.p 
                variants={itemVariants}
                className="text-sm text-gray-500 mt-3 font-medium"
              >
                Join 10+ founders already on the waitlist • No spam, ever
              </motion.p>
            </motion.div>

            {/* Features Grid */}
            <motion.div 
              variants={itemVariants}
              className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="p-6 bg-white/70 backdrop-blur-sm rounded-xl border border-gray-200/60 hover:shadow-lg hover:border-gray-300/60 transition-all duration-300 group"
                  whileHover={{ y: -3 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform shadow-sm">
                    <feature.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* How It Works */}
        <motion.section 
          className="px-6 py-16 bg-gradient-to-br from-gray-50/50 to-blue-50/30 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="max-w-5xl mx-auto">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                How It Works
              </h2>
              <p className="text-lg text-gray-600">
                Get started in minutes, not hours
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  className="text-center relative"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="relative">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold text-base mx-auto mb-4 shadow-lg hover:scale-105 transition-transform">
                      {step.step}
                    </div>
                    {index < steps.length - 1 && (
                      <div className="hidden lg:block absolute top-7 left-full w-full h-0.5 bg-gradient-to-r from-blue-200 to-purple-200 -translate-y-1/2" />
                    )}
                  </div>
                  <h3 className="text-base font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Final CTA */}
        <motion.section 
          className="px-6 py-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2 
              className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Ready to grow your SaaS on 𝕏?
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-600 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Be among the first to experience AI-powered Twitter marketing
            </motion.p>
            
            {!isSubmitted && (
              <motion.form 
                onSubmit={handleWaitlistSubmit} 
                className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <input
                  type="text"
                  value={Xid}
                  onChange={(e) => setXid(e.target.value)}
                  placeholder="@yourXid"
                  required
                  className="flex-1 px-5 py-3.5 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none text-gray-800 transition-all bg-white/90 backdrop-blur-sm placeholder-gray-500 font-medium shadow-sm hover:shadow-md"
                />
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  onClick={handleWaitlistSubmit}
                  className="px-7 py-3.5 bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 hover:from-blue-700 hover:via-blue-800 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl active:shadow-md transition-all duration-200 text-base group disabled:opacity-50 disabled:cursor-not-allowed min-w-[140px] flex items-center justify-center"
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      Join Waitlist
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </>
                  )}
                </motion.button>
              </motion.form>
            )}
          </div>
        </motion.section>

        {/* Footer */}
        <motion.footer 
          className="px-6 py-10 border-t border-gray-200/60 bg-white/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">Marketeer</span>
              </div>
              
              <div className="flex items-center gap-6 text-sm text-gray-600">
                <span className="font-medium">Built for SaaS founders</span>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span className="font-medium">hello@marketeer.ai</span>
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200/50 text-center text-sm text-gray-500">
              © 2025 Marketeer. All rights reserved.
            </div>
          </div>
        </motion.footer>
      </div>
    </div>
  )
}