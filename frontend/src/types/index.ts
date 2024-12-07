export type TDashboardMetrics = {
  total_events: number;
  total_attendees: number;
  total_revenue: number;
  engagement_rate: number;
};

export type TEvent = {
  id: string;
  event_name: string;
  location: string;
  created_at: Date;
  scheduled_at: Date;
  user_id: string;
}
