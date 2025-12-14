import { View, Text } from "react-native";
import PageTitle from "@/component/shared/PageTitle";
import { typography } from "@/theme/typography";

export default function CancellationPolicy() {
  return (
    <View style={{ marginTop: 20 }}>
      <PageTitle title="Cancellation Policy" />
      <Text style={typography.subtitle}>
        Cancel for free up to <Text style={{ fontWeight: "600" }}>24 hours</Text>,
        otherwise cancellation fees may apply.
      </Text>
    </View>
  );
}
