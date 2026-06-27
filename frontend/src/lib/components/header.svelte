<script>

  import SoundBox from "./soundBoxButton.svelte";
  import LogoutButton from "./logoutButton.svelte";

  let { children } = $props();
</script>

<header class="site-header">
  <div class="header-inner">
    <div class="brand-slot">
      <SoundBox label="Sound Box" href="/user/[id]/dashboard" />
    </div>

    <nav class="site-nav" aria-label="Primary">
      <a href="/reviews">Reviews</a>
      <a href="/artists">Artists</a>
      <a href="/albums">Albums</a>
    </nav>

    <div class="header-actions">
      {@render children?.()}
      <LogoutButton />
    </div>
  </div>
</header>

<style>
  .site-header {
    background: var(--paper);
    border-bottom: 1px solid var(--rule);
    position: sticky;
    top: 0;
    z-index: 20;
  }

  .header-inner {
    max-width: 1180px;
    margin: 0 auto;
    padding: 0.85rem 1.5rem;
    display: flex;
    align-items: center;
    gap: 2rem;
  }

  .brand-slot {
    flex-shrink: 0;
  }

  .site-nav {
    display: flex;
    gap: 1.6rem;
    flex: 1;
  }

  .site-nav a {
    font-family: var(--font-mono);
    font-size: 0.78rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--ink-soft);
    text-decoration: none;
    padding-bottom: 0.2rem;
    border-bottom: 2px solid transparent;
    transition: border-color 0.2s ease, color 0.2s ease;
  }

  .site-nav a:hover {
    color: var(--ink);
    border-bottom-color: var(--accent);
  }

  .header-actions {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex-shrink: 0;
  }

  @media (max-width: 680px) {
    .site-nav {
      display: none;
    }
    .header-inner {
      padding: 0.75rem 1rem;
    }
  }
</style>