<script>

  let { artist } = $props();

  $: bioPreview = artist.bio ?? "";
</script>

<a href="/artist/{artist.id}" class="artist-card">
  <div class="card-top">
    <div class="year-stamp" aria-label="Born {artist.birthYear}">
      <span class="year-number">{artist.birthYear}</span>
    </div>
    <div class="card-meta">
      <h3 class="artist-name">{artist.name}</h3>
    </div>
  </div>

  {#if bioPreview}
    <p class="bio-preview">{bioPreview}</p>
  {/if}
</a>

<style>
  .artist-card {
    background: var(--paper);
    border: 1px solid var(--rule);
    border-radius: 10px;
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    text-decoration: none;
    color: inherit;
    transition: border-color 0.2s ease, transform 0.2s ease;
  }

  .artist-card:hover {
    border-color: var(--accent);
    transform: translateY(-2px);
  }

  .card-top {
    display: flex;
    align-items: flex-start;
    gap: 0.9rem;
  }

  .year-stamp {
    flex-shrink: 0;
    width: 3.1rem;
    height: 3.1rem;
    border-radius: 50%;
    background: var(--accent-secondary);
    color: var(--paper);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  /* vinyl-label center hole motif, echoes ReviewCard's rating-stamp */
  .year-stamp::after {
    content: "";
    position: absolute;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: var(--paper);
  }

  .year-number {
    font-family: var(--font-mono);
    font-size: 0.85rem;
    font-weight: 700;
    line-height: 1;
  }

  .card-meta {
    min-width: 0;
  }

  .artist-name {
    font-family: var(--font-display);
    font-size: 1.15rem;
    font-weight: 600;
    margin: 0;
    color: var(--ink);
    line-height: 1.25;
  }

  .bio-preview {
    font-size: 0.92rem;
    line-height: 1.55;
    color: var(--ink-soft);
    margin: 0;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>