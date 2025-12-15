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
  isFirstVisit?: boolean;
}

type BookingType = 'single' | 'group' | null;

interface BookingStore {
  bookingType: BookingType;

  // Single booking state
  singleVendorId?: number;
  singleServices: Service[];
  singleDate?: string;
  singleTime?: string;
  isFirstVisit: boolean;

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
  addBooker: (name?: string) => void;
  removeBooker: (bookerId: number) => void;
  clearActiveBookerServices: () => void;
  totalPriceBooker: (bookerId: number) => number;
  totalDurationBooker: (bookerId: number) => number;

  // All bookers total
  totalPriceAllBookers: () => number;
  totalDurationAllBookers: () => number;
}

// Helper to parse duration string into minutes
const parseDuration = (duration: string) => {
  let minutes = 0;
  const hourMatch = duration.match(/(\d+)\s*hour/i);
  const minMatch = duration.match(/(\d+)\s*min/i);

  if (hourMatch) minutes += parseInt(hourMatch[1], 10) * 60;
  if (minMatch) minutes += parseInt(minMatch[1], 10);

  return minutes;
};

// Helper to generate guest names
const generateGuestName = (index: number) => `Guest ${index}`;

export const useBookingStore = create<BookingStore>((set, get) => ({
  bookingType: null,

  // Single booking
  singleVendorId: undefined,
  singleServices: [],
  singleDate: undefined,
  singleTime: undefined,
  isFirstVisit: true,

  // Group booking
  bookers: [],
  activeBookerId: undefined,

  setBookingType: (type) => {
    set({ bookingType: type });

    if (type === 'group' && get().bookers.length === 0) {
      const firstBooker: Booker = {
        id: 1,
        name: 'You',
        services: [],
        isFirstVisit: false,
      };
      set({ bookers: [firstBooker], activeBookerId: firstBooker.id });
    }
  },

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
      let { activeBookerId, bookers } = get();

      if (!activeBookerId) {
        const newBooker: Booker = {
          id: bookers.length + 1,
          name: generateGuestName(bookers.length),
          services: [service],
          vendorId,
          isFirstVisit: false,
        };
        set({ bookers: [...bookers, newBooker], activeBookerId: newBooker.id });
        return;
      }

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

  clearSingleServices: () =>
    set({
      singleServices: [],
      singleVendorId: undefined,
      singleDate: undefined,
      singleTime: undefined,
      isFirstVisit: true,
    }),
  totalPriceSingle: () =>
    get().singleServices.reduce((sum, s) => sum + Number(s.price.replace(/[^0-9]/g, '')), 0),
  totalDurationSingle: () =>
    get().singleServices.reduce((sum, s) => sum + parseDuration(s.duration), 0),

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

  setSingleFirstVisit: (first) => set({ isFirstVisit: first }),
  setBookerFirstVisit: (bookerId, first) => {
    const { bookers } = get();
    set({
      bookers: bookers.map((b) =>
        b.id === bookerId ? { ...b, isFirstVisit: first } : b
      ),
    });
  },

  setActiveBooker: (bookerId) => set({ activeBookerId: bookerId }),

  addBooker: (name?: string) =>
    set((state) => {
      const newId = state.bookers.length + 1;
      const newBooker: Booker = {
        id: newId,
        name: name || generateGuestName(state.bookers.length),
        services: [],
        isFirstVisit: true,
      };
      return {
        bookers: [...state.bookers, newBooker],
        activeBookerId: newBooker.id,
      };
    }),

  removeBooker: (bookerId) =>
    set((state) => {
      const index = state.bookers.findIndex((b) => b.id === bookerId);
      if (index === -1) return state;

      const newBookers = state.bookers.filter((b) => b.id !== bookerId);

      let newActiveBookerId = state.activeBookerId;
      if (state.activeBookerId === bookerId) {
        if (index > 0) {
          newActiveBookerId = state.bookers[index - 1].id;
        } else if (newBookers.length > 0) {
          newActiveBookerId = newBookers[0].id;
        } else {
          newActiveBookerId = undefined;
        }
      }

      return {
        bookers: newBookers,
        activeBookerId: newActiveBookerId,
      };
    }),

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

  totalPriceAllBookers: () => {
    const { bookers } = get();
    return bookers.reduce(
      (sum, b) =>
        sum + b.services.reduce((sSum, s) => sSum + Number(s.price.replace(/[^0-9]/g, '')), 0),
      0
    );
  },

  totalDurationAllBookers: () => {
    const { bookers } = get();
    return bookers.reduce(
      (sum, b) =>
        sum + b.services.reduce((sSum, s) => sSum + parseDuration(s.duration), 0),
      0
    );
  },
}));
