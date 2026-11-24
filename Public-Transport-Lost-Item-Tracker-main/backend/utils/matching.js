/**
 * BackToYou — Smart Lost-and-Found Matching System
 * Explainable Rule-Based Algorithm
 *
 * Scoring Weights & Rules:
 * 1. Category Match (Weight: 40 points) - Mandatory baseline requirement.
 * 2. Transit Mode Match (Weight: 20 points) - Same transport system (Metro, Bus, Train, Station).
 * 3. Keyword / Brand / Color Overlap (Weight: Up to 30 points) - Matching distinguishing tokens.
 * 4. Route / Service Alignment (Weight: 15 points) - Corridors, carriage numbers, or lines.
 * 5. Date Proximity (Weight: Up to 10 points) - Incident occurred within reasonable time window.
 *
 * Minimum threshold to qualify as a candidate match: 50 points.
 * Maximum score ceiling: 98% (reserves certainty for official custodial verification).
 */

const STOP_WORDS = new Set([
  'the', 'and', 'with', 'from', 'near', 'that', 'this', 'have', 'were',
  'left', 'found', 'lost', 'about', 'some', 'seat', 'train', 'metro', 'bus',
  'item', 'items', 'line', 'station', 'stop', 'car', 'coach'
]);

function extractKeywords(text) {
  if (!text) return [];
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length >= 3 && !STOP_WORDS.has(word));
}

function calculateMatchScore(itemA, itemB) {
  // 1. Exclude comparing identical records or matching report against itself
  const idA = itemA._id ? itemA._id.toString() : itemA.customId;
  const idB = itemB._id ? itemB._id.toString() : itemB.customId;
  if (idA === idB) return null;

  // 2. Only compare opposite classifications (Lost against Found)
  if (itemA.type === itemB.type) return null;

  // 3. Exclude closed, archived, or already recovered items
  if (itemA.status === 'Recovered' || itemB.status === 'Recovered') return null;
  if (itemA.status === 'Archived' || itemB.status === 'Archived') return null;

  let score = 0;
  const reasons = [];

  // 4. Mandatory Category Baseline (+40 points)
  if (itemA.category && itemB.category && itemA.category.toLowerCase() === itemB.category.toLowerCase()) {
    score += 40;
    reasons.push(`Identical Category: ${itemA.category}`);
  } else {
    // Differing categories cannot form a valid match
    return null;
  }

  // 5. Transit Mode Match (+20 points)
  if (itemA.transitType && itemB.transitType && itemA.transitType.toLowerCase() === itemB.transitType.toLowerCase()) {
    score += 20;
    reasons.push(`Matching Transit Corridor (${itemA.transitType})`);
  }

  // 6. Descriptive Keyword, Brand & Color Overlap (Up to +30 points)
  const textA = `${itemA.title || ''} ${itemA.description || ''} ${itemA.color || ''} ${itemA.brand || ''} ${itemA.location || ''}`;
  const textB = `${itemB.title || ''} ${itemB.description || ''} ${itemB.color || ''} ${itemB.brand || ''} ${itemB.location || ''}`;

  const keywordsA = extractKeywords(textA);
  const keywordsB = new Set(extractKeywords(textB));

  const commonKeywords = [...new Set(keywordsA.filter(k => keywordsB.has(k)))];

  if (commonKeywords.length > 0) {
    const kwPoints = Math.min(30, commonKeywords.length * 10);
    score += kwPoints;
    reasons.push(`Matching traits & keywords: "${commonKeywords.slice(0, 3).join(', ')}"`);
  }

  // 7. Route / Line Proximity (+15 points)
  if (itemA.route && itemB.route) {
    const routeTokensA = extractKeywords(itemA.route);
    const routeBText = itemB.route.toLowerCase();
    const routeMatch = routeTokensA.some(token => routeBText.includes(token));
    if (routeMatch) {
      score += 15;
      reasons.push(`Overlapping line or vehicle service: ${itemA.route}`);
    }
  }

  // 8. Date Proximity (+5 to +10 points)
  if (itemA.date && itemB.date) {
    const dateA = new Date(itemA.date);
    const dateB = new Date(itemB.date);
    if (!isNaN(dateA.getTime()) && !isNaN(dateB.getTime())) {
      const diffDays = Math.abs((dateA - dateB) / (1000 * 60 * 60 * 24));
      if (diffDays <= 2) {
        score += 10;
        reasons.push(`Incident dates occurred within 48 hours`);
      } else if (diffDays <= 7) {
        score += 5;
        reasons.push(`Incident dates occurred within 7 days`);
      }
    }
  }

  // 9. Evaluate Threshold
  if (score >= 50) {
    return {
      score: Math.min(score, 98),
      reasons,
      matchedItem: itemB,
    };
  }

  return null;
}

function findMatchesForTarget(targetItem, candidateItems) {
  const matches = [];
  for (const candidate of candidateItems) {
    const result = calculateMatchScore(targetItem, candidate);
    if (result) {
      matches.push(result);
    }
  }
  return matches.sort((a, b) => b.score - a.score);
}

module.exports = {
  calculateMatchScore,
  findMatchesForTarget,
};
