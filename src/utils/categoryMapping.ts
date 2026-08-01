
// Define main category types
export type CategoryType = 
  | "Animals" 
  | "Architecture" 
  | "Art" 
  | "Celebrations" 
  | "Culture" 
  | "Craft"
  | "Design" 
  | "Education" 
  | "Entertainment" 
  | "Fashion"
  | "Fitness"
  | "Food" 
  | "Health" 
  | "Historical" 
  | "Holiday" 
  | "Landmark"
  | "Marine Life"
  | "Misc" 
  | "Nature" 
  | "Outdoor Activities"
  | "People"
  | "Performing Art" 
  | "Photography"
  | "Plants" 
  | "Season" 
  | "Sports" 
  | "Technology" 
  | "Travel" 
  | "Vehicles" 
  | "Weather" 
  | "Work";

// Organized by category for better maintainability
export const categoryGroups: Record<CategoryType, string[]> = {
  Animals: [
    "ant", "bee", "bird", "butterfly", "cat", "chicken", "cow", "dog", 
    "dolphin", "elephant", "fish", "horse", "insect", "lion", "marine life", 
    "shark", "wild animal"
  ],
  Architecture: ["bridge", "house", "skyscraper"],
  Art: ["artwork", "gallery", "mural"],
  Celebrations: ["anniversary", "birthday", "graduation", "wedding"],
  Culture: ["festival", "food", "local tradition"],
  Craft: ["diy project", "handmade item"],
  Design: ["architecture", "home decor", "office", "restaurant"],
  Education: [
    "book", "campus", "classroom", "conference", "drawing", "experiment", 
    "lab", "librarie", "note", "painting", "research", "sculpting", 
    "seminar", "study session", "training"
  ],
  Entertainment: [
    "fair", "game", "live performance", "local event", "music festival", 
    "parade"
  ],
  Fashion: ["fashion"],
  Fitness: ["gym workout", "running", "yoga"],
  Food: [
    "breakfast", "cake", "chinese", "cocktail", "coffee", "dinner", 
    "healthy meal", "ice cream", "indian", "ingredient", "italian", 
    "kitchen scene", "lunch", "pastrie", "recipe", "smoothie", "tea"
  ],
  Health: [
    "doctor", "gym", "hospital", "meditation", "relaxation", "skincare", 
    "spa", "supplement", "therapy", "treatment", "wellness routine"
  ],
  Historical: ["castle", "ruin", "temple"],
  Holiday: [
    "carnival", "chinese new year", "christmas", "diwali", "easter", 
    "halloween", "independence day", "oktoberfest", "thanksgiving", 
    "valentine's day"
  ],
  Landmark: ["eiffel tower", "statue of liberty", "taj mahal"],
  "Marine Life": ["coral reef", "shark"],
  Misc: [
    "backup", "color", "funny image", "internet culture", "motivational image", 
    "old photo", "pattern", "quote", "texture", "unclassified", "unique photo"
  ],
  Nature: ["beach", "desert", "forest", "mountain", "sunrise", "sunset", "waterfall"],
  "Outdoor Activities": ["camping", "hiking", "road trip"],
  People: [
    "candid", "candid shot", "event", "family", "family gathering", 
    "group", "group photo", "headshot", "individual portrait", "outing", 
    "professional headshot"
  ],
  "Performing Art": ["dance", "music", "theater"],
  Photography: ["nature photography", "portrait", "street photography"],
  Plants: ["flower", "garden", "plant", "tree"],
  Season: ["autumn", "spring", "summer", "winter"],
  Sports: [
    "baseball", "basketball", "cycling", "golf", "marathon", "race", 
    "skiing", "skier", "soccer", "swimming", "tennis", "tournament"
  ],
  Technology: [
    "ai", "app", "camera", "drone", "laptop", "robot", "smart home device", 
    "smartphone", "speaker", "tv", "website"
  ],
  Travel: ["city", "country", "landmark", "map", "postcard", "ticket"],
  Vehicles: [
    "airplane", "bicycle", "boat", "canoe", "car", "helicopters", 
    "locomotive", "motorcycle", "sailboat", "subway", "train", "tram", "yacht"
  ],
  Weather: ["cloud", "fog", "lightning", "rain", "snow", "storm"],
  Work: ["branding", "coworker", "design", "home office", "meeting", "presentation", "product", "prototype", "startup", "virtual meeting"]
};

// Generate the flattened mapping for lookups
export const categoryMapping: Record<string, CategoryType> = Object.entries(categoryGroups).reduce(
  (acc, [category, keywords]) => {
    keywords.forEach(keyword => {
      acc[keyword] = category as CategoryType;
    });
    return acc;
  }, 
  {} as Record<string, CategoryType>
);

// Utility function to get category for a description
export function getCategoryForDescription(description: string): CategoryType | "Unsorted" {
  const descriptionLower = description.toLowerCase();
  
  // Check each keyword in the mapping
  for (const [keyword, category] of Object.entries(categoryMapping)) {
    if (descriptionLower.includes(keyword.toLowerCase())) {
      return category;
    }
  }
  
  return "Unsorted";
}
