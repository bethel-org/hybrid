import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getHybridWorkout,
  HYBRID_WORKOUT_QUERY_KEY,
  putHybridWorkout,
} from "../api";
import type { WorkoutSession } from "../mocks/workout";

export function useHybridWorkoutQuery() {
  return useQuery({
    queryKey: HYBRID_WORKOUT_QUERY_KEY,
    queryFn: getHybridWorkout,
  });
}

export function useUpdateHybridWorkoutMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: WorkoutSession) => putHybridWorkout(body),
    onSuccess: (next) => {
      queryClient.setQueryData(HYBRID_WORKOUT_QUERY_KEY, next);
    },
  });
}
