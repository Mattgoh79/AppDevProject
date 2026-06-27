<script>

  import { fly } from "svelte/transition";

  let {
    visible = $bindable(false),
    message = "Successfully added",
    type = "success",
    duration = 3000,
    onClose = () => {},
    children = null,
  } = $props();

  /** @type {ReturnType<typeof setTimeout>} */
  let timeoutId;

  function close() {
    visible = false;
    onClose();
  }

  $effect(() => {
    clearTimeout(timeoutId);
    if (visible && duration > 0) {
      timeoutId = setTimeout(close, duration);
    }
    return () => clearTimeout(timeoutId);
  });
</script>

{#if visible}
  <div
    class="alert-toast"
    class:success={type === "success"}
    class:error={type === "error"}
    role="status"
    transition:fly={{ y: -16, duration: 200 }}
  >
    <span class="icon" aria-hidden="true">
      {type === "error" ? "!" : "✓"}
    </span>
    <div class="msg">
      {#if children}
        {@render children?.()}
      {:else}
        {message}
      {/if}
    </div>
    <button class="dismiss" onclick={close} aria-label="Dismiss">×</button>
  </div>
{/if}

<style>
  .alert-toast {
    position: fixed;
    top: 1.2rem;
    right: 1.2rem;
    display: flex;
    align-items: center;
    gap: 0.7rem;
    background: var(--paper);
    border-radius: 10px;
    border: 1px solid rgba(0, 0, 0, 0.08);
    box-shadow: 0 8px 28px rgba(0, 0, 0, 0.18);
    padding: 0.75rem 1rem;
    max-width: 340px;
    z-index: 1100;
    font-family: var(--font-mono);
    font-size: 0.85rem;
  }

  .icon {
    flex-shrink: 0;
    width: 1.4rem;
    height: 1.4rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8rem;
    color: var(--paper);
    background: var(--accent);
  }

  .alert-toast.error .icon {
    background: #b3261e;
  }

  .msg {
    flex: 1;
    line-height: 1.4;
  }

  .dismiss {
    background: none;
    border: none;
    font-size: 1.1rem;
    line-height: 1;
    cursor: pointer;
    color: inherit;
    opacity: 0.5;
    padding: 0 0.1rem;
  }

  .dismiss:hover {
    opacity: 1;
  }
</style>