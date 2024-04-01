import { Document, Schema, model } from 'mongoose';

// Interface for the Pricing model
export interface IPricing extends Document {
    name: string;
    description?: string;
    currency: string;
    pricingTiers: PricingTier[];
    discounts: Discount[];
    products: {
        productId: string; // Reference to the Product model
        price?: number; // Optional price override for a specific product
    }[];
}

// Interface for pricing tiers
interface PricingTier {
    name: string;
    price: number;
    quantityThreshold?: number; // Optional threshold for quantity-based pricing
}

// Interface for discounts
interface Discount {
    name: string;
    type: 'percentage' | 'fixed';
    value: number;
    conditions?: {
        minTotal: number; // Minimum total amount for the discount to apply
        startDate?: Date;
        endDate?: Date;
    };
}

// Pricing schema definition
const pricingSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        currency: {
            type: String,
            required: true,
            trim: true,
        },
        pricingTiers: [
            {
                name: { type: String, required: true, trim: true },
                price: { type: Number, required: true },
                quantityThreshold: { type: Number, min: 1 },
            },
        ],
        discounts: [
            {
                name: { type: String, required: true, trim: true },
                type: { type: String, enum: ['percentage', 'fixed'], required: true },
                value: { type: Number, required: true },
                conditions: {
                    minTotal: { type: Number, default: 0 },
                    startDate: { type: Date },
                    endDate: { type: Date },
                },
            },
        ],
        products: [
            {
                productId: {
                    type: Schema.Types.ObjectId,
                    ref: 'Product', // Reference to the Product model
                    required: true,
                },
                price: { type: Number, min: 0 },
            },
        ],
    },

    { timestamps: true }
);

// simply pricing model here indicates the query performance on long run and help in overall performance

// Indexes for better performance
pricingSchema.index({ name: 1, currency: 1 }, { unique: true });
pricingSchema.index({ 'pricingTiers.name': 1 }, { unique: true });

// Create the Pricing model
const PricingModel = model<IPricing>('Pricing', pricingSchema);

export default PricingModel;
