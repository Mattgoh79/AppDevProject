<script>
  /**
   * Reusable confirmation modal. Use it anywhere you need the user
   * to confirm a destructive or important action (e.g. logging out).
   *
   * Usage:
   *   <Modal
   *     bind:open={showLogoutModal}
   *     title="Log out?"
   *     message="You'll need to sign in again to get back to your dashboard."
   *     confirmLabel="Log out"
   *     danger
   *     onConfirm={handleLogout}
   *   />
   */
  import { fade, scale } from "svelte/transition";

  let {
    open = $bindable(false),
    title = "Are you sure?",
    message = "This action cannot be undone.",
    confirmLabel = "Confirm",
    cancelLabel = "Cancel",
    danger = false,
    onConfirm = () => {},
    onCancel = () => {},
  } = $props();

  function close() {
    open = false;
    onCancel();
  }

  function confirm() {
    open = false;
    onConfirm();
  }

  function handleKeydown(e) {
    if (e.key === "Escape") close();
  }
</script>

<svelte:window onkeydown={open ? handleKeydown : undefined} />

{#if open}
  <div
    class="modal-backdrop"
    onclick={close}
    transition:fade={{ duration: 150 }}
  >
    <div
      class="modal-card"
      class:danger
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onclick={(e) => e.stopPropagation()}
      transition:scale={{ duration: 180, start: 0.95 }}
    >
      <h2 id="modal-title">{title}</h2>
      <p>{message}</p>
      <div class="modal-actions">
        <button class="btn-ghost" onclick={close}>{cancelLabel}</button>
        <button class="btn-solid" onclick={confirm}>{confirmLabel}</button>
      </div>
    </div>
  </div>
{/if}

<style>
  .modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(20, 16, 14, 0.55);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 1rem;
  }

  .modal-card {
    background: var(--paper);
    border-radius: 14px;
    border: 1px solid rgba(0, 0, 0, 0.08);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.25);
    padding: 1.6rem 1.6rem 1.4rem;
    width: 100%;
    max-width: 360px;
  }

  .modal-card h2 {
    margin: 0 0 0.5rem;
    font-size: 1.05rem;
    font-family: var(--font-mono);
    text-transform: uppercase;
    letter-spacing: 0.03em;
  }

  .modal-card p {
    margin: 0 0 1.4rem;
    font-size: 0.92rem;
    line-height: 1.5;
    opacity: 0.8;
  }

  .modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: 0.6rem;
  }

  .btn-ghost,
  .btn-solid {
    font-family: var(--font-mono);
    font-size: 0.78rem;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    padding: 0.55rem 1.1rem;
    border-radius: 999px;
    cursor: pointer;
    border: 1px solid transparent;
    transition: transform 0.15s ease, box-shadow 0.2s ease;
  }

  .btn-ghost {
    background: transparent;
    color: inherit;
    border-color: rgba(0, 0, 0, 0.15);
  }

  .btn-ghost:hover {
    background: rgba(0, 0, 0, 0.04);
  }

  .btn-solid {
    background: var(--accent);
    color: var(--paper);
    border-color: var(--accent);
  }

  .modal-card.danger .btn-solid {
    background: #b3261e;
    border-color: #b3261e;
  }

  .btn-solid:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 14px rgba(193, 80, 46, 0.35);
  }
</style>