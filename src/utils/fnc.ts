
export const slugify = (text: string): string => {
    return text
      .toLowerCase() // Convert to lowercase
      .trim() // Remove extra spaces
      .replace(/[\s\W-]+/g, "-") // Replace spaces & special characters with "-"
      .replace(/^-+|-+$/g, ""); // Remove leading/trailing dashes
  };