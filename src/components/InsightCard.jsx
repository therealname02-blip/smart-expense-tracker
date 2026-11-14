import React from 'react';
import { AlertCircle, CheckCircle2, Info, AlertTriangle } from 'lucide-react';

export default function InsightCard({ insight }) {
  if (!insight) return null;

  const typeConfig = {
    danger: {
      bg: 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900/40 text-red-900 dark:text-red-200',
      icon: AlertCircle,
      iconColor: 'text-red-600 dark:text-red-400'
    },
    warning: {
      bg: 'bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/40 text-amber-900 dark:text-amber-200',
      icon: AlertTriangle,
      iconColor: 'text-amber-600 dark:text-amber-400'
    },
    success: {
      bg: 'bg-nectar-wasabi dark:bg-emerald-950/20 border-nectar-mint dark:border-emerald-900/40 text-nectar-forest dark:text-nectar-mint',
      icon: CheckCircle2,
      iconColor: 'text-nectar-emerald dark:text-nectar-leaf'
    },
    info: {
      bg: 'bg-nectar-droplet dark:bg-sky-950/20 border-blue-200 dark:border-sky-900/40 text-blue-900 dark:text-sky-200',
      icon: Info,
      iconColor: 'text-blue-600 dark:text-sky-400'
    }
  };

  const config = typeConfig[insight.type] || typeConfig.info;
  const Icon = config.icon;

  return (
    <div className={`p-4 rounded-2xl border ${config.bg} flex items-start gap-3.5 transition-all`}>
      <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${config.iconColor}`} />
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider mb-1">
          {insight.title}
        </h4>
        <p className="text-xs opacity-90 leading-relaxed font-medium">
          {insight.description}
        </p>
      </div>
    </div>
  );
}
