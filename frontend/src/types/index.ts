export type TDashboardMetrics = {
  total_events: number;
  total_attendees: number;
  total_revenue: number;
  engagement_rate: number;
};

export type TEvent = {
  id: string;
  name: string;
  created_at: Date;
  scheduled_at: Date;
  user_id: string;
}
