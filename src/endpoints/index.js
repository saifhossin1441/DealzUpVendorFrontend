export const endpoints = {
    auth: {
        login_vendor: 'auth/vendor-login/',
        register: 'auth/vendors-registration/'
    },
    business: {
        get_vendor_business: 'vendor/businesses/vendor/',
        add_vendor_business: 'vendor/businesses/create/'
    },
    deals: {
        get_deals: 'vendor/deals/',
        add_deals: 'vendor/deals/',
        update_deals: ''
    },
    banners: {
        get_banners: 'vendor/banners/',
        add_banners: 'vendor/banners/',
    },
    offers: {
        get_offers: 'vendor/offers/',
        add_offers: 'vendor/offers/',
    },
    flyers: {
        get_flyers: 'vendor/flyers/',
        add_flyers: 'vendor/flyers/',
    },
    categories: {
        get_categories: 'vendor/categories/',
        get_subcategories: 'vendor/subcategories/'
    },
    subscription: {
        get_subscription_usage: 'wallet/subscription/usage/all/',
        get_subscription_details: 'wallet/subscription/details/'
    }
}