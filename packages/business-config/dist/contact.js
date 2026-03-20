"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contact = void 0;
exports.contact = {
    phone: {
        primary: { number: '+31647357426', display: '+31 6 47 35 74 26', whatsappOnly: true },
        secondary: { number: '+31614189013', display: '+31 6 14 18 90 13', whatsappOnly: false },
    },
    email: {
        primary: 'info@stephenadei.nl',
        lessons: 'lessons@stephensprivelessen.nl',
    },
    social: {
        linkedin: 'https://www.linkedin.com/in/stephen-adei/',
        github: 'https://github.com/stephenadei',
        instagram: {
            tutoring: 'https://www.instagram.com/stephensprivelessen/',
            music: 'https://www.instagram.com/callhimdavinci.als/',
            photography: 'https://www.instagram.com/callhimdavinci.jpg/',
            events: 'https://www.instagram.com/stephensevents/',
        },
    },
    addresses: {
        main: {
            label: 'Science Park',
            street: 'Science Park 904',
            postal: '1098 XH',
            city: 'Amsterdam',
            googleMapsUrl: 'https://maps.google.com/?q=Science Park 904, 1098 XH Amsterdam',
        },
        weekend: {
            label: 'Bijlmerplein',
            street: 'Bijlmerplein 888',
            postal: '1102 MG',
            city: 'Amsterdam',
            googleMapsUrl: 'https://maps.google.com/?q=Bijlmerplein 888, 1102 MG Amsterdam',
        },
    },
    whatsapp: (number) => `https://wa.me/${number.replace(/\+/g, '')}`,
};
//# sourceMappingURL=contact.js.map