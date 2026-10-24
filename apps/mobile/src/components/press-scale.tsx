import type { ComponentProps } from "react";
import { Pressable, type GestureResponderEvent, type ViewStyle } from "react-native";
import Animated, {
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const PRESSED = 0.97;
const SPRING = { damping: 18, stiffness: 400, mass: 0.6 };

/**
 * A Pressable that sinks slightly while pressed, for buttons and cards.
 * The scale lives on a plain Animated.View around it, because NativeWind's
 * className does nothing on Reanimated components; `wrapperStyle` is for
 * layout the wrapper needs (e.g. `{ flex: 1 }` in a row). With Reduce
 * motion on, only the Pressable's own `active:` styles remain.
 */
export function PressScale({
  wrapperStyle,
  onPressIn,
  onPressOut,
  ...props
}: ComponentProps<typeof Pressable> & { wrapperStyle?: ViewStyle }) {
  const reduceMotion = useReducedMotion();
  const scale = useSharedValue(1);
  const style = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));
  return (
    <Animated.View style={[wrapperStyle, style]}>
      <Pressable
        {...props}
        onPressIn={(e: GestureResponderEvent) => {
          if (!reduceMotion) scale.value = withSpring(PRESSED, SPRING);
          onPressIn?.(e);
        }}
        onPressOut={(e: GestureResponderEvent) => {
          scale.value = withSpring(1, SPRING);
          onPressOut?.(e);
        }}
      />
    </Animated.View>
  );
}
