import { NextRequest, NextResponse } from "next/server";

function localEnhanceQuery(query: string, categories: string[]) {
  const q = query.toLowerCase();
  
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
  
  return enhancedQuery;
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
      return null; // Category already in query
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
    const { query, categories = [] } = await request.json();
    
    if (!query) {
      return NextResponse.json(
        { error: "Query is required" },
        { status: 400 }
      );
    }
    
    const enhancedQuery = localEnhanceQuery(query, categories);
    
    return NextResponse.json({ enhancedQuery });
  } catch (error) {
    console.error("Error processing search query:", error);
    return NextResponse.json(
      { error: "Error processing search query" },
      { status: 500 }
    );
  }
}
