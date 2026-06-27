<script>
  import { page } from "$app/stores";

  const status = $derived($page.status);
  const isNotFound = $derived(status === 404);
</script>

<svelte:head>
  <title>{isNotFound ? "Page not found" : `Error ${status}`} · Liner Notes</title>
</svelte:head>

<main class="error-page">
  <div class="note-icon" aria-hidden="true">
    <svg viewBox="0 0 24 24" width="64" height="64" fill="none" stroke="white" stroke-width="1.6">
      <path d="M9 18V5l12-2v13" stroke-linecap="round" stroke-linejoin="round" />
      <circle cx="6" cy="18" r="3" stroke-linecap="round" stroke-linejoin="round" />
      <circle cx="18" cy="16" r="3" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  </div>

  <p class="status-code">{status}</p>

  <h1>{isNotFound ? "Page Not Found" : "Something Went Wrong"}</h1>

  <p class="message">
    {#if isNotFound}
      Looks like this track doesn't exist in our library. Let's get you back to the music.
    {:else}
      {$page.error?.message ?? "An unexpected error occurred."}
    {/if}
  </p>

  <div class="actions">
    <a href="/" class="btn btn-light">
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <path d="M3 9.5 12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1V9.5Z" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      Go Home
    </a>
    <a href="/albums" class="btn btn-filled">
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <circle cx="11" cy="11" r="7" stroke-linecap="round" stroke-linejoin="round" />
        <path d="m21 21-4.3-4.3" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      Browse Albums
    </a>
  </div>

  <div class="helpful-links">
    <p class="helpful-label">Lost? Here are some helpful links:</p>
    <nav aria-label="Helpful links">
      <a href="/artists">Artists</a>
      <a href="/journal">My Journal</a>
      <a href="/login">Sign In</a>
    </nav>
  </div>
</main>

<style>
  .error-page {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 2rem 1.5rem;
    background: linear-gradient(135deg, #8b2fe0 0%, #c026d3 45%, #e8118f 100%);
    color: white;
    font-family: "Inter", system-ui, sans-serif;
  }

  .note-icon {
    margin-bottom: 1.5rem;
    opacity: 0.95;
  }

  .status-code {
    font-size: clamp(4.5rem, 12vw, 7rem);
    font-weight: 800;
    line-height: 1;
    margin: 0 0 0.5rem 0;
    letter-spacing: -0.02em;
  }

  h1 {
    font-size: clamp(1.5rem, 3vw, 2rem);
    font-weight: 700;
    margin: 0 0 1rem 0;
  }

  .message {
    font-size: 1.05rem;
    max-width: 32rem;
    line-height: 1.6;
    margin: 0 0 2rem 0;
    color: rgba(255, 255, 255, 0.92);
  }

  .actions {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 3rem;
  }

  .btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.85rem 1.6rem;
    border-radius: 999px;
    text-decoration: none;
    font-weight: 700;
    font-size: 1rem;
    transition: transform 0.15s ease, box-shadow 0.2s ease;
  }

  .btn:hover {
    transform: translateY(-1px);
  }

  .btn-light {
    background: white;
    color: #9333ea;
  }

  .btn-light:hover {
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.18);
  }

  .btn-filled {
    background: rgba(255, 255, 255, 0.12);
    color: white;
    border: 2px solid white;
  }

  .btn-filled:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  .helpful-links {
    color: rgba(255, 255, 255, 0.85);
  }

  .helpful-label {
    font-size: 0.9rem;
    margin: 0 0 0.75rem 0;
  }

  .helpful-links nav {
    display: flex;
    gap: 1.5rem;
    justify-content: center;
  }

  .helpful-links a {
    color: rgba(255, 255, 255, 0.92);
    text-decoration: none;
    font-size: 0.95rem;
  }

  .helpful-links a:hover {
    text-decoration: underline;
  }

  @media (max-width: 480px) {
    .actions {
      flex-direction: column;
      width: 100%;
      max-width: 18rem;
    }
    .btn {
      justify-content: center;
    }
    .helpful-links nav {
      gap: 1rem;
      flex-wrap: wrap;
    }
  }
</style>