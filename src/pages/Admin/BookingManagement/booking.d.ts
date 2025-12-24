type Status = 'booked' | 'active' | 'close' | 'cancel';

interface Customer {
  id: number;
  name: string;
  userName: string;
  nationalId: string;
  age: number;
  phoneNumber: string;
  email: string;
}

interface Booking {
  id: number;
  room: Room;
  customer: Customer;
  timeIn: string;
  timeOut: string;
  status: Status;
  note: string;
  createdAt: string;
  updatedAt: string;
}