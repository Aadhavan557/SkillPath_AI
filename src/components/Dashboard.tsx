import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { Roadmap, RoadmapInput } from '../lib/types';
import { GraduationCap, LogOut, Plus, Loader } from 'lucide-react';
import RoadmapForm from './RoadmapForm';
import RoadmapTimeline from './RoadmapTimeline';

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const [roadmaps, setRoadmaps] = useState<Roadmap[]>([]);
  const [activeRoadmap, setActiveRoadmap] = useState<Roadmap | null>(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadRoadmaps();
  }, [user]);

  const loadRoadmaps = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('roadmaps')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setRoadmaps(data);
      const active = data.find(r => r.is_active);
      setActiveRoadmap(active || null);
      setShowForm(data.length === 0);
    }
    setLoading(false);
  };

  const handleCreateRoadmap = async (input: RoadmapInput) => {
    if (!user) return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-roadmap`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(input),
        }
      );

      const roadmapData = await response.json();

      const { data, error } = await supabase
        .from('roadmaps')
        .insert({
          user_id: user.id,
          title: `${input.target_role} Learning Path`,
          target_role: input.target_role,
          current_skill_level: input.current_skill_level,
          time_per_day: input.time_per_day,
          total_duration_weeks: roadmapData.totalWeeks || 12,
          roadmap_data: roadmapData,
          is_active: true,
        })
        .select()
        .single();

      if (!error && data) {
        await supabase
          .from('roadmaps')
          .update({ is_active: false })
          .neq('id', data.id)
          .eq('user_id', user.id);

        await loadRoadmaps();
        setShowForm(false);
      }
    } catch (error) {
      console.error('Error creating roadmap:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 flex items-center justify-center">
        <Loader className="w-8 h-8 text-teal-600 animate-spin" />
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
            <div className="flex items-center space-x-4">
              {activeRoadmap && !showForm && (
                <button
                  onClick={() => setShowForm(true)}
                  className="flex items-center space-x-2 px-4 py-2 text-teal-600 hover:text-teal-700 font-medium transition"
                >
                  <Plus className="w-4 h-4" />
                  <span>New Roadmap</span>
                </button>
              )}
              <button
                onClick={signOut}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showForm ? (
          <div>
            {roadmaps.length > 0 && (
              <button
                onClick={() => setShowForm(false)}
                className="mb-4 text-gray-600 hover:text-gray-800 font-medium"
              >
                ← Back to Dashboard
              </button>
            )}
            <RoadmapForm onSubmit={handleCreateRoadmap} />
          </div>
        ) : activeRoadmap ? (
          <RoadmapTimeline roadmap={activeRoadmap} />
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-600 mb-4">No roadmaps yet</p>
            <button
              onClick={() => setShowForm(true)}
              className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg transition"
            >
              Create Your First Roadmap
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
