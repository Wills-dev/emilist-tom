import { NextRequest, NextResponse } from "next/server";

function localEnhanceQuery(query: string, categories: string[], isEmiCommand: boolean = false) {
  const q = query.toLowerCase();
  
  const emiCommandRegex = /(?:emi|emmy|emmi)(?:,)?\s+(?:look|search|find|get)\s+(?:for|me)?\s+(?:a|an)?\s+(.+)/i;
  const matches = q.match(emiCommandRegex);
  
  if (isEmiCommand || matches) {
    const serviceType = matches ? matches[1].trim() : q;
    
    const detectedCategory = extractServiceType(serviceType) || detectServiceCategory(serviceType, categories);
    
    return {
      enhancedQuery: serviceType,
      isEmiCommand: true,
      detectedCategory
    };
  }
  
  const fillerWords = [
    'um', 'uh', 'like', 'so', 'basically', 'actually', 
    'you know', 'i need', 'i want', 'please', 'can you', 
    'looking for', 'searching for', 'find me', 
    'i need to find', 'i would like'
  ];
  
  let enhancedQuery = q;
  
  fillerWords.forEach(word => {
    enhancedQuery = enhancedQuery.replace(new RegExp(`\\b${word}\\b`, 'g'), '');
  });
  
  enhancedQuery = enhancedQuery.replace(/\s+/g, ' ').trim();
  
  const detectedCategory = detectServiceCategory(enhancedQuery, categories);
  if (detectedCategory && !enhancedQuery.includes(detectedCategory)) {
    enhancedQuery = `${detectedCategory} ${enhancedQuery}`;
  }
  
  return {
    enhancedQuery,
    isEmiCommand,
    detectedCategory: detectedCategory || extractServiceType(enhancedQuery)
  };
}

function extractServiceType(query: string): string | null {
  const commonServices = ['mechanic', 'plumber', 'electrician', 'carpenter', 'painter', 'gardener', 'cleaner'];
  
  for (const service of commonServices) {
    if (query.toLowerCase().includes(service)) {
      return service;
    }
  }
  
  return null;
}

function detectServiceCategory(query: string, categories: string[]) {
  const categoryKeywords: Record<string, string[]> = {
    'plumber': ['pipe', 'sink', 'toilet', 'leak', 'water', 'faucet', 'drain', 'bathroom'],
    'electrician': ['power', 'light', 'electric', 'outlet', 'wiring', 'circuit', 'breaker'],
    'mechanic': ['car', 'vehicle', 'engine', 'brake', 'tire', 'auto', 'repair', 'oil'],
    'carpenter': ['wood', 'furniture', 'cabinet', 'chair', 'table', 'door', 'shelf'],
    'painter': ['paint', 'wall', 'ceiling', 'color', 'room', 'house painting'],
    'hvac': ['air conditioner', 'heating', 'cooling', 'ac', 'furnace', 'thermostat', 'ventilation'],
    'cleaner': ['clean', 'house', 'maid', 'dusting', 'mopping', 'vacuum', 'janitorial'],
    'gardener': ['garden', 'plant', 'lawn', 'landscape', 'tree', 'mow', 'yard', 'trim'],
    'roofer': ['roof', 'leak', 'shingle', 'ceiling', 'gutter'],
    'locksmith': ['lock', 'key', 'door', 'security', 'unlock', 'locked out']
  };
  
  for (const category of categories) {
    if (query.includes(category)) {
      return category; // Return the category if it's already in the query
    }
  }
  
  for (const [category, keywords] of Object.entries(categoryKeywords)) {
    for (const keyword of keywords) {
      if (query.includes(keyword)) {
        return category;
      }
    }
  }
  
  return null;
}

export async function POST(request: NextRequest) {
  try {
    const { query, categories = [], isEmiCommand = false } = await request.json();
    
    if (!query) {
      return NextResponse.json(
        { error: "Query is required" },
        { status: 400 }
      );
    }
    
    const result = localEnhanceQuery(query, categories, isEmiCommand);
    
    return NextResponse.json({
      enhancedQuery: result.enhancedQuery,
      isEmiCommand: result.isEmiCommand,
      detectedCategory: result.detectedCategory
    });
  } catch (error) {
    console.error("Error processing search query:", error);
    return NextResponse.json(
      { error: "Error processing search query" },
      { status: 500 }
    );
  }
}
