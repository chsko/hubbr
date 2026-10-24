import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { PressScale } from "@/components/press-scale";

/**
 * Shown when Vipps says the user is under 18 (HUB-11). The server rejected
 * the sign-in before storing anything, so there is nothing to clean up.
 */
export default function UnderEighteen() {
  const { t } = useTranslation();
  return (
    <SafeAreaView className="flex-1 bg-bg">
      <View className="flex-1 justify-center gap-4 px-6">
        <Text className="text-center text-[56px]">👋</Text>
        <Text
          accessibilityRole="header"
          className="text-center font-sans-extrabold text-[26px] text-text"
        >
          {t("under18.title")}
        </Text>
        <Text className="text-center font-sans text-[16px] leading-6 text-textMuted">
          {t("under18.body")}
        </Text>
        <PressScale
          testID="under-18-ok"
          accessibilityRole="button"
          onPress={() => (router.canGoBack() ? router.back() : router.replace("/"))}
          className="mt-4 items-center rounded-xl bg-primarySoft px-4 py-3 active:opacity-80"
        >
          <Text className="font-sans-bold text-[16px] text-primaryStrong">{t("under18.ok")}</Text>
        </PressScale>
      </View>
    </SafeAreaView>
  );
}
