import { api } from "@hubbr/backend/api";
import { colors } from "@hubbr/shared";
import { useQuery } from "convex/react";
import { CalendarDays, type LucideIcon, MessageCircle, ShieldCheck } from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Alert,
  ScrollView,
  type ScrollViewInstance,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { DevSignIn } from "@/components/dev-sign-in";
import { VippsButton } from "@/components/vipps-button";
import { WelcomeRing } from "@/components/welcome-ring";
import { useScheme } from "@/lib/use-scheme";

const benefits: { key: "benefitChat" | "benefitEvents" | "benefitTrust"; Icon: LucideIcon }[] = [
  { key: "benefitChat", Icon: MessageCircle },
  { key: "benefitEvents", Icon: CalendarDays },
  { key: "benefitTrust", Icon: ShieldCheck },
];

/** Landing screen for signed-out users: the ring of groups, the pitch and one button (HUB-48). */
export default function Welcome() {
  const { t } = useTranslation();
  const c = colors[useScheme()];
  const { width, height } = useWindowDimensions();
  const personas = useQuery(api.devSignIn.personas);
  const [showDev, setShowDev] = useState(false);
  const scroll = useRef<ScrollViewInstance>(null);

  // The persona list can push below the fold on small phones.
  useEffect(() => {
    if (showDev) scroll.current?.scrollToEnd({ animated: true });
  }, [showDev]);

  function onContinue() {
    // Until Vipps Login exists (HUB-10), the button opens the dev personas.
    if (personas !== undefined && personas.length > 0) setShowDev(true);
    else Alert.alert(t("welcome.vippsSoonTitle"), t("welcome.vippsSoonBody"));
  }

  return (
    <SafeAreaView className="flex-1 bg-bg">
      <ScrollView
        ref={scroll}
        contentContainerClassName="flex-grow justify-between gap-8 px-6 pb-8 pt-8"
      >
        <View className="gap-7">
          <View className="items-center">
            <WelcomeRing size={Math.min(width - 48, height * 0.38, 320)} />
          </View>
          <Animated.View entering={FadeInDown.delay(700).duration(400)} style={{ gap: 16 }}>
            <Text
              accessibilityRole="header"
              className="font-sans-extrabold text-[30px] leading-9 tracking-tight text-text"
            >
              {t("welcome.headline")}
            </Text>
            <View className="gap-2.5">
              {benefits.map(({ key, Icon }) => (
                <View key={key} className="flex-row items-center gap-3">
                  <Icon size={18} color={c.primary} strokeWidth={2.2} />
                  <Text className="flex-1 font-sans text-[15px] leading-6 text-textMuted">
                    {t(`welcome.${key}`)}
                  </Text>
                </View>
              ))}
            </View>
          </Animated.View>
        </View>
        <View className="gap-4">
          {showDev ? <DevSignIn /> : <VippsButton onPress={onContinue} />}
          <Text className="text-center font-sans text-xs leading-5 text-textMuted">
            {t("welcome.adultsOnly")}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
