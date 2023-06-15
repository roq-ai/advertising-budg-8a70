const mapping: Record<string, string> = {
  advertisers: 'advertiser',
  'budget-allocations': 'budget_allocation',
  'business-constraints': 'business_constraint',
  'past-performances': 'past_performance',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
