import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Modal, Pressable, View } from "react-native";
import Animated, { SlideInDown } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

/**
 * Sheet that slides up over a dimmed backdrop; tapping the backdrop closes it.
 * The Modal fades the backdrop (and the sheet, on the way out) while the sheet
 * slides in; Reanimated skips the slide when Reduce motion is on.
 * Insets come from the root provider: a native SafeAreaView inside a Modal
 * measures 0 on iOS, which left the last row on the home indicator.
 */
export function BottomSheet({
  visible,
  onClose,
  className = "gap-1",
  children,
}: {
  visible: boolean;
  onClose: () => void;
  /** Layout of the sheet's content (gap etc.); padding is handled here. */
  className?: string;
  children: ReactNode;
}) {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      navigationBarTranslucent
      onRequestClose={onClose}
    >
      <Pressable
        accessibilityLabel={t("common.cancel")}
        onPress={onClose}
        className="flex-1 justify-end bg-black/40"
      >
        <Animated.View entering={SlideInDown.springify().damping(22).mass(0.8)}>
          <Pressable onPress={() => undefined}>
            <View
              className={`rounded-t-3xl bg-surface pt-5 ${className}`}
              style={{
                paddingBottom: Math.max(insets.bottom, 16) + 8,
                paddingLeft: insets.left + 20,
                paddingRight: insets.right + 20,
              }}
            >
              {children}
            </View>
          </Pressable>
        </Animated.View>
      </Pressable>
    </Modal>
  );
}
