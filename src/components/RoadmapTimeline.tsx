import { useState, useEffect } from 'react';
import { Roadmap, RoadmapPhase, ProgressTracking } from '../lib/types';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import {
  CheckCircle,
  Circle,
  BookOpen,
  Youtube,
  FileText,
  Wrench,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Award,
  Clock,
  Target,
} from 'lucide-react';

interface RoadmapTimelineProps {
  roadmap: Roadmap;
}

export default function RoadmapTimeline({ roadmap }: RoadmapTimelineProps) {
  const { user } = useAuth();
  const [progress, setProgress] = useState<ProgressTracking[]>([]);
  const [expandedPhases, setExpandedPhases] = useState<number[]>([0]);
  const phases = roadmap.roadmap_data?.phases || [];

  useEffect(() => {
    loadProgress();
  }, [roadmap.id]);

  const loadProgress = async () => {
    if (!user) return;

    const { data } = await supabase
      .from('progress_tracking')
      .select('*')
      .eq('roadmap_id', roadmap.id)
      .eq('user_id', user.id);

    if (data) {
      setProgress(data);
    }
  };

  const toggleCheckpoint = async (phaseIndex: number, checkpointIndex: number) => {
    if (!user) return;

    const existing = progress.find(
      (p) => p.phase_index === phaseIndex && p.checkpoint_index === checkpointIndex
    );

    if (existing) {
      const newCompleted = !existing.completed;
      await supabase
        .from('progress_tracking')
        .update({
          completed: newCompleted,
          completed_at: newCompleted ? new Date().toISOString() : null,
        })
        .eq('id', existing.id);
    } else {
      await supabase.from('progress_tracking').insert({
        user_id: user.id,
        roadmap_id: roadmap.id,
        phase_index: phaseIndex,
        checkpoint_index: checkpointIndex,
        completed: true,
        completed_at: new Date().toISOString(),
      });
    }

    await loadProgress();
  };

  const isCheckpointCompleted = (phaseIndex: number, checkpointIndex: number) => {
    return progress.some(
      (p) => p.phase_index === phaseIndex && p.checkpoint_index === checkpointIndex && p.completed
    );
  };

  const getPhaseProgress = (phaseIndex: number) => {
    const phase = phases[phaseIndex];
    if (!phase?.checkpoints) return 0;
    const completed = phase.checkpoints.filter((_, idx) =>
      isCheckpointCompleted(phaseIndex, idx)
    ).length;
    return (completed / phase.checkpoints.length) * 100;
  };

  const togglePhase = (index: number) => {
    setExpandedPhases((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Youtube className="w-4 h-4" />;
      case 'doc':
        return <FileText className="w-4 h-4" />;
      case 'tool':
        return <Wrench className="w-4 h-4" />;
      default:
        return <BookOpen className="w-4 h-4" />;
    }
  };

  const totalProgress =
    phases.length > 0
      ? phases.reduce((sum, _, idx) => sum + getPhaseProgress(idx), 0) / phases.length
      : 0;

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{roadmap.title}</h1>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <Target className="w-4 h-4" />
                <span>{roadmap.target_role}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{roadmap.time_per_day}h per day</span>
              </div>
              <div className="flex items-center space-x-1">
                <Award className="w-4 h-4" />
                <span>{roadmap.total_duration_weeks} weeks</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Overall Progress</span>
            <span className="text-sm font-bold text-teal-600">{Math.round(totalProgress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-teal-600 to-blue-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${totalProgress}%` }}
            />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {phases.map((phase: RoadmapPhase, phaseIndex: number) => {
          const isExpanded = expandedPhases.includes(phaseIndex);
          const phaseProgress = getPhaseProgress(phaseIndex);

          return (
            <div key={phaseIndex} className="bg-white rounded-xl shadow-md overflow-hidden">
              <button
                onClick={() => togglePhase(phaseIndex)}
                className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-teal-100 to-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-lg font-bold text-teal-700">{phaseIndex + 1}</span>
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-semibold text-gray-900">{phase.title}</h3>
                    <p className="text-sm text-gray-600">{phase.duration}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-sm font-medium text-teal-600">
                      {Math.round(phaseProgress)}% Complete
                    </div>
                    <div className="w-32 bg-gray-200 rounded-full h-2 mt-1">
                      <div
                        className="bg-teal-600 h-2 rounded-full transition-all"
                        style={{ width: `${phaseProgress}%` }}
                      />
                    </div>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </button>

              {isExpanded && (
                <div className="px-6 pb-6 space-y-6 border-t border-gray-100">
                  <div className="mt-6">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                      <BookOpen className="w-5 h-5 text-teal-600" />
                      <span>Topics to Learn</span>
                    </h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {phase.topics?.map((topic: string, idx: number) => (
                        <li key={idx} className="flex items-center space-x-2 text-gray-700">
                          <div className="w-1.5 h-1.5 bg-teal-600 rounded-full" />
                          <span className="text-sm">{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {phase.resources && phase.resources.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Free Resources</h4>
                      <div className="space-y-2">
                        {phase.resources.map((resource, idx: number) => (
                          <a
                            key={idx}
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition group"
                          >
                            <div className="text-teal-600">{getResourceIcon(resource.type)}</div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 group-hover:text-teal-600">
                                {resource.title}
                              </p>
                              <p className="text-xs text-gray-600">{resource.description}</p>
                            </div>
                            <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-teal-600" />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {phase.projects && phase.projects.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Mini Projects</h4>
                      <ul className="space-y-2">
                        {phase.projects.map((project: string, idx: number) => (
                          <li key={idx} className="flex items-start space-x-2 text-gray-700">
                            <Wrench className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{project}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {phase.checkpoints && phase.checkpoints.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Skill Checkpoints</h4>
                      <div className="space-y-2">
                        {phase.checkpoints.map((checkpoint: string, checkpointIdx: number) => {
                          const completed = isCheckpointCompleted(phaseIndex, checkpointIdx);
                          return (
                            <button
                              key={checkpointIdx}
                              onClick={() => toggleCheckpoint(phaseIndex, checkpointIdx)}
                              className="flex items-center space-x-3 w-full p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition text-left group"
                            >
                              {completed ? (
                                <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0" />
                              ) : (
                                <Circle className="w-5 h-5 text-gray-400 group-hover:text-teal-600 flex-shrink-0" />
                              )}
                              <span
                                className={`text-sm flex-1 ${
                                  completed
                                    ? 'text-gray-500 line-through'
                                    : 'text-gray-700 group-hover:text-gray-900'
                                }`}
                              >
                                {checkpoint}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
