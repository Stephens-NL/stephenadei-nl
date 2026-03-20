import type { Rate, Segment, Mode } from './types';
export declare const pricing: {
    version: string;
    updatedAt: string;
    currency: string;
    policy: {
        packages_only: boolean;
        max_hours_per_week: number;
        availability: string;
        makeup_lessons: string;
        cancellation_notice_hours: number;
        payment_method: string;
        invoice_on_request: boolean;
    };
    rates: Rate[];
    findRate(segment: Segment, mode: Mode, studentCount: number): Rate | undefined;
    bySegment(segment: Segment): Rate[];
    definitive(): Rate[];
    spoed(): Rate[];
    formatCents(cents: number): string;
};
//# sourceMappingURL=pricing.d.ts.map