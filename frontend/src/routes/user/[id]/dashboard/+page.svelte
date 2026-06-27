<script>
  import Header from "$lib/components/header.svelte";
  import SignInButton from "$lib/components/signInButton.svelte";
  import ReviewCard from "$lib/components/reviewCard.svelte";

  let { data } = $props();
  const reviews = data.reviews;
  const error = data.error;
</script>

<svelte:head>
  <title>Dashboard</title>
</svelte:head>

<Header>
  <SignInButton username={data.username} />
</Header>

<main class="dashboard">
  <section class="dashboard-intro">
    <p class="eyebrow">Dashboard</p>
    <h1>Recent reviews</h1>
    <p class="intro-copy">
      Every entry your community has logged, freshest first.
    </p>
  </section>

  {#if error}
    <p class="state-message error">Couldn't load reviews: {error}</p>
  {:else if reviews.length === 0}
    <p class="state-message">
      No reviews yet. Once someone logs one, it'll show up here.
    </p>
  {:else}
    <div class="review-grid">
      {#each reviews as review (review.id)}
        <ReviewCard {review} />
      {/each}
    </div>
  {/if}
</main>

<style>
  :global(:root) {
    --paper: #faf6ee;
    --ink: #1a1a1a;
    --ink-soft: #5c574c;
    --accent: #c1502e;
    --accent-secondary: #2d4a3e;
    --rule: #d8d2c2;
    --font-display: "Fraunces", Georgia, serif;
    --font-body: "Inter", system-ui, sans-serif;
    --font-mono: "JetBrains Mono", "Courier New", monospace;
  }

  :global(body) {
    background: var(--paper);
    color: var(--ink);
    font-family: var(--font-body);
    margin: 0;
  }

  .dashboard {
    max-width: 1180px;
    margin: 0 auto;
    padding: 2.5rem 1.5rem 4rem;
  }

  .dashboard-intro {
    margin-bottom: 2.25rem;
  }

  .eyebrow {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--accent);
    margin: 0 0 0.4rem 0;
  }

  h1 {
    font-family: var(--font-display);
    font-size: clamp(2rem, 4vw, 2.75rem);
    margin: 0 0 0.5rem 0;
    font-weight: 600;
    letter-spacing: -0.01em;
  }

  .intro-copy {
    color: var(--ink-soft);
    margin: 0;
    font-size: 1rem;
  }

  .review-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.25rem;
  }

  .state-message {
    font-family: var(--font-mono);
    font-size: 0.85rem;
    color: var(--ink-soft);
    padding: 2.5rem 0;
  }

  .state-message.error {
    color: var(--accent);
  }
</style>