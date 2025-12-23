
interface Partner {
    partnerId: number
    name: string
    contactInfo: string
}
interface Accommodation {
    accommodationId: number
    partner: Partner
    name: string
    accommodationType: string
    description: string
    city: string
    address: string
}

interface Room {
    id: number
    accommodation: Accommodation
    roomCode: string
    name: string
    typeRoom: number
    price: number
    active: number
    description: string
    amenities: string
    policy: string,
    roomCategory: string,
}
