
import React from 'react';
import { SparkIdea } from '../types';
import { Lightbulb, Target, ShieldAlert, Rocket, Image as ImageIcon, CheckCircle2 } from 'lucide-react';

interface IdeaCardProps {
  idea: SparkIdea;
  onRefine: (feedback: string) => void;
  isRefining: boolean;
}

export const IdeaCard: React.FC<IdeaCardProps> = ({ idea, onRefine, isRefining }) => {
  const [feedback, setFeedback] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.trim()) return;
    onRefine(feedback);
    setFeedback('');
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header & Score */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold gradient-text">{idea.title}</h2>
          <p className="text-slate-400 mt-2">{new Date(idea.createdAt).toLocaleDateString('vi-VN')}</p>
        </div>
        <div className="flex items-center gap-3 glass-card px-6 py-3 rounded-2xl border-purple-500/30">
          <span className="text-slate-400 text-sm font-medium uppercase tracking-wider">Innovation Score</span>
          <span className="text-4xl font-bold text-purple-400">{idea.innovationScore}%</span>
        </div>
      </div>

      {/* Hero Visual */}
      {idea.imageUrl ? (
        <div className="relative group overflow-hidden rounded-3xl border border-white/10 aspect-video shadow-2xl">
          <img src={idea.imageUrl} alt={idea.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 flex items-center gap-2">
            <div className="p-2 bg-purple-500/20 backdrop-blur-md rounded-lg border border-purple-500/40">
              <ImageIcon className="w-5 h-5 text-purple-300" />
            </div>
            <span className="text-sm text-slate-200 font-medium">Conceptual Visual (AI Generated)</span>
          </div>
        </div>
      ) : (
        <div className="aspect-video glass-card rounded-3xl flex flex-col items-center justify-center border-dashed border-2 border-slate-700">
          <ImageIcon className="w-12 h-12 text-slate-600 mb-4" />
          <p className="text-slate-500">Đang khởi tạo hình ảnh minh họa...</p>
        </div>
      )}

      {/* Summary */}
      <div className="glass-card p-8 rounded-3xl border-slate-700/50">
        <div className="flex items-center gap-3 mb-4">
          <Lightbulb className="w-6 h-6 text-yellow-400" />
          <h3 className="text-xl font-semibold">Tóm tắt Sáng kiến</h3>
        </div>
        <p className="text-slate-300 leading-relaxed text-lg">
          {idea.summary}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Benefits */}
        <div className="glass-card p-6 rounded-3xl border-emerald-500/20 bg-emerald-500/5">
          <div className="flex items-center gap-3 mb-6">
            <Target className="w-6 h-6 text-emerald-400" />
            <h3 className="text-xl font-semibold text-emerald-500">Lợi ích mang lại</h3>
          </div>
          <ul className="space-y-4">
            {idea.benefits.map((benefit, i) => (
              <li key={i} className="flex items-start gap-3 text-slate-300">
                <CheckCircle2 className="w-5 h-5 text-emerald-500/60 mt-0.5 shrink-0" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Risks */}
        <div className="glass-card p-6 rounded-3xl border-rose-500/20 bg-rose-500/5">
          <div className="flex items-center gap-3 mb-6">
            <ShieldAlert className="w-6 h-6 text-rose-400" />
            <h3 className="text-xl font-semibold text-rose-500">Rủi ro cần lưu ý</h3>
          </div>
          <ul className="space-y-4">
            {idea.risks.map((risk, i) => (
              <li key={i} className="flex items-start gap-3 text-slate-300">
                <div className="w-1.5 h-1.5 bg-rose-500 rounded-full mt-2.5 shrink-0" />
                <span>{risk}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Implementation */}
      <div className="glass-card p-8 rounded-3xl border-blue-500/20">
        <div className="flex items-center gap-3 mb-8">
          <Rocket className="w-6 h-6 text-blue-400" />
          <h3 className="text-xl font-semibold text-blue-400">Lộ trình triển khai</h3>
        </div>
        <div className="relative border-l-2 border-slate-700 ml-3 space-y-10">
          {idea.implementationSteps.map((step, i) => (
            <div key={i} className="relative pl-10">
              <div className="absolute -left-[11px] top-0 w-5 h-5 rounded-full bg-slate-900 border-2 border-blue-500" />
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-bold uppercase text-blue-500 bg-blue-500/10 px-2 py-0.5 rounded">Giai đoạn {i + 1}</span>
              </div>
              <p className="text-slate-300 text-lg leading-snug">{step}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Feedback Section */}
      <div className="mt-12 p-8 glass-card rounded-3xl border-purple-500/20">
        <h4 className="text-lg font-semibold mb-4 text-purple-300">Bạn muốn cải tiến điều gì ở sáng kiến này?</h4>
        <form onSubmit={handleSubmit} className="flex gap-3">
          <input
            type="text"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Ví dụ: 'Thêm yếu tố bền vững' hoặc 'Giảm chi phí vận hành'..."
            className="flex-1 bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 text-slate-200"
            disabled={isRefining}
          />
          <button
            type="submit"
            disabled={isRefining || !feedback.trim()}
            className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl font-medium transition-all shadow-lg shadow-purple-900/20"
          >
            {isRefining ? 'Đang điều chỉnh...' : 'Cập nhật'}
          </button>
        </form>
      </div>
    </div>
  );
};
