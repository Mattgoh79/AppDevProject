<script>
  import Header from "$lib/components/header.svelte";
  import SignInButton from "$lib/components/signInButton.svelte";

  let { data } = $props();
  const album = data.album;
  const songs = data.album?.songs ?? [];
  const reviews = data.album?.reviews ?? [];
</script>

<svelte:head>
  <title>{album.name} · Liner Notes</title>
</svelte:head>

<Header>
  <SignInButton />
</Header>

<main class="album-detail">
  <a href="/albums" class="back-link">&larr; All albums</a>

  <section class="album-header">
    <p class="album-type-badge">{album.albumType}</p>
    <h1>{album.name}</h1>
    {#if album.artist}
      <a href="/artist/{album.artist.id}" class="artist-link">{album.artist.name}</a>
    {/if}
    <p class="album-meta">{album.genre} &middot; {album.releaseDate}</p>
  </section>

  <section class="songs-section">
    <h2>Tracklist</h2>
    {#if songs.length === 0}
      <p class="state-message">No songs logged for this album yet.</p>
    {:else}
      <ol class="song-list">
        {#each songs as song (song.id)}
          <li class="song-row">
            <span class="track-number">{song.trackNumber}</span>
            <span class="song-name">{song.name}</span>
            <span class="song-length">{Math.floor(song.length / 60)}:{String(song.length % 60).padStart(2, "0")}</span>
          </li>
        {/each}
      </ol>
    {/if}
  </section>

  <section class="reviews-section">
    <h2>Reviews</h2>
    {#if reviews.length === 0}
      <p class="state-message">No reviews logged for this album yet.</p>
    {:else}
      <div class="review-list">
        {#each reviews as review (review.id)}
          <div class="review-row">
            <span class="review-rating">{review.rating}/10</span>
            <p class="review-paragraph">{review.paragraph}</p>
          </div>
        {/each}
      </div>
    {/if}
  </section>
</main>

<style>
  .album-detail {
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

  .album-header {
    margin-bottom: 2.5rem;
  }

  .album-type-badge {
    font-family: var(--font-mono);
    font-size: 0.72rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--accent);
    margin: 0 0 0.4rem 0;
  }

  h1 {
    font-family: var(--font-display);
    font-size: clamp(1.8rem, 3.5vw, 2.4rem);
    margin: 0 0 0.4rem 0;
    font-weight: 600;
    letter-spacing: -0.01em;
  }

  .artist-link {
    font-family: var(--font-mono);
    font-size: 0.85rem;
    color: var(--accent-secondary);
    text-decoration: none;
    display: inline-block;
    margin-bottom: 0.5rem;
  }

  .artist-link:hover {
    text-decoration: underline;
  }

  .album-meta {
    font-family: var(--font-mono);
    font-size: 0.78rem;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: var(--ink-soft);
    margin: 0;
  }

  h2 {
    font-family: var(--font-display);
    font-size: 1.3rem;
    font-weight: 600;
    margin: 0 0 1rem 0;
  }

  .songs-section {
    margin-bottom: 2.5rem;
  }

  .song-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
  }

  .song-row {
    display: flex;
    align-items: baseline;
    gap: 0.9rem;
    padding: 0.7rem 0;
    border-bottom: 1px solid var(--rule);
  }

  .song-row:first-child {
    border-top: 1px solid var(--rule);
  }

  .track-number {
    font-family: var(--font-mono);
    font-size: 0.8rem;
    color: var(--ink-soft);
    width: 1.5rem;
    flex-shrink: 0;
  }

  .song-name {
    font-family: var(--font-display);
    font-size: 1rem;
    color: var(--ink);
    flex: 1;
  }

  .song-length {
    font-family: var(--font-mono);
    font-size: 0.78rem;
    color: var(--ink-soft);
  }

  .review-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .review-row {
    display: flex;
    gap: 0.9rem;
    padding: 0.9rem 1rem;
    background: var(--paper);
    border: 1px solid var(--rule);
    border-radius: 8px;
  }

  .review-rating {
    font-family: var(--font-mono);
    font-size: 0.85rem;
    font-weight: 700;
    color: var(--ink);
    flex-shrink: 0;
  }

  .review-paragraph {
    margin: 0;
    font-size: 0.92rem;
    line-height: 1.55;
    color: var(--ink);
  }

  .state-message {
    font-family: var(--font-mono);
    font-size: 0.85rem;
    color: var(--ink-soft);
  }
</style>