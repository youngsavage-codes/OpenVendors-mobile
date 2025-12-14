import { router, useLocalSearchParams } from "expo-router";
import {
  ArrowLeft,
} from "iconsax-react-nativejs";
import React from "react";
import {
  ScrollView,
  StyleSheet
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import BookingDateTime from "@/component/orderSummery/BookingDateTime";
import CancellationPolicy from "@/component/orderSummery/CancellationPolicy";
import OrderItemsList from "@/component/orderSummery/OrderItemsList";
import PaymentMethodSelector from "@/component/orderSummery/PaymentMethodSelector";
import PriceBreakdown from "@/component/orderSummery/PriceBreakdown";
import SalonInfoCard from "@/component/orderSummery/SalonInfoCard";
import CartSummary from "@/component/shared/CartSummary";
import IconButton from "@/component/shared/IconButton";
import PageTitle from "@/component/shared/PageTitle";
import { images } from "@/constant/images";
import { colors } from "@/theme/colors";
import { formatDurationCompact } from "@/utils/formarDuration";
import { useBookingStore } from "@/store/bookingStore";

type PaymentMethod = "now" | "venue";

// Helper function to calculate end time
const getEndTime = (startTime: string, durationMinutes: number) => {
  if (!startTime) return '';
  const [hour, minute] = startTime.split(':').map(Number);
  const startDate = new Date();
  startDate.setHours(hour, minute, 0, 0);

  const endDate = new Date(startDate.getTime() + durationMinutes * 60 * 1000);

  const endHours = String(endDate.getHours()).padStart(2, '0');
  const endMinutes = String(endDate.getMinutes()).padStart(2, '0');

  return `${endHours}:${endMinutes}`;
};


const OrderSummary = () => {
  const {totalPriceSingle, totalDurationSingle, singleServices, bookers, singleDate, singleTime} = useBookingStore()
  const [paymentMethod, setPaymentMethod] = React.useState<PaymentMethod>("now");
    const {vendor} = useLocalSearchParams();
    const vendorObj = JSON.parse(vendor);


  const cart = singleServices || bookers?.services

  const bookingFee = vendorObj?.price
    ? Number(vendorObj.price.toString().replace(/[^0-9.-]+/g, ''))
    : 0;

const grandTotal = totalPriceSingle() + bookingFee;

  return (
    <SafeAreaView style={styles.safeArea}>
      <IconButton onPress={() => router.back()}>
        <ArrowLeft />
      </IconButton>

      <ScrollView showsVerticalScrollIndicator={false}>
        <PageTitle title="Review and confirm" />

        <SalonInfoCard
          image={vendorObj.image}
          name={vendorObj?.name}
          rating={vendorObj?.rating}
          reviews="3,440"
          address={vendorObj.location}
        />
        <BookingDateTime
          date={singleDate ? new Date(singleDate).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          }) : ''}
          time={
            singleTime
              ? `${singleTime} - ${getEndTime(singleTime, totalDurationSingle())} (${formatDurationCompact(totalDurationSingle())})`
              : ''
          }
        />


        <OrderItemsList items={cart} />
        <PriceBreakdown total={totalPriceSingle()} bookingFee={bookingFee} />

        <PaymentMethodSelector
          value={paymentMethod}
          onChange={setPaymentMethod}
          amount={grandTotal}
        />

        <CancellationPolicy />
      </ScrollView>

      {cart.length > 0 && (
        <CartSummary
          totalPrice={grandTotal}
          totalDuration={totalDurationSingle()}
          totalItems={cart.length}
          onContinue={() => router.push("/(others)/firstTimeVisit")}
        />
      )}
    </SafeAreaView>
  );
};

export default OrderSummary


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  safeArea: {
    flex: 1,
    padding: 20,
  },

  salonRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    marginTop: 10,
  },
  salonImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginVertical: 2,
  },

  section: {
    marginTop: 20,
  },

  iconRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 8,
  },

  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },

  subtotalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: colors.gray200,
    marginTop: 15,
  },

  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },

  payRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
  },

  primaryText: {
    color: colors.primary,
  },

  boldText: {
    fontWeight: "600",
  },

  paymentOption: {
  flexDirection: "row",
  alignItems: "center",
  gap: 12,
  padding: 14,
  borderRadius: 14,
  borderWidth: 1,
  borderColor: colors.gray200,
  marginTop: 12,
},

paymentOptionActive: {
  borderColor: colors.primary,
  backgroundColor: colors.primary + "10", // subtle highlight
},

radio: {
  width: 20,
  height: 20,
  borderRadius: 10,
  borderWidth: 2,
  borderColor: colors.primary,
  alignItems: "center",
  justifyContent: "center",
},

radioInner: {
  width: 10,
  height: 10,
  borderRadius: 5,
  backgroundColor: colors.primary,
},

});
