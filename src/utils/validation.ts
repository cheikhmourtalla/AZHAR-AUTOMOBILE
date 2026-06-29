/** Valide un numéro de téléphone sénégalais (7x xxx xx xx ou +221...) */
export function isValidPhone(phone: string): boolean {
  const cleaned = phone.replace(/\s/g, "");
  return /^(\+221|00221)?[0-9]{9}$/.test(cleaned);
}

/** Retourne aujourd'hui au format YYYY-MM-DD pour l'attribut min des inputs date */
export function todayString(): string {
  return new Date().toISOString().split("T")[0];
}

/** Calcule le nombre de jours entre deux dates (minimum 1) */
export function calcDays(start: string, end: string): number {
  if (!start || !end) return 0;
  const diff = new Date(end).getTime() - new Date(start).getTime();
  if (diff < 0) return 0;
  return Math.ceil(diff / (1000 * 60 * 60 * 24)) || 1;
}

/** Formate un nombre en FCFA */
export function formatFCFA(amount: number): string {
  return `${amount.toLocaleString("fr-FR")} FCFA`;
}