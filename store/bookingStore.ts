import { create } from 'zustand';

// Types
interface Service {
  serviceId: number;
  name: string;
  duration: string;
  price: string;
}

interface Booker {
  id: number;
  name: string;
  vendorId?: number;
  services: Service[];
  date?: string;
  time?: string;
  isFirstVisit?: boolean; // <-- track first visit per booker
}

type BookingType = 'single' | 'group' | null;

interface BookingStore {
  bookingType: BookingType;

  // Single booking state
  singleVendorId?: number;
  singleServices: Service[];
  singleDate?: string;
  singleTime?: string;
  isFirstVisit: boolean; // <-- track first visit for single booking

  // Group booking state
  bookers: Booker[];
  activeBookerId?: number;

  // General
  setBookingType: (type: BookingType) => void;

  // Actions
  toggleService: (vendorId: number, service: Service) => void;

  // Date & Time setters
  setSingleDateTime: (date: string, time: string) => void;
  setActiveBookerDateTime: (date: string, time: string) => void;

  // First visit setters
  setSingleFirstVisit: (first: boolean) => void;
  setBookerFirstVisit: (bookerId: number, first: boolean) => void;

  // Single booking helpers
  clearSingleServices: () => void;
  totalPriceSingle: () => number;
  totalDurationSingle: () => number;

  // Group booking helpers
  setActiveBooker: (bookerId: number) => void;
  addBooker: (booker: Booker) => void;
  removeBooker: (bookerId: number) => void;
  clearActiveBookerServices: () => void;
  totalPriceBooker: (bookerId: number) => number;
  totalDurationBooker: (bookerId: number) => number;
}

// Helper to parse duration
const parseDuration = (duration: string) => {
  let minutes = 0;
  const hourMatch = duration.match(/(\d+)\s*hour/i);
  const minMatch = duration.match(/(\d+)\s*min/i);

  if (hourMatch) minutes += parseInt(hourMatch[1], 10) * 60;
  if (minMatch) minutes += parseInt(minMatch[1], 10);

  return minutes;
};

export const useBookingStore = create<BookingStore>((set, get) => ({
  bookingType: null,

  // Single booking
  singleVendorId: undefined,
  singleServices: [],
  singleDate: undefined,
  singleTime: undefined,
  isFirstVisit: true, // <-- default true

  // Group booking
  bookers: [],
  activeBookerId: undefined,

  setBookingType: (type) => set({ bookingType: type }),

  // Toggle service
  toggleService: (vendorId, service) => {
    const { bookingType } = get();
    if (bookingType === 'single') {
      const exists = get().singleServices.find((s) => s.serviceId === service.serviceId);
      if (exists) {
        set({
          singleServices: get().singleServices.filter((s) => s.serviceId !== service.serviceId),
        });
      } else {
        const { singleVendorId, singleServices } = get();
        if (singleVendorId && singleVendorId !== vendorId) {
          set({ singleVendorId: vendorId, singleServices: [service] });
        } else {
          set({ singleVendorId: vendorId, singleServices: [...singleServices, service] });
        }
      }
    } else {
      const { activeBookerId, bookers } = get();
      if (!activeBookerId) return;
      const booker = bookers.find((b) => b.id === activeBookerId);
      if (!booker) return;

      const exists = booker.services.find((s) => s.serviceId === service.serviceId);
      if (exists) {
        set({
          bookers: bookers.map((b) =>
            b.id === activeBookerId
              ? { ...b, services: b.services.filter((s) => s.serviceId !== service.serviceId) }
              : b
          ),
        });
      } else {
        set({
          bookers: bookers.map((b) => {
            if (b.id === activeBookerId) {
              if (b.vendorId && b.vendorId !== vendorId) {
                return { ...b, vendorId, services: [service] };
              }
              return { ...b, vendorId, services: [...b.services, service] };
            }
            return b;
          }),
        });
      }
    }
  },

  // Single booking helpers
  clearSingleServices: () =>
    set({ singleServices: [], singleVendorId: undefined, singleDate: undefined, singleTime: undefined, isFirstVisit: true }),
  totalPriceSingle: () =>
    get().singleServices.reduce((sum, s) => sum + Number(s.price.replace(/[^0-9]/g, '')), 0),
  totalDurationSingle: () =>
    get().singleServices.reduce((sum, s) => sum + parseDuration(s.duration), 0),

  // Date & Time setters
  setSingleDateTime: (date, time) => set({ singleDate: date, singleTime: time }),
  setActiveBookerDateTime: (date, time) => {
    const { activeBookerId, bookers } = get();
    if (!activeBookerId) return;
    set({
      bookers: bookers.map((b) =>
        b.id === activeBookerId ? { ...b, date, time } : b
      ),
    });
  },

  // First visit setters
  setSingleFirstVisit: (first) => set({ isFirstVisit: first }),
  setBookerFirstVisit: (bookerId, first) => {
    const { bookers } = get();
    set({
      bookers: bookers.map((b) =>
        b.id === bookerId ? { ...b, isFirstVisit: first } : b
      ),
    });
  },

  // Group booking helpers
  setActiveBooker: (bookerId) => set({ activeBookerId: bookerId }),
  addBooker: (booker) => set((state) => ({ bookers: [...state.bookers, { ...booker, isFirstVisit: true }] })),
  removeBooker: (bookerId) =>
    set((state) => ({
      bookers: state.bookers.filter((b) => b.id !== bookerId),
      activeBookerId: state.activeBookerId === bookerId ? undefined : state.activeBookerId,
    })),
  clearActiveBookerServices: () => {
    const { activeBookerId, bookers } = get();
    if (!activeBookerId) return;
    set({
      bookers: bookers.map((b) =>
        b.id === activeBookerId
          ? { ...b, services: [], vendorId: undefined, date: undefined, time: undefined, isFirstVisit: true }
          : b
      ),
    });
  },

  totalPriceBooker: (bookerId) => {
    const booker = get().bookers.find((b) => b.id === bookerId);
    if (!booker) return 0;
    return booker.services.reduce((sum, s) => sum + Number(s.price.replace(/[^0-9]/g, '')), 0);
  },
  totalDurationBooker: (bookerId) => {
    const booker = get().bookers.find((b) => b.id === bookerId);
    if (!booker) return 0;
    return booker.services.reduce((sum, s) => sum + parseDuration(s.duration), 0);
  },
}));
