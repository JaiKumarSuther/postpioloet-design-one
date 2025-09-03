import { useQuery, useMutation, keepPreviousData } from "@tanstack/react-query";
import {
  getHealth,
  getTrendingTopics,
  pickTrendingTopic,
  generateFromUrl,
  generateFromTopic,
  generateGeneric,
  publishPost,
  type TrendingTopicsResponse,
  type GenerateFromUrlResponse,
  type GenerateFromTopicResponse,
  type GenerateGenericResponse,
  type PublishResponse,
} from "@/api/blog";

export function useHealth() {
  return useQuery({
    queryKey: ["health"],
    queryFn: getHealth,
    staleTime: 60_000,
  });
}

export function useTrendingTopics(params: { region?: string; field?: string; limit?: number }) {
  return useQuery<TrendingTopicsResponse>({
    queryKey: ["trending-topics", params],
    queryFn: () => getTrendingTopics(params),
    placeholderData: keepPreviousData,
  });
}

export function usePickTrendingTopic() {
  return useMutation({
    mutationFn: pickTrendingTopic,
  });
}

export function useGenerateFromUrl() {
  return useMutation<GenerateFromUrlResponse, unknown, Parameters<typeof generateFromUrl>[0]>({
    mutationFn: generateFromUrl,
  });
}

export function useGenerateFromTopic() {
  return useMutation<GenerateFromTopicResponse, unknown, Parameters<typeof generateFromTopic>[0]>({
    mutationFn: generateFromTopic,
  });
}

export function useGenerateGeneric() {
  return useMutation<GenerateGenericResponse, unknown, Parameters<typeof generateGeneric>[0]>({
    mutationFn: generateGeneric,
  });
}

export function usePublishPost() {
  return useMutation<PublishResponse, unknown, Parameters<typeof publishPost>[0]>({
    mutationFn: publishPost,
  });
}


