import { CategoryType, categoryMapping, getCategoryForDescription } from './categoryMapping';

// Enhanced category detection with multiple strategies
export interface CategoryMatch {
  category: CategoryType | "Unsorted";
  confidence: number;
  method: 'exact' | 'fuzzy' | 'semantic' | 'fallback';
  matchedKeywords: string[];
}

// Semantic category groups for better matching
const semanticGroups: Record<string, CategoryType> = {
  // Animals & creatures
  'animal|creature|wildlife|pet|mammal|bird|fish|insect|reptile': 'Animals',
  
  // Architecture & buildings
  'building|house|structure|architecture|construction|tower|bridge|church|temple': 'Architecture',
  
  // Art & creative
  'art|painting|drawing|sculpture|mural|graffiti|artwork|creative|artistic': 'Art',
  
  // Food & cooking
  'food|meal|cooking|eating|kitchen|restaurant|drink|beverage|recipe|ingredient': 'Food',
  
  // Nature & outdoors
  'nature|landscape|forest|mountain|tree|flower|plant|garden|outdoor|natural': 'Nature',
  
  // People & portraits
  'person|people|portrait|face|human|man|woman|child|group|family|crowd': 'People',
  
  // Sports & fitness
  'sport|game|athlete|playing|running|swimming|fitness|exercise|competition|team': 'Sports',
  
  // Technology & devices
  'computer|phone|technology|device|electronic|digital|screen|tech|gadget': 'Technology',
  
  // Transportation
  'car|vehicle|transportation|driving|road|street|traffic|bike|motorcycle|bus': 'Vehicles',
  
  // Weather & sky
  'weather|sky|cloud|rain|snow|storm|sunshine|sunset|sunrise|wind': 'Weather'
};

// Action-based categories
const actionPatterns: Record<string, CategoryType> = {
  'learning|studying|reading|teaching|education': 'Education',
  'celebrating|party|festival|ceremony|wedding|birthday': 'Celebrations',
  'working|office|meeting|business|professional|workplace': 'Work',
  'vacation|travel|tourism|visiting|exploring|journey': 'Travel',
  'performing|dancing|singing|music|concert|theater|show': 'Performing Art',
  'exercising|workout|training|fitness|gym|yoga|running': 'Fitness',
  'cooking|baking|preparing|kitchen|chef|restaurant': 'Food'
};

// Context-based patterns
const contextPatterns: Record<string, CategoryType> = {
  'indoor|inside|interior|room|home|house': 'Design',
  'outdoor|outside|exterior|park|street|nature': 'Outdoor Activities',
  'historical|ancient|old|vintage|classic|traditional': 'Historical',
  'modern|contemporary|new|recent|current|today': 'Design',
  'seasonal|spring|summer|autumn|winter|holiday': 'Season'
};

