export const DEFAULT_AGE_ID = 'ages_8_10';

export function pickAge(contentByAge, ageGroupId) {
  if (contentByAge && contentByAge[ageGroupId]) {
    return contentByAge[ageGroupId];
  }
  return contentByAge[DEFAULT_AGE_ID];
}

export function resolveAgeId(ageGroup) {
  if (!ageGroup) return DEFAULT_AGE_ID;
  if (typeof ageGroup === 'string') return ageGroup;
  return ageGroup.id || DEFAULT_AGE_ID;
}
