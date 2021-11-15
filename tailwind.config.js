// tailwind.config.js
module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        screens: {
            'mt-350': '350px',
            'mt-414': '414px',
            'mt-568': '568px',
            'mt-812': '812px',
            'mt-991': '991px',
            'mt-1024': '1024px',
            'mt-1280': '1280px',
            '2xl': '1700px',
        },
        extend: {
            backgroundColor: {
                "penetration-1": "rgba(0, 0, 0, 0.1)",
                "penetration-2": "rgba(0, 0, 0, 0.2)",
                "penetration-3": "rgba(0, 0, 0, 0.3)",
                "penetration-4": "rgba(0, 0, 0, 0.4)",
                "penetration-5": "rgba(0, 0, 0, 0.5)",
                "penetration-6": "rgba(0, 0, 0, 0.6)",
                "penetration-7": "rgba(0, 0, 0, 0.7)",
                "penetration-8": "rgba(0, 0, 0, 0.8)",
                "penetration-9": "rgba(0, 0, 0, 0.9)",
                "orange": "#fb923c",
            },
            letterSpacing: {
                widest: '4px'
            },
            spacing: {
                "banner": "700px",
                "380": "380px",
                "508": "508px",
                "550": "550px",
                "700": "700px",
            },
        },
    },
    variants: {
        extend: {
            letterSpacing: ['hover', 'focus'],
            background: ['hover'],
            backgroundColor: ['hover'],
            backgroundColor: ['group-hover'],
            border: ['hover'],
            translate: ['group-hover'],
            transform: ['group-hover'],
            scale: ['group-hover'],
        },
    },
    plugins: [],
}