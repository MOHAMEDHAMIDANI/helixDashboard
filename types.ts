
export interface User {
    id: string;
    firstName: string;
    familyName: string;
    phoneNumber: string;
    email: string;
    isAdmin: boolean;
    notifications: Notification[];
}

export interface Product {
    id: string;
    productName: string;
    price: string; 
    hasPromotion: boolean;
    promotionPrice: string | null;
    promotionPercentage: string | null;
    promotionEndDate: string | null;
    image: string[]; 
    sizes: string;
    colors: string;
    description: string;
    stock: number;
    category: {
        id: string;
        categoryName: string;
    };
    isPromotionExpired: boolean;
    isPromotionActive: boolean;
}

export interface Order {
    id: string;
    products: Product[];
    familyName: string;
    firstName: string;
    phoneNumber: string;
    quantity: number;
    totalPrice: number;
    address: string;
    isConfirmed: boolean;
    isShipped: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface Notification {
    id: string;
    message: string;
    isRead: boolean;
    createdAt: Date;
    from: string;
    user: User;
}

export interface Category {
    id: string;
    categoryName: string;
    products?: Product[];
}

export interface ApiResponse<T> {
    data: T;
    message?: string;
    success: boolean;
}

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export interface CreateUserDto {
    firstName: string;
    familyName: string;
    phoneNumber: string;
    email: string;
    password: string;
    isAdmin?: boolean;
}

export interface UpdateUserDto {
    firstName?: string;
    familyName?: string;
    phoneNumber?: string;
    email?: string;
    password?: string;
    isAdmin?: boolean;
}

export interface LoginDto {
    email: string;
    password: string;
}

export interface CreateProductDto {
    productName: string;
    price: number;
    images: string[];
    sizes: string[];
    colors: string[];
    description: string;
    stock: number;
    categoryId: string; 
}

export interface CreateOrderDto {
    productIds: string[]; 
    familyName: string;
    firstName: string;
    phoneNumber: string;
    quantity: number;
    address: string;
}

export type UserWithoutPassword = Omit<User, 'password'>;
export type ProductPreview = Pick<Product, 'id' | 'productName' | 'price' | 'images'>;