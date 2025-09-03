// Maps UI labels to API-expected values (region and field/category)

export function mapRegionToApi(region?: string): string | undefined {
  if (!region) return undefined;
  const normalized = region.toLowerCase();
  if (normalized.includes("north america")) return "us";
  if (normalized.includes("europe")) return "eu";
  if (normalized.includes("asia")) return "apac";
  if (normalized.includes("latin")) return "latam";
  if (normalized.includes("middle east") || normalized.includes("africa")) return "mea";
  if (normalized.includes("global")) return "global";
  return region;
}

export function mapCategoryToField(category?: string): string | undefined {
  if (!category) return undefined;
  const normalized = category.toLowerCase();
  if (normalized.includes("technology")) return "tech";
  if (normalized.includes("business")) return "business";
  if (normalized.includes("health")) return "health";
  if (normalized.includes("finance")) return "finance";
  if (normalized.includes("education")) return "education";
  if (normalized.includes("entertainment")) return "entertainment";
  if (normalized.includes("travel")) return "travel";
  if (normalized.includes("food") || normalized.includes("lifestyle")) return "lifestyle";
  if (normalized.includes("sports")) return "sports";
  if (normalized.includes("politics")) return "politics";
  if (normalized.includes("e-commerce") || normalized.includes("ecommerce")) return "ecommerce";
  if (normalized.includes("marketing")) return "marketing";
  return category;
}


