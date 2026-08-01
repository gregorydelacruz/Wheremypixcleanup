import { CategoryType } from './categoryMapping';
import { supabase } from '@/integrations/supabase/client';

export interface AICategory {
  category: CategoryType | "Unsorted";
  confidence: number;
  reasoning: string;
  alternatives: { category: CategoryType; confidence: number }[];
}

// Use AI to analyze and categorize images with reasoning
export async function getAICategoryAnalysis(description: string): Promise<AICategory> {
  try {
    console.log("Starting AI category analysis for:", description);
    
    const { data, error } = await supabase.functions.invoke('categorize-image', {
      body: {
        description,
        availableCategories: [
          "Animals", "Architecture", "Art", "Celebrations", "Culture", "Craft",
          "Design", "Education", "Entertainment", "Fashion", "Fitness", "Food",
          "Health", "Historical", "Holiday", "Landmark", "Marine Life", "Misc",
          "Nature", "Outdoor Activities", "People", "Performing Art", "Photography",
          "Plants", "Season", "Sports", "Technology", "Travel", "Vehicles",
          "Weather", "Work"
        ]
      }
    });

    console.log("AI categorization response:", { data, error });

    if (error) {
      console.error('AI categorization error:', error);
      throw new Error(`AI categorization failed: ${error.message}`);
    }

    if (!data?.category) {
      console.error('No category in AI response:', data);
      throw new Error('No category returned from AI analysis');
    }

    return {
      category: data.category as CategoryType,
      confidence: data.confidence || 0.8,
      reasoning: data.reasoning || 'AI-based categorization',
      alternatives: data.alternatives || []
    };
  } catch (error) {
    console.error("Error in AI category analysis:", error);
    
    // Fallback to rule-based categorization
    return {
      category: "Unsorted",
      confidence: 0.1,
      reasoning: 'AI analysis failed, using fallback',
      alternatives: []
    };
  }
}

// Batch categorize multiple descriptions efficiently
export async function batchCategorizeDescriptions(descriptions: string[]): Promise<AICategory[]> {
  try {
    console.log("Starting batch AI categorization for", descriptions.length, "descriptions");
    
    const { data, error } = await supabase.functions.invoke('batch-categorize', {
      body: {
        descriptions,
        availableCategories: [
          "Animals", "Architecture", "Art", "Celebrations", "Culture", "Craft",
          "Design", "Education", "Entertainment", "Fashion", "Fitness", "Food",
          "Health", "Historical", "Holiday", "Landmark", "Marine Life", "Misc",
          "Nature", "Outdoor Activities", "People", "Performing Art", "Photography",
          "Plants", "Season", "Sports", "Technology", "Travel", "Vehicles",
          "Weather", "Work"
        ]
      }
    });

    console.log("Batch AI categorization response:", { data, error });

    if (error) {
      console.error('Batch AI categorization error:', error);
      throw new Error(`Batch AI categorization failed: ${error.message}`);
    }

    if (!data?.categories || !Array.isArray(data.categories)) {
      console.error('Invalid batch categorization response:', data);
      throw new Error('Invalid response from batch AI analysis');
    }

    return data.categories.map((cat: any) => ({
      category: cat.category as CategoryType || "Unsorted",
      confidence: cat.confidence || 0.8,
      reasoning: cat.reasoning || 'AI-based categorization',
      alternatives: cat.alternatives || []
    }));
  } catch (error) {
    console.error("Error in batch AI categorization:", error);
    
    // Fallback to individual analysis
    const results: AICategory[] = [];
    for (const description of descriptions) {
      try {
        const result = await getAICategoryAnalysis(description);
        results.push(result);
      } catch (e) {
        results.push({
          category: "Unsorted",
          confidence: 0.1,
          reasoning: 'Batch analysis failed, individual analysis also failed',
          alternatives: []
        });
      }
    }
    return results;
  }
}