<script>

  import { goto } from "$app/navigation";
  import Modal from "./modal.svelte";
  import AlertToast from "./alert.svelte";
  import Loading from "./loading.svelte";

  let {
    label = "Log out",
    redirectTo = "/auth/login",
    endpoint = "/auth/logout",
  } = $props();

  let showConfirm = $state(false);
  let loggingOut = $state(false);
  let showError = $state(false);
  let errorMessage = $state("");

  async function handleLogout() {
    loggingOut = true;
    try {
      const res = await fetch(endpoint, {
        method: "POST",
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message ?? "Logout failed");
      }

      goto(redirectTo);
    } catch (/** @type {any} */ err) {
      errorMessage = err?.message ?? String(err);
      showError = true;
    } finally {
      loggingOut = false;
    }
  }
</script>

<button
  class="logout-btn"
  onclick={() => (showConfirm = true)}
  disabled={loggingOut}
>
  {#if loggingOut}
    <Loading size="1rem" />
  {:else}
    {label}
  {/if}
</button>

<Modal
  bind:open={showConfirm}
  title="Log out?"
  message="You'll need to sign in again to get back to your dashboard."
  confirmLabel="Log out"
  danger
  onConfirm={handleLogout}
/>

<AlertToast bind:visible={showError} type="error" message={errorMessage} />

<style>
  .logout-btn {
    font-family: var(--font-mono);
    font-size: 0.78rem;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    padding: 0.55rem 1.2rem;
    border-radius: 999px;
    border: 1px solid var(--accent);
    background: transparent;
    color: var(--accent);
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 5.5rem;
    transition: transform 0.15s ease, box-shadow 0.2s ease;
  }

  .logout-btn:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 4px 14px rgba(193, 80, 46, 0.2);
  }

  .logout-btn:disabled {
    opacity: 0.7;
    cursor: default;
  }
</style>