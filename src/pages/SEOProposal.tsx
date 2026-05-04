import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Check, 
  ArrowLeft, 
  MessageCircle, 
  Star,
  Shield,
  Clock,
  FileText
} from 'lucide-react';
import { Link } from 'react-router-dom';
import siteConfig from '../config/siteConfig';

gsap.registerPlugin(ScrollTrigger);

// Particle Component
function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    opacity: number;
  }>>([]);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particleCount = Math.min(30, Math.floor(window.innerWidth / 40));
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.4 + 0.1
    }));

    let frameCount = 0;
    const animate = () => {
      frameCount++;
      if (frameCount % 2 === 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particlesRef.current.forEach((particle) => {
          particle.x += particle.vx;
          particle.y += particle.vy;

          if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
          if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(34, 197, 94, ${particle.opacity})`;
          ctx.fill();
        });

        for (let i = 0; i < particlesRef.current.length; i += 3) {
          for (let j = i + 1; j < particlesRef.current.length; j += 3) {
            const dx = particlesRef.current[i].x - particlesRef.current[j].x;
            const dy = particlesRef.current[i].y - particlesRef.current[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 120) {
              ctx.beginPath();
              ctx.moveTo(particlesRef.current[i].x, particlesRef.current[i].y);
              ctx.lineTo(particlesRef.current[j].x, particlesRef.current[j].y);
              ctx.strokeStyle = `rgba(34, 197, 94, ${0.08 * (1 - dist / 120)})`;
              ctx.stroke();
            }
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.5 }}
    />
  );
}

function GradientOrbs() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-r from-[#22C55E]/15 to-transparent blur-[100px] -top-32 -left-32 animate-float-slow" />
      <div className="absolute w-[400px] h-[400px] rounded-full bg-gradient-to-l from-[#22C55E]/10 to-transparent blur-[80px] top-1/3 -right-24 animate-float-medium" />
      <div className="absolute w-[300px] h-[300px] rounded-full bg-gradient-to-br from-[#22C55E]/20 to-transparent blur-[70px] bottom-0 right-1/4 animate-pulse-slow" />
    </div>
  );
}

export default function SEOProposal() {
  const mainRef = useRef<HTMLDivElement>(null);
  const [showContactModal, setShowContactModal] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.plan-card',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.plans-grid',
            start: 'top 80%',
          }
        }
      );

      gsap.fromTo('.terms-section',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.terms-section',
            start: 'top 85%',
          }
        }
      );
    }, mainRef);

    return () => ctx.revert();
  }, []);

  const { seoProposal, personal } = siteConfig;

  return (
    <div ref={mainRef} className="min-h-screen bg-[#0A0A0A] text-white overflow-x-hidden relative">
      <ParticleBackground />
      <GradientOrbs />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/70 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#22C55E] to-[#16A34A] flex items-center justify-center text-white font-bold text-sm">
                {personal.initials}
              </div>
              <span className="text-sm sm:text-base font-semibold tracking-tight hidden sm:block">
                {personal.shortName}
              </span>
            </Link>
            
            <Link 
              to="/"
              className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm"
            >
              <ArrowLeft size={16} />
              Back to Home
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 sm:pt-32 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="inline-block px-4 py-1.5 bg-[#22C55E]/10 border border-[#22C55E]/30 rounded-full text-[#22C55E] text-sm font-medium mb-6">
            Professional SEO Services
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 sm:mb-6">
            {seoProposal.title}
          </h1>
          <p className="text-zinc-400 text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
            {seoProposal.subtitle}
          </p>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 relative">
        <div className="plans-grid max-w-7xl mx-auto grid md:grid-cols-3 gap-6 sm:gap-8 relative z-10">
          {seoProposal.plans.map((plan, index) => (
            <div
              key={index}
              className={`plan-card relative bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-2xl p-6 sm:p-8 border transition-all duration-300 ${
                plan.highlighted 
                  ? 'border-[#22C55E] shadow-xl shadow-[#22C55E]/10 scale-105 md:scale-110' 
                  : 'border-zinc-800 hover:border-zinc-700'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-[#22C55E] to-[#16A34A] rounded-full text-white text-xs font-semibold">
                    <Star size={12} fill="currentColor" />
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-xl sm:text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center gap-1 mb-2">
                  <span className="text-4xl sm:text-5xl font-bold text-[#22C55E]">{plan.price}</span>
                  <span className="text-zinc-400">/{plan.period}</span>
                </div>
                <p className="text-zinc-400 text-sm">{plan.description}</p>
              </div>

              <div className="space-y-3 mb-8">
                {plan.features.map((feature, fIndex) => (
                  <div key={fIndex} className="flex items-start gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      plan.highlighted ? 'bg-[#22C55E]/20' : 'bg-zinc-800'
                    }`}>
                      <Check size={12} className={plan.highlighted ? 'text-[#22C55E]' : 'text-zinc-400'} />
                    </div>
                    <span className="text-zinc-300 text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setShowContactModal(true)}
                className={`w-full py-3 rounded-full font-medium transition-all ${
                  plan.highlighted
                    ? 'bg-gradient-to-r from-[#22C55E] to-[#16A34A] text-white hover:shadow-lg hover:shadow-[#22C55E]/30'
                    : 'bg-zinc-800 text-white hover:bg-zinc-700 border border-zinc-700'
                }`}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Payment Terms */}
      <section className="terms-section py-12 sm:py-16 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="bg-gradient-to-br from-zinc-900/80 to-zinc-900/40 border border-zinc-800 rounded-2xl p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#22C55E]/10 rounded-xl flex items-center justify-center">
                <FileText className="text-[#22C55E]" size={20} />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold">Payment Terms</h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {seoProposal.paymentTerms.map((term, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-zinc-800 rounded-lg flex items-center justify-center flex-shrink-0">
                    {index === 0 && <Clock size={14} className="text-zinc-400" />}
                    {index === 1 && <Shield size={14} className="text-zinc-400" />}
                    {index === 2 && <Check size={14} className="text-zinc-400" />}
                    {index === 3 && <FileText size={14} className="text-zinc-400" />}
                  </div>
                  <span className="text-zinc-300 text-sm">{term}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-2xl mx-auto text-center relative z-10">
          <div className="bg-gradient-to-br from-[#22C55E]/10 to-transparent border border-[#22C55E]/30 rounded-2xl p-8 sm:p-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Ready to Boost Your Rankings?
            </h2>
            <p className="text-zinc-400 mb-6">
              Let's discuss your SEO goals and create a customized strategy for your business.
            </p>
            <a
              href={personal.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#22C55E] to-[#16A34A] text-white px-8 py-4 rounded-full font-medium hover:shadow-lg hover:shadow-[#22C55E]/30 transition-all"
            >
              <MessageCircle size={20} />
              Contact on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800/50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-zinc-500 text-sm">
            © {new Date().getFullYear()} {personal.name}. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Get Started</h3>
            <p className="text-zinc-400 mb-6">
              Contact me on WhatsApp to discuss your SEO needs and get started with your chosen plan.
            </p>
            <div className="flex gap-3">
              <a
                href={personal.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-[#22C55E] text-white py-3 rounded-full font-medium text-center hover:bg-[#16A34A] transition-colors"
              >
                Contact on WhatsApp
              </a>
              <button
                onClick={() => setShowContactModal(false)}
                className="px-6 py-3 bg-zinc-800 text-white rounded-full font-medium hover:bg-zinc-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
