import * as Haptics from "expo-haptics";

/**
 * A light tap, for choices like an RSVP. Rejects quietly where there is no
 * haptics, including builds made before expo-haptics was added: updates
 * still reach those, and the module only loads its native side if present.
 */
export function tapHaptic() {
  Haptics.selectionAsync().catch(() => undefined);
}
