<script>

  let { review } = $props();

  const albumName = review.album?.name ?? "Unknown album";
  const artistName = review.album?.artist?.name ?? "Unknown artist";
  const ratingDisplay = `${review.rating}/10`;
  const dateDisplay = review.createdAt
    ? new Date(review.createdAt).toLocaleDateString("en-NZ", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "";
</script>

<article class="review-card">
  <div class="card-top">
    <div class="rating-stamp" aria-label="Rating: {ratingDisplay}">
      <span class="rating-number">{review.rating}</span>
      <span class="rating-max">/10</span>
    </div>
    <div class="card-meta">
      <h3 class="album-name">{albumName}</h3>
      <p class="artist-name">{artistName}</p>
    </div>
  </div>

  <p class="paragraph">{review.paragraph}</p>

  {#if dateDisplay}
    <p class="card-date">{dateDisplay}</p>
  {/if}
</article>

<style>
  .review-card {
    background: var(--paper);
    border: 1px solid var(--rule);
    border-radius: 10px;
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    transition: border-color 0.2s ease, transform 0.2s ease;
  }

  .review-card:hover {
    border-color: var(--accent);
    transform: translateY(-2px);
  }

  .card-top {
    display: flex;
    align-items: flex-start;
    gap: 0.9rem;
  }

  .rating-stamp {
    flex-shrink: 0;
    width: 3.1rem;
    height: 3.1rem;
    border-radius: 50%;
    background: var(--ink);
    color: var(--paper);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  /* vinyl-label center hole motif, echoes Header's logo mark */
  .rating-stamp::after {
    content: "";
    position: absolute;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: var(--paper);
    bottom: 5px;
  }

  .rating-number {
    font-family: var(--font-mono);
    font-size: 1.1rem;
    font-weight: 700;
    line-height: 1;
  }

  .rating-max {
    font-family: var(--font-mono);
    font-size: 0.6rem;
    opacity: 0.75;
    line-height: 1;
  }

  .card-meta {
    min-width: 0;
  }

  .album-name {
    font-family: var(--font-display);
    font-size: 1.1rem;
    font-weight: 600;
    margin: 0 0 0.15rem 0;
    color: var(--ink);
    line-height: 1.2;
  }

  .artist-name {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: var(--ink-soft);
    margin: 0;
  }

  .paragraph {
    font-size: 0.92rem;
    line-height: 1.55;
    color: var(--ink);
    margin: 0;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .card-date {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    color: var(--ink-soft);
    margin: 0;
    border-top: 1px dashed var(--rule);
    padding-top: 0.6rem;
  }
</style>