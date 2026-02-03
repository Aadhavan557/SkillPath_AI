import { useState } from 'react';
import { RoadmapInput } from '../lib/types';
import { Sparkles, Loader } from 'lucide-react';

interface RoadmapFormProps {
  onSubmit: (input: RoadmapInput) => Promise<void>;
}

export default function RoadmapForm({ onSubmit }: RoadmapFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<RoadmapInput>({
    education_level: '',
    branch: '',
    current_skill_level: 'beginner',
    target_role: '',
    time_per_day: 2,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(formData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 max-w-3xl mx-auto">
      <div className="flex items-center justify-center mb-6">
        <div className="p-3 bg-gradient-to-br from-teal-100 to-blue-100 rounded-full">
          <Sparkles className="w-8 h-8 text-teal-600" />
        </div>
      </div>

      <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">
        Create Your Learning Roadmap
      </h2>
      <p className="text-center text-gray-600 mb-8">
        Tell us about yourself and we'll generate a personalized learning path
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Current Education Level
          </label>
          <select
            value={formData.education_level}
            onChange={(e) => setFormData({ ...formData, education_level: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
            required
          >
            <option value="">Select your level</option>
            <option value="high_school">High School</option>
            <option value="undergraduate">Undergraduate</option>
            <option value="graduate">Graduate</option>
            <option value="working_professional">Working Professional</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Branch / Field of Study
          </label>
          <select
            value={formData.branch}
            onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
            required
          >
            <option value="">Select your branch</option>
            <option value="CSE">Computer Science Engineering</option>
            <option value="ECE">Electronics & Communication</option>
            <option value="EEE">Electrical & Electronics</option>
            <option value="Mechanical">Mechanical Engineering</option>
            <option value="IT">Information Technology</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Current Skill Level
          </label>
          <div className="grid grid-cols-3 gap-3">
            {['beginner', 'intermediate', 'advanced'].map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => setFormData({ ...formData, current_skill_level: level })}
                className={`px-4 py-3 rounded-lg font-medium transition ${
                  formData.current_skill_level === level
                    ? 'bg-teal-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Target Role or Exam
          </label>
          <input
            type="text"
            value={formData.target_role}
            onChange={(e) => setFormData({ ...formData, target_role: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
            placeholder="e.g., Full Stack Developer, Data Analyst, GATE CSE"
            required
          />
          <p className="mt-2 text-xs text-gray-500">
            Examples: Embedded Engineer, Web Developer, Machine Learning Engineer, Government Exams
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Available Time Per Day
          </label>
          <div className="flex items-center space-x-4">
            <input
              type="range"
              min="1"
              max="8"
              value={formData.time_per_day}
              onChange={(e) => setFormData({ ...formData, time_per_day: parseInt(e.target.value) })}
              className="flex-1"
            />
            <div className="px-4 py-2 bg-gray-100 rounded-lg font-medium text-gray-800 min-w-[80px] text-center">
              {formData.time_per_day} {formData.time_per_day === 1 ? 'hour' : 'hours'}
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white font-medium py-4 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg"
        >
          {loading ? (
            <>
              <Loader className="w-5 h-5 animate-spin" />
              <span>Generating Your Roadmap...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              <span>Generate Roadmap</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
