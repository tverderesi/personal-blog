import { cva, type VariantProps } from "class-variance-authority";

export const button = cva(
  "relative border-2 border-transparent bg-transparent shadow-none transition-all duration-150 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 dark:focus-visible:ring-white dark:focus-visible:ring-offset-black",
  {
    variants: {
      intent: {
        brutal:
          "hover:-translate-x-1 hover:-translate-y-1 hover:border-black hover:bg-brutal hover:text-black hover:shadow-contrast dark:hover:border-white dark:hover:bg-brutal-dark dark:hover:text-black dark:hover:shadow-brutal-dark",

        acid:
          "hover:-translate-x-1 hover:-translate-y-1 hover:border-black hover:bg-acid hover:text-black hover:shadow-contrast dark:hover:border-white dark:hover:bg-acid-dark dark:hover:text-black dark:hover:shadow-acid-dark",

        neon:
          "hover:-translate-x-1 hover:-translate-y-1 hover:border-black hover:bg-neon hover:text-black hover:shadow-contrast dark:hover:border-neon dark:hover:bg-black dark:hover:text-neon-dark dark:hover:shadow-neon-dark",

        signal:
          "hover:-translate-x-1 hover:-translate-y-1 hover:border-black hover:bg-signal hover:text-black hover:shadow-contrast dark:hover:border-white dark:hover:bg-signal-dark dark:hover:text-black dark:hover:shadow-signal-dark",

        loud:
          "hover:-translate-x-1 hover:-translate-y-1 hover:border-black hover:bg-loud hover:text-black hover:shadow-contrast dark:hover:border-white dark:hover:bg-loud-dark dark:hover:text-black dark:hover:shadow-loud-dark",

        technical:
          "hover:-translate-x-1 hover:-translate-y-1 hover:border-black hover:bg-technical hover:text-black hover:shadow-contrast dark:hover:border-white dark:hover:bg-technical-dark dark:hover:text-black dark:hover:shadow-technical-dark",

        contrast:
          "hover:-translate-x-1 hover:-translate-y-1 hover:border-black hover:bg-white hover:text-black hover:shadow-contrast dark:hover:border-white dark:hover:bg-black dark:hover:text-white dark:hover:shadow-contrast-dark",
      },
    },

    defaultVariants: {
      intent: "brutal",
    },
  },
);

export type ButtonVariants = VariantProps<typeof button>;
