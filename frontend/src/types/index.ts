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
};

export type TEventAttendee = {
  id: string;
  created_at: Date;
  updated_at: Date;
  event_id: string;
  attendee_id: string;
  status: string;
  name: string;
  email: string;
};

export type TTicket = {
  id: string;
  created_at: Date;
  updated_at: Date;
  name: string;
  description?: {
    String: string;
    Valid: boolean;
  };
  price: string;
  quantity: number;
  on_sale: boolean;
  event_id: string;
};
