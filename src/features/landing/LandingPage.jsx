import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';

export default function LandingPage() {
  return (
    <div className="bg-background min-h-screen font-sans text-foreground">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-mesh-bottom">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 right-10 w-[400px] h-[400px] rounded-full bg-leaf/10 blur-3xl"></div>
          <div className="absolute bottom-20 left-10 w-[300px] h-[300px] rounded-full bg-sky/10 blur-3xl"></div>
          <svg className="leaf-decoration absolute top-32 right-20 w-24 h-24 text-primary opacity-10" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z"></path>
          </svg>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            {/* Left Content */}
            <div>
              <div className="badge-eco mb-6">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
                </svg>
                <span>Global Certified Platform</span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight font-heading">
                Track Your <br/>
                <span className="gradient-text-eco">Plastic Footprint</span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-xl">
                Measure, reduce, and offset your environmental plastic impact. Join thousands of users committed to a sustainable, plastic-free future.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link to="/dashboard" className="btn-primary flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                  </svg>
                  Calculate Your Impact
                </Link>
                <Link to="/dashboard" className="btn-secondary">View Demo</Link>
              </div>

              <div className="flex flex-wrap gap-6">
                {[
                  { text: 'Free to start' },
                  { text: 'Global ISO compliant' },
                  { text: '10,000+ communities' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-muted-foreground">
                    <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
                    </svg>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Content / Calculator UI Widget */}
            <div className="relative mt-12 lg:mt-0">
              <div className="organic-card p-8 w-full max-w-md mx-auto shadow-[0_20px_60px_rgba(0,0,0,0.08)] relative z-10 block !top-auto !left-auto">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-foreground font-heading text-xl">Your Plastic Footprint</h3>
                  <span className="badge-eco !text-xs">Live Data</span>
                </div>
                
                <div className="text-center mb-8">
                  <div className="relative inline-block">
                    <svg className="w-48 h-48" viewBox="0 0 120 120">
                      <circle cx="60" cy="60" r="54" fill="none" stroke="var(--color-border)" strokeWidth="8"></circle>
                      <circle cx="60" cy="60" r="54" fill="none" stroke="url(#gradient)" strokeWidth="8" strokeLinecap="round" strokeDasharray="339.3" strokeDashoffset="85" transform="rotate(-90 60 60)"></circle>
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="var(--color-primary)"></stop>
                          <stop offset="100%" stopColor="var(--color-leaf)"></stop>
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-4xl font-bold text-foreground">12.4</span>
                      <span className="text-sm text-muted-foreground mt-1">kg / month</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-4 font-medium">35% below national average</p>
                </div>

                <div className="space-y-4">
                  <ProgressBar label="Single-use (PET)" value="4.8kg" percent="33%" color="#228b22" />
                  <ProgressBar label="Packaging (HDPE)" value="3.6kg" percent="25%" color="#4caf50" />
                  <ProgressBar label="Household (PP)" value="4.0kg" percent="42%" color="#87ceeb" />
                </div>
              </div>

              {/* Floating Widgets */}
              <div className="absolute -top-6 -left-6 organic-card p-4 hidden lg:flex items-center gap-3 z-20 !block !top-[-24px] !left-[-24px] shadow-lg">
                <div className="w-12 h-12 rounded-full bg-leaf flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"></path>
                  </svg>
                </div>
                <div>
                  <div className="font-bold text-lg text-foreground">-15%</div>
                  <div className="text-xs text-muted-foreground">vs last month</div>
                </div>
              </div>

              <div className="absolute -bottom-6 -right-6 organic-card p-4 hidden lg:flex items-center gap-3 z-20 !block !bottom-[-24px] !right-[-24px] shadow-lg">
                <div className="w-12 h-12 rounded-full bg-sun flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1z"></path>
                  </svg>
                </div>
                <div>
                  <div className="font-bold text-lg text-foreground">100%</div>
                  <div className="text-xs text-muted-foreground">Recycled Material</div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-background-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="badge-eco mx-auto mb-4"><span>Features</span></div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 font-heading">
              Everything You Need for <br/>
              <span className="gradient-text-eco">Sustainability</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A complete platform to measure, manage, and improve your environmental impact.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard 
              title="Plastic Tracking" 
              desc="Automatically measure your plastic consumption across all categories with AI-powered data."
              color="#228b22"
            />
            <FeatureCard 
              title="Reduction Planning" 
              desc="Get personalized recommendations to reduce your environmental impact based on your data."
              color="#4caf50"
            />
            <FeatureCard 
              title="Ocean Offsetting" 
              desc="Invest in verified ocean cleanup projects worldwide to neutralize your remaining usage."
              color="#87ceeb"
            />
          </div>
        </div>
      </section>

      {/* Mini CTA Footer */}
      <section className="py-24 bg-background-dark relative overflow-hidden text-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-1/4 w-[300px] h-[300px] rounded-full bg-primary/20 blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-[250px] h-[250px] rounded-full bg-leaf/20 blur-3xl"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-heading">
            Ready to Make a <span className="text-leaf">Positive Impact?</span>
          </h2>
          <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
            Join thousands of users committed to a sustainable future. Start measuring your plastic footprint today—it's free.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/dashboard" className="btn-primary">Get Started Free</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function ProgressBar({ label, value, percent, color }) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-2">
        <span className="text-muted-foreground font-medium">{label}</span>
        <span className="font-bold text-foreground">{value}</span>
      </div>
      <div className="h-2.5 bg-background-alt rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all duration-1000 ease-out" style={{ width: percent, backgroundColor: color }}></div>
      </div>
    </div>
  );
}

function FeatureCard({ title, desc, color }) {
  return (
    <div className="feature-card">
      <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6" style={{ backgroundColor: `${color}15`, color: color }}>
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
        </svg>
      </div>
      <h3 className="text-2xl font-semibold text-foreground mb-3 font-heading">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{desc}</p>
    </div>
  );
}
