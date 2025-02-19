// export const slugify = (text: string): string => {
//     // return text
//     //   .toLowerCase() // Convert to lowercase
//     //   .trim() // Remove extra spaces
//     //   .replace(/[\s\W-]+/g, "-") // Replace spaces & special characters with "-"
//     //   .replace(/^-+|-+$/g, ""); // Remove leading/trailing dashes
    
//   };


// export function slugify(title: string) {
//   return slugifyFnc(title, {
//     replacement: "-", // Use hyphens instead of spaces
//     remove: /[*+~.()'"!:@]/g, // Remove special characters
//     lower: true, // Convert to lowercase
//     strict: true, // Remove symbols
//     locale: "bn", // Set locale to Bangla
//   });
// }

export function slugify(title: string) {
  return title
    .normalize("NFKC") // Normalize Unicode to avoid variations
    .replace(/[\u200B-\u200D\uFEFF]/g, "") // Remove zero-width characters
    .trim() // Remove extra spaces
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/[^-\u0980-\u09FFa-zA-Z0-9]/g, "") // Allow Bangla, Latin, numbers
    .toLowerCase();
}

