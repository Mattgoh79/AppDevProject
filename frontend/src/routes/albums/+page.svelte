<script>
  import Header from "$lib/components/header.svelte";
  import SignInButton from "$lib/components/signInButton.svelte";
  import List from "$lib/components/list.svelte";

  let { data } = $props();
  const albums = data.albums;
  const error = data.error;
</script>

<svelte:head>
  <title>Albums · Liner Notes</title>
</svelte:head>

<Header>
  <SignInButton />
</Header>

<main class="albums-page">
  <section class="page-intro">
    <p class="eyebrow">Catalogue</p>
    <h1>Albums</h1>
    <p class="intro-copy">Every album logged, browse through to its tracklist and reviews.</p>
  </section>

  {#if error}
    <p class="state-message error">Couldn't load albums: {error}</p>
  {:else}
    <List items={albums} basePath="/albums" emptyText="No albums yet." />
  {/if}
</main>

<style>
  .albums-page {
    max-width: 760px;
    margin: 0 auto;
    padding: 2.5rem 1.5rem 4rem;
  }

  .page-intro {
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