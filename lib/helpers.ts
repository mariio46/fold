function generateRandomNumber() {
    return Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit random number
}

export const rupiahFormat = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
    }).format(value);
};

export function convertToSlug(str: string) {
    const randomNumber = generateRandomNumber();

    const slug = str
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, '-')
        .trim();

    return `${slug}-${randomNumber}`;
}
