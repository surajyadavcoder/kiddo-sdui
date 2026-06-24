/**
 * UnknownBlockFallback
 * --------------------
 * Resilience Critical Rule: an unrecognized `type` string (e.g.
 * "NEW_COMPONENT_V2") must not crash the renderer or destabilize the
 * surrounding list. We don't even render a visible "unsupported" stub —
 * the spec asks for a *quiet* drop — but we do log once to the console so
 * the gap is debuggable in development without affecting the customer UI.
 */
export function reportUnknownBlock(type: string, id: string): null {
  if (__DEV__) {
    console.warn(`[ComponentRegistry] Unrecognized block type "${type}" (id: ${id}) — dropped.`);
  }
  return null;
}
