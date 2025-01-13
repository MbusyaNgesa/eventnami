// export function cn(...classes: string[]) {
//   return classes.filter(Boolean).join(" ");
// }

export function cn(...classes: (string | undefined | boolean)[]): string {
  return classes.reduce<string>((acc, value) => {
    if (value === undefined) {
      return acc; // Skip undefined values
    }

    if (typeof value === "boolean") {
      if (value) acc += " "; // Add space for true boolean
      return acc;
    }

    if (typeof value === "string") {
      const parts = value.split(" ");
      return parts.filter(Boolean).join(" ") + " " + acc;
    }

    // Handle complex cases like "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1"
    if (typeof value === "object" && value !== null) {
      Object.entries(value).forEach(([key, val]) => {
        if (val) {
          acc += `${key} `;
        }
      });
    }

    return acc; // Return unchanged if value is neither string, boolean, nor object
  }, "");
}
