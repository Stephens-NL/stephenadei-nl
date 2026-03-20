import type { PhoneEntry, Address } from './types';
export declare const contact: {
    phone: {
        primary: PhoneEntry;
        secondary: PhoneEntry;
    };
    email: {
        primary: string;
        lessons: string;
    };
    social: {
        linkedin: string;
        github: string;
        instagram: {
            tutoring: string;
            music: string;
            photography: string;
            events: string;
        };
    };
    addresses: {
        main: Address;
        weekend: Address;
    };
    whatsapp: (number: string) => string;
};
//# sourceMappingURL=contact.d.ts.map