import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                michelle: "#202226",
                shaneypie: "#7FOB10",
                lewis: "#6A843C",
            },
        },
    },
    plugins: [],
    corePlugins: {
        preflight: false,
    },
};
export default config;
