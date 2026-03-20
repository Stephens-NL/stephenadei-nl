"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pricing = void 0;
const rates_json_1 = __importDefault(require("../rates.json"));
exports.pricing = {
    version: rates_json_1.default.version,
    updatedAt: rates_json_1.default.updated_at,
    currency: rates_json_1.default.currency,
    policy: rates_json_1.default.policy,
    rates: rates_json_1.default.rates,
    findRate(segment, mode, studentCount) {
        return this.rates.find((r) => r.segment === segment && r.mode === mode && r.student_count === studentCount);
    },
    bySegment(segment) {
        return this.rates.filter((r) => r.segment === segment);
    },
    definitive() {
        return this.rates.filter((r) => r.status === 'definitive');
    },
    spoed() {
        return this.rates.filter((r) => r.package_hours === 2);
    },
    formatCents(cents) {
        return new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' }).format(cents / 100);
    },
};
//# sourceMappingURL=pricing.js.map