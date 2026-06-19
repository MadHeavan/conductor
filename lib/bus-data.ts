export type SeatStatus = "available" | "booked" | "selected"

export type Seat = {
  id: string
  status: SeatStatus
}

// Theater-style layout: rows of 4 (2 + aisle + 2), last row of 5
export const seatRows: Seat[][] = [
  [
    { id: "1A", status: "booked" },
    { id: "1B", status: "available" },
    { id: "1C", status: "booked" },
    { id: "1D", status: "booked" },
  ],
  [
    { id: "2A", status: "available" },
    { id: "2B", status: "available" },
    { id: "2C", status: "booked" },
    { id: "2D", status: "available" },
  ],
  [
    { id: "3A", status: "booked" },
    { id: "3B", status: "booked" },
    { id: "3C", status: "available" },
    { id: "3D", status: "booked" },
  ],
  [
    { id: "4A", status: "available" },
    { id: "4B", status: "booked" },
    { id: "4C", status: "booked" },
    { id: "4D", status: "available" },
  ],
  [
    { id: "5A", status: "booked" },
    { id: "5B", status: "available" },
    { id: "5C", status: "available" },
    { id: "5D", status: "booked" },
  ],
  [
    { id: "6A", status: "available" },
    { id: "6B", status: "booked" },
    { id: "6C", status: "available" },
    { id: "6D", status: "available" },
  ],
]

export type Passenger = {
  name: string
  seat: string
  stop: string
  eta: string
  phone: string
}

export const upcomingPassengers: Passenger[] = [
  { name: "Aarav Sharma", seat: "2A", stop: "Koyambedu Hub", eta: "8 min", phone: "+91 98840 12345" },
  { name: "Priya Nair", seat: "2D", stop: "Koyambedu Hub", eta: "8 min", phone: "+91 99620 88210" },
  { name: "Rohan Mehta", seat: "5B", stop: "Vellore Bypass", eta: "24 min", phone: "+91 90031 45567" },
  { name: "Ananya Iyer", seat: "6C", stop: "Vellore Bypass", eta: "24 min", phone: "+91 73058 99821" },
  { name: "Kabir Singh", seat: "6D", stop: "Krishnagiri Toll", eta: "41 min", phone: "+91 80561 23410" },
]

export type RouteStop = {
  name: string
  time: string
  status: "passed" | "current" | "upcoming"
}

export const routeStops: RouteStop[] = [
  { name: "Chennai CMBT", time: "06:00", status: "passed" },
  { name: "Koyambedu Hub", time: "06:18", status: "current" },
  { name: "Vellore Bypass", time: "08:05", status: "upcoming" },
  { name: "Krishnagiri Toll", time: "09:20", status: "upcoming" },
  { name: "Bengaluru Majestic", time: "11:45", status: "upcoming" },
]

export const revenueSummary = {
  walkInTickets: 34,
  totalCollected: 12480,
  digitalPayments: 27,
  cashPayments: 7,
  shiftStart: "06:00 AM",
  averageFare: 367,
}
