<script>
  import Header from "$lib/components/header.svelte";
  import SignInButton from "$lib/components/signInButton.svelte";

  let { data } = $props();
  const artist = data.artist;
  const albums = data.artist?.albums ?? [];
</script>

<svelte:head>
  <title>{artist.name} · Liner Notes</title>
</svelte:head>

<Header>
  <SignInButton />
</Header>

<main class="artist-detail">
  <a href="/artists" class="back-link">&larr; All artists</a>

  <section class="artist-header">
    <p class="birth-year-badge">Born {artist.birthYear}</p>
    <h1>{artist.name}</h1>
    {#if artist.bio}
      <p class="artist-meta">{artist.bio}</p>
    {/if}
  </section>

  <section class="albums-section">
    <h2>Albums</h2>
    {#if albums.length === 0}
      <p class="state-message">No albums logged for this artist yet.</p>
    {:else}
      <ol class="album-list">
        {#each albums as album (album.id)}
          <li class="album-row">
            <a href="/albums/{album.id}" class="album-name">{album.name}</a>
            <span class="album-info">{album.albumType} &middot; {album.releaseDate}</span>
          </li>
        {/each}
      </ol>
    {/if}
  </section>
</main>

<style>
  .artist-detail {
    max-width: 760px;
    margin: 0 auto;
    padding: 2.5rem 1.5rem 4rem;
  }

  .back-link {
    font-family: var(--font-mono);
    font-size: 0.78rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--ink-soft);
    text-decoration: none;
    display: inline-block;
    margin-bottom: 1.75rem;
  }

  .back-link:hover {
    color: var(--accent);
  }

  .artist-header {
    margin-bottom: 2.5rem;
  }

  .birth-year-badge {
    font-family: var(--font-mono);
    font-size: 0.72rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--accent-secondary);
    margin: 0 0 0.4rem 0;
  }

  h1 {
    font-family: var(--font-display);
    font-size: clamp(1.8rem, 3.5vw, 2.4rem);
    margin: 0 0 0.4rem 0;
    font-weight: 600;
    letter-spacing: -0.01em;
  }

  .artist-meta {
    font-family: var(--font-body, "Inter", sans-serif);
    font-size: 0.95rem;
    line-height: 1.6;
    color: var(--ink-soft);
    margin: 0;
  }

  h2 {
    font-family: var(--font-display);
    font-size: 1.3rem;
    font-weight: 600;
    margin: 0 0 1rem 0;
  }

  .albums-section {
    margin-bottom: 2.5rem;
  }

  .album-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
  }

  .album-row {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 0.9rem;
    padding: 0.7rem 0;
    border-bottom: 1px solid var(--rule);
  }

  .album-row:first-child {
    border-top: 1px solid var(--rule);
  }

  .album-name {
    font-family: var(--font-display);
    font-size: 1rem;
    color: var(--ink);
    text-decoration: none;
    flex: 1;
  }

  .album-name:hover {
    color: var(--accent);
  }

  .album-info {
    font-family: var(--font-mono);
    font-size: 0.72rem;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: var(--ink-soft);
    flex-shrink: 0;
  }

  .state-message {
    font-family: var(--font-mono);
    font-size: 0.85rem;
    color: var(--ink-soft);
  }
</style>