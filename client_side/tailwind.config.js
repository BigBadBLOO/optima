module.exports = {
    purge: [
        './src/public/*.html',
        './src/*.tsx',
        './src/**/*.tsx',
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                'gold': '#E0BB87',
            },
        },
    },
    variants: {
        width: ["responsive", "hover", "focus"]
    },
    plugins: [],
}
