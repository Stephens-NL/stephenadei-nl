"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.businessRules = void 0;
exports.businessRules = {
    travel: {
        sciencePark: 0,
        vuUva: 2000,
        homeAmsterdam: 5000,
    },
    scheduling: {
        lastMinuteSurcharges: {
            lessThan24hPct: 20,
            lessThan12hPct: 50,
        },
        cancellation: {
            freeBeforeHours: 24,
        },
        flexibilityPremium: {
            twoLessons: 15,
            fourLessons: 30,
            sixOrMoreLessons: 50,
        },
    },
    operatingHours: {
        weekdays: { start: '18:00', end: '21:00' },
        saturday: { start: '10:00', end: '18:00' },
        sunday: { start: '14:00', end: '18:00', onlineOnly: true, makeupOnly: true },
    },
    maxHoursPerWeek: 2,
    paymentMethod: 'tikkie_upfront',
    invoiceOnRequest: true,
    business: {
        name: "Stephen's Privelessen",
        nameNl: 'Stephens Privelessen',
        nameEn: "Stephen's Private Lessons",
        owner: 'Stephen Adei',
        kvk: null,
        btw: null,
        siteUrl: 'https://stephensprivelessen.nl',
        dashboardUrl: 'https://dash.stephensprivelessen.nl',
        portfolioUrl: 'https://stephenadei.nl',
    },
};
//# sourceMappingURL=business-rules.js.map