export function getEnhancedCategory(description: string): CategoryMatch {
  const descriptionLower = description.toLowerCase();
  const words = descriptionLower.split(/\s+/);
  
  // Strategy 1: Exact keyword matching (highest confidence)
  const exactMatch = getCategoryForDescription(description);
  if (exactMatch !== "Unsorted") {
    const matchedKeywords = Object.keys(categoryMapping).filter(keyword => 
      descriptionLower.includes(keyword.toLowerCase())
    );
    return {
      category: exactMatch,
      confidence: 0.9,
      method: 'exact',
      matchedKeywords
    };
  }

  // Strategy 2: Semantic pattern matching
  for (const [pattern, category] of Object.entries(semanticGroups)) {
    const regex = new RegExp(`\\b(${pattern})\\b`, 'i');
    if (regex.test(description)) {
      const matches = description.match(regex) || [];
      return {
        category,
        confidence: 0.8,
        method: 'semantic',
        matchedKeywords: matches
      };
    }
  }

  // Strategy 3: Action-based pattern matching
  for (const [pattern, category] of Object.entries(actionPatterns)) {
    const regex = new RegExp(`\\b(${pattern})\\b`, 'i');
    if (regex.test(description)) {
      const matches = description.match(regex) || [];
      return {
        category,
        confidence: 0.7,
        method: 'semantic',
        matchedKeywords: matches
      };
    }
  }

  // Strategy 4: Context-based pattern matching
  for (const [pattern, category] of Object.entries(contextPatterns)) {
    const regex = new RegExp(`\\b(${pattern})\\b`, 'i');
    if (regex.test(description)) {
      const matches = description.match(regex) || [];
      return {
        category,
        confidence: 0.6,
        method: 'semantic',
        matchedKeywords: matches
      };
    }
  }

  // Strategy 5: Fuzzy matching for plurals and variations
  const fuzzyMatch = getFuzzyMatch(descriptionLower, words);
  if (fuzzyMatch) {
    return fuzzyMatch;
  }

  // Strategy 6: Fallback based on common words
  const fallbackCategory = getFallbackCategory(descriptionLower);
  return {
    category: fallbackCategory,
    confidence: 0.3,
    method: 'fallback',
    matchedKeywords: []
  };
}

function getFuzzyMatch(description: string, words: string[]): CategoryMatch | null {
  // Check for plural forms and common variations
  const variations: Record<string, string[]> = {
    'cat': ['cats', 'kitten', 'kittens', 'feline'],
    'dog': ['dogs', 'puppy', 'puppies', 'canine'],
    'flower': ['flowers', 'bloom', 'blooms', 'blossom', 'floral'],
    'car': ['cars', 'automobile', 'vehicle', 'automotive'],
    'house': ['houses', 'home', 'homes', 'residence'],
    'food': ['foods', 'meal', 'meals', 'dish', 'dishes'],
    'person': ['people', 'individual', 'human', 'humans'],
    'tree': ['trees', 'forest', 'woods', 'woodland']
  };

  for (const [baseWord, variants] of Object.entries(variations)) {
    for (const variant of variants) {
      if (words.some(word => word.includes(variant)) || description.includes(variant)) {
        const category = getCategoryForDescription(baseWord);
        if (category !== "Unsorted") {
          return {
            category,
            confidence: 0.6,
            method: 'fuzzy',
            matchedKeywords: [variant]
          };
        }
      }
    }
  }

  return null;
}

function getFallbackCategory(description: string): CategoryType | "Unsorted" {
  // If nothing else matches, try to categorize based on general terms
  if (/photo|picture|image|shot/.test(description)) {
    return "Photography";
  }
  if (/color|colorful|bright|dark|light/.test(description)) {
    return "Misc";
  }
  if (/close.up|macro|detail/.test(description)) {
    return "Photography";
  }
  if (/background|foreground|scene/.test(description)) {
    return "Misc";
  }
  
  return "Unsorted";
}

// Get multiple category suggestions with confidence scores
export function getCategorySuggestions(description: string): CategoryMatch[] {
  const suggestions: CategoryMatch[] = [];
  const primary = getEnhancedCategory(description);
  suggestions.push(primary);

  // Add alternative matches if confidence is low
  if (primary.confidence < 0.8) {
    const descriptionLower = description.toLowerCase();
    
    // Check for secondary patterns
    for (const [pattern, category] of Object.entries(semanticGroups)) {
      if (category !== primary.category) {
        const regex = new RegExp(`\\b(${pattern})\\b`, 'i');
        if (regex.test(description)) {
          const matches = description.match(regex) || [];
          suggestions.push({
            category,
            confidence: 0.5,
            method: 'semantic',
            matchedKeywords: matches
          });
        }
      }
    }
  }

  return suggestions.slice(0, 3); // Return top 3 suggestions
}

// For backward compatibility
export function getSmartCategory(description: string): CategoryType | "Unsorted" {
  return getEnhancedCategory(description).category;
}