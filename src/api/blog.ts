import { fetchJson } from "./client";

// Response shapes based on Postman examples
export interface HealthResponse {
  status: string;
  message?: string;
}

export interface TrendingTopicsResponse {
  success: boolean;
  topics: string[];
  region?: string;
  field?: string;
}

export interface PickTrendingTopicResponse {
  success: boolean;
  data: {
    topic: string;
    keywords: string[];
  };
}

export interface BlogData {
  title: string;
  content: string; // HTML
  meta_description?: string;
  url_slug?: string;
  image_url?: string;
  promotion_checklist?: string;
  published?: boolean;
}

export interface GenerateFromUrlResponse {
  success: boolean;
  data: BlogData;
  trend_data?: {
    topic: string;
    keywords: string[];
  };
}

export interface GenerateFromTopicResponse extends GenerateFromUrlResponse {}

export interface GenerateGenericResponse {
  success: boolean;
  data: BlogData;
}

export interface PublishResponse {
  success: boolean;
  message?: string;
}

export type RegionParam = string | undefined;
export type FieldParam = string | undefined;

export async function getHealth() {
  return fetchJson<HealthResponse>({ path: "/health" });
}

export async function getTrendingTopics(params: { region?: string; field?: string; limit?: number }) {
  return fetchJson<TrendingTopicsResponse>({ path: "/api/trending-topics", query: params });
}

export async function pickTrendingTopic(body: { region?: string; field?: string }) {
  return fetchJson<PickTrendingTopicResponse>({ path: "/api/pick-trending-topic", method: "POST", body });
}

export async function generateFromUrl(body: { url: string; region?: string; field?: string; auto_publish?: boolean }) {
  return fetchJson<GenerateFromUrlResponse>({ path: "/api/generate-from-url", method: "POST", body });
}

export async function generateFromTopic(body: { topic: string; region?: string; field?: string; auto_publish?: boolean }) {
  return fetchJson<GenerateFromTopicResponse>({ path: "/api/generate-from-topic", method: "POST", body });
}

export async function generateGeneric(body: { content: string; is_url?: boolean; keywords?: string[]; field?: string; auto_publish?: boolean }) {
  return fetchJson<GenerateGenericResponse>({ path: "/api/generate-blog", method: "POST", body });
}

export async function publishPost(body: BlogData) {
  return fetchJson<PublishResponse>({ path: "/api/publish-post", method: "POST", body });
}


