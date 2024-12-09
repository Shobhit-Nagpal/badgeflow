import { TDashboardMetrics, TEvent, TEventAttendee } from "@/types";
import { useAuth } from "@clerk/clerk-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { BASE_URL } from "@/utils/api";
import { queryClient } from "@/lib/tanstack-query";
import { TEventSchema } from "@/schemas/event";
import { TEventAttendeeSchema } from "@/schemas/event-attendee";

export const useGetDashboardMetrics = () => {
  const { getToken } = useAuth();

  return useQuery<TDashboardMetrics>({
    queryKey: ["metrics"],
    queryFn: async () => {
      try {
        const token = await getToken();
        const res = await fetch(`${BASE_URL}/dashboard`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        return res.json();
      } catch (error) {
        throw error;
      }
    },
  });
};

export const useGetEvents = () => {
  const { getToken } = useAuth();

  return useQuery<TEvent[]>({
    queryKey: ["events"],
    queryFn: async () => {
      try {
        const token = await getToken();
        const res = await fetch(`${BASE_URL}/events`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        return res.json();
      } catch (error) {
        throw error;
      }
    },
  });
};

export const useCreateEvent = () => {
  const { getToken } = useAuth();

  return useMutation({
    mutationKey: ["newEvent"],
    mutationFn: async (newEvent: TEventSchema) => {
      const event = {
        event_name: newEvent.name,
        scheduled_at: newEvent.scheduled_at.toISOString(),
        location: newEvent.location,
      };

      await fetch(`${BASE_URL}/events`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${await getToken()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
};

export const useGetAttendees = (eventId: string) => {
  const { getToken } = useAuth();

  return useQuery<TEventAttendee[]>({
    queryKey: ["eventAttendees"],
    queryFn: async () => {
      try {
        const token = await getToken();
        const res = await fetch(`${BASE_URL}/events/${eventId}/attendees`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        return res.json();
      } catch (error) {
        throw error;
      }
    },
  });
};

export const useCreateEventAttendee = (eventId: string) => {
  const { getToken } = useAuth();

  return useMutation({
    mutationKey: ["eventAttendees"],
    mutationFn: async (newEventAttendee: TEventAttendeeSchema) => {
      const event = {
        event_id: eventId,
        name: newEventAttendee.name,
        email: newEventAttendee.email,
      };

      await fetch(`${BASE_URL}/events/attendees`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${await getToken()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["eventAttendees"] });
    },
  });
};
