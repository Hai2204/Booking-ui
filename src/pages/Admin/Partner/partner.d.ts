interface Partner {
    partnerId: number;
    name: string;
    contactInfo: string;
}

interface PartnerState {
partners: Partner[]
  isLoading: boolean
  error: string | null
}