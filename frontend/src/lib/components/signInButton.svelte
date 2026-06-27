<script>

  let { username = null, href = "/auth/login" } = $props();
</script>

{#if username}
  <a href="/account" class="signed-in-pill">
    <span class="initial" aria-hidden="true">{username.charAt(0).toUpperCase()}</span>
    <span class="name">{username}</span>
  </a>
{:else}
  <a href={href} class="sign-in-btn">
    Sign in
  </a>
{/if}

<style>
  .sign-in-btn {
    font-family: var(--font-mono);
    font-size: 0.78rem;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--paper);
    background: var(--ink);
    padding: 0.55rem 1.1rem;
    border-radius: 999px;
    text-decoration: none;
    border: 1px solid var(--ink);
    transition: background 0.2s ease, color 0.2s ease, transform 0.15s ease;
  }

  .sign-in-btn:hover {
    background: var(--accent);
    border-color: var(--accent);
    transform: translateY(-1px);
  }

  .signed-in-pill {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    text-decoration: none;
    color: var(--ink);
    padding: 0.3rem 0.85rem 0.3rem 0.3rem;
    border-radius: 999px;
    border: 1px solid var(--rule);
    transition: border-color 0.2s ease;
  }

  .signed-in-pill:hover {
    border-color: var(--accent);
  }

  .initial {
    width: 1.7rem;
    height: 1.7rem;
    border-radius: 50%;
    background: var(--accent);
    color: var(--paper);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-mono);
    font-size: 0.78rem;
    font-weight: 700;
  }

  .name {
    font-family: var(--font-mono);
    font-size: 0.78rem;
  }
</style>