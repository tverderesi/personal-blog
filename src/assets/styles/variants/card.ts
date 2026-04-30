// src/styles/variants/card.ts

import { cva, type VariantProps } from "class-variance-authority";

export const card = cva(
  "relative w-full border-[3px] border-black text-black transition-all duration-150 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 dark:border-white dark:focus-visible:ring-white dark:focus-visible:ring-offset-black",
  {
    variants: {
      intent: {
        brutal:
          "bg-brutal shadow-contrast dark:bg-brutal-dark dark:text-black dark:shadow-brutal-dark",
        acid:
          "bg-acid shadow-contrast dark:bg-acid-dark dark:text-black dark:shadow-acid-dark",
        neon:
          "bg-neon shadow-contrast dark:bg-black dark:text-neon-dark dark:shadow-neon-dark",
        signal:
          "bg-signal shadow-contrast dark:bg-signal-dark dark:text-black dark:shadow-signal-dark",
        loud:
          "bg-loud shadow-contrast dark:bg-loud-dark dark:text-black dark:shadow-loud-dark",
        technical:
          "bg-technical shadow-contrast dark:bg-technical-dark dark:text-black dark:shadow-technical-dark",
        contrast:
          "bg-white shadow-contrast dark:bg-black dark:text-white dark:shadow-contrast-dark",
      },

      size: {
        sm: "px-3 py-2",
        md: "px-4 py-3",
        lg: "px-5 py-4",
        xl: "px-6 py-5",
        none: "p-0",
      },

      interactive: {
        true: "hover:-translate-x-1 hover:-translate-y-1",
        false: "",
      },

      display: {
        block: "block",
        inline: "inline-block",
        flex: "flex",
        grid: "grid",
      },
    },

    defaultVariants: {
      intent: "technical",
      size: "sm",
      interactive: false,
      display: "block",
    },
  },
);

export type CardVariants = VariantProps<typeof card>;
