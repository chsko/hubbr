import { colors } from "@hubbr/shared";
import { Backpack, House, type LucideIcon, Trees, Trophy, Users } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import Animated, { FadeIn, ZoomIn } from "react-native-reanimated";
import Svg, { Circle } from "react-native-svg";
import { useScheme } from "@/lib/use-scheme";

/** The groups around "You", clockwise from the top. */
const groups: { key: "class" | "family" | "friends" | "team" | "neighbours"; Icon: LucideIcon }[] =
  [
    { key: "class", Icon: Backpack },
    { key: "family", Icon: House },
    { key: "friends", Icon: Users },
    { key: "team", Icon: Trophy },
    { key: "neighbours", Icon: Trees },
  ];

/**
 * The logo's ring drawn large for the welcome screen: five groups gather
 * around an amber "You" when the screen opens. Decorative, so hidden from
 * screen readers; the headline below says the same in words. NativeWind
 * doesn't style Reanimated views, so each animated wrapper holds a plain View.
 */
export function WelcomeRing({ size }: { size: number }) {
  const { t } = useTranslation();
  const c = colors[useScheme()];
  const mid = size / 2;
  const orbit = size * 0.36;
  const dot = size * 0.2;
  const centre = size * 0.27;
  const labelWidth = size * 0.34;

  return (
    <View
      style={{ width: size, height: size }}
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
    >
      <Svg width={size} height={size} style={{ position: "absolute" }}>
        <Circle
          cx={mid}
          cy={mid}
          r={orbit}
          fill="none"
          stroke={c.border}
          strokeWidth={2}
          strokeDasharray="6 8"
        />
      </Svg>
      <Animated.View
        entering={ZoomIn.springify().damping(14)}
        style={{ position: "absolute", left: mid - centre / 2, top: mid - centre / 2 }}
      >
        <View
          className="items-center justify-center rounded-full bg-accent"
          style={{ width: centre, height: centre }}
        >
          {/* Amber is light in both themes, so its text stays dark. */}
          <Text className="font-sans-extrabold text-[15px] text-[#1D2321]">
            {t("welcome.ring.you")}
          </Text>
        </View>
      </Animated.View>
      {groups.map(({ key, Icon }, i) => {
        const angle = -Math.PI / 2 + (i * 2 * Math.PI) / groups.length;
        const x = mid + orbit * Math.cos(angle);
        const y = mid + orbit * Math.sin(angle);
        const delay = 250 + i * 120;
        return (
          <View
            key={key}
            className="absolute items-center gap-1"
            style={{ left: x - labelWidth / 2, top: y - dot / 2, width: labelWidth }}
          >
            <Animated.View entering={ZoomIn.delay(delay).springify().damping(14)}>
              <View
                className="items-center justify-center rounded-full bg-primary"
                style={{ width: dot, height: dot }}
              >
                <Icon size={dot * 0.42} color={c.bg} strokeWidth={2.2} />
              </View>
            </Animated.View>
            <Animated.View entering={FadeIn.delay(delay + 150)}>
              <View className="rounded-full bg-primarySoft px-2 py-0.5">
                <Text numberOfLines={1} className="font-sans-bold text-[12px] text-primaryStrong">
                  {t(`welcome.ring.${key}`)}
                </Text>
              </View>
            </Animated.View>
          </View>
        );
      })}
    </View>
  );
}
