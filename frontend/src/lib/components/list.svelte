<script>

  let {
    items = [],
    basePath = "",
    emptyText = "Nothing here yet.",
    getName = (item) => item.name,
  } = $props();
</script>

{#if items.length === 0}
  <p class="empty-state">{emptyText}</p>
{:else}
  <ul class="item-list">
    {#each items as item (item.id)}
      <li>
        <a href="{basePath}/{item.id}">{getName(item)}</a>
      </li>
    {/each}
  </ul>
{/if}

<style>
  .item-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
  }

  .item-list li {
    border-bottom: 1px solid var(--rule);
  }

  .item-list li:first-child {
    border-top: 1px solid var(--rule);
  }

  .item-list a {
    display: block;
    padding: 1rem 0.25rem;
    font-family: var(--font-display);
    font-size: 1.1rem;
    color: var(--ink);
    text-decoration: none;
    transition: color 0.2s ease, padding-left 0.2s ease;
  }

  .item-list a:hover {
    color: var(--accent);
    padding-left: 0.5rem;
  }

  .empty-state {
    font-family: var(--font-mono);
    font-size: 0.85rem;
    color: var(--ink-soft);
    padding: 2.5rem 0;
  }
</style>