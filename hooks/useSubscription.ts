import { useState } from 'react';
import { PlanId } from '../constants/plans';

export const useSubscription = () => {
  const [currentPlan, setCurrentPlan] = useState<PlanId>('free');
  const [loading, setLoading] = useState(false);

  const subscribe = async (planId: PlanId) => {
    setLoading(true);
    // Mock subscription
    setCurrentPlan(planId);
    setLoading(false);
  };

  const isPro = currentPlan === 'pro';
  const isLite = currentPlan === 'lite';
  const hasAudio = currentPlan !== 'free';

  return { currentPlan, loading, subscribe, isPro, isLite, hasAudio };
};
