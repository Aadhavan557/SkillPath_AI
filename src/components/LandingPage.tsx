import { useState } from 'react';
import { GraduationCap, Target, BookOpen, TrendingUp, ArrowRight } from 'lucide-react';
import Login from './Auth/Login';
import Signup from './Auth/Signup';

export default function LandingPage() {
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('signup');

  const toggleAuthMode = () => {
    setAuthMode(authMode === 'login' ? 'signup' : 'login');
  };

  if (showAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 flex items-center justify-center p-4">
        {authMode === 'login' ? (
          <Login onToggle={toggleAuthMode} />
        ) : (
          <Signup onToggle={toggleAuthMode} />
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <GraduationCap className="w-8 h-8 text-teal-600" />
              <span className="text-xl font-bold text-gray-800">SkillPath AI</span>
            </div>
            <button
              onClick={() => {
                setAuthMode('login');
                setShowAuth(true);
              }}
              className="px-6 py-2 text-teal-600 hover:text-teal-700 font-medium transition"
            >
              Sign In
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Your Personalized
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600">
              Learning Roadmap
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Stop wondering what to learn next. Get an AI-powered, step-by-step roadmap
            tailored to your goals, skills, and schedule.
          </p>
          <button
            onClick={() => {
              setAuthMode('signup');
              setShowAuth(true);
            }}
            className="inline-flex items-center px-8 py-4 bg-teal-600 hover:bg-teal-700 text-white font-medium text-lg rounded-xl transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Get Started Free
            <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          <FeatureCard
            icon={<Target className="w-8 h-8 text-blue-600" />}
            title="Goal-Oriented"
            description="Define your target role and get a customized learning path"
          />
          <FeatureCard
            icon={<BookOpen className="w-8 h-8 text-teal-600" />}
            title="Free Resources"
            description="Curated YouTube videos, docs, and tools for every topic"
          />
          <FeatureCard
            icon={<TrendingUp className="w-8 h-8 text-blue-600" />}
            title="Track Progress"
            description="Monitor your journey with checkpoints and milestones"
          />
          <FeatureCard
            icon={<GraduationCap className="w-8 h-8 text-teal-600" />}
            title="Hands-On Projects"
            description="Build real projects after each learning phase"
          />
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Step
              number="1"
              title="Tell Us About You"
              description="Share your current education, skills, and target role"
            />
            <Step
              number="2"
              title="Get Your Roadmap"
              description="Receive a personalized, week-by-week learning plan"
            />
            <Step
              number="3"
              title="Learn & Grow"
              description="Follow the plan, complete projects, and track your progress"
            />
          </div>
        </div>

        <div className="mt-20 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Start Your Journey?
          </h3>
          <p className="text-gray-600 mb-8">
            Join students who are confidently building their skills
          </p>
          <button
            onClick={() => {
              setAuthMode('signup');
              setShowAuth(true);
            }}
            className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium text-lg rounded-xl transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Create Free Account
            <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </div>
      </div>

      <footer className="bg-gray-900 text-white py-8 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            &copy; 2024 SkillPath AI. Empowering learners worldwide.
          </p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
      <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-50 to-teal-50 rounded-full mb-4 mx-auto">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">{title}</h3>
      <p className="text-gray-600 text-center text-sm leading-relaxed">{description}</p>
    </div>
  );
}

function Step({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div className="text-center">
      <div className="inline-flex items-center justify-center w-12 h-12 bg-teal-600 text-white rounded-full text-xl font-bold mb-4">
        {number}
      </div>
      <h4 className="text-lg font-semibold text-gray-900 mb-2">{title}</h4>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </div>
  );
}
