export declare const businessRules: {
    readonly travel: {
        readonly sciencePark: 0;
        readonly vuUva: 2000;
        readonly homeAmsterdam: 5000;
    };
    readonly scheduling: {
        readonly lastMinuteSurcharges: {
            readonly lessThan24hPct: 20;
            readonly lessThan12hPct: 50;
        };
        readonly cancellation: {
            readonly freeBeforeHours: 24;
        };
        readonly flexibilityPremium: {
            readonly twoLessons: 15;
            readonly fourLessons: 30;
            readonly sixOrMoreLessons: 50;
        };
    };
    readonly operatingHours: {
        readonly weekdays: {
            readonly start: "18:00";
            readonly end: "21:00";
        };
        readonly saturday: {
            readonly start: "10:00";
            readonly end: "18:00";
        };
        readonly sunday: {
            readonly start: "14:00";
            readonly end: "18:00";
            readonly onlineOnly: true;
            readonly makeupOnly: true;
        };
    };
    readonly maxHoursPerWeek: 2;
    readonly paymentMethod: "tikkie_upfront";
    readonly invoiceOnRequest: true;
    readonly business: {
        readonly name: "Stephen's Privelessen";
        readonly nameNl: "Stephens Privelessen";
        readonly nameEn: "Stephen's Private Lessons";
        readonly owner: "Stephen Adei";
        readonly kvk: null;
        readonly btw: null;
        readonly siteUrl: "https://stephensprivelessen.nl";
        readonly dashboardUrl: "https://dash.stephensprivelessen.nl";
        readonly portfolioUrl: "https://stephenadei.nl";
    };
};
//# sourceMappingURL=business-rules.d.ts.map