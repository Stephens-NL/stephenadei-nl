export type Segment = 'vo' | 'hbo_wo' | 'weekend_hva';
export type Mode = 'online' | 'physical';
export type RateStatus = 'definitive' | 'draft';
export interface Rate {
    rate_id: string;
    segment: Segment;
    mode: Mode;
    label: string;
    amount_cents: number;
    per_unit: string;
    package_hours: number;
    student_count: number;
    per_person_cents?: number;
    location?: string;
    valid_from: string;
    valid_to: string | null;
    status: RateStatus;
    notes?: string;
}
export interface PhoneEntry {
    number: string;
    display: string;
    whatsappOnly: boolean;
}
export interface Address {
    label: string;
    street: string;
    postal: string;
    city: string;
    googleMapsUrl: string;
}
//# sourceMappingURL=types.d.ts.map