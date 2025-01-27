export const calculateUpgradeCost = (basePrice: number, multiplier: number, level: number) => {
  return Math.ceil(basePrice * Math.pow(multiplier, level - 1))
}

export const calculateLevel = (effectValue: number, effectMultiplier: number) => {
  return Math.ceil(Math.log(effectValue) / Math.log(effectMultiplier))
}
