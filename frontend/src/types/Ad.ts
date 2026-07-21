export interface Ad {
    id:             string;

    title:          string;

    description:    string;

    category:       string;

    price?:         number;

    isDonation:     boolean;

    imageUrl?:       string;

    userId:         string;
}


export interface CreateAd {
    title:          string;

    description:    string;

    category:       string;

    price?:         number;

    isDonation:     boolean;

    imageUrl?:       string;
}