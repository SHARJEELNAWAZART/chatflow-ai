export const planConfig = {
  free: { name: 'Free', maxChatbots: 1, monthlyMessages: 100 },
  starter: { name: 'Starter', maxChatbots: 3, monthlyMessages: 1000 },
  pro: { name: 'Pro', maxChatbots: 10, monthlyMessages: 5000 },
} as const;

export type PlanKey = keyof typeof planConfig;

export function getPlanByKey(plan: string): (typeof planConfig)[PlanKey] {
  const key = (plan || 'free').toLowerCase();
  return planConfig[key as PlanKey] || planConfig.free;
}
